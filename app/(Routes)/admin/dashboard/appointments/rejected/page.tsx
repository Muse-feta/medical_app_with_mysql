"use client";
import DashboardTitle from "@/components/ui/dashboardTitle";
import { DataTable } from "@/components/ui/DataTable";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

// Define the Payment type
type Payment = {
  id: number;
  patientName: string;
  phoneNumber: string;
  status: "REJECTED";
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
  const { userData } = useAuth(); // Ensure AuthContext is working
  const router = useRouter();
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`/api/appointement/reject`);
        if (!result.ok) throw new Error(`Error fetching: ${result.statusText}`);
        const res = await result.json();
        setData(res.data);
      } catch (error) {
        console.log("Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (rowData: Payment) => {
    router.push(`/admin/dashboard/appointments/rejected/${rowData.id}`);
  };

  // If loading, show a loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  // If no data is returned
  if (data.length === 0) {
    return <p>No rejected appointments found.</p>;
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <DashboardTitle title="Rejected Orders" />
      <DataTable columns={columns} data={data} onRowClick={handleRowClick} />
    </div>
  );
};

export default RejectedAppointements;
