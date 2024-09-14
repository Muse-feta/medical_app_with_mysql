import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbconfig/dbconfig";

export const GET = async () => {
  try {
    // Get current date and time
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);

    // Format date to MySQL datetime format
    const formattedDate = oneDayAgo
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // Query to get recent appointments in the last 1 day
    const [recentAppointmentsRows]: any[] = await pool.query(
      "SELECT * FROM Appointment WHERE createdAt >= ? ORDER BY createdAt DESC LIMIT 10",
      [formattedDate]
    );

    return NextResponse.json({
      success: true,
      status: 200,
      data: recentAppointmentsRows,
    });
  } catch (error: any) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
