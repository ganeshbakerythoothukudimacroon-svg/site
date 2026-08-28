export interface WCOrder {
  id: number;
  number: string;
  status: string;
  currency: string;
  date_created: string;
  total: string;
  billing: { email: string; phone: string; first_name: string; last_name: string };
  shipping: { address_1: string; city: string; state: string; postcode: string };
  line_items: { name: string; quantity: number; total: string }[];
}

export interface WCAddress {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone?: string;
  email?: string;
}

export interface WCOrderCreatePayload {
  status: string;
  customer_id?: number;
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: WCAddress;
  shipping: Omit<WCAddress, "phone" | "email">;
  line_items: { product_id: number; quantity: number }[];
  customer_note?: string;
}
