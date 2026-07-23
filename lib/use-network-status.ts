"use client"

import { useState, useEffect } from "react"

interface NetworkInformation extends EventTarget {
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g"
  saveData?: boolean
  addEventListener?: (type: string, listener: EventListener) => void
  removeEventListener?: (type: string, listener: EventListener) => void
}

export function useNetworkStatus() {
  const [isSlowNetwork, setIsSlowNetwork] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const nav = navigator as Navigator & {
      connection?: NetworkInformation
      mozConnection?: NetworkInformation
      webkitConnection?: NetworkInformation
    }

    const conn = nav.connection || nav.mozConnection || nav.webkitConnection

    const checkStatus = () => {
      if (!conn) return false
      const isSlowType = conn.effectiveType === "slow-2g" || conn.effectiveType === "2g" || conn.effectiveType === "3g"
      const isSaveData = Boolean(conn.saveData)
      return isSlowType || isSaveData
    }

    setIsSlowNetwork(checkStatus())

    if (conn && conn.addEventListener) {
      const handleChange = () => setIsSlowNetwork(checkStatus())
      conn.addEventListener("change", handleChange)
      return () => {
        if (conn.removeEventListener) {
          conn.removeEventListener("change", handleChange)
        }
      }
    }
  }, [])

  return { isSlowNetwork }
}
