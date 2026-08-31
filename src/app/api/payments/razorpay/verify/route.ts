import { NextResponse } from "next/server";
import { markOrderPaid } from "@/lib/services/order-service";
import { verifyPaymentSignature } from "@/lib/razorpay";

interface VerifyPayload {
  orderId?: number;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as VerifyPayload | null;
  const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body ?? {};

  if (!orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ ok: false, error: "Missing payment details." }, { status: 400 });
  }

  const isValid = await verifyPaymentSignature({
    razorpayOrderId: razorpay_order_id,
    razorpayPaymentId: razorpay_payment_id,
    razorpaySignature: razorpay_signature,
  });

  // Signature mismatch: never mark the order paid, regardless of what the
  // client claims happened.
  if (!isValid) {
    console.error("[api/payments/razorpay/verify] signature mismatch for order", orderId);
    return NextResponse.json({ ok: false, error: "Payment could not be verified." }, { status: 400 });
  }

  try {
    const order = await markOrderPaid(orderId, razorpay_payment_id);
    return NextResponse.json({ ok: true, orderId: order.id, orderNumber: order.number, status: order.status });
  } catch (err) {
    console.error("[api/payments/razorpay/verify] failed to update order:", err);
    return NextResponse.json(
      { ok: false, error: "Payment succeeded but we couldn't update your order — please contact us." },
      { status: 502 }
    );
  }
}
