import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email) {
      return NextResponse.json(
        { error: "Email or phone number is required." },
        { status: 400 }
      )
    }

    // Attempt authentication via WordPress JWT API if configured
    const wpUrl = (process.env.WORDPRESS_API_URL || "").replace(/\/+$/, "")
    if (wpUrl && password) {
      try {
        const wpRes = await fetch(`${wpUrl}/wp-json/jwt-auth/v1/token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: email, password }),
        })

        if (wpRes.ok) {
          const wpData = await wpRes.json()
          return NextResponse.json({
            success: true,
            token: wpData.token,
            user: {
              id: wpData.user_id || `user-${Date.now()}`,
              fullName: wpData.user_display_name || email.split("@")[0],
              email: wpData.user_email || email,
              phone: "+91-9876543210",
              company: "Client Partner",
            },
          })
        }
      } catch (e) {
        console.warn("[AUTH API] WP Auth token fetch failed, performing local auth fallback:", e)
      }
    }

    // Clean session user payload
    const nameFromEmail = email.includes("@") ? email.split("@")[0].replace(/[._-]/g, " ") : "Client Partner"
    const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)

    return NextResponse.json({
      success: true,
      user: {
        id: `user-${Date.now()}`,
        fullName: capitalizedName,
        email: email.includes("@") ? email : `${email}@galcare.com`,
        phone: "+91-9876543210",
        company: "Galcare Client Partner",
        status: "Converted",
        createdAt: new Date().toISOString().split("T")[0],
      },
    })
  } catch (error) {
    console.error("Error in login route:", error)
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    )
  }
}
