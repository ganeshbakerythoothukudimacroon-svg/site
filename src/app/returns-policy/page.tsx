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
        <div className="mt-6 space-y-6 text-[color:var(--text-secondary)]">
          <section>
            <p>
              As {siteConfig.brandName}, {siteConfig.shopBranch} sells freshly baked, perishable bakery items,
              our approach to returns and refunds necessarily differs from non-perishable goods — items already
              delivered in good condition generally cannot be returned for hygiene reasons.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              When a Refund or Replacement Applies
            </h2>
            <p className="glass-subtle mt-2 rounded-2xl p-4 text-sm text-[color:var(--text-muted)]">
              [CLIENT TO PROVIDE: the specific conditions under which a refund or replacement is offered — e.g.
              damaged in transit, wrong item received, or quality issue on arrival]
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              How to Raise a Claim
            </h2>
            <p className="glass-subtle mt-2 rounded-2xl p-4 text-sm text-[color:var(--text-muted)]">
              [CLIENT TO PROVIDE: how a customer should report an issue — e.g. photo evidence, timeframe after
              delivery — and the typical resolution timeline]
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              Cancellations
            </h2>
            <p className="glass-subtle mt-2 rounded-2xl p-4 text-sm text-[color:var(--text-muted)]">
              [CLIENT TO PROVIDE: whether an order can be cancelled once placed, and up to what point]
            </p>
          </section>

          <section>
            <p>
              For any issue with an order, please{" "}
              <a href="/contact" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
                contact us
              </a>{" "}
              directly and we&apos;ll help sort it out.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
