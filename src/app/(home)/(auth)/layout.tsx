type HomeAuthLayoutProps = {
  children: React.ReactNode;
};

export default function HomeAuthLayout({ children }: HomeAuthLayoutProps) {
  return (
    <>
      <section className="container relative grid place-items-center py-12">
        {children}
      </section>
    </>
  );
}
