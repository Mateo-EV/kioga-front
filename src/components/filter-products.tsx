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
import { SlidersHorizontalIcon } from "lucide-react";
import { Label } from "./ui/label";
import { MultipleRangeSlider } from "./ui/slider";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, orderByParameters } from "@/config/const";
import { useMediaQuery } from "@mantine/hooks";
import React, { useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { ScrollArea } from "./ui/scroll-area";

const filters = [
  {
    text: "Disponibilidad",
    content: [
      {
        text: "Stock",
        value: "stock",
      },
      {
        text: "Acabado",
        value: "out-stock",
      },
    ],
  },
  {
    text: "Precio",
    content: (
      <MultipleRangeSlider
        defaultValue={[0, 100]}
        max={100}
        step={1}
        className="my-2"
      />
    ),
  },
  {
    text: "Categorías",
    content: categories,
  },
  {
    text: "Marcas",
    content: [
      {
        text: "Antec",
        value: "antec",
      },
      {
        text: "Antryx",
        value: "antryx",
      },
      {
        text: "Gamemax",
        value: "gamemax",
      },
    ],
  },
];

const defaultValues = filters.map((filter) => filter.text);

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

  const filterContent = useMemo(() => {
    return (
      <Accordion
        type="multiple"
        className="mt-4 lg:mt-0"
        defaultValue={defaultValues}
      >
        {filters.map(({ text, content }) => {
          if (type === "categories" && text === "Categorías") return;

          return (
            <AccordionItem value={text} key={text}>
              <AccordionTrigger>{text}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {Array.isArray(content)
                    ? content.map(({ text, value }) => (
                        <Label key={value} className="flex items-center gap-2">
                          <Checkbox id={value} />
                          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
                            {text}
                          </span>
                        </Label>
                      ))
                    : content}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex items-center gap-8">
        {isMobile ? (
          <Sheet>
            <SheetTrigger>
              <SlidersHorizontalIcon className="size-4" />
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
            <Breadcrumb>
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
          <Select defaultValue={"0"}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {orderByParameters.map(({ content, icon: Icon }, i) => (
                <SelectItem value={i.toString()} key={i}>
                  {content}{" "}
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
          <div className="min-w-[220px] basis-1/5">{filterContent}</div>
        )}
        {children}
      </div>
    </>
  );
};
