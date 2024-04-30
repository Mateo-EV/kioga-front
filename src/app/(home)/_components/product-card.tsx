import { cn, formatPrice } from "@/lib/utils";
import Image from "next/image";
import { HomePrimaryButton } from "./home-button";
import { ShoppingCartIcon } from "lucide-react";

type ProductCardProps = {
  name: string;
  category: string;
  imageSrc: React.ComponentPropsWithoutRef<typeof Image>["src"];
  price: number;
  discount: number | null;
  className: string;
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
    <div
      className={cn(
        "relative mx-auto w-full rounded-[0_24px_0_24px] bg-[linear-gradient(148deg,var(--tw-gradient-stops))] from-primary/10 to-background p-4 transition-transform duration-500 before:absolute before:inset-0 before:-z-20 before:-m-[1px] before:rounded-[inherit] before:bg-[linear-gradient(to_right,var(--tw-gradient-stops))] before:from-primary before:to-secondary before:content-[''] after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-background after:content-['']",
        className,
      )}
    >
      <p className="text-xl font-semibold">{name}</p>
      <p className="text-sm text-muted-foreground">Categoría: {category}</p>
      <div className="relative mx-auto mt-4 aspect-square w-full overflow-hidden rounded-lg">
        <Image src={imageSrc} alt="producto-1" className="object-cover" fill />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="font-semibold">
          <span className="block text-xl">{formatPrice(priceDisccounted)}</span>
          {discount && (
            <span className="block text-sm text-muted-foreground line-through">
              {formatPrice(price)}
            </span>
          )}
        </div>
        <HomePrimaryButton>
          <ShoppingCartIcon className="size-5" />
        </HomePrimaryButton>
      </div>
    </div>
  );
};
