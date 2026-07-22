"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll } from "motion/react"
import { Award, Factory, Globe, FlaskConical } from "lucide-react"
import { STATS } from "@/lib/site-data"
import { Counter, Reveal } from "@/components/motion-primitives"

const timeline = [
  {
    year: "2008",
    text: "Founded with a mission to advance dermatological care.",
    icon: Award,
  },
  {
    year: "2012",
    text: "Commissioned first WHO-GMP certified manufacturing unit.",
    icon: Factory,
  },
  {
    year: "2017",
    text: "Expanded to 20+ international markets.",
    icon: Globe,
  },
  {
    year: "2024",
    text: "Launched dedicated dermatology R&D center of excellence.",
    icon: FlaskConical,
  },
]

export function Overview() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll position inside this section for timeline progress drawing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <section id="about" ref={containerRef} className="relative py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-primary to-accent2 p-6 shadow-glow sm:p-8">
          <Reveal className="max-w-2xl mx-auto text-center lg:mx-0 lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/80">Company Overview</p>
            <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-primary-foreground sm:text-3xl leading-snug">
              A quarter century of dermatological excellence
            </h2>
            <p className="mt-2.5 text-pretty text-base text-primary-foreground/85 leading-relaxed">
              From a single laboratory to a globally trusted dermatology company, our journey is defined by science,
              quality, and an unwavering commitment to skin health.
            </p>
          </Reveal>

          {/* counters */}
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-primary-foreground/10 p-4.5 backdrop-blur-md ring-1 ring-primary-foreground/15 transition-transform hover:-translate-y-1">
                  <p className="text-3xl font-semibold tracking-tight text-primary-foreground dark:text-white sm:text-4xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-sm font-medium text-primary-foreground/80 dark:text-white/80">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* horizontal animated timeline */}
          <div className="relative mt-10 pb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60 mb-5 text-center sm:text-left">
              Our Journey Milestones
            </p>

            {/* horizontal progress line background (desktop only) */}
            <div className="absolute bottom-[0px] left-[12.5%] right-[12.5%] h-[3px] bg-primary-foreground/10 hidden lg:block" aria-hidden="true" />
            <div className="absolute bottom-[0px] left-[12.5%] right-[12.5%] h-[3px] hidden lg:block" aria-hidden="true">
              <svg className="w-full h-[3px] overflow-visible">
                <motion.line
                  x1="0"
                  y1="1.5"
                  x2="100%"
                  y2="1.5"
                  className="stroke-teal-400 dark:stroke-white"
                  strokeWidth="3"
                  style={{ pathLength: scrollYProgress }}
                />
              </svg>
            </div>

            {/* vertical progress line background (mobile only) */}
            <div className="absolute top-[60px] bottom-[60px] left-[50%] -translate-x-1/2 w-[3px] bg-primary-foreground/15 sm:hidden" aria-hidden="true" />

            {/* Balanced centered grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
              {timeline.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={item.year} className="flex flex-col items-center text-center">
                    {/* Milestone circular icon node */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 15,
                        delay: i * 0.12
                      }}
                      className="relative size-14 rounded-full bg-primary-foreground/15 text-teal-300 dark:text-white border-2 border-teal-400/50 shadow-md flex items-center justify-center mb-4 hover:bg-teal-400/20 hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      <Icon className="size-6" />
                    </motion.div>

                    {/* Year & Text info */}
                    <Reveal delay={i * 0.08}>
                      <span className="inline-block rounded-full bg-teal-400/20 px-3 py-0.5 text-xs font-bold text-teal-300 dark:text-white">
                        {item.year}
                      </span>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-primary-foreground/80 max-w-[220px]">
                        {item.text}
                      </p>
                    </Reveal>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
