import "server-only";
import * as customerRepository from "@/lib/repositories/customer-repository";
import type { Customer, CustomerAddress, ShippingAddress } from "@/lib/types";

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

/**
 * Same "find or create" rule, but for a fresh Google sign-in — there's only
 * a verified email and display name at that point, no address yet (the
 * customer adds one later from their account page).
 */
export async function findOrCreateCustomerByProfile(profile: { email: string; name: string }): Promise<Customer> {
  const existing = await customerRepository.findCustomerByEmail(profile.email);
  if (existing) return existing;

  const [firstName, ...rest] = profile.name.trim().split(/\s+/);
  return customerRepository.createCustomer({
    email: profile.email,
    first_name: firstName || profile.name,
    last_name: rest.join(" "),
  });
}

export function getCustomer(id: number): Promise<Customer | null> {
  return customerRepository.getCustomerById(id);
}

/** Saves/replaces the signed-in customer's single address (WooCommerce only
 *  supports one billing address per customer — see the architecture note in
 *  /account's route handler for why this isn't a multi-address book). */
export async function updateCustomerAddress(customerId: number, address: CustomerAddress): Promise<Customer> {
  const [firstName, ...rest] = address.name.trim().split(/\s+/);
  return customerRepository.updateCustomer(customerId, {
    billing: {
      first_name: firstName || address.name,
      last_name: rest.join(" "),
      phone: address.phone,
      address_1: address.address,
      city: address.city,
      state: address.state,
      postcode: address.pincode,
      country: "IN",
    },
  });
}
