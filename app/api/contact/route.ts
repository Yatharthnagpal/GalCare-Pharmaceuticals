import { NextResponse } from "next/server"
import { submitWPFormEntry } from "@/lib/wordpress"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message, subject } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      )
    }

    // Submit to WordPress Headless API or Fallback
    const result = await submitWPFormEntry("contact", {
      name,
      email,
      phone,
      company,
      subject: subject || "Website Contact Form Submission",
      message,
    })

    return NextResponse.json({
      success: true,
      id: result.id,
      message: result.message,
      submittedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error handling contact submission:", error)
    return NextResponse.json(
      { error: "Internal server error handling contact submission." },
      { status: 500 }
    )
  }
}
