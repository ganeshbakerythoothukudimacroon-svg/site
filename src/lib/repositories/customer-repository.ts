import "server-only";
import { wcFetch } from "@/lib/woocommerce/client";
import { mapCustomer } from "@/lib/woocommerce/mappers";
import type { WCCustomer, WCCustomerCreatePayload } from "@/lib/woocommerce/customer-raw-types";
import type { Customer } from "@/lib/types";

/** Pure data access — no business rules here (see customer-service.ts). */

export async function findCustomerByEmail(email: string): Promise<Customer | null> {
  const results = await wcFetch<WCCustomer[]>("customers", { email, per_page: 1 }, { next: { revalidate: 0 } });
  return results[0] ? mapCustomer(results[0]) : null;
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
