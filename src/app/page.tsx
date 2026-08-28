import type { Metadata } from "next";
import { getCategories, getFeaturedProducts } from "@/lib/services/product-service";
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
  title: "Ganesh Bakery | Thoothukudi Macaroon & Traditional Bakery",
  description:
    "Ganesh Bakery, Thoothukudi — home of the Thoothukudi Macaroon. Shop authentic macaroons, butter biscuits, ghee biscuits, tea rusk and other traditional bakery specialities from Shop No. 532, freshly prepared since 1964.",
  path: "/",
});

export default async function HomePage() {
  const [products, categories] = await Promise.all([getFeaturedProducts(8), getCategories()]);
  const heroProduct = products.find((p) => p.slug.includes("macroon")) ?? products[0];
  const isMacaroon = Boolean(heroProduct?.slug.includes("macroon"));

  return (
    <>
      <JsonLd data={localBusinessSchema(products)} />
      <Hero
        imageUrl={heroProduct?.images[0]?.url ?? null}
        imageAlt={isMacaroon ? "Thoothukudi Macaroons from Ganesh Bakery" : (heroProduct?.name ?? "Ganesh Bakery")}
        imageCaption={isMacaroon ? "Thoothukudi Macaroons" : undefined}
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
