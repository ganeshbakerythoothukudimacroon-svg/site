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
            <p className="mt-2">
              We deliver within {siteConfig.locality} city and surrounding areas, across Tamil Nadu, and to
              selected locations across India.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              Shipping Charges &amp; Timelines
            </h2>
            <div className="mt-3 space-y-2.5">
              {[
                { area: `${siteConfig.locality} (local)`, time: "Same-day / next-day for orders placed before 2 PM", charge: "₹40" },
                { area: "Rest of Tamil Nadu", time: "2–4 business days", charge: "₹80" },
                { area: "Other states", time: "4–7 business days", charge: "₹120" },
              ].map((row) => (
                <div
                  key={row.area}
                  className="glass-subtle flex items-center justify-between gap-4 rounded-2xl p-4 text-sm"
                >
                  <div>
                    <p className="font-medium text-[color:var(--text-primary)]">{row.area}</p>
                    <p className="mt-0.5 text-[color:var(--text-muted)]">{row.time}</p>
                  </div>
                  <p className="shrink-0 font-semibold text-gradient-gold">{row.charge}</p>
                </div>
              ))}
            </div>
            <ul className="mt-4 list-disc space-y-1.5 pl-5">
              <li>Free shipping on orders above ₹2,999.</li>
              <li>Orders are processed within 1 business day before dispatch.</li>
              <li>Remote areas may need additional delivery time or charges.</li>
              <li>Delivery for a few perishable items may depend on destination and shelf life.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              Packaging &amp; Handling
            </h2>
            <p className="mt-2">
              Products are packed in food-grade, sealed packaging with a protective outer layer for transit.
              Macaroons are individually and securely packed to reduce breakage during transportation. Once
              dispatched, tracking details are shared with you where courier tracking is available.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              Delivery, Damage &amp; Address Changes
            </h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>The courier generally makes up to 2–3 delivery attempts.</li>
              <li>
                Address changes are possible before dispatch; once an order has shipped, changes may not be
                possible.
              </li>
              <li>
                If your package arrives damaged, please contact us within 24 hours with photos or a video of the
                damage.
              </li>
            </ul>
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
