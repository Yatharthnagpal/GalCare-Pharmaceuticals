"use client";

import { useState, useEffect } from "react";
import { Search, Download, Filter, FileText, Phone, Mail, UserCheck, Copy, Check } from "lucide-react";
import { useAuth, UserLead } from "@/lib/auth-context";

interface GenericLead {
  id?: string;
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  req?: string;
  position?: string;
  product?: string;
  message?: string;
  date: string;
  status: string;
}

const INITIAL_REGISTRATIONS: GenericLead[] = [
  {
    id: "reg-1",
    name: "John Doe",
    company: "PharmaCorp",
    phone: "+1 234 567 8900",
    email: "john@pharmacorp.com",
    date: "Oct 24, 2023",
    status: "New",
  },
  {
    id: "reg-2",
    name: "Sarah Smith",
    company: "HealthPlus",
    phone: "+44 20 7123 4567",
    email: "sarah@healthplus.co.uk",
    date: "Oct 22, 2023",
    status: "Contacted",
  },
  {
    id: "reg-3",
    name: "Raj Patel",
    company: "MediGlobal",
    phone: "+91 98765 43210",
    email: "raj@mediglobal.in",
    date: "Oct 20, 2023",
    status: "Converted",
  },
];

const INITIAL_THIRD_PARTY: GenericLead[] = [
  {
    id: "tp-1",
    name: "Alice Wong",
    company: "BioGen",
    phone: "+65 6123 4567",
    req: "Syrups/Suspensions",
    date: "Oct 25, 2023",
    status: "New",
  },
  {
    id: "tp-2",
    name: "Carlos Ruiz",
    company: "VivaSalud",
    phone: "+34 91 123 4567",
    req: "Tablets",
    date: "Oct 21, 2023",
    status: "Contacted",
  },
];

const INITIAL_JOB_APPS: GenericLead[] = [
  {
    id: "ja-1",
    name: "Emily Chen",
    position: "Quality Control Manager",
    email: "emily.chen@email.com",
    phone: "+1 (555) 890-1234",
    date: "Oct 26, 2023",
    status: "New",
  },
  {
    id: "ja-2",
    name: "Michael Johnson",
    position: "Production Supervisor",
    email: "mjohnson@email.com",
    phone: "+44 7700 900077",
    date: "Oct 23, 2023",
    status: "Contacted",
  },
];

const INITIAL_ENQUIRIES: GenericLead[] = [
  {
    id: "enq-1",
    name: "David Kim",
    product: "Galmol 500",
    email: "david.kim@email.com",
    message: "Looking for bulk pricing for 10,000 units.",
    date: "Oct 26, 2023",
    status: "New",
  },
];

