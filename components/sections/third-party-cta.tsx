"use client"

import { AdaptiveImage } from "@/components/ui/adaptive-image"
import { motion, type Variants } from "motion/react"
import { Reveal } from "@/components/motion-primitives"
import { Award, ShieldCheck, TestTube, Boxes, ArrowRight, Handshake } from "lucide-react"
import { cn } from "@/lib/utils"

const certs = ["WHO-GMP", "ISO 9001", "ISO 14001", "GLP Certified"]

const steps = [
  { icon: TestTube, title: "R&D & Formulation", text: "Molecule design and stability validation." },
  { icon: Boxes, title: "Precision Production", text: "Automated GMP-controlled production lines." },
  { icon: ShieldCheck, title: "Quality Testing", text: "Multi-stage QC on every single batch." },
  { icon: Award, title: "Global Distribution", text: "Cold-chain logistics to 42 countries." },
]

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

export function ThirdPartyCTA() {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const stepVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  }

  const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.6, ease: "easeInOut" as const }
    }
  }

  return (
    <section id="third-party-manufacturing" className="relative py-12 md:py-28 bg-card border-t border-border overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Split layout (Text left, facility image with human inset right) */}
        <div className="grid gap-12 items-center lg:grid-cols-2 mt-10">
          <div className="text-center lg:text-left">
            <Reveal className="mx-auto lg:mx-0 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Partner Ecosystem & Production Network
              </span>
              <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Third-Party Manufacturing & Global Partners
              </h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                Galcare powers contract manufacturing, active molecule sourcing, and distribution for leading healthcare and dermatological brands worldwide.
              </p>
            </Reveal>

            <Reveal className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
              {certs.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-soft"
                >
                  {c}
                </span>
              ))}
            </Reveal>
          </div>

          <Reveal>
            <div className="relative rounded-[2rem] border border-border shadow-soft aspect-[1.3] w-full overflow-hidden bg-muted">
              {/* Big facility image */}
              <AdaptiveImage
                src="/manufacturing.png"
                alt="Galcare WHO-GMP manufacturing facility"
                fill
                className="object-cover"
              />

              {/* Smaller circular inset showing quality control technician inspecting product */}
              <div className="absolute bottom-6 right-6 z-20 size-28 md:size-36 overflow-hidden rounded-full border-[4px] border-card shadow-xl transition-transform duration-500 hover:scale-105">
                <AdaptiveImage
                  src="/images/placeholders/qc-technician-inspection.png"
                  alt="Quality control technician inspecting product"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Horizontal steps sequential animation section (DESKTOP) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-20 gap-8 grid-cols-4 relative hidden lg:grid"
        >
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1
            const StepIcon = step.icon
            return (
              <div key={step.title} className="relative flex flex-col items-center text-center group">
                
                {/* Node icon with hover scale-up */}
                <motion.div
                  variants={stepVariants}
                  className="z-10 grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary border border-primary/25 shadow-soft transition-transform duration-300 group-hover:scale-110"
                >
                  <StepIcon className="size-7" />
                </motion.div>

                {/* Connecting fill line */}
                {!isLast && (
                  <div className="absolute top-8 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-[2px] bg-border hidden lg:block overflow-hidden z-0">
                    <motion.div
                      variants={lineVariants}
                      className="h-full bg-primary origin-left"
                    />
                  </div>
                )}

                <motion.div variants={stepVariants} className="mt-5">
                  <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground max-w-[220px] mx-auto">{step.text}</p>
                </motion.div>
              </div>
            )
          })}
        </motion.div>

        {/* Zigzag Vertical steps timeline (MOBILE / TABLET) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative mt-12 space-y-1 lg:hidden"
        >
          {/* Central vertical line */}
          <div className="absolute left-1/2 top-3 bottom-3 w-[2px] bg-primary/20 -translate-x-1/2" />
          
          {steps.map((step, i) => {
            const isEven = i % 2 === 0
            const StepIcon = step.icon
            return (
              <div key={step.title} className="grid grid-cols-2 gap-2 relative items-center">
                
                {/* Central Node Dot on the timeline */}
                <div className="absolute left-1/2 size-9 rounded-full border-2 border-primary bg-card -translate-x-1/2 grid place-items-center z-20 shadow-glow">
                  <span className="text-xs font-bold text-primary">0{i + 1}</span>
                </div>

                {/* Left Column */}
                <div className={cn(
                  "flex flex-col",
                  isEven ? "items-end pr-5" : "invisible pointer-events-none"
                )}>
                  {isEven && (
                    <motion.div
                      variants={stepVariants}
                      className="flex flex-col items-center text-center rounded-2xl border border-border bg-card py-2 px-3 shadow-soft w-full max-w-[170px] md:max-w-[220px]"
                    >
                      <div className="flex items-center justify-center gap-1.5 text-primary mb-0.5">
                        <StepIcon className="size-6" />
                      </div>
                      <h4 className="font-semibold text-sm leading-tight text-foreground">{step.title}</h4>
                      <p className="mt-0.5 text-xs leading-normal text-muted-foreground">{step.text}</p>
                    </motion.div>
                  )}
                </div>

                {/* Right Column */}
                <div className={cn(
                  "flex flex-col",
                  !isEven ? "items-start pl-5" : "invisible pointer-events-none"
                )}>
                  {!isEven && (
                    <motion.div
                      variants={stepVariants}
                      className="flex flex-col items-center text-center rounded-2xl border border-border bg-card py-2 px-3 shadow-soft w-full max-w-[170px] md:max-w-[220px]"
                    >
                      <div className="flex items-center justify-center gap-1.5 text-primary mb-0.5">
                        <StepIcon className="size-6" />
                      </div>
                      <h4 className="font-semibold text-sm leading-tight text-foreground">{step.title}</h4>
                      <p className="mt-0.5 text-xs leading-normal text-muted-foreground">{step.text}</p>
                    </motion.div>
                  )}
                </div>

              </div>
            )
          })}
        </motion.div>

        {/* 7, 5 Type Arrangement */}
        <div className="mt-20 flex flex-col items-center gap-4 sm:gap-5">
          
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
        <Reveal className="mt-16 max-w-4xl mx-auto rounded-3xl border border-border bg-accent/30 p-6 sm:p-8 shadow-sm">
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
        <Reveal className="mt-16 text-center">
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
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:bg-primary/95 hover:scale-[1.02]"
              >
                Request a Quote <ArrowRight className="size-4" />
              </a>
              <a
                href="/divisions/third-party-manufacturing"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
              >
                View Manufacturing Details
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
