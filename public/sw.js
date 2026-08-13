/**
 * GalCare Pharmaceuticals Service Worker
 * Enables offline access to product catalogs, packaging specifications, and visual aids for medical reps.
 */

const CACHE_NAME = "galcare-pwa-v1"
const STATIC_ASSETS = [
  "/",
  "/products",
  "/about",
  "/quality",
  "/divisions/third-party-manufacturing",
  "/contact",
  "/dashboard",
  "/manifest.json",
  "/galcare-logo.png",
  "/galcare-logo.svg"
]

// Install Event - Pre-cache critical static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[PWA SW] Pre-caching offline static assets")
      return cache.addAll(STATIC_ASSETS)
    }).then(() => self.skipWaiting())
  )
})

// Activate Event - Clean up stale caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[PWA SW] Clearing old cache:", cache)
            return caches.delete(cache)
          }
        })
      )
    }).then(() => self.clients.claim())
  )
})

// Fetch Event - Stale-while-revalidate for pages, Cache-first for images
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url)

  // Skip caching for non-GET, API routes, Turbopack HMR, and Next.js dev chunks
  if (
    event.request.method !== "GET" ||
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/_next/webpack-hmr") ||
    url.pathname.includes("turbopack") ||
    url.pathname.includes("hot-reload")
  ) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Fetch fresh version in background
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
            const responseToCache = networkResponse.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache)
            })
          }
          return networkResponse
        })
        .catch(() => {
          console.warn("[PWA SW] Network fetch failed, relying on cache for:", url.pathname)
        })

      // Return cached version immediately if available, or wait for network
      return cachedResponse || fetchPromise
    })
  )
})
