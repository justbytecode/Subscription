"use server"

import { z } from "zod"
import { Resend } from "resend"
import { EmailTemplate } from "../components/email-template"
import { prisma } from "../lib/prisma"

const schema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function joinWaitlist(prevState, formData) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const email = formData.get("email")

    if (!email) {
      return { success: false, message: "Email is required" }
    }

    const result = schema.safeParse({ email })

    if (!result.success) {
      return { success: false, message: result.error.errors[0].message }
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toString() },
    })

    if (existingUser) {
      return {
        success: false,
        message: "This email is already on our waitlist.",
      }
    }

    // Create new user in database
    await prisma.user.create({
      data: {
        email: email.toString(),
        role: "USER",
        notificationPreference: true,
      },
    })

    // Send welcome email using Resend
    const { data, error } = await resend.emails.send({
      from: "RecurX <contact@recurx.xyz>",
      to: email.toString(),
      subject: "Welcome to Our Waitlist!",
      html: EmailTemplate({ email: email.toString() }),
    })

    if (error) {
      console.error("Error sending email:", error)
      return { success: false, message: "Failed to join waitlist. Please try again." }
    }

    const count = await getWaitlistCount()

    return {
      success: true,
      message: "You have been added to the waitlist! Check your email for confirmation.",
      count,
    }
  } catch (error) {
    console.error("Error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function getWaitlistCount() {
  try {
    const count = await prisma.user.count()
    return count
  } catch (error) {
    console.error("Error getting waitlist count:", error)
    return 0
  }
}