import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbconfig/dbconfig";

export const GET = async (req: NextRequest) => {
  try {
    // Fetch all appointments from the database
    const [appointmentsRows]: any[] = await pool.query(
      "SELECT * FROM Appointment"
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
