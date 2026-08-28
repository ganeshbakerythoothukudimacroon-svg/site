import "server-only";
import * as productService from "@/lib/services/product-service";
import * as orderRepository from "@/lib/repositories/order-repository";
import { findOrCreateCustomer } from "@/lib/services/customer-service";
import type { CheckoutRequest, CheckoutResult, ShippingAddress } from "@/lib/types";

/** Thrown for a problem with the request itself — safe to show to the customer. */
export class CheckoutValidationError extends Error {}

const PINCODE_RE = /^\d{6}$/;
const PHONE_DIGITS_RE = /\d{10,}/;

function validateCustomer(customer: ShippingAddress | undefined): asserts customer is ShippingAddress {
  if (!customer) throw new CheckoutValidationError("Missing customer details.");
  if (!customer.name?.trim()) throw new CheckoutValidationError("Enter your full name.");
  if (!PHONE_DIGITS_RE.test(customer.phone || "")) throw new CheckoutValidationError("Enter a valid phone number.");
  if (!customer.address?.trim()) throw new CheckoutValidationError("Enter your delivery address.");
  if (!customer.city?.trim()) throw new CheckoutValidationError("Enter your city.");
  if (!customer.state?.trim()) throw new CheckoutValidationError("Enter your state.");
  if (!PINCODE_RE.test(customer.pincode || "")) throw new CheckoutValidationError("Enter a valid 6-digit pincode.");
  if (customer.email && !/^\S+@\S+\.\S+$/.test(customer.email)) {
    throw new CheckoutValidationError("Enter a valid email address, or leave it blank.");
  }
}

function validateCart(items: CheckoutRequest["items"] | undefined): asserts items is CheckoutRequest["items"] {
  if (!items || items.length === 0) throw new CheckoutValidationError("Your cart is empty.");
  for (const item of items) {
    if (!Number.isInteger(item.productId) || item.productId <= 0) {
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

  // Merge duplicate product IDs rather than sending WooCommerce two line
  // items for the same product.
  const merged = new Map<number, number>();
  for (const item of request.items) {
    merged.set(item.productId, (merged.get(item.productId) ?? 0) + item.quantity);
  }

  const verifiedLineItems: { product_id: number; quantity: number }[] = [];
  for (const [productId, quantity] of merged) {
    const product = await productService.getProductById(productId);
    if (!product) {
      throw new CheckoutValidationError("One of the items in your cart is no longer available.");
    }
    if (!product.inStock || product.price === null) {
      throw new CheckoutValidationError(`"${product.name}" is currently unavailable.`);
    }
    verifiedLineItems.push({ product_id: productId, quantity });
  }

  const customer = await findOrCreateCustomer(request.customer);

  const [firstName, ...rest] = request.customer.name.trim().split(/\s+/);
  const lastName = rest.join(" ");

  const order = await orderRepository.createOrder({
    status: "on-hold",
    set_paid: false,
    payment_method: "other",
    payment_method_title: "Payment to be confirmed with customer",
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
    customer_note: "Order placed via website — payment to be arranged directly with the customer.",
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
