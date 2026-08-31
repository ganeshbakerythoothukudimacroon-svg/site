import "server-only";
import crypto from "node:crypto";
import { wcFetch } from "@/lib/woocommerce/client";

/**
 * Razorpay's key_id/key_secret live in WooCommerce's own Razorpay gateway
 * settings (WooCommerce → Settings → Payments → Razorpay) — the plugin was
 * already installed and active there, so that's the single source of
 * truth rather than a duplicate copy in this app's env vars. Cached
 * briefly in memory since it almost never changes.
 */
interface RazorpayCredentials {
  keyId: string;
  keySecret: string;
}

let credentialsCache: { value: RazorpayCredentials; expiresAt: number } | null = null;
const CREDENTIALS_TTL_MS = 5 * 60 * 1000;

async function getRazorpayCredentials(): Promise<RazorpayCredentials> {
  if (credentialsCache && credentialsCache.expiresAt > Date.now()) {
    return credentialsCache.value;
  }

  const gateway = await wcFetch<{ settings: Record<string, { value: string }> }>(
    "payment_gateways/razorpay",
    {},
    { next: { revalidate: 0 } }
  );
  const keyId = gateway.settings?.key_id?.value;
  const keySecret = gateway.settings?.key_secret?.value;

  if (!keyId || !keySecret) {
    throw new Error(
      "Razorpay is not configured — set Key ID/Key Secret in WooCommerce → Settings → Payments → Razorpay."
    );
  }

  const value = { keyId, keySecret };
  credentialsCache = { value, expiresAt: Date.now() + CREDENTIALS_TTL_MS };
  return value;
}

export class RazorpayApiError extends Error {}

/**
 * Creates a Razorpay order for an amount already computed server-side from
 * a real WooCommerce order — never from a client-supplied amount.
 */
export async function createRazorpayOrder({
  amountInPaise,
  receipt,
}: {
  amountInPaise: number;
  receipt: string;
}): Promise<{ razorpayOrderId: string; amount: number; currency: string; keyId: string }> {
  if (!Number.isInteger(amountInPaise) || amountInPaise < 100) {
    throw new RazorpayApiError("Order amount is below Razorpay's minimum (₹1).");
  }

  const { keyId, keySecret } = await getRazorpayCredentials();
  const auth = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json" },
    body: JSON.stringify({ amount: amountInPaise, currency: "INR", receipt }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new RazorpayApiError(`Razorpay order creation failed (${res.status}): ${text}`);
  }

  const data = (await res.json()) as { id: string; amount: number; currency: string };
  return { razorpayOrderId: data.id, amount: data.amount, currency: data.currency, keyId };
}

/**
 * Verifies a Standard Checkout callback: HMAC-SHA256(order_id + "|" +
 * payment_id, key_secret) must match the signature Razorpay sent back.
 * Timing-safe comparison — this is a security check, not a data lookup.
 */
export async function verifyPaymentSignature({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): Promise<boolean> {
  const { keySecret } = await getRazorpayCredentials();

  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  const expectedBuf = Buffer.from(expected, "hex");
  const actualBuf = Buffer.from(razorpaySignature, "hex");
  if (expectedBuf.length !== actualBuf.length) return false;

  return crypto.timingSafeEqual(expectedBuf, actualBuf);
}
