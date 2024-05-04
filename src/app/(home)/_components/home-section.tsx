import { ComputerIcon, EyeIcon, Layers2Icon } from "lucide-react";
import { HomeButton } from "./home-button";
import HomeCarouselProducts from "./home-products-carousel";
import Link from "next/link";
import { ProductCard } from "./product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { products } from "@/config/const";
import Image from "next/image";
import SubscribeImage from "@/assets/img/suscribe.png";

export const StartSection = () => {
  return (
    <section className="py-12 xs:pt-20">
      <div className="container space-y-6">
        <h2
          className="text-3xl font-semibold xs:text-4xl lg:text-5xl"
          style={{ lineHeight: 1.25 }}
        >
          Lo Mejor de <br />
          <span className="text-primary">Última Generación</span> <br />
          en Computación
        </h2>
        <p className="max-w-[600px] text-justify text-sm xs:text-base lg:text-lg">
          Nuestro catálogo incluye una amplia gama de productos en el ámbito de
          la computación, como componentes, periféricos, equipos y mucho más.
        </p>
        <HomeButton type="link" href="/">
          Ver Productos <ComputerIcon className="size-4" strokeWidth={2.5} />
        </HomeButton>
        <HomeButton variant="secondary" type="link" href="/" className="ml-4">
          Ver Categorias <Layers2Icon className="size-4" strokeWidth={2.5} />
        </HomeButton>
      </div>
    </section>
  );
};

export const WeekProductsSection = () => {
  return (
    <section className="relative overflow-hidden py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[250px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-primary to-background opacity-30 blur-3xl xs:left-1/3 xs:top-[300px] xs:size-[300px]"
      />
      <div className="container xs:space-y-8">
        <div className="flex flex-col items-center justify-between gap-4 xs:flex-row">
          <h3 className="text-2xl font-semibold lg:text-3xl">
            Productos de la Semana
          </h3>
          <HomeButton variant="secondary" type="link" href="/">
            Ver más <EyeIcon className="size-4" strokeWidth={2.5} />
          </HomeButton>
        </div>
        <HomeCarouselProducts />
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
        <h3 className="text-center text-2xl font-semibold md:text-left lg:text-3xl">
          Mejores Categorías
        </h3>
        <div className="grid auto-rows-fr grid-cols-1 items-center gap-4 text-center md:grid-cols-2 lg:grid-cols-4">
          <HomeButton>Procesadores</HomeButton>
          <HomeButton variant="secondary">Periféricos</HomeButton>
          <HomeButton variant="secondary">Monitores</HomeButton>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:underline"
          >
            MOSTRAR MÁS CATEGORIAS
          </Link>
        </div>
        <Carousel opts={{ align: "center", dragFree: true }}>
          <CarouselContent>
            {products.map((product, i) => (
              <CarouselItem key={i} className="sm:basis-1/2 md:basis-1/3">
                <div className="p-1">
                  <ProductCard {...product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden xs:inline-flex" />
          <CarouselNext className="hidden xs:inline-flex" />
        </Carousel>
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

{
  /* <p className="text-justify text-sm xs:text-base lg:text-lg">
  Somos una empresa dedicada a ofrecer soluciones en equipos de
  computación de alta calidad para satisfacer las necesidades de
  nuestros clientes.
</p> */
}
export const AboutUsSection = () => {
  return (
    <section className="relative bg-zinc-50 py-8 text-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[250px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-primary to-background opacity-30 blur-3xl xs:left-1/3 xs:top-[200px] xs:size-[300px]"
      />
      <div className="container">
        <h3 className="mb-12 text-2xl font-semibold lg:text-3xl">
          Sobre Nosotros
        </h3>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, content }, i) => (
            <li
              key={i}
              className="to-bg-zinc relative mx-auto w-full space-y-2 rounded-[0_24px_0_24px] border border-primary bg-[linear-gradient(148deg,var(--tw-gradient-stops))] from-primary/10 p-4"
            >
              <p className="text-2xl text-primary">0{i + 1}</p>
              <p className="text-2xl font-semibold">{title}</p>
              <p className="text-justify text-sm xs:text-base lg:text-lg">
                {content}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export const SubscriptionNewsLetterSection = () => (
  <section className="bg-zinc-50 py-12 text-background">
    <div className="container flex flex-col items-center gap-16 overflow-hidden md:flex-row">
      <Image src={SubscribeImage} alt="equipo" className="md:order-2" />
      <div className="space-y-4 md:order-1">
        <span className="rounded-lg bg-primary px-4 py-1 text-sm text-foreground">
          Suscríbete
        </span>
        <h3 className="text-2xl font-semibold lg:text-3xl">
          Suscríbete al boletín informativo
        </h3>
        <p className="text-justify text-sm xs:text-base lg:text-lg">
          ¡Únete a nuestra comunidad exclusiva y mantente al día con las últimas
          noticias, ofertas especiales y tendencias tecnológicas! Suscríbete a
          nuestro boletín para acceder a contenido premium y descuentos que no
          encontrarás en ningún otro lugar.
        </p>
        <div className="flex">
          <input
            type="text"
            className="flex-1 rounded-bl-2xl border border-r-0 bg-transparent px-4 py-2 outline-none placeholder:text-sm"
            placeholder="Ingresa tu correo electrónico"
          />
          <button className="w-[200px] rounded-tr-2xl bg-primary px-4 py-3 text-sm font-semibold text-foreground ">
            Suscríbete
          </button>
        </div>
      </div>
    </div>
  </section>
);
