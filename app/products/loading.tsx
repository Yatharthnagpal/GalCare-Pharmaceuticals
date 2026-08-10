export default function ProductsLoading() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header Skeleton */}
        <div className="mx-auto max-w-2xl text-center space-y-4 animate-pulse">
          <div className="h-4 w-32 bg-muted rounded-md mx-auto" />
          <div className="h-8 w-3/4 bg-muted rounded-xl mx-auto" />
          <div className="h-4 w-full bg-muted rounded-md mx-auto" />
        </div>

        {/* Filter Pills Skeleton */}
        <div className="mt-10 flex gap-2 overflow-hidden justify-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-9 w-28 bg-muted rounded-full animate-pulse" />
          ))}
        </div>

        {/* Product Grid Skeleton */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-[2rem] border border-border bg-card p-6 space-y-4 animate-pulse"
            >
              <div className="aspect-[4/3] w-full bg-muted rounded-2xl" />
              <div className="h-5 w-2/3 bg-muted rounded-md" />
              <div className="h-4 w-1/2 bg-muted/70 rounded-md" />
              <div className="h-12 w-full bg-muted/50 rounded-md" />
              <div className="h-10 w-full bg-muted rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
