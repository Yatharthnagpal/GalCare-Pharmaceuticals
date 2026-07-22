"use client"

import { useState, useMemo, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { Reveal } from "@/components/motion-primitives"
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/site-data"
import Image from "next/image"
import { Search, SlidersHorizontal, ArrowRight, Clipboard, X, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"

const ITEMS_PER_PAGE = 18

export default function ProductsPage() {
  const [search, setSearch] = useState("")
  const [selectedDivision, setSelectedDivision] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate category counts dynamically
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PRODUCTS.length }
    PRODUCT_CATEGORIES.forEach((cat) => {
      counts[cat] = PRODUCTS.filter((p) => p.category === cat).length
    })
    return counts
  }, [])

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.tagline.toLowerCase().includes(search.toLowerCase()) ||
        (p.genericName && p.genericName.toLowerCase().includes(search.toLowerCase())) ||
        p.ingredients.some((i) => i.toLowerCase().includes(search.toLowerCase())) ||
        (p.composition && p.composition.toLowerCase().includes(search.toLowerCase()))

      const matchesDivision =
        selectedDivision === "All" || (p.division && p.division === selectedDivision)

      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory

      return matchesSearch && matchesDivision && matchesCategory
    })
  }, [search, selectedDivision, selectedCategory])

  // Reset to page 1 whenever filters or search query change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, selectedDivision, selectedCategory])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredProducts, currentPage])

  const hasActiveFilters = search !== "" || selectedDivision !== "All" || selectedCategory !== "All"

  const clearFilters = () => {
    setSearch("")
    setSelectedDivision("All")
    setSelectedCategory("All")
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 380, behavior: "smooth" })
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20">
        {/* Page Hero with Glass Glow */}
        <section className="relative overflow-hidden py-12 md:py-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]" />
            <div className="absolute right-10 top-1/2 h-[300px] w-[300px] rounded-full bg-teal/10 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                <Sparkles className="size-3.5" />
                Dermatological Formulations Catalogue
              </div>
              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Science-backed therapeutics, <span className="text-gradient">precision engineered.</span>
              </h1>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                Explore Galcare's full portfolio of {PRODUCTS.length} dermatological products. Filter by category, active compounds, dosage form, and targeted clinical indications.
              </p>
            </Reveal>

            {/* Search Input Bar */}
            <Reveal className="mt-8 max-w-3xl">
              <div className="relative flex items-center rounded-2xl border border-border bg-card/80 p-2 shadow-soft backdrop-blur-md transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                <Search className="ml-3 size-5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Search by brand name, active ingredients (e.g. Tranexamic, Glycolic, Tacrolimus)..."
                  className="w-full border-none bg-transparent px-3 py-2 text-sm text-foreground focus:outline-none placeholder:text-muted-foreground/70"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="mr-2 rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Filter Controls & Catalogue Grid */}
        <section className="py-6">
          <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-8 lg:grid-cols-4">
            {/* Sidebar Filters */}
            <Reveal className="lg:col-span-1 space-y-6">
              <div className="sticky top-28 rounded-3xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur-md">
                <div className="flex items-center justify-between font-bold pb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="size-4 text-primary" />
                    <span className="text-base">Filter Catalogue</span>
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                    >
                      <X className="size-3" /> Reset
                    </button>
                  )}
                </div>

                {/* Division Filter */}
                <div className="mt-6">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Division</h4>
                  <div className="mt-3 flex flex-col gap-1.5">
                    {["All", "Dermatology"].map((div) => (
                      <button
                        key={div}
                        onClick={() => setSelectedDivision(div)}
                        className={`flex items-center justify-between text-left text-xs px-3.5 py-2.5 rounded-xl transition-all font-medium ${
                          selectedDivision === div
                            ? "bg-primary text-primary-foreground font-semibold shadow-glow"
                            : "hover:bg-accent text-foreground/80"
                        }`}
                      >
                        <span>{div}</span>
                        {div === "Dermatology" && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${selectedDivision === div ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                            {PRODUCTS.length}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filter with Counts */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Therapeutic Category</h4>
                  <div className="mt-3 flex flex-col gap-1 max-h-[420px] overflow-y-auto pr-1 no-scrollbar">
                    {["All", ...PRODUCT_CATEGORIES].map((cat) => {
                      const count = categoryCounts[cat] || 0
                      const isSelected = selectedCategory === cat
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`flex items-center justify-between text-left text-xs px-3 py-2 rounded-xl transition-all font-medium ${
                            isSelected
                              ? "bg-primary text-primary-foreground font-semibold shadow-glow"
                              : "hover:bg-accent text-foreground/80"
                          }`}
                        >
                          <span className="line-clamp-1 pr-2">{cat}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 font-bold ${
                              isSelected
                                ? "bg-primary-foreground/20 text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Header Bar */}
              <Reveal>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      Showing{" "}
                      <span className="text-primary font-bold">
                        {filteredProducts.length === 0
                          ? 0
                          : `${(currentPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(
                              currentPage * ITEMS_PER_PAGE,
                              filteredProducts.length
                            )}`}
                      </span>{" "}
                      of <span className="font-bold">{filteredProducts.length}</span> Products
                    </span>
                    {selectedCategory !== "All" && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {selectedCategory}
                      </span>
                    )}
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full"
                    >
                      Clear active filters <X className="size-3.5" />
                    </button>
                  )}
                </div>
              </Reveal>

              {filteredProducts.length === 0 ? (
                <Reveal className="mt-12 text-center py-20 rounded-3xl border border-dashed border-border bg-card/60 backdrop-blur-sm">
                  <Clipboard className="mx-auto size-12 text-muted-foreground/50 animate-bounce" />
                  <h3 className="mt-4 font-bold text-lg">No Products Matched</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                    We couldn't find any products matching your search "{search}". Try searching for another active compound or resetting filters.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-glow"
                  >
                    Reset All Filters
                  </button>
                </Reveal>
              ) : (
                <>
                  <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {paginatedProducts.map((p, i) => (
                      <Reveal key={p.id} delay={Math.min(i * 0.03, 0.25)}>
                        <div className="group flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-glow">
                          
                          {/* Image Showcase Container */}
                          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-primary/5 to-teal/5">
                            <span className="absolute top-3.5 left-3.5 z-10 rounded-full bg-card/90 px-3 py-1 text-[10px] font-bold text-primary backdrop-blur-md shadow-sm border border-border/50">
                              {p.category}
                            </span>
                            {p.dosageForm && (
                              <span className="absolute top-3.5 right-3.5 z-10 rounded-full bg-primary/90 px-2.5 py-0.5 text-[9px] font-bold text-primary-foreground shadow-sm">
                                {p.dosageForm}
                              </span>
                            )}
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          {/* Content Container */}
                          <div className="flex flex-1 flex-col p-6">
                            <div>
                              <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                                {p.name}
                              </h3>
                              {p.composition && (
                                <p className="text-xs font-semibold text-primary/90 mt-1 line-clamp-1">
                                  {p.composition}
                                </p>
                              )}
                              <p className="mt-2.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                {p.description}
                              </p>
                            </div>

                            {/* Ingredient tags */}
                            {p.ingredients && p.ingredients.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-1">
                                {p.ingredients.slice(0, 2).map((ing) => (
                                  <span
                                    key={ing}
                                    className="rounded-md bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground"
                                  >
                                    {ing}
                                  </span>
                                ))}
                                {p.ingredients.length > 2 && (
                                  <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground font-medium">
                                    +{p.ingredients.length - 2} more
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Card Footer */}
                            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                              <span className="text-[10px] font-semibold text-muted-foreground/80">
                                Pack: {p.strength || "Standard"}
                              </span>
                              <a
                                href={`/products/${p.id}`}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform"
                              >
                                Details <ArrowRight className="size-3.5" />
                              </a>
                            </div>
                          </div>

                        </div>
                      </Reveal>
                    ))}
                  </div>

                  {/* Pagination Bar */}
                  {totalPages > 1 && (
                    <Reveal className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border">
                      <p className="text-xs font-medium text-muted-foreground">
                        Page <span className="font-bold text-foreground">{currentPage}</span> of{" "}
                        <span className="font-bold text-foreground">{totalPages}</span>
                      </p>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="inline-flex items-center gap-1 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground hover:bg-accent disabled:opacity-40 disabled:pointer-events-none transition-colors"
                        >
                          <ChevronLeft className="size-4" /> Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`grid size-9 place-items-center rounded-xl text-xs font-semibold transition-all ${
                              currentPage === page
                                ? "bg-primary text-primary-foreground shadow-glow font-bold"
                                : "border border-border bg-card text-foreground hover:bg-accent"
                            }`}
                          >
                            {page}
                          </button>
                        ))}

                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="inline-flex items-center gap-1 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground hover:bg-accent disabled:opacity-40 disabled:pointer-events-none transition-colors"
                        >
                          Next <ChevronRight className="size-4" />
                        </button>
                      </div>
                    </Reveal>
                  )}
                </>
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
