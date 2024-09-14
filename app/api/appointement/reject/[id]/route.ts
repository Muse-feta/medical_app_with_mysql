import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbconfig/dbconfig";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    console.log("params id here", id);

    // Update the appointment status to 'REJECTED'
    const [result]: any[] = await pool.query(
      "UPDATE Appointment SET status = ? WHERE id = ?",
      ["REJECTED", Number(id)]
    );

    // Check if any row was affected
    if (result.affectedRows === 0) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "Appointment not found",
      });
    }

    // Fetch the updated appointment to return
    const [appointmentRows]: any[] = await pool.query(
      "SELECT * FROM Appointment WHERE id = ?",
      [Number(id)]
    );

    const appointment = appointmentRows[0];

    return NextResponse.json({ success: true, status: 200, data: appointment });
  } catch (error: any) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
