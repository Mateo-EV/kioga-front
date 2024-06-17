import { H1 } from "@/components/typography";
import { getSession } from "@/server/auth";
import { redirect } from "next/navigation";
import CheckoutContent from "./_components/checkout-content";

async function CheckoutPage() {
  const session = await getSession();

  if (!session) redirect("/login");

  return (
    <section className="container space-y-6 py-6 md:py-10">
      <H1>Checkout</H1>
      <CheckoutContent />
    </section>
  );
}

export default CheckoutPage;
