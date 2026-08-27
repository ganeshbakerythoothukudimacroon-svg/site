import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { OrderTracker } from "@/components/tracking/OrderTracker";

export const metadata: Metadata = pageMetadata({
  title: "Track Your Order | Ganesh Bakery",
  description: "Track the status of your Ganesh Bakery, Shop No. 532 order.",
  path: "/track-order",
  noindex: true,
});

export default function TrackOrderPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Track Order", path: "/track-order" }]} />
      <div className="mx-auto max-w-md px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">Track Your Order</h1>
        <p className="mt-3 text-[color:var(--text-secondary)]">
          Enter your order number and the email or phone number you used when ordering.
        </p>
        <div className="mt-6">
          <OrderTracker />
        </div>
      </div>
    </>
  );
}
