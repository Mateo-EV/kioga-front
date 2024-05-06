import { cn, formatPrice } from "@/lib/utils";
import Image from "next/image";
import { HomeButton } from "./home-button";
import { ShoppingCartIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
  name: string;
  category: string;
  imageSrc: React.ComponentPropsWithoutRef<typeof Image>["src"];
  price: number;
  discount: number | null;
  className?: string;
};

export const ProductCard = ({
  name,
  category,
  imageSrc,
  price,
  discount,
  className,
}: ProductCardProps) => {
  const priceDisccounted = discount ? price * (1 - discount) : price;
  return (
    <Card className={cn("transition-transform", className)}>
      <CardHeader>
        <p className="text-xl font-semibold">{name}</p>
        <CardDescription>Categoría: {category}</CardDescription>
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
