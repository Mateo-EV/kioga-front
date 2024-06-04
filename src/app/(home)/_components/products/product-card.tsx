"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { cn, formatPrice } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = React.ComponentPropsWithoutRef<typeof Card> & {
  product: Product & { category: Category; brand: Brand };
};

export const ProductCard = ({ product, ...props }: ProductCardProps) => {
  const { addProduct } = useCart();

  return (
    <Card {...props}>
      <CardHeader>
        <p className="line-clamp-2 overflow-hidden text-ellipsis text-lg font-semibold">
          {product.name}
        </p>
        <div className="text-sm text-muted-foreground">
          <Link
            href={"/categorias/" + product.category.slug}
            className="underline-offset-4 hover:underline"
          >
            {product.category.name}
          </Link>{" "}
          ·{" "}
          <Link
            href={"/productos?marca=" + product.brand.slug}
            className="underline-offset-4 hover:underline"
          >
            {product.brand.name}
          </Link>
        </div>
      </CardHeader>
      <Link href={"/productos/" + product.slug}>
        <CardContent className="relative mx-auto aspect-square overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt="producto-1"
            className={cn(
              "object-cover transition hover:scale-110",
              product.stock === 0 && "grayscale",
            )}
            sizes="280px"
            fill
          />
        </CardContent>
      </Link>
      <CardFooter className="justify-between font-semibold">
        <div>
          <span className="block text-xl">
            {formatPrice(product.price_discounted)}
          </span>
          {product.discount > 0 && (
            <span className="block text-sm text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <Button
          variant="outline"
          disabled={product.stock === 0}
          onClick={() => addProduct({ ...product, quantity: 1 })}
        >
          <span className="sr-only">Agregar al carro</span>
          <ShoppingCartIcon className="size-5" aria-hidden="true" />
        </Button>
      </CardFooter>
    </Card>
  );
};
