"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import Image from "next/image"
import Link from "next/link"
import { 
  ShieldCheck, 
  Target, 
  Heart, 
  Eye, 
  Award, 
  Building2, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Factory,
  Compass,
  Smile,
  HeartHandshake
} from "lucide-react"

const corePillars = [
  {
    icon: Sparkles,
    title: "Specialty Dermatology Formulations",
    description: "Creating world-class, precision-oriented dermatology products engineered with superior Active Pharmaceutical Ingredients (API make) and high bio-efficacy."
  },
  {
    icon: Users,
    title: "Homely & Rewarding Atmosphere",
    description: "Fostering a supportive, growth-oriented work environment for our 500+ associates through continuous development programs and a commitment to promotion from within."
  },
  {
    icon: HeartHandshake,
    title: "Superior Customer Satisfaction",
    description: "Earning the enduring trust of medical practitioners, dermatologists, and patients across India by consistently exceeding quality expectations."
  }
]

const values = [
  { icon: ShieldCheck, title: "Ethics & Integrity", text: "Unflinching adherence to ethical business practices, steady organic growth, and complete transparency." },
  { icon: Target, title: "Innovation First", text: "Pioneering first-time-in-India product introduction milestones that set new benchmarks in specialty care." },
  { icon: Award, title: "Excellence in API Make", text: "Sourcing and formulating with top-tier active raw materials under WHO-GMP compliance." },
  { icon: Heart, title: "Patient Centricity", text: "Placing patient safety, skin health, and affordable therapeutic solutions at the pinnacle of our priorities." }
]

const timelineHighlights = [
  { year: "2008", title: "Foundation in Rajasthan", text: "Established in Jaipur by Founder Devkant Bhardwaj with a clear objective to deliver innovative therapeutic solutions." },
  { year: "2009", title: "Uttar Pradesh Expansion", text: "Extended prescription marketing operations into North India's largest medical market." },
  { year: "2011", title: "Western India Entry", text: "Established regional hub in Pune to serve Maharashtra and surrounding markets." },
  { year: "2015", title: "MP & Hyderabad Reach", text: "Expanded footprint across Central India and Telangana/AP dermatology hubs." },
  { year: "2018–19", title: "Pan-India Footprint", text: "Achieved nationwide distribution across 25–26 states in India." },
  { year: "2023", title: "Own Manufacturing Unit", text: "Commissioned state-of-the-art WHO-GMP certified formulation plant in Rajasthan." }
]

