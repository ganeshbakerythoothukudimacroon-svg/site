import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MessageCircle, PackageCheck, ShoppingBag, Store, Truck } from "lucide-react";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/services/product-service";
import { pageMetadata } from "@/lib/seo/metadata";
import { productSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";
import { splitProductName } from "@/lib/product-name";
import { reviewsForProduct } from "@/lib/content/reviews";
import { GoogleReviewCard } from "@/components/shared/GoogleReviewCard";
import type { Product } from "@/lib/types";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PriceTag } from "@/components/shared/PriceTag";
import { RatingStars } from "@/components/shared/RatingStars";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { RelatedProducts } from "@/components/product/RelatedProducts";

// Ingredients/Shelf Life/Storage/Allergens are read from each product's
// WooCommerce custom attributes (wp-admin → Products → edit product →
// Attributes) rather than hardcoded here, so the client can update them
// without a code deploy. A fact whose attribute hasn't been set is left out
// entirely rather than guessed at — getting food-safety facts wrong on a
// live site is a real risk, not just a copy nicety.
const PRODUCT_FACT_LABELS = ["Ingredients", "Shelf Life", "Storage", "Allergens"] as const;

function findAttribute(product: Product, name: string): string | null {
  return product.attributes.find((a) => a.name.toLowerCase() === name.toLowerCase())?.value ?? null;
}

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

  const { baseName, size } = splitProductName(product.name);
  return pageMetadata({
    title: `${baseName} in ${siteConfig.locality}${size ? `, ${size}` : ""} | ${siteConfig.brandName} Tuty`,
    description:
      product.shortDescription ||
      `${baseName} from ${siteConfig.brandName}, ${siteConfig.shopBranch}, ${siteConfig.locality} (Tuticorin) — freshly baked since ${siteConfig.since} and delivered across India.`,
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
  const { baseName } = splitProductName(product.name);
  const googleReviewsHere = reviewsForProduct(product.slug);
  const productFacts = PRODUCT_FACT_LABELS.flatMap((label) => {
    const value = findAttribute(product, label)?.trim();
    return value ? [{ label, value }] : [];
  });

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
            <p className="mt-1.5 text-sm text-[color:var(--text-muted)]">
              Baked at {siteConfig.brandName}, {siteConfig.shopBranch} · {siteConfig.locality} ({siteConfig.localityAlias})
            </p>
            {product.weightLabel && (
              <p className="label-tracked mt-2 text-[color:var(--text-muted)]">{product.weightLabel}</p>
            )}
            <div className="mt-3">
              <RatingStars rating={product.averageRating} reviewCount={product.reviewCount} />
            </div>
            <div className="mt-4">
              <PriceTag
                price={product.price}
                regularPrice={product.variations.length > 0 ? null : product.regularPrice}
                size="lg"
                from={product.variations.length > 1}
              />
            </div>
            {product.shortDescription && (
              <p className="mt-4 text-base text-[color:var(--text-secondary)] text-pretty">{product.shortDescription}</p>
            )}

            <div className="mt-6">
              <ProductPurchasePanel product={product} />
            </div>

            {productFacts.length > 0 && (
              <dl className="glass-card mt-8 grid grid-cols-2 gap-5 rounded-[var(--radius-card)] p-5 text-sm">
                {productFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="font-medium text-[color:var(--gold-400)]">{fact.label}</dt>
                    <dd className="mt-1 text-[color:var(--text-muted)]">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}

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
          <div className="mt-14 grid gap-10 border-t border-[color:var(--glass-border)] pt-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">
                About Our {baseName} — Baked in {siteConfig.locality}
              </h2>
              {product.description.split(/\n{2,}/).map((para, i) => (
                <p key={i} className="mt-3 text-[color:var(--text-secondary)] text-pretty">
                  {para}
                </p>
              ))}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="glass-premium rounded-[var(--radius-card)] p-6">
                <h3 className="label-tracked text-[color:var(--gold-400)]">Order with Confidence</h3>
                <ul className="mt-4 space-y-4 text-sm">
                  {[
                    { icon: Truck, title: "Free delivery", text: "On every order, anywhere we deliver in India." },
                    {
                      icon: ShoppingBag,
                      title: `Minimum order ₹${siteConfig.minOrderValue.toLocaleString("en-IN")}`,
                      text: "Mix any products and sizes to reach it.",
                    },
                    {
                      icon: PackageCheck,
                      title: "Packed fresh & sealed",
                      text: "Food-grade, sealed packaging with a protective outer layer.",
                    },
                    {
                      icon: Store,
                      title: `${siteConfig.shopBranch}, since ${siteConfig.since}`,
                      text: "V.E. Road, opposite V.O.C. Market, Thoothukudi.",
                    },
                  ].map(({ icon: Icon, title, text }) => (
                    <li key={title} className="flex gap-3">
                      <span className="glass-subtle flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[color:var(--gold-400)]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block font-semibold text-[color:var(--text-primary)]">{title}</span>
                        <span className="text-[color:var(--text-secondary)]">{text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hi! I have a question about ${baseName}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button icon-glow mt-6 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-[color:var(--text-primary)]"
                >
                  <MessageCircle className="h-4 w-4 text-[color:var(--gold-400)]" /> Ask us on WhatsApp
                </a>
              </div>
            </aside>
          </div>
        )}

        {/* Only shown when there's something real to show — never an empty
            "No reviews yet". Google reviews are quoted, not marked up as
            this product's rating (see lib/content/reviews.ts). */}
        {(product.reviewCount > 0 || googleReviewsHere.length > 0) && (
          <div className="mt-10 border-t border-[color:var(--glass-border)] pt-10">
            <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">
              What Customers Say About Our {baseName}
            </h2>
            {product.reviewCount > 0 && (
              <div className="mt-3">
                <RatingStars rating={product.averageRating} reviewCount={product.reviewCount} />
              </div>
            )}
            {googleReviewsHere.length > 0 && (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {googleReviewsHere.map((review) => (
                  <GoogleReviewCard key={review.name} review={review} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <RelatedProducts products={related} />
    </>
  );
}
