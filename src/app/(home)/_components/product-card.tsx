import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { type products } from "@/config/const";
import { formatPrice } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = React.ComponentPropsWithoutRef<typeof Card> &
  Omit<(typeof products)[number], "id">;

export const ProductCard = ({
  name,
  category,
  brand,
  imageSrc,
  price,
  discount,
  slug,
  ...props
}: ProductCardProps) => {
  const priceDisccounted = discount ? price * (1 - discount) : price;
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
          · {brand}
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
        <Button variant="outline">
          <ShoppingCartIcon className="size-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};
