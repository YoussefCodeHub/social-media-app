import transporter from "../config/mailer.config";
import "dotenv/config";
import type { SentMessageInfo } from "nodemailer";

const sendEmail = async (
  to: string,
  subject: string,
  html?: string,
  text?: string
): Promise<SentMessageInfo> => {
  const info = await transporter.sendMail({
    from: '"Social-media App" <youssef.dev@gmail.com>',
    to,
    subject,
    text,
    html,
  });

  return info;
};

export default sendEmail;
