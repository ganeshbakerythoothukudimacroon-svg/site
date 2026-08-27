import "server-only";
import { wcFetch } from "@/lib/woocommerce/client";
import type { WCOrder } from "@/lib/woocommerce/order-raw-types";

export interface TrackedOrder {
  id: number;
  status: string;
  dateCreated: string;
  currency: string;
  total: string;
  items: { name: string; quantity: number }[];
  shippingCity: string | null;
}

function normalizePhone(value: string): string {
  return value.replace(/\D/g, "").slice(-10);
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Looks up an order by its number, but only ever returns it if the caller
 * also supplied the matching billing email or phone — an order number
 * alone (sequential, guessable) is never enough to see someone else's order.
 */
export async function findOrderForTracking(
  orderNumber: string,
  contact: string
): Promise<TrackedOrder | null> {
  const id = Number(orderNumber.trim().replace(/^#/, ""));
  if (!Number.isInteger(id) || id <= 0) return null;

  let order: WCOrder;
  try {
    order = await wcFetch<WCOrder>(`orders/${id}`, {}, { next: { revalidate: 0 } });
  } catch {
    return null;
  }

  const contactNormalized = contact.trim().toLowerCase();
  const matchesEmail = order.billing.email && normalizeEmail(order.billing.email) === contactNormalized;
  const matchesPhone =
    order.billing.phone && normalizePhone(order.billing.phone) === normalizePhone(contact) && normalizePhone(contact).length === 10;

  if (!matchesEmail && !matchesPhone) return null;

  return {
    id: order.id,
    status: order.status,
    dateCreated: order.date_created,
    currency: order.currency,
    total: order.total,
    items: order.line_items.map((li) => ({ name: li.name, quantity: li.quantity })),
    shippingCity: order.shipping?.city || null,
  };
}
