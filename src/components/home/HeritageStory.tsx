import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function HeritageStory() {
  return (
    <section className="relative overflow-hidden py-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(900px 500px at 50% 50%, var(--purple-glow), transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 flex justify-center lg:order-1">
            <div className="glass-premium glow-gold relative flex h-64 w-64 items-center justify-center rounded-full sm:h-80 sm:w-80">
              <div className="relative h-[70%] w-[70%] overflow-hidden rounded-full">
                <Image src="/brand/emblem.png" alt={`${siteConfig.brandName} — Since ${siteConfig.since}`} fill className="object-cover" />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="label-tracked mb-3 text-[color:var(--gold-400)]">Est. {siteConfig.since}</p>
            <h2 className="font-display text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl text-balance">
              A Taste That Belongs to <span className="italic text-gradient-gold">Thoothukudi</span>
            </h2>
            <p className="mt-5 text-base text-[color:var(--text-secondary)] text-pretty">
              {siteConfig.brandName} has carried the name of Tuticorin&apos;s baking tradition since{" "}
              {siteConfig.since}. At {siteConfig.shopBranch}, that same family heritage continues today — recipes
              handed down, ingredients chosen with care, and every batch baked with the intention of being shared.
            </p>
            <p className="glass-subtle mt-5 rounded-2xl p-4 text-sm text-[color:var(--text-muted)]">
              [CLIENT TO PROVIDE: full heritage story — founding details, family history, and craftsmanship notes
              for Shop No. 532]
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]"
            >
              Read Our Full Story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
