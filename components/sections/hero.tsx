"use client"

import Image from "next/image"
import { motion, useMotionValue, useTransform, useSpring } from "motion/react"
import { ArrowRight, ShieldCheck, Sparkles, Star } from "lucide-react"

const molecules = [
  { top: "12%", left: "8%", size: 90, delay: 0 },
  { top: "62%", left: "14%", size: 60, delay: 0.4 },
  { top: "22%", left: "82%", size: 70, delay: 0.8 },
  { top: "70%", left: "78%", size: 110, delay: 0.2 },
]

export function Hero() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring animations for smooth, organic movement
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { damping: 25, stiffness: 180 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { damping: 25, stiffness: 180 })

  // Parallax offsets for floating badges
  const badge1X = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 150 })
  const badge1Y = useSpring(useTransform(y, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 150 })

  const badge2X = useSpring(useTransform(x, [-0.5, 0.5], [15, -15]), { damping: 20, stiffness: 150 })
  const badge2Y = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { damping: 20, stiffness: 150 })

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
    <section id="home" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* soft gradient backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute right-0 top-40 h-[380px] w-[380px] rounded-full bg-teal/15 blur-[110px]" />
      </div>

      {/* floating molecules */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        {molecules.map((m, i) => (
          <div
            key={i}
            className={i % 2 === 0 ? "animate-float-slow absolute" : "animate-float-slower absolute"}
            style={{ top: m.top, left: m.left }}
          >
            <div
              className="rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
              style={{ width: m.size, height: m.size }}
            />
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm font-medium text-foreground/70 backdrop-blur"
          >
            <Sparkles className="size-4 text-primary" />
            Innovation Skin Care · Since 2001
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            Innovation in Dermatology.{" "}
            <span className="text-gradient">Trusted by Healthcare Professionals.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            Premium skincare and pharmaceutical solutions backed by science and innovation, trusted by
            dermatologists across 42 countries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#products"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Explore Products
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-accent"
            >
              Contact Team
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-teal" /> WHO-GMP Certified
            </span>
            <span className="inline-flex items-center gap-2">
              <Star className="size-4 text-teal" /> 30K+ Doctors Trust Us
            </span>
          </motion.div>
        </div>

        {/* product showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
          style={{ perspective: 1000 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative rounded-[2rem] glass-strong p-6 shadow-soft transition-all duration-200"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-b from-primary/5 to-teal/5"
              style={{ transform: "translateZ(40px)" }}
            >
              <Image
                src="/products/hero-serum.png"
                alt="Galcare premium dermatology serum"
                fill
                priority
                className="object-contain p-6"
              />
            </motion.div>

            <motion.div
              style={{ x: badge1X, y: badge1Y, transform: "translateZ(70px)" }}
              className="absolute -left-4 top-10 rounded-2xl glass-strong px-4 py-3 shadow-soft"
            >
              <p className="text-xs text-muted-foreground">Clinically proven</p>
              <p className="text-lg font-semibold">98% efficacy</p>
            </motion.div>

            <motion.div
              style={{ x: badge2X, y: badge2Y, transform: "translateZ(70px)" }}
              className="absolute -right-4 bottom-10 rounded-2xl glass-strong px-4 py-3 shadow-soft"
            >
              <p className="text-xs text-muted-foreground">Dermatologist</p>
              <p className="text-lg font-semibold">Recommended</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
