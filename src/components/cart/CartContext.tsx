"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartLineItem, ProductImage } from "@/lib/types";

const STORAGE_KEY = "ganeshbakery-cart-v1";

interface CartContextValue {
  items: CartLineItem[];
  itemsCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: {
    productId: number;
    slug: string;
    name: string;
    image: ProductImage | null;
    unitPrice: number;
    quantity?: number;
  }) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // One-time hydration from localStorage after mount (SSR has no
      // window) — not a reactive subscription, so the cascading-render
      // concern behind this lint rule doesn't apply here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // Ignore malformed/unavailable storage — cart just starts empty.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage may be unavailable (private browsing) — cart still works
      // for the session, it just won't persist.
    }
  }, [items, hydrated]);

  const addItem: CartContextValue["addItem"] = useCallback((newItem) => {
    setItems((prev) => {
      const key = String(newItem.productId);
      const existing = prev.find((i) => i.key === key);
      const quantity = newItem.quantity ?? 1;
      if (existing) {
        return prev.map((i) =>
          i.key === key
            ? { ...i, quantity: i.quantity + quantity, lineTotal: (i.quantity + quantity) * i.unitPrice }
            : i
        );
      }
      return [
        ...prev,
        {
          key,
          productId: newItem.productId,
          slug: newItem.slug,
          name: newItem.name,
          image: newItem.image,
          quantity,
          unitPrice: newItem.unitPrice,
          lineTotal: newItem.unitPrice * quantity,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, quantity, lineTotal: quantity * i.unitPrice } : i))
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const itemsCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
    return {
      items,
      itemsCount,
      subtotal,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [items, isOpen, addItem, updateQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
