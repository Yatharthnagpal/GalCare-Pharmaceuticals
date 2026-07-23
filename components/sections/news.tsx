"use client"

import Link from "next/link"
import { AdaptiveImage } from "@/components/ui/adaptive-image"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { NEWS } from "@/lib/site-data"
import { Reveal } from "@/components/motion-primitives"

const newsWithImages = [
  {
    ...NEWS[0],
    image: "/images/placeholders/sunscreen-testing.png",
    alt: "Woman testing the new sunscreen line outdoors"
  },
  {
    ...NEWS[1],
    image: "/images/placeholders/awards-celebration.png",
    alt: "Dermatologist team receiving an innovation award"
  },
  {
    ...NEWS[2],
    image: "/images/placeholders/dermatology-congress.png",
    alt: "Dermatologists speaking at World Congress of Dermatology"
  }
]

export function News() {
  const getCardVariants = (index: number) => ({
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
      y: 20
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  })

  return (
    <section id="news" className="relative py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="flex flex-col items-center text-center lg:flex-row lg:items-end lg:justify-between lg:text-left gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Newsroom</p>
            <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-4xl leading-tight">
              Latest launches, events & awards
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
          >
            View all news <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-8 grid gap-6 md:grid-cols-3"
        >
          {newsWithImages.map((item, i) => (
            <motion.div
              key={item.title}
              variants={getCardVariants(i)}
              className="h-full"
            >
              <Link href={`/news/${i}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:border-primary/40 hover:shadow-glow">
                
                {/* News card image slot with zoom-on-hover */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <AdaptiveImage
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-400 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                      {item.category}
                    </span>
                    <span className="text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:underline">
                    Read more
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
