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
        <div className="mt-6 space-y-6 text-[color:var(--text-secondary)]">
          <section>
            <p>
              {siteConfig.brandName}, {siteConfig.shopBranch} ships bakery products from {siteConfig.locality},
              Tamil Nadu. Orders are prepared and dispatched after they are confirmed with you directly.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              Areas We Deliver To
            </h2>
            <p className="glass-subtle mt-2 rounded-2xl p-4 text-sm text-[color:var(--text-muted)]">
              [CLIENT TO PROVIDE: delivery areas/pin codes served — local Thoothukudi delivery, pan-India
              courier, or both]
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              Shipping Charges &amp; Timelines
            </h2>
            <p className="glass-subtle mt-2 rounded-2xl p-4 text-sm text-[color:var(--text-muted)]">
              [CLIENT TO PROVIDE: shipping charges and estimated delivery timelines by area]
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              Packaging &amp; Handling
            </h2>
            <p className="glass-subtle mt-2 rounded-2xl p-4 text-sm text-[color:var(--text-muted)]">
              [CLIENT TO PROVIDE: packaging/handling notes for perishable items in transit]
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">Questions</h2>
            <p className="mt-2">
              For a delivery question on a specific order, please{" "}
              <a href="/contact" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
                contact us
              </a>{" "}
              directly.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
