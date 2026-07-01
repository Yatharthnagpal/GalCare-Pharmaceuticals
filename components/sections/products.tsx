"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, Download, FlaskConical, Check } from "lucide-react"
import { PRODUCTS, PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/site-data"
import { Reveal } from "@/components/motion-primitives"
import { cn } from "@/lib/utils"

type Filter = "All" | ProductCategory

export function Products() {
  const [filter, setFilter] = useState<Filter>("All")
  const filters: Filter[] = ["All", ...PRODUCT_CATEGORIES]
  const visible = (filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)).slice(0, 6)

  return (
    <section id="products" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Featured Products</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Science-led dermatology, beautifully formulated
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            A curated portfolio spanning prescription and cosmetic care, engineered for measurable results.
          </p>
        </Reveal>

        {/* filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                filter === f
                  ? "border-primary bg-primary text-primary-foreground shadow-glow"
                  : "border-border bg-card/60 text-foreground/70 hover:bg-accent hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* grid */}
        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((product) => (
              <motion.article
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-glow"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-primary/5 to-teal/5">
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-card/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
                    {product.category}
                  </span>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold tracking-tight">{product.name}</h3>
                  <p className="mt-1 text-sm text-primary">{product.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

                  <div className="mt-4">
                    <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground/60">
                      <FlaskConical className="size-3.5" /> Key Ingredients
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {product.ingredients.map((ing) => (
                        <span
                          key={ing}
                          className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ul className="mt-4 space-y-1.5">
                    {product.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="size-4 text-teal" /> {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 flex items-center">
                    <a
                      href={`/products/${product.id}`}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:bg-primary/95 transition-transform hover:-translate-y-0.5"
                    >
                      View Details <ArrowRight className="size-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
