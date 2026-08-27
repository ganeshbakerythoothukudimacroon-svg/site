import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Shipping Policy | Ganesh Bakery",
  description: "Shipping and delivery information for orders from Ganesh Bakery, Shop No. 532, Thoothukudi.",
  path: "/shipping-policy",
});

export default function ShippingPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Shipping Policy", path: "/shipping-policy" }]} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold text-[color:var(--text-primary)]">Shipping Policy</h1>
        <div className="mt-6 space-y-4 text-[color:var(--text-secondary)]">
          <p>
            {siteConfig.brandName}, {siteConfig.shopBranch} ships bakery products from {siteConfig.locality},
            Tamil Nadu.
          </p>
          <p className="glass-subtle rounded-2xl p-4 text-sm text-[color:var(--text-muted)]">
            [CLIENT TO PROVIDE: delivery areas/pin codes served, shipping charges, estimated delivery timelines,
            and packaging/handling notes for perishable items]
          </p>
        </div>
      </div>
    </>
  );
}
