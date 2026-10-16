import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/services/product-service";
import { pageMetadata } from "@/lib/seo/metadata";
import { faqSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";
import { faqItems } from "@/lib/content/faq";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PriceTag } from "@/components/shared/PriceTag";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { AddToCartButton } from "@/components/product/AddToCartButton";

export const metadata: Metadata = pageMetadata({
  title: "Thoothukudi Macroons (Tuticorin Macaroons) | Ganesh Bakery",
  description:
    "Buy authentic Thoothukudi macroons — the famous Tuticorin macaroons of cashew, egg white and sugar — from Ganesh Bakery, Shop No. 532, Thoothukudi, baking since 1964. Delivered across India.",
  path: "/thoothukudi-macroons",
});

const relevantFaq = faqItems.filter((item) =>
  [
    "What are Thoothukudi macroons?",
    "Are Thoothukudi macroons the same as macaroons?",
    "Can I buy macroons online?",
    "Do you deliver Tuticorin macaroons outside Tamil Nadu?",
    "What sizes are available?",
    "How should macroons and biscuits be stored?",
    "What is the shelf life?",
    "Do you deliver bakery products?",
  ].includes(item.question)
);

export default async function ThoothukudiMacroonsPage() {
  const product = await getProductBySlug("macroon-1kg");
  const image = product?.images[0];

  return (
    <>
      <JsonLd data={faqSchema(relevantFaq)} />
      <Breadcrumbs items={[{ name: "Thoothukudi Macroons", path: "/thoothukudi-macroons" }]} />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold text-[color:var(--text-primary)] sm:text-5xl text-balance">
          Thoothukudi Macroons
        </h1>
        <p className="mt-4 text-lg text-[color:var(--text-secondary)] text-pretty">
          The famous Tuticorin macaroon — the sweet Thoothukudi (Tuty) is known for — baked by{" "}
          {siteConfig.brandName}, {siteConfig.shopBranch} since {siteConfig.since}.
        </p>

        {image && (
          <div className="glass-premium relative mt-8 aspect-4/5 max-w-sm overflow-hidden rounded-[var(--radius-card)]">
            <Image src={image.url} alt={image.alt || "Thoothukudi macroons from Ganesh Bakery"} fill className="object-cover object-right" />
          </div>
        )}

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">What Are Thoothukudi Macroons?</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            Thoothukudi macroons — also spelt macaroons, and often called Tuticorin or Tuty macaroons — are the
            signature sweet of this port town on the Tamil Nadu coast. Around the world a macaroon is usually flat
            and made with almond or coconut; only in Thoothukudi is it filled with cashew and shaped into a cone
            with a round base and a pointed peak. They are quite different from French macarons.
          </p>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            The sweet is a legacy of the town&apos;s centuries as a trading port. Our founder, Shri K.
            Dharmalingam, told{" "}
            <Link href="/about#press" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
              The Hindu
            </Link>{" "}
            that the sweet likely goes back to the Dutch and Portuguese era, when local men working for the ships
            anchored off Thoothukudi improvised on the flat almond macaroon — the beginning of the cashew cone the
            city is famous for today.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Why Ours Are Different</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            At {siteConfig.brandName}, {siteConfig.shopBranch}, our macroons follow the same approach we&apos;ve
            baked to since {siteConfig.since} — part of the wider {siteConfig.brandName} family heritage in{" "}
            {siteConfig.locality}.
          </p>
          <p className="glass-subtle mt-3 rounded-2xl p-4 text-sm text-[color:var(--text-secondary)]">
            Just three ingredients — egg whites, cashew nuts, and sugar — whipped and baked low and slow. No
            shortcuts, no flour.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Choose Your Size</h2>
          {product ? (
            <div className="glass-card mt-4 flex flex-wrap items-center gap-4 rounded-[var(--radius-card)] p-5">
              <div>
                <p className="font-medium text-[color:var(--text-primary)]">
                  {product.name} {product.weightLabel && `(${product.weightLabel})`}
                </p>
                <PriceTag price={product.price} regularPrice={product.regularPrice} />
              </div>
              <AddToCartButton product={product} />
              <Link href={`/product/${product.slug}`} className="text-sm font-semibold text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
                View Product →
              </Link>
            </div>
          ) : (
            <p className="mt-3 text-[color:var(--text-secondary)]">
              Macroons are available in our{" "}
              <Link href="/shop" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
                shop
              </Link>
              , or visit us at {siteConfig.shopBranch}.
            </p>
          )}
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">How We Package Them</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            Macroons are delicate and absorb moisture quickly, so each order is packed in food-grade, sealed
            packaging with a protective outer layer for transit, and our macroons are individually and securely
            packed to reduce breakage on the way to you.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Delivery Across India</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            We offer delivery on our bakery products — see our{" "}
            <Link href="/shipping-policy" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
              shipping policy
            </Link>{" "}
            for details, or browse the full{" "}
            <Link href="/shop" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
              shop
            </Link>{" "}
            for our other bakery products.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Frequently Asked Questions</h2>
          <div className="mt-4">
            <FAQAccordion items={relevantFaq} />
          </div>
        </section>

        <p className="mt-10 text-sm text-[color:var(--text-muted)]">
          Learn more about our family bakery on the{" "}
          <Link href="/about" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
            About
          </Link>{" "}
          page, or explore our other bakery specialties in the{" "}
          <Link href="/shop" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
            Shop
          </Link>
          .
        </p>
      </div>
    </>
  );
}
