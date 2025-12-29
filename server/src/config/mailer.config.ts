import nodemailer, { Transporter } from "nodemailer";
import "dotenv/config";

const transporter: Transporter = nodemailer.createTransport({
  service: "Gmail",
  /*
  // or use the following for customization:
  host: "smtp.gmail.com",
  port: 587, // 465 → SSL/TLS direct (secure: true)
  secure: false, // true for 465, false for other ports
  tls: {
    rejectUnauthorized: false,
  },
  */
  auth: {
    user: process.env.GOOGLE_EMAIL_TARNSPORTER,
    pass: process.env.GOOGLE_EMAIL_TARNSPORTER_PASSWORD,
  },
});

export default transporter;
