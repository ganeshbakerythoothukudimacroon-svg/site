import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts, getCategories } from "@/lib/services/product-service";
import { sortProducts } from "@/lib/sort-products";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SortSelect } from "@/components/product/SortSelect";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return pageMetadata({
    title: "Ganesh Bakery Thoothukudi | Buy Bakery Products Online",
    description:
      "Shop traditional bakery products from Ganesh Bakery, Shop No. 532, Thoothukudi — biscuits, rusk, nutbar and macaroons, freshly baked and delivered.",
    path: "/shop",
    noindex: Boolean(q),
  });
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { q, sort } = await searchParams;
  const [allProducts, categories] = await Promise.all([getAllProducts(), getCategories()]);

  const filtered = q
    ? allProducts.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
    : allProducts;
  const products = sortProducts(filtered, sort);

  return (
    <>
      <Breadcrumbs items={[{ name: "Shop", path: "/shop" }]} />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">
          {q ? `Search results for “${q}”` : "Shop Bakery Products"}
        </h1>
        <p className="mt-3 max-w-2xl text-[color:var(--text-secondary)]">
          Traditional biscuits, rusk, nutbar and macaroons from Ganesh Bakery, Shop No. 532, Thoothukudi —
          baked in small batches and shipped across India.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop/${category.slug}`}
                className="glass-button rounded-full px-4 py-1.5 text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--gold-400)]"
              >
                {category.name}
              </Link>
            ))}
          </div>
          <SortSelect />
        </div>

        <div className="mt-8">
          <ProductGrid products={products} emptyMessage="No products matched your search." />
        </div>
      </div>
    </>
  );
}
