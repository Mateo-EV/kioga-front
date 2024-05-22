"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart, type ProductCart as ProductCartProps } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { ShoppingBagIcon, ShoppingCartIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ManageCartQuantity from "../../productos/[slug]/_components/manage-cart-quantity";

function NavbarCart() {
  const { products, removeAllProducts } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex cursor-pointer items-center gap-1">
          <div className="ml-2 hidden flex-col text-sm md:flex">
            <span>Mi carrito</span>
            <b>S/ 0.00</b>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCartIcon className="size-5" />
            <span className="absolute right-[2px] top-[2px] size-4 rounded bg-primary text-center text-xs leading-4 text-primary-foreground">
              {products.length}
            </span>
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Carro de Compras</SheetTitle>
        </SheetHeader>
        {products.length > 0 ? (
          <>
            <div className="flex-1">
              <p className="mb-2">Productos</p>
              {products.map((product, i) => (
                <ProductCart product={product} key={i} />
              ))}
            </div>
            <div className="flex flex-col items-center gap-4">
              <p>
                Subtotal:{" "}
                {formatPrice(
                  products.reduce((acc, product) => {
                    const priceDisccounted = product.discount
                      ? product.price * (1 - product.discount)
                      : product.price;
                    return acc + priceDisccounted;
                  }, 0),
                )}
              </p>
              <div className="flex w-full gap-4">
                <Button className="flex-1 gap-2">
                  Continuar <ShoppingBagIcon className="size-4" />
                </Button>
                <Button
                  className="flex-1 gap-2"
                  variant="secondary"
                  onClick={removeAllProducts}
                >
                  Limpiar <Trash2Icon className="size-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <ShoppingCartIcon className="size-32" />
            <p>Tu carro está vacío</p>
            <SheetClose asChild>
              <Button variant="outline">Cerrar</Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

const ProductCart = ({ product }: { product: ProductCartProps }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const priceDisccounted = product.discount
    ? product.price * (1 - product.discount)
    : product.price;

  const { removeProduct } = useCart();

  return (
    <Card className="mb-2">
      <div className="flex items-center">
        <Image
          src={product.imageSrc}
          alt={product.slug}
          width={100}
          height={100}
        />
        <div className="flex-1 space-y-1 text-sm">
          <p className="font-semibold">{product.name}</p>
          <p className="text-muted-foreground">Precio Unitario</p>
          <p className="text-xs">{formatPrice(priceDisccounted)}</p>
          {product.discount && (
            <p className="text-xs text-muted-foreground line-through">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-between px-4 pb-4">
        <ManageCartQuantity
          setQuantity={setQuantity}
          defaultQuantity={product.quantity}
        />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => removeProduct(product.id)}
        >
          <Trash2Icon className="size-4" />
        </Button>
      </div>
    </Card>
  );
};

export default NavbarCart;
