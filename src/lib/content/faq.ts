import type { FAQItem } from "@/components/shared/FAQAccordion";
import { formatAddress, siteConfig } from "@/lib/site-config";

/**
 * Site-wide FAQ — also published as FAQPage structured data, so every answer
 * must be a verified fact. Sources: delivery from the Shipping Policy page;
 * shelf life and storage from each product's WooCommerce attributes (update
 * here too if those change); macroon ingredients from the product listing.
 */
export const faqItems: FAQItem[] = [
  {
    question: "What are Thoothukudi macroons?",
    answer: `Thoothukudi (Tuticorin) macroons are the port town's best-known bakery speciality — a crisp, cone-shaped sweet made from just three ingredients: egg whites, cashew nuts and sugar. They are a local reinvention of the European macaroon, filled with cashew instead of almond. ${siteConfig.brandName}, ${siteConfig.shopBranch} has baked them since ${siteConfig.since}.`,
  },
  {
    question: "Are Thoothukudi macroons the same as macaroons?",
    answer:
      "Yes — macroon and macaroon are two spellings of the same sweet, and you will also see Tuticorin macaroon or Tuty macaroon. They are different from French macarons, which are flat almond sandwich cookies.",
  },
  {
    question: `Where is ${siteConfig.brandName} Shop No. 532 located?`,
    answer: `${siteConfig.brandName}, ${siteConfig.shopBranch} is at ${formatAddress()} — opposite V.O.C. Market in Thoothukudi (Tuticorin, also called Tuty). We are open ${siteConfig.openingHours}. Directions are on our Contact page.`,
  },
  {
    question: `Which products can I order from ${siteConfig.brandName} Thoothukudi?`,
    answer:
      "Thoothukudi macroons, nutbar, tea rusk, butter biscuits and ghee biscuits, each in 1 kg packs. All of them can be ordered on this website or bought at our shop.",
  },
  {
    question: "Can I buy macroons online?",
    answer:
      "Yes — our macroons and other bakery products can be ordered directly through this website via the Shop page, and paid for securely with UPI, cards or net banking.",
  },
  {
    question: "Do you deliver bakery products?",
    answer:
      "Yes. Within Thoothukudi we deliver same day or next day for orders placed before 2 PM. Elsewhere in Tamil Nadu delivery takes 2–4 business days, and other states 4–7 business days. Charges and details are on our Shipping Policy page.",
  },
  {
    question: "Do you deliver Tuticorin macaroons outside Tamil Nadu?",
    answer:
      "Yes — we ship to selected locations across India. Macroons are individually and securely packed in food-grade, sealed packaging to reduce breakage in transit.",
  },
  {
    question: "What sizes are available?",
    answer: "Our products are currently available in 1 kg packs. For larger quantities, see our Bulk Orders page.",
  },
  {
    question: "How should macroons and biscuits be stored?",
    answer:
      "Keep them in an airtight container in a cool, dry place, away from direct sunlight, heat and moisture. Macroons in particular absorb moisture quickly, so close the container straight after opening.",
  },
  {
    question: "What is the shelf life?",
    answer:
      "Tea rusk keeps for about 60 days, butter biscuits and ghee biscuits about 45 days, and macroons and nutbar about 30 days, when stored as above. Each product page shows its own shelf life.",
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
