import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "../product-card";
import { type products } from "@/config/const";

type ProductsCarouselProps = {
  products: typeof products;
};

export const ProductsCarousel = ({ products }: ProductsCarouselProps) => {
  return (
    <Carousel opts={{ align: "center", dragFree: true }}>
      <CarouselContent>
        {products.map(({ id, ...product }) => (
          <CarouselItem
            key={id}
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <div className="p-1">
              <ProductCard {...product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="carouselXl:inline-flex hidden" />
      <CarouselNext className="carouselXl:inline-flex hidden" />
    </Carousel>
  );
};
