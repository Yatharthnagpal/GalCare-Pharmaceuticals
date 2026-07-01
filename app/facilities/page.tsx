"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import Image from "next/image"
import { Factory, ShieldCheck, Cpu, Droplets, HardHat, Award } from "lucide-react"

const capabilities = [
  { icon: Cpu, title: "Automated Packaging", text: "Equipped with high-speed blister packing, ALU-ALU foils, and automated carton packaging systems." },
  { icon: Droplets, title: "Purified Water Systems", text: "Zero-discharge double-pass RO water system ensuring pure USP-grade water for liquid and cream preparation." },
  { icon: ShieldCheck, title: "Class-10000 Cleanrooms", text: "HVAC climate control systems filter out microbes and maintain optimal air changes and pressure gradients." },
  { icon: HardHat, title: "Zero Hazard Protocols", text: "Industrial-grade safety measures protect our workforce while avoiding batch cross-contamination." }
]

const stats = [
  { label: "Built-up Area", value: "45,000 Sq. Ft." },
  { label: "Daily Tablet Capacity", value: "1.2 Million" },
  { label: "Liquid capacity / Shift", value: "50,000 Bottles" },
  { label: "Cleanroom Class", value: "Class 10,000 (ISO 7)" }
]

export default function FacilitiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <section className="relative overflow-hidden py-12 md:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-1/3 top-10 h-[300px] w-[600px] rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="max-w-3xl">
              <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
                Infrastructure
              </span>
              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                World-class manufacturing <span className="text-gradient">facilities.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Galcare operates advanced, WHO-GMP compliant manufacturing facilities designed for the highest efficiency, hygiene, and environmental safety. From raw material intake to final product shipment, our operations are optimized to guarantee quality at scale.
              </p>
            </Reveal>

            {/* Main Image Banner */}
            <Reveal className="mt-12">
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] border border-border bg-muted shadow-soft">
                <Image
                  src="/manufacturing.png"
                  alt="Galcare manufacturing floor"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Facility Stats */}
        <section className="py-12 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
                    <span className="text-3xl font-bold text-gradient">{s.value}</span>
                    <p className="mt-1 text-sm font-semibold text-muted-foreground">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specs */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight">Advanced automation & HVAC controls</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Our plant is divided into distinct zones to prevent cross-contamination. Air locks, pass boxes, and differential pressure mapping keep formulation zones free of airborne dust or microbes. 
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Our automated manufacturing systems operate under supervisory control and data acquisition (SCADA) platforms to maintain stable batch temperatures, mixing velocities, and drying conditions.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold shadow-soft">WHO-GMP Compliant</span>
                <span className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold shadow-soft">ISO 9001:2015</span>
                <span className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold shadow-soft">Zero Liquid Discharge</span>
              </div>
            </Reveal>

            <Reveal>
              <div className="grid gap-6 sm:grid-cols-2">
                {capabilities.map((c, i) => (
                  <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:border-primary/45 transition-colors">
                    <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                      <c.icon className="size-5" />
                    </div>
                    <h3 className="mt-4 font-bold">{c.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
