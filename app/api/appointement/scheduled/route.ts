import pool from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  try {
    // Fetch all accepted appointments directly from the pool
    const [appointmentsRows]: any[] = await pool.query(
      "SELECT * FROM Appointment WHERE status = ? ORDER BY id DESC",
      ["ACCEPTED"]
    );

    // Extract appointment IDs to fetch related information
    const appointmentIds = appointmentsRows.map(
      (appointment: any) => appointment.id
    );

    // Fetch all appointment info related to these appointments
    const [appInfoRows]: any[] = await pool.query(
      "SELECT * FROM AppointmentInfo WHERE appointmentId IN (?)",
      [appointmentIds]
    );

    // Combine appointment data with related info
    const appointmentsWithInfo = appointmentsRows.map((appointment: any) => {
      const info = appInfoRows.filter(
        (info: any) => info.appointmentId === appointment.id
      );
      return { ...appointment, info };
    });

    return NextResponse.json({
      success: true,
      status: 200,
      data: appointmentsWithInfo,
    });
  } catch (error: any) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
