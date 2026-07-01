"use client"

import { STATS } from "@/lib/site-data"
import { Counter, Reveal } from "@/components/motion-primitives"

const timeline = [
  { year: "2001", text: "Founded with a mission to advance dermatological care." },
  { year: "2009", text: "Commissioned first WHO-GMP certified manufacturing unit." },
  { year: "2016", text: "Expanded to 20+ international markets." },
  { year: "2024", text: "Launched dedicated dermatology R&D center of excellence." },
]

export function Overview() {
  return (
    <section id="about" className="relative py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-primary to-accent2 p-6 shadow-glow sm:p-10">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/80">Company Overview</p>
            <h2 className="mt-2.5 text-balance text-2xl font-semibold tracking-tight text-primary-foreground sm:text-3xl">
              A quarter century of dermatological excellence
            </h2>
            <p className="mt-3 text-pretty text-base text-primary-foreground/85 leading-relaxed">
              From a single laboratory to a globally trusted dermatology company, our journey is defined by science,
              quality, and an unwavering commitment to skin health.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-primary-foreground/10 p-5 backdrop-blur-md ring-1 ring-primary-foreground/15 transition-transform hover:-translate-y-1">
                  <p className="text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-primary-foreground/80">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* timeline */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-primary-foreground/10 p-5 backdrop-blur-md ring-1 ring-primary-foreground/15 transition-transform hover:-translate-y-1">
                  <span className="text-sm font-semibold text-teal-300">{item.year}</span>
                  <p className="mt-1.5 text-sm leading-relaxed text-primary-foreground/80">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
