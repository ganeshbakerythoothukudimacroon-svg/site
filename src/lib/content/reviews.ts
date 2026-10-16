/**
 * Real customer reviews from the bakery's Google Business listing, quoted
 * word for word (a review Google truncated ends in "…" — never complete it).
 * Shown as "Google review" testimonials only: they must NOT feed product
 * aggregateRating schema — Google's guidelines forbid marking up ratings
 * collected on another site as the product's own.
 *
 * `products` lists the product slugs a review actually mentions, so each
 * product page shows only reviews about that product.
 */
export interface GoogleReview {
  name: string;
  detail?: string;
  rating: number;
  text: string;
  products: string[];
}

export const googleReviews: GoogleReview[] = [
  {
    name: "S Aarav raja",
    rating: 5,
    text: "Their cashew macaroons flavour is deeply nostalgic.. It carries a traditional taste that is hard to find elsewhere.. My children love it so much...Highly recommended for anyone who wants a true local treat.. A must-buy! …",
    products: ["macroon-1kg"],
  },
  {
    name: "Raju Raju",
    rating: 5,
    text: "Good quality. Superior Taste. Must try. Macroon, Nut bar and Ghee Biscuits one of the best product of Ganesh Bakery. …",
    products: ["macroon-1kg", "nutbar-1kg", "ghee-biscuit-1kg"],
  },
  {
    name: "Kevin Paulson",
    detail: "Local Guide",
    rating: 5,
    text: "Recently I visited this well-known bakery for macroons. To be honest, they were very kind enough to share a few couple of pieces to taste before buying it. And I'm sure it's worth buying. …",
    products: ["macroon-1kg"],
  },
  {
    name: "JA jegath",
    rating: 5,
    text: "Absolutely loved the bakery items! Everything was fresh, soft, and full of flavor. The cakes and pastries were perfectly balanced in sweetness, and the bread tasted freshly baked. Great quality, excellent presentation, and friendly service. I'll definitely be coming back for more.",
    products: [],
  },
];

export const reviewsForProduct = (slug: string) => googleReviews.filter((r) => r.products.includes(slug));
