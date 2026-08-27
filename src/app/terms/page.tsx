import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions | Ganesh Bakery",
  description: "Terms and conditions for using the Ganesh Bakery, Shop No. 532 website and placing orders.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Terms", path: "/terms" }]} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold text-[color:var(--text-primary)]">Terms &amp; Conditions</h1>

        <p className="glass-subtle mt-4 rounded-2xl p-4 text-sm text-[color:var(--gold-300)]">
          Draft terms — has not yet been reviewed by a legal/compliance advisor. Please have it reviewed before
          relying on it.
        </p>

        <div className="mt-6 space-y-6 text-[color:var(--text-secondary)]">
          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              Acceptance of Terms
            </h2>
            <p className="mt-2">
              By using this website and placing an order with {siteConfig.brandName}, {siteConfig.shopBranch}{" "}
              (GSTIN {siteConfig.gstNumber}), you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              Orders &amp; Pricing
            </h2>
            <p className="mt-2">
              Prices shown are in Indian Rupees (₹) and may change without prior notice. Placing an order
              through this website is an offer to purchase, which we confirm directly with you before it is
              finalised.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              Delivery &amp; Returns
            </h2>
            <p className="mt-2">
              Delivery is covered by our{" "}
              <a href="/shipping-policy" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
                Shipping Policy
              </a>{" "}
              and returns/refunds by our{" "}
              <a href="/returns-policy" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
                Refund &amp; Returns Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              Liability &amp; Disputes
            </h2>
            <p className="glass-subtle mt-2 rounded-2xl p-4 text-sm text-[color:var(--text-muted)]">
              [CLIENT TO PROVIDE, with legal advice: limitation of liability, and how disputes are handled —
              e.g. governing law and jurisdiction]
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              Changes to These Terms
            </h2>
            <p className="mt-2">
              We may update these terms from time to time; the current version will always be published on
              this page.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">Contact Us</h2>
            <p className="mt-2">
              Questions about these terms can be sent to{" "}
              <a href="/contact" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
                our contact page
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
