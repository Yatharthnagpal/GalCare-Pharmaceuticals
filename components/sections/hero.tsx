"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useMotionValue, useTransform, useSpring, useScroll } from "motion/react"
import { ArrowRight, ShieldCheck, Sparkles, Star } from "lucide-react"
import { Counter } from "@/components/motion-primitives"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Parallax scroll effect for the secondary chip
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  // Moves slightly slower than scroll speed
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const parallaxSpring = useSpring(parallaxY, { damping: 25, stiffness: 120 })

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring animations for smooth, organic movement
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { damping: 25, stiffness: 180 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { damping: 25, stiffness: 180 })

  // Parallax offsets for floating badges
  const badge1X = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 150 })
  const badge1Y = useSpring(useTransform(y, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 150 })

  const badge2X = useSpring(useTransform(x, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 150 })
  const badge2Y = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 150 })

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

  // Cursor follow glow states
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Staggered animation containers
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section
      ref={containerRef}
      id="home"
      onMouseMove={handleContainerMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden pt-28 pb-12 md:pt-44 md:pb-28"
    >
      {/* cursor-follow glow background */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute -z-10 rounded-full bg-primary/10 blur-[120px] hidden md:block"
          style={{
            x: mousePosition.x - 200,
            y: mousePosition.y - 200,
            width: 400,
            height: 400,
          }}
          transition={{ type: "spring", damping: 40, stiffness: 150, mass: 0.6 }}
        />
      )}

      {/* soft gradient backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute right-0 top-40 h-[380px] w-[380px] rounded-full bg-teal/15 blur-[110px]" />
      </div>

      {/* Grid aligned items-start to prevent logo overlap on shorter viewports */}
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 md:px-6 lg:grid-cols-2 lg:pt-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm font-medium text-foreground/70 backdrop-blur-sm"
          >
            <span 
              className="size-2 rounded-full bg-emerald-500" 
              style={{ animation: 'pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
            />
            Since 2008
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          >
            Innovation in Dermatology.{" "}
            <span className="text-gradient">Trusted by Healthcare Professionals.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground"
          >
            Premium skincare and pharmaceutical solutions backed by science and innovation, trusted by
            dermatologists across 42 countries.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
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
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-accent"
            >
              Contact Team
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground lg:justify-start"
          >
            <span className="inline-flex items-center gap-2 font-medium">
              <ShieldCheck className="size-4 text-teal" /> WHO-GMP Certified
            </span>
            <span className="inline-flex items-center gap-2 font-medium">
              <Star className="size-4 text-teal" /> <Counter value={30} suffix="K+" /> Doctors Trust Us
            </span>
          </motion.div>
        </motion.div>

        {/* lifestyle image split layout right side */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[320px] sm:max-w-md lg:max-w-lg"
            style={{ perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative rounded-[2rem] glass-strong p-4 shadow-soft transition-all duration-200"
            >
              <div 
                className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.8rem] bg-gradient-to-b from-primary/5 to-teal/5 z-10"
                style={{ transform: "translateZ(40px)" }}
              >
                {/* Ken Burns effect on the main hero image */}
                <motion.div
                  className="relative w-full h-full"
                  animate={{
                    scale: [1, 1.07, 1.02, 1.09, 1],
                    x: [0, 8, -6, 5, 0],
                    y: [0, -5, 8, -4, 0]
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Image
                    src="/images/placeholders/hero-woman-applying-serum.png"
                    alt="Woman applying serum to face"
                    fill
                    priority
                    className="object-cover"
                  />
                </motion.div>
              </div>

              {/* Parallax Floating Image Chip */}
              <motion.div
                style={{ y: parallaxSpring, z: 60 }}
                className="absolute -left-12 bottom-12 hidden w-44 overflow-hidden rounded-2xl border-2 border-background shadow-lg md:block aspect-square z-20"
              >
                <div className="relative w-full h-full bg-gradient-to-b from-primary/5 to-teal/5">
                  <Image
                    src="/images/placeholders/hands-applying-moisturizer.png"
                    alt="Close-up of hands applying moisturizer"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Extra context chips */}
              <motion.div
                style={{ x: badge1X, y: badge1Y, z: 70 }}
                className="absolute right-2 sm:-right-6 top-8 rounded-xl sm:rounded-2xl glass-strong px-2.5 py-1.5 sm:px-4 sm:py-3 shadow-soft pointer-events-none z-30"
              >
                <p className="text-[9px] sm:text-xs text-muted-foreground leading-none">Clinically proven</p>
                <p className="text-xs sm:text-lg font-semibold mt-0.5 sm:mt-1 leading-none">98% efficacy</p>
              </motion.div>

              <motion.div
                style={{ x: badge2X, y: badge2Y, z: 70 }}
                className="absolute right-2 sm:-right-4 bottom-14 rounded-xl sm:rounded-2xl glass-strong px-2.5 py-1.5 sm:px-4 sm:py-3 shadow-soft pointer-events-none z-30"
              >
                <p className="text-[9px] sm:text-xs text-muted-foreground leading-none">Dermatologist</p>
                <p className="text-xs sm:text-lg font-semibold mt-0.5 sm:mt-1 leading-none">Recommended</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
