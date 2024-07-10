import { Avatar } from "@/components/ui/avatar";
import { getAdminSession } from "@/server/auth";
import { SidebarMobile } from "./sidebar";

export default async function Header() {
  const user = await getAdminSession();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <SidebarMobile />
      <div className="w-full flex-1"></div>
      <Avatar name={user!.name} />
    </header>
  );
}
