"use client"

import { motion, useReducedMotion } from "motion/react"

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        ease: "easeInOut",
        duration: shouldReduceMotion ? 0.25 : 0.45
      }}
    >
      {children}
    </motion.div>
  )
}
