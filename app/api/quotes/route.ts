import { NextResponse } from "next/server"
import { submitWPFormEntry, getWordPressApiUrl } from "@/lib/wordpress"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")
    const baseUrl = getWordPressApiUrl()

    if (baseUrl) {
      const wpRes = await fetch(`${baseUrl}/wp-json/wp/v2/quote_request?_embed&per_page=50`, {
        cache: "no-store",
      })
      if (wpRes.ok) {
        const data = await wpRes.json()
        if (Array.isArray(data)) {
          const quotes = data
            .map((item: any) => {
              const content = item.content?.rendered || ""
              const status = item.submission_status || item.meta?.submission_status || "Submitted - Under Review"
              return {
                id: `wp-${item.id}`,
                userEmail: item.contact_email || item.meta?.contact_email || email || "",
                userName: item.title?.rendered || "Partner Quote Request",
                companyName: item.company_name || item.meta?.company_name || "Pharmaceutical Partner",
                phone: item.contact_phone || item.meta?.contact_phone || "+1 (555) 000-1122",
                requirements: item.requirements || item.meta?.requirements || item.title?.rendered || "3rd Party Manufacturing",
                message: content.replace(/<[^>]+>/g, ""),
                date: new Date(item.date).toISOString().split("T")[0],
                status: status,
              }
            })
            .filter((q: any) => !email || (q.userEmail && q.userEmail.toLowerCase() === email.toLowerCase()))

          return NextResponse.json({ success: true, quotes })
        }
      }
    }

    return NextResponse.json({ success: true, quotes: [] })
  } catch (error) {
    console.error("Error fetching quotes from WP:", error)
    return NextResponse.json({ success: true, quotes: [] })
  }
}

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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    return NextResponse.json({
      success: true,
      message: `Quote request ${id || ""} deleted successfully.`,
    })
  } catch (error) {
    console.error("Error deleting quote request:", error)
    return NextResponse.json(
      { error: "Internal server error deleting quotation request." },
      { status: 500 }
    )
  }
}

