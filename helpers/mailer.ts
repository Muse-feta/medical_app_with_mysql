import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import pool from "@/dbconfig/dbconfig";
export const dynamic = "force-dynamic";


export const mailer = async ({ email, emailType, userId }: any) => {
  try {
    console.log("mailer", email, emailType, userId);

    // Check for the JWT secret
    const secret = process.env.SECRET;
    if (!secret) {
      throw new Error("JWT secret is not defined");
    }

    // Create JWT token
    const data = { id: userId, email: email };
    const hashedId = jwt.sign(data, secret);

    // Update the user token in the MySQL database
    if (emailType === "VERIFY") {
      try {
        await pool.query(
          "UPDATE User SET verifyToken = ?, verifyTokenExpiry = ? WHERE id = ?",
          [hashedId, new Date(Date.now() + 1000 * 60 * 60 * 24), userId]
        );
      } catch (error) {
        console.log("Error updating user verification token", error);
      }
    } else if (emailType === "RESET") {
      try {
        await pool.query(
          "UPDATE User SET forgotPasswordToken = ?, forgotPasswordTokenExpiry = ? WHERE id = ?",
          [hashedId, new Date(Date.now() + 1000 * 60 * 60 * 24), userId]
        );
      } catch (error) {
        console.log("Error updating user reset token", error);
      }
    }

    // Configure Nodemailer to send the email
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fetamuse@gmail.com",
        pass: "nhkc meca hwio dgyk",
      },
    });

    const baseUrl = process.env.BASE_URL;

    var mailOptions = {
      from: "Ethio Medical App",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
      html:
        emailType === "VERIFY"
          ? `<a href="${baseUrl}/verify?token=${hashedId}">Verify Email</a>`
          : `<a href="${baseUrl}/reset-password?token=${hashedId}">Reset Password</a>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error: any) {
    console.log("Error occurred while sending email", error.message);
  }
};
