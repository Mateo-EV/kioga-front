"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

export const BrandsCarousel = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    const interval = setInterval(
      () => carouselApi?.scrollTo(carouselApi.selectedScrollSnap() + 1),
      2000,
    );
    return () => {
      clearInterval(interval);
    };
  }, [carouselApi]);

  return (
    <section className="container relative py-8 md:px-14">
      <Carousel
        opts={{ dragFree: true, loop: true, align: "start" }}
        setApi={setCarouselApi}
      >
        <CarouselContent>
          {Array.from({ length: 53 }).map((_, i) => (
            <CarouselItem key={i} className="basis-[1/10]">
              <div className="flex size-full items-center justify-center rounded-lg bg-zinc-200 p-3">
                <Image
                  src={`/brands/brand_${i}.png`}
                  alt={"brands-kioga-" + i}
                  width={50}
                  height={50}
                  quality={10}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:inline-flex" />
        <CarouselNext className="hidden md:inline-flex" />
      </Carousel>
    </section>
  );
};
