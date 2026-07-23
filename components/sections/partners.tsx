"use client"

import { Reveal } from "@/components/motion-primitives"
import { AdaptiveImage } from "@/components/ui/adaptive-image"
import { ArrowRight, Handshake } from "lucide-react"

// 7, 5 Type Arrangement: Row 1 (7 items), Row 2 (5 items)
const row1Partners = [
  { id: 1, image: "/partners/partner1.png", alt: "Global Partner Brand 1" },
  { id: 2, image: "/partners/partner2.png", alt: "Global Partner Brand 2" },
  { id: 3, image: "/partners/partner3.png", alt: "Global Partner Brand 3" },
  { id: 4, image: "/partners/partner4.png", alt: "Global Partner Brand 4" },
  { id: 5, image: "/partners/partner2.png", alt: "Global Partner Brand 5" },
  { id: 6, image: "/partners/partner1.png", alt: "Global Partner Brand 6" },
  { id: 7, image: "/partners/partner3.png", alt: "Global Partner Brand 7" },
]

const row2Partners = [
  { id: 8, image: "/partners/partner4.png", alt: "Global Partner Brand 8" },
  { id: 9, image: "/partners/partner3.png", alt: "Global Partner Brand 9" },
  { id: 10, image: "/partners/partner1.png", alt: "Global Partner Brand 10" },
  { id: 11, image: "/partners/partner2.png", alt: "Global Partner Brand 11" },
  { id: 12, image: "/partners/partner4.png", alt: "Global Partner Brand 12" },
]

function CircularLogoCard({ partner, delay }: { partner: typeof row1Partners[0]; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="group relative size-20 sm:size-24 md:size-28 lg:size-32 rounded-full overflow-hidden border border-border/80 bg-white shadow-soft transition-all duration-300 hover:scale-110 hover:border-primary/60 hover:shadow-glow flex items-center justify-center p-2.5 cursor-pointer">
        <div className="relative size-full rounded-full overflow-hidden flex items-center justify-center">
          <AdaptiveImage
            src={partner.image}
            alt={partner.alt}
            fill
            className="object-contain p-2 rounded-full transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>
    </Reveal>
  )
}

export function Partners() {
  return (
    <section id="partners" className="relative py-8 md:py-14 bg-card border-t border-border overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Partner Ecosystem & Production Network
          </span>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Our Global Production Network & Trusted Partners
          </h2>
          <p className="mt-3 text-base md:text-lg leading-relaxed text-muted-foreground">
            Galcare powers contract manufacturing, active molecule sourcing, and distribution for leading healthcare and dermatological brands worldwide.
          </p>
        </Reveal>

        {/* 7, 5 Type Arrangement */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:gap-5">
          
          {/* Row 1 (Top: 7 items) */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 max-w-6xl">
            {row1Partners.map((partner, i) => (
              <CircularLogoCard key={partner.id} partner={partner} delay={i * 0.03} />
            ))}
          </div>

          {/* Row 2 (Bottom: 5 items) */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 max-w-4xl">
            {row2Partners.map((partner, i) => (
              <CircularLogoCard key={partner.id} partner={partner} delay={0.21 + i * 0.03} />
            ))}
          </div>

        </div>

        {/* Metrics Banner */}
        <Reveal className="mt-10 max-w-4xl mx-auto rounded-3xl border border-border bg-accent/30 p-6 sm:p-8 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-3 text-center">
            <div>
              <p className="text-3xl font-extrabold text-primary">42+</p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Global Export Markets</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-primary">WHO-GMP</p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Certified Facilities</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-primary">100%</p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Batch Integrity</p>
            </div>
          </div>
        </Reveal>

        {/* Call-to-Action Section */}
        <Reveal className="mt-10 text-center">
          <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-gradient-to-b from-card to-accent/40 p-6 sm:p-10 shadow-soft">
            <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Handshake className="size-6" />
            </div>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Scale Your Pharmaceutical Production
            </h3>
            <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
              Partner with Galcare for WHO-GMP certified third-party manufacturing, custom formulations, and global regulatory support.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:bg-primary/95 hover:scale-[1.02]"
              >
                Become a Partner <ArrowRight className="size-4" />
              </a>
              <a
                href="/divisions/third-party-manufacturing"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
              >
                Contract Manufacturing Details
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
