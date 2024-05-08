import "@/assets/styles/globals.css";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Kioga",
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
      </body>
    </html>
  );
}
// md:pt-[146px] pt-20
