import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
const pool = require("@/dbconfig/dbconfig");

export const GET = async (req: NextRequest) => {
  try {
    // Get the user data from token
    const userData = await getDataFromToken(req);
    const userId = userData.id;
    console.log("id from me route", userId);

    // MySQL Transaction Simulation
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Find the user
      const [userRows]: any[] = await connection.query(
        "SELECT * FROM users WHERE id = ?",
        [userId]
      );
      if (userRows.length === 0) {
        throw new Error("User not found");
      }
      const user = userRows[0];

      // Find user info
      const [userInfoRows]: any[] = await connection.query(
        "SELECT * FROM userInfo WHERE userId = ?",
        [userId]
      );
      const userInfo = userInfoRows.length > 0 ? userInfoRows[0] : null;

      // Commit the transaction
      await connection.commit();

      // Return the user data
      return NextResponse.json({
        success: true,
        status: 200,
        data: { user, userInfo },
      });
    } catch (transactionError) {
      await connection.rollback();
      throw transactionError;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  } catch (error: any) {
    console.error("Error in me route", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Something went wrong",
    });
  }
};
