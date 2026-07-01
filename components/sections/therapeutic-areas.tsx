"use client"

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

export function TherapeuticAreas() {
  return (
    <section id="areas" className="relative py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-72 -translate-y-1/2">
        <div className="mx-auto h-full max-w-3xl rounded-full bg-teal/10 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Therapeutic Areas</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Comprehensive coverage across dermatology
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Focused expertise across the conditions that matter most to patients and practitioners.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {THERAPEUTIC_AREAS.map((area, i) => {
            const Icon = ICONS[area.icon] ?? Sparkles
            return (
              <Reveal key={area.title} delay={i * 0.06}>
                <div className="group h-full rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow">
                  <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">{area.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{area.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
