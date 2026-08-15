"use client"

import { useState, useMemo } from "react"
import Image, { type ImageProps } from "next/image"

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
  const [imageFailed, setImageFailed] = useState(false)

  // Use explicit svgSrc if provided and forceSvg is true, otherwise use primary src
  const currentSrc = useMemo(() => {
    if (imageFailed) return "/placeholder.jpg"
    if (forceSvg && svgSrc) return svgSrc
    return src || "/placeholder.jpg"
  }, [src, svgSrc, forceSvg, imageFailed])

  const isSvg = typeof currentSrc === "string" && currentSrc.endsWith(".svg")

  return (
    <Image
      src={currentSrc}
      alt={alt || "Galcare Pharmaceutical"}
      quality={props.quality || 85}
      unoptimized={isSvg || unoptimized}
      decoding="async"
      priority={priority}
      loading={priority ? "eager" : props.loading}
      onError={(e) => {
        if (!imageFailed) {
          setImageFailed(true)
        }
        if (onError) {
          onError(e)
        }
      }}
      {...props}
    />
  )
}
