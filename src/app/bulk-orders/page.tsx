import type { Metadata } from "next";
import { Users, MessageCircle } from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = pageMetadata({
  title: "Bulk & Corporate Orders | Ganesh Bakery Shop 532",
  description:
    "Planning a wedding, corporate gifting, festival order or large family order? Ganesh Bakery, Shop No. 532, Thoothukudi can help — enquire directly.",
  path: "/bulk-orders",
});

const OCCASIONS = ["Wedding Orders", "Corporate Gifting", "Festival Orders", "Return Gifts", "Large Family Orders"];

export default function BulkOrdersPage() {
  const message = encodeURIComponent(
    `Hi ${siteConfig.brandName} (${siteConfig.shopBranch}), I'd like to enquire about a bulk order.`
  );

  return (
    <>
      <Breadcrumbs items={[{ name: "Bulk Orders", path: "/bulk-orders" }]} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <span className="glass-subtle flex h-12 w-12 items-center justify-center rounded-full text-[color:var(--gold-400)]">
          <Users className="h-5 w-5" />
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold text-[color:var(--text-primary)] sm:text-5xl text-balance">
          Planning a Large Order?
        </h1>
        <p className="mt-4 text-lg text-[color:var(--text-secondary)] text-pretty">
          Weddings, corporate gifting, a festival order or a large family order — {siteConfig.brandName},{" "}
          {siteConfig.shopBranch} can help. Get in touch and we&apos;ll work out the details with you directly.
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
          Pricing for bulk orders depends on quantity and requirements — we&apos;ll confirm details with you
          directly rather than list fixed prices here.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-gold-hover inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-7 py-3.5 text-sm font-semibold text-[color:var(--bg-void)]"
          >
            <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
          </a>
        </div>

        <div className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[color:var(--text-primary)]">Request a Bulk Order</h2>
          <div className="mt-4">
            <ContactForm formType="bulk-order" />
          </div>
        </div>
      </div>
    </>
  );
}
