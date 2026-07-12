"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import { Award, CheckCircle, Shield, FileText, Download, Building, ShieldCheck, Microscope } from "lucide-react"

const certsList = [
  {
    icon: ShieldCheck,
    title: "WHO-GMP Certification",
    issuer: "World Health Organization - Good Manufacturing Practices",
    text: "Confirms our facilities comply with highest international standards of safety, quality control, sanitization, and batch stability controls. Validated regularly via rigorous inspections.",
    docSize: "1.4 MB"
  },
  {
    icon: Award,
    title: "ISO 9001:2015",
    issuer: "International Organization for Standardization",
    text: "Demonstrates an established quality management system spanning raw material selection, intermediate process controls, packaging uniformity, and customer query resolutions.",
    docSize: "850 KB"
  },
  {
    icon: Microscope,
    title: "GLP Compliance",
    issuer: "Good Laboratory Practices",
    text: "Ensures all laboratory test runs, analytical calculations, stability chamber tests, and chromatographic assays meet international precision standards with zero room for error.",
    docSize: "1.1 MB"
  },
  {
    icon: Building,
    title: "Regulatory Approvals",
    issuer: "State Drug Control & Licensing Authorities",
    text: "Valid licenses allowing production and marketing of dermatological, cosmeceutical, and neuropsychiatric formulations for domestic use and export across 42 countries.",
    docSize: "2.1 MB"
  }
]

const safetyQA = [
  {
    title: "Routine Regulatory Audits",
    desc: "Our facilities undergo both announced and unannounced audits from state licensing boards and international regulatory authorities, ensuring continuous readiness."
  },
  {
    title: "Absolute Document Traceability",
    desc: "Every shipped batch is logged with comprehensive records from active ingredient CoA (Certificate of Analysis) to packaging line logs, allowing rapid tracking if needed."
  },
  {
    title: "Continuous Validation Protocols",
    desc: "Our formulation lines, pure water piping, air filtration ducts, and automated sealing systems undergo weekly calibration and microbial load testing."
  }
]

export default function CertificationsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        {/* Page Hero */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="max-w-3xl">
              <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                Quality Standards
              </span>
              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Certified quality, <span className="text-gradient">trusted globally.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Galcare is committed to high quality standards. Our manufacturing lines, testing labs, and product packaging are strictly certified by world-class regulatory bodies.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Certifications Display Grid */}
        <section className="py-12 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2">
              {certsList.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08}>
                  <div className="rounded-[2rem] border border-border bg-card p-8 shadow-soft flex flex-col justify-between h-full hover:border-primary/45 transition-colors">
                    <div>
                      <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                        <c.icon className="size-6" />
                      </div>
                      <h3 className="mt-6 text-2xl font-bold tracking-tight">{c.title}</h3>
                      <p className="text-xs font-semibold text-primary mt-1">{c.issuer}</p>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
                        <FileText className="size-4 text-muted-foreground/60" />
                        <span>PDF Document ({c.docSize})</span>
                      </div>
                      <button 
                        onClick={() => alert(`Downloading ${c.title} PDF certificate...`)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/95 transition-all"
                      >
                        <Download className="size-3.5" /> Download Certificate
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Integrity Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight">Our Compliance Infrastructure</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Regulatory compliance is not just about certifications; it is an ongoing daily discipline. At Galcare, we have built a standalone quality audit team that operates independently of our production division. This ensures checks are unbiased and objective.
              </p>
              <div className="mt-8 space-y-4">
                {safetyQA.map((qa, index) => (
                  <div key={index} className="flex gap-3">
                    <CheckCircle className="size-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-base">{qa.title}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{qa.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-border bg-muted shadow-soft">
              <iframe
                title="Galcare Modern Facility video placeholder"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?mute=1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                className="absolute inset-0"
              />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
