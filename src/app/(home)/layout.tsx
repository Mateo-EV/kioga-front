import Navbar from "@/app/(home)/_components/navbar/navbar";
import Footer from "./_components/footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
