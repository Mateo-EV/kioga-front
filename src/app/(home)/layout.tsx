import Navbar from "@/app/(home)/_components/navbar/navbar";
import Footer from "./_components/footer";
import GradientDecorator from "./_components/gradient-decorator";
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
        {children}
      </main>
      <Footer />
    </>
  );
}
