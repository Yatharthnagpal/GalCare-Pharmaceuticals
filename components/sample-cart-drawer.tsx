"use client"

import { useState } from "react"
import { ShoppingBag, X, CheckCircle2, Trash2, Send, FileText } from "lucide-react"
import { Product } from "@/lib/products-db"

interface SampleCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cartItems: Product[]
  onRemoveItem: (id: string) => void
  onClearCart: () => void
}

export function SampleCartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
}: SampleCartDrawerProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [medicalReg, setMedicalReg] = useState("")
  const [address, setAddress] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const sampleNames = cartItems.map((p) => p.name).join(", ")
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          productName: `Medical Sample Request (${cartItems.length} items): ${sampleNames}`,
          message: `Medical Registration / License No: ${medicalReg || "N/A"}\nDelivery Address: ${address}`,
        }),
      })

      if (res.ok) {
        setSuccessMessage(true)
        setTimeout(() => {
          onClearCart()
          setSuccessMessage(false)
          onClose()
        }, 2500)
      }
    } catch (err) {
      console.warn("Sample cart submission failed:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-md bg-card border-l border-border h-full flex flex-col shadow-2xl p-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2 text-primary font-bold text-base">
            <ShoppingBag className="size-5" />
            <span>Doctor & Distributor Sample Cart</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Selected Sample List */}
        <div className="my-4 flex-grow space-y-3">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl border border-border bg-background"
              >
                <div>
                  <p className="font-bold text-xs text-foreground">{item.name}</p>
                  <p className="text-[10px] text-muted-foreground">{item.genericName || item.category}</p>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                  title="Remove from sample cart"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <ShoppingBag className="mx-auto size-8 text-muted-foreground/40 mb-2" />
              <p className="text-xs font-semibold">Your Sample Cart is Empty</p>
              <p className="text-[11px] text-muted-foreground mt-1">Add up to 5 product samples to request physical sample kits.</p>
            </div>
          )}
        </div>

        {/* Request Form */}
        {cartItems.length > 0 && !successMessage && (
          <form onSubmit={handleSubmit} className="space-y-3 border-t border-border pt-4">
            <p className="text-xs font-bold text-foreground">Practitioner Delivery Details</p>
            <input
              type="text"
              placeholder="Doctor / Distributor Name *"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="email"
                placeholder="Email Address *"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="tel"
                placeholder="Phone / WhatsApp *"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <input
              type="text"
              placeholder="Medical Reg. No / GST (Optional)"
              value={medicalReg}
              onChange={(e) => setMedicalReg(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              placeholder="Clinic / Hospital Shipping Address *"
              required
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-glow hover:bg-primary/95 flex items-center justify-center gap-1.5"
            >
              <Send className="size-3.5" />
              {isSubmitting ? "Dispatching Request..." : `Dispatch Sample Request (${cartItems.length} Items)`}
            </button>
          </form>
        )}

        {successMessage && (
          <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center my-auto">
            <CheckCircle2 className="mx-auto size-8 text-green-500 mb-2" />
            <p className="font-bold text-xs text-foreground">Sample Kit Dispatch Authorized!</p>
            <p className="text-[11px] text-muted-foreground mt-1">Our dispatch team will verify details and send tracking info via SMS/Email.</p>
          </div>
        )}

      </div>
    </div>
  )
}
