import "server-only";
import { OAuth2Client } from "google-auth-library";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

let client: OAuth2Client | null = null;
function getClient(): OAuth2Client {
  if (!CLIENT_ID) {
    throw new Error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured.");
  }
  if (!client) client = new OAuth2Client(CLIENT_ID);
  return client;
}

export interface GoogleProfile {
  email: string;
  name: string;
}

/**
 * Verifies a Google Identity Services ID token (the `credential` field the
 * Sign In With Google button returns) — checks the signature against
 * Google's public keys and that the token was actually issued for our
 * Client ID. No client secret involved; this is public-key verification,
 * not an OAuth code exchange.
 */
export async function verifyGoogleIdToken(idToken: string): Promise<GoogleProfile | null> {
  try {
    const ticket = await getClient().verifyIdToken({ idToken, audience: CLIENT_ID });
    const payload = ticket.getPayload();
    if (!payload?.email || !payload.email_verified) return null;
    return { email: payload.email, name: payload.name || payload.email };
  } catch {
    return null;
  }
}
