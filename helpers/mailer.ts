import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import pool from "@/dbconfig/dbconfig";

export const dynamic = "force-dynamic";

export const mailer = async ({ email, emailType, userId }: any) => {
  try {
    console.log("Mailer invoked with:", { email, emailType, userId });

    // Check for the JWT secret
    const secret = process.env.SECRET;
    if (!secret) {
      throw new Error("JWT secret is not defined");
    }

    // Create JWT token
    const data = { id: userId, email: email };
    const hashedId = jwt.sign(data, secret);

    // Update the user token in the MySQL database
    const expiryDate = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day
    if (emailType === "VERIFY") {
      await pool.query(
        "UPDATE User SET verifyToken = ?, verifyTokenExpiry = ? WHERE id = ?",
        [hashedId, expiryDate, userId]
      );
    } else if (emailType === "RESET") {
      await pool.query(
        "UPDATE User SET forgotPasswordToken = ?, forgotPasswordTokenExpiry = ? WHERE id = ?",
        [hashedId, expiryDate, userId]
      );
    }

    // Configure Nodemailer to send the email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Use environment variable
        pass: process.env.EMAIL_PASS, // Use environment variable
      },
    });

    const baseUrl = process.env.BASE_URL;

    const mailOptions = {
      from: "Ethio Medical App <fetamuse@gmail.com>",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
      html:
        emailType === "VERIFY"
          ? `<a href="${baseUrl}/verify?token=${hashedId}">Verify Email</a>`
          : `<a href="${baseUrl}/reset-password?token=${hashedId}">Reset Password</a>`,
    };

    // Send the email
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          reject(error);
        } else {
          console.log("Email sent:", info.response);
          resolve(info);
        }
      });
    });
  } catch (error: any) {
    console.error("Error occurred while sending email:", error.message);
  }
};
