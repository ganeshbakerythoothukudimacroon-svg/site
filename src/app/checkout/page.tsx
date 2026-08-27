import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = pageMetadata({
  title: "Checkout | Ganesh Bakery",
  description: "Complete your Ganesh Bakery, Shop No. 532 order.",
  path: "/checkout",
  noindex: true,
});

export default function CheckoutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Checkout", path: "/checkout" }]} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">Checkout</h1>
        <div className="mt-6">
          <CheckoutForm />
        </div>
      </div>
    </>
  );
}
