import { getSessionWithErrorCode } from "@/server/auth";
import { redirect } from "next/navigation";
import AuthPage from "../_components/auth-page";

export default async function HomeRegisterPage() {
  const session = await getSessionWithErrorCode();

  if (session.status === 409) redirect("/verify-email");
  if (session.data) redirect("/");

  return <AuthPage />;
}
