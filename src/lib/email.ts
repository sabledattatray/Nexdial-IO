import nodemailer from "nodemailer";

// Initialize Nodemailer transporter if SMTP settings exist
const transporter = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

export async function sendVerificationEmail(email: string, otp: string) {
  // If no SMTP host is provided, we fall back to logging it in the console (Mock Mode)
  if (!transporter) {
    console.log(`\n\n[MOCK EMAIL SERVER] Verification OTP for ${email}: ${otp}\n\n`);
    return { success: true, mock: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"NexDial" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your NexDial Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaec; border-radius: 10px; background-color: #ffffff;">
          <h2 style="color: #0F172A; text-align: center; font-size: 24px; margin-bottom: 20px;">Welcome to NexDial!</h2>
          <p style="color: #475569; font-size: 16px; line-height: 1.5; text-align: center;">
            Thank you for signing up. To complete your registration and verify your email address, please use the following 6-digit code:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #0057D9; background-color: #F1F5F9; padding: 15px 30px; border-radius: 8px;">
              ${otp}
            </span>
          </div>
          <p style="color: #64748B; font-size: 14px; text-align: center; margin-top: 30px;">
            This code will expire in 15 minutes. If you did not request this, please ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #eaeaec; margin: 30px 0;" />
          <p style="color: #94A3B8; font-size: 12px; text-align: center;">
            &copy; ${new Date().getFullYear()} NexDial. All rights reserved.
          </p>
        </div>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, data: info };
  } catch (error) {
    console.error("Failed to send email via Nodemailer:", error);
    return { success: false, error };
  }
}
