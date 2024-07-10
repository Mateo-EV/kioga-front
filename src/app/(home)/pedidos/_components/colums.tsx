"use client";

import { type ColumnDef, type Row } from "@tanstack/react-table";
import { CopyIcon, EllipsisIcon, ReceiptTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableRowActionsProps {
  row: Row<OrderResponse>;
}

import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { type OrderStatus, OrderStatusVariants } from "@/config/const";
import { useModal, type OrderResponse } from "@/hooks/useModal";
import { formatToDate, formatToTime } from "@/lib/date";
import { formatPrice } from "@/lib/utils";

export const columns = [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("code")}</div>,
    enableHiding: false,
  },
  {
    id: "productos",
    accessorFn: ({ details }) =>
      details.reduce((acc, curr) => acc + curr.quantity, 0),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Productos" />
    ),
    cell: ({ getValue }) => {
      return <div className="w-[40px]">{getValue<number>()}</div>;
    },
  },
  {
    id: "importe",
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Importe" />
    ),
    cell: ({ getValue, row }) => (
      <>
        <span className="block">{formatPrice(getValue<number>())}</span>
        {row.original.is_delivery && (
          <span className="block text-sm text-muted-foreground">
            Envío: {formatPrice(row.original.shipping_amount)}
          </span>
        )}
      </>
    ),
  },
  {
    id: "estado",
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ getValue }) => (
      <Badge variant={OrderStatusVariants[getValue<OrderStatus>()]}>
        {getValue<OrderStatus>()}
      </Badge>
    ),
  },
  {
    id: "fecha",
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ row }) => (
      <Input
        type="date"
        value={formatToDate(row.original.created_at)}
        className="disabled:cursor-auto"
        disabled
      />
    ),
  },
  {
    id: "hora",
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hora" />
    ),
    cell: ({ row }) => (
      <Input
        type="time"
        value={formatToTime(row.original.created_at)}
        className="disabled:cursor-auto"
        disabled
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
] satisfies ColumnDef<OrderResponse>[];

function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { open } = useModal();
  const order = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex size-8 p-0 data-[state=open]:bg-muted"
        >
          <EllipsisIcon className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          className="gap-2"
          onClick={() => navigator.clipboard.writeText(order.code)}
        >
          <CopyIcon className="size-4" />
          <span>Copiar</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => open({ type: "order-details", data: order })}
        >
          <ReceiptTextIcon className="size-4" />
          <span>Detalles</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
