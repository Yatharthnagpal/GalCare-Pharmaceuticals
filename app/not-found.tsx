import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { ArrowLeft, Home, Package, Search } from "lucide-react"

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[75vh] flex items-center justify-center pt-32 pb-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="inline-flex size-20 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-soft mb-6">
            <Search className="size-10" />
          </div>

          <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            404 — Page Not Found
          </span>

          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Looking for something in dermatology?
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            The page you are looking for does not exist or may have been moved. Browse our specialty product catalog or return home.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:bg-primary/95 transition-all"
            >
              <Home className="size-4" />
              Return Home
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-all"
            >
              <Package className="size-4 text-primary" />
              Explore Products
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
