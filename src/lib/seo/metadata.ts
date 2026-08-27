import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.siteUrl).toString();
}

/** True for values that are still unfilled TODO(client) placeholders. */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  return /XXXXXXXXXX|\.example|TODO\(client\)/i.test(value);
}

/** A config URL that resolves to a bare domain root isn't a real profile link. */
export function isRealProfileUrl(url: string | undefined | null): boolean {
  if (!url || isPlaceholder(url)) return false;
  try {
    return new URL(url).pathname.replace(/\/$/, "").length > 0;
  } catch {
    return false;
  }
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? absoluteUrl("/brand/logo-horizontal.png");

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.brandName,
      locale: "en_IN",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
