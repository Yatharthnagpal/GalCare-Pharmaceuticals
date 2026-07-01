"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { BrainCircuit, Sparkles, Factory, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/motion-primitives"

const divisions = [
  {
    title: "Neuropsychiatric Division",
    description: "Specialized, high-quality neuro and psychiatric formulations targeting central nervous system disorders with precision and efficacy.",
    icon: BrainCircuit,
    image: "/lab.png",
    link: "/divisions/neuropsychiatric",
    badge: "CNS Excellence",
    color: "from-green-600/20 to-emerald-600/20"
  },
  {
    title: "Dermatology Division",
    description: "Scientifically developed advanced dermatology and skincare formulations trusted by practitioners to treat acne, pigmentation, hair loss, and more.",
    icon: Sparkles,
    image: "/products/hero-serum.png",
    link: "/divisions/dermatology",
    badge: "Advanced Derma",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "Third-Party Manufacturing",
    description: "World-class contract manufacturing services supported by WHO-GMP certified facilities, rigorous QA, and end-to-end supply chain reliability.",
    icon: Factory,
    image: "/manufacturing.png",
    link: "/divisions/third-party-manufacturing",
    badge: "WHO-GMP Certified",
    color: "from-green-700/20 to-green-600/20"
  }
]

export function Divisions() {
  return (
    <section id="divisions" className="relative py-20 md:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Core Business Divisions</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Providing comprehensive healthcare solutions
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Galcare operates across three dedicated divisions, bringing scientific excellence, trusted quality, and manufacturing scale to partners worldwide.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {divisions.map((div, i) => {
            const Icon = div.icon
            return (
              <Reveal key={div.title} delay={i * 0.1}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-glow">
                  {/* Image container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                      src={div.image}
                      alt={div.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    <div className="absolute top-4 right-4 rounded-full bg-primary/95 px-3.5 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
                      {div.badge}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <div className="flex items-center gap-3">
                      <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="text-xl font-bold tracking-tight">{div.title}</h3>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {div.description}
                    </p>
                    <div className="mt-6 pt-4 border-t border-border">
                      <a
                        href={div.link}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        Explore Division
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
