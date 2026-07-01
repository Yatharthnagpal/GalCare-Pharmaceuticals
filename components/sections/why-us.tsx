"use client"

import {
  FlaskConical,
  Factory,
  BadgeCheck,
  Globe2,
  Lightbulb,
  Stethoscope,
  type LucideIcon,
} from "lucide-react"
import { WHY_US } from "@/lib/site-data"
import { Reveal } from "@/components/motion-primitives"

const ICONS: Record<string, LucideIcon> = {
  FlaskConical,
  Factory,
  BadgeCheck,
  Globe2,
  Lightbulb,
  Stethoscope,
}

export function WhyUs() {
  return (
    <section id="why-us" className="relative py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-primary to-accent2 p-6 shadow-glow sm:p-10">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/80">
              Why Choose Us
            </p>
            <h2 className="mt-2.5 text-balance text-2xl font-semibold tracking-tight text-primary-foreground sm:text-3xl">
              Quality and innovation, built into everything we make
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((item, i) => {
              const Icon = ICONS[item.icon] ?? BadgeCheck
              return (
                <Reveal key={item.title} delay={i * 0.06}>
                  <div className="h-full rounded-2xl bg-primary-foreground/10 p-5 backdrop-blur-md ring-1 ring-primary-foreground/15 transition-transform hover:-translate-y-1">
                    <div className="grid size-10 place-items-center rounded-xl bg-primary-foreground/15 text-primary-foreground">
                      <Icon className="size-4.5" />
                    </div>
                    <h3 className="mt-3.5 text-base font-semibold text-primary-foreground">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-primary-foreground/80">{item.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
