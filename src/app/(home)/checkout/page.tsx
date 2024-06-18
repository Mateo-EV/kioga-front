import { H1 } from "@/components/typography";
import { redirect } from "next/navigation";
import CheckoutContent from "./_components/checkout-content";
import { api } from "@/server/fetch";

async function CheckoutPage() {
  const addresses = await api<Address[]>("/addresses");

  if (addresses === null) redirect("/login");

  return (
    <section className="container space-y-6 py-6 md:py-10">
      <H1>Checkout</H1>
      <CheckoutContent addresses={addresses} />
    </section>
  );
}

export default CheckoutPage;
