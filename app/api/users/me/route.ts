import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbconfig/dbconfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export const GET = async (req: NextRequest) => {
  try {
    // Get user data from token
    const userData = await getDataFromToken(req);
    const userId = userData.id;

    // Start MySQL transaction manually
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Fetch user data
      const [userRows]: any[] = await connection.query(
        "SELECT * FROM User WHERE id = ?",
        [userId]
      );

      if (userRows.length === 0) {
        return NextResponse.json({
          success: false,
          status: 404,
          message: "User not found",
        });
      }

      const user = userRows[0];

      // Fetch userInfo data
      const [userInfoRows]: any[] = await connection.query(
        "SELECT * FROM UserInfo WHERE userId = ?",
        [userId]
      );

      if (userInfoRows.length === 0) {
        return NextResponse.json({
          success: false,
          status: 404,
          message: "User info not found",
        });
      }

      const userInfo = userInfoRows[0];

      // Commit the transaction
      await connection.commit();

      // Close the connection
      connection.release();

      // Return user and userInfo data
      return NextResponse.json({
        success: true,
        status: 200,
        data: { user, userInfo },
      });
    } catch (transactionError) {
      await connection.rollback();
      connection.release();
      console.error(transactionError);
      return NextResponse.json({
        success: false,
        status: 500,
        message: "Transaction failed",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Something went wrong",
    });
  }
};
