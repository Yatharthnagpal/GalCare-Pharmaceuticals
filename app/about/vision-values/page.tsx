"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import Image from "next/image"
import Link from "next/link"
import { 
  Eye, 
  Target, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Heart, 
  Users, 
  Smile, 
  ArrowLeft,
  CheckCircle2,
  HeartHandshake,
  Compass,
  Lightbulb,
  Building
} from "lucide-react"

const coreValuesList = [
  {
    icon: ShieldCheck,
    title: "Unflinching Ethics & Integrity",
    subtitle: "Ethical Growth Foundation",
    description: "Since incorporation in 2008, Galcare has maintained a steady ethical growth path, prioritizing absolute transparency, compliant clinical practices, and medical fraternity trust."
  },
  {
    icon: Sparkles,
    title: "First-in-India Innovation",
    subtitle: "Pioneering Formulations",
    description: "We are committed to breakthrough formulation science, delivering multiple first-time-in-India product introduction milestones across topical dermatology and therapeutic care."
  },
  {
    icon: Award,
    title: "Excellence in API Make",
    subtitle: "World-Class Quality Standard",
    description: "We believe therapeutic efficacy starts at the molecular level. All Galcare formulations utilize top-tier, bioequivalent Active Pharmaceutical Ingredients under WHO-GMP compliance."
  },
  {
    icon: Heart,
    title: "Patient & Practitioner Centricity",
    subtitle: "Exceeding Expectations",
    description: "Keeping patient health and doctor satisfaction at the absolute top of our operational goals. Every formulation is engineered for maximum efficacy, safety, and affordability."
  },
  {
    icon: Users,
    title: "People Development & Homely Atmosphere",
    subtitle: "Investing in Associates",
    description: "A company is only as strong as the people who believe in its mission. We provide a homely, supportive atmosphere for 500+ employees and practice promotion from within."
  },
  {
    icon: HeartHandshake,
    title: "The 3 Rs: Respect, Recognition, Responsibility",
    subtitle: "Our Social Dictum",
    description: "Epitomizing a spirit of business built on mutual respect, timely recognition of talent, and corporate responsibility to society and healthcare."
  }
]

const culturePillars = [
  {
    title: "Promote From Within",
    desc: "We actively prioritize internal career advancement, allowing our team members to grow alongside the brand as leaders and innovators."
  },
  {
    title: "Continuous Learning",
    desc: "Heavily investing in structured employee development programs, technical workshops, and clinical updates for all 500+ associates."
  },
  {
    title: "Supportive Work Environment",
    desc: "Fostering a homely, collaborative corporate atmosphere where dreamers, scientists, and professionals thrive together."
  }
]

export default function VisionValuesPage() {
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
        <section className="relative overflow-hidden pt-4 pb-6 md:pt-6 md:pb-8">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-1/3 top-0 h-[400px] w-[800px] rounded-full bg-primary/10 blur-[120px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary border border-primary/20">
                <Compass className="size-3.5" /> Corporate Philosophy
              </span>
              <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Our Vision, Mission & <span className="text-gradient">Core Values.</span>
              </h1>
              <p className="mt-3 text-lg md:text-xl leading-relaxed text-muted-foreground">
                At Galcare Pharmaceuticals, our foundation is governed by a singular corporate dictum: <strong className="text-foreground font-semibold">"Excellence through People and Innovation"</strong>.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-10 md:py-14 border-y border-border/60 bg-muted/10">
          <div className="mx-auto max-w-7xl px-4 md:px-6 flex flex-col gap-12">
            <Reveal className="w-full">
              <div className="flex flex-col items-start w-full">
                <div className="flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Eye className="size-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Strategic Blueprint</span>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Vision</h2>
                  </div>
                </div>
                <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground w-full">
                  To emerge as a globally respected pharmaceutical leader in dermatology and specialty medicine—recognized for uncompromised product quality, innovative Active Pharmaceutical Ingredients (API makes), and precision-engineered therapeutics. Founded in 2008 in Jaipur by Devkant Bhardwaj, Galcare envisions expanding its scientific research footprint across international borders while continually setting benchmark standards in skin barrier repair, acne care, vitiligo therapeutics, and clinical dermatology. By blending rigorous DCGI compliance, state-of-the-art WHO-GMP manufacturing facilities in Rajasthan, and deep clinical collaborations with over 30,000 dermatologists across 26 Indian states, we strive to deliver life-transforming solutions that enhance patient lives and redefine modern skincare therapeutics worldwide.
                </p>
                <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full border-t border-border/60 pt-5">
                  <li className="flex items-center gap-2.5 text-sm font-medium text-foreground/85">
                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                    <span>Global recognition for formulation precision</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-sm font-medium text-foreground/85">
                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                    <span>Pioneering first-in-India dermatology solutions</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-sm font-medium text-foreground/85">
                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                    <span>WHO-GMP certified production excellence</span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <div className="w-full border-t border-border/60" />

            <Reveal delay={0.1} className="w-full">
              <div className="flex flex-col items-start w-full">
                <div className="flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Target className="size-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Daily Imperative</span>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Mission</h2>
                  </div>
                </div>
                <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground w-full">
                  To formulate, manufacture, and deliver safe, highly effective, and affordable medications to every individual across urban and regional healthcare networks. We fulfill this daily imperative by adhering strictly to WHO-GMP standards, cultivating a homely and growth-driven environment for our 500+ dedicated team members, and exceeding doctor expectations through bioequivalent, high-stability formulations. Grounded in our core values of Respect, Recognition, and Responsibility, our mission drives continuous investment in R&D innovation, ethical growth, and sustainable pharmaceutical production that empowers practitioners and improves quality of life for millions of patients.
                </p>
                <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full border-t border-border/60 pt-5">
                  <li className="flex items-center gap-2.5 text-sm font-medium text-foreground/85">
                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                    <span>Affordable quality medication reaching every individual</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-sm font-medium text-foreground/85">
                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                    <span>Adherence to steady ethical growth since 2008</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-sm font-medium text-foreground/85">
                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                    <span>Homely environment & 500+ associate growth</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Guiding Principles & Core Values Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
                The Guiding Dictum
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Our Core Values & Principles
              </h2>
              <p className="mt-3 text-muted-foreground">
                Every thought and action at Galcare is guided by ethics, respect, and non-stop innovation.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {coreValuesList.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.08}>
                  <div className="h-full rounded-[2rem] border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                    <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <v.icon className="size-6" />
                    </div>
                    <span className="mt-5 block text-xs font-bold text-primary">{v.subtitle}</span>
                    <h3 className="mt-1 text-xl font-bold text-foreground">{v.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* People Philosophy & Work Culture */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
                Excellence Through People
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                A homely environment where dreamers & professionals thrive
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                As Founder Devkant Bhardwaj emphasizes, a company is only as strong as the people who believe in its mission. At Galcare, we don't just hire employees—we build lifelong professional families.
              </p>
              <div className="mt-8 space-y-4">
                {culturePillars.map((cp) => (
                  <div key={cp.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <h4 className="text-base font-bold text-foreground flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" /> {cp.title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground pl-6">{cp.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] border border-border shadow-soft">
                <Image
                  src="/manufacturing.png"
                  alt="Galcare work culture and teamwork"
                  fill
                  className="object-cover"
                />
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
