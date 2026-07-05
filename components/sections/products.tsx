"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react"
import { ArrowRight, FlaskConical, Check } from "lucide-react"
import { PRODUCTS, PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/site-data"
import { Reveal } from "@/components/motion-primitives"
import { cn } from "@/lib/utils"

type Filter = "All" | ProductCategory

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { damping: 20, stiffness: 150 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { damping: 20, stiffness: 150 })
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = event.clientX - rect.left - width / 2
    const mouseY = event.clientY - rect.top - height / 2
    x.set(mouseX / width)
    y.set(mouseY / height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      layout
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
    >
      <div style={{ transform: "translateZ(20px)" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  )
}

export function Products() {
  const [filter, setFilter] = useState<Filter>("All")
  const filters: Filter[] = ["All", ...PRODUCT_CATEGORIES]
  const visible = (filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)).slice(0, 6)

  // Map products directly (removed dynamic lifestyle inserts as requested)
  const itemsToRender = visible.map((product) => ({
    type: "product",
    key: product.id,
    data: product
  }))

  // Scroll reveal variants
  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] } }
  }

  return (
    <section id="products" className="relative py-12 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <a href="/products" className="text-sm font-semibold uppercase tracking-widest text-primary hover:underline underline-offset-4 transition-all">Featured Products</a>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-4xl leading-tight">
            <a href="/products" className="hover:text-primary transition-colors">Science-led dermatology, beautifully formulated</a>
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            A curated portfolio spanning prescription and cosmetic care, engineered for measurable results.
          </p>
        </Reveal>

        {/* filters */}
        <div className="mt-10 flex w-full gap-2 overflow-x-auto pb-3 justify-start no-scrollbar md:flex-wrap md:justify-center md:pb-0 px-4 md:px-0">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all cursor-pointer shrink-0",
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
        <div className="mt-10 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
              className="grid gap-4 grid-cols-2 lg:grid-cols-3"
            >
              {visible.map((product, i) => (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  className={cn("h-full", i >= 4 && "hidden sm:block")}
                >
                  <TiltCard className="h-full">
                    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:border-primary/40 hover:shadow-glow">
                      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-primary/5 to-teal/5">
                        <span className="absolute left-3 top-3 z-10 rounded-full bg-card/85 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-primary backdrop-blur-sm">
                          {product.category}
                        </span>
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-semibold tracking-tight leading-tight">{product.name}</h3>
                        <p className="mt-1 text-xs sm:text-sm text-primary leading-tight">{product.tagline}</p>
                        <p className="mt-2 text-[11px] sm:text-sm leading-snug text-muted-foreground line-clamp-2 sm:line-clamp-none">{product.description}</p>

                        <div className="mt-4 hidden sm:block">
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

                        <ul className="mt-4 space-y-1.5 hidden sm:block">
                          {product.benefits.map((b) => (
                            <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Check className="size-4 text-teal" /> {b}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto pt-4 sm:pt-6 flex items-center">
                          <a
                            href={`/products/${product.id}`}
                            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-glow hover:bg-primary/95 transition-transform hover:-translate-y-0.5"
                          >
                            View Details <ArrowRight className="size-3.5" />
                          </a>
                        </div>
                      </div>
                    </article>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
