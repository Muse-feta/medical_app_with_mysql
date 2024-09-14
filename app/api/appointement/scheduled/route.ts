import pool from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();
    try {
      // Begin transaction to ensure atomic operations (optional, depending on requirements)
      await connection.beginTransaction();

      // Fetch all accepted appointments
      const [appointmentsRows]: any[] = await connection.query(
        "SELECT * FROM Appointment WHERE status = ? ORDER BY createdAt DESC",
        ["ACCEPTED"]
      );

      // Extract appointment IDs to fetch related information
      const appointmentIds = appointmentsRows.map(
        (appointment: any) => appointment.id
      );

      // Fetch all appointment info related to these appointments
      const [appInfoRows]: any[] = await connection.query(
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

      // Commit the transaction if used
      await connection.commit();

      return NextResponse.json({
        success: true,
        status: 200,
        data: appointmentsWithInfo,
      });
    } catch (transactionError) {
      // Rollback the transaction in case of error
      await connection.rollback();
      throw transactionError;
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (error: any) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
