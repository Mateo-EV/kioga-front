import { Card } from "@/components/ui/card";
import AdminLoginForm from "./admin-login-form";
import { getAdminSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) redirect("/admin/dashboard");

  return (
    <div className="grid h-screen w-full place-items-center">
      <Card className="w-full max-w-[400px] p-6">
        <AdminLoginForm />
      </Card>
    </div>
  );
}
