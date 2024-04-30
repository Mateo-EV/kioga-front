"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import { ProductCard } from "./product-card";
import ProductoImage from "@/assets/img/producto1.png";
import { cn } from "@/lib/utils";

const products = [
  {
    name: "Procesador AMD Ryzen 5 4500",
    category: "Procesadores",
    imageSrc: ProductoImage,
    price: 550,
    discount: null,
  },
  {
    name: "Procesador AMD Ryzen 5 4500",
    category: "Procesadores",
    imageSrc: ProductoImage,
    price: 550,
    discount: 0.24,
  },
  {
    name: "Procesador AMD Ryzen 5 4500",
    category: "Procesadores",
    imageSrc: ProductoImage,
    price: 550,
    discount: 0.24,
  },
  {
    name: "Procesador AMD Ryzen 5 4500",
    category: "Procesadores",
    imageSrc: ProductoImage,
    price: 550,
    discount: 0.24,
  },
  {
    name: "Procesador AMD Ryzen 5 4500",
    category: "Procesadores",
    imageSrc: ProductoImage,
    price: 550,
    discount: 0.24,
  },
  {
    name: "Procesador AMD Ryzen 5 4500",
    category: "Procesadores",
    imageSrc: ProductoImage,
    price: 550,
    discount: 0.24,
  },
  {
    name: "Procesador AMD Ryzen 5 4500",
    category: "Procesadores",
    imageSrc: ProductoImage,
    price: 550,
    discount: 0.24,
  },
  {
    name: "Procesador AMD Ryzen 5 4500",
    category: "Procesadores",
    imageSrc: ProductoImage,
    price: 550,
    discount: 0.24,
  },
  {
    name: "Procesador AMD Ryzen 5 4500",
    category: "Procesadores",
    imageSrc: ProductoImage,
    price: 550,
    discount: 0.24,
  },
  {
    name: "Procesador AMD Ryzen 5 4500",
    category: "Procesadores",
    imageSrc: ProductoImage,
    price: 550,
    discount: 0.24,
  },
];

const HomeCarouselProducts = () => {
  const [carouselApi, setcarouselApi] = useState<CarouselApi>();
  const [selectedItem, setSelectedItem] = useState(0);
  useEffect(() => {
    carouselApi?.on("select", () => {
      setSelectedItem(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  return (
    <>
      <Carousel
        opts={{
          align: "center",
          loop: true,
          dragFree: true,
        }}
        className="relative ml-[calc((100%-100vw)/2)] mr-[calc((100%-100vw)/2)] mt-2 cursor-grab xs:mt-0"
        setApi={setcarouselApi}
      >
        <CarouselContent className="my-4 px-4 py-2 xs:px-0">
          {products.map((product, i) => (
            <CarouselItem
              key={i}
              className="carouselMd:basis-1/4 xs:basis-1/2 xl:basis-1/6"
            >
              <ProductCard
                {...product}
                className={selectedItem === i ? "xs:scale-105" : ""}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mx-auto mt-4 flex w-[70%] gap-[4%]">
        {products.map((_, i) => (
          <div
            className={cn(
              "h-[3px] flex-1 cursor-pointer",
              selectedItem === i
                ? "bg-gradient-to-r from-primary to-secondary"
                : "bg-foreground",
            )}
            key={i}
            onClick={() => carouselApi?.scrollTo(i)}
          />
        ))}
      </div>
    </>
  );
};

export default HomeCarouselProducts;
