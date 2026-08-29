import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getCustomer } from "@/lib/services/customer-service";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  const customer = await getCustomer(session.customerId);
  if (!customer) return NextResponse.json({ ok: false, error: "Account not found." }, { status: 404 });

  return NextResponse.json({
    ok: true,
    user: { name: session.name, email: customer.email, address: customer.address },
  });
}
