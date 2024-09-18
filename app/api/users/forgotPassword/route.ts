import { NextRequest, NextResponse } from "next/server";
import { mailer } from "@/helpers/mailer";
import pool from "@/dbconfig/dbconfig";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email } = body;

    // Find the user by email
    const [userRows]: any[] = await pool.query(
      "SELECT * FROM User WHERE email = ?",
      [email]
    );

    // if user does not exist
    if (userRows.length === 0) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }

    const user = userRows[0];

    // You can add your logic for resetting the password token here if required
    // Example commented-out code for resetting token
    // await pool.query(
    //   "UPDATE users SET forgotPasswordToken = ?, forgotPasswordTokenExpiry = ? WHERE id = ?",
    //   [null, null, user.id]
    // );

    // if user exists, send reset password email
    await mailer({ email: email, emailType: "RESET", userId: user.id });

    return NextResponse.json({ message: "Email sent", status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
