import "server-only";
import * as orderRepository from "@/lib/repositories/order-repository";
import type { Order, PublicOrder } from "@/lib/types";

function normalizePhone(value: string): string {
  return value.replace(/\D/g, "").slice(-10);
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function getOrder(id: number): Promise<Order | null> {
  return orderRepository.getOrderById(id);
}

/**
 * Looks up an order by its number, but only ever returns it if the caller
 * also supplied the matching billing email or phone — an order number
 * alone (sequential, guessable) is never enough to see someone else's
 * order. This is a security/business rule, not data access, so it lives
 * here rather than in the repository.
 */
export async function findOrderForCustomer(orderNumber: string, contact: string): Promise<Order | null> {
  const id = Number(orderNumber.trim().replace(/^#/, ""));
  if (!Number.isInteger(id) || id <= 0) return null;

  const order = await orderRepository.getOrderById(id);
  if (!order) return null;

  const contactNormalized = contact.trim().toLowerCase();
  const matchesEmail = order.billingEmail && normalizeEmail(order.billingEmail) === contactNormalized;
  const matchesPhone =
    order.billingPhone &&
    normalizePhone(order.billingPhone) === normalizePhone(contact) &&
    normalizePhone(contact).length === 10;

  if (!matchesEmail && !matchesPhone) return null;

  return order;
}

/** Public-safe subset for API responses — never leaks billing contact info. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function toPublicOrder({ billingEmail, billingPhone, ...publicOrder }: Order): PublicOrder {
  return publicOrder;
}

/**
 * Orders for an authenticated customer's own account page. Scoped by the
 * caller's own verified session.customerId — never by a client-supplied ID
 * — so this never needs the email/phone match-check that anonymous order
 * tracking does.
 */
export async function getOrdersForCustomer(customerId: number): Promise<PublicOrder[]> {
  const orders = await orderRepository.getOrdersByCustomerId(customerId);
  return orders.map(toPublicOrder);
}