const exploreSections = [
  {
    title: "Vision & Values",
    href: "/about/vision-values",
    description: "Explore our corporate dictum 'Excellence through People & Innovation' and core ethical values.",
    icon: Compass,
    color: "from-blue-500/10 to-indigo-500/10 text-indigo-600 dark:text-indigo-400"
  },
  {
    title: "Milestones",
    href: "/about/milestones",
    description: "Discover our growth journey from 2008 in Jaipur to nationwide expansion and WHO-GMP manufacturing.",
    icon: TrendingUp,
    color: "from-emerald-500/10 to-teal-500/10 text-teal-600 dark:text-teal-400"
  },
  {
    title: "R&D and Quality",
    href: "/about/rd-quality",
    description: "Learn about our WHO-GMP certified facility in Rajasthan, API quality testing, and R&D rigor.",
    icon: Factory,
    color: "from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400"
  }
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[450px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary border border-primary/20">
                <Building2 className="size-3.5" /> About Galcare Pharmaceuticals
              </span>
              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Driven by <span className="text-gradient">Excellence through People & Innovation.</span>
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
                Incorporated in 2008, Galcare Pharmaceutical Private Limited is a prominent, prescription-oriented pharmaceutical company dedicated to world-class dermatology formulations, ethical growth, and patient-first innovation.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Founder Spotlight */}
        <section className="py-12 bg-muted/20 border-y border-border/50">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-12 items-center">
              <div className="lg:col-span-5">
                <Reveal>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-border shadow-2xl bg-card">
                    <Image
                      src="/hero2.png"
                      alt="Devkant Bhardwaj - Founder Galcare Pharmaceuticals"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-strong border border-border">
                      <h3 className="text-xl font-bold text-foreground">Devkant Bhardwaj</h3>
                      <p className="text-sm font-semibold text-primary">Founder & Visionary Leader</p>
                      <p className="mt-1 text-xs text-muted-foreground">Galcare Pharmaceutical Pvt. Ltd.</p>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-7">
                <Reveal>
                  <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
                    Founder's Message & Philosophy
                  </span>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    "We don't just follow industry standards—we set them."
                  </h2>
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                    <p>
                      In <strong className="text-foreground font-semibold">2008</strong>, Founder <strong className="text-foreground font-semibold">Devkant Bhardwaj</strong> embarked on a journey in Rajasthan with a clear, single objective: to provide quality, innovative therapeutic solutions that reach every patient at affordable prices.
                    </p>
                    <p>
                      From day one, Galcare established its governing dictums: <em className="text-foreground font-medium">"Excellence through People and Innovation"</em> alongside the core values of <strong className="text-foreground font-semibold">Respect, Recognition, and Responsibility</strong>. We never lose sight of the human element—the passionate professionals who formulate our medicines and the patients who depend on them.
                    </p>
                    <p>
                      Today, having expanded across 26 states in India with our own WHO-GMP certified formulation plant in Rajasthan and a team of over 500 associates, Galcare stands as an eminent name trusted by over 30,000 medical practitioners.
                    </p>
                  </div>

                  <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-border pt-6">
                    <div>
                      <div className="text-2xl font-extrabold text-gradient">2008</div>
                      <div className="text-xs text-muted-foreground font-medium">Inception Year</div>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-gradient">26 States</div>
                      <div className="text-xs text-muted-foreground font-medium">Pan-India Reach</div>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-gradient">500+</div>
                      <div className="text-xs text-muted-foreground font-medium">Dedicated Team</div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Three Core Pillars */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
                Organizational Foundation
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                The Three Pillars of Galcare
              </h2>
              <p className="mt-3 text-muted-foreground">
                Our business purpose is anchored in three core commitments defined by our leadership.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {corePillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 0.1}>
                  <div className="h-full rounded-[2rem] border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-strong">
                    <div className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <pillar.icon className="size-7" />
                    </div>
                    <span className="mt-6 inline-block text-xs font-bold text-primary uppercase tracking-wider">Pillar 0{i + 1}</span>
                    <h3 className="mt-1 text-xl font-bold">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Explore Sub-Pages Grid */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
                Deep Dive into Galcare
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Explore Our Organization
              </h2>
              <p className="mt-3 text-muted-foreground">
                Learn more about our values, historical milestones, and R&D quality standards.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {exploreSections.map((sec, i) => (
                <Reveal key={sec.title} delay={i * 0.1}>
                  <Link href={sec.href} className="group block h-full">
                    <div className="h-full rounded-[2rem] border border-border bg-card p-8 shadow-soft transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-strong group-hover:-translate-y-1">
                      <div className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${sec.color}`}>
                        <sec.icon className="size-6" />
                      </div>
                      <h3 className="mt-6 text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                        {sec.title}
                        <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{sec.description}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights Timeline Preview */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
                  16+ Years Journey
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Key Growth Milestones
                </h2>
              </div>
              <Link
                href="/about/milestones"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                View Complete Interactive Timeline <ArrowRight className="size-4" />
              </Link>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {timelineHighlights.map((t, i) => (
                <Reveal key={t.year} delay={i * 0.08}>
                  <div className="relative h-full rounded-2xl border border-border bg-card p-6 shadow-soft hover:border-primary/40 transition-colors">
                    <span className="text-3xl font-black text-gradient">{t.year}</span>
                    <h4 className="mt-2 text-base font-bold text-foreground">{t.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.text}</p>
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
