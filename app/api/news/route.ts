import { NextResponse } from "next/server"
import { fetchWPPosts, createWPPost } from "@/lib/wordpress"
import { NEWS } from "@/lib/site-data"

export async function GET() {
  try {
    const wpPosts = await fetchWPPosts(1, 20)
    if (wpPosts && wpPosts.length > 0) {
      const formatted = wpPosts.map((post) => ({
        id: `wp-${post.id}`,
        slug: post.slug,
        title: post.title.rendered,
        category: "Corporate News",
        date: new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160) + "...",
        summary: post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160) + "...",
        readTime: "3 min read",
        image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/news/news-plant.png",
        content: post.content.rendered,
        author: "Galcare Corporate PR",
      }))
      return NextResponse.json({ success: true, articles: formatted })
    }
    return NextResponse.json({ success: true, articles: NEWS })
  } catch (error) {
    console.error("Error fetching news articles:", error)
    return NextResponse.json({ success: true, articles: NEWS })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, content, excerpt } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: "Article title and content are required fields." },
        { status: 400 }
      )
    }

    const result = await createWPPost({
      title,
      content,
      excerpt: excerpt || content.slice(0, 160),
    })

    return NextResponse.json({
      success: true,
      id: result.id || `news-${Date.now()}`,
      message: "Article published successfully in WordPress CMS.",
    })
  } catch (error) {
    console.error("Error creating news article:", error)
    return NextResponse.json(
      { error: "Internal server error creating news article." },
      { status: 500 }
    )
  }
}
