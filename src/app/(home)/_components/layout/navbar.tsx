import { colors, navItemsContent } from "@/config/const";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import NavbarCart from "./navbar-cart";
import NavbarMobileItems from "./navbar-mobile-items";
import NavbarScroll from "./navbar-scroll";
import NavbarSearch from "./navbar-search";
import NavbarUser from "./navbar-user";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 w-full bg-background transition-colors md:bg-transparent md:data-[scrolled=true]:bg-background">
      <div className="header-border-gradient border-b md:border-border">
        <nav className="container flex h-16 items-center md:h-20">
          <Link
            href="/"
            className="w-full max-w-24 text-center text-2xl font-bold lg:order-2"
          >
            Kioga
          </Link>
          <ul className="hidden h-full w-full items-center gap-6 md:ml-4 md:flex lg:order-1 lg:ml-0">
            {navItemsContent.map((navItemProps) => (
              <NavItem {...navItemProps} key={navItemProps.content} />
            ))}
          </ul>
          <div className="order-3 flex w-full animate-fade-in items-center justify-end opacity-0 delay-500 fill-mode-forwards">
            <NavbarUser />
            <NavbarSearch />
            <NavbarCart />
            <NavbarMobileItems />
          </div>
        </nav>
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
      <div className="absolute left-0 right-0 top-[80px] z-30 max-h-0 overflow-hidden bg-foreground text-accent opacity-0 shadow-md transition-[max-height_opacity] group-hover:max-h-72 group-hover:opacity-100 group-hover:delay-150">
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
      <div className="absolute top-[80px] z-30 max-h-0 overflow-hidden bg-foreground text-accent opacity-0 shadow-md transition-[max-height_opacity] group-hover:max-h-72 group-hover:opacity-100 group-hover:delay-150">
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
