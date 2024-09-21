import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbconfig/dbconfig"; // Your MySQL connection config
export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  try {
    // Create a connection to the database
    const connection = await pool.getConnection();

    try {
      // Fetch all users
      const [users]: any[] = await connection.query("SELECT * FROM User");

      // Fetch all user info
      const [userInfoList]: any[] = await connection.query(
        "SELECT * FROM UserInfo"
      );

      // Create a map of userInfo by userId for quick lookup
      const userInfoMap = userInfoList.reduce((map: any, userInfo: any) => {
        map[userInfo.userId] = userInfo;
        return map;
      }, {});

      // Combine user and userInfo data
      const usersWithInfo = users.map((user: any) => ({
        ...user,
        ...userInfoMap[user.id],
      }));

      return NextResponse.json({
        success: true,
        status: 200,
        data: usersWithInfo,
      });
    } catch (error: any) {
      console.error("Error fetching users:", error);
      return NextResponse.json({
        success: false,
        message: error.message,
        status: 500,
      });
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (error: any) {
    console.error("Error creating connection:", error);
    return NextResponse.json({
      success: false,
      message: error.message,
      status: 500,
    });
  }
};
