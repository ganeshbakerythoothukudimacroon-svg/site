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
              {siteConfig.brandName}, {siteConfig.shopBranch} specializes in freshly baked and food products. Due
              to the perishable nature of our products and food-safety and hygiene requirements, we generally do
              not accept returns of products that have been delivered in good condition. However, we are
              committed to ensuring that every order reaches you in good condition.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              When a Refund or Replacement Applies
            </h2>
            <p className="mt-2">A refund or replacement may be provided in the following situations:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>The product was damaged during delivery.</li>
              <li>The wrong product was delivered.</li>
              <li>The order is missing an item that was included in the confirmed order.</li>
              <li>The product has a significant quality issue at the time of delivery.</li>
              <li>The order could not be delivered due to an issue attributable to {siteConfig.brandName}.</li>
            </ul>
            <p className="mt-3">
              Minor variations in appearance, shape, colour, or texture may occur with freshly prepared bakery
              products and may not qualify for a refund or replacement.
            </p>
            <p className="mt-2">
              Products that have been consumed, opened, improperly stored, or damaged after delivery due to
              customer handling may not be eligible for a refund or replacement.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              How to Raise a Claim
            </h2>
            <p className="mt-2">
              If you receive a damaged, incorrect, or defective product, please contact us within 24 hours of
              delivery. To help us resolve the issue quickly, please provide:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Your order number</li>
              <li>Customer name and contact details</li>
              <li>A description of the issue</li>
              <li>Clear photographs of the product and packaging</li>
              <li>Photographs of the shipping package, where applicable</li>
            </ul>
            <p className="mt-3">
              Our team will review the claim and, where appropriate, arrange a replacement or refund. We aim to
              review reported issues within 2 business days.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">Refund Process</h2>
            <p className="mt-2">
              If a refund is approved, the amount will generally be refunded to the original payment method used
              for the order. Once the refund is initiated, the time taken for the amount to appear in your
              account may depend on your bank, card issuer, UPI provider, or payment service provider.
            </p>
            <p className="mt-2">
              Shipping or delivery charges may be non-refundable unless the issue was caused by {siteConfig.brandName}.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              Order Cancellations
            </h2>
            <p className="mt-2">Orders may be cancelled before they are processed or dispatched.</p>
            <p className="mt-2">
              Because our products are freshly prepared and may be packed specifically for each order,
              cancellation requests received after processing or dispatch may not be eligible for cancellation or
              refund.
            </p>
            <p className="mt-2">If you need to cancel an order, please contact us as soon as possible with your order number.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              Non-Returnable Products
            </h2>
            <p className="mt-2">For food-safety and hygiene reasons, we generally do not accept returns of:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Freshly baked bakery products</li>
              <li>Opened food products</li>
              <li>Products that have been consumed</li>
              <li>Products that have been improperly stored after delivery</li>
              <li>Products returned without prior approval from {siteConfig.brandName}</li>
            </ul>
            <p className="mt-3">
              If an item arrives damaged or there is a problem with your order, please do not return the product
              without contacting us first.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">
              Delivery Failure
            </h2>
            <p className="mt-2">
              If an order cannot be delivered because of an incorrect or incomplete address, recipient
              unavailability, or other circumstances outside {siteConfig.brandName}&apos;s control, additional
              delivery arrangements may be required.
            </p>
            <p className="mt-2">
              If the order is returned to us by the delivery partner, we will review the circumstances and
              determine whether a refund or re-delivery is possible.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[color:var(--text-primary)]">Contact Us</h2>
            <p className="mt-2">
              For any issue relating to your order, refund, replacement, or cancellation, please contact{" "}
              {siteConfig.brandName} through our{" "}
              <a href="/contact" className="font-medium text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]">
                Contact Us
              </a>{" "}
              page. We will make every reasonable effort to resolve genuine order issues fairly and promptly.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
