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
  priority,
  ...props
}: AdaptiveImageProps) {
  const { isSlowNetwork } = useNetworkStatus()
  const [svgFailed, setSvgFailed] = useState(false)

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

  const shouldUseSvg = (forceSvg || isSlowNetwork) && !svgFailed

  const currentSrc = shouldUseSvg ? targetSvg : src
  const isSvg = typeof currentSrc === "string" && currentSrc.endsWith(".svg")

  return (
    <Image
      src={currentSrc}
      alt={alt || "Galcare Pharmaceutical"}
      unoptimized={isSvg || unoptimized}
      decoding="async"
      priority={priority}
      loading={priority ? "eager" : props.loading}
      onError={(e) => {
        if (shouldUseSvg && !svgFailed) {
          setSvgFailed(true)
        } else if (onError) {
          onError(e)
        }
      }}
      {...props}
    />
  )
}
