"use client"

import { useState, useEffect } from "react"
import { Reveal } from "@/components/motion-primitives"
import { AdaptiveImage } from "@/components/ui/adaptive-image"
import { ArrowRight, Handshake, ShieldCheck, Building2, MapPin, Award } from "lucide-react"

interface PartnerItem {
  id: string | number
  image: string
  alt: string
  location?: string
}

const DEFAULT_PARTNERS: PartnerItem[] = [
  { id: "partner-5", image: "/partners/partner5.png", alt: "Medieos Lifesciences LLP", location: "Chandigarh, India" },
  { id: "partner-6", image: "/partners/partner6.png", alt: "SEIKOMAX Healthcare", location: "Baddi, HP" },
  { id: "partner-7", image: "/partners/partner7.png", alt: "OPUS Therapeutics", location: "Jaipur, Rajasthan" },
  { id: "partner-8", image: "/partners/partner8.png", alt: "Novastream Healthcare", location: "Ahmedabad, Gujarat" },
  { id: "partner-9", image: "/partners/partner9.png", alt: "Novalife Healthcare", location: "Bengaluru, India" },
  { id: "partner-10", image: "/partners/partner10.png", alt: "Oxanto Life Sciences", location: "Pune, Maharashtra" },
  { id: "partner-11", image: "/partners/partner11.png", alt: "Racoon Healthcare", location: "Hyderabad, India" },
  { id: "partner-12", image: "/partners/partner12.png", alt: "Dawchem Pharmaceuticals", location: "Ambala, Haryana" },
  { id: "partner-13", image: "/partners/partner13.png", alt: "ALTUNATE Health Care", location: "Indore, MP" },
  { id: "partner-14", image: "/partners/partner14.png", alt: "Glocutis Healthcare", location: "Chennai, India" },
  { id: "partner-15", image: "/partners/partner15.png", alt: "Max Pharma", location: "Baddi, HP" },
  { id: "partner-16", image: "/partners/partner16.png", alt: "CIBA Biogenics", location: "Mumbai, India" },
  { id: "partner-17", image: "/partners/partner17.png", alt: "B-Lilly Healthcare", location: "Jaipur, Rajasthan" },
]

function CircularLogoCard({ partner, delay }: { partner: PartnerItem; delay: number }) {
  const isDataOrBlob = typeof partner.image === "string" && (partner.image.startsWith("data:") || partner.image.startsWith("blob:") || partner.image.startsWith("http"));

  return (
    <Reveal delay={delay}>
      <div className="group relative size-20 sm:size-24 md:size-28 rounded-2xl border border-border/80 bg-white/95 dark:bg-slate-900/90 shadow-soft transition-all duration-300 hover:scale-105 hover:border-primary/60 hover:shadow-glow flex flex-col items-center justify-center p-3 cursor-pointer">
        <div className="relative size-full overflow-hidden flex items-center justify-center">
          {isDataOrBlob ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={partner.image}
              alt={partner.alt}
              className="size-full object-contain p-1 transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <AdaptiveImage
              src={partner.image}
              alt={partner.alt}
              fill
              className="object-contain p-1 transition-transform duration-500 group-hover:scale-110"
            />
          )}
        </div>
        <span className="mt-1 text-[9px] font-semibold text-muted-foreground text-center truncate max-w-full group-hover:text-primary transition-colors">
          {partner.alt.split(" ")[0]}
        </span>
      </div>
    </Reveal>
  )
}

