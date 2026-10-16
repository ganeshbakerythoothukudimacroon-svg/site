import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { pageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = pageMetadata({
  title: "About Ganesh Bakery | Shop 532, Thoothukudi",
  description:
    "Ganesh Bakery, Shop No. 532, Thoothukudi (Tuticorin) — a family bakery established in 1964, making biscuits, rusk, nutbar and macroons.",
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
            {siteConfig.brandName} is a family bakery in {siteConfig.locality} (Tuticorin), Tamil Nadu,
            established in {siteConfig.since}. {siteConfig.shopBranch} is our main bakery and shop.
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
            The {siteConfig.brandName} name has been part of {siteConfig.locality}&apos;s bakery scene since{" "}
            {siteConfig.since}.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-6">
            <figure className="w-36 text-center">
              <div className="glass-subtle glow-gold relative mx-auto aspect-[3/4] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/brand/founder-dharmalingam.jpg"
                  alt={`Shri K. Dharmalingam — founder of ${siteConfig.brandName}, ${siteConfig.since}`}
                  fill
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2">
                <p className="text-sm font-medium text-[color:var(--text-primary)]">Shri K. Dharmalingam</p>
                <p className="label-tracked mt-0.5 text-[10px] text-[color:var(--text-muted)]">Founder, {siteConfig.since}</p>
              </figcaption>
            </figure>
            <figure className="w-36 text-center">
              <div className="glass-subtle glow-gold relative mx-auto aspect-[3/4] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/brand/father-katteri-raj.jpg"
                  alt={`Shri T. Katteri Raj — carried the ${siteConfig.brandName} tradition forward`}
                  fill
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2">
                <p className="text-sm font-medium text-[color:var(--text-primary)]">Shri T. Katteri Raj</p>
                <p className="label-tracked mt-0.5 text-[10px] text-[color:var(--text-muted)]">Carried the tradition forward</p>
              </figcaption>
            </figure>
          </div>

          <p className="glass-subtle mt-6 rounded-2xl p-4 text-sm text-[color:var(--text-secondary)]">
            Our grandfather, Shri K. Dharmalingam, founded the bakery in {siteConfig.since}. Our father, Shri T.
            Katteri Raj, carried it forward after him. Today, we continue the family&apos;s work at{" "}
            {siteConfig.shopBranch} — three generations of the same family.
          </p>
        </section>

        <section id="press" className="mt-10 scroll-mt-24">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Featured in The Hindu</h2>
          <figure className="glass-subtle mt-4 rounded-2xl p-5">
            <blockquote className="font-display text-lg text-[color:var(--text-primary)] text-pretty">
              &ldquo;What matters as much as quality is the way you present the product.&rdquo;
            </blockquote>
            <figcaption className="mt-2 text-sm text-[color:var(--text-muted)]">
              — Shri K. Dharmalingam, speaking to The Hindu
            </figcaption>
          </figure>
          <p className="mt-4 text-[color:var(--text-secondary)] text-pretty">
            In December 2012, Olympia Shilpa Gerald of The Hindu&apos;s MetroPlus went in search of the Thoothukudi
            macaroon and stopped at {siteConfig.brandName}, describing it as &ldquo;arguably the most popular in
            the city&rdquo;, with crowds at the counter at any time of the day. Our founder shared his view of the
            macaroon&apos;s roots in the port town&apos;s Dutch and Portuguese past, and the article watched our
            bakers whisk egg whites, fold in cashew and pipe each cone by hand, baking in both traditional
            firewood and modern ovens to keep up with demand.
          </p>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            Even then, our macaroons were handed over gift-wrapped — a tradition of care in presentation that we
            still follow today.
          </p>
          <p className="mt-3 text-sm">
            <a
              href="https://www.thehindu.com/features/metroplus/Food/in-search-of-thoothukudi-macaroon/article4170768.ece"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]"
            >
              Read &ldquo;In search of Thoothukudi macaroon&rdquo; on The Hindu &rarr;
            </a>
          </p>
        </section>

        <section id="mission-vision" className="mt-10 scroll-mt-24">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="glass-subtle rounded-2xl p-5">
              <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Our Mission</h2>
              <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
                To make every customer happy with every order. We bake with honest ingredients and the methods our
                family has trusted since {siteConfig.since}, pack each order with care, and listen when something
                isn&apos;t right — because a customer who comes back smiling matters more to us than any single
                sale.
              </p>
            </div>
            <div className="glass-subtle rounded-2xl p-5">
              <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Our Vision</h2>
              <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
                To be the bakery {siteConfig.locality} is proud of, and the name families everywhere think of
                first for the true taste of the Thoothukudi macroon — carrying our grandfather&apos;s standards of
                quality, freshness and care to every home we deliver to, for generations to come.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Our Products &amp; Food Information</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            We make biscuits, rusk, nutbar and macroons, freshly baked and sold by the kilogram. Ingredient,
            allergen, shelf-life and storage information is shown on each product page — please read it before
            ordering, especially if you or anyone you are ordering for has a food allergy.
          </p>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            Our food is perishable and prepared for each order, so all sales are final. Please read our{" "}
            <Link href="/returns-policy" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
              Refund &amp; Returns Policy
            </Link>{" "}
            and{" "}
            <Link href="/shipping-policy" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
              Shipping Policy
            </Link>{" "}
            before you order.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Where to Find Us</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            {siteConfig.shopBranch} is our main bakery and shop in {siteConfig.locality}, at{" "}
            {siteConfig.address.line1}, {siteConfig.address.line2}. You can also find us at our second location,{" "}
            {siteConfig.secondaryLocation.address}. Full details for both are on our{" "}
            <Link href="/contact" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
              Contact page
            </Link>
            .
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Our Commitment</h2>
          <p className="mt-3 text-[color:var(--text-secondary)] text-pretty">
            We aim to make ordering from {siteConfig.shopBranch} as easy as visiting in person. Browse our{" "}
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
