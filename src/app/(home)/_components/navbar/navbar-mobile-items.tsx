import { navItemsContent } from "@/config/const";
import { AlignJustifyIcon } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const NavbarMobileItems = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="-mr-2 md:hidden" size="icon" variant="ghost">
          <AlignJustifyIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Accordion type="single" collapsible className="w-full">
          {navItemsContent.map((navItemsProps) => (
            <NavItem {...navItemsProps} key={navItemsProps.content} />
          ))}
        </Accordion>
      </SheetContent>
    </Sheet>
  );
};

type NavItemProps = (typeof navItemsContent)[number];

const NavItem = ({ content, extra, links }: NavItemProps) => {
  return (
    <AccordionItem value={content}>
      <AccordionTrigger className="text-sm font-semibold outline-none">
        {content}
      </AccordionTrigger>
      <AccordionContent className="pl-4">
        {extra ? (
          <Accordion type="single" collapsible className="w-full">
            {extra.map(({ links, title }) => (
              <AccordionItem key={title} value={title}>
                <AccordionTrigger className="text-sm" showIcon={false}>
                  {title}
                </AccordionTrigger>
                <AccordionContent className="pl-4">
                  <ul className="space-y-2">
                    {links.map(({ href, text }) => (
                      <li key={text}>
                        <Link href={href}>{text}</Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <ul className="space-y-2">
            {links.map(({ href, text }) => (
              <li key={text}>
                <Link href={href}>{text}</Link>
              </li>
            ))}
          </ul>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default NavbarMobileItems;
