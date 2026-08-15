"use client"

import { useState } from "react"
import Link from "next/link"
import { AdaptiveImage } from "@/components/ui/adaptive-image"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react"
import { ArrowRight, FlaskConical, Check, Sparkles } from "lucide-react"
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
  
  // Show featured items first when "All" is selected
  const featuredList = PRODUCTS.filter((p) => p.featured)
  const nonFeatured = PRODUCTS.filter((p) => !p.featured)
  const allOrdered = [...featuredList, ...nonFeatured]

  const visible = (filter === "All" ? allOrdered : PRODUCTS.filter((p) => p.category === filter)).slice(0, 6)

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] as const } }
  }

  return (
    <section id="products" className="relative py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Link href="/products" className="text-sm font-semibold uppercase tracking-widest text-primary hover:underline underline-offset-4 transition-all">
            FEATURED PRODUCTS
          </Link>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-4xl leading-tight">
            <Link href="/products" className="hover:text-primary transition-colors">Science-led dermatology, beautifully formulated</Link>
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            A curated portfolio spanning prescription and cosmetic care, engineered for measurable clinical results.
          </p>
        </Reveal>

        {/* Filter Pills Scroll Bar */}
        <div className="mt-10 flex w-full gap-2 overflow-x-auto pb-3 justify-start no-scrollbar md:flex-wrap md:justify-center md:pb-0 px-2 md:px-0">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold transition-all cursor-pointer shrink-0",
                filter === f
                  ? "border-primary bg-primary text-primary-foreground shadow-glow"
                  : "border-border bg-card/70 text-foreground/80 hover:bg-accent hover:text-foreground backdrop-blur-sm",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Products Grid */}
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
              className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3"
            >
              {visible.map((product, i) => (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  className={cn("h-full", i >= 4 && "hidden sm:block")}
                >
                  <TiltCard className="h-full">
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-[2rem] border border-border bg-card shadow-soft transition-all hover:border-primary/50 hover:shadow-glow">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl sm:rounded-t-[2rem] bg-gradient-to-b from-card via-muted/20 to-muted/50 p-2 sm:p-4 flex items-center justify-center border-b border-border/40">
                        <span className="absolute left-2 top-2 sm:left-3.5 sm:top-3.5 z-10 rounded-full bg-card/90 px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-xs font-bold text-primary backdrop-blur-sm border border-border/40 truncate max-w-[65%] sm:max-w-none">
                          {product.category}
                        </span>
                        {product.featured && (
                          <span className="absolute right-2 top-2 sm:right-3.5 sm:top-3.5 z-10 rounded-full bg-primary/90 px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 text-[8px] sm:text-[9px] font-bold text-primary-foreground shadow-sm">
                            Hero
                          </span>
                        )}
                        <AdaptiveImage
                          src={product.image || "/placeholder.jpg"}
                          alt={product.name}
                          fill
                          className="object-contain p-2 sm:p-3 transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between p-3 sm:p-6">
                        <div>
                          <h3 className="text-xs sm:text-lg font-bold tracking-tight leading-tight line-clamp-1">{product.name}</h3>
                          {product.composition ? (
                            <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-semibold text-primary leading-tight line-clamp-1 h-3.5 sm:h-4">{product.composition}</p>
                          ) : (
                            <div className="h-3.5 sm:h-4 mt-0.5 sm:mt-1" />
                          )}
                          <p className="mt-1 sm:mt-2 text-[10px] sm:text-sm leading-tight sm:leading-relaxed text-muted-foreground line-clamp-2 h-7 sm:h-10">{product.description}</p>
                        </div>

                        <div className="mt-3 hidden sm:block">
                          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-foreground/70">
                            <FlaskConical className="size-3.5 text-primary" /> Key Active Ingredients
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1.5 min-h-[28px] items-center">
                            {product.ingredients.slice(0, 3).map((ing) => (
                              <span
                                key={ing}
                                className="rounded-md bg-accent px-2 py-1 text-[11px] font-medium text-accent-foreground"
                              >
                                {ing}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-auto pt-3 sm:pt-5 flex items-center">
                          <Link
                            href={`/products/${product.id}`}
                            className="inline-flex w-full items-center justify-center gap-1 rounded-lg sm:rounded-xl bg-primary px-2.5 py-1.5 sm:px-4 sm:py-2.5 text-[11px] sm:text-sm font-semibold text-primary-foreground shadow-glow hover:bg-primary/95 transition-transform hover:-translate-y-0.5"
                          >
                            <span className="hidden sm:inline">View Formulation</span>
                            <span className="sm:hidden">View Details</span>
                            <ArrowRight className="size-3 sm:size-3.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View Full Catalogue CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground shadow-soft hover:bg-accent hover:border-primary/40 transition-all"
          >
           SHOW MORE <ArrowRight className="size-4 text-primary" />
          </Link>
        </div>
      </div>
    </section>
  )
}
