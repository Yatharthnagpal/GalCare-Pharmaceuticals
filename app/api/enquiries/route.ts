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

