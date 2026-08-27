import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { formatAddress, siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Ganesh Bakery",
  description: "How Ganesh Bakery, Shop No. 532 collects, uses and protects your information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Privacy Policy", path: "/privacy-policy" }]} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold text-[color:var(--text-primary)]">Privacy Policy</h1>

        <p className="glass-subtle mt-4 rounded-2xl p-4 text-sm text-[color:var(--gold-300)]">
          Draft policy — accurately describes how this website is built, but has not yet been reviewed by a
          legal/compliance advisor. Please have it reviewed before relying on it.
        </p>

        <div className="mt-6 space-y-6 text-[color:var(--text-secondary)]">
          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">Who We Are</h2>
            <p className="mt-2">
              This site is operated by {siteConfig.brandName}, {siteConfig.shopBranch} ({formatAddress()}).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              Information We Collect
            </h2>
            <p className="mt-2">
              When you place an order, track an order, or contact us, we collect the information you provide
              directly — such as your name, delivery address, phone number, email address, and order details.
              We do not collect payment card details ourselves.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              How We Use It
            </h2>
            <p className="mt-2">
              We use this information solely to fulfil, communicate about, and provide support for your order —
              for example, confirming an order over WhatsApp or looking up an order for order tracking. We do
              not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              Third Parties We Share Data With
            </h2>
            <p className="mt-2">
              Order and product data is processed through our store platform (WooCommerce). Where payment
              processing is enabled, a payment gateway processes your payment details directly — we do not
              store card or payment credentials on our own systems.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">Cookies</h2>
            <p className="mt-2">
              This site may use basic cookies or local storage needed for core functionality, such as
              remembering the contents of your cart between pages.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              Data Retention &amp; Your Rights
            </h2>
            <p className="glass-subtle mt-2 rounded-2xl p-4 text-sm text-[color:var(--text-muted)]">
              [CLIENT TO PROVIDE, with legal advice: how long order/customer data is retained, and the process
              for someone to request access to, correction of, or deletion of their data, in line with
              applicable Indian data protection requirements]
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">Contact Us</h2>
            <p className="mt-2">
              Questions about this policy can be sent to{" "}
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
