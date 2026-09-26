import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Refund & Returns Policy | Ganesh Bakery",
  description:
    "All sales are final — Ganesh Bakery, Shop No. 532, Thoothukudi does not offer refunds or returns on freshly baked food orders. Read our full policy before ordering.",
  path: "/returns-policy",
});

const linkClass = "font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]";
const h2Class = "font-display text-xl font-semibold text-[color:var(--text-primary)]";

export default function ReturnsPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Returns Policy", path: "/returns-policy" }]} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold text-[color:var(--text-primary)]">Refund &amp; Returns Policy</h1>
        <p className="mt-2 text-sm text-[color:var(--text-muted)]">Last updated: 26 September 2026</p>

        <div className="mt-6 space-y-6 text-[color:var(--text-secondary)]">
          <section className="glass-subtle rounded-2xl p-5">
            <p className="font-semibold text-[color:var(--text-primary)]">All sales are final. No refunds. No returns.</p>
            <p className="mt-2">
              {siteConfig.brandName}, {siteConfig.shopBranch} does not offer refunds or returns on any order, for
              any reason, once an order has been placed and payment has been made. By placing an order on this
              website, you confirm that you have read, understood, and agreed to this policy.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Why We Have This Policy</h2>
            <p className="mt-2">
              Our products are freshly baked, perishable food items, prepared and packed specifically for each
              order. Once food has left our kitchen, we cannot verify how it has been handled, stored, or
              transported, and food-safety and hygiene rules mean it cannot be resold or reused. For these
              reasons, all sales are final.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>What This Means</h2>
            <p className="mt-2">We do not provide a refund, return, exchange, or credit for:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>A change of mind, or an order placed by mistake (wrong product, quantity, or address entered).</li>
              <li>Taste, texture, sweetness, or appearance preferences, or minor natural variations in shape, colour, or size.</li>
              <li>Delivery delays, including delays caused by couriers, weather, festivals, or circumstances outside our control.</li>
              <li>Products that have been opened, consumed, partially consumed, or stored improperly after delivery.</li>
              <li>Orders that could not be delivered because of an incorrect or incomplete address, or because no one was available to receive them.</li>
              <li>Allergic reactions or dietary concerns. Ingredient and allergen information is shown on every product page, and it is your responsibility to review it before ordering.</li>
              <li>Damage, spoilage, or breakage that is not reported within the time and manner described below.</li>
            </ul>
          </section>

          <section>
            <h2 className={h2Class}>Order Cancellations</h2>
            <p className="mt-2">
              Orders cannot be cancelled once payment has been made, because they are prepared and packed for you
              straight away. Cancelled or unaccepted orders are not eligible for a refund.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Errors on Our Side (Replacement Only, at Our Discretion)</h2>
            <p className="mt-2">
              If your order arrives damaged in transit, contains the wrong item, or is missing an item, please
              contact us <strong className="font-semibold text-[color:var(--text-primary)]">within 24 hours of delivery</strong>{" "}
              with:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Your order number, name, and contact details</li>
              <li>A description of the problem</li>
              <li>Clear photographs or a video of the product, its packaging, and the outer shipping package</li>
            </ul>
            <p className="mt-3">
              After reviewing your report, we may, at our sole discretion, offer a replacement of the affected
              item. This is a goodwill gesture and not a right, and it is never provided as a refund of money.
              Reports made after 24 hours, or without the required photographs or video, will not be considered.
              Please do not return any product to us without our written approval.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Failed or Duplicate Payments</h2>
            <p className="mt-2">
              If money has been deducted from your account but your order was not created or confirmed (for
              example, a failed transaction or a duplicate charge), this is not a refund of a completed sale. Such
              amounts are reversed by the payment gateway to your original payment method, usually within 5–7
              working days depending on your bank or payment provider. Please{" "}
              <a href="/contact" className={linkClass}>
                contact us
              </a>{" "}
              with your payment reference if it has not been reversed after that time.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Your Statutory Rights</h2>
            <p className="mt-2">
              This policy applies to the fullest extent permitted by law. Nothing in it is intended to exclude or
              limit any right or remedy that you have under applicable Indian law and that cannot lawfully be
              excluded or limited. This policy should be read together with our{" "}
              <a href="/terms" className={linkClass}>
                Terms &amp; Conditions
              </a>{" "}
              and{" "}
              <a href="/shipping-policy" className={linkClass}>
                Shipping Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Contact Us</h2>
            <p className="mt-2">
              For any question about an order, please reach us through our{" "}
              <a href="/contact" className={linkClass}>
                Contact Us
              </a>{" "}
              page or on WhatsApp before placing your order, so that you are comfortable with this policy.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
