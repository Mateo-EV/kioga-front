"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import {
  ChevronLeftIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import ManageCartQuantity from "../cart/manage-cart-quantity";
import Link from "next/link";

function NavbarCart() {
  const { products, removeAllProducts } = useCart();

  const subtotal = products.reduce((acc, product) => {
    return acc + product.price_discounted * product.quantity;
  }, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex cursor-pointer items-center gap-1">
          <div className="ml-2 hidden flex-col text-left text-sm md:flex">
            <span>Mi carrito</span>
            <b>{formatPrice(subtotal)}</b>
          </div>
          <div
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
              className: "relative hover:bg-transparent",
            })}
          >
            <span className="sr-only">Buscar Productos</span>
            <ShoppingCartIcon className="size-5" aria-hidden="true" />
            <span className="absolute right-[2px] top-[2px] size-4 rounded bg-primary text-center text-xs leading-4 text-primary-foreground">
              {products.length}
            </span>
          </div>
        </button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col">
        <SheetHeader className="flex-row items-center justify-center gap-2 space-y-0">
          <SheetClose>
            <span className="sr-only">Cerrar Carrito de Compras</span>
            <ChevronLeftIcon className="size-4" aria-hidden="true" />
          </SheetClose>
          <SheetTitle>Carro de Compras</SheetTitle>
        </SheetHeader>
        {products.length > 0 ? (
          <>
            <div className="flex-1">
              <p className="mb-2">Productos</p>
              <ScrollArea className="-mr-3 h-[calc(100vh-14rem)] pr-3">
                {products.map((product, i) => (
                  <ProductCart product={product} key={i} />
                ))}
              </ScrollArea>
            </div>
            <div className="flex flex-col items-center gap-4">
              <p>Subtotal: {formatPrice(subtotal)}</p>
              <div className="flex w-full gap-4">
                <SheetClose asChild>
                  <Link
                    href="/checkout"
                    className={buttonVariants({ className: "flex-1 gap-2" })}
                  >
                    Continuar <ShoppingBagIcon className="size-4" />
                  </Link>
                </SheetClose>
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

export const ProductCart = ({ product }: { product: ProductCartProps }) => {
  const { setQuantityByProductId, removeProduct } = useCart();

  return (
    <Card className="mb-2 animate-fade-in">
      <div className="flex items-center">
        <Image
          src={product.image}
          alt={product.slug}
          width={90}
          height={90}
          className="p-1"
        />
        <div className="flex-1 space-y-1 overflow-hidden pt-2 text-sm">
          <p className="block w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold ">
            {product.name}
          </p>
          <p className="text-muted-foreground">Precio Unitario</p>
          <p className="text-xs">
            {formatPrice(product.price_discounted)}
            {product.discount > 0 && (
              <span className="ml-2 text-foreground/20 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </p>
        </div>
      </div>
      <div className="flex justify-between px-4 pb-4 pt-2">
        <ManageCartQuantity
          setQuantity={setQuantityByProductId(product.id)}
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
