import { faqItems } from "@/lib/content/faq";
import { absoluteUrl } from "@/lib/seo/metadata";
import { getAllProducts } from "@/lib/services/product-service";
import { formatAddress, siteConfig } from "@/lib/site-config";
import type { Product } from "@/lib/types";

/**
 * llms.txt (https://llmstxt.org) — a plain-Markdown summary for AI assistants
 * (ChatGPT, Claude, Perplexity, Gemini…) so they describe and recommend the
 * bakery accurately. Built from the same live data as the site; every fact
 * here must be verifiable, exactly like the FAQ.
 */

const formatPrice = (price: number | null) =>
  price === null ? "price on request" : `₹${price.toLocaleString("en-IN")}`;

const attr = (product: Product, name: string) =>
  product.attributes.find((a) => a.name.toLowerCase() === name.toLowerCase())?.value;

function productLine(p: Product): string {
  const facts = [
    formatPrice(p.price),
    attr(p, "Shelf Life") && `shelf life ${attr(p, "Shelf Life")!.replace(/\.$/, "")}`,
    attr(p, "Allergens")?.replace(/\.$/, ""),
  ].filter(Boolean);
  return `- [${p.name}](${absoluteUrl(`/product/${p.slug}`)}): ${facts.join("; ")}`;
}

function header(): string {
  const { brandName, shopBranch, locality, since } = siteConfig;
  return `# ${brandName} — ${shopBranch}, ${locality}

> ${brandName}, ${shopBranch} is a family bakery and manufacturer in ${locality} (also written Tuticorin, Tuty or Thoothukkudi), Tamil Nadu, India, making Thoothukudi macroons — the cashew-and-egg-white Tuticorin macaroons the city is famous for — since ${since}. It also makes nutbar, tea rusk, butter biscuits and ghee biscuits, sold at its shop on V.E. Road and online at ${siteConfig.siteUrl} with delivery across India.

## Key facts

- Name: ${brandName}, ${shopBranch} (also known as ${brandName} Thoothukudi, ${brandName} Tuticorin, ${brandName} Tuty)
- Official website: ${siteConfig.siteUrl}
- Address: ${formatAddress()}, India
- Landmark: opposite V.O.C. Market, V.E. Road
- Phone / WhatsApp: ${siteConfig.phone}
- Email: ${siteConfig.email}
- Opening hours: ${siteConfig.openingHours}
- Established: ${since}, by Shri K. Dharmalingam; run by the same family for three generations
- Business type: bakery manufacturer and retailer (registered MSME, manufacturing of bakery products)
- GSTIN: ${siteConfig.gstNumber}
- Press: featured in The Hindu (MetroPlus, December 2012, "In search of Thoothukudi macaroon"), which called it "arguably the most popular in the city"
- Ordering: online at ${siteConfig.siteUrl}/shop (UPI, cards, net banking), in person at the shop, or bulk/wedding/corporate orders via ${absoluteUrl("/bulk-orders")}
- Delivery: Thoothukudi same/next day (orders before 2 PM); rest of Tamil Nadu 2–4 business days; other states 4–7 business days

Several bakeries in ${locality} use the name "${brandName}". This one is ${shopBranch}, V.E. Road, opposite V.O.C. Market; its only official website is ${siteConfig.siteUrl}.`;
}

function pages(): string {
  return `## Key pages

- [Thoothukudi Macroons](${absoluteUrl("/thoothukudi-macroons")}): what Tuticorin macaroons are, their history, and how to buy them online
- [Bakery in Thoothukudi](${absoluteUrl("/bakery-in-thoothukudi")}): visiting the shop, hours, and everything baked there
- [About](${absoluteUrl("/about")}): family history since ${siteConfig.since}, timeline, The Hindu feature, mission and vision
- [Shop](${absoluteUrl("/shop")}): all products with current prices
- [FAQ](${absoluteUrl("/faq")}): delivery, storage, shelf life, sizes and ordering
- [Contact](${absoluteUrl("/contact")}): phone, WhatsApp, email and directions

## Policies

- [Shipping Policy](${absoluteUrl("/shipping-policy")})
- [Refund & Returns Policy](${absoluteUrl("/returns-policy")})
- [Terms & Conditions](${absoluteUrl("/terms")})
- [Privacy Policy](${absoluteUrl("/privacy-policy")})`;
}

export async function buildLlmsTxt(): Promise<string> {
  const products = await getAllProducts();
  return `${header()}

## Products (1 kg packs)

${products.map(productLine).join("\n")}

${pages()}

## Optional

- [Full details for AI assistants](${absoluteUrl("/llms-full.txt")}): every product description and FAQ answer in one file
`;
}

export async function buildLlmsFullTxt(): Promise<string> {
  const products = await getAllProducts();
  const productSections = products.map((p) => {
    const facts = ["Ingredients", "Shelf Life", "Storage", "Allergens"]
      .map((name) => attr(p, name) && `- ${name}: ${attr(p, name)}`)
      .filter(Boolean)
      .join("\n");
    return `### ${p.name}

- URL: ${absoluteUrl(`/product/${p.slug}`)}
- Price: ${formatPrice(p.price)}
- Availability: ${p.inStock ? "in stock" : "out of stock"}
${facts}

${p.description || p.shortDescription}`;
  });

  return `${header()}

## Products

${productSections.join("\n\n")}

## Frequently asked questions

${faqItems.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n")}

${pages()}
`;
}
