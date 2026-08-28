import type { MetadataRoute } from "next";
import { getAllProducts, getCategories } from "@/lib/services/product-service";
import { siteConfig } from "@/lib/site-config";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/shop", priority: 0.9, changeFrequency: "daily" },
  { path: "/thoothukudi-macroons", priority: 0.9, changeFrequency: "monthly" },
  { path: "/bakery-in-thoothukudi", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly" },
  { path: "/gifting", priority: 0.6, changeFrequency: "monthly" },
  { path: "/bulk-orders", priority: 0.6, changeFrequency: "monthly" },
  { path: "/shipping-policy", priority: 0.3, changeFrequency: "monthly" },
  { path: "/returns-policy", priority: 0.3, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.2, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([getAllProducts(), getCategories()]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: new URL(route.path, siteConfig.siteUrl).toString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: new URL(`/shop/${c.slug}`, siteConfig.siteUrl).toString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: new URL(`/product/${p.slug}`, siteConfig.siteUrl).toString(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
