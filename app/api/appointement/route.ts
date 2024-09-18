import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbconfig/dbconfig";

// POST: Create a new appointment
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    // Extract fields from request body
    const {
      userId,
      patientName,
      email,
      phoneNumber,
      department,
      additionalInfo,
      status,
    } = body;

    // Insert new appointment into the database
    const [result]: any = await pool.query(
      `INSERT INTO Appointment (userId, patientName, email, phoneNumber, department, additionalInfo, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        patientName,
        email,
        phoneNumber,
        department,
        additionalInfo,
        status || "PENDING",
      ]
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

// GET: Fetch all pending appointments
export const GET = async (req: NextRequest) => {
  try {
    // Fetch appointments with PENDING status
    const [appointments]: any[] = await pool.query(
      `SELECT * FROM Appointment WHERE status = ? ORDER BY id DESC`,
      ["PENDING"]
    );

    return NextResponse.json({
      success: true,
      status: 200,
      data: appointments,
    });
  } catch (error: any) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
