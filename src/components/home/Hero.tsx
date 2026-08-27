import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Hero({
  imageUrl,
  imageAlt,
  imageCaption,
}: {
  imageUrl: string | null;
  imageAlt: string;
  imageCaption?: string;
}) {
  const heritageYears = Math.floor((new Date().getFullYear() - siteConfig.since) / 10) * 10;

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        <div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--purple-glow), transparent 70%)" }}
        />
        <div
          className="absolute -right-24 top-1/3 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--gold-glow), transparent 70%)" }}
        />
      </div>

      {/*
        Single content + image tree, repositioned per breakpoint via CSS
        Grid — text overlays the photo on mobile (matching the reference),
        sits beside it on desktop. This keeps exactly one <h1> in the DOM
        instead of duplicating the whole block per breakpoint.
      */}
      <div
        className="relative mx-auto grid max-w-7xl [grid-template-areas:'stage'] px-4 py-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-28 lg:[grid-template-areas:'content_image']"
      >
        <div className="relative aspect-[4/5] w-full [grid-area:stage] sm:aspect-[16/11] lg:aspect-4/5 lg:max-w-sm lg:[grid-area:image]">
        <div className="glass-premium absolute inset-0 overflow-hidden rounded-[2rem] lg:rounded-[2.5rem]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 24rem, 100vw"
              className="object-cover object-right"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[color:var(--text-muted)]">
              Photo coming soon
            </div>
          )}
          {/* Legibility scrim behind the overlaid text — mobile only */}
          <div
            className="pointer-events-none absolute inset-0 lg:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(18,3,12,0.7) 0%, rgba(18,3,12,0.15) 32%, rgba(18,3,12,0.55) 64%, rgba(18,3,12,0.92) 100%)",
            }}
          />
          {/* Desktop-only bottom vignette so the photo integrates with the page */}
          <div
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{ boxShadow: "inset 0 -80px 80px -40px rgba(18,3,12,0.7)" }}
          />
          {imageCaption && (
            <span className="label-tracked glass-premium absolute right-4 top-[calc(env(safe-area-inset-top)+1rem)] rounded-full px-3 py-1.5 text-[9px] text-[color:var(--gold-300)] lg:top-4">
              {imageCaption}
            </span>
          )}
        </div>

          {/* Desktop: badge anchored to the image's own corner — a sibling
              of the clipped photo wrapper above, so it isn't cut off. */}
          <div className="glass-premium glow-gold absolute -bottom-6 -left-10 hidden h-28 w-28 flex-col items-center justify-center rounded-full text-center lg:flex">
            <span className="font-display text-2xl font-bold text-gradient-gold">{heritageYears}+</span>
            <span className="label-tracked text-[9px] leading-tight text-[color:var(--text-secondary)]">
              Years of
              <br />
              Heritage
            </span>
          </div>
        </div>

        <div className="relative flex flex-col justify-end gap-4 [grid-area:stage] px-2 pb-6 pt-20 sm:px-4 lg:justify-center lg:gap-6 lg:px-0 lg:py-0 lg:[grid-area:content]">
          <p className="label-tracked inline-flex w-fit items-center gap-2 rounded-full glass-subtle px-4 py-1.5 text-[color:var(--gold-400)]">
            Est. {siteConfig.since} · {siteConfig.locality}
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] text-[color:var(--text-primary)] sm:text-5xl lg:text-6xl text-balance">
            Taste the Tradition,
            <br />
            <span className="font-display italic text-gradient-gold">Loved for Generations</span>
          </h1>
          <p className="max-w-lg text-base text-[color:var(--text-secondary)] sm:text-lg text-pretty">
            Home to the Thoothukudi Macaroon and other handcrafted biscuits, rusk and bakery specialities,{" "}
            {siteConfig.brandName}, {siteConfig.shopBranch} has baked the way our family always has since{" "}
            {siteConfig.since} — freshly made, and now easier than ever to order.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="glow-gold-hover inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-7 py-3.5 text-sm font-semibold text-[color:var(--bg-void)]"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="glass-button inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-[color:var(--text-primary)]"
            >
              Our Story
            </Link>
          </div>

          {/* Mobile: badge sits in normal content flow */}
          <div className="glass-premium glow-gold flex w-fit items-center gap-2 rounded-full py-2 pl-2 pr-4 lg:hidden">
            <span className="font-display text-lg font-bold text-gradient-gold">{heritageYears}+</span>
            <span className="label-tracked text-[9px] leading-tight text-[color:var(--text-secondary)]">
              Years of Heritage
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
