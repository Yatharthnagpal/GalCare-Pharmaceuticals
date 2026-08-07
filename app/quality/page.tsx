"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import Image from "next/image"
import Link from "next/link"
import { BadgeCheck, ShieldCheck, FlaskConical, ClipboardCheck, CheckCircle2, Factory, Microscope, ArrowLeft } from "lucide-react"

const testingSteps = [
  { icon: ClipboardCheck, title: "1. API Assay Verification", text: "Verifying active pharmaceutical ingredients (APIs) and excipient purity before batch release." },
  { icon: FlaskConical, title: "2. Chemical & Physical QC", text: "Monitoring pH, viscosity, density, and particle size distribution in real-time." },
  { icon: Microscope, title: "3. Microbiological Assay", text: "Running culture testing in sterile chambers to guarantee zero bacterial or fungal loading." },
  { icon: ShieldCheck, title: "4. Post-Market Stability", text: "Storing reference samples in climate chambers to monitor quality over product lifetime." }
]

export default function QualityPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to About Galcare
          </Link>
        </div>

        <section className="relative overflow-hidden py-12 md:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-1/4 top-10 h-[300px] w-[600px] rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <Reveal>
                <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
                  WHO-GMP Certified Quality
                </span>
                <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Uncompromised quality, <span className="text-gradient">verified at every step.</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Guided by Founder Devkant Bhardwaj's core dictum—<em className="text-foreground font-medium">"Excellence through People & Innovation"</em>—our commitment to quality is backed by our own 2023 WHO-GMP certified formulation manufacturing unit in Rajasthan and top-tier API sourcing.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-border bg-muted shadow-soft">
                  <Image
                    src="/images/placeholders/rd-team.png"
                    alt="Galcare Indian R&D and Quality Control Scientist Team"
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
            <Reveal delay={0.1}>
              <h2 className="text-3xl font-bold tracking-tight">Compliance & Manufacturing Standards</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Our WHO-GMP certified formulation plant in Rajasthan undergoes routine audits. We maintain full batch traceability with archived records of API Certificate of Analysis (CoA), production parameters, and lab check outcomes.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="text-sm font-semibold">WHO-GMP certification for formulation manufacturing</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="text-sm font-semibold">ISO 9001:2015 Quality Management Systems</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="text-sm font-semibold">GLP (Good Laboratory Practices) compliance</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="text-sm font-semibold">DCGI approvals for first-time-in-India formulations</span>
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
