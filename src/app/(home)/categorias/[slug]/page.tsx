import { ProductCard } from "@/app/(home)/_components/product-card";
import { FilterProducts } from "@/components/filter-products";
import { H1 } from "@/components/typography";
import { products } from "@/config/const";

export default function GalleryCategoriesPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return (
    <section className="container space-y-4 py-6 md:py-10">
      <H1 className="text-center">{slug}</H1>
      <FilterProducts type="categories" categoryName={slug}>
        <div className="grid flex-1 grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-4">
          {products.map(({ id, ...product }) => (
            <ProductCard key={id} {...product} />
          ))}
        </div>
      </FilterProducts>
    </section>
  );
}