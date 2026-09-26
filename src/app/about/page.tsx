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
