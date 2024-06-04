import { ProductCard } from "@/app/(home)/_components/products/product-card";
import { FilterProducts } from "@/app/(home)/_components/filter-products";
import { H1 } from "@/components/typography";
import { products } from "@/config/const";
import { type Metadata, type ResolvingMetadata } from "next";
import { Suspense } from "react";
import { api } from "@/server/fetch";
import { notFound } from "next/navigation";
import GalleryProducts from "../../_components/products/gallery-products";

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

export default async function GalleryCategoriesPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const category = await api<Category & { brands: Brand[] }>(
    "/categories/" + slug,
  );

  if (!category) notFound();

  return (
    <section className="container space-y-4 py-6 md:py-10">
      <H1 className="text-center">{category.name}</H1>
      <FilterProducts
        type="categories"
        brands={category.brands}
        category={category}
      >
        <GalleryProducts url={"api/products/category/" + slug} />
      </FilterProducts>
    </section>
  );
}
