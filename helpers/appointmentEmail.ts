import { format } from "date-fns";
import nodemailer from "nodemailer"; // Use ES module import syntax

export const appointmentEmail = async (email: string, name: string, date: string) => {
  try {
    // Convert and format the date
    const dateObj = new Date(date);
    const formattedDate = format(dateObj, "M/dd/yyyy, h:mm:ss a");

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Make sure to secure this credential in your environment variables
      },
    });

    // Define the email options
    const mailOptions = {
      from: "Ethio Medical App",
      to: email,
      subject: "Appointment Booking",
      html: `
        <div>
          <h1>Appointment Confirmation</h1>
          <p>Dear ${name},</p>
          <p>Your appointment has been successfully booked.</p>
          <p><strong>Date and Time:</strong> ${formattedDate}</p>
          <p>Thank you for choosing Ethio Medical App.</p>
          <p>Best regards,<br/>Ethio Medical App Team</p>
        </div>
      `,
    };

    // Send the email using async/await and wrap it in a promise
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    return {
      success: true,
      message: "Email sent successfully",
    };

  } catch (error: any) {
    console.error("Error sending appointment email:", error);

    return {
      success: false,
      message: "Failed to send email",
      error: error.message,
    };
  }
};
