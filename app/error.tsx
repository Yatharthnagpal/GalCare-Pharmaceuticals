"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error logged:", error)
  }, [error])

  return (
    <main className="min-h-screen pt-32 pb-20 flex items-center justify-center relative overflow-hidden bg-background">
      <div className="relative mx-auto max-w-lg px-4 text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-destructive/10 border border-destructive/20 text-destructive shadow-sm">
          <AlertTriangle className="size-10" />
        </div>

        <span className="mt-6 block text-xs font-bold uppercase tracking-widest text-destructive">
          Unexpected Application Error
        </span>

        <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl text-foreground">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          An unexpected issue occurred while rendering this page. You can attempt to refresh the component or return to the main homepage.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:bg-primary/95 transition-transform hover:-translate-y-0.5"
          >
            <RefreshCw className="size-4" /> Try Again
          </button>

          <Link
            href="/"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
          >
            <Home className="size-4 text-primary" /> Return Home
          </Link>
        </div>
      </div>
    </main>
  )
}
