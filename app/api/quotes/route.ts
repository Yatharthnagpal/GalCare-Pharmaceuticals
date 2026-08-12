import { NextResponse } from "next/server"
import { submitWPFormEntry } from "@/lib/wordpress"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, requirements, message } = body

    if (!name || !email || !company) {
      return NextResponse.json(
        { error: "Name, email, and company name are required fields." },
        { status: 400 }
      )
    }

    const result = await submitWPFormEntry("quote_request", {
      name,
      email,
      phone,
      company,
      requirements,
      message,
      subject: `3rd Party Manufacturing Quotation Request: ${company}`,
    })

    return NextResponse.json({
      success: true,
      id: result.id,
      message: result.message,
      submittedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error handling quote request:", error)
    return NextResponse.json(
      { error: "Internal server error handling quotation request." },
      { status: 500 }
    )
  }
}
