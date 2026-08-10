"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import { AdaptiveImage } from "@/components/ui/adaptive-image"
import { NEWS, NewsItem } from "@/lib/site-data"
import { Calendar, ArrowLeft, Share2, Printer, ChevronRight, User, Building2, Quote } from "lucide-react"

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [articles, setArticles] = useState<NewsItem[]>(NEWS)

  useEffect(() => {
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
  }, [])

  const idStr = Array.isArray(params.id) ? params.id[0] : params.id
  const articleIndex = parseInt(idStr || "0", 10)
  const currentArticle = articles[articleIndex] || articles[0]

  // Related articles excluding current
  const relatedArticles = articles.filter((_, idx) => idx !== articleIndex).slice(0, 2)

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 bg-background">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 my-6 pb-4 border-b border-border/50">
            <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="size-3" />
              <Link href="/news" className="hover:text-primary transition-colors">Newsroom</Link>
              <ChevronRight className="size-3" />
              <span className="text-foreground truncate max-w-[200px] sm:max-w-xs">{currentArticle.title}</span>
            </nav>

            <button
              onClick={() => router.push("/news")}
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" /> Back to Newsroom
            </button>
          </div>

          {/* Article Main Container */}
          <article className="rounded-3xl border border-border bg-card p-6 md:p-12 shadow-soft">
            <Reveal>
              {/* Category & Date Header */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-primary mb-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3.5 py-1 text-primary">
                  <Building2 className="size-3" /> {currentArticle.category || "Corporate News"}
                </span>
                <span className="text-muted-foreground/30">•</span>
                <span className="flex items-center gap-1 text-muted-foreground font-medium">
                  <Calendar className="size-3" /> {currentArticle.date}
                </span>
              </div>

              {/* Headline Title */}
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl leading-tight text-foreground">
                {currentArticle.title}
              </h1>

              {/* Author & Meta Row */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-border/60 py-4 my-8">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                    <User className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Reported By</p>
                    <p className="text-sm font-bold text-foreground">{currentArticle.author}</p>
                    <p className="text-[11px] text-muted-foreground">{currentArticle.authorRole || "Galcare Communications"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: currentArticle.title, url: window.location.href })
                      } else {
                        navigator.clipboard.writeText(window.location.href)
                        alert("Article link copied to clipboard!")
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-background text-xs font-semibold text-foreground hover:bg-accent transition-colors"
                  >
                    <Share2 className="size-3.5" /> Share
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-background text-xs font-semibold text-foreground hover:bg-accent transition-colors"
                  >
                    <Printer className="size-3.5" /> Print
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Editorial Article Body with Floating Image & Text Wrapping */}
            <div className="mt-6 text-foreground">
              <Reveal>
                {/* Floating Image with Text Wrap */}
                {currentArticle.image && (
                  <div className="relative w-full md:w-5/12 md:float-right md:ml-8 mb-6 rounded-2xl overflow-hidden border border-border shadow-soft bg-muted">
                    <div className="aspect-[4/3] relative w-full">
                      <AdaptiveImage
                        src={currentArticle.image}
                        alt={currentArticle.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3 bg-muted/40 border-t border-border/50 text-[11px] text-muted-foreground font-medium italic text-center">
                      Official Galcare Media • {currentArticle.title}
                    </div>
                  </div>
                )}

                {/* Article Paragraphs wrapping around image */}
                <div className="prose dark:prose-invert max-w-none text-base md:text-lg leading-relaxed text-muted-foreground space-y-6">
                  <p className="font-semibold text-foreground text-lg md:text-xl leading-relaxed">
                    {currentArticle.excerpt}
                  </p>

                  <p>
                    Established in 2008 in Jaipur, Rajasthan, Galcare Pharmaceuticals has grown from a visionary dermatology initiative into a premier prescription-oriented healthcare organization. Governed by Founder Devkant Bhardwaj’s core corporate dictum—<strong className="text-foreground">"Excellence through People and Innovation"</strong>—the company maintains absolute commitment to scientific precision, regulatory DCGI compliance, and bioequivalent Active Pharmaceutical Ingredient (API) quality.
                  </p>

                  {/* Blockquote Callout */}
                  <div className="my-8 p-6 rounded-2xl bg-emerald-500/10 border-l-4 border-emerald-600 text-foreground not-prose">
                    <div className="flex gap-3">
                      <Quote className="size-6 text-emerald-600 shrink-0 mt-1" />
                      <div>
                        <p className="text-base md:text-lg font-bold italic leading-relaxed text-foreground">
                          "We never lose sight of the human element—the people who create our therapeutic formulations and the patients across India who rely on them every day."
                        </p>
                        <p className="text-xs font-bold text-primary mt-2 uppercase tracking-wider">
                          — Devkant Bhardwaj, Founder of Galcare Pharmaceuticals
                        </p>
                      </div>
                    </div>
                  </div>

                  <p>
                    Through continuous investments in our WHO-GMP certified manufacturing facilities at Manglam Industrial Park, Jaipur, Galcare ensures that every topical cream, gel, ointment, and solid oral dosage form meets global safety and stability standards. Today, over 30,000 dermatologists, medical specialists, and healthcare practitioners across 26 Indian states trust Galcare formulations to treat dermatological conditions ranging from melasma, vitiligo, and acne care to severe inflammatory skin disorders.
                  </p>

                  <p>
                    Furthermore, Galcare’s third-party contract manufacturing wing offers comprehensive formulation development, analytical testing, CTD documentation, and customized primary packaging for domestic and international brand partners. With a dedicated team of over 500 associates and a strong focus on internal promotion and employee growth, Galcare continues to shape the future of clinical skincare therapeutics.
                  </p>
                </div>

                <div className="clear-both" />
              </Reveal>
            </div>

            {/* Related Articles Footer */}
            {relatedArticles.length > 0 && (
              <div className="mt-14 pt-8 border-t border-border">
                <h3 className="text-xl font-bold tracking-tight text-foreground mb-6">
                  More Articles from Newsroom
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  {relatedArticles.map((rel, rIdx) => (
                    <Link
                      key={rel.title || rIdx}
                      href={`/news/${articles.indexOf(rel)}`}
                      className="group flex flex-col justify-between rounded-2xl border border-border bg-background p-5 shadow-soft hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        {rel.image && (
                          <div className="relative size-16 rounded-xl overflow-hidden bg-muted shrink-0">
                            <AdaptiveImage src={rel.image} alt={rel.title} fill className="object-cover" />
                          </div>
                        )}
                        <div>
                          <span className="text-[11px] font-semibold text-primary">{rel.date}</span>
                          <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mt-1">
                            {rel.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </article>
        </div>
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
