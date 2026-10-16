import "server-only";
import * as productService from "@/lib/services/product-service";
import * as orderRepository from "@/lib/repositories/order-repository";
import { findOrCreateCustomer } from "@/lib/services/customer-service";
import { validateAddress } from "@/lib/validation/address";
import { siteConfig } from "@/lib/site-config";
import type { CheckoutRequest, CheckoutResult, ShippingAddress } from "@/lib/types";

/** Thrown for a problem with the request itself — safe to show to the customer. */
export class CheckoutValidationError extends Error {}

function validateCustomer(customer: ShippingAddress | undefined): asserts customer is ShippingAddress {
  try {
    validateAddress(customer);
  } catch (err) {
    throw new CheckoutValidationError(err instanceof Error ? err.message : "Invalid address details.");
  }
  if (customer.email && !/^\S+@\S+\.\S+$/.test(customer.email)) {
    throw new CheckoutValidationError("Enter a valid email address, or leave it blank.");
  }
}

function validateCart(items: CheckoutRequest["items"] | undefined): asserts items is CheckoutRequest["items"] {
  if (!items || items.length === 0) throw new CheckoutValidationError("Your cart is empty.");
  for (const item of items) {
    if (
      !Number.isInteger(item.productId) ||
      item.productId <= 0 ||
      (item.variationId !== undefined && (!Number.isInteger(item.variationId) || item.variationId <= 0))
    ) {
      throw new CheckoutValidationError("Your cart contains an invalid item — please refresh and try again.");
    }
    if (!Number.isInteger(item.quantity) || item.quantity <= 0 || item.quantity > 50) {
      throw new CheckoutValidationError("Check the quantities in your cart and try again.");
    }
  }
}

/**
 * Validates the request, re-verifies every line item against the real
 * catalog (price/stock/existence — a client-sent price or name is never
 * trusted), creates a WooCommerce customer if an email was given, and
 * places the order. WooCommerce itself prices the order from its own
 * product records, since we only ever send product_id + quantity.
 */
export async function checkout(request: CheckoutRequest): Promise<CheckoutResult> {
  validateCustomer(request.customer);
  validateCart(request.items);

  // Merge duplicate product+size lines rather than sending WooCommerce two
  // line items for the same thing.
  const merged = new Map<string, { productId: number; variationId?: number; quantity: number }>();
  for (const item of request.items) {
    const key = `${item.productId}:${item.variationId ?? 0}`;
    const existing = merged.get(key);
    merged.set(key, {
      productId: item.productId,
      variationId: item.variationId,
      quantity: (existing?.quantity ?? 0) + item.quantity,
    });
  }

  // Subtotal from the real catalog prices — the minimum order is never
  // checked against a client-sent price.
  let subtotal = 0;
  const verifiedLineItems: { product_id: number; variation_id?: number; quantity: number }[] = [];
  for (const { productId, variationId, quantity } of merged.values()) {
    const product = await productService.getProductById(productId);
    if (!product) {
      throw new CheckoutValidationError("One of the items in your cart is no longer available.");
    }
    if (product.variations.length > 0) {
      // Sized product: the chosen size must exist and be available.
      const variation = product.variations.find((v) => v.id === variationId);
      if (!variation) {
        throw new CheckoutValidationError(`Please choose a size for "${product.name}" again — your cart is out of date.`);
      }
      if (!variation.inStock || variation.price === null) {
        throw new CheckoutValidationError(`"${product.name}" (${variation.label}) is currently unavailable.`);
      }
      subtotal += variation.price * quantity;
      verifiedLineItems.push({ product_id: productId, variation_id: variation.id, quantity });
    } else {
      if (variationId !== undefined) {
        throw new CheckoutValidationError(`"${product.name}" has changed — please add it to your cart again.`);
      }
      if (!product.inStock || product.price === null) {
        throw new CheckoutValidationError(`"${product.name}" is currently unavailable.`);
      }
      subtotal += product.price * quantity;
      verifiedLineItems.push({ product_id: productId, quantity });
    }
  }

  if (subtotal < siteConfig.minOrderValue) {
    throw new CheckoutValidationError(
      `The minimum order is ₹${siteConfig.minOrderValue.toLocaleString("en-IN")} — please add ₹${(siteConfig.minOrderValue - subtotal).toLocaleString("en-IN")} more to your cart.`
    );
  }

  const customer = await findOrCreateCustomer(request.customer);

  const [firstName, ...rest] = request.customer.name.trim().split(/\s+/);
  const lastName = rest.join(" ");

  const order = await orderRepository.createOrder({
    status: "pending",
    set_paid: false,
    payment_method: "razorpay",
    payment_method_title: "UPI, Cards, NetBanking",
    ...(customer && { customer_id: customer.id }),
    billing: {
      first_name: firstName || request.customer.name,
      last_name: lastName,
      address_1: request.customer.address,
      city: request.customer.city,
      state: request.customer.state,
      postcode: request.customer.pincode,
      country: "IN",
      phone: request.customer.phone,
      ...(request.customer.email && { email: request.customer.email }),
    },
    shipping: {
      first_name: firstName || request.customer.name,
      last_name: lastName,
      address_1: request.customer.address,
      city: request.customer.city,
      state: request.customer.state,
      postcode: request.customer.pincode,
      country: "IN",
    },
    line_items: verifiedLineItems,
    customer_note: "Order placed via website — paid through Razorpay.",
  });

  return {
    orderId: order.id,
    orderNumber: order.number,
    status: order.status,
    currency: order.currency,
    total: order.total,
    items: order.items,
  };
}
