"use server";
import { Resend } from "resend";

const resend = new Resend('re_L1XQeTsV_5B7A3Q1agz6KEraTgH5dt2rz');

export async function sendEmail({ from, to, subject, html }) {
  try {
    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message || "Failed to send email" };
  }
}