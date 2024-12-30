"use server";
import { getFromEmail, getToEmail } from "@/lib/utils";
import { Resend } from "resend";

type SendEmailParams = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export async function sendEmail({ to, subject, text, html }: SendEmailParams) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromEmail = getFromEmail() as string;
  const toEmail = getToEmail(to);

  await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    subject,
    text,
    html,
  });
}
