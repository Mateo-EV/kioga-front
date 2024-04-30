import { ComputerIcon, EyeIcon, Layers2Icon } from "lucide-react";
import { HomePrimaryButton, HomeSecondaryButton } from "./home-button";
import HomeCarouselProducts from "./home-products-carousel";

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
        <p className="max-w-[600px] text-sm xs:text-base lg:text-lg">
          Nuestro catálogo incluye una amplia gama de productos en el ámbito de
          la computación, como componentes, periféricos, equipos y mucho más.
        </p>
        <HomePrimaryButton type="link" href="/">
          Ver Productos <ComputerIcon className="size-4" strokeWidth={2.5} />
        </HomePrimaryButton>
        <HomeSecondaryButton type="link" href="/" className="ml-4">
          Ver Categorias <Layers2Icon className="size-4" strokeWidth={2.5} />
        </HomeSecondaryButton>
      </div>
    </section>
  );
};
export const WeekProductsSection = () => {
  return (
    <section className="relative overflow-hidden py-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[250px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-primary to-background opacity-30 blur-3xl xs:left-1/3 xs:top-[300px] xs:size-[300px]"
      />
      <div className="container xs:space-y-8">
        <div className="flex flex-col items-center justify-between gap-4 xs:flex-row">
          <h3 className="text-2xl font-semibold lg:text-3xl">
            Productos de la Semana
          </h3>
          <HomeSecondaryButton type="link" href="/">
            Ver más <EyeIcon className="size-4" strokeWidth={2.5} />
          </HomeSecondaryButton>
        </div>
        <HomeCarouselProducts />
      </div>
    </section>
  );
};
