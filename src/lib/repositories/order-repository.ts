import "server-only";
import { WooCommerceApiError, wcFetch } from "@/lib/woocommerce/client";
import { mapOrder } from "@/lib/woocommerce/mappers";
import type { WCOrder, WCOrderCreatePayload } from "@/lib/woocommerce/order-raw-types";
import type { Order } from "@/lib/types";

/** Pure data access — no business/validation rules here (see order-service.ts). */

export async function getOrderById(id: number): Promise<Order | null> {
  try {
    const raw = await wcFetch<WCOrder>(`orders/${id}`, {}, { next: { revalidate: 0 } });
    return mapOrder(raw);
  } catch (err) {
    if (err instanceof WooCommerceApiError && err.status === 404) return null;
    throw err;
  }
}

export async function createOrder(payload: WCOrderCreatePayload): Promise<Order> {
  const raw = await wcFetch<WCOrder>(
    "orders",
    {},
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      next: { revalidate: 0 },
    }
  );
  return mapOrder(raw);
}
