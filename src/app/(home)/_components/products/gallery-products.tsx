"use client";

import axios from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GhostIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import GalleryProductsSkeleton from "./gallery-products-skeleton";
import { ProductCard } from "./product-card";

const GalleryProducts = () => {
  const searchParams = useSearchParams();

  const { data } = useInfiniteQuery({
    queryKey: ["products", searchParams.toString()],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams(searchParams);
      params.set("cursor", pageParam);

      if (params.has("categoria")) {
        params
          .getAll("categoria")
          .forEach((value) => params.append("category[]", value));
        params.delete("categoria");
      }

      if (params.get("disponibilidad")) {
        params
          .getAll("disponibilidad")
          .forEach((value) => params.append("availability[]", value));
        params.delete("disponibilidad");
      }

      if(params.get("ordenarPor")){
        params.set("orderBy", params.get("ordenarPor")!);
        params.delete("ordenarPor")
      }

      if (params.has("marca")) {
        params
          .getAll("marca")
          .forEach((value) => params.append("brand[]", value));
        params.delete("marca");
      }

      const request = await axios.get<
        CursorPagination<Product & { category: Category; brand: Brand }>
      >(`/api/products?${params.toString()}`);

      return request.data;
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.next_cursor,
  });

  const products = data?.pages.flatMap((response) => response.data);

  if (!products) return <GalleryProductsSkeleton />;

  if (products.length === 0)
    return (
      <div className="mt-16 flex flex-1 flex-col items-center gap-2">
        <GhostIcon className="size-16" />
        <h3 className="text-xl font-semibold">Bastante vacio por aquí</h3>
        <p>No hay más productos que ver aquí</p>
      </div>
    );

  return (
    <div className="animate-opacity-in grid flex-1 auto-rows-min grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default GalleryProducts;
