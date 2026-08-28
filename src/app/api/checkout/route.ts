import { NextResponse } from "next/server";
import { checkout, CheckoutValidationError } from "@/lib/services/checkout-service";
import type { CheckoutRequest } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as CheckoutRequest | null;

  if (!body?.customer || !body?.items) {
    return NextResponse.json({ ok: false, error: "Missing customer details or cart items." }, { status: 400 });
  }

  try {
    const result = await checkout(body);
    return NextResponse.json({ ok: true, order: result });
  } catch (err) {
    if (err instanceof CheckoutValidationError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
    }
    // Never leak WooCommerce's raw error body/internals to the client.
    console.error("[api/checkout] order creation failed:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't place your order right now — please try again in a moment." },
      { status: 502 }
    );
  }
}
