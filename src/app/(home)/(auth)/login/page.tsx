import { getSessionWithErrorCode } from "@/server/auth";
import AuthPage from "../_components/auth-page";
import { redirect } from "next/navigation";

export default async function HomeLoginPage() {
  const session = await getSessionWithErrorCode();

  if (session.status === 409) redirect("/verify-email");
  if (session.data) redirect("/");

  return <AuthPage isLoginPage />;
}
