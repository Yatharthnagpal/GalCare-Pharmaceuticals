"use client"

import { useState, useMemo } from "react"
import Image, { type ImageProps } from "next/image"
import { useNetworkStatus } from "@/lib/use-network-status"
import { useTheme } from "@/components/theme-provider"

export interface AdaptiveImageProps extends Omit<ImageProps, "src"> {
  src: string
  darkSrc?: string
  svgSrc?: string
  darkSvgSrc?: string
  forceSvg?: boolean
}

export function AdaptiveImage({
  src,
  darkSrc,
  svgSrc,
  darkSvgSrc,
  forceSvg = false,
  alt,
  onError,
  unoptimized,
  ...props
}: AdaptiveImageProps) {
  const { isSlowNetwork } = useNetworkStatus()
  const { theme } = useTheme()
  const [hasError, setHasError] = useState(false)

  const isDark = theme === "dark"

  const activeRasterSrc = isDark && darkSrc ? darkSrc : src

  // Derive the target SVG path
  const targetSvg = useMemo(() => {
    if (isDark && darkSvgSrc) return darkSvgSrc
    if (svgSrc) return svgSrc
    if (typeof activeRasterSrc === "string") {
      if (activeRasterSrc.endsWith(".svg")) return activeRasterSrc
      return activeRasterSrc.replace(/\.(png|jpg|jpeg|webp)$/i, ".svg")
    }
    return "/placeholder.svg"
  }, [activeRasterSrc, isDark, darkSvgSrc, svgSrc])

  const shouldUseSvg = forceSvg || isSlowNetwork || hasError

  const currentSrc = shouldUseSvg ? targetSvg : activeRasterSrc
  const isSvg = typeof currentSrc === "string" && currentSrc.endsWith(".svg")

  return (
    <Image
      src={currentSrc}
      alt={alt || "Galcare Pharmaceutical"}
      unoptimized={isSvg || unoptimized}
      decoding="async"
      onError={(e) => {
        if (!hasError && !shouldUseSvg) {
          setHasError(true)
        }
        if (onError) {
          onError(e)
        }
      }}
      {...props}
    />
  )
}
