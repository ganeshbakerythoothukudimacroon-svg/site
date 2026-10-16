import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/services/product-service";
import type { CartSuggestion } from "@/components/cart/CartSuggestions";

// Product list for the cart's "add more" suggestions — same WooCommerce data
// and 5-minute freshness as the shop pages.
export const revalidate = 300;

export async function GET() {
  const products = await getAllProducts();
  const suggestions: CartSuggestion[] = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    image: p.images[0] ?? null,
    price: p.price,
    inStock: p.inStock,
    variations: p.variations,
  }));
  return NextResponse.json(suggestions);
}
