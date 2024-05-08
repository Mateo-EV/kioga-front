import { BrandsCarousel } from "./_components/carousel/brands-carousel";
import {
  AboutUsSection,
  CategoriesSection,
  StartSection,
  SubscriptionNewsLetterSection,
  WeekProductsSection,
} from "./_components/home-sections";
import HeadPhone1Image from "@/assets/img/headphone1.png";
import HeadPhone2Image from "@/assets/img/headphone2.png";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 -z-10 size-[200px] -translate-x-[50%] -translate-y-[70%] bg-gradient-to-tr from-primary to-secondary opacity-30 blur-[100px] md:left-1/3 md:block xl:size-[300px]"
      />
      <Image
        className="absolute left-0 top-0 -z-10 hidden animate-fade-in transition fill-mode-forwards xs:block xs:w-[110px] sm:w-[125px]"
        src={HeadPhone1Image}
        sizes="(min-width: 575px) 110px, (min-width: 640px) 125px, 0"
        alt="headphone-divided"
      />
      <Image
        className="absolute -top-[50px] right-0 -z-10 w-[210px] animate-fade-in opacity-0 transition fill-mode-forwards sm:w-[275px] lg:w-[319px] xl:right-[13%]"
        src={HeadPhone2Image}
        sizes="(min-width: 640px) 275px, (min-width: 992px) 319px, 210px"
        alt="headphone-divided-2"
      />
      {/* <TracingBeam> */}
      <StartSection />
      <WeekProductsSection />
      <CategoriesSection />
      <BrandsCarousel />
      <AboutUsSection />
      <SubscriptionNewsLetterSection />
      {/* </TracingBeam> */}
    </>
  );
}
