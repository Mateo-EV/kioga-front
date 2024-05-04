import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type ButtonProps = (
  | (React.ComponentPropsWithoutRef<"button"> & {
      type?: "button";
    })
  | (React.ComponentPropsWithoutRef<typeof Link> & {
      type?: "link";
    })
) & { variant?: "primary" | "secondary" };

const buttonType = {
  button: (props: React.ComponentPropsWithoutRef<"button">) => (
    <button {...props} />
  ),
  link: (props: React.ComponentPropsWithoutRef<typeof Link>) => (
    <Link {...props} />
  ),
};

export const HomeButton = ({
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) => {
  const Button = buttonType[type] as any;

  return (
    <Button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-bl-2xl rounded-tr-2xl px-4 py-3 text-sm font-semibold",
        variant === "primary"
          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
          : "border text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
