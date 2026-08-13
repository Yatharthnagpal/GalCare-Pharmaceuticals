"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/lib/auth-context";
import { Briefcase, Factory, HelpCircle, FileText, User, ArrowUpRight, CheckCircle2, Search, MessageSquare, Printer, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion-primitives";
import Link from "next/link";

interface StatusTimelineProps {
  status: string;
  type: "quote" | "job" | "enquiry";
}

function GraphicalStatusTracker({ status, type }: StatusTimelineProps) {
  // Determine current active step (1-4)
  let currentStep = 1;
  if (status.includes("Incomplete") || status.includes("New")) {
    currentStep = 1;
  } else if (status.includes("Review") || status.includes("Submitted") || status.includes("Received")) {
    currentStep = 2;
  } else if (status.includes("Interview") || status.includes("Generated") || status.includes("Sent") || status.includes("Ready") || status.includes("Proposal")) {
    currentStep = 3;
  } else if (status.includes("Accepted") || status.includes("Finalized") || status.includes("Converted") || status.includes("Resolved")) {
    currentStep = 4;
  }

  const steps = type === "quote" 
    ? ["RFQ Submitted", "Feasibility Review", "Quote & Proposal", "Contract Finalized"]
    : type === "job"
    ? ["Application Sent", "HR Screening", "Interview Round", "Offer & Onboarding"]
    : ["Inquiry Received", "Medical Team Review", "Product Proposal", "Resolved"];

  return (
    <div className="mt-4 pt-4 border-t border-border/60">
      <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground mb-2">
        <span>Order & Verification Timeline</span>
        <span className="text-primary font-bold">Step {currentStep} of 4</span>
      </div>
      
      {/* Visual Step Progress Bar */}
      <div className="relative flex items-center justify-between">
        {/* Connection line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2 -z-10 rounded-full" />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-sky-500 to-teal-500 -translate-y-1/2 -z-10 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        />

        {steps.map((stepLabel, idx) => {
          const stepNumber = idx + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={stepLabel} className="flex flex-col items-center group">
              <div 
                className={`size-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCompleted
                    ? "bg-teal-500 text-slate-950 shadow-sm"
                    : isCurrent
                    ? "bg-sky-500 text-slate-950 shadow-glow ring-4 ring-sky-500/20"
                    : "bg-muted text-muted-foreground border border-border"
                }`}
              >
                {isCompleted ? <CheckCircle2 className="size-4" /> : stepNumber}
              </div>
              <span className={`mt-1.5 text-[10px] text-center max-w-[80px] leading-tight font-medium ${
                isCurrent ? "text-foreground font-bold" : "text-muted-foreground"
              }`}>
                {stepLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function UserDashboardPage() {
  const { user, userJobApps, user3rdPartyQuotes, userEnquiries, openAuthModal, logout } = useAuth();

  // Filter items matching logged in user
  const myJobApps = user ? userJobApps.filter(
    (app) => app.userEmail.toLowerCase() === user.email.toLowerCase()
  ) : [];

  const myQuotes = user ? user3rdPartyQuotes.filter(
    (q) => q.userEmail.toLowerCase() === user.email.toLowerCase()
  ) : [];

  const myEnquiries = user ? userEnquiries.filter(
    (e) => e.userEmail.toLowerCase() === user.email.toLowerCase()
  ) : [];

  const getDefaultTab = (): "quotes" | "jobs" | "enquiries" => {
    if (myJobApps.length > 0 && myQuotes.length === 0) return "jobs";
    if (myQuotes.length > 0 && myJobApps.length === 0) return "quotes";
    if (myJobApps.length > 0 && myQuotes.length > 0) return "quotes";
    return "enquiries";
  };

  const [activeTab, setActiveTab] = useState<"quotes" | "jobs" | "enquiries">("enquiries");

  useEffect(() => {
    if (user) {
      setActiveTab(getDefaultTab());
    }
  }, [userJobApps.length, user3rdPartyQuotes.length, user?.email]);

  const handlePrintSummary = (title: string, details: string, id: string) => {
    if (typeof window !== "undefined") {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>GalCare Statement - ${id}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; }
                .header { border-bottom: 2px solid #0284c7; padding-bottom: 15px; margin-bottom: 20px; }
                .title { font-size: 22px; font-weight: bold; color: #0f172a; }
                .sub { font-size: 12px; color: #64748b; }
                .card { border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; margin-top: 20px; }
                .footer { margin-top: 40px; font-size: 11px; color: #94a3b8; text-align: center; }
              </style>
            </head>
            <body>
              <div class="header">
                <div class="title">GalCare Pharmaceuticals — B2B Partner Portal</div>
                <div class="sub">Official Inquiry Summary Statement • ID: ${id}</div>
              </div>
              <div><strong>Account:</strong> ${user?.fullName} (${user?.email})</div>
              <div><strong>Company:</strong> ${user?.company || "Independent"}</div>
              <div class="card">
                <h3>${title}</h3>
                <p>${details}</p>
              </div>
              <div class="footer">
                Verified Document • GalCare Pharmaceuticals WHO-GMP Facility Network • https://galcare.com
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow pt-32 pb-20 px-4 text-center max-w-xl mx-auto flex flex-col justify-center items-center">
          <div className="grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary mb-4">
            <User className="size-8" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Access Your Partner Portal</h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Please sign in or create an account to view your submitted manufacturing quotes, product inquiries, and job application status.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => openAuthModal("signup")}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl text-sm shadow-glow hover:bg-primary/95"
            >
              Sign Up (B2B Partner)
            </button>
            <button
              onClick={() => openAuthModal("login")}
              className="px-6 py-3 border border-border text-foreground font-semibold rounded-xl text-sm hover:bg-accent"
            >
              Sign In
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    let bg = "bg-muted text-muted-foreground border-border";
    if (status.includes("Incomplete")) {
      bg = "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    } else if (status.includes("Review") || status.includes("Submitted") || status.includes("Received")) {
      bg = "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    } else if (status.includes("Interview") || status.includes("Generated") || status.includes("Sent") || status.includes("Ready")) {
      bg = "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
    } else if (status.includes("Accepted") || status.includes("Finalized") || status.includes("Converted") || status.includes("Resolved")) {
      bg = "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
    }

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${bg}`}>
        <span className="size-1.5 rounded-full bg-current" />
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* User Welcome Banner */}
        <Reveal className="bg-card border border-border rounded-[2rem] p-6 sm:p-8 shadow-soft flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary font-bold text-xl">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">{user.fullName}</h1>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary border border-primary/20 capitalize">
                  {user.role ? `${user.role} Account` : myJobApps.length > 0 ? "Candidate Partner" : myQuotes.length > 0 ? "3rd Party B2B Partner" : "Registered Client"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {user.company ? `${user.company} • ` : ""}{user.email} • {user.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="px-4 py-2.5 border border-border text-foreground font-semibold rounded-xl text-xs hover:bg-accent transition-all flex items-center gap-1.5"
            >
              <Search className="size-3.5" /> Browse Products
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2.5 border border-border text-foreground font-semibold rounded-xl text-xs hover:bg-muted transition-all"
            >
              Sign Out
            </button>
          </div>
        </Reveal>

        {/* Dashboard Navigation Menu Bar */}
        <div className="mt-8 bg-card border border-border rounded-2xl p-1.5 shadow-soft flex overflow-x-auto gap-1">
          <button
            onClick={() => setActiveTab("quotes")}
            className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === "quotes"
                ? "bg-primary text-primary-foreground shadow-glow"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            <Factory className="size-4" />
            <span>3rd Party Requests</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-background/20 font-extrabold">
              {myQuotes.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === "jobs"
                ? "bg-primary text-primary-foreground shadow-glow"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            <Briefcase className="size-4" />
            <span>Job Applications</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-background/20 font-extrabold">
              {myJobApps.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("enquiries")}
            className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === "enquiries"
                ? "bg-primary text-primary-foreground shadow-glow"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            <HelpCircle className="size-4" />
            <span>Product Enquiries</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-background/20 font-extrabold">
              {myEnquiries.length}
            </span>
          </button>
        </div>

        {/* Main Content Dashboard Panel */}
        <div className="mt-6 bg-card border border-border rounded-[2rem] shadow-soft overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-bold text-lg text-foreground">
              {activeTab === "quotes"
                ? "3rd Party Manufacturing Status"
                : activeTab === "jobs"
                ? "Job Application Status"
                : "Product Enquiry Dashboard"}
            </h2>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Managed directly by Galcare Support Team
            </span>
          </div>

          {activeTab === "quotes" && (
            <div className="p-6">
              {myQuotes.length > 0 ? (
                <div className="space-y-6">
                  {myQuotes.map((q) => (
                    <div
                      key={q.id}
                      className="p-6 rounded-2xl border border-border bg-background flex flex-col gap-4 shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base text-foreground">{q.requirements}</h3>
                            <span className="text-xs text-muted-foreground">• {q.date}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-xl">
                            {q.message}
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-2">
                            Company: <span className="font-semibold text-foreground">{q.companyName || user.company || "Independent"}</span> • Contact: <span className="font-semibold text-foreground">{q.phone}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(q.status)}
                          <button
                            onClick={() => handlePrintSummary(q.requirements, q.message, q.id)}
                            className="p-2 border border-border rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                            title="Print Quote Summary"
                          >
                            <Printer className="size-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Graphical Step Timeline */}
                      <GraphicalStatusTracker status={q.status} type="quote" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Factory className="mx-auto size-10 text-muted-foreground/40 mb-3" />
                  <p className="font-semibold text-sm">No 3rd Party Manufacturing Requests Submitted</p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                    Submit a requirement to receive WHO-GMP capacity quotes and bulk contract pricing.
                  </p>
                  <Link
                    href="/register"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    Request a Quote Now <ArrowUpRight className="size-3" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === "jobs" && (
            <div className="p-6">
              {myJobApps.length > 0 ? (
                <div className="space-y-6">
                  {myJobApps.map((app) => (
                    <div
                      key={app.id}
                      className="p-6 rounded-2xl border border-border bg-background flex flex-col gap-4 shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base text-foreground">{app.jobTitle}</h3>
                            <span className="text-xs text-muted-foreground">• {app.date}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Department: <span className="font-semibold text-foreground">{app.department}</span> • Experience: <span className="font-semibold text-foreground">{app.experience}</span>
                          </p>
                          {app.resume && (
                            <a
                              href={app.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                            >
                              <FileText className="size-3" /> View Submitted Resume
                            </a>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(app.status)}
                          <button
                            onClick={() => handlePrintSummary(app.jobTitle, `Department: ${app.department}`, app.id)}
                            className="p-2 border border-border rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                            title="Print Application Details"
                          >
                            <Printer className="size-4" />
                          </button>
                        </div>
                      </div>

                      {/* Graphical Step Timeline */}
                      <GraphicalStatusTracker status={app.status} type="job" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Briefcase className="mx-auto size-10 text-muted-foreground/40 mb-3" />
                  <p className="font-semibold text-sm">No Job Applications Submitted</p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                    Explore active career opportunities across R&D, Quality Control, and Sales.
                  </p>
                  <Link
                    href="/careers"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    Explore Open Positions <ArrowUpRight className="size-3" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === "enquiries" && (
            <div className="p-6">
              {myEnquiries.length > 0 ? (
                <div className="space-y-6">
                  {myEnquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-6 rounded-2xl border border-border bg-background flex flex-col gap-4 shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base text-foreground">{enq.productName}</h3>
                            <span className="text-xs text-muted-foreground">• {enq.date}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-xl">
                            {enq.message}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(enq.status)}
                          <button
                            onClick={() => handlePrintSummary(enq.productName, enq.message, enq.id)}
                            className="p-2 border border-border rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                            title="Print Inquiry Details"
                          >
                            <Printer className="size-4" />
                          </button>
                        </div>
                      </div>

                      {/* Graphical Step Timeline */}
                      <GraphicalStatusTracker status={enq.status} type="enquiry" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="mx-auto size-10 text-muted-foreground/40 mb-3" />
                  <p className="font-semibold text-sm">Product Enquiry Dashboard</p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                    You currently have no active product inquiries. Browse our 68+ WHO-GMP certified products or contact our team for bulk pricing.
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <Link
                      href="/products"
                      className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl text-xs shadow-glow"
                    >
                      Explore Products
                    </Link>
                    <Link
                      href="/contact"
                      className="px-5 py-2.5 border border-border text-foreground font-semibold rounded-xl text-xs hover:bg-accent"
                    >
                      Contact Support
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
