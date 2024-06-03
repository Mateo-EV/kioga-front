import { QueryProvider } from "@/providers/QueryProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryProvider type="admin">{children}</QueryProvider>;
}
