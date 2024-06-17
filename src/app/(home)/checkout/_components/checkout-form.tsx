"use client";

import { useForm } from "@/hooks/useForm";
import { checkoutSchema, type checkoutSchemaType } from "@/lib/schemas";

function CheckoutForm() {
  const form = useForm<checkoutSchemaType>({
    schema: checkoutSchema,
  });

  return <div>CheckoutForm</div>;
}

export default CheckoutForm;
