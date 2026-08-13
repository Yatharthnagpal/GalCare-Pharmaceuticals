import { NextRequest, NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

/**
 * WordPress On-Demand ISR (Incremental Static Regeneration) Webhook Endpoint
 * 
 * When news, posts, or job listings are updated in WordPress (/wp-admin),
 * WordPress posts a request to: https://galcare.com/api/revalidate?secret=YOUR_SECRET&path=/news
 * 
 * Or sends a JSON payload:
 * {
 *   "secret": "YOUR_SECRET",
 *   "post_type": "post", // or "job"
 *   "path": "/news"
 * }
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get("secret")
  const path = searchParams.get("path")
  const tag = searchParams.get("tag")

  const expectedSecret = process.env.WORDPRESS_REVALIDATION_SECRET || "galcare-revalidate-secret-2026"

  if (secret !== expectedSecret) {
    return NextResponse.json({ message: "Invalid revalidation secret token" }, { status: 401 })
  }

  try {
    if (path) {
      revalidatePath(path)
      return NextResponse.json({ revalidated: true, path, now: Date.now() })
    }

    if (tag) {
      revalidateTag(tag, { expire: 0 })
      return NextResponse.json({ revalidated: true, tag, now: Date.now() })
    }

    // Default revalidations for WordPress content updates
    revalidatePath("/")
    revalidatePath("/news")
    revalidatePath("/careers")

    return NextResponse.json({
      revalidated: true,
      paths: ["/", "/news", "/careers"],
      now: Date.now(),
    })
  } catch (err: any) {
    return NextResponse.json({ message: "Error revalidating path", error: err.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const searchParams = request.nextUrl.searchParams
    
    const secret = body.secret || searchParams.get("secret")
    const expectedSecret = process.env.WORDPRESS_REVALIDATION_SECRET || "galcare-revalidate-secret-2026"

    if (secret !== expectedSecret) {
      return NextResponse.json({ message: "Invalid revalidation secret token" }, { status: 401 })
    }

    const postType = body.post_type || body.postType || "post"
    const targetPath = body.path || (postType === "job" ? "/careers" : "/news")

    revalidatePath(targetPath)
    revalidatePath("/")

    return NextResponse.json({
      revalidated: true,
      postType,
      targetPath,
      timestamp: new Date().toISOString(),
    })
  } catch (err: any) {
    return NextResponse.json({ message: "Error revalidating post webhook", error: err.message }, { status: 500 })
  }
}
