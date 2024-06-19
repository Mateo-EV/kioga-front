"use client";

import { ButtonWithLoading, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/useCart";
import { cn, formatPrice } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CheckoutForm from "./checkout-form";
import CheckoutProducts from "./checkout-products";

function CheckoutContent({ addresses }: { addresses: Address[] }) {
  const { products } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [isDelivery, setIsDelivery] = useState(false);
  const [isMakingOrder, setIsMakingOrder] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return (
      <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <div className="lg:col-span-7">
          <Skeleton count={3} className="mb-4 h-32" />
        </div>
        <div className="h-full lg:col-span-5">
          <Skeleton className="mb-4 h-full" />
        </div>
      </div>
    );

  const subtotal = products.reduce((acc, product) => {
    return acc + product.price_discounted * product.quantity;
  }, 0);

  const isCartEmpty = products.length === 0;
  const shippingPrice = !isCartEmpty && isDelivery ? 5 : 0;

  return (
    <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
      <div
        className={cn(
          "lg:col-span-7",
          isCartEmpty
            ? "rounded-lg border-2 border-dashed border-zinc-200 p-12"
            : "",
        )}
      >
        {isCartEmpty ? (
          <div className="flex h-full flex-col items-center justify-center gap-1">
            <div aria-hidden="true" className="mb-4">
              <ShoppingCartIcon className="size-40" />
            </div>
            <h3 className="text-2xl font-semibold">Tu carro está vacío</h3>
            <Link
              href="/productos"
              className={buttonVariants({ variant: "link" })}
            >
              Ver Productos
            </Link>
          </div>
        ) : (
          <CheckoutForm
            addresses={addresses}
            setIsDelivery={setIsDelivery}
            setIsMakingOrder={setIsMakingOrder}
          />
        )}
      </div>

      <div className="top-24 mt-10 lg:sticky lg:col-span-5 lg:mt-0">
        <CheckoutProducts />
        <Card className="animate-fade-in px-4 py-6 sm:p-6 lg:mt-0 lg:p-8">
          <h2 className="text-lg font-semibold">Resumen del pedido</h2>
          <div className="mt-6 space-y-4">
            {shippingPrice > 0 && (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Subtotal</p>
                  <p className="text-sm font-medium">{formatPrice(subtotal)}</p>
                </div>

                <div className="flex items-center justify-between border-t-2 pt-4">
                  <p className="text-sm text-muted-foreground">Envío</p>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(shippingPrice)}
                  </p>
                </div>
              </>
            )}

            <div className="flex items-center justify-between border-t-2 pt-4">
              <p className="text-base font-semibold">Total</p>
              <p className="text-base font-semibold">
                {formatPrice(subtotal + shippingPrice)}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <ButtonWithLoading
              isLoading={isMakingOrder}
              className="w-full"
              size="lg"
              disabled={isCartEmpty}
              form="checkout-form"
            >
              Checkout
            </ButtonWithLoading>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CheckoutContent;
