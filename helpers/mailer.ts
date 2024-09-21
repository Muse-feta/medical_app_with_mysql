
import jwt from "jsonwebtoken";
var nodemailer = require("nodemailer");
import pool from "@/dbconfig/dbconfig"; // Assuming pool is your MySQL connection pool
export const dynamic = "force-dynamic";

export const mailer = async ({ email, emailType, userId }: any) => {
  try {
    console.log("mailer", email, emailType, userId);

    // JWT secret key
    const secret = process.env.SECRET;
    if (!secret) {
      throw new Error("JWT secret is not defined");
    }
    const data = {
      id: userId,
      email: email,
    };
    const hashedId = jwt.sign(data, secret);

    // Updating user verification token or forgot password token
    let updateQuery: string;
    let updateValues: any[];

    if (emailType === "VERIFY") {
      updateQuery = `
        UPDATE User
        SET verifyToken = ?, verifyTokenExpiry = ?
        WHERE id = ?
      `;
      updateValues = [
        hashedId,
        new Date(Date.now() + 1000 * 60 * 60 * 24),
        userId,
      ];
    } else if (emailType === "RESET") {
      updateQuery = `
        UPDATE User
        SET forgotPasswordToken = ?, forgotPasswordTokenExpiry = ?
        WHERE id = ?
      `;
      updateValues = [
        hashedId,
        new Date(Date.now() + 1000 * 60 * 60 * 24),
        userId,
      ];
    } else {
      throw new Error("Invalid email type");
    }

    try {
      await pool.query(updateQuery, updateValues);
    } catch (error) {
      console.log("Error updating user verification token", error);
    }

    // Sending email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fetamuse@gmail.com",
        pass: "nhkc meca hwio dgyk",
      },
    });

    const baseUrl = process.env.BASE_URL;

    const mailOptions = {
      from: "Ethio Medical App",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
      html:
        emailType === "VERIFY"
          ? `<a href="${baseUrl}/verify?token=${hashedId}">Verify Email</a>`
          : `<a href="${baseUrl}/reset-password?token=${hashedId}">Reset Password</a>`,
    };

    console.log("mailOptions", mailOptions);

    transporter.sendMail(mailOptions, (error: any, info: any) => {
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
