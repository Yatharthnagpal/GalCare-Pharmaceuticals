"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { JOBS } from "@/lib/site-data";

export default function AdminCareersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    setNewJob({ title: "", department: "", location: "", type: "" });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Career Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage job postings and applications
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Jobs", value: "4", color: "text-blue-500" },
          { label: "Active Postings", value: "4", color: "text-green-500" },
          { label: "New Applications", value: "12", color: "text-amber-500" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-card border border-border p-6 rounded-2xl shadow-soft"
          >
            <h3 className="text-muted-foreground text-sm font-medium">
              {stat.label}
            </h3>
            <p className={`text-4xl font-bold mt-2 ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="p-4 font-semibold text-foreground">Job Title</th>
                <th className="p-4 font-semibold text-foreground">
                  Department
                </th>
                <th className="p-4 font-semibold text-foreground">Location</th>
                <th className="p-4 font-semibold text-foreground">Type</th>
                <th className="p-4 font-semibold text-foreground text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {JOBS.map((job, i) => (
                <tr
                  key={i}
                  className="border-b border-border hover:bg-secondary/20 transition-colors"
                >
                  <td className="p-4 font-medium text-foreground">
                    {job.title}
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {job.department}
                  </td>
                  <td className="p-4 text-muted-foreground">{job.location}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      {job.type}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl shadow-glow w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Add New Job</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Job Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                  value={newJob.title}
                  onChange={(e) =>
                    setNewJob({ ...newJob, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Department</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                  value={newJob.department}
                  onChange={(e) =>
                    setNewJob({ ...newJob, department: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Location</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                    value={newJob.location}
                    onChange={(e) =>
                      setNewJob({ ...newJob, location: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Type</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                    value={newJob.type}
                    onChange={(e) =>
                      setNewJob({ ...newJob, type: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
                >
                  Save Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
