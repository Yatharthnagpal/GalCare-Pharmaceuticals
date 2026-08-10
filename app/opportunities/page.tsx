"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import { JOBS, Job } from "@/lib/site-data"
import { Briefcase, MapPin, Clock, Search, ArrowRight, Sparkles, Building2, CheckCircle2, ChevronRight } from "lucide-react"

export default function OpportunitiesPage() {
  const [jobs, setJobs] = useState<Job[]>(JOBS)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All")
  const [selectedType, setSelectedType] = useState<string>("All")

  // Load custom jobs if available
  useEffect(() => {
    const loadJobs = () => {
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

  // Extract unique departments and job types
  const departments = useMemo(() => {
    const deps = new Set(jobs.map((j) => j.department))
    return ["All", ...Array.from(deps)]
  }, [jobs])

  const jobTypes = useMemo(() => {
    const types = new Set(jobs.map((j) => j.type))
    return ["All", ...Array.from(types)]
  }, [jobs])

  // Filter jobs based on search query, department, and employment type
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.description && job.description.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesDept = selectedDepartment === "All" || job.department === selectedDepartment
      const matchesType = selectedType === "All" || job.type === selectedType

      return matchesSearch && matchesDept && matchesType
    })
  }, [jobs, searchQuery, selectedDepartment, selectedType])

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-20 bg-muted/20 border-b border-border/40">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                <Sparkles className="size-3.5" /> Career Opportunities
              </span>
              <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Active <span className="text-gradient">Opportunities</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                Discover your next career milestone at Galcare. Explore open roles across R&D, Quality, Manufacturing, and Commercial operations.
              </p>
            </Reveal>

            {/* Search & Filter Bar */}
            <Reveal delay={0.1} className="mt-10 max-w-4xl mx-auto">
              <div className="rounded-3xl border border-border bg-card p-4 md:p-5 shadow-soft space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by job title, department, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-transparent pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                {/* Department Dropdown */}
                <div className="flex items-center gap-2">
                  <div className="relative w-full md:w-48">
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="w-full appearance-none rounded-2xl border border-border bg-card px-4 py-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept === "All" ? "All Departments" : dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Employment Type Dropdown */}
                  <div className="relative w-full md:w-40">
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full appearance-none rounded-2xl border border-border bg-card px-4 py-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      {jobTypes.map((type) => (
                        <option key={type} value={type}>
                          {type === "All" ? "All Types" : type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Job Listings — Clean List Layout */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4 md:px-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Open Positions</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Showing <span className="font-bold text-foreground">{filteredJobs.length}</span> active job opening{filteredJobs.length !== 1 ? "s" : ""}
                </p>
              </div>

              {(searchQuery || selectedDepartment !== "All" || selectedType !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedDepartment("All")
                    setSelectedType("All")
                  }}
                  className="text-xs font-bold text-primary hover:underline transition-all"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job, idx) => (
                  <Reveal key={job.title} delay={idx * 0.04}>
                    <div className="group rounded-3xl border border-border bg-card p-6 md:p-8 shadow-soft hover:border-primary/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                          <span className="rounded-full bg-primary/10 text-primary px-3 py-1 flex items-center gap-1.5">
                            <Briefcase className="size-3.5" /> {job.department}
                          </span>
                          <span className="rounded-full bg-teal/10 text-teal px-3 py-1 flex items-center gap-1.5">
                            <Clock className="size-3.5" /> {job.type}
                          </span>
                          <span className="rounded-full bg-muted px-3 py-1 text-muted-foreground flex items-center gap-1.5">
                            <MapPin className="size-3.5" /> {job.location}, India
                          </span>
                        </div>

                        <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                          {job.description || "Collaborate with senior teams to develop, test, and release next-generation formulations adhering to high WHO-GMP compliance standards."}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-4 border-t md:border-t-0 border-border pt-4 md:pt-0">
                        <Link
                          href={`/apply?job=${encodeURIComponent(job.title)}`}
                          className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-soft hover:bg-primary/95 transition-all group-hover:translate-x-0.5"
                        >
                          Apply Now <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-border bg-card p-12 text-center max-w-md mx-auto">
                <Building2 className="mx-auto size-12 text-muted-foreground/60 mb-3" />
                <h3 className="text-lg font-bold text-foreground">No matching positions found</h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Try adjusting your search criteria or clearing your filters to view all available roles.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedDepartment("All")
                    setSelectedType("All")
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/20 transition-all"
                >
                  Reset Search
                </button>
              </div>
            )}
          </div>
        </section>

        {/* General Application Callout */}
        <section className="py-12 bg-muted/20 border-t border-border/40">
          <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
            <Reveal>
              <div className="rounded-[2.5rem] border border-border bg-card p-8 md:p-12 shadow-soft flex flex-col items-center">
                <CheckCircle2 className="size-12 text-primary bg-primary/10 p-2.5 rounded-2xl mb-4" />
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Can't find your ideal role?</h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-lg leading-relaxed">
                  Submit a general application and our talent acquisition panel will review your profile for upcoming openings.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Link
                    href="/apply"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-glow hover:bg-primary/95 transition-all"
                  >
                    Submit General Application <ChevronRight className="size-4" />
                  </Link>
                </div>
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
