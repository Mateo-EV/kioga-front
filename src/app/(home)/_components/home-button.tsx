import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type ButtonProps =
  | (React.ComponentPropsWithoutRef<"button"> & {
      type?: "button";
    })
  | (React.ComponentPropsWithoutRef<typeof Link> & {
      type?: "link";
    });

const buttonType = {
  button: (props: React.ComponentPropsWithoutRef<"button">) => (
    <button {...props} />
  ),
  link: (props: React.ComponentPropsWithoutRef<typeof Link>) => (
    <Link {...props} />
  ),
};

export const HomePrimaryButton = ({
  className,
  type = "button",
  ...props
}: ButtonProps) => {
  const Button = buttonType[type] as any;

  return (
    <Button
      className={cn(
        "inline-flex items-center gap-2 rounded-bl-2xl rounded-tr-2xl bg-gradient-to-r from-primary to-secondary px-4 py-3 text-sm font-semibold text-primary-foreground",
        className,
      )}
      {...props}
    />
  );
};

export const HomeSecondaryButton = ({
  className,
  type = "button",
  ...props
}: ButtonProps) => {
  const Button = buttonType[type] as any;
  return (
    <Button
      className={cn(
        "inline-flex items-center gap-2 rounded-bl-2xl rounded-tr-2xl border px-4 py-3 text-sm font-semibold text-foreground",
        className,
      )}
      {...props}
    />
  );
};
