"use client";
export const dynamic = "force-dynamic";
import DashboardTitle from "@/components/ui/dashboardTitle";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";

// Define the Payment type
type Payment = {
  id: number;
  firstname: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
};

// Define the columns for the DataTable
const columns: ColumnDef<Payment, any>[] = [
  {
    accessorKey: "firstname",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image
          className="w-8 h-8 rounded-full"
          src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${row.getValue(
            "firstname"
          )}`}
          alt="avatar"
          width={32}
          height={32}
        />
        <span>{row.getValue("firstname")}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "isVerified",
    header: "Is Verified",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span>{row.getValue("isVerified") ? "Yes" : "No"}</span>
      </div>
    ),
  },
];

const DashboardUsers: React.FC = () => {
  const [data, setData] = useState<Payment[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch("/api/users", {
          cache: "no-store",
        })
        const res = await result.json();
        console.log("user data",res.data);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (rowData: Payment) => {
    router.push(`/admin/dashboard/users/${rowData.id}`);
  };

  return (
    <div>
      <DashboardTitle title="Users" />
      <SearchBar/>
      <DataTable columns={columns} data={data} onRowClick={handleRowClick} />
    </div>
  );
};

export default DashboardUsers;
