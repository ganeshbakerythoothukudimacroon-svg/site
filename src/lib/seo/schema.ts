import { siteConfig } from "@/lib/site-config";
import type { Product } from "@/lib/types";
import { absoluteUrl, isPlaceholder, isRealProfileUrl } from "./metadata";

// Every helper here only ever emits values traceable to siteConfig or real
// WooCommerce data — never invented facts. Placeholder config values
// (unconfirmed phone, opening hours, unverified social links) are omitted
// entirely rather than published as if they were real.

const ORG_ID = () => absoluteUrl("/#organization");
const WEBSITE_ID = () => absoluteUrl("/#website");
const BAKERY_ID = () => absoluteUrl("/#bakery");

export function organizationSchema() {
  const sameAs = [siteConfig.instagramUrl, siteConfig.facebookUrl, siteConfig.googleBusinessUrl].filter(
    isRealProfileUrl
  );

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID(),
    name: siteConfig.brandName,
    legalName: siteConfig.legalName,
    url: siteConfig.siteUrl,
    logo: absoluteUrl("/brand/logo-horizontal.png"),
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID(),
    name: `${siteConfig.brandName} — ${siteConfig.shopBranch}`,
    url: siteConfig.siteUrl,
    publisher: { "@id": ORG_ID() },
    inLanguage: "en-IN",
  };
}

/** LocalBusiness (Bakery) schema for Shop No. 532 — the real, physical, orderable location. */
export function localBusinessSchema(products: Product[] = []) {
  const prices = products.map((p) => p.price).filter((p): p is number => p !== null);
  const priceRange =
    prices.length > 0
      ? `₹${Math.min(...prices)} – ₹${Math.max(...prices)}`
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": BAKERY_ID(),
    name: `${siteConfig.brandName} — ${siteConfig.shopBranch}`,
    legalName: siteConfig.legalName,
    url: siteConfig.siteUrl,
    logo: absoluteUrl("/brand/logo-horizontal.png"),
    image: absoluteUrl("/brand/logo-horizontal.png"),
    parentOrganization: { "@id": ORG_ID() },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: siteConfig.locality,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    areaServed: [siteConfig.locality, siteConfig.localityAlias, siteConfig.address.state, "India"],
    geo: { "@type": "GeoCoordinates", latitude: siteConfig.geo.lat, longitude: siteConfig.geo.lng },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: siteConfig.openingHoursSpec.opens,
      closes: siteConfig.openingHoursSpec.closes,
    },
    ...(!isPlaceholder(siteConfig.phone) && { telephone: siteConfig.phone }),
    ...(!isPlaceholder(siteConfig.email) && { email: siteConfig.email }),
    ...(isRealProfileUrl(siteConfig.googleMapsUrl) || siteConfig.googleMapsUrl
      ? { hasMap: siteConfig.googleMapsUrl }
      : {}),
    ...(priceRange && { priceRange }),
    servesCuisine: "Bakery",
    description: `${siteConfig.brandName}, ${siteConfig.shopBranch} — home of the Thoothukudi Macaroon and a traditional bakery in ${siteConfig.locality} (Tuticorin), baking biscuits, rusk and macaroons since ${siteConfig.since}.`,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productSchema(product: Product, path: string) {
  const availability =
    product.price === null
      ? undefined
      : product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": absoluteUrl(`${path}#product`),
    name: product.name,
    description: product.shortDescription || product.description || undefined,
    sku: product.sku || undefined,
    image: product.images.map((img) => img.url),
    brand: { "@type": "Brand", name: siteConfig.brandName },
    ...(product.price !== null && {
      offers: {
        "@type": "Offer",
        url: absoluteUrl(path),
        priceCurrency: product.currency,
        price: product.price,
        ...(availability && { availability }),
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@id": ORG_ID() },
      },
    }),
    ...(product.averageRating !== null &&
      product.reviewCount > 0 && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.averageRating,
          reviewCount: product.reviewCount,
        },
      }),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
