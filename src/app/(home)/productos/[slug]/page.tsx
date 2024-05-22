import ProductImage from "@/assets/img/producto1.png";
import { H1, H2, Paragraph } from "@/components/typography";
import { BreadcrumbController } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { products } from "@/config/const";
import { type Metadata, type ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductsCarousel } from "../../_components/carousel/products-carousel";
import GradientDecorator from "../../_components/gradient-decorator";
import AddCart from "./_components/add-cart";

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
export default function ProductsSlugPage({ params: { slug } }: Params) {
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
            <H1>Procesador AMD Ryzen 7 4600g</H1>
            <div className="text-sm text-muted-foreground">
              <Link
                href={"/categorias/" + "procesadores"}
                className="underline-offset-4 hover:underline"
              >
                Procesadores
              </Link>{" "}
              · Rysen
            </div>
            <Paragraph className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet
              repudiandae labore maiores quae itaque sint tempore voluptate
              repellendus eaque ipsam voluptatem veniam commodi, iusto
              exercitationem atque iure repellat numquam eligendi.
            </Paragraph>
            <AddCart />
          </div>
          <Card className="flex basis-1/4 items-center justify-center overflow-hidden">
            <Image src={ProductImage} alt="Producto" />
          </Card>
        </div>
      </section>
      <section className="container relative space-y-4 overflow-hidden py-6">
        <GradientDecorator />
        <H2>Productos Similares</H2>
        <ProductsCarousel products={products} />
      </section>
    </>
  );
}
