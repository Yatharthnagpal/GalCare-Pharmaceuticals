"use client"

import { useState } from "react"
import { AdaptiveImage } from "@/components/ui/adaptive-image"
import { MapPin, Mail, Phone, Send, Check } from "lucide-react"
import { Reveal } from "@/components/motion-primitives"

export function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="relative py-8 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Row 1: Info/Image & Form */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* info + image */}
          <Reveal className="text-center lg:text-left mx-auto lg:mx-0 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Contact</p>
            <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-4xl leading-tight">
              Talk to a dermatology expert
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
              Whether you&apos;re a healthcare professional, distributor, or patient, our team is ready to help.
            </p>

            {/* Friendly dermatologist lifestyle image slot to humanize the form */}
            <div className="mt-6 relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-border shadow-soft bg-muted group">
              <AdaptiveImage
                src="/images/placeholders/contact-dermatologist.png"
                alt="Dermatologist smiling while writing on a clipboard"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Reveal>

          {/* form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] glass-strong p-6 shadow-soft sm:p-8 h-full flex flex-col justify-center"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" id="name" placeholder="Dr. Jane Doe" required />
                <Field label="Email" id="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Organization" id="org" placeholder="Clinic / Company" />
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="role" className="text-sm font-medium">I am a</label>
                  <select
                    id="role"
                    className="rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/15 focus:shadow-glow"
                  >
                    <option>Healthcare Professional</option>
                    <option>Distributor</option>
                    <option>Patient</option>
                    <option>Investor</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  placeholder="How can we help?"
                  className="resize-none rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/15 focus:shadow-glow"
                />
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                {sent ? (
                  <>
                    <Check className="size-4" /> Message sent
                  </>
                ) : (
                  <>
                    <Send className="size-4" /> Send message
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>

        {/* Row 2: Address Cards & Map */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2 items-stretch">
          {/* address cards */}
          <Reveal>
            <div className="space-y-4 h-full flex flex-col justify-between">
              {[
                { icon: MapPin, label: "Headquarters", value: "53 - 54 Basement, Devi Nagar, Jaipur" },
                { icon: Mail, label: "Email", value: "care@galcare.com" },
                { icon: Phone, label: "Phone", value: "+91-7230058817" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft flex-1">
                  <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <c.icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{c.label}</p>
                    <p className="font-medium">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* location map */}
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-3xl border border-border shadow-soft h-full min-h-[256px]">
              <iframe
                title="Galcare location map"
                src="https://www.google.com/maps?q=Devi+Nagar,+Jaipur&output=embed"
                className="h-full w-full min-h-[256px] grayscale-[30%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  id,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string
  id: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/15 focus:shadow-glow"
      />
    </div>
  )
}
