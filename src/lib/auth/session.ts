import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import type { AuthSession } from "@/lib/types";

export const SESSION_COOKIE_NAME = "gb_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not configured.");
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(session: AuthSession): Promise<string> {
  return new SignJWT({ ...session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<AuthSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.customerId !== "number" || typeof payload.email !== "string") return null;
    return { customerId: payload.customerId, email: payload.email, name: String(payload.name || "") };
  } catch {
    return null;
  }
}

/** Reads the current session from the request cookie — works in Server
 *  Components and Route Handlers (both can read cookies; only Route
 *  Handlers/Server Actions can also write them). */
export async function getSession(): Promise<AuthSession | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};
