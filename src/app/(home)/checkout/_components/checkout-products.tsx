"use client";

import { useCart } from "@/hooks/useCart";
import { cn, formatPrice } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import { ProductCart } from "../../_components/layout/navbar-cart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function CheckoutProducts() {
  const { products } = useCart();
  const [isMounted, setIsMounted] = useState(false);

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
        <h2 className="sr-only">Productos en tu carrito de compras</h2>
        {isCartEmpty ? (
          <div className="flex h-full flex-col items-center justify-center gap-1">
            <div aria-hidden="true" className="mb-4">
              <ShoppingCartIcon className="size-40" />
            </div>
            <h3 className="text-2xl font-semibold">Tu carro está vacío</h3>
            <p className="text-center text-muted-foreground">
              Nada que mostrar aquí
            </p>
          </div>
        ) : null}

        <div>
          {products.map((product) => (
            <ProductCart key={product.id} product={product} />
          ))}
        </div>
      </div>

      <Card className="mt-16 animate-fade-in px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <h2 className="text-lg font-semibold">Resumen del pedido</h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm">Subtotal</p>
            <p className="text-sm font-medium">{formatPrice(subtotal)}</p>
          </div>

          <div className="flex items-center justify-between border-t-2 pt-4">
            <p className="text-sm text-muted-foreground">Envío</p>
            <p className="text-sm text-muted-foreground">{formatPrice(5)}</p>
          </div>

          <div className="flex items-center justify-between border-t-2 pt-4">
            <p className="text-base font-semibold">Total</p>
            <p className="text-base font-semibold">
              {formatPrice(subtotal + 5)}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Button className="w-full" size="lg">
            Checkout
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default CheckoutProducts;
