import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

function NavbarUserDropdown() {
  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="ghost" size="icon">
    //       <UserIcon className="size-5" />
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end">
    //     <DropdownMenuItem className="gap-2">
    //       <LogInIcon className="size-4" />
    //       <span>Iniciar Sesión</span>
    //     </DropdownMenuItem>
    //     <DropdownMenuItem className="gap-2">
    //       <UserRoundPlusIcon className="size-4" />
    //       <span>Registrarse</span>
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <Link
      className={cn(buttonVariants({ size: "sm", className: "mr-1" }))}
      href="/login"
    >
      Unirse
    </Link>
  );
}

export default NavbarUserDropdown;
