"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import { AdaptiveImage } from "@/components/ui/adaptive-image"
import { NEWS, NewsItem } from "@/lib/site-data"
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
  const [inquiryModalOpen, setInquiryModalOpen] = useState<boolean>(false)
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false)

  useEffect(() => {
    const loadArticles = () => {
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
        
        {/* Newsroom Hero Banner */}
        <section className="relative overflow-hidden py-16 md:py-20 bg-[#16a34a] text-white">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-white/10 blur-[130px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6 text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white border border-white/25 backdrop-blur-md mb-4 shadow-sm">
                <Building2 className="size-3.5" /> Official Corporate News
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                Galcare Newsroom
              </h1>
              <p className="mt-3 text-base md:text-lg text-emerald-50 max-w-xl mx-auto font-medium">
                Official company milestones, WHO-GMP plant updates, R&D achievements, and executive announcements from Galcare Pharmaceuticals.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Corporate News Articles Grid (No Categories) */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            
            {/* Header Title */}
            <div className="pb-6 border-b border-border/50 mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Latest Corporate News & Media
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Authentic corporate updates, regulatory milestones, and technical breakthroughs.
              </p>
            </div>

            {/* Article Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((item, idx) => (
                <Reveal key={item.title || idx} delay={idx * 0.06}>
                  <article className="group h-full flex flex-col justify-between rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-strong hover:border-primary/50 transition-all duration-300">
                    <div>
                      {/* Image Container */}
                      {item.image && (
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                          <AdaptiveImage
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}

                      {/* Card Body */}
                      <div className="p-6">
                        {/* Meta Row: Author & Date */}
                        <div className="flex items-center justify-between text-xs font-semibold text-primary mb-3">
                          <span className="flex items-center gap-1 text-foreground/80 truncate max-w-[65%]">
                            <User className="size-3.5 text-primary shrink-0" />
                            <span className="truncate">{item.author}</span>
                          </span>
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
                          href={`/news/${idx}`}
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

      {/* Press Team Reach Out Modal */}
      {pressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-strong">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <div className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="size-4" />
                </div>
                <h3 className="font-bold text-base text-foreground">Press & Media Contacts</h3>
              </div>
              <button
                onClick={() => setPressModalOpen(false)}
                className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-accent/40 border border-border">
                <p className="font-bold text-foreground">Corporate Communications</p>
                <p className="text-muted-foreground mt-0.5">Email: press@galcare.com</p>
                <p className="text-muted-foreground">Phone: +91 141 234-5678</p>
              </div>
              <div className="p-3.5 rounded-xl bg-accent/40 border border-border">
                <p className="font-bold text-foreground">Headquarters Address</p>
                <p className="text-muted-foreground mt-0.5">Galcare Pharmaceutical Pvt. Ltd.</p>
                <p className="text-muted-foreground">53-54, New Sanganer Road, Sodala, Jaipur, Rajasthan 302019</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setPressModalOpen(false)}
                className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-xs rounded-xl"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Inquiry Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-strong">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <div className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="size-4" />
                </div>
                <h3 className="font-bold text-base text-foreground">Submit a Media Inquiry</h3>
              </div>
              <button
                onClick={() => {
                  setInquiryModalOpen(false)
                  setInquirySubmitted(false)
                }}
                className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            {inquirySubmitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto grid size-12 place-items-center rounded-full bg-green-500/10 text-green-500 mb-3">
                  <CheckCircle2 className="size-6" />
                </div>
                <h4 className="font-bold text-base text-foreground">Inquiry Received</h4>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                  Thank you for contacting Galcare Press Office. Our communications team will respond within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setInquiryModalOpen(false)
                    setInquirySubmitted(false)
                  }}
                  className="mt-6 px-6 py-2.5 bg-primary text-primary-foreground font-semibold text-xs rounded-xl"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setInquirySubmitted(true)
                }}
                className="mt-4 space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Connor"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Publication / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pharma Times International"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@pharmatimes.com"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Inquiry Details</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your publication, deadline, and inquiry topic..."
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setInquiryModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-xs rounded-xl shadow-glow hover:bg-primary/95"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
      <AIAssistant />
    </>
  )
}
