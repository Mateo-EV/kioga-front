import { products } from "@/config/const";
import { ProductCard } from "../_components/product-card";
import { H1 } from "@/components/typography";
import { FilterProducts } from "@/app/(home)/_components/filter-products";
import { Suspense } from "react";

export const metadata = {
  title: "Productos",
};

export default function GalleryProductsPage() {
  return (
    <section className="container space-y-4 py-6 md:py-10">
      <H1 className="text-center">Productos</H1>
      <Suspense>
        <FilterProducts>
          <div className="grid flex-1 grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </FilterProducts>
      </Suspense>
    </section>
  );
}
