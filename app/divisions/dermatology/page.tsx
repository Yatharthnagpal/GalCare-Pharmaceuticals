"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import Image from "next/image"
import { Sparkles, HeartPulse, ShieldAlert, Award, ArrowLeft } from "lucide-react"

const clinicalFocus = [
  { title: "Acne & Skin Infections", description: "Topical gels, washes, and anti-bacterial therapies designed to target acne-causing pathogens while preserving the skin barrier." },
  { title: "Pigmentation & Brightening", description: "Depigmenting creams and corrective serums containing alpha arbutin and kojic acid to fade melasma and dark spots." },
  { title: "Antifungal & Scalp Care", description: "Broad-spectrum topical antifungals and therapeutic anti-dandruff solutions offering immediate relief from itching." },
  { title: "Cosmeceuticals & Hydration", description: "Ceramide-infused moisturizers and hybrid sunscreens providing deep barrier repair and broad-spectrum daily UV defense." }
]

export default function DermatologyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <section className="relative overflow-hidden py-12 md:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-1/4 top-10 h-[300px] w-[600px] rounded-full bg-emerald-500/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal>
              <a
                href="/#divisions"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <ArrowLeft className="size-4" /> Back to Divisions
              </a>
            </Reveal>

            <div className="mt-8 grid gap-12 lg:grid-cols-2 items-center">
              <Reveal>
                <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
                  Dermatology Division
                </span>
                <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                  Science-led skincare, <span className="text-gradient">trusted by dermatologists.</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Our Dermatology Division is dedicated to engineering advanced, bio-compatible skincare formulations. Guided by scientific research, we develop prescription therapies and daily-care cosmeceuticals that soothe, protect, and restore skin health at a cellular level.
                </p>
              </Reveal>
              <Reveal>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-border bg-muted shadow-soft">
                  <Image
                    src="/products/hero-serum.png"
                    alt="Dermatology Science"
                    fill
                    className="object-contain p-8 bg-gradient-to-b from-primary/5 to-teal/5"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Clinical Focus Areas */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Clinical Focus Segments</h2>
              <p className="mt-3 text-muted-foreground">
                We design target-specific lines to treat dermatological challenges and maintain healthy skin homeostasis.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {clinicalFocus.map((focus, i) => (
                <Reveal key={focus.title} delay={i * 0.08}>
                  <div className="rounded-[2rem] border border-border bg-card p-8 shadow-soft hover:border-primary/45 transition-colors">
                    <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Sparkles className="size-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold">{focus.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{focus.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Dermatologist Partnerships */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-muted shadow-soft">
                <Image
                  src="/lab.png"
                  alt="Dermatology laboratory testing"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight">Rigorous Testing & Bio-Compatibility</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Skincare formulations require an optimal balance between active ingredient potency and skin tolerability. Our dedicated dermatology laboratory conducts patch testing, non-comedogenic studies, and stability validation to ensure every serum, gel, and cream is safe for even the most sensitive skin types.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <HeartPulse className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Dermatologist Recommended</h4>
                    <p className="text-sm text-muted-foreground">Prescribed daily by over 30,000 specialist practitioners globally.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Award className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Efficacy Proven</h4>
                    <p className="text-sm text-muted-foreground">Clinically validated results matching international skincare standards.</p>
                  </div>
                </div>
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
