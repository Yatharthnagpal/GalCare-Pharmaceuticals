"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("App boundary error:", error)
  }, [error])

  return (
    <>
      <Navbar />
      <main className="min-h-[75vh] flex items-center justify-center pt-32 pb-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="inline-flex size-20 items-center justify-center rounded-3xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-soft mb-6">
            <AlertTriangle className="size-10" />
          </div>

          <span className="rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
            System Alert
          </span>

          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Something went wrong
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            An unexpected issue occurred while rendering this page. You can try refreshing the page or head back to the homepage.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:bg-primary/95 transition-all"
            >
              <RefreshCw className="size-4" />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-all"
            >
              <Home className="size-4" />
              Return Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
