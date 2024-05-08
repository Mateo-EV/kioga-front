import { H1 } from "@/components/typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { orderByParameters, products } from "@/config/const";
import { SlidersHorizontalIcon } from "lucide-react";
import { ProductCard } from "../_components/product-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

export default function ProductsPage() {
  return (
    <section className="container space-y-4 py-6 md:py-10">
      <H1 className="text-center underline underline-offset-8">Productos</H1>
      <div className="flex items-center justify-between">
        <Sheet>
          <SheetTrigger>
            <SlidersHorizontalIcon className="size-4" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetTitle>Filtros</SheetTitle>
            <Accordion
              type="multiple"
              className="mt-4"
              defaultValue={["item-1", "item-2", "item-3", "item-4"]}
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-2">
                  Disponibilidad
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="stock" />
                      <label
                        htmlFor="stock"
                        className="text-sm font-medium leading-none"
                      >
                        Stock
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="in-stock" />
                      <label
                        htmlFor="in-stock"
                        className="text-sm font-medium leading-none"
                      >
                        Acabado
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="py-2">Precio</AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="py-2">Categoría</AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="py-2">Marca</AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
            </Accordion>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">Sort by: </p>
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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-4">
        {products.map(({ id, ...product }) => (
          <ProductCard key={id} {...product} />
        ))}
      </div>
    </section>
  );
}
