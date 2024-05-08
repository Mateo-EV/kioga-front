import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { type products } from "@/config/const";
import { formatPrice } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";

type ProductCardProps = React.ComponentPropsWithoutRef<typeof Card> &
  Omit<(typeof products)[number], "id">;

export const ProductCard = ({
  name,
  category,
  brand,
  imageSrc,
  price,
  discount,
  ...props
}: ProductCardProps) => {
  const priceDisccounted = discount ? price * (1 - discount) : price;
  return (
    <Card {...props}>
      <CardHeader>
        <p className="text-xl font-semibold">{name}</p>
        <CardDescription>
          {category} · {brand}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative mx-auto aspect-square overflow-hidden rounded-lg">
        <Image src={imageSrc} alt="producto-1" className="object-cover" fill />
      </CardContent>
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
