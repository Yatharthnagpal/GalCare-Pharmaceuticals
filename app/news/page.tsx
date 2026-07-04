"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import { NEWS } from "@/lib/site-data"
import { Calendar, Tag, ArrowRight, BookOpen } from "lucide-react"

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-1/4 top-10 h-[300px] w-[600px] rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="max-w-3xl">
              <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                News & Media
              </span>
              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Stay updated with <span className="text-gradient">our latest breakthroughs.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Read about our recent research publications, product launches, global congress presentations, and community welfare programs.
              </p>
            </Reveal>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {NEWS.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="group h-full flex flex-col justify-between rounded-[2rem] border border-border bg-card p-6 md:p-8 shadow-soft hover:border-primary/45 transition-colors duration-300">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-semibold text-primary">
                        <span className="flex items-center gap-1">
                          <Tag className="size-3" /> {item.category}
                        </span>
                        <span className="text-muted-foreground/30">•</span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="size-3" /> {item.date}
                        </span>
                      </div>
                      <h3 className="mt-4 text-xl font-bold tracking-tight group-hover:text-primary transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {item.excerpt}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
                      <Link
                        href={`/news/${i}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:underline"
                      >
                        Read Article <ArrowRight className="size-3" />
                      </Link>
                      <span className="grid size-8 place-items-center rounded-lg bg-muted text-muted-foreground">
                        <BookOpen className="size-4" />
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
