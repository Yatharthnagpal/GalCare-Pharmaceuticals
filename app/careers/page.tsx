"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import { JOBS } from "@/lib/site-data"
import { Briefcase, MapPin, Clock, Send, CheckCircle2, Heart, Award, GraduationCap, Laptop, Users } from "lucide-react"

const cultureBenefits = [
  {
    icon: Heart,
    title: "Health & Well-being",
    text: "Comprehensive health insurance, annual wellness checkups, and mental health support programs for you and your family."
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    text: "Generous tuition reimbursement, sponsorship for scientific conferences, and access to internal research leadership programs."
  },
  {
    icon: Laptop,
    title: "Modern Workspaces",
    text: "Work in state-of-the-art laboratories and collaborative workspaces designed for flexibility and productivity."
  },
  {
    icon: Award,
    title: "Performance Awards",
    text: "Quarterly recognition ceremonies, research publication bonuses, and annual milestone celebrations."
  }
]

const culturePillars = [
  {
    title: "Innovation First",
    text: "We encourage our scientists and executives to think beyond standard protocols, testing new delivery systems and digital solutions daily."
  },
  {
    title: "Collaborative Science",
    text: "No division operates in a silo. Formulation chemistry, clinical testing, and marketing work in a seamless feedback loop."
  },
  {
    title: "Patient-Centered Ethics",
    text: "Every product we ship is designed with a patient's safety, comfort, and financial accessibility at the core."
  }
]

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    linkedin: "",
    resume: "",
    coverLetter: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const handleApply = (jobTitle: string) => {
    setSelectedJob(jobTitle)
    setSubmitted(false)
    // Scroll to form
    const element = document.getElementById("application-form-section")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({
      name: "",
      email: "",
      phone: "",
      experience: "",
      linkedin: "",
      resume: "",
      coverLetter: ""
    })
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        {/* Page Hero */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6 text-center">
            <Reveal className="max-w-3xl mx-auto">
              <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                Join Galcare
              </span>
              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Shape the future of <span className="text-gradient">healthcare, together.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                At Galcare, we believe that breakthrough pharmaceuticals and advanced skin therapeutics begin with brilliant minds. Join a global team of scientists, creators, and innovators.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Culture & Purpose */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <Reveal>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Our Culture</span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">Built on scientific curiosity and human care</h2>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                  Galcare is more than a workplace. We are an ecosystem dedicated to discovery. We foster an environment where clinical excellence meets compassionate care, giving our teams the space and funding to pioneer new skincare technologies and CNS therapies.
                </p>
                <div className="mt-8 space-y-6">
                  {culturePillars.map((pillar) => (
                    <div key={pillar.title} className="flex gap-4">
                      <div className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/15 text-primary mt-1">
                        <span className="size-2 rounded-full bg-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base">{pillar.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{pillar.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal className="grid gap-6 sm:grid-cols-2">
                {cultureBenefits.map((benefit, idx) => (
                  <div key={benefit.title} className="rounded-3xl border border-border bg-card p-6 shadow-soft hover:border-primary/45 transition-all">
                    <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                      <benefit.icon className="size-5" />
                    </div>
                    <h3 className="mt-4 font-bold text-lg">{benefit.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{benefit.text}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Active Opportunities</h2>
              <p className="mt-3 text-muted-foreground">
                We are actively looking for talented leaders to join our R&D centers, manufacturing units, and corporate offices.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {JOBS.map((job, idx) => (
                <Reveal key={job.title} delay={idx * 0.05}>
                  <div className="group rounded-[2rem] border border-border bg-card p-6 md:p-8 shadow-soft hover:border-primary/45 transition-colors flex flex-col justify-between h-full">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-primary">
                        <span className="rounded-full bg-primary/10 px-3 py-1 flex items-center gap-1">
                          <Briefcase className="size-3" /> {job.department}
                        </span>
                        <span className="rounded-full bg-teal/10 text-teal px-3 py-1 flex items-center gap-1">
                          <Clock className="size-3" /> {job.type}
                        </span>
                      </div>
                      <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-muted-foreground" /> {job.location}, India
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        Collaborate with senior teams to develop, test, and release next-generation formulations adhering to high WHO-GMP compliance standards.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
                      <button
                        onClick={() => handleApply(job.title)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-soft hover:bg-primary/95 transition-all"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="application-form-section" className="py-16 bg-muted/30 scroll-mt-24">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <Reveal>
              <div className="rounded-[2.5rem] border border-border bg-card p-6 md:p-12 shadow-soft">
                <div className="text-center max-w-xl mx-auto">
                  <Users className="mx-auto size-12 text-primary bg-primary/10 p-2.5 rounded-2xl" />
                  <h2 className="mt-4 text-2xl font-bold tracking-tight">Submit Your Application</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {selectedJob 
                      ? `Applying for the position of: ${selectedJob}`
                      : "Introduce yourself to our recruitment panel and upload your curriculum vitae."}
                  </p>
                </div>

                {submitted ? (
                  <div className="mt-8 rounded-2xl bg-primary/10 p-6 text-center text-primary">
                    <CheckCircle2 className="mx-auto size-12" />
                    <h4 className="mt-4 font-bold text-lg">Application Submitted!</h4>
                    <p className="mt-2 text-sm text-primary/80">
                      Our HR department has received your profile. We will contact you if your background aligns with our criteria.
                    </p>
                    <button 
                      onClick={() => setSelectedJob(null)}
                      className="mt-6 text-xs font-bold underline"
                    >
                      Apply for another role
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Full Name</label>
                        <input
                          type="text"
                          required
                          className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-transparent focus:outline-primary"
                          placeholder="Jane Doe"
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
                          placeholder="jane@example.com"
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
                          placeholder="+91-98765-43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Years of Experience</label>
                        <input
                          type="text"
                          required
                          className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-transparent focus:outline-primary"
                          placeholder="e.g. 5 Years"
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">LinkedIn Profile</label>
                        <input
                          type="url"
                          className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-transparent focus:outline-primary"
                          placeholder="https://linkedin.com/in/username"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Position Applied For</label>
                        <select
                          className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-card focus:outline-primary"
                          value={selectedJob || ""}
                          onChange={(e) => setSelectedJob(e.target.value || null)}
                        >
                          <option value="">General Application</option>
                          {JOBS.map((j) => (
                            <option key={j.title} value={j.title}>{j.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">Resume File URL / Drive Link</label>
                      <input
                        type="url"
                        required
                        className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-transparent focus:outline-primary"
                        placeholder="Paste your Google Drive, Dropbox, or PDF link here"
                        value={formData.resume}
                        onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">Cover Letter / Message</label>
                      <textarea
                        rows={4}
                        required
                        className="mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-transparent focus:outline-primary resize-none"
                        placeholder="Introduce yourself, your academic background, and why you wish to join Galcare..."
                        value={formData.coverLetter}
                        onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow hover:bg-primary/95 transition-colors"
                    >
                      <Send className="size-4" /> Submit Application
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
