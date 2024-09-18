import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
const pool = require("@/dbconfig/dbconfig"); // assuming you've configured your MySQL connection pool

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { password, userId } = body;
    console.log("body of reset password", body);

    // Generate hashed password
    const salt = await bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const connection = await pool.getConnection();
    try {
      // Update password in the database
      const result = await connection.query(
        "UPDATE UserInfo SET password = ? WHERE userId = ?",
        [hashedPassword, userId]
      );

      // Check if the update was successful
      if (result.affectedRows === 0) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "Password reset successful" },
        { status: 200 }
      );
    } catch (transactionError) {
      throw transactionError;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
