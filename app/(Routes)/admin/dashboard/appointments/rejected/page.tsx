"use client";
import DashboardTitle from "@/components/ui/dashboardTitle";
import { DataTable } from "@/components/ui/DataTable";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

// Define the Payment type
type Payment = {
  id: number;
  patientName: string;
  phoneNumber: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  email: string;
};

// Define the columns for the DataTable
const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Order Id",
    cell: ({ row }) => row.getValue("id"),
  },
  {
    accessorKey: "patientName",
    header: "Name",
    cell: ({ row }) => row.getValue("patientName"),
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
    cell: ({ row }) => row.getValue("phoneNumber"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
          "bg-red-200": row.getValue("status") === "PENDING",
          "bg-orange-200": row.getValue("status") === "REJECTED",
          "bg-green-200": row.getValue("status") === "ACCEPTED",
        })}
      >
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.getValue("email"),
  },
];

async function getRejectedOrders(): Promise<Payment[]> {
  const response = await fetch(`/api/appointement/reject`, {
    cache: "no-store", // Ensures no caching in both client and server
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const result = await response.json();
  return result.data;
}

const DashboardOrders = async () => {
  const router = useRouter();

  // Fetch data without useEffect
  const data = await getRejectedOrders();

  const handleRowClick = (rowData: Payment) => {
    router.push(`/admin/dashboard/appointments/rejected/${rowData.id}`);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <DashboardTitle title="Rejected Orders" />
      <DataTable columns={columns} data={data} onRowClick={handleRowClick} />
    </div>
  );
};

export default DashboardOrders;
