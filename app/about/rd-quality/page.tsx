"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import Image from "next/image"
import Link from "next/link"
import { 
  Factory, 
  FlaskConical, 
  BadgeCheck, 
  ShieldCheck, 
  ClipboardCheck, 
  Sparkles, 
  ArrowLeft,
  CheckCircle2,
  Microscope,
  FileCheck,
  Building2
} from "lucide-react"

const qcSteps = [
  {
    icon: ClipboardCheck,
    title: "1. API & Raw Material Assay",
    description: "Rigorous analytical testing of Active Pharmaceutical Ingredients (APIs) and excipients upon receipt. Verifying purity, assay percentages, and particle size distribution before batch formulation."
  },
  {
    icon: FlaskConical,
    title: "2. Chemical & Physical QC",
    description: "In-line monitoring of formulation pH, viscosity, emulsification stability, density, and rheology in real-time during mixing and filling stages."
  },
  {
    icon: Microscope,
    title: "3. Microbiological Sterile Assays",
    description: "Culturing in cleanroom chambers to guarantee zero bacterial or fungal bio-burden. Validating preservative efficacy for multi-use topical creams and lotions."
  },
  {
    icon: ShieldCheck,
    title: "4. Post-Market Stability Retention",
    description: "Retaining reference batch samples in ICH-compliant climate chambers (25°C/60% RH & 40°C/75% RH) to verify shelf life stability over 24 to 36 months."
  }
]

const certifications = [
  { title: "WHO-GMP Certified Plant", text: "In-house formulation unit in Rajasthan certified under World Health Organization Good Manufacturing Practices." },
  { title: "ISO 9001:2015 Standard", text: "Certified Quality Management Systems ensuring standardized SOPs across production, packaging, and dispatch." },
  { title: "GLP Compliant Laboratories", text: "Good Laboratory Practices observed in our chemical analysis and microbiological testing chambers." },
  { title: "DCGI & Regulatory Filings", text: "All formulations comply with Drug Controller General of India (DCGI) guidelines and stability requirements." }
]

export default function RDQualityPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        {/* Navigation Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to About Galcare
          </Link>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-1/4 top-0 h-[400px] w-[800px] rounded-full bg-primary/10 blur-[120px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary border border-primary/20">
                  <Factory className="size-3.5" /> Research & Quality Assurance
                </span>
                <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Formulation Rigor & <span className="text-gradient">WHO-GMP Quality.</span>
                </h1>
                <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
                  At Galcare, quality is not a static check—it is our identity. From sourcing top-grade API makes to manufacturing in our 2023 WHO-GMP certified plant in Rajasthan, we ensure precision in every dose.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-border shadow-2xl bg-card">
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

        {/* Own Manufacturing Facility Section */}
        <section className="py-16 bg-muted/20 border-y border-border/50">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-border shadow-soft">
                <Image
                  src="/manufacturing.png"
                  alt="Galcare Manufacturing Plant in Rajasthan"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
                In-House Plant (Est. 2023)
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                State-of-the-Art Formulation Plant in Rajasthan
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                In 2023, Galcare commissioned its own WHO & GMP certified manufacturing facility in Rajasthan. Built to modern pharmaceutical standards, the plant houses automated manufacturing lines for creams, gels, ointments, lotions, and specialized oral formulations.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary shrink-0" />
                  <span className="text-sm font-semibold text-foreground">WHO-GMP & ISO 9001:2015 certified infrastructure</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary shrink-0" />
                  <span className="text-sm font-semibold text-foreground">Automated vacuum emulsifiers & touch-free filling lines</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary shrink-0" />
                  <span className="text-sm font-semibold text-foreground">Dedicated Third-Party Contract Manufacturing division</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Multi-Gate Quality Checking */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
                4-Stage QC Architecture
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Multi-Stage Quality Checking Gates
              </h2>
              <p className="mt-3 text-muted-foreground">
                We monitor formulation parameters across four stringent QC gates to guarantee zero-defect batch uniformity.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {qcSteps.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08}>
                  <div className="h-full rounded-[2rem] border border-border bg-card p-6 md:p-8 shadow-soft hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
                    <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <step.icon className="size-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications & Compliance Grid */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
                Regulatory Standards
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Certifications & Global Compliance
              </h2>
              <p className="mt-3 text-muted-foreground">
                Our manufacturing and quality systems undergo rigorous periodic audits by health authorities.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {certifications.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                    <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                      <BadgeCheck className="size-5" />
                    </div>
                    <h4 className="mt-4 text-base font-bold text-foreground">{c.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
