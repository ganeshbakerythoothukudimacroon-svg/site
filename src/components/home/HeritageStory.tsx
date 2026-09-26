import { siteConfig } from "@/lib/site-config";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
              <div className="relative h-[70%] w-[70%]">
                <Image src="/brand/emblem.png" alt={`${siteConfig.brandName} — Since ${siteConfig.since}`} fill className="object-contain" />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="label-tracked mb-3 text-[color:var(--gold-400)]">Est. {siteConfig.since}</p>
            <h2 className="font-display text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl text-balance">
              A Taste That Belongs to <span className="italic text-gradient-gold">Thoothukudi</span>
            </h2>
            <p className="mt-5 text-base text-[color:var(--text-secondary)] text-pretty">
              {siteConfig.brandName} has been part of Tuticorin&apos;s bakery scene since {siteConfig.since}.{" "}
              {siteConfig.shopBranch} is our main bakery and shop today.
            </p>
            <p className="glass-subtle mt-5 rounded-2xl p-4 text-sm text-[color:var(--text-secondary)]">
              Our grandfather, Shri K. Dharmalingam, founded the bakery in {siteConfig.since}. Our father, Shri T.
              Katteri Raj, carried it forward after him, and today we continue the family&apos;s work at{" "}
              {siteConfig.shopBranch} — three generations of the same family.
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
