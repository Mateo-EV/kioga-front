import { ProductCard } from "@/app/(home)/_components/product-card";
import { FilterProducts } from "@/app/(home)/_components/filter-products";
import { H1 } from "@/components/typography";
import { products } from "@/config/const";
import { type Metadata, type ResolvingMetadata } from "next";

type Params = {
  params: { slug: string };
};

export async function generateMetadata(
  { params: { slug } }: Params,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images ?? [];

  return {
    title: slug,
    openGraph: {
      images: ["/categoria.jpg", ...previousImages],
    },
  };
}

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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </FilterProducts>
    </section>
  );
}
