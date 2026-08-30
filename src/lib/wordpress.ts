import "server-only";

const WOOCOMMERCE_URL = process.env.WOOCOMMERCE_URL;
const APP_USERNAME = process.env.WORDPRESS_APP_USERNAME;
const APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD;

/**
 * Saves a Contact Us / Bulk Order submission as a private "Enquiry" record
 * in wp-admin, via a dedicated `gb/v1/enquiry` REST route registered by
 * wordpress-plugin/ganesh-bakery-enquiries.php (that plugin must be
 * installed and active). Writes with plain wp_insert_post()/
 * update_post_meta() on the PHP side rather than the generic wp/v2
 * post-meta REST schema, which proved unreliable on this host.
 *
 * Requires a WordPress Application Password (Users → Profile → Application
 * Passwords) — WooCommerce's consumer key/secret only authenticates wc/v3
 * routes, not the core WordPress REST API this needs.
 *
 * Best-effort: logs and returns rather than throwing, so a WordPress-side
 * hiccup never blocks a genuine visitor's submission.
 */
export async function saveEnquiry({
  name,
  contact,
  message,
  formType,
}: {
  name: string;
  contact: string;
  message: string;
  formType: "contact" | "bulk-order";
}): Promise<void> {
  if (!WOOCOMMERCE_URL || !APP_USERNAME || !APP_PASSWORD) {
    console.warn("[wordpress] WORDPRESS_APP_USERNAME/PASSWORD not set — skipping enquiry save.");
    return;
  }

  try {
    const auth = "Basic " + Buffer.from(`${APP_USERNAME}:${APP_PASSWORD}`).toString("base64");
    const res = await fetch(new URL("/wp-json/gb/v1/enquiry", WOOCOMMERCE_URL), {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: JSON.stringify({ name, contact, message, form_type: formType }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`WordPress enquiries save failed (${res.status}): ${text}`);
    }
  } catch (err) {
    console.error("[wordpress] failed to save enquiry:", err);
  }
}
