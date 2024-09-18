import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbconfig/dbconfig"; // Your MySQL connection config

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { token } = body;
  console.log(token);

  const connection = await pool.getConnection();
  try {
    // Check if the token is valid
    const [rows]: any[] = await connection.query(
      "SELECT * FROM User WHERE verifyToken = ?",
      [token]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    // Updating user verification token and status
    await connection.query(
      "UPDATE User SET verifyToken = NULL, verifyTokenExpiry = NULL, isVerified = TRUE WHERE verifyToken = ?",
      [token]
    );

    return NextResponse.json(
      { message: "Token verified successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    connection.release(); // Release the connection back to the pool
  }
};
