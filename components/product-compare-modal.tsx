"use client"

import { Product } from "@/lib/products-db"
import { X, Check, ArrowRight, ShieldCheck, FileText } from "lucide-react"

interface ProductCompareModalProps {
  isOpen: boolean
  onClose: () => void
  products: Product[]
  onRemoveProduct: (id: string) => void
}

export function ProductCompareModal({
  isOpen,
  onClose,
  products,
  onRemoveProduct,
}: ProductCompareModalProps) {
  if (!isOpen || products.length === 0) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-5xl bg-card border border-border rounded-3xl shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="font-bold text-lg text-foreground">Pharmaceutical SKU Comparison Tool</h2>
            <p className="text-xs text-muted-foreground">Comparing active composition, indications, and packaging across {products.length} SKUs</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="mt-6 overflow-x-auto flex-grow">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-xs font-bold text-muted-foreground w-1/4">Specification</th>
                {products.map((p) => (
                  <th key={p.id} className="p-3 text-sm font-bold text-foreground w-1/4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-primary">{p.name}</span>
                      <button
                        onClick={() => onRemoveProduct(p.id)}
                        className="text-muted-foreground hover:text-destructive text-xs"
                        title="Remove from comparison"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs">
              
              {/* Category */}
              <tr>
                <td className="p-3 font-semibold text-muted-foreground bg-muted/20">Therapeutic Category</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 font-medium text-foreground">{p.category}</td>
                ))}
              </tr>

              {/* Composition / Active API */}
              <tr>
                <td className="p-3 font-semibold text-muted-foreground bg-muted/20">Active Composition (API)</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 font-bold text-foreground">{p.composition || p.ingredients.join(", ")}</td>
                ))}
              </tr>

              {/* Dosage Form */}
              <tr>
                <td className="p-3 font-semibold text-muted-foreground bg-muted/20">Dosage Form</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 font-medium text-foreground">{p.dosageForm || "Topical / Oral"}</td>
                ))}
              </tr>

              {/* Packaging */}
              <tr>
                <td className="p-3 font-semibold text-muted-foreground bg-muted/20">Packaging Specification</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 font-medium text-foreground">{p.packaging || p.strength || "Standard Pack"}</td>
                ))}
              </tr>

              {/* Clinical Indications */}
              <tr>
                <td className="p-3 font-semibold text-muted-foreground bg-muted/20">Target Indications</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3">
                    {p.indications && p.indications.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {p.indications.map((ind) => (
                          <li key={ind}>{ind}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-muted-foreground">{p.tagline}</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Storage Conditions */}
              <tr>
                <td className="p-3 font-semibold text-muted-foreground bg-muted/20">Storage & Quality Standard</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 text-muted-foreground">
                    {p.storage || "Store below 25°C in dry conditions."} • <span className="font-semibold text-primary">WHO-GMP</span>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-border flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-glow hover:bg-primary/95"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  )
}
