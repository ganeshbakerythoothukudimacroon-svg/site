import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category, Product } from "@/lib/types";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function CategoryShowcase({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Explore" title="Shop by Category" align="center" />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {categories.map((category) => {
          const representativeImage = products.find((p) =>
            p.categories.some((c) => c.id === category.id)
          )?.images[0];

          return (
            <Link
              key={category.id}
              href={`/shop/${category.slug}`}
              className="glass-card glow-gold-hover group relative flex aspect-4/5 flex-col justify-end overflow-hidden rounded-[var(--radius-card)]"
            >
              {representativeImage && (
                <Image
                  src={representativeImage.url}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover object-right opacity-60 transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(18,3,12,0.92) 10%, rgba(18,3,12,0.35) 55%, rgba(74,3,40,0.25) 100%)",
                }}
              />
              <div className="relative flex items-end justify-between gap-2 p-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-[color:var(--text-primary)]">
                    {category.name}
                  </h3>
                  <p className="text-xs text-[color:var(--text-muted)]">
                    {category.productCount} item{category.productCount === 1 ? "" : "s"}
                  </p>
                </div>
                <span className="glass-subtle flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[color:var(--gold-400)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
