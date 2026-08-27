import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";
import type { Product } from "@/lib/types";
import { PriceTag } from "@/components/shared/PriceTag";
import { RatingStars } from "@/components/shared/RatingStars";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];

  return (
    <div className="glass-card glow-gold-hover group flex flex-col overflow-hidden rounded-[var(--radius-card)]">
      <Link href={`/product/${product.slug}`} className="relative block aspect-4/5 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: "radial-gradient(circle at 30% 20%, var(--gold-glow), transparent 60%)" }}
        />
        {image ? (
          <Image
            src={image.url}
            alt={image.alt || product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="relative z-10 object-cover object-right transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[color:var(--text-muted)]">
            Image coming soon
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ boxShadow: "inset 0 -60px 50px -30px rgba(18,3,12,0.85)" }}
        />
        {product.featured && (
          <span className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[color:var(--bg-void)] shadow-[0_0_10px_var(--gold-glow)]">
            <Crown className="h-3 w-3" /> Bestseller
          </span>
        )}
        {!product.inStock && (
          <span className="absolute inset-0 z-20 flex items-center justify-center bg-[color:var(--bg-void)]/50">
            <span className="glass-subtle rounded-full px-3 py-1 text-xs font-semibold text-[color:var(--text-primary)]">
              Out of Stock
            </span>
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-display text-lg font-semibold leading-snug text-[color:var(--text-primary)]">
            {product.name}
          </h3>
        </Link>
        {product.weightLabel && (
          <p className="label-tracked text-[10px] text-[color:var(--text-muted)]">{product.weightLabel}</p>
        )}
        <RatingStars rating={product.averageRating} reviewCount={product.reviewCount} />
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <PriceTag price={product.price} regularPrice={product.regularPrice} />
          <AddToCartButton product={product} variant="icon" />
        </div>
      </div>
    </div>
  );
}
