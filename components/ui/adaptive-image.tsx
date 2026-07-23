"use client"

import { useState, useMemo } from "react"
import Image, { type ImageProps } from "next/image"
import { useNetworkStatus } from "@/lib/use-network-status"

export interface AdaptiveImageProps extends Omit<ImageProps, "src"> {
  src: string
  svgSrc?: string
  forceSvg?: boolean
}

export function AdaptiveImage({
  src,
  svgSrc,
  forceSvg = false,
  alt,
  onError,
  unoptimized,
  ...props
}: AdaptiveImageProps) {
  const { isSlowNetwork } = useNetworkStatus()
  const [hasError, setHasError] = useState(false)

  // Derive the target SVG path
  const targetSvg = useMemo(() => {
    if (svgSrc) return svgSrc
    if (typeof src === "string") {
      if (src.endsWith(".svg")) return src
      // Replace raster extension with .svg
      return src.replace(/\.(png|jpg|jpeg|webp)$/i, ".svg")
    }
    return "/placeholder.svg"
  }, [src, svgSrc])

  const shouldUseSvg = forceSvg || isSlowNetwork || hasError

  const currentSrc = shouldUseSvg ? targetSvg : src
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
