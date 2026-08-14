import { NextResponse } from "next/server"
import { fetchWPPostBySlug, updateWPPost, deleteWPPost } from "@/lib/wordpress"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const post = await fetchWPPostBySlug(id)

    if (post) {
      const acf = (post as any).acf || {}
      return NextResponse.json({
        success: true,
        article: {
          id: `wp-${post.id}`,
          slug: post.slug,
          title: post.title.rendered,
          category: acf.news_category || "Corporate News",
          date: new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160) + "...",
          summary: post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160) + "...",
          readTime: acf.read_time || "3 min read",
          image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/news/news-plant.png",
          content: post.content.rendered,
          author: acf.author_name || "Galcare Corporate PR",
        },
      })
    }

    return NextResponse.json({ success: false, message: "Article not found" }, { status: 444 })
  } catch (error) {
    const { id } = await params
    console.error(`Error fetching news article ${id}:`, error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const result = await updateWPPost(id, body)

    return NextResponse.json({
      success: true,
      message: result.success ? "Article updated in WordPress CMS." : "Article updated locally.",
    })
  } catch (error) {
    const { id } = await params
    console.error(`Error updating news article ${id}:`, error)
    return NextResponse.json(
      { error: "Internal server error updating article." },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await deleteWPPost(id)

    return NextResponse.json({
      success: true,
      message: result.success ? "Article deleted from WordPress CMS." : "Article removed locally.",
    })
  } catch (error) {
    const { id } = await params
    console.error(`Error deleting news article ${id}:`, error)
    return NextResponse.json(
      { error: "Internal server error deleting article." },
      { status: 500 }
    )
  }
}
