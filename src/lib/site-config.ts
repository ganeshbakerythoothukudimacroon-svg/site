export const siteConfig = {
  // TODO(client): swap in the real production domain once available —
  // every canonical URL, sitemap entry and schema @id is derived from this.
  siteUrl: "https://www.ganeshbakery532.example",

  brandName: "Ganesh Bakery",
  shopBranch: "Shop No. 532",
  legalName: "Ganesh Bakery — Shop No. 532",
  tagline: "Taste. Tradition. Trust.",
  since: 1964,
  locality: "Thoothukudi",
  localityAlias: "Tuticorin",

  address: {
    line1: "532, V.E. Road",
    line2: "Opposite V.O.C. Market",
    city: "Thoothukudi",
    state: "Tamil Nadu",
    postalCode: "628001",
    country: "IN",
  },
  gstNumber: "33AIIPP5153F1ZC",

  // Secondary location — listed on the Contact page only. The address above
  // (Shop No. 532) remains the primary location used everywhere else
  // (schema, footer, maps, policies).
  secondaryLocation: {
    address: "3B, 3C & 3D, VVD Road, Thoothukudi – 628 003",
    phone: "0461-2362333",
    phoneTel: "+914612362333",
  },

  // Verified against the client's own Google Maps listing (place id
  // 0x3b03efff3124c9f3:0xf037b0b82422d271) — not geocoded/guessed.
  geo: { lat: 8.8020712, lng: 78.1519133 },
  googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=8.8020712,78.1519133",

  // Office number, confirmed by client — also used for WhatsApp.
  phone: "+91 96775 02333",
  whatsappNumber: "919677502333",
  email: "ganeshbakery1964@gmail.com",
  instagramUrl: "https://instagram.com/",
  facebookUrl: "https://facebook.com/",
  googleBusinessUrl: "https://business.google.com/",

  // Confirmed by client: open daily, 9 AM – 10 PM.
  openingHours: "9:00 AM – 10:00 PM, daily",
  openingHoursSpec: { opens: "09:00", closes: "22:00" },
} as const;

export function formatAddress() {
  const a = siteConfig.address;
  return `${a.line1}, ${a.line2}, ${a.city}, ${a.state} – ${a.postalCode}`;
}
