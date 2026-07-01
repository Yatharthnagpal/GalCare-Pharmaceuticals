"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import Image from "next/image"
import { FlaskConical, Microscope, Award, FileSpreadsheet, CheckCircle2 } from "lucide-react"

const processSteps = [
  { step: "01", title: "Target Identification", text: "Screening bio-active molecules and studying skin receptors." },
  { step: "02", title: "Formulation Design", text: "Developing stable emulsions, gels, and liposomal delivery systems." },
  { step: "03", title: "Analytical Testing", text: "Validating active concentrations, pH stability, and skin permeation." },
  { step: "04", title: "Clinical Trials", text: "Testing for patient safety, skin irritation, and clinical outcomes." }
]

export default function ResearchPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <section className="relative overflow-hidden py-12 md:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-1/4 top-10 h-[300px] w-[600px] rounded-full bg-emerald-500/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <Reveal>
                <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
                  Research & Innovation
                </span>
                <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Translating scientific <span className="text-gradient">precision into health.</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Our advanced R&D center of excellence acts as the scientific engine behind Galcare. Formed by experienced biochemists, dermatological specialists, and formulation engineers, our laboratory conducts clinical research to deliver bio-compatible skincare and CNS therapies.
                </p>
              </Reveal>
              <Reveal>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-border bg-muted shadow-soft">
                  <Image
                    src="/lab.png"
                    alt="Dermatology research laboratory"
                    fill
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Our Formulation Research Process</h2>
              <p className="mt-3 text-muted-foreground">
                We take an analytical, multi-stage path to ensure product efficacy, shelf-life stability, and bio-compatibility.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((s, i) => (
                <Reveal key={s.step} delay={i * 0.08}>
                  <div className="h-full rounded-[2rem] border border-border bg-card p-8 shadow-soft transition-transform hover:-translate-y-1">
                    <span className="text-3xl font-bold text-gradient">{s.step}</span>
                    <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Clinical Excellence */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-muted shadow-soft">
                <Image
                  src="/manufacturing.png"
                  alt="Clinical Research"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight">Clinical Validation & Publications</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We believe that dermatology must be backed by clinical evidence. Our research team has published over 150+ papers in leading international dermatological journals, covering topics such as skin barrier lipids, sebum control mechanisms, and delivery enhancers.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="text-sm font-semibold">150+ Peer-Reviewed Scientific Publications</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="text-sm font-semibold">Collaborations with leading academic medical centers</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="text-sm font-semibold">In-house stability chambers and HPLC testing labs</span>
                </li>
              </ul>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
