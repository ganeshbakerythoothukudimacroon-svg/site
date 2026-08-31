import { NextResponse } from "next/server";
import { getOrder } from "@/lib/services/order-service";
import { createRazorpayOrder, RazorpayApiError } from "@/lib/razorpay";

/**
 * Creates a Razorpay order for an already-created WooCommerce order — the
 * amount always comes from that order's real total (never a client-sent
 * amount), so this can only ever charge what checkout actually priced.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { orderId?: number } | null;
  const orderId = body?.orderId;

  if (!orderId || !Number.isInteger(orderId) || orderId <= 0) {
    return NextResponse.json({ ok: false, error: "Missing or invalid order ID." }, { status: 400 });
  }

  const order = await getOrder(orderId);
  if (!order) {
    return NextResponse.json({ ok: false, error: "Order not found." }, { status: 404 });
  }
  if (order.status !== "pending") {
    return NextResponse.json({ ok: false, error: "This order has already been paid or is no longer payable." }, { status: 400 });
  }

  try {
    const razorpayOrder = await createRazorpayOrder({
      amountInPaise: Math.round(order.total * 100),
      receipt: order.number,
    });
    return NextResponse.json({
      ok: true,
      razorpayOrderId: razorpayOrder.razorpayOrderId,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: razorpayOrder.keyId,
      orderId: order.id,
      orderNumber: order.number,
    });
  } catch (err) {
    if (err instanceof RazorpayApiError) {
      console.error("[api/payments/razorpay/create-order] Razorpay error:", err.message);
      return NextResponse.json({ ok: false, error: "Couldn't start the payment — please try again." }, { status: 502 });
    }
    console.error("[api/payments/razorpay/create-order] unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Couldn't start the payment — please try again." }, { status: 500 });
  }
}
