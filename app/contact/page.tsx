"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import { MapPin, Phone, Mail, Send, CheckCircle2, Building, ShieldCheck } from "lucide-react"

const locations = [
  {
    type: "Corporate Headquarters",
    address: "53 - 54 Basement, Devi Nagar, Jaipur, Rajasthan, India",
    phone: "+91-7230058817",
    email: "info@galcare.com"
  },
  {
    type: "Manufacturing Plant",
    address: "Plot No. 182, Industrial Area, Phase 2, Panchkula, Haryana, India",
    phone: "+91 172 5050502",
    email: "manufacturing@galcare.com"
  }
]

const departments = [
  { name: "Domestic Sales & Marketing", email: "sales@galcare.com", phone: "+91 98765 43210" },
  { name: "Third-Party & Contract Manufacturing", email: "contract@galcare.com", phone: "+91 98765 43211" },
  { name: "Export & Regulatory Affairs", email: "exports@galcare.com", phone: "+91 98765 43212" },
  { name: "HR & Recruitment", email: "careers@galcare.com", phone: "+91 98765 43213" }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Business Inquiry",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-1/4 top-10 h-[300px] w-[600px] rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="max-w-3xl">
              <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                Contact Us
              </span>
              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Get in touch with <span className="text-gradient">our health experts.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Have questions about our formulations, manufacturing capabilities, or career opportunities? Reach out using the details below or fill out the quick contact form.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Contacts & Form */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-12 lg:grid-cols-2">
            {/* Location & Department Info */}
            <Reveal className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Our Locations</h2>
                <p className="mt-2 text-muted-foreground">Visit or call us at our regional offices.</p>

                <div className="mt-6 space-y-6">
                  {locations.map((loc, i) => (
                    <div key={loc.type} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                      <div className="flex gap-3">
                        <Building className="size-6 text-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-lg">{loc.type}</h4>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{loc.address}</p>
                          <div className="mt-4 space-y-2 text-xs font-semibold text-muted-foreground">
                            <p className="flex items-center gap-2">
                              <Phone className="size-3.5" /> {loc.phone}
                            </p>
                            <p className="flex items-center gap-2">
                              <Mail className="size-3.5" /> {loc.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold tracking-tight">Departmental Contacts</h2>
                <p className="mt-2 text-muted-foreground">Direct your inquiries to the appropriate department.</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {departments.map((dept, i) => (
                    <div key={dept.name} className="rounded-xl border border-border bg-card p-5 shadow-soft">
                      <h4 className="font-bold text-sm">{dept.name}</h4>
                      <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <Mail className="size-3.5" /> {dept.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="size-3.5" /> {dept.phone}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Interactive Form */}
            <Reveal>
              <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
                <h3 className="text-2xl font-bold">Send a Message</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fill out the form and a representative will follow up with you.
                </p>

                {submitted ? (
                  <div className="mt-8 rounded-2xl bg-primary/10 p-6 text-center text-primary">
                    <CheckCircle2 className="mx-auto size-12" />
                    <h4 className="mt-4 font-bold text-lg">Message Sent</h4>
                    <p className="mt-2 text-sm text-primary/80">
                      Thank you for contacting us. We will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">Full Name</label>
                      <input
                        type="text"
                        required
                        className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-transparent focus:outline-primary"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Email Address</label>
                        <input
                          type="email"
                          required
                          className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-transparent focus:outline-primary"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
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
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">Inquiry Subject</label>
                      <select
                        className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-card focus:outline-primary"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      >
                        <option>Business Inquiry</option>
                        <option>Product Information</option>
                        <option>Export / International Trade</option>
                        <option>Career Opportunities</option>
                        <option>General Feedback</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">Message</label>
                      <textarea
                        rows={4}
                        required
                        className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-transparent focus:outline-primary resize-none"
                        placeholder="Write your message here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow hover:bg-primary/95 transition-colors"
                    >
                      <Send className="size-4" /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Embedded Map Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="overflow-hidden rounded-[2rem] border border-border shadow-soft">
              <iframe
                title="Galcare Head Office Location Map"
                src="https://www.google.com/maps?q=Devi+Nagar,+Jaipur&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
