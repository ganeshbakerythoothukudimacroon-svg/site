import "server-only";

const WOOCOMMERCE_URL = process.env.WOOCOMMERCE_URL;
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

/**
 * The store also contains ~16 leftover demo products (a wine-shop sample
 * dataset bundled with the Porto theme) under ~30 demo categories. Every
 * real bakery category is confirmed here; nothing outside this allowlist
 * is ever shown on the storefront.
 */
export const REAL_CATEGORY_IDS = [102, 103, 104, 105] as const;

function getConfig() {
  if (!WOOCOMMERCE_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    throw new Error(
      "WooCommerce environment variables are not configured (WOOCOMMERCE_URL / WOOCOMMERCE_CONSUMER_KEY / WOOCOMMERCE_CONSUMER_SECRET)."
    );
  }
  return { url: WOOCOMMERCE_URL, key: CONSUMER_KEY, secret: CONSUMER_SECRET };
}

function authHeader(): string {
  const { key, secret } = getConfig();
  return "Basic " + Buffer.from(`${key}:${secret}`).toString("base64");
}

/**
 * Server-only fetch against the WooCommerce REST API (wc/v3). Never import
 * this module from a Client Component — the consumer key/secret must never
 * reach the browser bundle.
 */
export async function wcFetch<T>(
  path: string,
  params: Record<string, string | number | undefined> = {},
  init?: RequestInit
): Promise<T> {
  const { url: baseUrl } = getConfig();

  const url = new URL(`/wp-json/wc/v3/${path}`, baseUrl);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: authHeader(),
      ...init?.headers,
    },
    // Product/category data changes rarely; revalidate periodically rather
    // than on every request.
    next: { revalidate: 300, ...(init as { next?: { revalidate?: number } })?.next },
  });

  if (!res.ok) {
    throw new Error(`WooCommerce API error ${res.status} for ${path}: ${await res.text()}`);
  }

  return res.json() as Promise<T>;
}
