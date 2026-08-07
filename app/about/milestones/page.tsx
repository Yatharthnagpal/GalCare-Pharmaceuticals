"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import Link from "next/link"
import { 
  TrendingUp, 
  MapPin, 
  Building2, 
  Factory, 
  Users, 
  Award, 
  Sparkles, 
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Globe2
} from "lucide-react"

const milestones = [
  {
    year: "2008",
    title: "Foundation in Rajasthan",
    location: "Jaipur, Rajasthan",
    icon: Building2,
    badge: "Inception Milestone",
    description: "Galcare Pharmaceutical Pvt. Ltd. was incorporated in Jaipur, Rajasthan by Founder Devkant Bhardwaj. Established with a single, clear objective: to provide quality, innovative therapeutic solutions and dermatological care to every Indian.",
    details: [
      "Founded by Devkant Bhardwaj in Jaipur",
      "Core dictums established: Excellence through People & Innovation",
      "Focused on precision prescription dermatology formulations"
    ]
  },
  {
    year: "2009",
    title: "Expansion into Uttar Pradesh",
    location: "Uttar Pradesh",
    icon: MapPin,
    badge: "North India Reach",
    description: "Expanded prescription marketing operations into North India's largest healthcare market, building strong clinical trust with dermatologists and medical practitioners across Uttar Pradesh.",
    details: [
      "Strategic entry into major UP medical hubs",
      "Rapidly built prescription trust among top dermatologists",
      "Established regional supply chain network"
    ]
  },
  {
    year: "2011",
    title: "Entry into Pune & Maharashtra",
    location: "Pune, Maharashtra",
    icon: MapPin,
    badge: "Western India Hub",
    description: "Established operations in Pune, opening up Western India. Introduced innovative topical dermatology formulations and expanded field force teams across Maharashtra.",
    details: [
      "Western India headquarters operationalized in Pune",
      "Expanded product footprint across dermatological clinics",
      "Strengthened medical representative network"
    ]
  },
  {
    year: "2015",
    title: "Expansion to Madhya Pradesh & Hyderabad",
    location: "Madhya Pradesh & Telangana/AP",
    icon: MapPin,
    badge: "Central & South Expansion",
    description: "Multi-market expansion into Central India (Madhya Pradesh) and South India's pharma capital (Hyderabad). Launched specialized anti-fungal and barrier-repair dermatology lines.",
    details: [
      "Dual market entry: MP & Hyderabad",
      "Formulation portfolio expanded to 40+ SKUs",
      "Strong doctor patronage established in South India"
    ]
  },
  {
    year: "2018–2019",
    title: "Pan-India Expansion (25–26 States)",
    location: "Nationwide India",
    icon: Globe2,
    badge: "National Footprint",
    description: "Scaled operations across 25 to 26 states in India, achieving a truly nationwide distribution network. Recognized as one of India's premier prescription-oriented dermatology companies.",
    details: [
      "Active presence across 25–26 Indian states",
      "First-time-in-India product introduction milestones achieved",
      "Prescribed by over 30,000 doctors nationwide"
    ]
  },
  {
    year: "2021",
    title: "500+ Employee Workforce Milestone",
    location: "India Operations",
    icon: Users,
    badge: "People & Growth",
    description: "Crossed the milestone of 500+ dedicated associates and employees across corporate headquarters, sales development, supply chain, and regulatory affairs.",
    details: [
      "Workforce expanded past 500+ professionals",
      "Enhanced internal promotion programs & career development",
      "Homely, rewarding workplace culture celebrated"
    ]
  },
  {
    year: "2023",
    title: "Own WHO-GMP Manufacturing Unit",
    location: "Rajasthan Facility",
    icon: Factory,
    badge: "Manufacturing Milestone",
    description: "Commissioned our own state-of-the-art, WHO & GMP certified formulation manufacturing plant in Rajasthan. Equipped with high-tech automated lines, climate chambers, and API testing labs.",
    details: [
      "In-house WHO-GMP certified formulation plant started in Rajasthan",
      "Dedicated topical creams, gels, lotions & oral tablet production",
      "Third-party manufacturing division established"
    ]
  },
  {
    year: "2024–2026",
    title: "Advanced R&D & Global Reach",
    location: "Global & Domestic Markets",
    icon: Sparkles,
    badge: "Future Vision",
    description: "Pioneering next-generation photoprotection, acne care, skin barrier repair, and global export initiatives. Consistently setting new industry benchmarks in formulation efficacy.",
    details: [
      "Expanded export footprint across international markets",
      "Continuous R&D in novel lipid delivery & API bioavailability",
      "Solidified position as eminence among premier pharma companies"
    ]
  }
]

export default function MilestonesPage() {
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
            <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6 text-center">
            <Reveal className="mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary border border-primary/20">
                <TrendingUp className="size-3.5" /> Historical Journey
              </span>
              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Galcare Milestones: <span className="text-gradient">2008 to Present.</span>
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
                From a single vision in Jaipur, Rajasthan to a nationwide pharmaceutical leader with 500+ employees, 26 states network, and our own WHO-GMP manufacturing unit.
              </p>
            </Reveal>

            {/* Quick Metrics Bar */}
            <Reveal delay={0.1} className="mt-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-6 rounded-[2rem] border border-border bg-card shadow-soft">
                <div className="p-4 border-r border-border/50 last:border-r-0">
                  <div className="text-3xl font-black text-gradient">2008</div>
                  <div className="text-xs text-muted-foreground font-medium mt-1">Founded in Rajasthan</div>
                </div>
                <div className="p-4 border-r border-border/50 last:border-r-0">
                  <div className="text-3xl font-black text-gradient">26</div>
                  <div className="text-xs text-muted-foreground font-medium mt-1">States Served</div>
                </div>
                <div className="p-4 border-r border-border/50 last:border-r-0">
                  <div className="text-3xl font-black text-gradient">500+</div>
                  <div className="text-xs text-muted-foreground font-medium mt-1">Dedicated Team</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-black text-gradient">2023</div>
                  <div className="text-xs text-muted-foreground font-medium mt-1">WHO-GMP Plant Started</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Timeline Roadmap */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4 md:px-6">
            <div className="relative border-l-2 border-primary/30 pl-6 md:pl-10 space-y-12 ml-4 md:ml-12">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.05}>
                  <div className="relative group">
                    {/* Timeline Node Icon */}
                    <div className="absolute -left-[37px] md:-left-[53px] top-1.5 grid size-10 md:size-12 place-items-center rounded-2xl bg-card border-2 border-primary text-primary shadow-soft group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <m.icon className="size-5 md:size-6" />
                    </div>

                    {/* Timeline Card */}
                    <div className="rounded-[2rem] border border-border bg-card p-6 md:p-8 shadow-soft hover:shadow-strong hover:border-primary/40 transition-all duration-300">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="text-3xl font-black text-gradient">{m.year}</span>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          {m.badge}
                        </span>
                      </div>

                      <h3 className="mt-3 text-2xl font-bold text-foreground">{m.title}</h3>
                      <p className="text-xs font-semibold text-primary flex items-center gap-1.5 mt-1">
                        <MapPin className="size-3.5" /> {m.location}
                      </p>

                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.description}</p>

                      <ul className="mt-6 space-y-2 border-t border-border pt-4">
                        {m.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                            <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
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
