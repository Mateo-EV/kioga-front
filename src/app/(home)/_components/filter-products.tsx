"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MultipleRangeSlider } from "@/components/ui/slider";
import {
  ArrowDownNarrowWideIcon,
  ArrowUpNarrowWideIcon,
  SlidersHorizontalIcon,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";
import { useMediaQuery } from "@mantine/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo, useRef, useState } from "react";

const AVAILIBILITY_FILTER = {
  id: "disponibilidad",
  name: "Disponibilidad",
  options: [
    {
      label: "Stock",
      value: "stock",
    },
    {
      label: "Acabado",
      value: "acabado",
    },
  ],
} as const;

const PRICE_FILTER = {
  id: "precio",
  name: "Precio",
  default: [5, 4000],
  step: 0.01,
  diff: 10,
} as const;

const CATEGORY_FILTERS = {
  id: "categoria",
  name: "Categorías",
} as const;

const SUBCATEGORY_FILTERS = {
  id: "tipo",
  name: "Tipos",
} as const;

const BRAND_FILTERS = {
  id: "marca",
  name: "Marcas",
} as const;

const FILTERS_IDS = [
  AVAILIBILITY_FILTER.id,
  PRICE_FILTER.id,
  CATEGORY_FILTERS.id,
  BRAND_FILTERS.id,
  SUBCATEGORY_FILTERS.id,
] as const;

const SORT_OPTIONS = [
  {
    label: "Mejor Vendido",
    value: "ventas",
  },
  {
    label: "A - Z",
    value: "name-asc",
  },
  {
    label: "Z - A",
    value: "name-desc",
  },
  {
    label: "Precio",
    icon: ArrowDownNarrowWideIcon,
    value: "price",
  },
  {
    label: "Precio",
    icon: ArrowUpNarrowWideIcon,
    value: "price-asc",
  },
];

type FilterProductsProps = {
  children: React.ReactNode;
  brands: Brand[];
} & (
  | {
      type?: "global";
      categories: Category[];
      subcategories?: undefined;
      category?: undefined;
    }
  | {
      type: "categories";
      category: Category;
      subcategories: Subcategory[];
      categories?: undefined;
    }
);

export const FilterProducts = ({
  children,
  type = "global",
  categories = [],
  brands = [],
  subcategories = [],
  category,
}: FilterProductsProps) => {
  const isMobile = useMediaQuery("(max-width: 991px)");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const applyFilters = useCallback(
    (
      filter_type: (typeof FILTERS_IDS)[number],
      value: string,
      type: "append" | "delete",
    ) => {
      const params = new URLSearchParams(searchParams);
      params[type](filter_type, value);

      router.replace(pathname + "?" + params.toString(), { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const filterContent = useMemo(() => {
    const isCategoryPage = type === "categories";

    return (
      <Accordion
        type="multiple"
        className="mt-4 lg:mt-0"
        defaultValue={FILTERS_IDS as unknown as string[]}
      >
        {/* Availability Filters */}
        <AccordionItem value={AVAILIBILITY_FILTER.id}>
          <AccordionTrigger>{AVAILIBILITY_FILTER.name}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {AVAILIBILITY_FILTER.options.map(({ label, value }) => (
                <Label key={value} className="flex items-center gap-2">
                  <Checkbox
                    id={value}
                    checked={searchParams
                      .getAll(AVAILIBILITY_FILTER.id)
                      ?.includes(value)}
                    onCheckedChange={(v) => {
                      applyFilters(
                        AVAILIBILITY_FILTER.id,
                        value,
                        v ? "append" : "delete",
                      );
                    }}
                    aria-label={label}
                  />
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
                    {label}
                  </span>
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Filter */}
        <AccordionItem value={PRICE_FILTER.id}>
          <AccordionTrigger>{PRICE_FILTER.name}</AccordionTrigger>
          <AccordionContent className="px-1">
            <PriceFilterSlider />
          </AccordionContent>
        </AccordionItem>

        {/* Categories + Subcategories Filters */}
        {isCategoryPage ? (
          subcategories.length > 0 && (
            <AccordionItem value={SUBCATEGORY_FILTERS.id}>
              <AccordionTrigger>{SUBCATEGORY_FILTERS.name}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {subcategories.map(({ id, name, slug }) => (
                    <Label key={id} className="flex items-center gap-2">
                      <Checkbox
                        id={slug}
                        checked={searchParams
                          .getAll(SUBCATEGORY_FILTERS.id)
                          ?.includes(slug)}
                        onCheckedChange={(v) => {
                          applyFilters(
                            SUBCATEGORY_FILTERS.id,
                            slug,
                            v ? "append" : "delete",
                          );
                        }}
                        aria-label={name}
                      />
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
                        {name}
                      </span>
                    </Label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        ) : (
          <AccordionItem value={CATEGORY_FILTERS.id}>
            <AccordionTrigger>{CATEGORY_FILTERS.name}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categories.map(({ id, name, slug }) => (
                  <Label key={id} className="flex items-center gap-2">
                    <Checkbox
                      id={slug}
                      checked={searchParams
                        .getAll(CATEGORY_FILTERS.id)
                        ?.includes(slug)}
                      onCheckedChange={(v) => {
                        applyFilters(
                          CATEGORY_FILTERS.id,
                          slug,
                          v ? "append" : "delete",
                        );
                      }}
                      aria-label={name}
                    />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
                      {name}
                    </span>
                  </Label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Brands Filters */}
        {brands.length > 0 && (
          <AccordionItem value={BRAND_FILTERS.id}>
            <AccordionTrigger>{BRAND_FILTERS.name}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {brands.map(({ id, name, slug }) => (
                  <Label key={id} className="flex items-center gap-2">
                    <Checkbox
                      id={slug}
                      checked={searchParams
                        .getAll(BRAND_FILTERS.id)
                        ?.includes(slug)}
                      onCheckedChange={(v) => {
                        applyFilters(
                          BRAND_FILTERS.id,
                          slug,
                          v ? "append" : "delete",
                        );
                      }}
                      aria-label={name}
                    />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
                      {name}
                    </span>
                  </Label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyFilters, searchParams, type]);

  return (
    <>
      <div className="flex items-center gap-8">
        {isMobile ? (
          <Sheet>
            <SheetTrigger>
              <span className="sr-only">Abrir filtros</span>
              <SlidersHorizontalIcon className="size-4" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <ScrollArea className="h-full p-6">
                <SheetTitle>Filtros</SheetTitle>
                {filterContent}
              </ScrollArea>
            </SheetContent>
          </Sheet>
        ) : (
          <>
            <h3 className="hidden min-w-[220px] basis-1/5 text-lg font-semibold text-foreground lg:block">
              Filtros
            </h3>
            <Breadcrumb className="hidden lg:block">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {type === "global" ? (
                  <BreadcrumbItem>
                    <BreadcrumbPage>Productos</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/productos">
                        Productos
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/categorias">
                        Categorias
                      </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{category!.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </>
        )}
        <div className="ml-auto flex items-center gap-2">
          <p className="text-sm font-semibold">
            Ordenar<span className="hidden xs:inline"> Por</span>:
          </p>
          <Select
            defaultValue={
              searchParams.get("ordenarPor") ?? SORT_OPTIONS[0]!.value
            }
            onValueChange={(value) => {
              const sortKey = "ordenarPor";
              const params = new URLSearchParams(searchParams);
              if (value === SORT_OPTIONS[0]!.value) params.delete(sortKey);
              else params.set(sortKey, value);

              router.replace(pathname + "?" + params.toString(), {
                scroll: false,
              });
            }}
          >
            <SelectTrigger
              className="w-[160px]"
              aria-label="Ordenamiento seleccionado"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map(({ label, icon: Icon, value }) => (
                <SelectItem value={value} key={value}>
                  {label}{" "}
                  {Icon ? (
                    <Icon className="inline size-4 align-middle" />
                  ) : undefined}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-8">
        {!isMobile && (
          <div className="hidden min-w-[220px] basis-1/5 lg:block">
            {filterContent}
          </div>
        )}
        {children}
      </div>
    </>
  );
};

const PriceFilterSlider = () => {
  const searchParams = useSearchParams();

  const minPriceParams = searchParams.get("min");
  const maxPriceParams = searchParams.get("max");
  const defaultPriceValues = [
    minPriceParams ? Number(minPriceParams) : PRICE_FILTER.default[0],
    maxPriceParams ? Number(maxPriceParams) : PRICE_FILTER.default[1],
  ];

  const pathname = usePathname();
  const router = useRouter();

  const [priceValues, setPriceValues] = useState(defaultPriceValues);

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  return (
    <>
      <MultipleRangeSlider
        defaultValue={defaultPriceValues}
        min={PRICE_FILTER.default[0]}
        max={PRICE_FILTER.default[1]}
        step={PRICE_FILTER.step}
        minStepsBetweenThumbs={PRICE_FILTER.diff}
        className="py-3"
        value={priceValues}
        onValueChange={(range) => {
          setPriceValues(range as [number, number]);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);

          timeoutRef.current = setTimeout(() => {
            const [newMin, newMax] = range;
            const params = new URLSearchParams(searchParams);
            if (newMin === PRICE_FILTER.default[0]) params.delete("min");
            else params.set("min", newMin!.toFixed(2));

            if (newMax === PRICE_FILTER.default[1]) params.delete("max");
            else params.set("max", newMax!.toFixed(2));

            router.replace(pathname + "?" + params.toString(), {
              scroll: false,
            });
          }, 400);
        }}
      />
      <div className="flex justify-between">
        <span>{formatPrice(priceValues[0]!)}</span>
        <span>{formatPrice(priceValues[1]!)}</span>
      </div>
    </>
  );
};
