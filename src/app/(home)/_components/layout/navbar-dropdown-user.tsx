"use client";

import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import axios from "@/lib/axios";
import { LogOutIcon, ShoppingBasketIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

function NavbarUserDropdown({ user }: { user: Session }) {
  const [isLogginOut, startLogginOut] = useTransition();
  const router = useRouter();

  const handleLogOut = (e: React.MouseEvent) => {
    e.preventDefault();
    startLogginOut(async () => {
      await axios.post("/logout");
      router.refresh();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar name={user.name} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10}>
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <UserIcon className="size-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2" asChild>
          <Link href="/pedidos">
            <ShoppingBasketIcon className="size-4" />
            <span>Pedidos</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2" onClick={handleLogOut}>
          {isLogginOut ? <LoadingSpinner /> : <LogOutIcon className="size-4" />}
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavbarUserDropdown;
