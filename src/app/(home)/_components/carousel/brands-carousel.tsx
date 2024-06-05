"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const BrandsCarousel = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const request = await axios.get<Brand[]>("/api/brands");
      return request.data;
    },
    staleTime: Infinity,
  });

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
      {brands ? (
        <Carousel
          opts={{ dragFree: true, loop: true, align: "start" }}
          setApi={setCarouselApi}
        >
          <CarouselContent>
            {brands.map((brand) => (
              <CarouselItem key={brand.id} className="basis-[1/10]">
                <Link
                  href={"/productos?marca=" + brand.slug}
                  className="flex size-full items-center justify-center rounded-lg border bg-zinc-100 p-3"
                >
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={50}
                    height={50}
                    quality={10}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
      ) : (
        <Skeleton className="h-full" containerClassName="h-20 block" />
      )}
    </section>
  );
};
