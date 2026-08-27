export interface WCOrder {
  id: number;
  status: string;
  date_created: string;
  currency: string;
  total: string;
  billing: { email: string; phone: string; first_name: string; last_name: string };
  shipping: { address_1: string; city: string; state: string; postcode: string };
  line_items: { name: string; quantity: number; total: string }[];
}
