import type { CustomerAddress } from "@/lib/types";

export class AddressValidationError extends Error {}

const PINCODE_RE = /^\d{6}$/;
const PHONE_DIGITS_RE = /\d{10,}/;

/** Shared by checkout and the account address form — same rules either way. */
export function validateAddress(address: Partial<CustomerAddress> | undefined): asserts address is CustomerAddress {
  if (!address) throw new AddressValidationError("Missing address details.");
  if (!address.name?.trim()) throw new AddressValidationError("Enter your full name.");
  if (!PHONE_DIGITS_RE.test(address.phone || "")) throw new AddressValidationError("Enter a valid phone number.");
  if (!address.address?.trim()) throw new AddressValidationError("Enter your delivery address.");
  if (!address.city?.trim()) throw new AddressValidationError("Enter your city.");
  if (!address.state?.trim()) throw new AddressValidationError("Enter your state.");
  if (!PINCODE_RE.test(address.pincode || "")) throw new AddressValidationError("Enter a valid 6-digit pincode.");
}
