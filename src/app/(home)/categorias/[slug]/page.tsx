import { FilterProducts } from "@/app/(home)/_components/filter-products";
import { H1 } from "@/components/typography";
import { api } from "@/server/fetch";
import { type Metadata, type ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import GalleryProducts from "../../_components/products/gallery-products";
import { cache } from "react";

type Params = {
  params: { slug: string };
};

const getCategoryBySlug = cache((slug: string) =>
  api<Category & { brands: Brand[]; subcategories: Subcategory[] }>(
    "/categories/" + slug,
  ),
);

export async function generateMetadata(
  { params: { slug } }: Params,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const category = (await getCategoryBySlug(slug))!;
  const previousImages = (await parent).openGraph?.images ?? [];

  return {
    title: slug,
    openGraph: {
      images: [category.image, ...previousImages],
    },
  };
}

export default async function GalleryCategoriesPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  return (
    <section className="container space-y-4 py-6 md:py-10">
      <H1 className="text-center">{category.name}</H1>
      <FilterProducts
        type="categories"
        brands={category.brands}
        subcategories={category.subcategories}
        category={category}
      >
        <GalleryProducts url={"api/products/category/" + slug} />
      </FilterProducts>
    </section>
  );
}
