import { NextResponse } from "next/server";
import { findOrderForCustomer, toPublicOrder } from "@/lib/services/order-service";

// TODO(production): add rate limiting here — this endpoint is a plausible
// target for order-number enumeration even though a matching email/phone
// is required to get a result.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { orderNumber?: string; contact?: string } | null;

  if (!body?.orderNumber?.trim() || !body?.contact?.trim()) {
    return NextResponse.json({ ok: false, error: "Enter your order number and the email or phone used to order." }, { status: 400 });
  }

  const order = await findOrderForCustomer(body.orderNumber, body.contact);

  if (!order) {
    return NextResponse.json(
      { ok: false, error: "We couldn't find a matching order. Double-check your order number and contact details." },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, order: toPublicOrder(order) });
}
