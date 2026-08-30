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
            <p className="mt-2">
              {siteConfig.brandName} takes reasonable care to ensure that product descriptions, prices,
              availability, order information, and delivery details displayed on this website are accurate and
              up to date. However, minor variations in product appearance, size, colour, texture, or packaging
              may occur, particularly because our products are freshly prepared.
            </p>
            <p className="mt-2">
              To the extent permitted by applicable law, {siteConfig.brandName} shall not be responsible for
              delays or failures caused by circumstances beyond our reasonable control, including courier delays,
              adverse weather, transportation disruptions, technical issues, or other unforeseen circumstances.
            </p>
            <p className="mt-2">
              Nothing in these Terms is intended to exclude or limit any rights or remedies that cannot legally
              be excluded or limited under applicable law.
            </p>

            <h3 className="mt-5 font-display text-lg font-semibold text-[color:var(--text-primary)]">
              Dispute Resolution
            </h3>
            <p className="mt-2">
              If you have a concern regarding an order, product, payment, delivery, refund, or any other service
              provided through this website, we encourage you to contact {siteConfig.brandName} first so that we
              can try to resolve the matter promptly and amicably.
            </p>
            <p className="mt-2">
              If a dispute cannot be resolved through direct communication, it shall be handled in accordance
              with the applicable laws of India.
            </p>
            <p className="mt-2">
              Subject to applicable law, courts having appropriate jurisdiction in {siteConfig.locality}, Tamil
              Nadu, India shall have jurisdiction over disputes arising in connection with the use of this
              website or purchases made through it.
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
