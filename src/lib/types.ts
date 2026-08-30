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

export interface ProductAttribute {
  name: string;
  value: string;
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
  /** Custom WooCommerce product attributes (Ingredients, Shelf Life, Storage,
   *  Allergens, …) — edited in wp-admin, not hardcoded here. */
  attributes: ProductAttribute[];
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

export interface CustomerAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Customer {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: CustomerAddress | null;
}

/** The signed-in customer's session — issued after a verified Google sign-in. */
export interface AuthSession {
  customerId: number;
  email: string;
  name: string;
}

export interface OrderLineItem {
  name: string;
  quantity: number;
}

export interface Order {
  id: number;
  number: string;
  status: string;
  currency: "INR";
  total: number;
  dateCreated: string;
  items: OrderLineItem[];
  shippingCity: string | null;
  /** Internal use only (order-tracking verification) — never send these two
   *  fields back to a client response; build an explicit public subset instead. */
  billingEmail: string;
  billingPhone: string;
}

/** What's safe to send to the browser — no billing contact info. */
export type PublicOrder = Omit<Order, "billingEmail" | "billingPhone">;

export interface ShippingAddress {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CheckoutLineItem {
  productId: number;
  quantity: number;
}

export interface CheckoutRequest {
  customer: ShippingAddress;
  items: CheckoutLineItem[];
}

export interface CheckoutResult {
  orderId: number;
  orderNumber: string;
  status: string;
  currency: "INR";
  total: number;
  items: OrderLineItem[];
}
