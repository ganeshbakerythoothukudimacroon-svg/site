export interface WCCustomer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface WCCustomerCreatePayload {
  email: string;
  first_name: string;
  last_name: string;
  billing?: {
    phone?: string;
    address_1?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
}
