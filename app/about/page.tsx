"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import Image from "next/image"
import { ShieldCheck, Target, Heart, Eye, Award, Landmark, Users } from "lucide-react"

const values = [
  { icon: ShieldCheck, title: "Integrity", text: "Upholding the highest ethical standards in all business practices, clinical research, and partnerships." },
  { icon: Target, title: "Innovation", text: "Investing continuously in R&D to pioneer new formulations and drug delivery technologies." },
  { icon: Award, title: "Quality", text: "Rigorous multi-stage quality control checks to meet and exceed global WHO-GMP standards." },
  { icon: Heart, title: "Patient Focus", text: "Putting patient safety, efficacy, and affordability at the heart of our operations." }
]

const journey = [
  { year: "2001", title: "Foundation", text: "Galcare was established with a mission to bridge gaps in advanced dermatological care." },
  { year: "2009", title: "WHO-GMP Facility", text: "Commissioned our first state-of-the-art manufacturing unit with international certification." },
  { year: "2016", title: "Global Footprint", text: "Expanded distribution networks to 20+ countries across EU, APAC, and Africa." },
  { year: "2024", title: "R&D Center of Excellence", text: "Inaugurated our advanced laboratory to focus on biomimetic skincare and CNS therapies." }
]

const team = [
  { name: "Dr. R. K. Nagpal", role: "Founder & Chairman", description: "Pharmacist and visionary with over 35 years of experience in healthcare leadership." },
  { name: "Mrs. Meenakshi Nagpal", role: "Managing Director", description: "Drives corporate strategy, compliance, and global regulatory affairs." },
  { name: "Mr. Yatharth Nagpal", role: "Director of Operations", description: "Spearheads manufacturing expansion, technology integration, and digital growth." }
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="max-w-3xl">
              <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                About Galcare
              </span>
              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Science-backed healthcare, <span className="text-gradient">trusted globally.</span>
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
                Galcare is a leading pharmaceutical organization committed to delivering top-tier dermatological, cosmeceutical, and neuropsychiatric formulations through research, integrity, and manufacturing excellence.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Story & Infrastructure */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Founded in 2001, Galcare was built on a foundation of scientific innovation and patient-first values. We recognized the need for dermatologist-grade formulations that are both highly effective and accessible to all. Over the past two decades, we have scaled our production capabilities, invested in proprietary research, and built an extensive distribution network that spans across 42 countries.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Our facilities are equipped with class-leading automation, strict environmental controls, and a dedicated team of researchers and formulation scientists. Today, we stand as a trusted brand, prescribed by over 30,000 doctors globally.
              </p>
            </Reveal>
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border shadow-soft">
                <Image
                  src="/manufacturing.png"
                  alt="Galcare modern facility"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[2rem] border border-border bg-card p-8 md:p-10 shadow-soft">
                <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Eye className="size-6" />
                </div>
                <h3 className="mt-6 text-2xl font-bold">Our Vision</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  To emerge as a globally respected pharmaceutical leader recognized for proprietary innovation, uncompromised product quality, and improving patient quality of life through next-generation therapeutics.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="h-full rounded-[2rem] border border-border bg-card p-8 md:p-10 shadow-soft">
                <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Target className="size-6" />
                </div>
                <h3 className="mt-6 text-2xl font-bold">Our Mission</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  To engineer, manufacture, and deliver safe, effective, and affordable medicines. We strive to maintain absolute compliance with world-class standards while fostering a culture of continuous research and ethical practices.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Our Core Values</h2>
              <p className="mt-3 text-muted-foreground">
                The pillars that guide our daily operations, research development, and partnership goals.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1">
                    <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                      <v.icon className="size-5" />
                    </div>
                    <h4 className="mt-4 text-lg font-bold">{v.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Executive Leadership</h2>
              <p className="mt-3 text-muted-foreground">
                Committed leaders steering Galcare toward global excellence and healthcare expansion.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {team.map((member, i) => (
                <Reveal key={member.name} delay={i * 0.1}>
                  <div className="h-full rounded-[2rem] border border-border bg-card p-6 md:p-8 shadow-soft">
                    <div className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Users className="size-7" />
                    </div>
                    <h4 className="mt-6 text-xl font-bold">{member.name}</h4>
                    <p className="text-sm font-semibold text-primary">{member.role}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{member.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Journey */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Our Growth Journey</h2>
              <p className="mt-3 text-muted-foreground">
                Key milestones that defined our transition from a local specialist to a global pharmaceutical player.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-4">
              {journey.map((j, i) => (
                <Reveal key={j.year} delay={i * 0.08}>
                  <div className="relative h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                    <span className="text-3xl font-bold text-gradient">{j.year}</span>
                    <h4 className="mt-2 text-base font-bold">{j.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{j.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CSR Section */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border shadow-soft">
                <Image
                  src="/lab.png"
                  alt="Galcare CSR initiatives"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal>
              <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
                Corporate Social Responsibility
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">Caring for communities beyond medicine</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                At Galcare, we believe that true healthcare goes beyond the products we manufacture. We actively invest in local communities, supporting free health camps, providing subsidized skin diagnostics in rural areas, and partnering with educational institutions to offer internships to aspiring biochemists.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We are also committed to sustainable manufacturing. Our facilities implement zero-liquid-discharge systems, solar integration, and eco-friendly packaging initiatives to reduce our carbon and environmental footprint.
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
