"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { BrainCircuit, Sparkles, Factory, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/motion-primitives"

const divisions = [
  {
    title: "Neuropsychiatric Division",
    description: "Specialized, high-quality neuro and psychiatric formulations targeting central nervous system disorders with precision and efficacy.",
    icon: BrainCircuit,
    carouselImages: ["/lab.png", "/images/placeholders/neuro-human.png"],
    inset: "/images/placeholders/neuro-doctor.png",
    insetAlt: "Psychiatrist consulting with patient",
    link: "/divisions/neuropsychiatric",
    badge: "CNS Excellence",
  },
  {
    title: "Dermatology Division",
    description: "Scientifically developed advanced dermatology and skincare formulations trusted by practitioners to treat acne, pigmentation, hair loss, and more.",
    icon: Sparkles,
    carouselImages: ["/products/hero-serum.png", "/images/placeholders/derma-human.png"],
    inset: "/images/placeholders/dermatologist-consultation.png",
    insetAlt: "Dermatologist examining a patient's skin under a lamp",
    link: "/divisions/dermatology",
    badge: "Advanced Derma",
  },
  {
    title: "Third-Party Manufacturing",
    description: "World-class contract manufacturing services supported by WHO-GMP certified facilities, rigorous QA, and end-to-end supply chain reliability.",
    icon: Factory,
    carouselImages: ["/manufacturing.png", "/images/placeholders/manufacturing-human.png"],
    inset: "/images/placeholders/qc-technician-inspection.png",
    insetAlt: "Quality control technician inspecting product",
    link: "/divisions/third-party-manufacturing",
    badge: "WHO-GMP Certified",
  }
]

function DivisionCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [images])

  return (
    <div className="absolute inset-0 z-0">
      {images.map((img, i) => (
        <div
          key={img}
          className="absolute inset-0 transition-opacity"
          style={{
            opacity: i === index ? 1 : 0,
            transition: "opacity 800ms ease-in-out"
          }}
        >
          <Image
            src={img}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      ))}
    </div>
  )
}

export function Divisions() {
  return (
    <section id="divisions" className="relative py-12 md:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Core Business Divisions</p>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-4xl leading-tight">
            Providing comprehensive healthcare solutions
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            Galcare operates across three dedicated divisions, bringing scientific excellence, trusted quality, and manufacturing scale to partners worldwide.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {divisions.map((div, i) => {
            const Icon = div.icon
            return (
              <DivisionCard key={div.title} div={div} i={i} Icon={Icon} />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function DivisionCard({ div, i, Icon }: { div: typeof divisions[0]; i: number; Icon: typeof BrainCircuit }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Reveal delay={i * 0.1}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex h-[420px] sm:h-[450px] md:h-[480px] flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-glow"
      >
        {/* Background image carousel */}
        <DivisionCarousel images={div.carouselImages} alt={div.title} />

        {/* Dynamic gradient overlay wipe on hover */}
        <div
          className="absolute inset-0 z-10 transition-all duration-500"
          style={{
            background: isHovered
              ? "linear-gradient(to top, rgba(6, 11, 24, 0.95) 0%, rgba(6, 11, 24, 0.85) 60%, rgba(6, 11, 24, 0.4) 100%)"
              : "linear-gradient(to top, rgba(6, 11, 24, 0.85) 0%, rgba(6, 11, 24, 0.5) 45%, rgba(6, 11, 24, 0.1) 100%)"
          }}
        />

        {/* Division badge (left) */}
        <div className="absolute top-4 left-4 z-20 rounded-full bg-primary/90 px-3.5 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
          {div.badge}
        </div>

        {/* Card Content overlay */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col p-6 md:p-8 text-white transition-all duration-500">
          <div className="flex items-center gap-3 min-h-[56px]">
            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 border border-white/20 text-white backdrop-blur-sm">
              <Icon className="size-5" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white leading-tight">{div.title}</h3>
          </div>

          <div className="mt-4 min-h-[90px]">
            <p className="text-sm leading-relaxed text-slate-200/90 group-hover:text-slate-100 transition-colors duration-300">
              {div.description}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <a
              href={div.link}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-slate-950 hover:border-white shadow-sm"
            >
              Explore Division
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
