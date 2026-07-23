"use client"

import { AdaptiveImage } from "@/components/ui/adaptive-image"
import { motion } from "motion/react"
import { Reveal } from "@/components/motion-primitives"

const process = [
  { step: "01", title: "Discovery", text: "Identifying unmet dermatological needs through clinical insight." },
  { step: "02", title: "Formulation", text: "Engineering stable, bioavailable delivery systems." },
  { step: "03", title: "Clinical Validation", text: "Rigorous trials measuring safety and efficacy." },
  { step: "04", title: "Launch & Monitor", text: "Post-market surveillance and continuous improvement." },
]

export function Research() {
  return (
    <section id="research" className="relative py-12 md:py-28">
      <div className="mx-auto grid max-w-7xl items-stretch gap-8 lg:gap-12 px-4 md:px-6 lg:grid-cols-2">
        <div className="order-2 lg:order-1 flex flex-col justify-center text-center lg:text-left">
          <Reveal className="mx-auto lg:mx-0 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Research & Development</p>
            <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-4xl leading-tight">
              Where clinical excellence meets innovation
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
              Our dedicated R&D center of excellence pioneers new molecules and delivery technologies, translating
              science into skin health outcomes.
            </p>
          </Reveal>
 
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div className="h-full rounded-2xl sm:rounded-3xl border border-border bg-card py-3.5 px-4 sm:py-5 sm:px-6 shadow-soft transition-all hover:border-primary/30 hover:shadow-glow">
                  {/* 3D rotating/flipping counter reveal */}
                  <motion.span
                    initial={{ opacity: 0, rotateX: -90, scale: 0.8 }}
                    whileInView={{ opacity: 1, rotateX: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 12,
                      delay: i * 0.15
                    }}
                    className="inline-block text-xl sm:text-2xl font-semibold text-gradient origin-bottom"
                    style={{ perspective: 600 }}
                  >
                    {p.step}
                  </motion.span>
                  
                  <h3 className="mt-1.5 sm:mt-2 text-sm sm:text-base font-semibold">{p.title}</h3>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
 
        <Reveal className="order-1 lg:order-2 lg:h-full">
          <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-soft aspect-[1.2] lg:aspect-auto lg:h-full min-h-[350px] lg:min-h-0 w-full">
            {/* Main Lab Image */}
            <AdaptiveImage
              src="/lab.png"
              alt="Galcare dermatology research laboratory"
              fill
              className="object-cover"
            />
            
            {/* Floating Stats Chip */}
            <div className="absolute bottom-4 left-4 rounded-2xl glass-strong px-5 py-3 shadow-soft z-10">
              <p className="text-2xl font-semibold text-gradient">150+</p>
              <p className="text-xs text-muted-foreground">Scientific publications</p>
            </div>

            {/* Circular Inset Quality Control / Researcher reviewing tablet */}
            <div className="absolute top-4 right-4 z-20 size-24 md:size-32 overflow-hidden rounded-full border-4 border-card shadow-lg transition-transform duration-500 hover:scale-105">
              <AdaptiveImage
                src="/images/placeholders/researcher-tablet.png"
                alt="Researcher reviewing clinical trial results on a tablet"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
