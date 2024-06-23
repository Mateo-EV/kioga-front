import { getSession } from "@/server/auth";
import { redirect } from "next/navigation";
import ForgotPasswordContent from "./forgot-password-content";

export default async function ForgotPasswordPage({}) {
  const session = await getSession();

  if (session) redirect("/");

  return <ForgotPasswordContent />;
}
