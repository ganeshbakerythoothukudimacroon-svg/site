import type { Metadata } from "next";
import { getSession } from "@/lib/auth/session";
import { getCustomer } from "@/lib/services/customer-service";
import { getOrdersForCustomer } from "@/lib/services/order-service";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { SignInPrompt } from "@/components/account/SignInPrompt";
import { AccountDashboard } from "@/components/account/AccountDashboard";

export const metadata: Metadata = pageMetadata({
  title: "Your Account | Ganesh Bakery",
  description: "Sign in to manage your delivery address and view your Ganesh Bakery order history.",
  path: "/account",
  noindex: true,
});

export default async function AccountPage() {
  const session = await getSession();

  return (
    <>
      <Breadcrumbs items={[{ name: "Account", path: "/account" }]} />
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">
          Your Account
        </h1>

        <div className="mt-6">
          {session ? (
            <AccountResolved customerId={session.customerId} name={session.name} />
          ) : (
            <SignInPrompt />
          )}
        </div>
      </div>
    </>
  );
}

async function AccountResolved({ customerId, name }: { customerId: number; name: string }) {
  const [customer, orders] = await Promise.all([getCustomer(customerId), getOrdersForCustomer(customerId)]);

  if (!customer) {
    return <SignInPrompt />;
  }

  return <AccountDashboard name={name} email={customer.email} address={customer.address} orders={orders} />;
}
