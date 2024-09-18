import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { mailer } from "@/helpers/mailer";
import pool from "@/dbconfig/dbconfig"; // Your MySQL connection config

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { firstname, lastname, email, password, phone } = body;

    const connection = await pool.getConnection();
    try {
      // Check if user already exists
      const [existingUser]: any[] = await connection.query(
        "SELECT * FROM User WHERE email = ?",
        [email]
      );

      if (existingUser.length > 0) {
        return NextResponse.json({
          success: false,
          status: 400,
          message: "User already exists",
        });
      }

      // Hash the password
      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(password, salt);

      // Start a transaction to create user and userInfo
      await connection.beginTransaction();

      // Insert into the user table
      const [userResult]: any[] = await connection.query(
        "INSERT INTO User (firstname, lastname, email) VALUES (?, ?, ?)",
        [firstname, lastname, email]
      );

      const userId = userResult.insertId;

      // Insert into the userInfo table
      await connection.query(
        "INSERT INTO UserInfo (userId, password, phone) VALUES (?, ?, ?)",
        [userId, hashedPassword, phone]
      );

      // Commit the transaction
      await connection.commit();

      // Send verification email
      await mailer({ email: email, emailType: "VERIFY", userId: userId });

      return NextResponse.json({
        success: true,
        status: 201,
        message: "User created successfully",
        data: {
          userId,
        },
      });
    } catch (transactionError) {
      await connection.rollback(); // Rollback transaction in case of an error
      throw transactionError;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  } catch (error: any) {
    console.log("Error occurring in server:", error.message);
    return NextResponse.json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};
