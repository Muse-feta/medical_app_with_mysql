import { appointmentEmail } from "@/helpers/appointmentEmail";
import pool from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await req.json();
    const { id } = params;
    const { date, ...appointmentInfo } = body;

    // Start a transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Insert new appointment info
      const [insertResult]: any[] = await connection.query(
        "INSERT INTO AppointmentInfo SET ?",
        { ...appointmentInfo, appointmentId: Number(id) }
      );

      // Update appointment status to 'ACCEPTED'
      const [updateResult]: any[] = await connection.query(
        "UPDATE Appointment SET status = ? WHERE id = ?",
        ["ACCEPTED", Number(id)]
      );

      // Fetch appointment details
      const [appointmentRows]: any[] = await connection.query(
        "SELECT email, patientName FROM Appointment WHERE id = ?",
        [Number(id)]
      );
      const appointment = appointmentRows[0];

      // Check if email and patientName are defined before sending an email
      const email = appointment?.email;
      const patientName = appointment?.patientName;

      if (email && patientName && date) {
        // Send email to patient
        await appointmentEmail(email, patientName, date);
      } else {
        console.error("Email or patient name is missing, email not sent.");
      }

      // Commit the transaction
      await connection.commit();

      return NextResponse.json({
        success: true,
        status: 200,
        data: insertResult,
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
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
