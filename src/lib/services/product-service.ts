import "server-only";
import * as productRepository from "@/lib/repositories/product-repository";
import type { Category, Product } from "@/lib/types";

/**
 * Application-level product/category access. This is the layer pages and
 * API routes call — never the repository directly.
 *
 * Read methods here are deliberately resilient: several of these are called
 * from statically-generated pages and `generateStaticParams` at build time
 * (home, the SEO landing pages, /product/[slug], /shop/[category],
 * sitemap.xml). A transient WooCommerce blip during `next build` should
 * degrade to "this page renders with what it has" (empty sections, which
 * the UI already handles) rather than failing the entire deployment.
 * `getProductById` is the one exception — see its own note below.
 */

async function safe<T>(fn: () => Promise<T>, fallback: T, label: string): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error(`[product-service] ${label} failed, using fallback:`, err);
    return fallback;
  }
}

export function getAllProducts(): Promise<Product[]> {
  return safe(() => productRepository.getAllProducts(), [], "getAllProducts");
}

export function getProductBySlug(slug: string): Promise<Product | null> {
  return safe(() => productRepository.getProductBySlug(slug), null, `getProductBySlug(${slug})`);
}

export function getProductsByCategorySlug(categorySlug: string): Promise<Product[]> {
  return safe(
    () => productRepository.getProductsByCategorySlug(categorySlug),
    [],
    `getProductsByCategorySlug(${categorySlug})`
  );
}

export function getFeaturedProducts(limit = 5): Promise<Product[]> {
  return safe(() => productRepository.getFeaturedProducts(limit), [], "getFeaturedProducts");
}

export function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return safe(() => productRepository.getRelatedProducts(product, limit), [], "getRelatedProducts");
}

export function getCategories(): Promise<Category[]> {
  return safe(() => productRepository.getCategories(), [], "getCategories");
}

export function getCategoryBySlug(slug: string): Promise<Category | null> {
  return safe(() => productRepository.getCategoryBySlug(slug), null, `getCategoryBySlug(${slug})`);
}

/**
 * NOT wrapped in the same fallback — checkout uses this to verify a cart
 * line item's real price/stock before creating an order, and a swallowed
 * "couldn't check, assume it's fine" here would be a real integrity issue.
 * The repository already turns a genuine 404 into null; anything else
 * (WooCommerce unreachable) propagates so checkout can fail the request
 * with a retryable error instead of silently proceeding.
 */
export function getProductById(id: number): Promise<Product | null> {
  return productRepository.getProductById(id);
}
