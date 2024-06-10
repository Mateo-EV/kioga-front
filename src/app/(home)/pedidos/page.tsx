import { DataTable } from "@/components/datatable/data-table";
import { getSession } from "@/server/auth";
import { api } from "@/server/fetch";
import { redirect } from "next/navigation";
import { columns } from "./colums";

export default async function OrdersPage() {
  const session = await getSession();

  if (!session) redirect("/login");

  const orders = await api<(Order & { details: OrderProduct })[]>("/orders");

  if (!orders) redirect("/");

  return (
    <section className="container flex flex-col space-y-8 py-6 md:py-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Bienvenido {session.name}
        </h2>
        <p className="text-muted-foreground">
          Aquí tenemos una lista de tus últimos pedidos
        </p>
      </div>
      <div className="animate-opacity-in">
        <DataTable data={orders} columns={columns} model="Pedidos" />
      </div>
    </section>
  );
}
