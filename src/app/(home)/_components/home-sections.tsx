import SubscribeImage from "@/assets/img/suscribe.png";
import { H1, H2, Paragraph } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { products, top3Categories } from "@/config/const";
import { ComputerIcon, EyeIcon, Layers2Icon } from "lucide-react";
import Image from "next/image";
import { ProductCard } from "./product-card";
import ProductsFullScreenCarousel from "./carousel/products-fullscreen-carousel";
import { TopCategoriesTab } from "./top-categories-tab";

export const StartSection = () => {
  return (
    <section className="container space-y-6 py-12 xs:pt-16">
      <H1
        className="animate-fade-in opacity-0 fill-mode-forwards"
        style={{ lineHeight: 1.25 }}
      >
        Lo Mejor de <br />
        <span className="text-primary">Última Generación</span> <br />
        en Computación
      </H1>
      <Paragraph className="max-w-[600px] animate-fade-in opacity-0 delay-200 fill-mode-forwards">
        Nuestro catálogo incluye una amplia gama de productos en el ámbito de la
        computación, como componentes, periféricos, equipos y mucho más.
      </Paragraph>
      <Button className="w-full animate-fade-in opacity-0 delay-300 fill-mode-forwards xs:mr-4 xs:w-auto">
        Ver Productos <ComputerIcon className="ml-2 size-4" />
      </Button>
      <Button
        variant="secondary"
        className="w-full animate-fade-in opacity-0 delay-300 fill-mode-forwards xs:w-auto"
      >
        Ver Categorias <Layers2Icon className="ml-2 size-4" strokeWidth={2.5} />
      </Button>
    </section>
  );
};

export const WeekProductsSection = () => {
  return (
    <section className="relative animate-fade-in overflow-hidden py-12 opacity-0 delay-700 fill-mode-forwards">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[250px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-primary to-background opacity-30 blur-3xl xs:left-1/3 xs:top-[300px] xs:size-[300px]"
      />
      <div className="container xs:space-y-8">
        <div className="flex flex-col items-center justify-between gap-4 xs:flex-row">
          <H2>Productos de la Semana</H2>
          <Button variant="secondary">
            Ver más <EyeIcon className="ml-2 size-4" />
          </Button>
        </div>
        <ProductsFullScreenCarousel products={products} />
      </div>
    </section>
  );
};

export const CategoriesSection = () => {
  return (
    <section className="relative overflow-hidden py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[200px] -translate-x-[50%] -translate-y-[70%] bg-gradient-to-tr from-primary to-background opacity-30 blur-[100px] md:left-2/3 md:top-1/2 md:block xl:size-[300px]"
      />
      <div className="container space-y-8">
        <H2 className="text-center md:text-left">Mejores Categorías</H2>
        <TopCategoriesTab categories={top3Categories} />
      </div>
    </section>
  );
};

const features = [
  {
    title: "Calidad",
    content:
      "Nos comprometemos a ofrecer productos de alta calidad y rendimiento",
  },
  {
    title: "Compromiso",
    content:
      "Trabajamos con dedicación y responsabilidad para superar las expectativas de nuestros clientes",
  },
  {
    title: "Innovación",
    content:
      "Buscamos constantemente nuevas tecnologías y soluciones para mejorar la experiencia de nuestros clientes",
  },
  {
    title: "Ética",
    content:
      "Operamos de manera ética y transparente en todas nuestras acciones",
  },
];

export const AboutUsSection = () => {
  return (
    <section className="relative py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[250px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-primary to-background opacity-30 blur-3xl xs:left-1/3 xs:top-[200px] xs:size-[300px]"
      />
      <div className="container space-y-8">
        <H2>Sobre Nosotros</H2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, content }, i) => (
            <Card key={i}>
              <CardContent>
                <p className="mt-4 text-2xl text-primary">0{i + 1}</p>
                <p className="text-2xl font-semibold">{title}</p>
                <p className="text-justify text-sm xs:text-base lg:text-lg">
                  {content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export const SubscriptionNewsLetterSection = () => (
  <section className="py-12">
    <div className="container flex flex-col items-center gap-16 overflow-hidden md:flex-row">
      <div className="relative h-full md:order-2 md:basis-1/2">
        <Image src={SubscribeImage} alt="equipo" className="object-cover" />
      </div>
      <div className="space-y-4 md:order-1 md:basis-1/2">
        <span className="rounded-lg bg-primary px-4 py-1 text-sm text-foreground">
          Suscríbete
        </span>
        <H2>Suscríbete al boletín informativo</H2>
        <Paragraph>
          ¡Únete a nuestra comunidad exclusiva y mantente al día con las últimas
          noticias, ofertas especiales y tendencias tecnológicas! Suscríbete a
          nuestro boletín para acceder a contenido premium y descuentos que no
          encontrarás en ningún otro lugar.
        </Paragraph>
        <div className="flex flex-col gap-4 xs:flex-row">
          <Input type="text" placeholder="Ingresa tu correo electrónico..." />
          <Button>Suscríbete</Button>
        </div>
      </div>
    </div>
  </section>
);
