export interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: ProductImage | null;
  productCount: number;
}

export interface Product {
  id: number;
  slug: string;
  sku: string;
  name: string;
  price: number | null;
  regularPrice: number | null;
  onSale: boolean;
  currency: "INR";
  shortDescription: string;
  description: string;
  images: ProductImage[];
  categories: Category[];
  inStock: boolean;
  stockQuantity: number | null;
  weightLabel: string | null;
  featured: boolean;
  averageRating: number | null;
  reviewCount: number;
}

export interface CartLineItem {
  key: string;
  productId: number;
  slug: string;
  name: string;
  image: ProductImage | null;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Cart {
  items: CartLineItem[];
  itemsCount: number;
  subtotal: number;
  total: number;
  needsShipping: boolean;
  needsPayment: boolean;
}

export interface BulkOrderInquiry {
  name: string;
  phone: string;
  occasion: string;
  message: string;
}
