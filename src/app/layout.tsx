import "@/assets/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import CSRFToken from "@/components/csrf-token";
import { siteConfig } from "@/config/site";

import { Poppins } from "next/font/google";

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
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="es" style={{ colorScheme: "dark" }}>
      <body
        className={`antialiased ${poppins.variable} relative min-w-72 font-main`}
      >
        <CSRFToken />
        {authModal}
        {children}
      </body>
    </html>
  );
}
