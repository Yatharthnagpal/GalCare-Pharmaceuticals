import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ShieldAlert, Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] pt-32 pb-20 flex items-center justify-center relative overflow-hidden">
        {/* Background glow circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-xl px-4 text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-primary/10 border border-primary/20 text-primary shadow-glow">
            <ShieldAlert className="size-10" />
          </div>

          <span className="mt-6 block text-xs font-bold uppercase tracking-widest text-primary">
            404 Error • Page Not Found
          </span>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Looking for a formulation?
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The page or product specification you requested could not be located in our active directory. It may have moved or been updated.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:bg-primary/95 transition-transform hover:-translate-y-0.5"
            >
              <Home className="size-4" /> Return to Home
            </Link>

            <Link
              href="/products"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
            >
              <Search className="size-4 text-primary" /> Browse Catalogue
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
