"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ProductsCarousel } from "../carousel/products-carousel";

type TopCategoriesTabProps = {
  categories: (Category & {
    products: (Product & { category: Category; brand: Brand })[];
  })[];
};

export const TopCategoriesTab = ({ categories }: TopCategoriesTabProps) => {
  const [categorySelected, setCategorySelected] = useState(categories[0]!);

  return (
    <>
      <div className="grid auto-rows-fr grid-cols-1 items-center gap-4 text-center md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={
              category.id === categorySelected.id ? "default" : "outline"
            }
            onClick={() => setCategorySelected(category)}
          >
            {category.name}
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
          key={"@" + categorySelected.id}
        >
          <ProductsCarousel products={categorySelected.products} />
        </motion.div>
      </AnimatePresence>
    </>
  );
};
