"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import { AdaptiveImage } from "@/components/ui/adaptive-image"
import { NEWS, NewsItem } from "@/lib/site-data"
import { fetchWPPosts } from "@/lib/wordpress"
import { 
  ArrowRight, 
  Mail, 
  FileText, 
  Newspaper, 
  X, 
  CheckCircle2,
  Calendar,
  User,
  Building2
} from "lucide-react"

export default function NewsroomPage() {
  const [articles, setArticles] = useState<NewsItem[]>(NEWS)
  const [pressModalOpen, setPressModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const res = await fetch("/api/news")
        if (res.ok) {
          const data = await res.json()
          if (data.articles && data.articles.length > 0) {
            setArticles(data.articles)
            return
          }
        }
      } catch (e) {
        console.warn("Failed to fetch news from API", e)
      }

      try {
        const wpPosts = await fetchWPPosts()
        if (wpPosts && wpPosts.length > 0) {
          const formatted: NewsItem[] = wpPosts.map((post) => ({
            id: `wp-${post.id}`,
            slug: post.slug,
            title: post.title.rendered,
            category: "Corporate Update",
            date: new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160) + "...",
            summary: post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160) + "...",
            readTime: "3 min read",
            image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/news/news-plant.png",
            content: post.content.rendered,
            author: "Galcare Corporate PR",
          }))
          setArticles([...formatted, ...NEWS])
          return
        }
      } catch (e) {
        console.warn("Failed to load WP posts in newsroom", e)
      }

      const saved = localStorage.getItem("galcare_custom_news")
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setArticles(parsed)
            return
          }
        } catch (e) {
          console.error("Failed to parse saved articles", e)
        }
      }
      setArticles(NEWS)
    }

    loadArticles()
    window.addEventListener("storage", loadArticles)
    return () => window.removeEventListener("storage", loadArticles)
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 bg-background">
        
        {/* Newsroom Hero Header */}
        <section className="relative overflow-hidden py-12 md:py-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6 text-center">
            <Reveal>
              <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                Official Media & Corporate Press
              </span>
              <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                Galcare <span className="text-gradient">Newsroom & Insights</span>
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-muted-foreground">
                Stay updated with official corporate announcements, clinical dermatological study releases, WHO-GMP manufacturing milestones, and executive insights.
              </p>
            </Reveal>

          </div>
        </section>

        {/* Featured Article Section */}
        {articles.length > 0 && (
          <section className="py-6">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <Reveal>
                <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-soft grid lg:grid-cols-12 gap-0 items-center">
                  <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:h-full w-full bg-muted min-h-[280px]">
                    <AdaptiveImage
                      src={articles[0].image || "/images/news/news-plant.png"}
                      alt={articles[0].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-semibold text-primary mb-3">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                          Featured Announcement
                        </span>
                        <span className="text-muted-foreground/40">•</span>
                        <span className="flex items-center gap-1 text-muted-foreground font-normal">
                          <Calendar className="size-3" /> {articles[0].date}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                        {articles[0].title}
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {articles[0].excerpt}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between">
                      <Link
                        href={`/news/${articles[0].id ? encodeURIComponent(articles[0].id) : 0}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                      >
                        Read Full Article <ArrowRight className="size-4" />
                      </Link>
                      <span className="text-xs text-muted-foreground font-medium">
                        {articles[0].authorRole || "Galcare Corporate PR"}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* News Grid Section */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Latest Articles & Releases</h2>
                <p className="text-xs text-muted-foreground mt-1">Corporate updates, clinical breakthroughs, and manufacturing news.</p>
              </div>
              <span className="text-xs font-semibold text-muted-foreground bg-muted/60 px-3 py-1 rounded-full border border-border">
                {articles.length} Published Articles
              </span>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((item, idx) => (
                <Reveal key={item.id || idx} delay={idx * 0.05}>
                  <article className="group h-full flex flex-col justify-between rounded-3xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-primary/40">
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                        <AdaptiveImage
                          src={item.image || "/images/news/news-plant.png"}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-primary border border-border/50">
                          {item.category || "Press Release"}
                        </span>
                      </div>

                      {/* Content Body */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2">
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <User className="size-3" /> {item.author || "Galcare PR"}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-muted-foreground font-normal shrink-0">
                            <Calendar className="size-3" /> {item.date}
                          </span>
                        </div>

                        {/* Article Title */}
                        <h3 className="text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="mt-3 text-xs md:text-sm leading-relaxed text-muted-foreground line-clamp-3">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer Link */}
                    <div className="px-6 pb-6 pt-0">
                      <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                        <Link
                          href={`/news/${item.id ? encodeURIComponent(item.id) : idx}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:underline"
                        >
                          Read Full Article <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <span className="text-[11px] font-medium text-muted-foreground/70">
                          {item.authorRole || "Galcare Media"}
                        </span>
                      </div>
                    </div>

                  </article>
                </Reveal>
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* Press Kit Modal */}
      {pressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 md:p-8 shadow-glow">
            <button
              onClick={() => setPressModalOpen(false)}
              className="absolute right-4 top-4 p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent"
            >
              <X className="size-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <FileText className="size-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Official Galcare Press Kit</h3>
                <p className="text-xs text-muted-foreground">Download brand guidelines, logos & high-res facility photos.</p>
              </div>
            </div>

            <div className="space-y-3 my-6">
              <div className="p-3.5 rounded-2xl border border-border bg-background flex items-center justify-between text-xs">
                <span className="font-semibold">Brand Identity & Logo Specs (EPS, PNG, SVG)</span>
                <span className="text-muted-foreground">12.4 MB</span>
              </div>
              <div className="p-3.5 rounded-2xl border border-border bg-background flex items-center justify-between text-xs">
                <span className="font-semibold">WHO-GMP Facility Photo Gallery (High-Res)</span>
                <span className="text-muted-foreground">45.8 MB</span>
              </div>
              <div className="p-3.5 rounded-2xl border border-border bg-background flex items-center justify-between text-xs">
                <span className="font-semibold">Executive Leadership Bios & Fact Sheet</span>
                <span className="text-muted-foreground">2.1 MB</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert("Downloading Galcare Official Press Kit Package (ZIP)...")
                setPressModalOpen(false)
              }}
              className="w-full py-3.5 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider rounded-2xl shadow-glow hover:bg-primary/95 transition-all"
            >
              Download Full Media Kit (ZIP)
            </button>
          </div>
        </div>
      )}

      <Footer />
      <AIAssistant />
    </>
  )
}
