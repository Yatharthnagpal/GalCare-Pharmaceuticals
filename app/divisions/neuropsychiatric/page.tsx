"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import Image from "next/image"
import { BrainCircuit, Shield, Activity, Layers, ArrowLeft } from "lucide-react"

const therapies = [
  { title: "Anti-Convulsants", description: "Formulations engineered to manage epilepsy and neural excitability." },
  { title: "Anti-Depressants", description: "Selective inhibitors and agents to balance neurotransmitters." },
  { title: "Anxiolytics", description: "Solutions targeting acute anxiety and panic disorders." },
  { title: "Cognitive Enhancers", description: "Therapies focusing on neuroprotection and memory support." }
]

export default function NeuropsychiatricPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <section className="relative overflow-hidden py-12 md:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-10 h-[300px] w-[600px] rounded-full bg-green-500/10 blur-[100px]" />
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
                  Neuropsychiatric Division
                </span>
                <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                  Pioneering therapies for <span className="text-gradient">CNS Disorders.</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Our Neuropsychiatric Division is dedicated to engineering high-efficacy formulations that target complex central nervous system (CNS) conditions. By bridging scientific R&D with clinical insights, we supply healthcare providers with therapeutic solutions that restore balance and improve patient life quality.
                </p>
              </Reveal>
              <Reveal>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-border bg-muted shadow-soft">
                  <Image
                    src="/lab.png"
                    alt="Neuropsychiatric R&D"
                    fill
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Focus Areas */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Therapeutic Focus & Capabilities</h2>
              <p className="mt-3 text-muted-foreground">
                We develop and distribute a diverse portfolio of molecules addressing multiple neurological and psychiatric segments.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {therapies.map((t, i) => (
                <Reveal key={t.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft hover:border-primary/45 transition-colors">
                    <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                      <BrainCircuit className="size-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold">{t.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Quality & Research */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-muted shadow-soft">
                <Image
                  src="/manufacturing.png"
                  alt="Neuro production"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight">Advanced Formulations & GMP Standards</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                CNS formulations require meticulous design to ensure bio-availability and targeted action. Our scientists leverage advanced molecular modeling and delivery technologies to develop tablets, capsules, and liquid syrups that offer high stability and predictable outcomes.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Shield className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">WHO-GMP Compliance</h4>
                    <p className="text-sm text-muted-foreground">All neuropsychiatric formulations are processed in certified high-care units.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Activity className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Clinical Rigor</h4>
                    <p className="text-sm text-muted-foreground">Extensive clinical validation checks and dissolution profile matching.</p>
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
