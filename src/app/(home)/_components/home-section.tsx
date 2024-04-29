import React from "react";
import { HomePrimaryButton, HomeSecondaryButton } from "./home-button";
import { ComputerIcon, EyeIcon, Layers2Icon } from "lucide-react";

export const StartSection = () => {
  return (
    <section className="py-12">
      <div className="container space-y-6">
        <h2 className="text-3xl font-semibold">
          Lo Mejor de <br />
          <span className="text-primary">Última Generación</span> <br />
          en Computación
        </h2>
        <p className="text-sm">
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
    <section className="relative overflow-hidden py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[250px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-primary to-background opacity-30 blur-3xl"
      />
      <div className="container space-y-4">
        <h3 className="text-2xl font-semibold">Productos de la Semana</h3>
        <HomeSecondaryButton type="link" href="/">
          Ver Mas <EyeIcon className="size-4" strokeWidth={2.5} />
        </HomeSecondaryButton>
        <div className="relative h-96 w-full rounded-[0_24px_0_24px] bg-[linear-gradient(148deg,var(--tw-gradient-stops))] from-primary/10 to-background p-4 before:absolute before:inset-0 before:-z-20 before:-m-[1px] before:rounded-[inherit] before:bg-[linear-gradient(to_right,var(--tw-gradient-stops))] before:from-primary before:to-secondary before:content-[''] after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-background after:content-['']">
          <p className="text-xl font-semibold">Product 1</p>
          <p className="text-sm text-muted-foreground">TYPE: Kepler Brooks</p>
        </div>
      </div>
    </section>
  );
};
