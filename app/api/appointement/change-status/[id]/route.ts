import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbconfig/dbconfig";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await req.json();
    const { id } = params;
    const status = body.status;

    // Start a transaction
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Update appointment status
      await connection.query("UPDATE Appointment SET status = ? WHERE id = ?", [
        status,
        Number(id),
      ]);

      // Delete related appointment info
      await connection.query(
        "DELETE FROM AppointmentInfo WHERE appointmentId = ?",
        [Number(id)]
      );

      // Commit the transaction
      await connection.commit();

      // Release the connection
      connection.release();

      return NextResponse.json({
        success: true,
        status: 200,
        data: { id, status },
      });
    } catch (transactionError) {
      // Rollback the transaction if an error occurs
      await connection.rollback();
      connection.release();
      throw transactionError;
    }
  } catch (error: any) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
