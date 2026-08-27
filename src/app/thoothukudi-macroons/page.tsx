import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/repositories/product-repository";
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
  title: "Thoothukudi Macaroons | Buy Macaroons Online | Ganesh Bakery",
  description:
    "Thoothukudi macaroons (also spelled macroons, from Tuticorin) — baked by Ganesh Bakery, Shop No. 532 since 1964. Order online and have them shipped to you.",
  path: "/thoothukudi-macroons",
});

const relevantFaq = faqItems.filter((item) =>
  [
    "What are Thoothukudi macaroons?",
    "Can I buy macaroons online?",
    "What sizes are available?",
    "How should macaroons and biscuits be stored?",
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
      <Breadcrumbs items={[{ name: "Thoothukudi Macaroons", path: "/thoothukudi-macroons" }]} />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold text-[color:var(--text-primary)] sm:text-5xl text-balance">
          Thoothukudi Macaroons
        </h1>
        <p className="mt-4 text-lg text-[color:var(--text-secondary)] text-pretty">
          A bakery specialty of Thoothukudi — also known as Tuticorin — baked by {siteConfig.brandName},{" "}
          {siteConfig.shopBranch} since {siteConfig.since}.
        </p>

        {image && (
          <div className="glass-premium relative mt-8 aspect-4/5 max-w-sm overflow-hidden rounded-[var(--radius-card)]">
            <Image src={image.url} alt={image.alt || "Thoothukudi macaroons from Ganesh Bakery"} fill className="object-cover object-right" />
          </div>
        )}

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">What Are Thoothukudi Macaroons?</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            Thoothukudi macaroons — sometimes spelled &ldquo;macroons&rdquo; locally — are a baked confection
            associated with Thoothukudi (Tuticorin) on the Tamil Nadu coast. They&apos;re distinct from French
            macarons, and have become closely tied to the city&apos;s identity as a bakery town.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Why Ours Are Different</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            At {siteConfig.brandName}, {siteConfig.shopBranch}, our macaroons follow the same approach we&apos;ve
            baked to since {siteConfig.since} — part of the wider {siteConfig.brandName} family heritage in{" "}
            {siteConfig.locality}.
          </p>
          <p className="glass-subtle mt-3 rounded-2xl p-4 text-sm text-[color:var(--text-muted)]">
            [CLIENT TO PROVIDE: specific ingredients, texture notes, and what makes {siteConfig.shopBranch}&apos;s
            macaroons distinctive]
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
            <p className="mt-3 text-[color:var(--text-muted)]">[CLIENT TO PROVIDE: current macaroon availability]</p>
          )}
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">How We Package Them</h2>
          <p className="glass-subtle mt-3 rounded-2xl p-4 text-sm text-[color:var(--text-muted)]">
            [CLIENT TO PROVIDE: packaging details]
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
