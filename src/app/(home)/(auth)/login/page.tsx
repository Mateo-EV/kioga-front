import { getSession } from "@/server/auth";
import AuthPage from "../_components/auth-page";
import { redirect } from "next/navigation";

export default async function HomeLoginPage() {
  const session = await getSession();
  if (session) redirect("/");

  return <AuthPage isLoginPage />;
}
