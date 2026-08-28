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

const REQUEST_TIMEOUT_MS = 8000;
const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = [300, 900];

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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Thrown for a WooCommerce response with a real HTTP error status (4xx/5xx
 * that came back from the server) — as opposed to a network-level failure
 * (timeout, DNS, connection refused). Callers that need to distinguish
 * "not found" from "WooCommerce is unreachable" can check `status`.
 */
export class WooCommerceApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "WooCommerceApiError";
  }
}

/**
 * Server-only fetch against the WooCommerce REST API (wc/v3). Never import
 * this module from a Client Component — the consumer key/secret must never
 * reach the browser bundle.
 *
 * Retries transient network failures and 5xx responses a couple of times
 * with a short backoff — WooCommerce hiccups are usually a single blip, and
 * one retry avoids turning that into a failed `next build` for pages that
 * fetch product/category data at build time. 4xx responses (real request
 * errors) are never retried.
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

  let lastError: unknown;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    if (attempt > 0) await sleep(RETRY_DELAY_MS[attempt - 1]);

    try {
      const res = await fetch(url, {
        ...init,
        headers: {
          Authorization: authHeader(),
          ...init?.headers,
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        // Product/category data changes rarely; revalidate periodically rather
        // than on every request.
        next: { revalidate: 300, ...(init as { next?: { revalidate?: number } })?.next },
      });

      if (!res.ok) {
        const body = await res.text();
        // Retry server-side errors (WooCommerce/host having a bad moment);
        // never retry 4xx — that's a real problem with the request itself.
        if (res.status >= 500 && attempt < MAX_ATTEMPTS - 1) {
          lastError = new WooCommerceApiError(res.status, `WooCommerce API error ${res.status} for ${path}: ${body}`);
          continue;
        }
        throw new WooCommerceApiError(res.status, `WooCommerce API error ${res.status} for ${path}: ${body}`);
      }

      return res.json() as Promise<T>;
    } catch (err) {
      if (err instanceof WooCommerceApiError) throw err;
      // Network-level failure (timeout, DNS, connection refused) — worth
      // retrying, these are the transient blips this exists to smooth over.
      lastError = err;
      if (attempt === MAX_ATTEMPTS - 1) break;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(`WooCommerce request to ${path} failed after ${MAX_ATTEMPTS} attempts.`);
}
