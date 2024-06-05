import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "../products/product-card";

type ProductsCarouselProps = {
  products: (Product & { category: Category; brand: Brand })[];
};

export const ProductsCarousel = ({ products }: ProductsCarouselProps) => {
  return (
    <Carousel opts={{ align: "start", dragFree: true }}>
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <div className="h-full p-1">
              <ProductCard product={product} className="h-full" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden carouselXl:inline-flex" />
      <CarouselNext className="hidden carouselXl:inline-flex" />
    </Carousel>
  );
};
