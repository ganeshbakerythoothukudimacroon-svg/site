import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getCategoryBySlug, getProductsByCategorySlug } from "@/lib/services/product-service";
import { pageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ProductGrid } from "@/components/product/ProductGrid";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  return pageMetadata({
    title: `${category.name} | Ganesh Bakery Thoothukudi`,
    description:
      category.description ||
      `Shop ${category.name} from Ganesh Bakery, Shop No. 532, Thoothukudi (Tuticorin) — freshly baked and available to order online.`,
    path: `/shop/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProductsByCategorySlug(slug);

  return (
    <>
      <Breadcrumbs items={[{ name: "Shop", path: "/shop" }, { name: category.name, path: `/shop/${slug}` }]} />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">{category.name}</h1>
        <p className="mt-3 max-w-2xl text-[color:var(--text-secondary)]">
          {category.description ||
            `Traditional ${category.name.toLowerCase()} from ${siteConfig.brandName}, ${siteConfig.shopBranch}.`}
        </p>
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </div>
    </>
  );
}
