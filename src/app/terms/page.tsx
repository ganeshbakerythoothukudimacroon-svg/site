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
        <div className="mt-6 space-y-4 text-[color:var(--text-secondary)]">
          <p>
            By using this website and placing an order with {siteConfig.brandName}, {siteConfig.shopBranch}
            (GSTIN {siteConfig.gstNumber}), you agree to these terms.
          </p>
          <p className="glass-subtle rounded-2xl p-4 text-sm text-[color:var(--text-muted)]">
            [CLIENT TO PROVIDE: full terms reviewed with your legal/compliance advisor — order acceptance,
            pricing accuracy, liability, and dispute resolution]
          </p>
        </div>
      </div>
    </>
  );
}
