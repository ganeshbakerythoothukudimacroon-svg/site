import type { Category, Customer, Order, Product, ProductImage } from "@/lib/types";
import type { WCCategory, WCImage, WCProduct } from "./raw-types";
import type { WCOrder } from "./order-raw-types";
import type { WCCustomer } from "./customer-raw-types";

function toNumberOrNull(value: string): number | null {
  if (value === "" || value === undefined || value === null) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "’")
    .replace(/\s+/g, " ")
    .trim();
}

function mapImage(image: WCImage): ProductImage {
  return { id: image.id, url: image.src, alt: image.alt || "" };
}

export function mapCategory(raw: WCCategory): Category {
  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    description: stripHtml(raw.description || ""),
    image: raw.image ? mapImage(raw.image) : null,
    productCount: raw.count,
  };
}

export function mapProduct(raw: WCProduct, categoriesById: Map<number, Category>): Product {
  const price = toNumberOrNull(raw.price);
  const regularPrice = toNumberOrNull(raw.regular_price);

  // De-duplicate images (this catalog has a couple of products where the
  // same file is listed twice) and drop ones without a usable URL.
  const seen = new Set<string>();
  const images = raw.images
    .filter((img) => img.src && !seen.has(img.src) && seen.add(img.src))
    .map(mapImage);

  return {
    id: raw.id,
    slug: raw.slug,
    sku: raw.sku,
    name: raw.name,
    price,
    regularPrice,
    onSale: raw.on_sale && regularPrice !== null && price !== null && price < regularPrice,
    currency: "INR",
    shortDescription: stripHtml(raw.short_description || ""),
    description: stripHtml(raw.description || ""),
    images,
    categories: raw.categories
      .map((c) => categoriesById.get(c.id))
      .filter((c): c is Category => Boolean(c)),
    inStock: raw.stock_status === "instock",
    stockQuantity: raw.stock_quantity,
    weightLabel: raw.weight ? `${raw.weight} kg` : null,
    featured: raw.featured,
    averageRating: raw.rating_count > 0 ? toNumberOrNull(raw.average_rating) : null,
    reviewCount: raw.rating_count,
  };
}

export function mapOrder(raw: WCOrder): Order {
  return {
    id: raw.id,
    number: raw.number,
    status: raw.status,
    currency: "INR",
    total: toNumberOrNull(raw.total) ?? 0,
    dateCreated: raw.date_created,
    items: raw.line_items.map((li) => ({ name: li.name, quantity: li.quantity })),
    shippingCity: raw.shipping?.city || null,
    billingEmail: raw.billing?.email || "",
    billingPhone: raw.billing?.phone || "",
  };
}

export function mapCustomer(raw: WCCustomer): Customer {
  const b = raw.billing;
  const hasAddress = Boolean(b?.address_1 && b?.city && b?.state && b?.postcode);

  return {
    id: raw.id,
    email: raw.email,
    firstName: raw.first_name,
    lastName: raw.last_name,
    address: hasAddress
      ? {
          name: [b?.first_name, b?.last_name].filter(Boolean).join(" ") || `${raw.first_name} ${raw.last_name}`.trim(),
          phone: b?.phone || "",
          address: b?.address_1 || "",
          city: b?.city || "",
          state: b?.state || "",
          pincode: b?.postcode || "",
        }
      : null,
  };
}
