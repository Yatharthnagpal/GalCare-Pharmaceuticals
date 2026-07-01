"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import Image from "next/image"
import { BadgeCheck, ShieldAlert, FlaskConical, ClipboardCheck, CheckCircle2 } from "lucide-react"

const testingSteps = [
  { icon: ClipboardCheck, title: "Raw Material Assay", text: "Verifying active pharmaceutical ingredients (APIs) and excipient purity before batch release." },
  { icon: FlaskConical, title: "Chemical & Physical QC", text: "Monitoring pH, viscosity, density, and particle size distribution in real-time." },
  { icon: BadgeCheck, title: "Microbiological Testing", text: "Running culture testing in sterile chambers to guarantee zero bacterial or fungal loading." },
  { icon: ShieldCheckIcon, title: "Post-Market Stability", text: "Storing reference samples in climate chambers to monitor quality over product lifetime." }
]

function ShieldCheckIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export default function QualityPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <section className="relative overflow-hidden py-12 md:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-1/4 top-10 h-[300px] w-[600px] rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <Reveal>
                <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
                  Quality Assurance
                </span>
                <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Uncompromised quality, <span className="text-gradient">verified at every step.</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Our quality commitment is backed by strict compliance with international standardizations. We believe that clinical safety and product efficacy can only be attained through a culture of absolute precision, multi-stage testing, and robust documentation.
                </p>
              </Reveal>
              <Reveal>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-border bg-muted shadow-soft">
                  <Image
                    src="/lab.png"
                    alt="Quality Control Testing"
                    fill
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Quality Workflow */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Multi-Stage Quality Checking</h2>
              <p className="mt-3 text-muted-foreground">
                We monitor formulation parameters across four key quality control (QC) gates to guarantee batch-to-batch uniformity.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {testingSteps.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <div className="h-full rounded-[2rem] border border-border bg-card p-8 shadow-soft hover:border-primary/45 transition-colors">
                    <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                      <s.icon className="size-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Certifications */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-muted shadow-soft">
                <Image
                  src="/manufacturing.png"
                  alt="Quality assurance certifications"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight">Compliance & Global Standards</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Our quality systems undergo routine audits from both local and international regulatory authorities. We maintain full traceability of batches, ensuring that complete records of raw material certificates of analysis (CoA), production parameters, and lab check outcomes are archived securely.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="text-sm font-semibold">WHO-GMP certification for manufacturing</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="text-sm font-semibold">ISO 9001:2015 Quality Management Systems</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="text-sm font-semibold">GLP (Good Laboratory Practices) compliance</span>
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
