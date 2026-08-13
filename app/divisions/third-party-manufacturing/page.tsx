"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import Image from "next/image"
import { Factory, CheckCircle2, ShieldCheck, ArrowLeft, ArrowRight, Calculator } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

const benefits = [
  { title: "WHO-GMP Certified Facilities", text: "Production processes conform to highest international safety and hygienic standards." },
  { title: "Modern Automation Lines", description: "Equipped with high-speed automated packaging, filling, and tableting machines." },
  { title: "End-to-End QA/QC", text: "Strict checks from raw material receipt, in-process processing, to finished batch release." },
  { title: "Custom Formulation & Design", text: "Our R&D team helps tailor formulations and designs to match your market needs." }
]

export default function ThirdPartyPage() {
  const { openAuthModal } = useAuth()

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <section className="relative overflow-hidden py-12 md:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/3 top-10 h-[300px] w-[600px] rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal>
              <Link
                href="/#divisions"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <ArrowLeft className="size-4" /> Back to Divisions
              </Link>
            </Reveal>

            <div className="mt-8 grid gap-12 lg:grid-cols-2 items-center">
              <Reveal>
                <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
                  Third-Party Contract Manufacturing
                </span>
                <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                  Your trusted scale <span className="text-gradient">manufacturing partner.</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Galcare offers high-quality third-party and contract manufacturing services for prestigious clients. Backed by our modern, WHO-GMP certified facilities, rigorous testing capabilities, and robust supply chains, we manufacture stable and cost-efficient dermatological and cosmeceutical formulations.
                </p>
              </Reveal>
              <Reveal>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-border bg-muted shadow-soft">
                  <Image
                    src="/manufacturing.png"
                    alt="WHO-GMP Manufacturing Facility"
                    fill
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-12 bg-card border-y border-border">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.1}>
                  <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                    <Factory className="size-8 text-primary" />
                    <h3 className="mt-4 font-bold text-lg">{b.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{b.text || b.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Section with Partner Registration CTA Modal Trigger */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-12 lg:grid-cols-2 items-stretch">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Comprehensive Manufacturing Capabilities
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                We handle turnkey formulation development, scale-up batch trials, commercial production, and stability testing across a wide variety of therapeutic dosages:
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="text-sm font-semibold">Creams, Ointments & Gels (Derma)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="text-sm font-semibold">Tablets & Capsules (Solid Oral Doses)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="text-sm font-semibold">Liquid Oral Suspensions & Syrups</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="text-sm font-semibold">Hair Serums, Lotions & Shampoos</span>
                </li>
              </ul>
              <div className="mt-8 rounded-2xl border border-border p-6 bg-card">
                <div className="flex gap-4">
                  <ShieldCheck className="size-10 text-primary" />
                  <div>
                    <h4 className="font-bold">Regulatory Support</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We offer full support for dossier filings, product registration, packaging design, stability studies, and quality documentation.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right side: Request Custom Quote Card */}
            <Reveal>
              <div className="rounded-3xl border border-border bg-gradient-to-b from-card to-accent/30 p-8 md:p-10 shadow-soft flex flex-col justify-center items-start text-left h-full">
                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Calculator className="size-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Request Custom Manufacturing Quote
                </h3>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                  Ready to scale your pharmaceutical production or request custom WHO-GMP manufacturing quotes? Submit your batch specifications, dosage forms, and packaging style to receive an instant RFQ proposal from our business development team.
                </p>

                <div className="mt-8 w-full space-y-4">
                  <Link
                    href="/register"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 font-bold text-base text-primary-foreground shadow-glow hover:bg-primary/95 hover:scale-[1.02] transition-all"
                  >
                    Request Quote <ArrowRight className="size-5" />
                  </Link>
                  <p className="text-center text-xs text-muted-foreground w-full">
                    Need technical formulation support?{" "}
                    <Link
                      href="/contact"
                      className="font-semibold text-primary underline underline-offset-2"
                    >
                      Contact our R&D Team
                    </Link>
                  </p>
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
