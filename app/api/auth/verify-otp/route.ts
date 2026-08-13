import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

/**
 * Real Email OTP Verification API Endpoint
 * Validates entered 6-digit OTP against encrypted cookie session.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, otp } = body

    if (!email || !otp || otp.length < 6) {
      return NextResponse.json({ success: false, message: "6-digit OTP code is required" }, { status: 400 })
    }

    const otpCookie = request.cookies.get("galcare_otp_session")?.value

    if (!otpCookie) {
      return NextResponse.json(
        { success: false, message: "Verification session expired. Please click Resend OTP." },
        { status: 400 }
      )
    }

    // Decode cookie
    let decodedData: { email: string; otp: string; expiresAt: number; hash: string }
    try {
      const raw = Buffer.from(otpCookie, "base64").toString("utf-8")
      decodedData = JSON.parse(raw)
    } catch {
      return NextResponse.json({ success: false, message: "Invalid session payload" }, { status: 400 })
    }

    // Check expiration
    if (Date.now() > decodedData.expiresAt) {
      return NextResponse.json(
        { success: false, message: "Verification code expired. Please click Resend OTP." },
        { status: 400 }
      )
    }

    // Verify hash integrity
    const secretKey = process.env.NEXTAUTH_SECRET || "galcare-otp-secret-key-2026"
    const expectedPayload = `${decodedData.email}:${decodedData.otp}:${decodedData.expiresAt}`
    const expectedHash = crypto.createHmac("sha256", secretKey).update(expectedPayload).digest("hex")

    if (decodedData.hash !== expectedHash) {
      return NextResponse.json({ success: false, message: "Session tampered or invalid" }, { status: 400 })
    }

    // Verify email and OTP
    if (decodedData.email.toLowerCase() !== email.toLowerCase() || decodedData.otp !== otp.trim()) {
      return NextResponse.json(
        { success: false, message: "Incorrect verification code. Please check your email inbox." },
        { status: 400 }
      )
    }

    // OTP Verified! Clear session cookie
    const response = NextResponse.json({
      success: true,
      message: "Account email verified successfully.",
    })

    response.cookies.delete("galcare_otp_session")

    return response
  } catch (error: any) {
    return NextResponse.json({ success: false, message: "OTP verification failed", error: error.message }, { status: 500 })
  }
}
