"use client";

import { useState, useEffect, useRef } from "react";
import { UploadCloud, RotateCcw, Edit2, ArrowLeft, X, Check, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface PartnerSlot {
  id: string;
  slotNumber: number;
  name: string;
  logoUrl: string;
}

export const INITIAL_PARTNERS: PartnerSlot[] = [
  { id: "slot-1", slotNumber: 1, name: "Partner 1", logoUrl: "/partners/partner1.png" },
  { id: "slot-2", slotNumber: 2, name: "Partner 2", logoUrl: "/partners/partner2.png" },
  { id: "slot-3", slotNumber: 3, name: "Partner 3", logoUrl: "/partners/partner3.png" },
  { id: "slot-4", slotNumber: 4, name: "Partner 4", logoUrl: "/partners/partner4.png" },
  { id: "slot-5", slotNumber: 5, name: "Partner 5", logoUrl: "/partners/partner2.png" },
  { id: "slot-6", slotNumber: 6, name: "Partner 6", logoUrl: "/partners/partner1.png" },
  { id: "slot-7", slotNumber: 7, name: "Partner 7", logoUrl: "/partners/partner3.png" },
  { id: "slot-8", slotNumber: 8, name: "Partner 8", logoUrl: "/partners/partner4.png" },
  { id: "slot-9", slotNumber: 9, name: "Partner 9", logoUrl: "/partners/partner3.png" },
  { id: "slot-10", slotNumber: 10, name: "Partner 10", logoUrl: "/partners/partner1.png" },
  { id: "slot-11", slotNumber: 11, name: "Partner 11", logoUrl: "/partners/partner2.png" },
  { id: "slot-12", slotNumber: 12, name: "Partner 12", logoUrl: "/partners/partner4.png" },
];

const normalize12Slots = (input: any[]): PartnerSlot[] => {
  if (!Array.isArray(input)) return INITIAL_PARTNERS;
  return INITIAL_PARTNERS.map((defaultSlot, idx) => {
    const found = input[idx] || input.find((item: any) => item.slotNumber === idx + 1);
    if (found && found.logoUrl) {
      return {
        id: found.id || defaultSlot.id,
        slotNumber: idx + 1,
        name: found.name || defaultSlot.name,
        logoUrl: found.logoUrl,
      };
    }
    return defaultSlot;
  });
};

export default function PartnersAdminPage() {
  const [partners, setPartners] = useState<PartnerSlot[]>(INITIAL_PARTNERS);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Modal state for editing a specific slot
  const [editingSlotIndex, setEditingSlotIndex] = useState<number | null>(null);
  const [formName, setFormName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("galcare_admin_partners");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const normalized = normalize12Slots(parsed);
        setPartners(normalized);
        localStorage.setItem("galcare_admin_partners", JSON.stringify(normalized));
      } catch (e) {
        console.error("Failed to parse admin partners", e);
        setPartners(INITIAL_PARTNERS);
        localStorage.setItem("galcare_admin_partners", JSON.stringify(INITIAL_PARTNERS));
      }
    } else {
      setPartners(INITIAL_PARTNERS);
      localStorage.setItem("galcare_admin_partners", JSON.stringify(INITIAL_PARTNERS));
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  const handleOpenEditModal = (index: number) => {
    setEditingSlotIndex(index);
    setFormName(partners[index].name);
    setPreviewUrl(partners[index].logoUrl);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setPreviewUrl(dataUrl);
        if (!formName || formName.startsWith("Partner ")) {
          setFormName(file.name.split(".")[0]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSlotIndex === null || !previewUrl) return;

    const updated = [...partners];
    updated[editingSlotIndex] = {
      ...updated[editingSlotIndex],
      name: formName.trim() || `Partner ${editingSlotIndex + 1}`,
      logoUrl: previewUrl,
    };

    setPartners(updated);
    localStorage.setItem("galcare_admin_partners", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("galcare_partners_updated"));
    setEditingSlotIndex(null);
  };

  const handleResetSlot = (index: number) => {
    if (confirm(`Reset Slot ${index + 1} to default logo?`)) {
      const updated = [...partners];
      updated[index] = INITIAL_PARTNERS[index];
      setPartners(updated);
      localStorage.setItem("galcare_admin_partners", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("galcare_partners_updated"));
    }
  };

  const handleResetAll = () => {
    if (confirm("Are you sure you want to reset all 12 partner logo slots to default?")) {
      setPartners(INITIAL_PARTNERS);
      localStorage.setItem("galcare_admin_partners", JSON.stringify(INITIAL_PARTNERS));
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("galcare_partners_updated"));
    }
  };

  const row1Slots = partners.slice(0, 7);
  const row2Slots = partners.slice(7, 12);

  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin/third-party" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Third Party
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Partner Logo Management (12 Slots)
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage all 12 logo positions rendered on the public Homepage Partner section
            </p>
          </div>
          <button
            onClick={handleResetAll}
            className="flex items-center gap-2 px-4 py-2.5 border border-border bg-card text-foreground rounded-xl font-semibold hover:bg-secondary transition-all text-xs"
          >
            <RotateCcw className="w-4 h-4" /> Reset All to Default
          </button>
        </div>
      </div>

      {/* Row 1 Section (Slots 1 - 7) */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-extrabold">Row 1</span>
              Homepage Slots 1 – 7 (Top Row)
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              These 7 logos display in the top circular row on the public website.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {row1Slots.map((partner, idx) => {
            const slotIndex = idx; // 0 to 6
            const isCustom = partner.logoUrl !== INITIAL_PARTNERS[slotIndex].logoUrl;

            return (
              <div
                key={partner.id}
                className="bg-background border border-border rounded-xl p-3 flex flex-col items-center justify-between shadow-xs hover:border-primary/50 transition-all relative group"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded-full mb-2">
                  Slot {partner.slotNumber}
                </span>

                <div className="relative size-20 rounded-full border border-border bg-white flex items-center justify-center p-2 shadow-inner my-1 overflow-hidden">
                  <Image
                    src={partner.logoUrl}
                    alt={partner.name}
                    fill
                    className="object-contain p-1.5 rounded-full"
                  />
                </div>

                <p className="text-xs font-semibold text-center text-foreground truncate w-full mt-2" title={partner.name}>
                  {partner.name}
                </p>

                <div className="mt-3 flex items-center gap-1.5 w-full">
                  <button
                    onClick={() => handleOpenEditModal(slotIndex)}
                    className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 bg-primary text-primary-foreground text-[11px] font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-soft"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  {isCustom && (
                    <button
                      onClick={() => handleResetSlot(slotIndex)}
                      className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Reset Slot"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2 Section (Slots 8 - 12) */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-teal/10 text-teal text-xs font-extrabold">Row 2</span>
              Homepage Slots 8 – 12 (Bottom Row)
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              These 5 logos display in the bottom circular row on the public website.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {row2Slots.map((partner, idx) => {
            const slotIndex = 7 + idx; // 7 to 11
            const isCustom = partner.logoUrl !== INITIAL_PARTNERS[slotIndex].logoUrl;

            return (
              <div
                key={partner.id}
                className="bg-background border border-border rounded-xl p-3 flex flex-col items-center justify-between shadow-xs hover:border-primary/50 transition-all relative group"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded-full mb-2">
                  Slot {partner.slotNumber}
                </span>

                <div className="relative size-20 rounded-full border border-border bg-white flex items-center justify-center p-2 shadow-inner my-1 overflow-hidden">
                  <Image
                    src={partner.logoUrl}
                    alt={partner.name}
                    fill
                    className="object-contain p-1.5 rounded-full"
                  />
                </div>

                <p className="text-xs font-semibold text-center text-foreground truncate w-full mt-2" title={partner.name}>
                  {partner.name}
                </p>

                <div className="mt-3 flex items-center gap-1.5 w-full">
                  <button
                    onClick={() => handleOpenEditModal(slotIndex)}
                    className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 bg-primary text-primary-foreground text-[11px] font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-soft"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  {isCustom && (
                    <button
                      onClick={() => handleResetSlot(slotIndex)}
                      className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Reset Slot"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Slot Modal */}
      {editingSlotIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl shadow-glow w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Update Logo — Slot {partners[editingSlotIndex].slotNumber}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Position {editingSlotIndex + 1} of 12 on Homepage
                </p>
              </div>
              <button
                onClick={() => setEditingSlotIndex(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveSlot} className="p-6 space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Partner Logo Image *</label>
                <div 
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${previewUrl ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-secondary/50'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/webp, image/svg+xml"
                    className="hidden"
                  />
                  {previewUrl ? (
                    <div className="flex flex-col items-center">
                      <div className="relative size-24 rounded-full border border-border bg-white p-2 overflow-hidden shadow-soft mb-2">
                        <Image src={previewUrl} alt="Preview" fill className="object-contain p-2 rounded-full" />
                      </div>
                      <p className="text-xs font-bold text-primary">Click to replace image</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-muted-foreground">
                      <UploadCloud className="w-8 h-8 mb-2" />
                      <p className="text-sm font-semibold">Click to upload logo image</p>
                      <p className="text-xs mt-1">SVG, PNG, JPG or WEBP (Max 2MB)</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Partner Brand Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Synthex Bio"
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
                <button
                  type="button"
                  onClick={() => setEditingSlotIndex(null)}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!previewUrl || !formName.trim()}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm shadow-glow hover:bg-primary/95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save to Slot {partners[editingSlotIndex].slotNumber}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
