"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Capability {
  formatName: string;
  capacity: string;
  description: string;
}

const INITIAL_CAPABILITIES: Capability[] = [
  {
    formatName: "Creams, Ointments & Gels (Derma)",
    capacity: "50,000 units/day",
    description: "Premium topical formulations for dermatological care",
  },
  {
    formatName: "Tablets & Capsules (Solid Oral Doses)",
    capacity: "200,000 units/day",
    description: "High-speed tableting and capsule filling",
  },
  {
    formatName: "Liquid Oral Suspensions & Syrups",
    capacity: "30,000 bottles/day",
    description: "Sterile liquid manufacturing with automated filling",
  },
  {
    formatName: "Hair Serums, Lotions & Shampoos",
    capacity: "40,000 units/day",
    description: "Cosmeceutical personal care manufacturing",
  },
];

export default function ManufacturingAdminPage() {
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [form, setForm] = useState<Capability>({
    formatName: "",
    capacity: "",
    description: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("galcare_admin_manufacturing");
    if (saved) {
      try {
        setCapabilities(JSON.parse(saved));
      } catch (e) {
        console.error(e);
        setCapabilities(INITIAL_CAPABILITIES);
      }
    } else {
      setCapabilities(INITIAL_CAPABILITIES);
      localStorage.setItem("galcare_admin_manufacturing", JSON.stringify(INITIAL_CAPABILITIES));
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  const handleOpenAddModal = () => {
    setEditingIndex(null);
    setForm({ formatName: "", capacity: "", description: "" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (index: number) => {
    setEditingIndex(index);
    setForm(capabilities[index]);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.formatName.trim()) return;

    let updated: Capability[];
    if (editingIndex !== null) {
      updated = [...capabilities];
      updated[editingIndex] = form;
    } else {
      updated = [form, ...capabilities];
    }

    setCapabilities(updated);
    localStorage.setItem("galcare_admin_manufacturing", JSON.stringify(updated));
    setIsModalOpen(false);
  };

  const handleDelete = (index: number) => {
    if (confirm("Are you sure you want to remove this capability?")) {
      const updated = capabilities.filter((_, i) => i !== index);
      setCapabilities(updated);
      localStorage.setItem("galcare_admin_manufacturing", JSON.stringify(updated));
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin/third-party" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Third Party
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Manufacturing Capabilities
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage formats and production capacities for third-party manufacturing
            </p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold shadow-glow hover:bg-primary/95 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Capability
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="p-4 font-semibold text-sm text-foreground">Format Name</th>
                <th className="p-4 font-semibold text-sm text-foreground">Capacity</th>
                <th className="p-4 font-semibold text-sm text-foreground">Description</th>
                <th className="p-4 font-semibold text-sm text-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {capabilities.map((cap, index) => (
                <tr
                  key={index}
                  className="border-b border-border hover:bg-secondary/20 transition-colors"
                >
                  <td className="p-4 font-semibold text-foreground max-w-xs">{cap.formatName}</td>
                  <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">{cap.capacity}</td>
                  <td className="p-4 text-sm text-muted-foreground max-w-md line-clamp-2">{cap.description}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditModal(index)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-2 text-muted-foreground hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {capabilities.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">
                    No capabilities found. Click "Add Capability" to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl shadow-glow w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">
                {editingIndex !== null ? "Edit Capability" : "Add Capability"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Format Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tablets & Capsules"
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  value={form.formatName}
                  onChange={(e) => setForm({ ...form, formatName: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Capacity *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 200,000 units/day"
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  value={form.capacity}
                  onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Description</label>
                <textarea
                  rows={3}
                  placeholder="Details about this manufacturing format..."
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
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
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
