"use client";

import { formatPrice } from "@/lib/utils";
import ManageCartQuantity from "./manage-cart-quantity";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import ProductoImage from "@/assets/img/producto1.png";

function AddCart() {
  const [quantity, setQuantity] = useState(1);
  const { addProduct } = useCart();
  return (
    <>
      <div className="flex items-center justify-between gap-8">
        <div className="font-semibold">
          <span className="block md:text-2xl">{formatPrice(418)}</span>
          <span className="md:text-md block text-muted-foreground line-through">
            {formatPrice(550)}
          </span>
        </div>
        <ManageCartQuantity setQuantity={setQuantity} />
      </div>

      <Button
        className="w-full gap-2"
        onClick={() =>
          addProduct({
            id: 0,
            name: "Procesador AMD Ryzen 7 4500",
            slug: "procesador-amd-ryzen-7-4600g",
            category: "Procesadores",
            imageSrc: ProductoImage,
            price: 550,
            discount: 0.24,
            brand: "Rysen",
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
