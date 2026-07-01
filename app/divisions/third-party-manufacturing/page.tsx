"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import Image from "next/image"
import { Factory, FileText, CheckCircle2, ShieldCheck, Mail, Send, ArrowLeft } from "lucide-react"

const benefits = [
  { title: "WHO-GMP Certified Facilities", text: "Production processes conform to highest international safety and hygienic standards." },
  { title: "Modern Automation Lines", description: "Equipped with high-speed automated packaging, filling, and tableting machines." },
  { title: "End-to-End QA/QC", text: "Strict checks from raw material receipt, in-process processing, to finished batch release." },
  { title: "Custom Formulation & Design", text: "Our R&D team helps tailor formulations and designs to match your market needs." }
]

export default function ThirdPartyPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    division: "Dermatology",
    quantity: "",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated form submission
    setSubmitted(true)
  }

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
                  Third-Party Contract Manufacturing
                </span>
                <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                  Your trusted scale <span className="text-gradient">manufacturing partner.</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Galcare offers high-quality third-party and contract manufacturing services for global partners. Backed by our modern, WHO-GMP certified facilities, rigorous testing capabilities, and robust supply chains, we manufacture stable and cost-efficient dermatological, neuropsychiatric, and cosmeceutical formulations.
                </p>
              </Reveal>
              <Reveal>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-border bg-muted shadow-soft">
                  <Image
                    src="/manufacturing.png"
                    alt="Manufacturing scale"
                    fill
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Manufacturing Strengths */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Our Manufacturing Strengths</h2>
              <p className="mt-3 text-muted-foreground">
                We provide reliable scalability, regulatory compliance, and packaging excellence.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft hover:border-primary/45 transition-colors">
                    <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Factory className="size-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text || b.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry Form & Scope */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-12 lg:grid-cols-2">
            {/* Left side: Process & Scope */}
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight">Capabilities & Scope</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We maintain active capacities for diverse dosage forms including:
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="text-sm font-semibold">Creams, Ointments & Gels (Derma)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="text-sm font-semibold">Tablets & Capsules (Neuro / General)</span>
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

            {/* Right side: Inquiry Form */}
            <Reveal>
              <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
                <h3 className="text-2xl font-bold">Manufacturing Inquiry</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Send us your manufacturing requirements and our business development team will respond within 24 hours.
                </p>

                {submitted ? (
                  <div className="mt-8 rounded-2xl bg-primary/10 p-6 text-center text-primary">
                    <CheckCircle2 className="mx-auto size-12" />
                    <h4 className="mt-4 font-bold text-lg">Inquiry Submitted Successfully</h4>
                    <p className="mt-2 text-sm text-primary/80">
                      Thank you for reaching out. A partner relations manager will contact you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Your Name</label>
                        <input
                          type="text"
                          required
                          className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-transparent focus:outline-primary"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Email Address</label>
                        <input
                          type="email"
                          required
                          className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-transparent focus:outline-primary"
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Phone Number</label>
                        <input
                          type="tel"
                          required
                          className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-transparent focus:outline-primary"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Company Name</label>
                        <input
                          type="text"
                          required
                          className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-transparent focus:outline-primary"
                          placeholder="Pharma Corp Inc."
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">Product Division</label>
                      <select
                        className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-card focus:outline-primary"
                        value={formData.division}
                        onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                      >
                        <option>Dermatology</option>
                        <option>Neuropsychiatric</option>
                        <option>Cosmeceuticals</option>
                        <option>OTC / General</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">Estimated Order Quantity</label>
                      <input
                        type="text"
                        required
                        className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-transparent focus:outline-primary"
                        placeholder="e.g. 10,000 units"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">Requirements & Details</label>
                      <textarea
                        rows={3}
                        required
                        className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-transparent focus:outline-primary resize-none"
                        placeholder="Describe the formulation, packaging style, and timeline details..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow hover:bg-primary/95 transition-colors"
                    >
                      <Send className="size-4" /> Send inquiry
                    </button>
                  </form>
                )}
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
