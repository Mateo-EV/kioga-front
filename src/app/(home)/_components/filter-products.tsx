"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MoveDownIcon, MoveUpIcon, SlidersHorizontalIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { MultipleRangeSlider } from "@/components/ui/slider";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/config/const";
import { formatPrice } from "@/lib/utils";
import { useMediaQuery } from "@mantine/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  default: [5, 2500],
  step: 0.01,
  diff: 10,
} as const;

const CATEGORY_FILTERS = {
  id: "categoria",
  name: "Categorías",
  options: categories,
} as const;

const BRAND_FILTERS = {
  id: "marca",
  name: "Marcas",
  options: [
    {
      label: "Antec",
      value: "antec",
    },
    {
      label: "Antryx",
      value: "antryx",
    },
    {
      label: "Gamemax",
      value: "gamemax",
    },
    {
      label: "Rysen",
      value: "rysen",
    },
  ],
} as const;

const FILTERS_IDS = [
  AVAILIBILITY_FILTER.id,
  PRICE_FILTER.id,
  CATEGORY_FILTERS.id,
  BRAND_FILTERS.id,
] as const;

const SORT_OPTIONS = [
  {
    label: "Mejor Vendido",
    value: "ventas",
  },
  {
    label: "A - Z",
    value: "nombre-asc",
  },
  {
    label: "Z - A",
    value: "nombre-desc",
  },
  {
    label: "Precio",
    icon: MoveDownIcon,
    value: "precio",
  },
  {
    label: "Precio",
    icon: MoveUpIcon,
    value: "precio-asc",
  },
  {
    label: "Fecha",
    icon: MoveDownIcon,
    value: "fecha",
  },
  {
    label: "Fecha",
    icon: MoveUpIcon,
    value: "fecha-asc",
  },
];

type FilterProductsProps = {
  children: React.ReactNode;
} & (
  | {
      type?: "global";
    }
  | {
      type: "categories";
      categoryName: string;
    }
);

export const FilterProducts = ({
  children,
  type = "global",
  ...extraData
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

        {/* Categories Filters */}
        {type !== "categories" && (
          <AccordionItem value={CATEGORY_FILTERS.id}>
            <AccordionTrigger>{CATEGORY_FILTERS.name}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {CATEGORY_FILTERS.options.map(({ text, value }) => (
                  <Label key={value} className="flex items-center gap-2">
                    <Checkbox
                      id={value}
                      checked={searchParams
                        .getAll(CATEGORY_FILTERS.id)
                        ?.includes(value)}
                      onCheckedChange={(v) => {
                        applyFilters(
                          CATEGORY_FILTERS.id,
                          value,
                          v ? "append" : "delete",
                        );
                      }}
                      aria-label={text}
                    />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
                      {text}
                    </span>
                  </Label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Brands Filters */}
        <AccordionItem value={BRAND_FILTERS.id}>
          <AccordionTrigger>{BRAND_FILTERS.name}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {BRAND_FILTERS.options.map(({ label, value }) => (
                <Label key={value} className="flex items-center gap-2">
                  <Checkbox
                    id={value}
                    checked={searchParams
                      .getAll(BRAND_FILTERS.id)
                      ?.includes(value)}
                    onCheckedChange={(v) => {
                      applyFilters(
                        BRAND_FILTERS.id,
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
      </Accordion>
    );
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
                      <BreadcrumbPage>
                        {(extraData as { categoryName: string }).categoryName}
                      </BreadcrumbPage>
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

  const maxPriceParams = searchParams.get("max");
  const minPriceParams = searchParams.get("min");
  const defaultPriceValues = [
    maxPriceParams ? Number(maxPriceParams) : PRICE_FILTER.default[0],
    minPriceParams ? Number(minPriceParams) : PRICE_FILTER.default[1],
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
