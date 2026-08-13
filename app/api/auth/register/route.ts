import { NextResponse } from "next/server"
import { submitWPFormEntry } from "@/lib/wordpress"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, phone, password, company } = body

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full Name and Email address are required for registration." },
        { status: 400 }
      )
    }

    // Submit user registration entry to WordPress
    const wpResult = await submitWPFormEntry("user_registration", {
      name: fullName,
      email,
      phone,
      company,
      subject: `New Registered User: ${fullName} (${company || "Individual"})`,
    })

    // Attempt user creation in WordPress if configured
    const wpUrl = (process.env.WORDPRESS_API_URL || "").replace(/\/+$/, "")
    if (wpUrl && password) {
      try {
        await fetch(`${wpUrl}/wp-json/wp/v2/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(process.env.WORDPRESS_JWT_AUTH_SECRET && {
              Authorization: `Bearer ${process.env.WORDPRESS_JWT_AUTH_SECRET}`,
            }),
          },
          body: JSON.stringify({
            username: email,
            email: email,
            name: fullName,
            password: password,
          }),
        })
      } catch (e) {
        console.warn("[AUTH API] WP user creation endpoint failed:", e)
      }
    }

    return NextResponse.json({
      success: true,
      id: wpResult.id,
      message: "Registration successful and synced with WordPress.",
      user: {
        id: `user-${Date.now()}`,
        fullName,
        email,
        phone: phone || "",
        company: company || "Independent Partner",
        status: "New (Uncontacted)",
        createdAt: new Date().toISOString().split("T")[0],
      },
    })
  } catch (error) {
    console.error("Error in registration route:", error)
    return NextResponse.json(
      { error: "Internal server error during user registration." },
      { status: 500 }
    )
  }
}
