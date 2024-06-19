import GamingSetUpImage from "@/assets/img/gaming-setup.png";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type HomeAuthLayoutProps = {
  children: React.ReactNode;
};

export default function HomeAuthLayout({ children }: HomeAuthLayoutProps) {
  return (
    <>
      <section className="container flex justify-center py-12">
        <Card className="basis-2/5 py-6 lg:rounded-r-none">
          <CardContent className="grid place-items-center">
            {children}
          </CardContent>
        </Card>
        <div className="hidden basis-3/5 overflow-hidden rounded-r-md lg:block">
          <Image
            src={GamingSetUpImage}
            alt="gaming-setup"
            className="object-cover"
            sizes="(min-width: 1400px) 1080px, (min-width: 992px) 640px, 0"
          />
        </div>
      </section>
    </>
  );
}
