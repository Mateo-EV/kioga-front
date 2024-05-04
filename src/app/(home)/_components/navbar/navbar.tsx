import { colors, navItemsContent } from "@/config/const";
import {
  ChevronDownIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import NavbarMobileItems from "./navbar-mobile-items";
import NavbarScroll from "./navbar-scroll";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 w-full bg-background transition-colors md:bg-transparent md:data-[scrolled=true]:bg-background">
      <div className="header-border-gradient border-b md:border-border">
        <nav className="container flex h-16 items-center md:h-20">
          <h1 className="w-full max-w-24 text-center text-2xl font-bold lg:order-2">
            Kioga
          </h1>
          <ul className="hidden h-full w-full items-center gap-6 md:flex lg:order-1">
            {navItemsContent.map((navItemProps) => (
              <NavItem {...navItemProps} key={navItemProps.content} />
            ))}
          </ul>
          <ul className="order-3 flex w-full items-center justify-end gap-3 md:gap-6">
            <li className="md:hidden">
              <SearchIcon className="size-5" />
            </li>
            <li>
              <UserIcon className="size-5" />
            </li>
            <li className="flex items-center gap-3">
              <div className="hidden flex-col text-sm md:flex">
                <span>Mi carrito</span>
                <b>S/ 0.00</b>
              </div>
              <div className="relative">
                <ShoppingCartIcon className="size-5" />
                <span className="absolute -right-2 -top-2 size-4 rounded bg-gradient-to-r from-primary to-secondary text-center text-xs font-bold leading-4 text-primary-foreground">
                  0
                </span>
              </div>
            </li>
            <NavbarMobileItems />
          </ul>
        </nav>
      </div>
      <div className="hidden h-16 items-center overflow-hidden border-b text-sm md:flex">
        <div className="container flex h-full items-center justify-between">
          <div className="w-full">
            <Link href="/" className="font-semibold">
              Nuevos Accesorios{" "}
              <span className="underline underline-offset-2">-30%</span>
            </Link>
          </div>
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-zinc-600" />
            <input
              type="text"
              className="w-[300px] rounded-bl-2xl rounded-tr-2xl border border-zinc-600 bg-transparent p-2.5 pl-12 outline-none ring-offset-background transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              placeholder="Buscar Productos..."
            />
          </div>
          <div className="w-full text-right">
            <Link href="/" className="underline underline-offset-2">
              Equipos Nuevos
            </Link>
          </div>
        </div>
      </div>
      <NavbarScroll />
    </header>
  );
};

type NavItemProps = (typeof navItemsContent)[number];

const NavItem = ({ content, extra, links }: NavItemProps) => (
  <li className="group h-full text-sm font-semibold">
    <div className="relative flex h-full cursor-pointer items-center">
      <span>{content}</span>
      <ChevronDownIcon
        className="ml-2 inline size-4 transition-transform group-hover:rotate-180"
        stroke={`url(#gradient-for${content})`}
      >
        <linearGradient id={"gradient-for" + content}>
          <stop offset="0%" stopColor={colors.primary} />
          <stop offset="100%" stopColor={colors.secondary} />
        </linearGradient>
      </ChevronDownIcon>
      <div className="absolute bottom-6 left-1/2 right-1/2 h-[1px] bg-gradient-to-r from-primary to-secondary transition-[left_right] group-hover:left-0 group-hover:right-0" />
    </div>
    {extra ? (
      <div className="absolute left-0 right-0 top-[80px] z-30 max-h-0 overflow-hidden bg-foreground text-accent opacity-0 transition-[max-height_opacity] group-hover:max-h-72 group-hover:opacity-100 group-hover:delay-150">
        <ul className="container grid grid-cols-4 gap-8 py-4">
          {extra.map(({ links, title }) => (
            <li key={title}>
              <span className="font-bold">{title}</span>
              <ul className="mt-4 space-y-2 font-normal">
                {links.map(({ href, text }) => (
                  <li key={text}>
                    <Link
                      href={href}
                      className="underline-offset-4 hover:underline"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div className="absolute top-[80px] z-30 max-h-0 overflow-hidden bg-foreground text-accent opacity-0 transition-[max-height_opacity] group-hover:max-h-72 group-hover:opacity-100 group-hover:delay-150">
        <ul className="space-y-2 p-4 font-normal">
          {links.map(({ href, text }) => (
            <li key={text}>
              <Link href={href} className="underline-offset-4 hover:underline">
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}
  </li>
);
//grid-cols-[repeat(auto-fill,minmax(min(100%,380px),1fr))]

export default Navbar;