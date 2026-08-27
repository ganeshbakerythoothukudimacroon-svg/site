import type { Metadata } from "next";
import { getCategories, getFeaturedProducts } from "@/lib/repositories/product-repository";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { SignatureProducts } from "@/components/home/SignatureProducts";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { HeritageStory } from "@/components/home/HeritageStory";
import { GiftingAndBulk } from "@/components/home/GiftingAndBulk";
import { Testimonials } from "@/components/home/Testimonials";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema } from "@/lib/seo/schema";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Ganesh Bakery Thoothukudi | Traditional Bakery & Macaroons",
  description:
    "Ganesh Bakery, Shop No. 532, Thoothukudi (Tuticorin) — traditional bakery specialities since 1964. Shop butter biscuits, ghee biscuits, tea rusk, nutbar and our signature macaroons online.",
  path: "/",
});

export default async function HomePage() {
  const [products, categories] = await Promise.all([getFeaturedProducts(8), getCategories()]);
  const heroProduct = products.find((p) => p.slug.includes("macroon")) ?? products[0];

  return (
    <>
      <JsonLd data={localBusinessSchema(products)} />
      <Hero
        imageUrl={heroProduct?.images[0]?.url ?? null}
        imageAlt={heroProduct?.name ?? "Ganesh Bakery"}
        imageCaption={heroProduct ? "Signature Thoothukudi Macaroons" : undefined}
      />
      <TrustStrip />
      <SignatureProducts products={products} />
      <CategoryShowcase categories={categories} products={products} />
      <HeritageStory />
      <GiftingAndBulk />
      <Testimonials />
    </>
  );
}
