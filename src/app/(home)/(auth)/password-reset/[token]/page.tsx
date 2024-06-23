import ResetPasswordContent from "./reset-password-content";

export default function ResetPasswordPage({
  params: { token },
  searchParams: { email },
}: {
  params: { token: string };
  searchParams: { email: string | undefined };
}) {
  return <ResetPasswordContent token={token} email={email} />;
}
