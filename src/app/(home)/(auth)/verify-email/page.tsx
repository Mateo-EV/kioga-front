import { getSessionWithErrorCode } from "@/server/auth";
import VerificationEmailContent from "./verification-email-content";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage() {
  const session = await getSessionWithErrorCode();

  if (session.status !== 409) redirect("/");

  return <VerificationEmailContent />;
}
