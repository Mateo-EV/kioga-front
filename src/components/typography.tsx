import { cn } from "@/lib/utils";

type typographyProps = React.ComponentPropsWithRef<"h1" | "h2" | "h3" | "p">;

export const H1 = ({ className, ...props }: typographyProps) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className,
      )}
      {...props}
    />
  );
};

export const H2 = ({ className, ...props }: typographyProps) => {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
};

export const H3 = ({ className, ...props }: typographyProps) => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
};

export const Paragraph = ({ className, ...props }: typographyProps) => {
  return (
    <p
      className={cn("text-justify text-sm xs:text-base lg:text-lg", className)}
      {...props}
    />
  );
};
