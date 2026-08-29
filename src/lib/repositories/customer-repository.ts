import "server-only";
import { WooCommerceApiError, wcFetch } from "@/lib/woocommerce/client";
import { mapCustomer } from "@/lib/woocommerce/mappers";
import type { WCCustomer, WCCustomerCreatePayload, WCCustomerUpdatePayload } from "@/lib/woocommerce/customer-raw-types";
import type { Customer } from "@/lib/types";

/** Pure data access — no business rules here (see customer-service.ts). */

export async function findCustomerByEmail(email: string): Promise<Customer | null> {
  const results = await wcFetch<WCCustomer[]>("customers", { email, per_page: 1 }, { next: { revalidate: 0 } });
  return results[0] ? mapCustomer(results[0]) : null;
}

export async function getCustomerById(id: number): Promise<Customer | null> {
  try {
    const raw = await wcFetch<WCCustomer>(`customers/${id}`, {}, { next: { revalidate: 0 } });
    return mapCustomer(raw);
  } catch (err) {
    if (err instanceof WooCommerceApiError && err.status === 404) return null;
    throw err;
  }
}

export async function createCustomer(payload: WCCustomerCreatePayload): Promise<Customer> {
  const raw = await wcFetch<WCCustomer>(
    "customers",
    {},
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      next: { revalidate: 0 },
    }
  );
  return mapCustomer(raw);
}

export async function updateCustomer(id: number, payload: WCCustomerUpdatePayload): Promise<Customer> {
  const raw = await wcFetch<WCCustomer>(
    `customers/${id}`,
    {},
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      next: { revalidate: 0 },
    }
  );
  return mapCustomer(raw);
}
