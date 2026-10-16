"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { PriceTag } from "@/components/shared/PriceTag";
import type { Product } from "@/lib/types";
import { QuantitySelector } from "./QuantitySelector";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function ProductPurchasePanel({ product }: { product: Product }) {
  const sized = product.variations.length > 0;
  const [variationId, setVariationId] = useState<number | undefined>(
    () => (product.variations.find((v) => v.inStock && v.price !== null) ?? product.variations[0])?.id
  );
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();
  const router = useRouter();

  const variation = sized ? product.variations.find((v) => v.id === variationId) : undefined;
  const price = sized ? (variation?.price ?? null) : product.price;
  const regularPrice = sized ? (variation?.regularPrice ?? null) : product.regularPrice;
  const purchasable = price !== null && (sized ? Boolean(variation?.inStock) : product.inStock);

  function add() {
    if (!purchasable) return;
    addItem({
      productId: product.id,
      variationId: variation?.id,
      slug: product.slug,
      name: variation ? `${product.name} (${variation.label})` : product.name,
      image: product.images[0] ?? null,
      unitPrice: price!,
      quantity,
    });
  }

  function handleBuyNow() {
    if (!purchasable) return;
    add();
    openCart();
    router.push("/checkout");
  }

  return (
    <>
      {sized && (
        <fieldset className="mb-6">
          <legend className="label-tracked text-[color:var(--text-muted)]">Choose size</legend>
          <div className="mt-3 grid grid-cols-3 gap-2.5">
            {product.variations.map((v) => {
              const selected = v.id === variationId;
              const available = v.inStock && v.price !== null;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariationId(v.id)}
                  disabled={!available}
                  aria-pressed={selected}
                  className={`flex flex-col items-center rounded-2xl border px-3 py-3 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${
                    selected
                      ? "border-[color:var(--gold-400)] bg-[color:var(--gold-400)]/10 shadow-[0_0_22px_-6px_var(--gold-glow)]"
                      : "border-[color:var(--glass-border)] bg-[color:var(--glass-bg-1)] hover:border-[color:var(--gold-400)]/50"
                  }`}
                >
                  <span
                    className={`font-display text-lg font-semibold ${
                      selected ? "text-[color:var(--gold-300)]" : "text-[color:var(--text-primary)]"
                    }`}
                  >
                    {v.label}
                  </span>
                  <span className="mt-0.5 text-sm text-[color:var(--text-secondary)]">
                    {available ? inr.format(v.price!) : "Sold out"}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="flex flex-wrap items-center gap-4">
        {purchasable && <QuantitySelector value={quantity} onChange={setQuantity} max={product.stockQuantity} />}
        <button
          type="button"
          onClick={add}
          disabled={!purchasable}
          className="glow-gold-hover inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-6 py-3.5 text-sm font-semibold text-[color:var(--bg-void)] transition-transform disabled:cursor-not-allowed disabled:from-[color:var(--glass-bg-3)] disabled:to-[color:var(--glass-bg-3)] disabled:text-[color:var(--text-muted)] sm:flex-none"
        >
          {purchasable
            ? `Add to Cart${price !== null && quantity > 1 ? ` · ${inr.format(price * quantity)}` : ""}`
            : product.inStock
              ? "Price on Request"
              : "Out of Stock"}
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
        <div className="flex flex-col">
          <PriceTag price={price} regularPrice={regularPrice} size="sm" />
          {variation && <span className="text-xs text-[color:var(--text-muted)]">{variation.label}</span>}
        </div>
        <button
          type="button"
          onClick={add}
          disabled={!purchasable}
          className="max-w-48 flex-1 rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-5 py-3 text-sm font-semibold text-[color:var(--bg-void)] disabled:from-[color:var(--glass-bg-3)] disabled:to-[color:var(--glass-bg-3)] disabled:text-[color:var(--text-muted)]"
        >
          {purchasable ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </>
  );
}
