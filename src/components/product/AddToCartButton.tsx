"use client";

import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import type { Product } from "@/lib/types";

export function AddToCartButton({
  product,
  quantity = 1,
  className,
  full = false,
  variant = "full",
}: {
  product: Product;
  quantity?: number;
  className?: string;
  full?: boolean;
  variant?: "full" | "icon";
}) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const unavailable = product.price === null || !product.inStock;

  function handleAdd() {
    if (unavailable) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] ?? null,
      unitPrice: product.price!,
      quantity,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleAdd}
        disabled={unavailable}
        aria-label={`Add ${product.name} to cart`}
        className={`glow-gold-hover flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--gold-500)] to-[color:var(--gold-600)] text-[color:var(--bg-void)] transition-transform disabled:cursor-not-allowed disabled:opacity-40 ${className ?? ""}`}
      >
        {justAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </button>
    );
  }

  if (unavailable) {
    return (
      <button
        type="button"
        disabled
        className={`${full ? "w-full" : ""} glass-subtle rounded-full px-4 py-2.5 text-sm font-semibold text-[color:var(--text-muted)] ${className ?? ""}`}
      >
        {product.inStock ? "Price on Request" : "Out of Stock"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`${full ? "w-full" : ""} glow-gold-hover inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--gold-500)] to-[color:var(--gold-400)] px-4 py-2.5 text-sm font-semibold text-[color:var(--bg-void)] transition-transform ${className ?? ""}`}
    >
      {justAdded ? (
        <>
          <Check className="h-4 w-4" /> Added
        </>
      ) : (
        "Add to Cart"
      )}
    </button>
  );
}
