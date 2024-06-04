import { H1 } from "@/components/typography";
import { BreadcrumbController } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/server/fetch";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

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
      <Suspense fallback={<CategoriesListSkeleton />}>
        <CategoriesList />
      </Suspense>
    </section>
  );
}

const CategoriesListSkeleton = () => {
  return (
    <div className="relative flex flex-wrap items-center justify-center gap-10">
      {Array.from({ length: 9 }).map((_, i) => (
        <Skeleton key={i} className="size-full" containerClassName="size-96" />
      ))}
    </div>
  );
};

const CategoriesList = async () => {
  const categories = (await api<Category[]>("/categories")) ?? [];
  return (
    <div className="relative flex flex-wrap items-center justify-center gap-10">
      {categories.map(({ id, name, slug, image }) => (
        <Link href={"/categorias/" + slug} key={id}>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">{name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={image}
                alt={name}
                width={370}
                height={180}
                className="max-h-[180px] rounded-md object-cover transition hover:scale-110 hover:opacity-80"
              />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
