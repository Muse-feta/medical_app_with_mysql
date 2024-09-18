import { NextRequest, NextResponse } from "next/server";
import { mailer } from "@/helpers/mailer";
const pool = require("@/dbconfig/dbconfig");

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log(body);
    const { email, userId } = body;

    const connection = await pool.getConnection();
    try {
      // Find the user by email
      const [userRows]: any[] = await connection.query(
        "SELECT * FROM User WHERE email = ?",
        [email]
      );

      if (userRows.length === 0) {
        return NextResponse.json({ message: "Invalid email" }, { status: 400 });
      }

      // Reset verification token
      await connection.query(
        "UPDATE User SET verifyToken = NULL, verifyTokenExpiry = NULL WHERE id = ?",
        [userId]
      );

      // Send email
      mailer({ email: email, emailType: "VERIFY", userId: userId });

      return NextResponse.json(
        { message: "Verification email sent" },
        { status: 200 }
      );
    } catch (transactionError) {
      throw transactionError;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
