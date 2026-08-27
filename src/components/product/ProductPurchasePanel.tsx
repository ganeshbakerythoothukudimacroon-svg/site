"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { PriceTag } from "@/components/shared/PriceTag";
import type { Product } from "@/lib/types";
import { QuantitySelector } from "./QuantitySelector";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();
  const router = useRouter();
  const purchasable = product.price !== null && product.inStock;

  function handleAddToCart() {
    if (!purchasable) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] ?? null,
      unitPrice: product.price!,
      quantity,
    });
  }

  function handleBuyNow() {
    if (!purchasable) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] ?? null,
      unitPrice: product.price!,
      quantity,
    });
    openCart();
    router.push("/checkout");
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        {purchasable && <QuantitySelector value={quantity} onChange={setQuantity} max={product.stockQuantity} />}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!purchasable}
          className="glow-gold-hover inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-6 py-3.5 text-sm font-semibold text-[color:var(--bg-void)] transition-transform disabled:cursor-not-allowed disabled:from-[color:var(--glass-bg-3)] disabled:to-[color:var(--glass-bg-3)] disabled:text-[color:var(--text-muted)] sm:flex-none"
        >
          {purchasable ? "Add to Cart" : product.inStock ? "Price on Request" : "Out of Stock"}
        </button>
        {purchasable && (
          <button
            type="button"
            onClick={handleBuyNow}
            className="glass-button inline-flex flex-1 items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold text-[color:var(--text-primary)] sm:flex-none"
          >
            Buy Now
          </button>
        )}
      </div>

      {/* Sticky mobile buy bar */}
      <div className="glass-premium fixed inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
        <PriceTag price={product.price} regularPrice={product.regularPrice} size="sm" />
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!purchasable}
          className="max-w-48 flex-1 rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-5 py-3 text-sm font-semibold text-[color:var(--bg-void)] disabled:from-[color:var(--glass-bg-3)] disabled:to-[color:var(--glass-bg-3)] disabled:text-[color:var(--text-muted)]"
        >
          {purchasable ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </>
  );
}
