"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import { JOBS, Job } from "@/lib/site-data";
import Link from "next/link";

interface JobApplication {
  id: string;
  name: string;
  position: string;
  email: string;
  date: string;
  status: "New" | "Contacted" | "Interviewed" | "Hired" | "Rejected";
}

const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: "app-1",
    name: "Emily Chen",
    position: "Quality Control Manager",
    email: "emily.chen@email.com",
    date: "2026-07-26",
    status: "New",
  },
  {
    id: "app-2",
    name: "Michael Johnson",
    position: "Production Supervisor",
    email: "mjohnson@email.com",
    date: "2026-07-23",
    status: "Contacted",
  },
  {
    id: "app-3",
    name: "Dr. Aris Mehta",
    position: "Senior Formulation Scientist",
    email: "aris.mehta@pharma-res.org",
    date: "2026-07-29",
    status: "New",
  },
];

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<Job[]>(JOBS);
  const [applications, setApplications] = useState<JobApplication[]>(INITIAL_APPLICATIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [jobForm, setJobForm] = useState({
    title: "",
    department: "R&D",
    location: "Bengaluru",
    type: "Full-time",
    description: "",
  });

  useEffect(() => {
    const loadData = () => {
      const savedJobs = localStorage.getItem("galcare_admin_jobs");
      if (savedJobs) {
        try {
          setJobs(JSON.parse(savedJobs));
        } catch (e) {
          console.error("Failed to parse saved jobs", e);
        }
      } else {
        localStorage.setItem("galcare_admin_jobs", JSON.stringify(JOBS));
      }

      const savedApps = localStorage.getItem("galcare_admin_job_apps");
      if (savedApps) {
        try {
          setApplications(JSON.parse(savedApps));
        } catch (e) {
          console.error("Failed to parse saved job applications", e);
        }
      } else {
        localStorage.setItem("galcare_admin_job_apps", JSON.stringify(INITIAL_APPLICATIONS));
      }
    };

    loadData();
    window.addEventListener("storage", loadData);
    return () => window.removeEventListener("storage", loadData);
  }, []);

  const handleOpenAddModal = () => {
    setEditingIndex(null);
    setJobForm({ title: "", department: "R&D", location: "Bengaluru", type: "Full-time", description: "" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (index: number) => {
    setEditingIndex(index);
    const j = jobs[index];
    setJobForm({
      title: j.title,
      department: j.department,
      location: j.location,
      type: j.type,
      description: j.description || "",
    });
    setIsModalOpen(true);
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title.trim()) return;

    let updated: Job[];
    if (editingIndex !== null) {
      updated = [...jobs];
      updated[editingIndex] = jobForm;
    } else {
      updated = [jobForm, ...jobs];
    }

    setJobs(updated);
    localStorage.setItem("galcare_admin_jobs", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    setIsModalOpen(false);
    setJobForm({ title: "", department: "R&D", location: "Bengaluru", type: "Full-time", description: "" });
  };

  const handleDeleteJob = (index: number) => {
    if (confirm("Are you sure you want to remove this job posting?")) {
      const updated = jobs.filter((_, i) => i !== index);
      setJobs(updated);
      localStorage.setItem("galcare_admin_jobs", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    }
  };

  const totalJobsCount = jobs.length;
  const activePostingsCount = jobs.length;
  const newApplicationsCount = applications.filter((app) => app.status === "New").length;
  const totalApplicationsCount = applications.length;

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Career Management Portal
          </h1>
          <p className="text-muted-foreground mt-1">
            Create job openings, manage postings, and track candidate applications
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold shadow-glow hover:bg-primary/95 transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Job
        </button>
      </div>

      {/* Dynamic Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-card border border-border p-6 rounded-2xl shadow-soft">
          <h3 className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
            Total Job Listings
          </h3>
          <p className="text-4xl font-extrabold mt-2 text-blue-500">
            {totalJobsCount}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Active careers on public site</p>
        </div>

        <div className="bg-card border border-border p-6 rounded-2xl shadow-soft">
          <h3 className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
            Active Postings
          </h3>
          <p className="text-4xl font-extrabold mt-2 text-green-500">
            {activePostingsCount}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Currently accepting resumes</p>
        </div>

        <div className="bg-card border border-border p-6 rounded-2xl shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                New Applications
              </h3>
              <span className="text-[10px] font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full border border-amber-500/20">
                {totalApplicationsCount} Total
              </span>
            </div>
            <p className="text-4xl font-extrabold mt-2 text-amber-500">
              {newApplicationsCount}
            </p>
          </div>
          <Link
            href="/admin/leads?tab=job-apps"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline mt-3"
          >
            Review Candidates in Dashboard <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>

      {/* Job Postings Table */}
      <div className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg text-foreground">Current Job Openings ({jobs.length})</h2>
            <p className="text-xs text-muted-foreground">Listings rendered on the public /careers page</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="p-4 font-semibold text-sm text-foreground">Job Title</th>
                <th className="p-4 font-semibold text-sm text-foreground">Department</th>
                <th className="p-4 font-semibold text-sm text-foreground">Location</th>
                <th className="p-4 font-semibold text-sm text-foreground">Employment Type</th>
                <th className="p-4 font-semibold text-sm text-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr
                  key={index}
                  className="border-b border-border hover:bg-secondary/20 transition-colors"
                >
                  <td className="p-4 font-semibold text-foreground max-w-xs">
                    <div>{job.title}</div>
                    {job.description && (
                      <p className="text-xs text-muted-foreground font-normal line-clamp-2 mt-1 leading-relaxed">
                        {job.description}
                      </p>
                    )}
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{job.department}</td>
                  <td className="p-4 text-sm text-muted-foreground">{job.location}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                      {job.type}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditModal(index)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary"
                        title="Edit Job"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(index)}
                        className="p-2 text-muted-foreground hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10"
                        title="Delete Job"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {jobs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No active job listings. Click &quot;Add New Job&quot; to publish an opening.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl shadow-glow w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">
                {editingIndex !== null ? "Edit Job Posting" : "Add New Job Opening"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveJob} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Job Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior QC Executive"
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Department *</label>
                  <select
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                  >
                    <option value="R&D">R&D</option>
                    <option value="Quality">Quality Control</option>
                    <option value="Production">Production</option>
                    <option value="Sales">Sales & Marketing</option>
                    <option value="Regulatory">Regulatory Affairs</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Employment Type *</label>
                  <select
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bengaluru / Mumbai / Remote"
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  value={jobForm.location}
                  onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Job Description (Paragraph Format) *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the job responsibilities, key qualifications, and technical requirements in detail..."
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm shadow-glow hover:bg-primary/95"
                >
                  {editingIndex !== null ? "Save Changes" : "Publish Job Posting"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
