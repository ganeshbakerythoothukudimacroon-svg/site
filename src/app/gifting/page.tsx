import type { Metadata } from "next";
import { Gift, MessageCircle } from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Gift Boxes & Festival Gifting | Ganesh Bakery Shop 532",
  description:
    "Festival, family and corporate gift boxes from Ganesh Bakery, Shop No. 532, Thoothukudi — share the taste of Tuticorin with the people you care about.",
  path: "/gifting",
});

const OCCASIONS = ["Festival Gifts", "Family Gifts", "Corporate Gifts", "Wedding Gifts", "Traditional Gift Boxes"];

export default function GiftingPage() {
  const message = encodeURIComponent(
    `Hi ${siteConfig.brandName} (${siteConfig.shopBranch}), I'd like to enquire about a gift box.`
  );

  return (
    <>
      <Breadcrumbs items={[{ name: "Gifting", path: "/gifting" }]} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <span className="glass-subtle flex h-12 w-12 items-center justify-center rounded-full text-[color:var(--gold-400)]">
          <Gift className="h-5 w-5" />
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold text-[color:var(--text-primary)] sm:text-5xl text-balance">
          Gift Boxes &amp; Festival Gifting
        </h1>
        <p className="mt-4 text-lg text-[color:var(--text-secondary)] text-pretty">
          Share the taste of Tuticorin with family and friends — thoughtfully put together gift boxes from{" "}
          {siteConfig.brandName}, {siteConfig.shopBranch}, for festivals and special occasions.
        </p>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {OCCASIONS.map((occasion) => (
            <li
              key={occasion}
              className="glass-card rounded-xl px-4 py-3 text-sm font-medium text-[color:var(--text-primary)]"
            >
              {occasion}
            </li>
          ))}
        </ul>

        <p className="glass-subtle mt-8 rounded-2xl p-4 text-sm text-[color:var(--text-muted)]">
          [CLIENT TO PROVIDE: gift box contents, sizing, and pricing]
        </p>

        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="glow-gold-hover mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-7 py-3.5 text-sm font-semibold text-[color:var(--bg-void)]"
        >
          <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
        </a>
      </div>
    </>
  );
}
