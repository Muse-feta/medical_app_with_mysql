"use client";
import DashboardTitle from "@/components/ui/dashboardTitle";
import { DataTable } from "@/components/ui/DataTable";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect } from "react";
import { useAuth } from "@/context/authContext";
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

const RejectedAppointements = () => {
  const { userData } = useAuth();
  const router = useRouter();
  const [data, setData] = React.useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await axios.get(`/api/appointement`);
        // console.log("res", res.data.data);
        const result = await fetch(`/api/appointement/reject`, {
          method: "GET",
          cache: "no-store",
        });
        const res = await result.json();
        setData(res.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (rowData: Payment) => {
    router.push(`/admin/dashboard/appointments/rejected/${rowData.id}`);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <DashboardTitle title="Rejected Orders" />{" "}
      {/* Optional: Add a title component */}
      <DataTable columns={columns} data={data} onRowClick={handleRowClick} />
    </div>
  );
};

export default RejectedAppointements;


