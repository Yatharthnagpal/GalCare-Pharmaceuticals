"use client"

import Image from "next/image"
import { Reveal } from "@/components/motion-primitives"
import { Award, ShieldCheck, TestTube, Boxes } from "lucide-react"

const steps = [
  { icon: TestTube, title: "R&D & Formulation", text: "Molecule design and stability validation." },
  { icon: Boxes, title: "Precision Production", text: "Automated GMP-controlled production lines." },
  { icon: ShieldCheck, title: "Quality Testing", text: "Multi-stage QC on every single batch." },
  { icon: Award, title: "Global Distribution", text: "Cold-chain logistics to 42 countries." },
]

const certs = ["WHO-GMP", "ISO 9001", "ISO 14001", "GLP Certified"]

export function Manufacturing() {
  return (
    <section id="manufacturing" className="relative py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-soft">
            <Image
              src="/manufacturing.png"
              alt="Galcare WHO-GMP manufacturing facility"
              width={720}
              height={560}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              {certs.map((c) => (
                <span
                  key={c}
                  className="rounded-full glass-strong px-3 py-1.5 text-xs font-semibold shadow-soft"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Manufacturing</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              World-class, WHO-GMP certified production
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Every product is crafted in globally certified facilities under stringent quality protocols, ensuring
              consistency, safety, and efficacy at scale.
            </p>
          </Reveal>

          <div className="mt-8 space-y-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft transition-transform hover:-translate-y-0.5">
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <step.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
