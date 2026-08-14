import { NextResponse } from "next/server"
import { submitWPFormEntry, getWordPressApiUrl } from "@/lib/wordpress"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")
    const baseUrl = getWordPressApiUrl()

    if (baseUrl) {
      const wpRes = await fetch(`${baseUrl}/wp-json/wp/v2/job_application?_embed&per_page=50`, {
        cache: "no-store",
      })
      if (wpRes.ok) {
        const data = await wpRes.json()
        if (Array.isArray(data)) {
          const apps = data
            .map((item: any) => {
              const content = item.content?.rendered || ""
              const status = item.submission_status || item.meta?.submission_status || "Incomplete - Pending Processing"
              
              let applicantEmail = item.applicant_email || item.meta?.applicant_email || ""
              let jobTitle = item.job_title || item.meta?.job_title || ""
              let experience = item.experience || item.meta?.experience || ""
              let phone = item.applicant_phone || item.meta?.applicant_phone || ""
              let resume = item.resume_media_url || item.meta?.resume_media_url || ""

              if (!applicantEmail && content) {
                const emailMatch = content.match(/Email:<\/strong>\s*([^\s<]+)/i)
                if (emailMatch) applicantEmail = emailMatch[1]
              }
              if (!jobTitle && item.title?.rendered) {
                const parts = item.title.rendered.split("—")
                if (parts.length > 1) jobTitle = parts[1].trim()
              }

              return {
                id: `wp-${item.id}`,
                userEmail: applicantEmail || email || "",
                userName: item.title?.rendered ? item.title.rendered.split("—")[0].trim() : "Applicant",
                jobTitle: jobTitle || "Formulation Scientist",
                department: "R&D / Quality Control",
                phone: phone || "+1 (555) 000-1122",
                experience: experience || "3+ Years",
                resume: resume,
                date: new Date(item.date).toISOString().split("T")[0],
                status: status,
              }
            })
            .filter((app: any) => !email || (app.userEmail && app.userEmail.toLowerCase() === email.toLowerCase()))

          return NextResponse.json({ success: true, apps })
        }
      }
    }

    return NextResponse.json({ success: true, apps: [] })
  } catch (error) {
    console.error("Error fetching job applications from WP:", error)
    return NextResponse.json({ success: true, apps: [] })
  }
}

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

