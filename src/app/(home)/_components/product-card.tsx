"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { type products } from "@/config/const";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = React.ComponentPropsWithoutRef<typeof Card> & {
  product: (typeof products)[number];
};

export const ProductCard = ({
  product: { name, category, brand, imageSrc, price, discount, slug },
  ...props
}: ProductCardProps) => {
  const priceDisccounted = discount ? price * (1 - discount) : price;
  const { addProduct } = useCart();
  return (
    <Card {...props}>
      <CardHeader>
        <p className="text-xl font-semibold">{name}</p>
        <div className="text-sm text-muted-foreground">
          <Link
            href={"/categorias/" + category.toLowerCase()}
            className="underline-offset-4 hover:underline"
          >
            {category}
          </Link>{" "}
          ·{" "}
          <Link
            href={"/productos?marca=" + brand.toLowerCase()}
            className="underline-offset-4 hover:underline"
          >
            {brand}
          </Link>
        </div>
      </CardHeader>
      <Link href={"/productos/" + slug}>
        <CardContent className="relative mx-auto aspect-square overflow-hidden rounded-lg">
          <Image
            src={imageSrc}
            alt="producto-1"
            className="object-cover transition hover:scale-110"
            fill
          />
        </CardContent>
      </Link>
      <CardFooter className="justify-between font-semibold">
        <div>
          <span className="block text-xl">{formatPrice(priceDisccounted)}</span>
          {discount && (
            <span className="block text-sm text-muted-foreground line-through">
              {formatPrice(price)}
            </span>
          )}
        </div>
        <Button
          variant="outline"
          onClick={() =>
            addProduct({
              id: 0,
              name,
              category,
              brand,
              imageSrc,
              price,
              discount,
              slug,
              quantity: 1,
            })
          }
        >
          <span className="sr-only">Agregar al carro</span>
          <ShoppingCartIcon className="size-5" aria-hidden="true" />
        </Button>
      </CardFooter>
    </Card>
  );
};
