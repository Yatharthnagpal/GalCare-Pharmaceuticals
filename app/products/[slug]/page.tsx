"use client"

import { use, useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import { PRODUCTS, Product } from "@/lib/site-data"
import Image from "next/image"
import { ArrowLeft, Send, CheckCircle2, ShieldAlert, Download, Sparkles, Box, FileText } from "lucide-react"

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug

  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.id === slug)
  }, [slug])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const relatedProducts = useMemo(() => {
    if (!product) return []
    return PRODUCTS.filter((p) => p.id !== product.id && p.division === product.division).slice(0, 3)
  }, [product])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center">
          <ShieldAlert className="size-16 text-destructive animate-pulse" />
          <h2 className="mt-4 text-2xl font-bold">Product Not Found</h2>
          <p className="mt-2 text-muted-foreground">The requested product could not be located in our catalogue.</p>
          <a href="/products" className="mt-6 rounded-xl bg-primary text-primary-foreground px-6 py-2.5 font-semibold">
            Back to Catalogue
          </a>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        {/* Breadcrumb & Back button */}
        <section className="py-4 border-b border-border bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 md:px-6 flex items-center justify-between">
            <a href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              <ArrowLeft className="size-4" /> Back to Catalogue
            </a>
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <a href="/" className="hover:text-foreground">Home</a>
              <span>/</span>
              <a href="/products" className="hover:text-foreground">Products</a>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </div>
          </div>
        </section>

        {/* Product core info */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-12 lg:grid-cols-2">
            {/* Image display */}
            <Reveal>
              <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-border bg-muted shadow-soft flex items-center justify-center p-8">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>

            {/* Spec Card details */}
            <Reveal className="flex flex-col justify-between">
              <div>
                <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-bold text-primary">
                  {product.division || "Dermatology"} Division
                </span>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">{product.name}</h1>
                {product.genericName && (
                  <p className="mt-1 text-lg font-semibold text-muted-foreground">{product.genericName}</p>
                )}
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">{product.description}</p>

                {/* Spec bullets */}
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border p-4 bg-muted/10">
                    <span className="text-xs text-muted-foreground uppercase font-bold">Dosage Form</span>
                    <p className="mt-1 font-semibold text-sm">{product.dosageForm || "Topical"}</p>
                  </div>
                  <div className="rounded-xl border border-border p-4 bg-muted/10">
                    <span className="text-xs text-muted-foreground uppercase font-bold">Strength / Volume</span>
                    <p className="mt-1 font-semibold text-sm">{product.strength || "Standard"}</p>
                  </div>
                  <div className="rounded-xl border border-border p-4 bg-muted/10">
                    <span className="text-xs text-muted-foreground uppercase font-bold">Packaging Style</span>
                    <p className="mt-1 font-semibold text-sm">{product.packaging || "Tube/Pack"}</p>
                  </div>
                  <div className="rounded-xl border border-border p-4 bg-muted/10">
                    <span className="text-xs text-muted-foreground uppercase font-bold">Storage Guidelines</span>
                    <p className="mt-1 font-semibold text-sm">{product.storage || "Store below 25°C"}</p>
                  </div>
                </div>
              </div>

              {/* Download Brochure Card */}
              <div className="mt-8 rounded-2xl border border-dashed border-border p-5 bg-card flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Product Monograph & Brochure</h4>
                    <p className="text-xs text-muted-foreground">Contains complete chemical profile and warnings.</p>
                  </div>
                </div>
                <button
                  onClick={() => alert("Downloading brochure...")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-glow hover:bg-primary/95 transition-colors"
                >
                  <Download className="size-4" /> Download PDF
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Technical specs & Formulations details */}
        <section className="py-12 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-12 lg:grid-cols-3">
            {/* Composition & Ingredients */}
            <Reveal className="lg:col-span-1 rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="text-lg font-bold pb-3 border-b border-border">Composition Details</h3>
              <p className="mt-4 text-sm font-semibold text-primary">{product.composition || "Active formulation standard"}</p>
              <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Ingredients</h4>
              <ul className="mt-3 space-y-2">
                {product.ingredients.map((ing) => (
                  <li key={ing} className="text-xs font-semibold rounded-lg bg-muted px-3 py-1.5 inline-block mr-2 mb-2">
                    {ing}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Indications & Benefits */}
            <Reveal className="lg:col-span-1 rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="text-lg font-bold pb-3 border-b border-border">Clinical Indications</h3>
              <ul className="mt-4 space-y-3">
                {product.indications?.map((ind) => (
                  <li key={ind} className="flex gap-2 items-start text-xs font-semibold text-muted-foreground">
                    <Sparkles className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>{ind}</span>
                  </li>
                )) || (
                  <li className="text-xs text-muted-foreground font-semibold">Treats targeted dermatological challenges.</li>
                )}
              </ul>
              <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-muted-foreground">Formulation Benefits</h4>
              <ul className="mt-3 space-y-2">
                {product.benefits.map((b) => (
                  <li key={b} className="flex gap-2 items-start text-xs font-semibold text-muted-foreground">
                    <Box className="size-4 text-teal shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Inquiry Form */}
            <Reveal className="lg:col-span-1">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="text-lg font-bold pb-3 border-b border-border">Inquire About {product.name}</h3>

                {submitted ? (
                  <div className="mt-6 rounded-xl bg-primary/10 p-5 text-center text-primary">
                    <CheckCircle2 className="mx-auto size-10" />
                    <h4 className="mt-3 font-bold text-sm">Inquiry Received</h4>
                    <p className="mt-1.5 text-xs text-primary/80">
                      Our commercial team will contact you with batch pricing shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                    <div>
                      <input
                        type="text"
                        required
                        className="w-full rounded-xl border border-border px-3 py-2 text-xs bg-transparent focus:outline-primary"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        className="w-full rounded-xl border border-border px-3 py-2 text-xs bg-transparent focus:outline-primary"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2 grid-cols-2">
                      <input
                        type="tel"
                        required
                        className="w-full rounded-xl border border-border px-3 py-2 text-xs bg-transparent focus:outline-primary"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      <input
                        type="text"
                        required
                        className="w-full rounded-xl border border-border px-3 py-2 text-xs bg-transparent focus:outline-primary"
                        placeholder="Order Qty"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      />
                    </div>
                    <div>
                      <textarea
                        rows={3}
                        required
                        className="w-full rounded-xl border border-border px-3 py-2 text-xs bg-transparent focus:outline-primary resize-none"
                        placeholder="Specify requirements, shipping destination..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-glow hover:bg-primary/95 transition-colors"
                    >
                      <Send className="size-3" /> Submit inquiry
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <Reveal>
                <h3 className="text-2xl font-bold tracking-tight">Related Formulations</h3>
                <p className="text-sm text-muted-foreground mt-1">Other products in our {product.division} division.</p>
              </Reveal>

              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {relatedProducts.map((p, i) => (
                  <Reveal key={p.id} delay={i * 0.08}>
                    <div className="group rounded-[2rem] border border-border bg-card p-5 shadow-soft hover:border-primary/45 transition-colors">
                      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <h4 className="mt-4 font-bold text-base tracking-tight">{p.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{p.description}</p>
                      <a href={`/products/${p.id}`} className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                        View Details →
                      </a>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
