"use client"

import { useState } from "react"
import Link from "next/link"
import { AdaptiveImage } from "@/components/ui/adaptive-image"
import { motion } from "motion/react"
import {
  Sparkles,
  Layers,
  CircleDot,
  Wind,
  ShieldCheck,
  Bug,
  Flame,
  Palette,
  type LucideIcon,
} from "lucide-react"
import { THERAPEUTIC_AREAS } from "@/lib/site-data"
import { Reveal } from "@/components/motion-primitives"
import { cn } from "@/lib/utils"

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Layers,
  CircleDot,
  Wind,
  ShieldCheck,
  Bug,
  Flame,
  Palette,
}

const areaImages = [
  {
    image: "/images/placeholders/area-acne.png",
    alt: "Person applying acne treatment"
  },
  {
    image: "/images/placeholders/area-psoriasis.png",
    alt: "Applying soothing cream to elbow psoriasis"
  },
  {
    image: "/images/placeholders/area-vitiligo.png",
    alt: "Applying repigmentation lotion to vitiligo patch"
  },
  {
    image: "/images/placeholders/area-hairloss.png",
    alt: "Massaging scalp for hair loss treatment"
  },
  {
    image: "/images/placeholders/area-dermatitis.png",
    alt: "Applying anti-inflammatory barrier cream to rash"
  },
  {
    image: "/images/placeholders/area-fungal.png",
    alt: "Close-up of hand applying topical antifungal cream"
  },
  {
    image: "/images/placeholders/area-rosacea.png",
    alt: "Calming redness on face with cooling gel"
  },
  {
    image: "/images/placeholders/area-pigmentation.png",
    alt: "Applying depigmenting serum to cheeks"
  }
]

const areasWithImages = THERAPEUTIC_AREAS.map((area, idx) => ({
  ...area,
  ...areaImages[idx]
}))

export function TherapeuticAreas() {
  // Staggered grid container variants
  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      }
    }
  }

  return (
    <section id="areas" className="relative py-10 md:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-72 -translate-y-1/2">
        <div className="mx-auto h-full max-w-3xl rounded-full bg-teal/10 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Therapeutic Areas</p>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-4xl leading-tight">
            Comprehensive coverage across dermatology
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            Focused expertise across the conditions that matter most to patients and practitioners.
          </p>
        </Reveal>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-4 pb-8"
        >
          {areasWithImages.map((area, i) => {
            const isHiddenMobile = area.title === "Psoriasis" || area.title === "Rosacea"
            return (
              <TherapeuticAreaCard
                key={area.title}
                area={area}
                i={i}
                className={isHiddenMobile ? "hidden sm:block" : ""}
              />
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function TherapeuticAreaCard({
  area,
  i,
  className,
}: {
  area: typeof areasWithImages[0]
  i: number
  className?: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = ICONS[area.icon] ?? Sparkles
  const slug = area.title.toLowerCase().replace(/\s+/g, "-")

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      custom={i}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "h-full rounded-2xl sm:rounded-3xl border border-border bg-card p-3 sm:p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow",
        className
      )}
    >
      <Link href={`/therapeutic-areas/${slug}`} className="flex flex-col h-full justify-between group">
        <div>
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-2 sm:gap-4">
            {/* Dynamic circular photo slot */}
            <div className="relative size-8 sm:size-12 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border border-primary/10 shadow-inner">
              <AdaptiveImage
                src={area.image}
                alt={area.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            
            <h3 className="text-xs sm:text-lg font-semibold tracking-tight leading-tight group-hover:text-primary transition-colors">{area.title}</h3>
          </div>
          
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground hidden sm:block">{area.description}</p>
        </div>
        
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-bold text-primary group-hover:underline hidden sm:flex">
          <span>Explore Treatments</span>
          <span>→</span>
        </div>
      </Link>
    </motion.div>
  )
}
