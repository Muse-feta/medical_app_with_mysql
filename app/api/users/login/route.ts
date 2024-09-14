import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "@/dbconfig/dbconfig";


export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    // check if user exists
    const [userRows]: any[] = await pool.query(
      "SELECT * FROM User WHERE email = ?",
      [email]
    );

    if (userRows.length === 0) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "User does not exist",
      });
    }

    const user = userRows[0];

    // Get user info from userInfo table
    const [userInfoRows]: any[] = await pool.query(
      "SELECT * FROM UserInfo WHERE userId = ?",
      [user.id]
    );

    if (userInfoRows.length === 0) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "User info not found",
      });
    }

    const userInfo = userInfoRows[0];
    const storedPassword = userInfo.password;

    if (!storedPassword) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Invalid password",
      });
    }

    // check if password is correct
    const isPasswordCorrect = await bcryptjs.compare(password, storedPassword);

    if (!isPasswordCorrect) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Incorrect password",
      });
    }

    // check if the user account is verified
    if (!user.isVerified) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Please verify your account first",
      });
    }

    // create jwt token data
    const tokenData = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: userInfo.role,
    };

    // sign jwt token
    const token = jwt.sign(tokenData, process.env.SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      success: true,
      status: 200,
      message: "Login successful",
      token: token,
    });

    // set httpOnly cookie with token
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      success: false,
      status: 500,
      error: {
        message: error.message || "Something went wrong",
        stack: error.stack || "No stack trace available",
        name: error.name || "UnknownError",
      },
    });
  }
};
