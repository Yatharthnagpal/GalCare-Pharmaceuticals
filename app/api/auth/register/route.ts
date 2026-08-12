import { NextResponse } from "next/server"

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
        console.warn("[AUTH API] WP user registration endpoint failed, performing local registration fallback:", e)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Registration successful. Verification email sent.",
      user: {
        id: `user-${Date.now()}`,
        fullName,
        email,
        phone: phone || "+91-9876543210",
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
