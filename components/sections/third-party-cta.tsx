"use client"

import { useState } from "react"
import { AdaptiveImage } from "@/components/ui/adaptive-image"
import { motion, type Variants } from "motion/react"
import { Reveal } from "@/components/motion-primitives"
import { Award, ShieldCheck, TestTube, Boxes, ArrowRight, Handshake, Calculator, CheckCircle2, FileDown, Clock, Building2, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

const certs = ["WHO-GMP", "ISO 9001", "ISO 14001", "GLP Certified"]

const processSteps = [
  { icon: TestTube, title: "R&D & Formulation", text: "Molecule design and stability validation." },
  { icon: Boxes, title: "Precision Production", text: "Automated GMP-controlled production lines." },
  { icon: ShieldCheck, title: "Quality Testing", text: "Multi-stage QC on every single batch." },
  { icon: Award, title: "Pan-India Logistics", text: "Robust distribution across 26 Indian states & export hubs." },
]

// Genuine Client Partner Logos (13 Partners: partner5 through partner17)
const row1Partners = [
  { id: 5, image: "/partners/partner5.png", alt: "Medieos Lifesciences LLP" },
  { id: 6, image: "/partners/partner6.png", alt: "SEIKOMAX Healthcare" },
  { id: 7, image: "/partners/partner7.png", alt: "OPUS Therapeutics" },
  { id: 8, image: "/partners/partner8.png", alt: "Novastream Healthcare" },
  { id: 9, image: "/partners/partner9.png", alt: "Novalife Healthcare" },
  { id: 10, image: "/partners/partner10.png", alt: "Oxanto Life Sciences" },
  { id: 11, image: "/partners/partner11.png", alt: "Racoon Healthcare" },
]

const row2Partners = [
  { id: 12, image: "/partners/partner12.png", alt: "Dawchem Pharmaceuticals" },
  { id: 13, image: "/partners/partner13.png", alt: "ALTUNATE Health Care" },
  { id: 14, image: "/partners/partner14.png", alt: "Glocutis Healthcare" },
  { id: 15, image: "/partners/partner15.png", alt: "Max Pharma" },
  { id: 16, image: "/partners/partner16.png", alt: "CIBA Biogenics" },
  { id: 17, image: "/partners/partner17.png", alt: "B-Lilly Healthcare" },
]

const DOSAGE_FORMS = [
  { id: "tablets", label: "Tablets (Coated / Uncoated)", minBatch: 50000, baseLead: 14, icon: "💊" },
  { id: "capsules", label: "Hard Gelatin / Softgel Capsules", minBatch: 30000, baseLead: 16, icon: "🧪" },
  { id: "ointments", label: "Ointments, Creams & Gels", minBatch: 10000, baseLead: 12, icon: "🧴" },
  { id: "syrups", label: "Oral Liquids & Syrups", minBatch: 15000, baseLead: 15, icon: "🧪" },
  { id: "topicals", label: "Dermatological Lotions & Serums", minBatch: 10000, baseLead: 10, icon: "✨" },
]

const PACKAGING_STYLES = [
  { id: "blister", label: "Blister Pack (PVC / PVDC)" },
  { id: "alu-alu", label: "Alu-Alu Strip Packaging" },
  { id: "bottle", label: "HDPE / Pet Bottle with Child Lock" },
  { id: "tube", label: "Laminated / Aluminum Squeeze Tube" },
]

function CircularLogoCard({ partner, delay }: { partner: typeof row1Partners[0]; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="group relative size-20 sm:size-24 md:size-28 lg:size-32 rounded-full overflow-hidden border border-border/80 bg-white shadow-soft transition-all duration-300 hover:scale-110 hover:border-primary/60 hover:shadow-glow flex items-center justify-center p-2.5 cursor-pointer">
        <div className="relative size-full rounded-full overflow-hidden flex items-center justify-center">
          <AdaptiveImage
            src={partner.image}
            alt={partner.alt}
            fill
            className="object-contain p-2 rounded-full transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>
    </Reveal>
  )
}

export function ThirdPartyCTA() {
  // Wizard state
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3 | 4>(1)
  const [selectedForm, setSelectedForm] = useState(DOSAGE_FORMS[0])
  const [batchVolume, setBatchVolume] = useState<number>(50000)
  const [selectedPackaging, setSelectedPackaging] = useState(PACKAGING_STYLES[0])
  const [clientCompany, setClientCompany] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState(false)

  // Motion variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const stepVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  }

  const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.6, ease: "easeInOut" as const }
    }
  }

  const calculatedLeadTimeDays = selectedForm.baseLead + (batchVolume > 100000 ? 5 : 0)
  const estimatedCostRange = `₹${((batchVolume * (selectedForm.id === "ointments" ? 4.5 : 1.8)) / 100000).toFixed(2)} Lakhs - ₹${((batchVolume * (selectedForm.id === "ointments" ? 6.5 : 2.5)) / 100000).toFixed(2)} Lakhs`

  const handleWizardSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: clientCompany,
          phone: clientPhone,
          requirements: `${selectedForm.label} - ${batchVolume.toLocaleString()} units (${selectedPackaging.label})`,
          message: `Calculated Estimate: ${estimatedCostRange}, Lead Time: ${calculatedLeadTimeDays} days`,
        }),
      })

      if (res.ok) {
        setSubmissionSuccess(true)
      }
    } catch (err) {
      console.warn("Quote calculation submission error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDownloadRFQ = () => {
    if (typeof window !== "undefined") {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>GalCare Contract Manufacturing RFQ - ${selectedForm.label}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 40px; color: #0f172a; }
                .header { border-bottom: 2px solid #0284c7; padding-bottom: 15px; margin-bottom: 20px; }
                .title { font-size: 24px; font-weight: bold; color: #0284c7; }
                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
                .box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; }
                .footer { margin-top: 40px; font-size: 11px; color: #64748b; text-align: center; }
              </style>
            </head>
            <body>
              <div class="header">
                <div class="title">GalCare Pharmaceuticals — RFQ Specification Draft</div>
                <div>WHO-GMP Certified Contract Manufacturing Estimate</div>
              </div>
              <div class="grid">
                <div class="box"><strong>Dosage Form:</strong> ${selectedForm.label}</div>
                <div class="box"><strong>Batch Quantity:</strong> ${batchVolume.toLocaleString()} Units</div>
                <div class="box"><strong>Packaging Style:</strong> ${selectedPackaging.label}</div>
                <div class="box"><strong>Est. Lead Time:</strong> ${calculatedLeadTimeDays} Days</div>
                <div class="box"><strong>Estimated Budget:</strong> ${estimatedCostRange}</div>
                <div class="box"><strong>Client Company:</strong> ${clientCompany || "Draft Request"}</div>
              </div>
              <div class="footer">
                Generated via GalCare Digital B2B Portal • Official Sales Inquiry: contact@galcare.com
              </div>
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  return (
    <section id="third-party-manufacturing" className="relative py-12 md:py-28 bg-card border-t border-border overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Split layout (Text left, facility image with human inset right) */}
        <div className="grid gap-12 items-center lg:grid-cols-2 mt-10">
          <div className="text-center lg:text-left">
            <Reveal className="mx-auto lg:mx-0 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Prestigious Clients & Production Network
              </span>
              <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Third-Party Manufacturing & Prestigious Clients
              </h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                Galcare powers contract manufacturing, active molecule sourcing, and distribution for leading healthcare and dermatological brands worldwide.
              </p>
            </Reveal>

            <Reveal className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
              {certs.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-soft"
                >
                  {c}
                </span>
              ))}
            </Reveal>
          </div>

          <Reveal>
            <div className="relative rounded-[2rem] border border-border shadow-soft aspect-[1.3] w-full overflow-hidden bg-muted">
              {/* Big facility image */}
              <AdaptiveImage
                src="/manufacturing.png"
                alt="Galcare WHO-GMP manufacturing facility"
                fill
                className="object-cover"
              />

              {/* Smaller circular inset showing quality control technician inspecting product */}
              <div className="absolute bottom-6 right-6 z-20 size-28 md:size-36 overflow-hidden rounded-full border-[4px] border-card shadow-xl transition-transform duration-500 hover:scale-105">
                <AdaptiveImage
                  src="/images/placeholders/qc-technician-inspection.png"
                  alt="Quality control technician inspecting product"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Horizontal steps sequential animation section (DESKTOP) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-20 gap-8 grid-cols-4 relative hidden lg:grid"
        >
          {processSteps.map((step, i) => {
            const isLast = i === processSteps.length - 1
            const StepIcon = step.icon
            return (
              <div key={step.title} className="relative flex flex-col items-center text-center group">
                
                {/* Node icon with hover scale-up */}
                <motion.div
                  variants={stepVariants}
                  className="z-10 grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary border border-primary/25 shadow-soft transition-transform duration-300 group-hover:scale-110"
                >
                  <StepIcon className="size-7" />
                </motion.div>

                {/* Connecting fill line */}
                {!isLast && (
                  <div className="absolute top-8 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-[2px] bg-border hidden lg:block overflow-hidden z-0">
                    <motion.div
                      variants={lineVariants}
                      className="h-full bg-primary origin-left"
                    />
                  </div>
                )}

                <motion.div variants={stepVariants} className="mt-5">
                  <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground max-w-[220px] mx-auto">{step.text}</p>
                </motion.div>
              </div>
            )
          })}
        </motion.div>

        {/* Zigzag Vertical steps timeline (MOBILE / TABLET) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative mt-12 space-y-1 lg:hidden"
        >
          {/* Central vertical line */}
          <div className="absolute left-1/2 top-3 bottom-3 w-[2px] bg-primary/20 -translate-x-1/2" />
          
          {processSteps.map((step, i) => {
            const isEven = i % 2 === 0
            const StepIcon = step.icon
            return (
              <div key={step.title} className="grid grid-cols-2 gap-2 relative items-center">
                
                {/* Central Node Dot on the timeline */}
                <div className="absolute left-1/2 size-9 rounded-full border-2 border-primary bg-card -translate-x-1/2 grid place-items-center z-20 shadow-glow">
                  <span className="text-xs font-bold text-primary">0{i + 1}</span>
                </div>

                {/* Left Column */}
                <div className={cn(
                  "flex flex-col",
                  isEven ? "items-end pr-5" : "invisible pointer-events-none"
                )}>
                  {isEven && (
                    <motion.div
                      variants={stepVariants}
                      className="flex flex-col items-center text-center rounded-2xl border border-border bg-card py-2 px-3 shadow-soft w-full max-w-[170px] md:max-w-[220px]"
                    >
                      <div className="flex items-center justify-center gap-1.5 text-primary mb-0.5">
                        <StepIcon className="size-6" />
                      </div>
                      <h4 className="font-semibold text-sm leading-tight text-foreground">{step.title}</h4>
                      <p className="mt-0.5 text-xs leading-normal text-muted-foreground">{step.text}</p>
                    </motion.div>
                  )}
                </div>

                {/* Right Column */}
                <div className={cn(
                  "flex flex-col",
                  !isEven ? "items-start pl-5" : "invisible pointer-events-none"
                )}>
                  {!isEven && (
                    <motion.div
                      variants={stepVariants}
                      className="flex flex-col items-center text-center rounded-2xl border border-border bg-card py-2 px-3 shadow-soft w-full max-w-[170px] md:max-w-[220px]"
                    >
                      <div className="flex items-center justify-center gap-1.5 text-primary mb-0.5">
                        <StepIcon className="size-6" />
                      </div>
                      <h4 className="font-semibold text-sm leading-tight text-foreground">{step.title}</h4>
                      <p className="mt-0.5 text-xs leading-normal text-muted-foreground">{step.text}</p>
                    </motion.div>
                  )}
                </div>

              </div>
            )
          })}
        </motion.div>

        {/* Interactive Configurator Wizard */}
        <Reveal className="mt-20">
          <div className="max-w-4xl mx-auto rounded-3xl border border-border bg-background p-6 sm:p-10 shadow-soft">
            <div className="flex items-center justify-between border-b border-border pb-6">
              <div className="flex items-center gap-2">
                <Calculator className="size-5 text-primary" />
                <span className="font-bold text-foreground text-sm sm:text-base">
                  {wizardStep === 1 && "Step 1: Select Dosage Form"}
                  {wizardStep === 2 && "Step 2: Batch Volume & Quantity"}
                  {wizardStep === 3 && "Step 3: Packaging Specification"}
                  {wizardStep === 4 && "Step 4: Summary & Instant RFQ"}
                </span>
              </div>
              <span className="text-xs text-muted-foreground font-semibold">Step {wizardStep} of 4</span>
            </div>

            {/* STEP 1 */}
            {wizardStep === 1 && (
              <div className="mt-6 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Choose your targeted formulation type:</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {DOSAGE_FORMS.map((form) => (
                    <button
                      key={form.id}
                      type="button"
                      onClick={() => setSelectedForm(form)}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border p-4 text-left transition-all",
                        selectedForm.id === form.id
                          ? "border-primary bg-primary/10 shadow-glow"
                          : "border-border hover:bg-accent/50"
                      )}
                    >
                      <span className="text-2xl">{form.icon}</span>
                      <div>
                        <p className="font-bold text-sm text-foreground">{form.label}</p>
                        <p className="text-[11px] text-muted-foreground">Min Batch: {form.minBatch.toLocaleString()} units</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-glow hover:bg-primary/95"
                  >
                    Next: Batch Volume <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {wizardStep === 2 && (
              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-bold text-foreground mb-2">
                    <span>Target Production Quantity</span>
                    <span className="text-primary">{batchVolume.toLocaleString()} Units</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="10000"
                    value={batchVolume}
                    onChange={(e) => setBatchVolume(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground mt-1 font-medium">
                    <span>10,000 Units</span>
                    <span>100,000 Units</span>
                    <span>500,000+ Units</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/80 bg-card p-4 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Estimated Production Timeline:</span>
                  <span className="font-bold text-foreground flex items-center gap-1">
                    <Clock className="size-3.5 text-primary" /> {calculatedLeadTimeDays} Days
                  </span>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setWizardStep(1)}
                    className="rounded-xl border border-border px-5 py-2 text-xs font-semibold text-foreground hover:bg-accent"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setWizardStep(3)}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-glow hover:bg-primary/95"
                  >
                    Next: Packaging <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {wizardStep === 3 && (
              <div className="mt-6 space-y-4">
                <p className="text-xs text-muted-foreground font-medium">Select primary packaging specification:</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {PACKAGING_STYLES.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackaging(pkg)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl border p-4 text-left transition-all",
                        selectedPackaging.id === pkg.id
                          ? "border-primary bg-primary/10 shadow-glow"
                          : "border-border hover:bg-accent/50"
                      )}
                    >
                      <span className="font-bold text-sm text-foreground">{pkg.label}</span>
                      {selectedPackaging.id === pkg.id && <CheckCircle2 className="size-4 text-primary" />}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="rounded-xl border border-border px-5 py-2 text-xs font-semibold text-foreground hover:bg-accent"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setWizardStep(4)}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-glow hover:bg-primary/95"
                  >
                    View Calculated RFQ Summary <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {wizardStep === 4 && (
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-card p-4">
                    <p className="text-[11px] text-muted-foreground font-semibold uppercase">Selected Formulation</p>
                    <p className="font-bold text-foreground text-sm mt-0.5">{selectedForm.label}</p>
                    <p className="text-xs text-muted-foreground mt-2">{batchVolume.toLocaleString()} Units ({selectedPackaging.label})</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-4">
                    <p className="text-[11px] text-muted-foreground font-semibold uppercase">Estimated Lead Time & Budget</p>
                    <p className="font-bold text-primary text-sm mt-0.5">{calculatedLeadTimeDays} Working Days</p>
                    <p className="text-xs text-foreground font-semibold mt-2">{estimatedCostRange}</p>
                  </div>
                </div>

                {!submissionSuccess ? (
                  <form onSubmit={handleWizardSubmit} className="space-y-3 pt-2">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        type="text"
                        placeholder="Company Name (Optional)"
                        value={clientCompany}
                        onChange={(e) => setClientCompany(e.target.value)}
                        className="rounded-xl border border-border bg-background px-4 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="tel"
                        placeholder="Phone / WhatsApp Number *"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="rounded-xl border border-border bg-background px-4 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
                      <button
                        type="button"
                        onClick={handleDownloadRFQ}
                        className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-accent"
                      >
                        <FileDown className="size-3.5 text-primary" /> Print / Save RFQ Spec
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-glow hover:bg-primary/95"
                      >
                        {isSubmitting ? "Submitting..." : "Submit RFQ to Manufacturing Team"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-center">
                    <CheckCircle2 className="mx-auto size-8 text-green-500 mb-2" />
                    <p className="font-bold text-sm text-foreground">RFQ Submitted Successfully!</p>
                    <p className="text-xs text-muted-foreground mt-1">Our technical team will review your batch specifications and contact you via phone/WhatsApp.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Reveal>

        {/* 17 Partner Logos Arrangement */}
        <div className="mt-20 flex flex-col items-center gap-4 sm:gap-5">
          <p className="text-xs font-bold uppercase tracking-widest text-primary text-center">
            Prestigious Production Network & Corporate Clients
          </p>
          
          {/* Row 1 (Top: 9 items) */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 max-w-6xl">
            {row1Partners.map((partner, i) => (
              <CircularLogoCard key={partner.id} partner={partner} delay={i * 0.03} />
            ))}
          </div>

          {/* Row 2 (Bottom: 8 items) */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 max-w-5xl">
            {row2Partners.map((partner, i) => (
              <CircularLogoCard key={partner.id} partner={partner} delay={0.27 + i * 0.03} />
            ))}
          </div>
        </div>

        {/* Metrics Banner */}
        <Reveal className="mt-16 max-w-4xl mx-auto rounded-3xl border border-border bg-accent/30 p-6 sm:p-8 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-3 text-center">
            <div>
              <p className="text-3xl font-extrabold text-primary">42+</p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Global Export Markets</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-primary">WHO-GMP</p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Certified Facilities</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-primary">100%</p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Batch Integrity</p>
            </div>
          </div>
        </Reveal>

        {/* Call-to-Action Section */}
        <Reveal className="mt-16 text-center">
          <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-gradient-to-b from-card to-accent/40 p-6 sm:p-10 shadow-soft">
            <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Handshake className="size-6" />
            </div>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Scale Your Pharmaceutical Production
            </h3>
            <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
              Partner with Galcare for WHO-GMP certified third-party manufacturing, custom formulations, and global regulatory support.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:bg-primary/95 hover:scale-[1.02]"
              >
                Request a Quote <ArrowRight className="size-4" />
              </a>
              <a
                href="/divisions/third-party-manufacturing"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
              >
                View Manufacturing Details
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
