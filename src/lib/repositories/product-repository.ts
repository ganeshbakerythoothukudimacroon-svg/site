import "server-only";
import { REAL_CATEGORY_IDS, wcFetch } from "@/lib/woocommerce/client";
import { mapCategory, mapProduct } from "@/lib/woocommerce/mappers";
import type { WCCategory, WCProduct } from "@/lib/woocommerce/raw-types";
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

export async function getAllProducts(): Promise<Product[]> {
  const [categoriesById, rawProducts] = await Promise.all([
    fetchCategoriesById(),
    wcFetch<WCProduct[]>("products", {
      category: REAL_CATEGORY_IDS.join(","),
      per_page: 50,
      status: "publish",
    }),
  ]);
  return rawProducts.map((p) => mapProduct(p, categoriesById));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug) ?? null;
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
