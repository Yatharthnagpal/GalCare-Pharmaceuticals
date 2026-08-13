"use client"

import { useEffect, useState } from "react"
import { WifiOff, Download, CheckCircle2 } from "lucide-react"

export function PWAInstaller() {
  const [isOffline, setIsOffline] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // 1. Service Worker Registration
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => console.log("[PWA] Service Worker registered with scope:", reg.scope))
          .catch((err) => console.warn("[PWA] Service Worker registration failed:", err))
      })
    }

    // 2. Online / Offline status monitoring
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    if (typeof window !== "undefined") {
      setIsOffline(!navigator.onLine)
      window.addEventListener("online", handleOnline)
      window.addEventListener("offline", handleOffline)
    }

    // 3. BeforeInstallPrompt handling
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === "accepted") {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }
  }

  return (
    <>
      {/* Offline Status Badge */}
      {isOffline && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full bg-amber-500/90 px-4 py-2 text-xs font-semibold text-slate-950 shadow-lg backdrop-blur-md transition-all animate-bounce">
          <WifiOff className="h-4 w-4" />
          <span>Offline Mode Active — Products Cached</span>
        </div>
      )}

      {/* PWA Installation Floating CTA if prompt available */}
      {deferredPrompt && !isInstalled && (
        <div className="fixed bottom-4 right-20 z-40 hidden sm:flex items-center gap-3 rounded-2xl border border-sky-500/30 bg-slate-900/90 px-4 py-2.5 text-xs text-slate-200 shadow-xl backdrop-blur-md">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
            <Download className="h-4 w-4" />
          </div>
          <div>
            <p className="font-semibold text-slate-100">Install GalCare App</p>
            <p className="text-[10px] text-slate-400">Offline access for hospital reps</p>
          </div>
          <button
            onClick={handleInstallClick}
            className="ml-2 rounded-lg bg-sky-500 px-3 py-1.5 font-medium text-slate-950 hover:bg-sky-400 transition"
          >
            Install
          </button>
        </div>
      )}
    </>
  )
}
