import "server-only";
import { REAL_CATEGORY_IDS, WooCommerceApiError, wcFetch } from "@/lib/woocommerce/client";
import { mapCategory, mapProduct } from "@/lib/woocommerce/mappers";
import type { WCCategory, WCProduct, WCVariation } from "@/lib/woocommerce/raw-types";
import type { Category, Product } from "@/lib/types";

async function fetchCategoriesById(): Promise<Map<number, Category>> {
  const raw = await wcFetch<WCCategory[]>("products/categories", {
    include: REAL_CATEGORY_IDS.join(","),
    per_page: 20,
  });
  const map = new Map<number, Category>();
  for (const c of raw) map.set(c.id, mapCategory(c));
  return map;
}

export async function getCategories(): Promise<Category[]> {
  const map = await fetchCategoriesById();
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

/** Variable products (¼ kg / ½ kg / 1 kg) need their sizes fetched separately. */
async function withVariations(raw: WCProduct): Promise<WCVariation[]> {
  if (raw.type !== "variable") return [];
  return wcFetch<WCVariation[]>(`products/${raw.id}/variations`, { per_page: 20 });
}

export async function getAllProducts(): Promise<Product[]> {
  const [categoriesById, rawProducts] = await Promise.all([
    fetchCategoriesById(),
    wcFetch<WCProduct[]>("products", {
      category: REAL_CATEGORY_IDS.join(","),
      per_page: 50,
      status: "publish",
    }),
  ]);
  const variations = await Promise.all(rawProducts.map(withVariations));
  return rawProducts.map((p, i) => mapProduct(p, categoriesById, variations[i]));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

/**
 * Fetches a single product directly by its WooCommerce ID. Used to verify
 * cart line items server-side (real price/stock/existence) before an order
 * is created — never trust a product's price or name as sent by the client.
 *
 * Only returns null for a genuine 404 (product doesn't exist). A network
 * failure propagates as a real error rather than being swallowed into
 * null — checkout needs to tell "this product doesn't exist" apart from
 * "couldn't verify it right now", and fail safe (reject the order) either
 * way rather than silently treating a transient blip as a valid product.
 */
export async function getProductById(id: number): Promise<Product | null> {
  try {
    const [categoriesById, raw] = await Promise.all([
      fetchCategoriesById(),
      wcFetch<WCProduct>(`products/${id}`),
    ]);
    // Checkout verifies prices with this — always fetch sizes fresh.
    const variations =
      raw.type === "variable"
        ? await wcFetch<WCVariation[]>(`products/${raw.id}/variations`, { per_page: 20 }, { next: { revalidate: 0 } })
        : [];
    return mapProduct(raw, categoriesById, variations);
  } catch (err) {
    if (err instanceof WooCommerceApiError && err.status === 404) return null;
    throw err;
  }
}

export async function getProductsByCategorySlug(categorySlug: string): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.categories.some((c) => c.slug === categorySlug));
}

export async function getFeaturedProducts(limit = 5): Promise<Product[]> {
  const products = await getAllProducts();
  return products.slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const products = await getAllProducts();
  const categoryIds = new Set(product.categories.map((c) => c.id));
  return products
    .filter((p) => p.id !== product.id && p.categories.some((c) => categoryIds.has(c.id)))
    .slice(0, limit);
}
