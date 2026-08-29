export interface WCCustomerBilling {
  first_name?: string;
  last_name?: string;
  phone?: string;
  address_1?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
}

export interface WCCustomer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  billing?: WCCustomerBilling;
}

export interface WCCustomerCreatePayload {
  email: string;
  first_name: string;
  last_name: string;
  billing?: WCCustomerBilling;
}

export type WCCustomerUpdatePayload = Partial<WCCustomerCreatePayload>;
