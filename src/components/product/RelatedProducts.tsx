import type { Product } from "@/lib/types";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProductGrid } from "./ProductGrid";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="You May Also Like" title="Related Products" />
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
