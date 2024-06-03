import { getAdminSession } from "@/server/auth";
import { api } from "@/server/fetch";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage({}) {
  const session = await getAdminSession();

  if (!session) redirect("/");

  const brands = await api<[]>("/api/admin/brands");
  console.log(brands);

  return <div>{session.name}</div>;
}
