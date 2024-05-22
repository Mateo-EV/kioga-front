"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { type top3Categories } from "@/config/const";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ProductsCarousel } from "./carousel/products-carousel";

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
        <Link
          href="/categorias"
          className={buttonVariants({ variant: "link" })}
        >
          MOSTRAR MÁS CATEGORIAS
        </Link>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.15 }}
          key={"@" + categorySelected}
        >
          <ProductsCarousel products={products} />
        </motion.div>
      </AnimatePresence>
    </>
  );
};
