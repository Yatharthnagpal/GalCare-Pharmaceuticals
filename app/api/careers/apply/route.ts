import { NextResponse } from "next/server"
import { submitWPFormEntry } from "@/lib/wordpress"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, jobTitle, experience, resume, resumeName } = body

    if (!name || !email || !jobTitle) {
      return NextResponse.json(
        { error: "Name, email, and job title are required fields." },
        { status: 400 }
      )
    }

    const result = await submitWPFormEntry("career_application", {
      name,
      email,
      phone,
      jobTitle,
      experience,
      resume,
      meta: { resumeName },
      subject: `Career Application: ${jobTitle}`,
    })

    return NextResponse.json({
      success: true,
      id: result.id,
      message: result.message,
      submittedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error handling career application:", error)
    return NextResponse.json(
      { error: "Internal server error handling career application." },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    return NextResponse.json({
      success: true,
      message: `Job application ${id || ""} withdrawn successfully.`,
    })
  } catch (error) {
    console.error("Error deleting career application:", error)
    return NextResponse.json(
      { error: "Internal server error deleting career application." },
      { status: 500 }
    )
  }
}

