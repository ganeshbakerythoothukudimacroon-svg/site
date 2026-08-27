import type { FAQItem } from "@/components/shared/FAQAccordion";
import { formatAddress, siteConfig } from "@/lib/site-config";

/**
 * Site-wide FAQ. Every answer is either a verified fact (address, product
 * catalogue, how ordering works) or an explicit [CLIENT TO PROVIDE] flag —
 * never an invented detail (shelf life, storage, delivery charges).
 */
export const faqItems: FAQItem[] = [
  {
    question: "What are Thoothukudi macaroons?",
    answer: `Thoothukudi macaroons — also spelled "macroons," and Thoothukudi is also known as Tuticorin — are a baked bakery specialty associated with the region. At ${siteConfig.brandName}, ${siteConfig.shopBranch}, we've baked ours following the same approach since ${siteConfig.since}.`,
  },
  {
    question: `Where is ${siteConfig.brandName} Shop No. 532 located?`,
    answer: `${siteConfig.shopBranch} is located at ${formatAddress()}. You can find directions on our Contact page.`,
  },
  {
    question: "Do you deliver bakery products?",
    answer:
      "Yes, we offer delivery on our bakery products. [CLIENT TO PROVIDE: delivery areas, charges, and estimated timelines]",
  },
  {
    question: "Can I buy macaroons online?",
    answer:
      "Yes — our macaroons and other bakery products can be ordered directly through this website via the Shop page.",
  },
  {
    question: "What sizes are available?",
    answer:
      "Our products are currently available in 1kg packs. [CLIENT TO PROVIDE: additional size/weight options if available]",
  },
  {
    question: "How should macaroons and biscuits be stored?",
    answer: "[CLIENT TO PROVIDE: recommended storage instructions]",
  },
  {
    question: "What is the shelf life?",
    answer: "[CLIENT TO PROVIDE: verified shelf life for each product]",
  },
  {
    question: "Do you accept bulk orders?",
    answer:
      "Yes — for weddings, festivals, corporate gifting or other bulk requirements, get in touch via WhatsApp or our Bulk Orders page and we'll work out the details with you directly.",
  },
  {
    question: "Do you offer gifting options?",
    answer:
      "Yes — we put together gift boxes for festivals and family occasions. Visit our Gifting page to enquire.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is placed, you can check its status any time on our Track Order page.",
  },
];
