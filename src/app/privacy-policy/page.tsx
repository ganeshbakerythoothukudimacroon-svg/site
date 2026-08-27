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
        <div className="mt-6 space-y-4 text-[color:var(--text-secondary)]">
          <p>
            {siteConfig.brandName}, {siteConfig.shopBranch} ({formatAddress()}) collects the information you
            provide when placing an order, tracking an order, or contacting us — such as your name, address,
            phone number and email — solely to fulfil and communicate about your order.
          </p>
          <p>We do not sell your personal information to third parties.</p>
          <p className="glass-subtle rounded-2xl p-4 text-sm text-[color:var(--text-muted)]">
            [CLIENT TO PROVIDE: full privacy policy reviewed against applicable Indian data protection
            requirements — data retention, third-party processors (payment/shipping), and a contact method for
            data requests]
          </p>
        </div>
      </div>
    </>
  );
}
