import Navbar from "@/app/(home)/_components/layout/navbar";
import Footer from "./_components/layout/footer";
import GradientDecorator from "./_components/gradient-decorator";
import { siteConfig } from "@/config/site";
import { QueryProvider } from "@/providers/QueryProvider";

export const metadata = {
  description: siteConfig.description,
  keywords: [
    "Kioga",
    "Computación",
    "Hardware",
    "Electrónica",
    "Laptops",
    "PC",
    "Monitores",
    "Componentes",
    "Placas",
    "Procesadores",
    "Almacenamiento",
    "Memoria",
  ],
  authors: [
    {
      name: "mateoEv",
    },
  ],
  creator: "mateoEv",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>
        <GradientDecorator className="-translate-x-1/2 -translate-y-[70%] md:left-1/3 xl:size-[300px]" />
        <QueryProvider type="customer">{children}</QueryProvider>
      </main>
      <Footer />
    </>
  );
}
