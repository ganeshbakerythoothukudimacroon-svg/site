import "server-only";
import * as customerRepository from "@/lib/repositories/customer-repository";
import type { Customer, ShippingAddress } from "@/lib/types";

/**
 * Finds an existing WooCommerce customer by email, or creates one. Deciding
 * "reuse vs. create" is a business rule, so it lives here rather than in
 * the repository (which only knows how to find and how to create).
 */
export async function findOrCreateCustomer(details: ShippingAddress): Promise<Customer | null> {
  if (!details.email) return null; // no email → order proceeds as a guest, that's a valid choice made by checkout-service

  const existing = await customerRepository.findCustomerByEmail(details.email);
  if (existing) return existing;

  const [firstName, ...rest] = details.name.trim().split(/\s+/);
  return customerRepository.createCustomer({
    email: details.email,
    first_name: firstName || details.name,
    last_name: rest.join(" "),
    billing: {
      phone: details.phone,
      address_1: details.address,
      city: details.city,
      state: details.state,
      postcode: details.pincode,
      country: "IN",
    },
  });
}
