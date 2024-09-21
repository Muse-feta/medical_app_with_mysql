import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbconfig/dbconfig";
export const dynamic = "force-dynamic";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const userId = Number(id);

    // Get all appointments for the user
    const [appointmentsRows]: any[] = await pool.query(
      "SELECT * FROM Appointment WHERE userId = ?",
      [userId]
    );

    // Get all appointment IDs
    const appointmentIds = appointmentsRows.map(
      (appointment: any) => appointment.id
    );

    if (appointmentIds.length === 0) {
      return NextResponse.json({ success: true, status: 200, data: [] });
    }

    // Get all appointment info for the retrieved appointments
    const [appInfoRows]: any[] = await pool.query(
      "SELECT * FROM AppointmentInfo WHERE appointmentId IN (?)",
      [appointmentIds]
    );

    // Map appointment info to their respective appointments
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
