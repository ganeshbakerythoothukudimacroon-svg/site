import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { WOOCOMMERCE_CACHE_TAG } from "@/lib/woocommerce/client";

/**
 * Called by WooCommerce webhooks (Product created/updated/deleted) so price,
 * stock and content edits in wp-admin show on the storefront immediately,
 * instead of waiting out the 5-minute fetch cache.
 *
 * WooCommerce signs each delivery: X-WC-Webhook-Signature is the base64
 * HMAC-SHA256 of the raw body, keyed with the webhook's "Secret" — set that
 * Secret to the same value as REVALIDATE_SECRET.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "Revalidation is not configured." }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get("x-wc-webhook-signature") ?? "";
  const expected = createHmac("sha256", secret).update(body).digest("base64");

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ ok: false, error: "Invalid signature." }, { status: 401 });
  }

  revalidateTag(WOOCOMMERCE_CACHE_TAG, { expire: 0 });
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
}
