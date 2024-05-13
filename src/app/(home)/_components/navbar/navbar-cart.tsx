import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatPrice } from "@/lib/utils";
import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";

function NavbarCart() {
  const cartItems = [];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex cursor-pointer items-center gap-1">
          <div className="ml-2 hidden flex-col text-sm md:flex">
            <span>Mi carrito</span>
            <b>S/ 0.00</b>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCartIcon className="size-5" />
            <span className="absolute right-[2px] top-[2px] size-4 rounded bg-primary text-center text-xs leading-4 text-primary-foreground">
              0
            </span>
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Carro de Compras</SheetTitle>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <>
            <div className="flex-1">Productos</div>
            <div className="flex flex-col items-center gap-4">
              <p>Subtotal: {formatPrice(0)}</p>
              <Button className="gap-2">
                Continuar <ShoppingBagIcon className="size-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <ShoppingCartIcon className="size-32" />
            <p>Tu carro está vacío</p>
            <SheetClose asChild>
              <Button variant="outline">Cerrar</Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default NavbarCart;
