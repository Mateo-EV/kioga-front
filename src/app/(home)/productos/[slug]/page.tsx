import { H1, H2, Paragraph } from "@/components/typography";
import { BreadcrumbController } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { type Metadata, type ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductsCarousel } from "../../_components/carousel/products-carousel";
import GradientDecorator from "../../_components/gradient-decorator";
import AddCart from "../../_components/cart/add-cart";
import { api } from "@/server/fetch";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
      images: ["/producto.jpg", ...previousImages],
    },
  };
}
export default async function ProductsSlugPage({ params: { slug } }: Params) {
  const product = await api<Product & { category: Category; brand: Brand }>(
    "/products/" + slug,
  );

  if (!product) notFound();

  return (
    <>
      <section className="container space-y-4 py-6 md:py-10">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="basis-3/4 space-y-4">
            <BreadcrumbController
              prevPages={[
                { href: "/", name: "Home" },
                { href: "/productos", name: "Productos" },
              ]}
            />
            <H1>{product.name}</H1>
            <div className="text-sm text-muted-foreground">
              <Link
                href={"/categorias/" + product.category.slug}
                className="underline-offset-4 hover:underline"
              >
                {product.category.name}
              </Link>{" "}
              ·{" "}
              <Link
                href={"/brands/" + product.brand.slug}
                className="underline-offset-4 hover:underline"
              >
                {product.brand.name}
              </Link>
            </div>
            <Paragraph className="text-muted-foreground">
              {product.description}
            </Paragraph>
            <AddCart product={product} />
          </div>
          <Card className="relative flex basis-1/4 items-center justify-center overflow-hidden">
            <Image src={product.image} sizes="270px" fill alt="Producto" />
          </Card>
        </div>
      </section>
      <Suspense fallback={<SimilarProductsSkeleton />}>
        <SimilarProducts productSlug={slug} />
      </Suspense>
    </>
  );
}

const SimilarProductsSkeleton = () => {
  return (
    <div className="container relative flex h-96 w-full gap-4 py-6">
      <GradientDecorator />
      <Skeleton className="h-full" containerClassName="size-full" />
      <Skeleton
        className="h-full"
        containerClassName="size-full hidden md:block"
      />
      <Skeleton
        className="h-full"
        containerClassName="size-full hidden md:block"
      />
      <Skeleton
        className="h-full"
        containerClassName="size-full hidden xl:block"
      />
    </div>
  );
};

const SimilarProducts = async ({ productSlug }: { productSlug: string }) => {
  const products = await api<
    (Product & { brand: Brand; category: Category })[]
  >("/products/" + productSlug + "/similar");

  if (!products) return null;

  return (
    <section className="container relative space-y-4 py-6">
      <GradientDecorator />
      <H2>Productos Similares</H2>
      <ProductsCarousel products={products} />
    </section>
  );
};
