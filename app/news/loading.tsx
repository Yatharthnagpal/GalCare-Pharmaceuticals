import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function NewsLoading() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="h-10 w-48 animate-pulse rounded-lg bg-muted mb-4" />
          <div className="h-14 w-full max-w-xl animate-pulse rounded-xl bg-muted mb-6" />
          <div className="h-6 w-full max-w-md animate-pulse rounded-lg bg-muted mb-12" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 rounded-[2rem] border border-border bg-card p-6 shadow-soft animate-pulse flex flex-col justify-between">
                <div>
                  <div className="h-48 w-full rounded-2xl bg-muted mb-4" />
                  <div className="h-4 w-20 rounded bg-muted mb-2" />
                  <div className="h-6 w-5/6 rounded bg-muted mb-2" />
                </div>
                <div className="h-4 w-full rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
