import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbconfig/dbconfig";

export const GET = async () => {
  try {
    // Get all users
    const [usersRows]: any[] = await pool.query("SELECT * FROM User");

    // Get new users in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const formattedDate = thirtyDaysAgo.toISOString().split("T")[0]; // YYYY-MM-DD format

    const [newUsersRows]: any[] = await pool.query(
      "SELECT * FROM User WHERE createdAt >= ?",
      [formattedDate]
    );

    // Get all appointments
    const [appointmentsRows]: any[] = await pool.query(
      "SELECT * FROM Appointment"
    );

    // Get all active appointments
    const [activeAppointmentsRows]: any[] = await pool.query(
      "SELECT * FROM Appointment WHERE status = 'PENDING'"
    );

    const cardInfo = {
      totalUsers: usersRows.length,
      newUsersLast30Days: newUsersRows.length,
      totalAppointments: appointmentsRows.length,
      activeAppointments: activeAppointmentsRows.length,
    };

    return NextResponse.json(cardInfo);
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ message: error.message, status: 500 });
  }
};
