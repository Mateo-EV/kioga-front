import "@/assets/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import { siteConfig } from "@/config/site";

import { Poppins } from "next/font/google";

import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" style={{ colorScheme: "dark" }}>
      <body
        className={`antialiased ${poppins.variable} relative min-w-72 font-main`}
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
