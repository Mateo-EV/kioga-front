"use client";

import { formatPrice } from "@/lib/utils";
import ManageCartQuantity from "./manage-cart-quantity";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";

type AddCartProps = {
  product: Product & { category: Category; brand: Brand };
};

function AddCart({ product }: AddCartProps) {
  const [quantity, setQuantity] = useState(1);
  const { addProduct } = useCart();
  return (
    <>
      <div className="flex items-center justify-between gap-8">
        <div className="font-semibold">
          <span className="block md:text-2xl">
            {formatPrice(product.price_discounted)}
          </span>
          {product.discount > 0 && (
            <span className="md:text-md block text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <ManageCartQuantity setQuantity={setQuantity} />
      </div>

      <Button
        className="w-full gap-2"
        onClick={() =>
          addProduct({
            ...product,
            quantity,
          })
        }
      >
        Agregar al carro
        <ShoppingCartIcon className="size-4" />
      </Button>
    </>
  );
}

export default AddCart;
