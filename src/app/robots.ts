import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Only genuinely non-content paths are blocked — cart/checkout/track-order
      // are excluded from indexing via their own `noindex` meta tag instead,
      // so Google can still crawl and see that directive.
      disallow: "/api/",
    },
    sitemap: new URL("/sitemap.xml", siteConfig.siteUrl).toString(),
  };
}
