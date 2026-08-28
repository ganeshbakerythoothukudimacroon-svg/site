import type { NextConfig } from "next";

// Derived from WOOCOMMERCE_URL rather than hardcoded — the store's domain
// has already changed once (www. -> shop.), and a hardcoded hostname here
// silently breaks every product image (Next.js's Image component throws
// hard on an unconfigured remote host) until someone notices and edits
// this file to match. Deriving it means changing WOOCOMMERCE_URL is enough.
const wooCommerceHostname = process.env.WOOCOMMERCE_URL
  ? new URL(process.env.WOOCOMMERCE_URL).hostname
  : "shop.ganeshbakerythoothukudimacroon.com";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: wooCommerceHostname,
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
