import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbconfig/dbconfig";

export const GET = async (req: NextRequest) => {
  try {
    // Query to get appointments with status 'REJECTED' ordered by creation date in descending order
    const [appointmentsRows]: any[] = await pool.query(
      "SELECT * FROM Appointment WHERE status = ? ORDER BY id DESC",
      ["REJECTED"]
    );

    return NextResponse.json({
      success: true,
      status: 200,
      data: appointmentsRows,
    });
  } catch (error: any) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
