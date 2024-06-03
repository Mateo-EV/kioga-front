import { FilterProducts } from "@/app/(home)/_components/filter-products";
import { H1 } from "@/components/typography";
import { Suspense } from "react";
import GalleryProducts from "../_components/products/gallery-products";
import { api } from "@/server/fetch";

export const metadata = {
  title: "Productos",
};

export default async function GalleryProductsPage() {
  const [categories = [], brands = []] = await Promise.all([
    api<Category[]>("/categories"),
    api<Brand[]>("/brands"),
  ]);

  return (
    <section className="container space-y-4 py-6 md:py-10">
      <H1 className="text-center">Productos</H1>
      <Suspense>
        <FilterProducts categories={categories!} brands={brands!}>
          <GalleryProducts />
        </FilterProducts>
      </Suspense>
    </section>
  );
}
