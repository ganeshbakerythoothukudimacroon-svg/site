import "server-only";
import { siteConfig } from "@/lib/site-config";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || siteConfig.email;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

async function brevoFetch(path: string, body: unknown): Promise<void> {
  const res = await fetch(`https://api.brevo.com/v3/${path}`, {
    method: "POST",
    headers: {
      "api-key": BREVO_API_KEY!,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Brevo ${path} failed (${res.status}): ${text}`);
  }
}

/**
 * Emails a Contact Us / bulk-order enquiry to the admin inbox via Brevo, and
 * (when the submitted contact value is an email) stores the enquirer as a
 * Brevo contact — Brevo doubling as the CRM since no other store exists for
 * these. Both calls are best-effort: a Brevo outage should never block a
 * genuine visitor's submission, so failures are logged, not thrown.
 *
 * No-ops (logging once) if BREVO_API_KEY isn't configured yet.
 */
export async function notifyContactEnquiry({
  name,
  contact,
  message,
  adminEmail,
}: {
  name: string;
  contact: string;
  message: string;
  /** Where the notification goes — the caller resolves this from
   *  WordPress's admin email, not a hardcoded address. */
  adminEmail: string;
}): Promise<void> {
  if (!BREVO_API_KEY) {
    console.warn("[brevo] BREVO_API_KEY not set — skipping admin notification for contact enquiry.");
    return;
  }

  const emailIsValid = looksLikeEmail(contact);

  const emailTask = brevoFetch("smtp/email", {
    sender: { name: `${siteConfig.brandName} Website`, email: SENDER_EMAIL },
    to: [{ email: adminEmail, name: siteConfig.brandName }],
    ...(emailIsValid ? { replyTo: { email: contact, name } } : {}),
    subject: `New website enquiry from ${name}`,
    htmlContent: `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email/Phone:</strong> ${escapeHtml(contact)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `.trim(),
  }).catch((err) => console.error("[brevo] admin notification email failed:", err));

  const contactTask = emailIsValid
    ? brevoFetch("contacts", {
        email: contact,
        attributes: { FIRSTNAME: name },
        updateEnabled: true,
      }).catch((err) => console.error("[brevo] contact upsert failed:", err))
    : Promise.resolve();

  await Promise.all([emailTask, contactTask]);
}
