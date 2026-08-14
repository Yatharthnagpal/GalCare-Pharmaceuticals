"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import { JOBS, Job } from "@/lib/site-data"
import { useAuth } from "@/lib/auth-context"
import { Users, CheckCircle2, FileText, UploadCloud, Trash2, Send, AlertCircle, ArrowLeft } from "lucide-react"

function ApplyFormContent() {
  const searchParams = useSearchParams()
  const initialJob = searchParams.get("job") || searchParams.get("position") || ""

  const { user, openAuthModal, addJobApplication } = useAuth()
  const [jobs, setJobs] = useState<Job[]>(JOBS)
  const [selectedJob, setSelectedJob] = useState<string>(initialJob)
  const [pdfFile, setPdfFile] = useState<{ name: string; sizeStr: string; dataUrl: string } | null>(null)
  const [pdfError, setPdfError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  // Ensure user is signed in on page load / mount
  useEffect(() => {
    if (!user) {
      openAuthModal("login", "Please sign in to access the job application portal.")
    } else {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.fullName || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || ""
      }))
    }
  }, [user, openAuthModal])

  // Update selected position if query parameter changes
  useEffect(() => {
    if (initialJob) {
      setSelectedJob(initialJob)
    }
  }, [initialJob])

  // Load dynamic jobs from WordPress CMS or local storage
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await fetch("/api/jobs")
        if (res.ok) {
          const data = await res.json()
          if (data.jobs && data.jobs.length > 0) {
            setJobs(data.jobs)
            return
          }
        }
      } catch (e) {
        console.warn("Failed to fetch jobs from API", e)
      }

      const savedJobs = localStorage.getItem("galcare_custom_jobs")
      if (savedJobs) {
        try {
          const parsed = JSON.parse(savedJobs)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setJobs(parsed)
            return
          }
        } catch (e) {
          console.error("Failed to parse saved jobs", e)
        }
      }
      setJobs(JOBS)
    }

    loadJobs()
    window.addEventListener("storage", loadJobs)
    return () => window.removeEventListener("storage", loadJobs)
  }, [])

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setPdfError(null)

    if (!file) return

    const MAX_SIZE = 1 * 1024 * 1024 // 1MB in bytes

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setPdfError("Invalid file format. Please upload a PDF document only.")
      return
    }

    if (file.size > MAX_SIZE) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2)
      setPdfError(`File size (${sizeMb} MB) exceeds maximum 1MB limit. Please upload a smaller PDF.`)
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      const sizeKb = Math.round(file.size / 1024)
      const sizeStr = sizeKb >= 1000 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`
      setPdfFile({ name: file.name, sizeStr, dataUrl })
      setFormData((prev) => ({ ...prev, resume: dataUrl }))
    }
    reader.readAsDataURL(file)
  }

  const handleRemovePdf = () => {
    setPdfFile(null)
    setPdfError(null)
    setFormData((prev) => ({ ...prev, resume: "" }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      openAuthModal("login", "Please sign in to submit your job application.")
      return
    }

    if (!formData.resume || !pdfFile) {
      setPdfError("Please upload your PDF resume (Max 1MB) before submitting.")
      return
    }

    const processSubmission = async () => {
      const appliedTitle = selectedJob || "General Application"
      const newApp = {
        id: `app-${Date.now()}`,
        name: formData.name || user.fullName || "Candidate",
        position: appliedTitle,
        email: user.email || formData.email,
        date: new Date().toISOString().split("T")[0],
        status: "New" as const
      }

      try {
        await fetch("/api/careers/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name || user.fullName,
            email: formData.email || user.email,
            phone: formData.phone,
            jobTitle: appliedTitle,
            experience: formData.experience,
            resume: pdfFile.dataUrl || pdfFile.name,
            resumeName: pdfFile.name,
          }),
        })

        const savedApps = localStorage.getItem("galcare_job_apps")
        const currentApps = savedApps ? JSON.parse(savedApps) : []
        const updatedApps = [newApp, ...currentApps]
        localStorage.setItem("galcare_job_apps", JSON.stringify(updatedApps))
        window.dispatchEvent(new Event("storage"))
      } catch (err) {
        console.error("Failed to update job apps", err)
      }

      addJobApplication({
        userEmail: user.email || formData.email,
        userName: formData.name || user.fullName || "Candidate",
        jobTitle: appliedTitle,
        department: "R&D",
        phone: formData.phone || user.phone || "",
        experience: formData.experience || "Not specified",
        resume: pdfFile.dataUrl || pdfFile.name || "resume.pdf",
      })

      setSubmitted(true)
      setPdfFile(null)
      setPdfError(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
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

    processSubmission()
  }

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6">
      <div className="mb-6">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="size-4" /> Back to Careers & Active Opportunities
        </Link>
      </div>

      <Reveal>
        <div className="rounded-[2.5rem] border border-border bg-card p-6 sm:p-10 md:p-12 shadow-soft">
          <div className="text-center max-w-xl mx-auto">
            <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary mb-4">
              <Users className="size-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Submit Your Application</h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Introduce yourself to our recruitment panel and upload your curriculum vitae.
            </p>
            {selectedJob && (
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
                Applying for: <span className="font-bold">{selectedJob}</span>
              </div>
            )}
          </div>

          {submitted ? (
            <div className="mt-8 rounded-2xl bg-primary/10 p-8 text-center text-primary">
              <CheckCircle2 className="mx-auto size-14 text-primary" />
              <h3 className="mt-4 font-bold text-xl">Application Submitted!</h3>
              <p className="mt-2 text-sm text-primary/80 max-w-md mx-auto leading-relaxed">
                Our HR department has received your profile. You can track your real-time application status in your client dashboard.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="px-6 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-xl shadow-soft hover:bg-primary/95 transition-colors"
                >
                  Track Status in Dashboard
                </Link>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setSelectedJob("")
                  }}
                  className="text-xs font-bold underline hover:text-primary/80 transition-colors"
                >
                  Apply for another role
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">FULL NAME</label>
                  <input
                    type="text"
                    required
                    className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">PHONE NUMBER</label>
                  <input
                    type="tel"
                    required
                    className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="+91-98765-43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">YEARS OF EXPERIENCE</label>
                  <input
                    type="text"
                    required
                    className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="e.g. 5 Years"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">LINKEDIN PROFILE</label>
                  <input
                    type="url"
                    className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">POSITION APPLIED FOR</label>
                  <select
                    className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                  >
                    <option value="">General Application</option>
                    {jobs.map((j) => (
                      <option key={j.title} value={j.title}>{j.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    UPLOAD RESUME (PDF ONLY, MAX 1MB) <span className="text-red-500">*</span>
                  </label>
                  {pdfFile && (
                    <span className="text-[10px] font-bold text-teal bg-teal/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="size-3" /> Ready
                    </span>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                />

                {pdfFile ? (
                  <div className="mt-2 flex items-center justify-between rounded-xl border border-primary/40 bg-primary/5 p-4 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                        <FileText className="size-5" />
                      </div>
                      <div className="max-w-[200px] sm:max-w-xs overflow-hidden">
                        <p className="text-sm font-bold text-foreground truncate">{pdfFile.name}</p>
                        <p className="text-xs text-muted-foreground">{pdfFile.sizeStr} • PDF Document</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePdf}
                      className="p-2 text-muted-foreground hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10 shrink-0"
                      title="Remove PDF"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`mt-2 flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
                      pdfError
                        ? "border-red-500/50 bg-red-500/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/40"
                    }`}
                  >
                    <div className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary mb-2">
                      <UploadCloud className="size-5" />
                    </div>
                    <p className="text-sm font-bold text-foreground">Click to upload PDF resume</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Only PDF format allowed • Maximum file size 1 MB
                    </p>
                  </div>
                )}

                {pdfError && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-red-500 font-semibold">
                    <AlertCircle className="size-3.5 shrink-0" />
                    <span>{pdfError}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">COVER LETTER / MESSAGE</label>
                <textarea
                  rows={4}
                  required
                  className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all"
                  placeholder="Introduce yourself, your academic background, and why you wish to join Galcare..."
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-glow hover:bg-primary/95 transition-all text-sm"
              >
                <Send className="size-4" /> Submit Application
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </div>
  )
}

export default function ApplyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 bg-muted/20">
        <Suspense fallback={
          <div className="mx-auto max-w-3xl px-4 py-16 text-center text-muted-foreground">
            Loading Application Form...
          </div>
        }>
          <ApplyFormContent />
        </Suspense>
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
