import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbconfig/dbconfig"; // Your MySQL connection config

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { token } = body;
  console.log(token);

  const connection = await pool.getConnection();
  try {
    // Find the user with the provided forgotPasswordToken
    const [rows]: any[] = await connection.query(
      "SELECT * FROM User WHERE forgotPasswordToken = ?",
      [token]
    );

    if (rows.length === 0) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Invalid token",
      });
    }

    const user = rows[0];

    // Update the user's forgotPasswordToken and forgotPasswordTokenExpiry
    await connection.query(
      "UPDATE User SET forgotPasswordToken = NULL, forgotPasswordTokenExpiry = NULL WHERE forgotPasswordToken = ?",
      [token]
    );

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Token verified",
      userId: user.id,
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({
      success: false,
      status: 500,
      message: "Something went wrong",
    });
  } finally {
    connection.release(); // Release the connection back to the pool
  }
};
