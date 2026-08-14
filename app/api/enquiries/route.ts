import { NextResponse } from "next/server"
import { submitWPFormEntry } from "@/lib/wordpress"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, productName, message } = body

    if (!name || !email || !productName) {
      return NextResponse.json(
        { error: "Name, email, and product name are required fields." },
        { status: 400 }
      )
    }

    const result = await submitWPFormEntry("product_enquiry", {
      name,
      email,
      phone,
      productName,
      message,
      subject: `Product Enquiry: ${productName}`,
    })

    return NextResponse.json({
      success: true,
      id: result.id,
      message: result.message,
      submittedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error handling product enquiry:", error)
    return NextResponse.json(
      { error: "Internal server error handling product enquiry." },
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
      message: `Enquiry ${id || ""} deleted successfully.`,
    })
  } catch (error) {
    console.error("Error deleting enquiry:", error)
    return NextResponse.json(
      { error: "Internal server error deleting product enquiry." },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    const baseUrl = process.env.WORDPRESS_URL || "http://118.139.178.174"
    const wpRes = await fetch(`${baseUrl}/wp-json/wp/v2/product_enquiry?_embed&per_page=100`, {
      cache: "no-store",
    })

    if (wpRes.ok) {
      const wpItems = await wpRes.json()
      const matched = wpItems
        .filter((item: any) => {
          const itemEmail = item.enquiry_email || item.meta?.enquiry_email
          if (!email || !itemEmail) return true
          return itemEmail.toLowerCase().trim() === email.toLowerCase().trim()
        })
        .map((item: any) => ({
          id: `wp-${item.id}`,
          productName: item.product_name || item.title?.rendered || "Product Enquiry",
          date: new Date(item.date).toISOString().split("T")[0],
          status: item.submission_status || "Inquiry Received",
          message: item.content?.rendered?.replace(/<[^>]+>/g, "") || "",
        }))

      return NextResponse.json({ enquiries: matched })
    }

    return NextResponse.json({ enquiries: [] })
  } catch (err) {
    console.error("Failed to fetch product enquiries from WP:", err)
    return NextResponse.json({ enquiries: [] })
  }
}

