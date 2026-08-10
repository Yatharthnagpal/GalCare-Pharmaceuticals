export default function NewsLoading() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header Skeleton */}
        <div className="mx-auto max-w-2xl text-center space-y-4 animate-pulse">
          <div className="h-4 w-28 bg-muted rounded-md mx-auto" />
          <div className="h-8 w-2/3 bg-muted rounded-xl mx-auto" />
        </div>

        {/* News Cards Grid Skeleton */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-3xl border border-border bg-card overflow-hidden space-y-4 animate-pulse"
            >
              <div className="aspect-video w-full bg-muted" />
              <div className="p-6 space-y-3">
                <div className="h-4 w-24 bg-muted rounded-md" />
                <div className="h-6 w-full bg-muted rounded-lg" />
                <div className="h-12 w-full bg-muted/60 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
