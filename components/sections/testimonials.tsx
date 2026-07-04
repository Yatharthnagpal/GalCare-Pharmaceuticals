"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { TESTIMONIALS } from "@/lib/site-data"
import { Reveal } from "@/components/motion-primitives"

const testimonialsWithImages = [
  {
    ...TESTIMONIALS[0],
    image: "/images/placeholders/testimonial-doctor-headshot.png",
    alt: "Dr. Ananya Rao headshot"
  },
  {
    ...TESTIMONIALS[1],
    image: "/images/placeholders/testimonial-partner-headshot.png",
    alt: "Marcus Feld headshot"
  },
  {
    ...TESTIMONIALS[2],
    image: "/images/placeholders/testimonial-patient-headshot.png",
    alt: "Priya Menon headshot"
  },
  {
    ...TESTIMONIALS[3],
    image: "/images/placeholders/testimonial-chief-headshot.png",
    alt: "Dr. Samuel Okoye headshot"
  }
]

export function Testimonials() {
  const [[page, direction], setPage] = useState([0, 0])
  const [isHovering, setIsHovering] = useState(false)
  const count = testimonialsWithImages.length

  const setPageSafe = useCallback((newPage: number, newDirection: number) => {
    setPage([newPage, newDirection])
  }, [])

  const next = useCallback(() => {
    setPageSafe((page + 1) % count, 1)
  }, [page, count, setPageSafe])

  const prev = () => {
    setPageSafe((page - 1 + count) % count, -1)
  }

  useEffect(() => {
    if (isHovering) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next, isHovering])

  const t = testimonialsWithImages[page]

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 120, damping: 18 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 120, damping: 18 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    })
  }

  return (
    <section className="relative py-12 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Testimonials</p>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-4xl leading-tight">
            Trusted by doctors, distributors, and patients
          </h2>
        </Reveal>

        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative mt-12 min-h-[310px] overflow-hidden"
        >
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full rounded-[2rem] glass-strong p-6 text-center shadow-soft sm:py-8 sm:px-10"
            >
              <Quote className="mx-auto size-7 text-primary/40" />
              <p className="mt-4 text-balance text-lg font-medium leading-relaxed sm:text-xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              
              <div className="mt-6 flex flex-col items-center gap-3">
                {/* Circular Headshot Placeholder */}
                <div className="relative size-14 shrink-0 overflow-hidden rounded-full border-2 border-primary shadow-md bg-muted">
                  <Image
                    src={t.image}
                    alt={t.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold leading-tight text-sm sm:text-base">{t.name}</p>
                  <p className="text-xs sm:text-sm text-primary mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="grid size-11 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent cursor-pointer"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex gap-2">
            {testimonialsWithImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setPageSafe(i, i > page ? 1 : -1)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === page ? "w-8 bg-primary" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="grid size-11 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent cursor-pointer"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
