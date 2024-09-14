import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbconfig/dbconfig";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    // Fetch the current user role
    const [userRows]: any[] = await pool.query(
      "SELECT role FROM UserInfo WHERE userId = ?",
      [Number(id)]
    );

    if (userRows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const currentRole = userRows[0].role;

    // Toggle the role
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";

    // Update the user role
    await pool.query("UPDATE userInfo SET role = ? WHERE userId = ?", [
      newRole,
      Number(id),
    ]);

    return NextResponse.json(
      { message: "User role updated", role: newRole },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
