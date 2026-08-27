import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CartPageContent } from "@/components/cart/CartPageContent";

export const metadata: Metadata = pageMetadata({
  title: "Your Cart | Ganesh Bakery",
  description: "Review the items in your Ganesh Bakery cart.",
  path: "/cart",
  noindex: true,
});

export default function CartPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Cart", path: "/cart" }]} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">Your Cart</h1>
        <div className="mt-6">
          <CartPageContent />
        </div>
      </div>
    </>
  );
}
