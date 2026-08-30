import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "About Ganesh Bakery | Shop 532, Thoothukudi",
  description:
    "Ganesh Bakery, Shop No. 532 is part of the Ganesh Bakery family heritage in Thoothukudi (Tuticorin), baking traditional biscuits, rusk and macaroons since 1964.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold text-[color:var(--text-primary)] sm:text-5xl text-balance">
          About {siteConfig.brandName}
        </h1>
        <p className="mt-4 text-lg text-[color:var(--text-secondary)] text-pretty">
          {siteConfig.brandName}, {siteConfig.shopBranch} — {siteConfig.locality} (Tuticorin), Tamil Nadu.
        </p>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Who We Are</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            {siteConfig.brandName} is a family bakery name that has stood in {siteConfig.locality} since{" "}
            {siteConfig.since}. {siteConfig.shopBranch} is one part of that family heritage — an independent
            bakery carrying the {siteConfig.brandName} name forward with its own shop, its own bakers, and its
            own day-to-day craft.
          </p>
        </section>

        <section id="story" className="mt-10 scroll-mt-24">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Our Heritage</h2>
          <div className="mt-5 flex justify-center">
            <div className="glass-premium glow-gold relative flex h-40 w-40 items-center justify-center rounded-full">
              <div className="relative h-[72%] w-[72%]">
                <Image
                  src="/brand/emblem.png"
                  alt={`${siteConfig.brandName} — Since ${siteConfig.since}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <p className="mt-5 text-[color:var(--text-secondary)] text-pretty">
            The {siteConfig.brandName} name has been associated with {siteConfig.locality}&apos;s bakery
            tradition since {siteConfig.since}. At {siteConfig.shopBranch}, that heritage continues today.
          </p>
          <p className="glass-subtle mt-4 rounded-2xl p-4 text-sm text-[color:var(--text-secondary)]">
            It began with our grandfather, who started the bakery in {siteConfig.since}. When the time came, our
            father took over and carried it forward, keeping the same recipes and the same standards. Today, we
            continue that legacy at {siteConfig.shopBranch} — three generations of the same family, still baking
            the way it started.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Our Philosophy &amp; Quality</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            Quality, to us, is a standard carried forward rather than a claim we make — the same care in
            choosing ingredients and baking each batch that has been part of the {siteConfig.brandName} name
            since {siteConfig.since}.
          </p>
          <p className="glass-subtle mt-3 rounded-2xl p-4 text-sm text-[color:var(--text-secondary)]">
            We bake in small batches rather than mass-produce, so every tray gets the attention it needs.
            Ingredients are chosen for what they add to the taste, not for what&apos;s cheapest or fastest to
            source. And the recipes themselves haven&apos;t been simplified or swapped out for convenience — they
            still follow the same method they always have.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">{siteConfig.shopBranch}</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            {siteConfig.shopBranch} is our own independent bakery and shop in {siteConfig.locality}. It is
            distinct from other Ganesh Bakery family locations, while sharing the same family name and baking
            heritage.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Our Commitment</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            We bake fresh, use quality ingredients, and aim to make ordering from {siteConfig.shopBranch} as easy
            as visiting in person. Browse our{" "}
            <Link href="/shop" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
              shop
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
              get in touch
            </Link>{" "}
            with any questions.
          </p>
        </section>
      </div>
    </>
  );
}
