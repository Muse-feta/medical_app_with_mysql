import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbconfig/dbconfig";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    // Validate body here if necessary
    const { title, date, time, status } = body;

    // Insert appointment data into the database
    await pool.query(
      "INSERT INTO Appointment (title, date, time, status) VALUES (?, ?, ?, ?)",
      [title, date, time, status]
    );

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Appointment created successfully",
    });
  } catch (error: any) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    // Fetch appointments with status "PENDING" and order by ID descending
    const [appointmentsRows]: any[] = await pool.query(
      "SELECT * FROM Appointment WHERE status = ? ORDER BY id DESC",
      ["PENDING"]
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
