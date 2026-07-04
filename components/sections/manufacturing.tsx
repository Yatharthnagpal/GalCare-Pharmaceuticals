"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { Reveal } from "@/components/motion-primitives"
import { Award, ShieldCheck, TestTube, Boxes } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { icon: TestTube, title: "R&D & Formulation", text: "Molecule design and stability validation." },
  { icon: Boxes, title: "Precision Production", text: "Automated GMP-controlled production lines." },
  { icon: ShieldCheck, title: "Quality Testing", text: "Multi-stage QC on every single batch." },
  { icon: Award, title: "Global Distribution", text: "Cold-chain logistics to 42 countries." },
]

const certs = ["WHO-GMP", "ISO 9001", "ISO 14001", "GLP Certified"]

export function Manufacturing() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const stepVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  }

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  }

  return (
    <section id="manufacturing" className="relative py-12 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Split layout (Text left, facility image with human inset right) */}
        <div className="grid gap-12 items-center lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <Reveal className="mx-auto lg:mx-0 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Manufacturing</p>
              <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-4xl leading-tight">
                World-class, WHO-GMP certified production
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
                Every product is crafted in globally certified facilities under stringent quality protocols, ensuring
                consistency, safety, and efficacy at scale.
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
              <Image
                src="/manufacturing.png"
                alt="Galcare WHO-GMP manufacturing facility"
                fill
                className="object-cover"
              />

              {/* Smaller circular inset showing quality control technician inspecting product */}
              <div className="absolute bottom-6 right-6 z-20 size-28 md:size-36 overflow-hidden rounded-full border-[4px] border-card shadow-xl transition-transform duration-500 hover:scale-105">
                <Image
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
          className="relative mt-6 space-y-1 lg:hidden"
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
        
      </div>
    </section>
  )
}
