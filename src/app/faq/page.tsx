import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { faqSchema } from "@/lib/seo/schema";
import { faqItems } from "@/lib/content/faq";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQAccordion } from "@/components/shared/FAQAccordion";

export const metadata: Metadata = pageMetadata({
  title: "Frequently Asked Questions | Ganesh Bakery Shop 532",
  description:
    "Answers to common questions about Ganesh Bakery, Shop No. 532, Thoothukudi — ordering, delivery, bulk orders, gifting and order tracking.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqItems)} />
      <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold text-[color:var(--text-primary)] sm:text-5xl">Frequently Asked Questions</h1>
        <p className="mt-3 text-lg text-[color:var(--text-secondary)]">Everything you need to know about ordering from Ganesh Bakery, Shop No. 532.</p>
        <div className="mt-8">
          <FAQAccordion items={faqItems} />
        </div>
      </div>
    </>
  );
}
