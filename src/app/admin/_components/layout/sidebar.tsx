"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  BellIcon,
  HomeIcon,
  LineChartIcon,
  MenuIcon,
  Package2Icon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SIDEBAR_ITEMS = [
  {
    name: "Dashboard",
    url: "/admin/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Pedidos",
    url: "/admin/dashboard/orders",
    icon: ShoppingCartIcon,
  },
  {
    name: "Productos",
    url: "/admin/dashboard/productos",
    icon: PackageIcon,
  },
  {
    name: "Clientes",
    url: "/admin/dashboard/customers",
    icon: UsersIcon,
  },
  {
    name: "Análisis",
    url: "/admin/dashboard/analytics",
    icon: LineChartIcon,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2Icon className="h-6 w-6" />
            <span className="">Kioga</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <BellIcon className="size-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {SIDEBAR_ITEMS.map(({ icon: Icon, url, name }) => (
              <Link
                key={name}
                href={url}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === url
                    ? "bg-muted text-primary"
                    : "text-muted-foreground",
                )}
              >
                <Icon className="size-4" />
                {name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button size="sm" className="w-full" variant="secondary">
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SidebarMobile() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <MenuIcon className="size-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="mb-4 flex items-center gap-2 text-lg font-semibold"
          >
            <Package2Icon className="size-6" />
            <span className="sr-only">Kioga</span>
          </Link>
          {SIDEBAR_ITEMS.map(({ icon: Icon, url, name }) => (
            <Link
              key={name}
              href={url}
              className={cn(
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                pathname === url && "bg-muted text-foreground",
              )}
            >
              <Icon className="size-5" />
              {name}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <Button size="sm" className="w-full" variant="secondary">
            Cerrar Sesión
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