export function Partners() {
  const [partners, setPartners] = useState<PartnerItem[]>(DEFAULT_PARTNERS)

  useEffect(() => {
    const loadPartners = () => {
      const saved = localStorage.getItem("galcare_partners")
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed) && parsed.length > 0) {
            const formatted: PartnerItem[] = parsed.map((p: { id?: string; name?: string; logoUrl?: string }, idx: number) => ({
              id: p.id || `slot-${idx + 1}`,
              image: p.logoUrl || DEFAULT_PARTNERS[idx]?.image || "/partners/partner1.svg",
              alt: p.name || `Partner ${idx + 1}`,
            }))
            setPartners(formatted)
            return
          }
        } catch (e) {
          console.error("Failed to parse custom partners", e)
        }
      }
      setPartners(DEFAULT_PARTNERS)
    }

    loadPartners()
    window.addEventListener("storage", loadPartners)
    window.addEventListener("galcare_partners_updated", loadPartners)
    window.addEventListener("focus", loadPartners)

    return () => {
      window.removeEventListener("storage", loadPartners)
      window.removeEventListener("galcare_partners_updated", loadPartners)
      window.removeEventListener("focus", loadPartners)
    }
  }, [])

  return (
    <section id="partners" className="relative py-12 md:py-18 bg-card border-t border-border overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Section Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20">
            <Building2 className="size-3.5" /> 17+ Strategic Corporate Partners
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Our Global Production Network & Client Roster
          </h2>
          <p className="mt-3 text-base md:text-lg leading-relaxed text-muted-foreground">
            GalCare powers contract manufacturing, active API formulation, and PCD distribution for over 17 leading pharmaceutical brands across 26 states in India.
          </p>
        </Reveal>

        {/* Infinite Marquee Ticker */}
        <div className="mt-10 relative w-full overflow-hidden py-4 border-y border-border/60 bg-muted/20 backdrop-blur-sm rounded-2xl">
          <div className="flex w-max animate-marquee space-x-6">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`marquee-${partner.id}-${index}`}
                className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/80 px-4 py-2 text-xs font-medium text-foreground shadow-xs"
              >
                <div className="relative size-6 shrink-0">
                  <AdaptiveImage src={partner.image} alt={partner.alt} fill className="object-contain" />
                </div>
                <span className="font-semibold whitespace-nowrap">{partner.alt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive 17 Partner Grid */}
        <div className="mt-10">
          <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4 md:gap-5 max-w-6xl mx-auto">
            {partners.map((partner, i) => (
              <CircularLogoCard key={partner.id} partner={partner} delay={i * 0.02} />
            ))}
          </div>
        </div>

        {/* Distribution Metrics Banner */}
        <Reveal className="mt-12 max-w-5xl mx-auto rounded-3xl border border-border bg-gradient-to-r from-card via-accent/30 to-card p-6 sm:p-8 shadow-soft">
          <div className="grid gap-6 sm:grid-cols-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-border/60">
            <div className="pt-3 sm:pt-0 sm:px-4">
              <div className="flex justify-center text-primary mb-1">
                <MapPin className="size-5" />
              </div>
              <p className="text-3xl font-extrabold text-foreground">26 States</p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pan-India Distribution</p>
            </div>
            <div className="pt-3 sm:pt-0 sm:px-4">
              <div className="flex justify-center text-primary mb-1">
                <Building2 className="size-5" />
              </div>
              <p className="text-3xl font-extrabold text-foreground">17+ Brands</p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Corporate Alliances</p>
            </div>
            <div className="pt-3 sm:pt-0 sm:px-4">
              <div className="flex justify-center text-primary mb-1">
                <ShieldCheck className="size-5" />
              </div>
              <p className="text-3xl font-extrabold text-foreground">WHO-GMP</p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Certified Plants</p>
            </div>
            <div className="pt-3 sm:pt-0 sm:px-4">
              <div className="flex justify-center text-primary mb-1">
                <Award className="size-5" />
              </div>
              <p className="text-3xl font-extrabold text-foreground">30,000+</p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Prescribing Doctors</p>
            </div>
          </div>
        </Reveal>

        {/* Contract Manufacturing Call-to-Action */}
        <Reveal className="mt-10 text-center">
          <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-soft relative overflow-hidden">
            <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Handshake className="size-6" />
            </div>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Partner With GalCare For Contract Manufacturing
            </h3>
            <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Join over 17 prestigious healthcare companies. Leverage our WHO-GMP certified facilities, custom formulation R&D, and bulk manufacturing capabilities.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:bg-primary/95 hover:scale-[1.02]"
              >
                Become a Partner <ArrowRight className="size-4" />
              </a>
              <a
                href="/divisions/third-party-manufacturing"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
              >
                Manufacturing Quote Calculator
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