export default function AdminLeadsPage() {
  const [activeTab, setActiveTab] = useState("user-leads");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { capturedLeads, updateLeadStatus, updateUserJobAppStatus, updateUser3rdPartyStatus } = useAuth();

  // State for all categories to allow status changes
  const [registrations, setRegistrations] = useState<GenericLead[]>(INITIAL_REGISTRATIONS);
  const [thirdParty, setThirdParty] = useState<GenericLead[]>(INITIAL_THIRD_PARTY);
  const [jobApps, setJobApps] = useState<GenericLead[]>(INITIAL_JOB_APPS);
  const [enquiries, setEnquiries] = useState<GenericLead[]>(INITIAL_ENQUIRIES);

  useEffect(() => {
    // Load persisted statuses
    const savedRegs = localStorage.getItem("galcare_leads_registrations");
    if (savedRegs) setRegistrations(JSON.parse(savedRegs));

    const savedTp = localStorage.getItem("galcare_leads_thirdparty");
    if (savedTp) setThirdParty(JSON.parse(savedTp));

    const savedJa = localStorage.getItem("galcare_leads_jobapps");
    if (savedJa) setJobApps(JSON.parse(savedJa));

    const savedEnq = localStorage.getItem("galcare_leads_enquiries");
    if (savedEnq) setEnquiries(JSON.parse(savedEnq));
  }, []);

  const TABS = [
    { id: "user-leads", label: `Captured B2B Leads (${capturedLeads.length})` },
    { id: "registrations", label: "Registrations" },
    { id: "third-party", label: "Third Party Requests" },
    { id: "job-apps", label: "Job Applications" },
    { id: "enquiries", label: "Product Enquiries" },
  ];

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStatusChange = (
    category: "registrations" | "third-party" | "job-apps" | "enquiries",
    index: number,
    newStatus: string
  ) => {
    if (category === "registrations") {
      const updated = [...registrations];
      updated[index].status = newStatus;
      setRegistrations(updated);
      localStorage.setItem("galcare_leads_registrations", JSON.stringify(updated));
    } else if (category === "third-party") {
      const updated = [...thirdParty];
      const item = updated[index];
      item.status = newStatus;
      setThirdParty(updated);
      localStorage.setItem("galcare_leads_thirdparty", JSON.stringify(updated));

      // Also update user3rdPartyQuotes if item has id
      if (item.id) {
        updateUser3rdPartyStatus(item.id, newStatus as any);
      }
    } else if (category === "job-apps") {
      const updated = [...jobApps];
      const item = updated[index];
      item.status = newStatus;
      setJobApps(updated);
      localStorage.setItem("galcare_leads_jobapps", JSON.stringify(updated));

      // Also update userJobApps if item has id
      if (item.id) {
        updateUserJobAppStatus(item.id, newStatus as any);
      }
    } else if (category === "enquiries") {
      const updated = [...enquiries];
      updated[index].status = newStatus;
      setEnquiries(updated);
      localStorage.setItem("galcare_leads_enquiries", JSON.stringify(updated));
    }
  };

  const renderStatusDropdown = (
    currentStatus: string,
    onStatusChange: (newStatus: string) => void
  ) => {
    return (
      <select
        value={currentStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="In Discussion">In Discussion</option>
        <option value="Converted">Converted</option>
        <option value="Rejected">Rejected</option>
      </select>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Leads & Applications Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage, track, and update statuses for all incoming client requests and candidates
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search leads..."
              className="pl-9 pr-4 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button className="p-2 border border-border rounded-xl text-muted-foreground hover:bg-secondary transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-border hide-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-secondary/30">
              {activeTab === "user-leads" && (
                <tr>
                  <th className="p-4 font-semibold text-sm text-foreground">Lead Partner</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Company</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Primary Contact</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Interest Area</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Date</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Outreach Status</th>
                  <th className="p-4 font-semibold text-sm text-foreground text-right">Actions</th>
                </tr>
              )}
              {activeTab === "registrations" && (
                <tr>
                  <th className="p-4 font-semibold text-sm text-foreground">Name</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Company</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Contact</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Date</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Status (Changeable)</th>
                </tr>
              )}
              {activeTab === "third-party" && (
                <tr>
                  <th className="p-4 font-semibold text-sm text-foreground">Name</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Company</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Requirements</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Date</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Status (Changeable)</th>
                </tr>
              )}
              {activeTab === "job-apps" && (
                <tr>
                  <th className="p-4 font-semibold text-sm text-foreground">Applicant</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Position</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Resume</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Date</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Status (Changeable)</th>
                </tr>
              )}
              {activeTab === "enquiries" && (
                <tr>
                  <th className="p-4 font-semibold text-sm text-foreground">Name</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Product</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Message</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Date</th>
                  <th className="p-4 font-semibold text-sm text-foreground">Status (Changeable)</th>
                </tr>
              )}
            </thead>
            <tbody>
              {activeTab === "user-leads" &&
                capturedLeads.map((lead) => (
                  <tr key={lead.id} className="border-t border-border hover:bg-secondary/20">
                    <td className="p-4 text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <div className="grid size-7 place-items-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                          {lead.fullName.charAt(0)}
                        </div>
                        <div>
                          <div>{lead.fullName}</div>
                          {lead.consent && (
                            <span className="text-[10px] text-green-600 dark:text-green-400 flex items-center gap-0.5 font-medium">
                              <Check className="size-3" /> Consent for Cold Outreach
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{lead.company || "Independent"}</td>
                    <td className="p-4 text-sm text-muted-foreground">
                      <div className="font-medium text-foreground">{lead.phone}</div>
                      <div className="text-xs text-muted-foreground">{lead.email}</div>
                    </td>
                    <td className="p-4 text-sm">
                      <span className="rounded-lg bg-accent/60 px-2.5 py-1 text-xs font-semibold text-foreground">
                        {lead.interest || "3rd Party Manufacturing"}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{lead.createdAt}</td>
                    <td className="p-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                        className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="New (Uncontacted)">New (Uncontacted)</option>
                        <option value="Cold Emailed">Cold Emailed</option>
                        <option value="Called">Called</option>
                        <option value="Converted">Converted</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleCopyEmail(lead.email, lead.id)}
                          className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-foreground hover:bg-accent transition-colors"
                          title="Copy email address for cold mail"
                        >
                          {copiedId === lead.id ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5 text-primary" />}
                          {copiedId === lead.id ? "Copied!" : "Cold Mail"}
                        </button>
                        <a
                          href={`tel:${lead.phone}`}
                          className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
                          title="Call phone number"
                        >
                          <Phone className="size-3.5" /> Call
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}

              {activeTab === "registrations" &&
                registrations.map((row, i) => (
                  <tr key={i} className="border-t border-border hover:bg-secondary/20">
                    <td className="p-4 text-sm font-medium">{row.name}</td>
                    <td className="p-4 text-sm text-muted-foreground">{row.company}</td>
                    <td className="p-4 text-sm text-muted-foreground">
                      <div>{row.email}</div>
                      <div className="text-xs">{row.phone}</div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{row.date}</td>
                    <td className="p-4">
                      {renderStatusDropdown(row.status, (newStatus) =>
                        handleStatusChange("registrations", i, newStatus)
                      )}
                    </td>
                  </tr>
                ))}

              {activeTab === "third-party" &&
                thirdParty.map((row, i) => (
                  <tr key={i} className="border-t border-border hover:bg-secondary/20">
                    <td className="p-4 text-sm font-medium">{row.name}</td>
                    <td className="p-4 text-sm text-muted-foreground">{row.company}</td>
                    <td className="p-4 text-sm text-muted-foreground">{row.req}</td>
                    <td className="p-4 text-sm text-muted-foreground">{row.date}</td>
                    <td className="p-4">
                      {renderStatusDropdown(row.status, (newStatus) =>
                        handleStatusChange("third-party", i, newStatus)
                      )}
                    </td>
                  </tr>
                ))}

              {activeTab === "job-apps" &&
                jobApps.map((row, i) => (
                  <tr key={i} className="border-t border-border hover:bg-secondary/20">
                    <td className="p-4 text-sm font-medium">
                      <div>{row.name}</div>
                      <div className="text-xs text-muted-foreground font-normal">{row.email}</div>
                      {row.phone && (
                        <a
                          href={`tel:${row.phone}`}
                          className="text-xs font-semibold text-primary flex items-center gap-1 mt-0.5 hover:underline"
                        >
                          <Phone className="size-3" /> {row.phone}
                        </a>
                      )}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{row.position}</td>
                    <td className="p-4">
                      <button className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                        <FileText className="w-4 h-4" /> View Resume
                      </button>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{row.date}</td>
                    <td className="p-4">
                      {renderStatusDropdown(row.status, (newStatus) =>
                        handleStatusChange("job-apps", i, newStatus)
                      )}
                    </td>
                  </tr>
                ))}

              {activeTab === "enquiries" &&
                enquiries.map((row, i) => (
                  <tr key={i} className="border-t border-border hover:bg-secondary/20">
                    <td className="p-4 text-sm font-medium">
                      <div>{row.name}</div>
                      <div className="text-xs text-muted-foreground font-normal">{row.email}</div>
                    </td>
                    <td className="p-4 text-sm font-medium text-primary">{row.product}</td>
                    <td className="p-4 text-sm text-muted-foreground max-w-xs truncate" title={row.message}>
                      {row.message}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{row.date}</td>
                    <td className="p-4">
                      {renderStatusDropdown(row.status, (newStatus) =>
                        handleStatusChange("enquiries", i, newStatus)
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {((activeTab === "user-leads" && capturedLeads.length === 0) ||
            (activeTab === "registrations" && registrations.length === 0) ||
            (activeTab === "third-party" && thirdParty.length === 0) ||
            (activeTab === "job-apps" && jobApps.length === 0) ||
            (activeTab === "enquiries" && enquiries.length === 0)) && (
            <div className="p-8 text-center text-muted-foreground">
              No data available for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
