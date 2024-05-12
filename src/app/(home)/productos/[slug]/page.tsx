import ProductImage from "@/assets/img/producto1.png";
import AddCartQuantity from "@/components/add-cart-quantity";
import { H1, H2, Paragraph } from "@/components/typography";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { products } from "@/config/const";
import { formatPrice } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductsCarousel } from "../../_components/carousel/products-carousel";
import GradientDecorator from "../../_components/gradient-decorator";

export default function ProductsSlugPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return (
    <>
      <section className="container space-y-4 py-6 md:py-10">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="basis-3/4 space-y-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/productos">Products</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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
            <div className="flex items-center justify-between gap-8">
              <div className="font-semibold">
                <span className="block md:text-2xl">{formatPrice(500)}</span>
                <span className="md:text-md block text-muted-foreground line-through">
                  {formatPrice(400)}
                </span>
              </div>
              <AddCartQuantity />
            </div>

            <Button className="w-full gap-2">
              Agregar al carro
              <ShoppingCartIcon className="size-4" />
            </Button>
          </div>
          <Card className="flex basis-1/4 items-center justify-center overflow-hidden">
            <Image src={ProductImage} alt="Producto" />
          </Card>
        </div>
      </section>
      <section className="container relative space-y-4 py-6">
        <GradientDecorator />
        <H2>Productos Similares</H2>
        <ProductsCarousel products={products} />
      </section>
    </>
  );
}
