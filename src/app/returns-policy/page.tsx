import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Refund & Returns Policy | Ganesh Bakery",
  description: "Refund and returns policy for orders from Ganesh Bakery, Shop No. 532, Thoothukudi.",
  path: "/returns-policy",
});

export default function ReturnsPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Returns Policy", path: "/returns-policy" }]} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold text-[color:var(--text-primary)]">Refund &amp; Returns Policy</h1>
        <div className="mt-6 space-y-4 text-[color:var(--text-secondary)]">
          <p>
            As {siteConfig.brandName}, {siteConfig.shopBranch} sells perishable bakery items, our approach to
            returns and refunds differs from non-perishable goods.
          </p>
          <p className="glass-subtle rounded-2xl p-4 text-sm text-[color:var(--text-muted)]">
            [CLIENT TO PROVIDE: conditions for refunds/replacements — e.g. damaged in transit, wrong item
            received — and the process/timeline for raising a claim]
          </p>
          <p>
            For any issue with an order, please{" "}
            <a href="/contact" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
              contact us
            </a>{" "}
            directly.
          </p>
        </div>
      </div>
    </>
  );
}
