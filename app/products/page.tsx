"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/site-data"
import Image from "next/image"
import { Search, SlidersHorizontal, ArrowRight, Clipboard } from "lucide-react"

export default function ProductsPage() {
  const [search, setSearch] = useState("")
  const [selectedDivision, setSelectedDivision] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.tagline.toLowerCase().includes(search.toLowerCase()) ||
        (p.genericName && p.genericName.toLowerCase().includes(search.toLowerCase())) ||
        p.ingredients.some((i) => i.toLowerCase().includes(search.toLowerCase()))

      const matchesDivision =
        selectedDivision === "All" || (p.division && p.division === selectedDivision)

      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory

      return matchesSearch && matchesDivision && matchesCategory
    })
  }, [search, selectedDivision, selectedCategory])

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        {/* Page Hero */}
        <section className="relative overflow-hidden py-12">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="max-w-2xl">
              <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                Product Catalogue
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                Science-backed formulations.
              </h1>
              <p className="mt-4 text-base text-muted-foreground">
                Search and filter across our neuropsychiatric and dermatological portfolio to find specific compounds, ingredients, and dosages.
              </p>
            </Reveal>

            {/* Search Input */}
            <Reveal className="mt-8 max-w-2xl">
              <div className="relative flex items-center rounded-2xl border border-border bg-card p-2 shadow-soft focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                <Search className="ml-3 size-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by brand name, generic name, active ingredients..."
                  className="w-full border-none bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-0"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Filter Controls & Catalogue Grid */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-8 lg:grid-cols-4">
            {/* Sidebar Filters */}
            <Reveal className="lg:col-span-1 space-y-6">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <div className="flex items-center gap-2 font-bold pb-4 border-b border-border">
                  <SlidersHorizontal className="size-4 text-primary" />
                  <span>Filter Catalogue</span>
                </div>

                {/* Division Filter */}
                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Division</h4>
                  <div className="mt-3 flex flex-col gap-2">
                    {["All", "Dermatology", "Neuropsychiatric"].map((div) => (
                      <button
                        key={div}
                        onClick={() => setSelectedDivision(div)}
                        className={`text-left text-sm px-3 py-2 rounded-xl transition-colors font-medium ${
                          selectedDivision === div
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent text-foreground/80"
                        }`}
                      >
                        {div}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</h4>
                  <div className="mt-3 flex flex-col gap-2">
                    {["All", ...PRODUCT_CATEGORIES].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-left text-sm px-3 py-2 rounded-xl transition-colors font-medium ${
                          selectedCategory === cat
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent text-foreground/80"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <Reveal>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Showing {filteredProducts.length} Product{filteredProducts.length !== 1 && "s"}
                  </span>
                </div>
              </Reveal>

              {filteredProducts.length === 0 ? (
                <Reveal className="mt-12 text-center py-16 rounded-3xl border border-dashed border-border bg-card">
                  <Clipboard className="mx-auto size-12 text-muted-foreground/60 animate-bounce" />
                  <h3 className="mt-4 font-bold text-lg">No Products Found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your search criteria or selection filters.
                  </p>
                </Reveal>
              ) : (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((p, i) => (
                    <Reveal key={p.id} delay={i * 0.05}>
                      <div className="group flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow">
                        <div className="relative aspect-square overflow-hidden bg-muted">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {p.division && (
                            <span className="absolute top-4 left-4 rounded-full bg-primary/95 px-3 py-1 text-[10px] font-bold text-primary-foreground shadow-soft">
                              {p.division}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                              {p.category}
                            </span>
                            <h3 className="mt-1 text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                              {p.name}
                            </h3>
                            {p.genericName && (
                              <p className="text-xs font-semibold text-muted-foreground/80 mt-0.5 line-clamp-1">
                                {p.genericName}
                              </p>
                            )}
                            <p className="mt-2.5 text-xs text-muted-foreground line-clamp-2">
                              {p.description}
                            </p>
                          </div>
                          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-muted-foreground/70">
                              Form: {p.dosageForm || "Topical"}
                            </span>
                            <a
                              href={`/products/${p.id}`}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                            >
                              Details <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
