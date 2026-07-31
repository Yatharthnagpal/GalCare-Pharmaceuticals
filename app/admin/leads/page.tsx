"use client";

import { useState } from "react";
import { Search, Download, Filter, FileText, Phone, Mail, UserCheck, Copy, Check } from "lucide-react";
import { useAuth, UserLead } from "@/lib/auth-context";

const REGISTRATIONS = [
  {
    name: "John Doe",
    company: "PharmaCorp",
    phone: "+1 234 567 8900",
    email: "john@pharmacorp.com",
    date: "Oct 24, 2023",
    status: "New",
  },
  {
    name: "Sarah Smith",
    company: "HealthPlus",
    phone: "+44 20 7123 4567",
    email: "sarah@healthplus.co.uk",
    date: "Oct 22, 2023",
    status: "Contacted",
  },
  {
    name: "Raj Patel",
    company: "MediGlobal",
    phone: "+91 98765 43210",
    email: "raj@mediglobal.in",
    date: "Oct 20, 2023",
    status: "Converted",
  },
];

const THIRD_PARTY = [
  {
    name: "Alice Wong",
    company: "BioGen",
    phone: "+65 6123 4567",
    req: "Syrups/Suspensions",
    date: "Oct 25, 2023",
    status: "New",
  },
  {
    name: "Carlos Ruiz",
    company: "VivaSalud",
    phone: "+34 91 123 4567",
    req: "Tablets",
    date: "Oct 21, 2023",
    status: "Contacted",
  },
];

const JOB_APPS = [
  {
    name: "Emily Chen",
    position: "Quality Control Manager",
    email: "emily.chen@email.com",
    date: "Oct 26, 2023",
    status: "New",
  },
  {
    name: "Michael Johnson",
    position: "Production Supervisor",
    email: "mjohnson@email.com",
    date: "Oct 23, 2023",
    status: "Contacted",
  },
];

const ENQUIRIES = [
  {
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
  const { capturedLeads, updateLeadStatus } = useAuth();

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

  const renderStatus = (status: string) => {
    let bg = "bg-gray-100 text-gray-700";
    if (status.includes("New"))
      bg = "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    if (status.includes("Contacted") || status.includes("Cold Emailed"))
      bg = "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    if (status.includes("Called"))
      bg = "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
    if (status.includes("Converted"))
      bg = "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";

    return (
      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${bg}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Leads Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all incoming requests and applications
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
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
                  ? "border-primary text-primary"
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
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Name
                  </th>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Company
                  </th>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Contact
                  </th>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Date
                  </th>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Status
                  </th>
                </tr>
              )}
              {activeTab === "third-party" && (
                <tr>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Name
                  </th>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Company
                  </th>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Requirements
                  </th>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Date
                  </th>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Status
                  </th>
                </tr>
              )}
              {activeTab === "job-apps" && (
                <tr>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Applicant
                  </th>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Position
                  </th>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Resume
                  </th>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Date
                  </th>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Status
                  </th>
                </tr>
              )}
              {activeTab === "enquiries" && (
                <tr>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Name
                  </th>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Product
                  </th>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Message
                  </th>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Date
                  </th>
                  <th className="p-4 font-semibold text-sm text-foreground">
                    Status
                  </th>
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
                        className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground focus:outline-none"
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
                REGISTRATIONS.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-border hover:bg-secondary/20"
                  >
                    <td className="p-4 text-sm font-medium">{row.name}</td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {row.company}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      <div>{row.email}</div>
                      <div className="text-xs">{row.phone}</div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {row.date}
                    </td>
                    <td className="p-4">{renderStatus(row.status)}</td>
                  </tr>
                ))}

              {activeTab === "third-party" &&
                THIRD_PARTY.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-border hover:bg-secondary/20"
                  >
                    <td className="p-4 text-sm font-medium">{row.name}</td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {row.company}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {row.req}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {row.date}
                    </td>
                    <td className="p-4">{renderStatus(row.status)}</td>
                  </tr>
                ))}

              {activeTab === "job-apps" &&
                JOB_APPS.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-border hover:bg-secondary/20"
                  >
                    <td className="p-4 text-sm font-medium">
                      <div>{row.name}</div>
                      <div className="text-xs text-muted-foreground font-normal">
                        {row.email}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {row.position}
                    </td>
                    <td className="p-4">
                      <button className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                        <FileText className="w-4 h-4" /> View Resume
                      </button>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {row.date}
                    </td>
                    <td className="p-4">{renderStatus(row.status)}</td>
                  </tr>
                ))}

              {activeTab === "enquiries" &&
                ENQUIRIES.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-border hover:bg-secondary/20"
                  >
                    <td className="p-4 text-sm font-medium">
                      <div>{row.name}</div>
                      <div className="text-xs text-muted-foreground font-normal">
                        {row.email}
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium text-primary">
                      {row.product}
                    </td>
                    <td
                      className="p-4 text-sm text-muted-foreground max-w-xs truncate"
                      title={row.message}
                    >
                      {row.message}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {row.date}
                    </td>
                    <td className="p-4">{renderStatus(row.status)}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          {((activeTab === "user-leads" && capturedLeads.length === 0) ||
            (activeTab === "registrations" && REGISTRATIONS.length === 0) ||
            (activeTab === "third-party" && THIRD_PARTY.length === 0) ||
            (activeTab === "job-apps" && JOB_APPS.length === 0) ||
            (activeTab === "enquiries" && ENQUIRIES.length === 0)) && (
            <div className="p-8 text-center text-muted-foreground">
              No data available for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
