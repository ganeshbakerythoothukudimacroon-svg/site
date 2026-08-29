import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getOrdersForCustomer } from "@/lib/services/order-service";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  const orders = await getOrdersForCustomer(session.customerId);
  return NextResponse.json({ ok: true, orders });
}
