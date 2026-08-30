export interface WCImage {
  id: number;
  src: string;
  alt: string;
}

export interface WCCategoryRef {
  id: number;
  name: string;
  slug: string;
}

export interface WCCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  image: WCImage | null;
}

export interface WCAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  short_description: string;
  description: string;
  images: WCImage[];
  categories: WCCategoryRef[];
  stock_status: "instock" | "outofstock" | "onbackorder";
  stock_quantity: number | null;
  weight: string;
  featured: boolean;
  average_rating: string;
  rating_count: number;
  attributes: WCAttribute[];
}
