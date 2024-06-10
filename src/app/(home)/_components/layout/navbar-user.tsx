import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSession } from "@/server/auth";
import Link from "next/link";
import { Suspense } from "react";
import NavbarUserDropdown from "./navbar-dropdown-user";

function NavbarUser() {
  return (
    <Suspense>
      <NavbarUserContent />
    </Suspense>
  );
}

const NavbarUserContent = async () => {
  const user = await getSession();

  if (!user)
    return (
      <Link
        className={cn(buttonVariants({ size: "sm", className: "mr-1" }))}
        href="/login"
      >
        Unirse
      </Link>
    );

  return <NavbarUserDropdown user={user} />;
};

export default NavbarUser;
