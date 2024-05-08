"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type top3Categories } from "@/config/const";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ProductCard } from "./product-card";

type TopCategoriesTabProps = {
  categories: typeof top3Categories;
};

export const TopCategoriesTab = ({ categories }: TopCategoriesTabProps) => {
  const [categorySelected, setCategorySelected] = useState(categories[0]!.name);

  const products = categories.find(
    ({ name }) => name === categorySelected,
  )!.products;

  return (
    <>
      <div className="grid auto-rows-fr grid-cols-1 items-center gap-4 text-center md:grid-cols-2 lg:grid-cols-4">
        {categories.map(({ name }) => (
          <Button
            key={name}
            variant={name === categorySelected ? "default" : "outline"}
            onClick={() => setCategorySelected(name)}
          >
            {name}
          </Button>
        ))}
        <Button
          variant="link"
          className="text-sm text-muted-foreground hover:underline"
        >
          MOSTRAR MÁS CATEGORIAS
        </Button>
      </div>

      <Carousel opts={{ dragFree: true }}>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.15 }}
            key={"@" + categorySelected}
          >
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
          </motion.div>
        </AnimatePresence>
        <CarouselPrevious className="hidden xs:inline-flex" />
        <CarouselNext className="hidden xs:inline-flex" />
      </Carousel>
    </>
  );
};
