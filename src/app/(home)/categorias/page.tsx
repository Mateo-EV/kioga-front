import CategoryImage from "@/assets/img/category1.png";
import { H1 } from "@/components/typography";
import { BreadcrumbController } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/config/const";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Categorias",
};

export default function CategoriesPage() {
  return (
    <section className="container space-y-4 py-6 md:py-10">
      <H1 className="text-center">Categorías</H1>
      <BreadcrumbController
        className="container flex w-full justify-center"
        prevPages={[
          { href: "/", name: "Home" },
          { href: "/productos", name: "Productos" },
        ]}
        actualPage="Categorías"
      />
      <div className="relative flex flex-wrap items-center justify-center gap-10">
        {categories.map(({ text, value }) => (
          <Link href={"/categorias/" + value} key={value}>
            <Card key={value}>
              <CardHeader>
                <CardTitle className="text-center">{text}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="size-full overflow-hidden rounded-md">
                  <Image
                    src={CategoryImage}
                    alt={value}
                    width={370}
                    height={180}
                    className="transition hover:scale-110 hover:opacity-80"
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
