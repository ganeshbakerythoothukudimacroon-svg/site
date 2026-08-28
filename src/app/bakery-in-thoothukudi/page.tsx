import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { getCategories, getFeaturedProducts } from "@/lib/services/product-service";
import { pageMetadata } from "@/lib/seo/metadata";
import { localBusinessSchema } from "@/lib/seo/schema";
import { formatAddress, siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Bakery in Thoothukudi | Ganesh Bakery Shop 532",
  description:
    "Looking for a bakery in Thoothukudi (Tuticorin)? Ganesh Bakery, Shop No. 532 bakes traditional biscuits, rusk and macaroons since 1964 — visit us or order online.",
  path: "/bakery-in-thoothukudi",
});

export default async function BakeryInThoothukudiPage() {
  const [products, categories] = await Promise.all([getFeaturedProducts(8), getCategories()]);

  return (
    <>
      <JsonLd data={localBusinessSchema(products)} />
      <Breadcrumbs items={[{ name: "Bakery in Thoothukudi", path: "/bakery-in-thoothukudi" }]} />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold text-[color:var(--text-primary)] sm:text-5xl text-balance">
          Looking for a Bakery in Thoothukudi?
        </h1>
        <p className="mt-4 text-lg text-[color:var(--text-secondary)] text-pretty">
          {siteConfig.brandName}, {siteConfig.shopBranch} has been baking in {siteConfig.locality} (Tuticorin)
          since {siteConfig.since} — traditional biscuits, rusk, nutbar and macaroons, made the way they always
          have been.
        </p>

        <section className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="glass-card rounded-[var(--radius-card)] p-6">
            <div className="flex items-center gap-2.5">
              <span className="glass-subtle flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--gold-400)]">
                <MapPin className="h-4 w-4" />
              </span>
              <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">Visit Us</h2>
            </div>
            <p className="mt-3 text-[color:var(--text-secondary)]">{siteConfig.brandName}</p>
            <p className="text-[color:var(--text-secondary)]">{siteConfig.shopBranch}</p>
            <p className="mt-2 text-[color:var(--text-secondary)]">{formatAddress()}</p>
            <a
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]"
            >
              Get Directions <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="glass-card rounded-[var(--radius-card)] p-6">
            <div className="flex items-center gap-2.5">
              <span className="glass-subtle flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--gold-400)]">
                <Clock className="h-4 w-4" />
              </span>
              <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">Opening Hours</h2>
            </div>
            <p className="mt-3 text-[color:var(--text-secondary)]">{siteConfig.openingHours}</p>
            <h2 className="mt-5 font-display text-lg font-semibold text-[color:var(--text-primary)]">Contact</h2>
            <p className="mt-2 text-[color:var(--text-muted)]">
              See our{" "}
              <Link href="/contact" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
                Contact page
              </Link>{" "}
              for phone, WhatsApp and email.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">What We Bake</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            Our bakery in Thoothukudi specialises in traditional Tuticorin bakery products:
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/shop/${category.slug}`}
                  className="glass-button rounded-full px-4 py-1.5 text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--gold-400)]"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            <Link href="/thoothukudi-macroons" className="font-semibold text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
              Read more about our Thoothukudi macaroons →
            </Link>
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Ordering Options</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            Visit {siteConfig.shopBranch} in person, or{" "}
            <Link href="/shop" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
              order online
            </Link>{" "}
            for delivery. For weddings, festivals or corporate gifting, see our{" "}
            <Link href="/bulk-orders" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
              Bulk Orders
            </Link>{" "}
            page.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Local Service Area</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            {siteConfig.shopBranch} serves customers in and around {siteConfig.locality} (Tuticorin), Tamil Nadu,
            with delivery available further afield — see our{" "}
            <Link href="/shipping-policy" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
              shipping policy
            </Link>{" "}
            for details.
          </p>
        </section>
      </div>
    </>
  );
}
