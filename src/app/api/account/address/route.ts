import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { updateCustomerAddress } from "@/lib/services/customer-service";
import { AddressValidationError, validateAddress } from "@/lib/validation/address";
import type { CustomerAddress } from "@/lib/types";

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  const rawBody = (await request.json().catch(() => null)) as Partial<CustomerAddress> | null;
  const body = rawBody ?? undefined;

  try {
    validateAddress(body);
  } catch (err) {
    if (err instanceof AddressValidationError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
    }
    throw err;
  }

  try {
    const customer = await updateCustomerAddress(session.customerId, body);
    return NextResponse.json({ ok: true, address: customer.address });
  } catch (err) {
    console.error("[api/account/address] update failed:", err);
    return NextResponse.json({ ok: false, error: "Couldn't save your address — please try again." }, { status: 502 });
  }
}
