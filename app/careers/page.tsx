"use client"

import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import {
  Heart,
  Award,
  GraduationCap,
  Users,
  ArrowRight,
  Briefcase,
  Play,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  HeartHandshake,
  Smile,
  ShieldCheck
} from "lucide-react"

const cultureBenefits = [
  {
    icon: Heart,
    title: "Homely & Rewarding Environment",
    text: "A supportive, inclusive workplace culture where every associate is treated like family and provided with holistic health & wellness benefits."
  },
  {
    icon: TrendingUp,
    title: "Promote From Within Policy",
    text: "We actively prioritize internal career advancement, allowing our team members to grow alongside the brand as future leaders and managers."
  },
  {
    icon: GraduationCap,
    title: "People Development Programs",
    text: "Heavy investment in continuous employee training, skill-enhancement workshops, leadership mentorship, and professional growth."
  },
  {
    icon: Award,
    title: "The 3 Rs: Respect, Recognition, Responsibility",
    text: "Quarterly performance honors, milestone celebrations, transparent feedback, and a culture built on mutual respect and social responsibility."
  }
]

const culturePillars = [
  {
    title: "Supportive Work Culture",
    text: "Fostering long-term professional relationships where dreamers, innovators, and professionals feel empowered to express ideas and thrive."
  },
  {
    title: "Internal Career Advancement",
    text: "We train and mentor our 500+ team members to step into higher responsibilities, recognizing dedication and ethical dedication."
  },
  {
    title: "Ethical & Purpose-Driven Dictum",
    text: "Governed by Founder Devkant Bhardwaj's core principle—'Excellence through People & Innovation'—keeping employee well-being and ethics at top priority."
  }
]

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        {/* Page Hero */}
        <section className="relative overflow-hidden py-16 md:py-20 bg-[#16a34a] text-white">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[400px] w-[850px] -translate-x-1/2 rounded-full bg-white/10 blur-[130px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6 text-center">
            <Reveal className="max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold text-white border border-white/25 backdrop-blur-md shadow-sm">
                <HeartHandshake className="size-3.5" /> People & Culture at Galcare
              </span>
              <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white">
                Grow Your Career in a Homely & Supportive Culture
              </h1>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-emerald-50 max-w-2xl mx-auto">
                As Founder Devkant Bhardwaj emphasizes, a company is only as strong as the people who believe in its mission. Built on <strong className="text-white font-semibold">Respect, Recognition, and Responsibility</strong>, we invest heavily in people development and prioritize promotion from within.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Stats & Key Metrics Banner */}
        <section className="py-8 bg-muted/20 border-y border-border/40">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-primary">500+</p>
                <p className="text-xs font-semibold text-muted-foreground mt-1">Dedicated Team Associates</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-foreground">3 Rs</p>
                <p className="text-xs font-semibold text-muted-foreground mt-1">Respect, Recognition, Responsibility</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-primary">100%</p>
                <p className="text-xs font-semibold text-muted-foreground mt-1">Focus on Promotion From Within</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-foreground">26 States</p>
                <p className="text-xs font-semibold text-muted-foreground mt-1">Pan-India Workplace Network</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team & Office Culture Showcase Section */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-12 lg:gap-16 lg:grid-cols-12 items-center">
              {/* Left Column: Office Culture Image */}
              <div className="lg:col-span-7">
                <Reveal>
                  <div className="relative rounded-3xl border border-border bg-card overflow-hidden shadow-md group aspect-[16/10] sm:aspect-[16/9]">
                    <Image
                      src="/images/office-culture.png"
                      alt="Galcare Corporate Office Team"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary-foreground/90">GALCARE WORKPLACE CULTURE</span>
                      <p className="text-base sm:text-lg font-bold">A Homely & Rewarding Environment</p>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Text Box */}
              <div className="lg:col-span-5">
                <Reveal delay={0.1}>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">People & Culture</span>
                  <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    Empowering People, Fostering Growth
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    At Galcare Pharmaceuticals, we believe that an organization is only as strong as the passionate people who drive its mission every single day. From the very beginning, Founder Devkant Bhardwaj established a guiding dictum rooted in providing a homely, rewarding work environment for each of our 500+ associates across corporate operations, sales development, supply chain, and field management. We invest heavily in structured people development programs, leadership mentorship, and continuous skill-enhancement workshops so that every team member can thrive. Guided by our three core pillars of Respect, Recognition, and Responsibility, we actively practice a policy of promotion from within. We invite dreamers, innovators, and professionals to build career-defining growth and evolve alongside the Galcare brand.
                  </p>
                  <div className="mt-6 flex items-center gap-3.5">
                    <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                      <Users className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Promote From Within Policy</p>
                      <p className="text-xs text-muted-foreground">Investing heavily in employee growth, career advancement & recognition</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Film / Life at Galcare */}
        <section className="py-16 md:py-20 bg-muted/20 border-y border-border/40">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-12 lg:gap-16 lg:grid-cols-12 items-center">
              {/* Left Column: Rich Content */}
              <div className="lg:col-span-5">
                <Reveal>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    Life at Galcare: Our Culture & Values
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Hear directly from Founder Devkant Bhardwaj about our founding principles, employee-first philosophy, and how we foster a supportive, ethics-driven corporate culture across India.
                  </p>
                  <ul className="mt-5 space-y-3">
                    <li className="flex items-center gap-3 text-xs sm:text-sm text-foreground font-semibold">
                      <CheckCircle2 className="size-4 text-primary shrink-0" /> Homely and rewarding atmosphere for every associate
                    </li>
                    <li className="flex items-center gap-3 text-xs sm:text-sm text-foreground font-semibold">
                      <CheckCircle2 className="size-4 text-primary shrink-0" /> Dedicated people development and training programs
                    </li>
                    <li className="flex items-center gap-3 text-xs sm:text-sm text-foreground font-semibold">
                      <CheckCircle2 className="size-4 text-primary shrink-0" /> Ethics, respect, recognition, and responsibility in action
                    </li>
                  </ul>

                  <div className="mt-8">
                    <Link
                      href="/opportunities"
                      className="group/btn relative inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-glow hover:bg-primary/95 transition-all duration-300 hover:scale-105"
                    >
                      <Briefcase className="size-4" />
                      <span>Explore Open Opportunities</span>
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Cinema-Sized Video Player Embed */}
              <div className="lg:col-span-7">
                <Reveal delay={0.1}>
                  <div className="relative rounded-[2.5rem] border border-border bg-card p-4 sm:p-6 shadow-2xl overflow-hidden w-full max-w-4xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden aspect-video bg-black/90 shadow-strong">
                      <iframe
                        className="w-full h-full object-cover"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Galcare Work Culture Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Culture & Purpose */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
              <Reveal>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Organizational Core</span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">Where Career Growth Meets Homely Culture</h2>
                <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  We foster a supportive ecosystem where dreamers, innovators, and professionals build career-defining growth, backed by ethical leadership and mutual recognition.
                </p>
                <div className="mt-8 space-y-5">
                  {culturePillars.map((pillar) => (
                    <div key={pillar.title} className="flex gap-4">
                      <div className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/15 text-primary mt-1">
                        <span className="size-2 rounded-full bg-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-foreground">{pillar.title}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">{pillar.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal className="space-y-4">
                {cultureBenefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft hover:border-primary/45 transition-all">
                    <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary mt-0.5">
                      <benefit.icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-foreground">{benefit.title}</h3>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">{benefit.text}</p>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
