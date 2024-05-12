import { products } from "@/config/const";
import { ProductCard } from "../_components/product-card";
import { H1 } from "@/components/typography";
import { FilterProducts } from "@/components/filter-products";

export default function GalleryProductsPage() {
  return (
    <section className="container space-y-4 py-6 md:py-10">
      <H1 className="text-center">Productos</H1>
      <FilterProducts>
        <div className="grid flex-1 grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-4">
          {products.map(({ id, ...product }) => (
            <ProductCard key={id} {...product} />
          ))}
        </div>
      </FilterProducts>
    </section>
  );
}