"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function OrderStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast.success("Pedido creado exitosamente");
      router.push("/pedidos");
    } else if (searchParams.get("error") === "true") {
      toast.success("Ocurrió un error");
      router.push("/pedidos");
    }
  }, [router, searchParams]);

  return null;
}
