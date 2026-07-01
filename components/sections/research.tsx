"use client"

import Image from "next/image"
import { Reveal } from "@/components/motion-primitives"

const process = [
  { step: "01", title: "Discovery", text: "Identifying unmet dermatological needs through clinical insight." },
  { step: "02", title: "Formulation", text: "Engineering stable, bioavailable delivery systems." },
  { step: "03", title: "Clinical Validation", text: "Rigorous trials measuring safety and efficacy." },
  { step: "04", title: "Launch & Monitor", text: "Post-market surveillance and continuous improvement." },
]

export function Research() {
  return (
    <section id="research" className="relative py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Research & Development</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Where clinical excellence meets innovation
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Our dedicated R&D center of excellence pioneers new molecules and delivery technologies, translating
              science into skin health outcomes.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <span className="text-2xl font-semibold text-gradient">{p.step}</span>
                  <h3 className="mt-2 font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="order-1 lg:order-2">
          <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-soft">
            <Image
              src="/lab.png"
              alt="Galcare dermatology research laboratory"
              width={720}
              height={620}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 right-4 rounded-2xl glass-strong px-5 py-3 shadow-soft">
              <p className="text-2xl font-semibold text-gradient">150+</p>
              <p className="text-xs text-muted-foreground">Scientific publications</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
