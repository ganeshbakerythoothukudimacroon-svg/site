import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";

export function SignatureProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Handcrafted Daily" title="Traditional Bakery Specialities" />
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]"
        >
          View All Products <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
