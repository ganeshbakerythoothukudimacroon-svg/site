import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/services/product-service";
import { pageMetadata } from "@/lib/seo/metadata";
import { productSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PriceTag } from "@/components/shared/PriceTag";
import { RatingStars } from "@/components/shared/RatingStars";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { RelatedProducts } from "@/components/product/RelatedProducts";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return pageMetadata({
    title: `${product.name} | ${siteConfig.brandName}`,
    description:
      product.shortDescription ||
      `${product.name} from ${siteConfig.brandName}, ${siteConfig.shopBranch}, Thoothukudi — freshly baked and available to order online.`,
    path: `/product/${product.slug}`,
    image: product.images[0]?.url,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const category = product.categories[0];

  return (
    <>
      <JsonLd data={productSchema(product, `/product/${product.slug}`)} />
      <Breadcrumbs
        items={[
          { name: "Shop", path: "/shop" },
          ...(category ? [{ name: category.name, path: `/shop/${category.slug}` }] : []),
          { name: product.name, path: `/product/${product.slug}` },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 pb-28 sm:px-6 lg:px-8 lg:pb-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} productName={product.name} />

          <div>
            <h1 className="font-display text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">{product.name}</h1>
            {product.weightLabel && (
              <p className="label-tracked mt-2 text-[color:var(--text-muted)]">{product.weightLabel}</p>
            )}
            <div className="mt-3">
              <RatingStars rating={product.averageRating} reviewCount={product.reviewCount} />
            </div>
            <div className="mt-4">
              <PriceTag price={product.price} regularPrice={product.regularPrice} size="lg" />
            </div>
            {product.shortDescription && (
              <p className="mt-4 text-base text-[color:var(--text-secondary)] text-pretty">{product.shortDescription}</p>
            )}

            <div className="mt-6">
              <ProductPurchasePanel product={product} />
            </div>

            <dl className="glass-card mt-8 grid grid-cols-2 gap-5 rounded-[var(--radius-card)] p-5 text-sm">
              <div>
                <dt className="font-medium text-[color:var(--gold-400)]">Ingredients</dt>
                <dd className="mt-1 text-[color:var(--text-muted)]">[CLIENT TO PROVIDE: verified ingredient list]</dd>
              </div>
              <div>
                <dt className="font-medium text-[color:var(--gold-400)]">Shelf Life</dt>
                <dd className="mt-1 text-[color:var(--text-muted)]">[CLIENT TO PROVIDE: verified shelf life]</dd>
              </div>
              <div>
                <dt className="font-medium text-[color:var(--gold-400)]">Storage</dt>
                <dd className="mt-1 text-[color:var(--text-muted)]">[CLIENT TO PROVIDE: storage instructions]</dd>
              </div>
              <div>
                <dt className="font-medium text-[color:var(--gold-400)]">Allergens</dt>
                <dd className="mt-1 text-[color:var(--text-muted)]">[CLIENT TO PROVIDE: verified allergen information]</dd>
              </div>
            </dl>

            <p className="mt-6 text-sm text-[color:var(--text-muted)]">
              See our{" "}
              <a href="/shipping-policy" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
                shipping policy
              </a>{" "}
              for delivery details, or{" "}
              <a href="/track-order" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
                track an existing order
              </a>
              .
            </p>
          </div>
        </div>

        {product.description && (
          <div className="mt-14 max-w-3xl border-t border-[color:var(--glass-border)] pt-10">
            <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">About {product.name}</h2>
            <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">{product.description}</p>
          </div>
        )}

        <div className="mt-10 max-w-3xl border-t border-[color:var(--glass-border)] pt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Customer Reviews</h2>
          {product.reviewCount > 0 ? (
            <div className="mt-3">
              <RatingStars rating={product.averageRating} reviewCount={product.reviewCount} />
            </div>
          ) : (
            <p className="mt-3 text-[color:var(--text-muted)]">No reviews yet for {product.name}.</p>
          )}
        </div>
      </div>

      <RelatedProducts products={related} />
    </>
  );
}
