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
    <Carousel opts={{ dragFree: true }}>
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <div className="p-1">
              <ProductCard product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden carouselXl:inline-flex" />
      <CarouselNext className="hidden carouselXl:inline-flex" />
    </Carousel>
  );
};
