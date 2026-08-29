import { NextResponse } from "next/server";
import { verifyGoogleIdToken } from "@/lib/auth/google";
import { createSessionToken, sessionCookieOptions, SESSION_COOKIE_NAME } from "@/lib/auth/session";
import { findOrCreateCustomerByProfile } from "@/lib/services/customer-service";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { credential?: string } | null;
  if (!body?.credential) {
    return NextResponse.json({ ok: false, error: "Missing Google credential." }, { status: 400 });
  }

  const profile = await verifyGoogleIdToken(body.credential);
  if (!profile) {
    return NextResponse.json({ ok: false, error: "Could not verify your Google sign-in — please try again." }, { status: 401 });
  }

  let customer;
  try {
    customer = await findOrCreateCustomerByProfile(profile);
  } catch (err) {
    console.error("[api/auth/google] customer lookup/creation failed:", err);
    return NextResponse.json({ ok: false, error: "Sign-in isn't working right now — please try again shortly." }, { status: 502 });
  }

  const token = await createSessionToken({ customerId: customer.id, email: customer.email, name: profile.name });

  const response = NextResponse.json({
    ok: true,
    user: { email: customer.email, name: profile.name, hasAddress: Boolean(customer.address) },
  });
  response.cookies.set(SESSION_COOKIE_NAME, token, sessionCookieOptions);
  return response;
}
