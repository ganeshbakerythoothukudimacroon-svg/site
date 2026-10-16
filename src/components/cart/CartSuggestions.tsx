"use client";

import Image from "next/image";
import { Check, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import type { Product, ProductImage } from "@/lib/types";
import { useCart } from "./CartContext";

export interface CartSuggestion {
  id: number;
  slug: string;
  name: string;
  image: ProductImage | null;
  price: number | null;
  inStock: boolean;
  variations: Product["variations"];
}

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

// Fetched once per page load and shared by every cart view.
let cache: Promise<CartSuggestion[]> | null = null;
const loadSuggestions = () =>
  (cache ??= fetch("/api/products")
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => {
      cache = null;
      return [];
    }));

/** "Add more to reach ₹1,000" — every product with one-tap size buttons, so
 *  a customer can top up the cart without leaving it. */
export function CartSuggestions() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<CartSuggestion[]>([]);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    loadSuggestions().then((list) => active && setProducts(list));
    return () => {
      active = false;
    };
  }, []);

  if (products.length === 0) return null;

  function add(product: CartSuggestion, option: { id?: number; label?: string; price: number }) {
    addItem({
      productId: product.id,
      variationId: option.id,
      slug: product.slug,
      name: option.label ? `${product.name} (${option.label})` : product.name,
      image: product.image,
      unitPrice: option.price,
    });
    const key = `${product.id}-${option.id ?? 0}`;
    setJustAdded(key);
    window.setTimeout(() => setJustAdded((k) => (k === key ? null : k)), 1200);
  }

  return (
    <section className="py-4">
      <h3 className="label-tracked text-[color:var(--gold-400)]">
        Add more to reach ₹{siteConfig.minOrderValue.toLocaleString("en-IN")}
      </h3>
      <ul className="mt-3 space-y-3">
        {products.map((product) => {
          const options = (
            product.variations.length > 0
              ? product.variations.filter((v) => v.inStock && v.price !== null).map((v) => ({ id: v.id, label: v.label, price: v.price! }))
              : product.inStock && product.price !== null
                ? [{ id: undefined, label: undefined, price: product.price }]
                : []
          ) as { id?: number; label?: string; price: number }[];
          if (options.length === 0) return null;
          return (
            <li key={product.id} className="glass-subtle flex gap-3 rounded-2xl p-2.5">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                {product.image && (
                  <Image src={product.image.url} alt={product.image.alt || product.name} fill sizes="56px" className="object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[color:var(--text-primary)]">{product.name}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {options.map((option) => {
                    const key = `${product.id}-${option.id ?? 0}`;
                    const added = justAdded === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => add(product, option)}
                        aria-label={`Add ${product.name}${option.label ? ` ${option.label}` : ""} to cart`}
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition-all duration-300 ${
                          added
                            ? "border-[color:var(--gold-400)] bg-[color:var(--gold-400)]/15 text-[color:var(--gold-300)]"
                            : "border-[color:var(--glass-border)] text-[color:var(--text-secondary)] hover:border-[color:var(--gold-400)]/60 hover:text-[color:var(--gold-300)]"
                        }`}
                      >
                        {option.label && <span className="font-semibold">{option.label}</span>}
                        <span>{inr.format(option.price)}</span>
                        {added ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
