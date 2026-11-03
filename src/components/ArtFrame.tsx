import { useEffect, useRef, useState } from 'react'
import { cn } from '@/utils/cn'
import GenerativeArt, { type ArtStyle } from './GenerativeArt'
import { useHasGeneratedImage } from '@/hooks/useGeneratedImage'

interface ArtFrameProps {
  seed?: string
  style?: ArtStyle | 'auto'
  imageKey?: string
  alt?: string
  className?: string
  imageClassName?: string
  animate?: boolean
  priority?: boolean
  overlay?: React.ReactNode
  rounded?: string
  cycleMs?: number
  scrim?: 'strong' | 'soft' | 'none'
  fit?: 'cover' | 'contain'
}

const SCRIMS = {
  strong: 'bg-gradient-to-t from-navy/70 via-navy/10 to-transparent',
  soft: 'bg-gradient-to-t from-navy/35 via-navy/5 to-transparent',
  none: '',
}

/**
 * Two-layer imagery: procedural artwork always renders (and is the fallback),
 * while an AI-generated WebP fades in on top when it exists in /public/generated.
 */
export default function ArtFrame({
  seed = 'rns-global',
  style = 'auto',
  imageKey,
  alt = '',
  className,
  imageClassName,
  animate = false,
  priority = false,
  overlay,
  rounded = 'rounded-2xl',
  cycleMs,
  scrim = 'strong',
  fit = 'cover',
}: ArtFrameProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const imageExists = useHasGeneratedImage(imageKey)
  const showImage = Boolean(imageKey) && imageExists && !failed

  useEffect(() => {
    setLoaded(false)
    setFailed(false)
  }, [imageKey])

  useEffect(() => {
    const img = imgRef.current
    if (!img) return
    // Cached images can finish before React attaches onLoad, which would leave
    // the overlay stuck at opacity-0. Reconcile against the live element state.
    if (img.complete) {
      if (img.naturalWidth > 0) setLoaded(true)
      else setFailed(true)
    }
  }, [showImage, imageKey])

  return (
    <div className={cn('relative isolate overflow-hidden bg-navy', rounded, className)}>
      <GenerativeArt
        seed={seed}
        style={style}
        animate={animate && !loaded}
        cycleMs={cycleMs}
        label={alt === '' ? '' : alt || 'Generative brand artwork'}
        className={cn(
          'absolute inset-0 h-full w-full transition-[filter,transform] duration-700 ease-out',
          showImage && !loaded && 'scale-105 blur-md',
        )}
      />
      {showImage && !loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-navy/0 via-navy/10 to-navy/40"
        />
      )}
      {showImage && fit === 'contain' && (
        <img
          aria-hidden="true"
          src={`/generated/${imageKey}.webp`}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full scale-110 object-cover object-center blur-2xl brightness-75 saturate-125"
        />
      )}
      {showImage && (
        <img
          key={imageKey}
          ref={imgRef}
          src={`/generated/${imageKey}.webp`}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-center transition-[opacity,transform] duration-700 ease-out',
            fit === 'contain' ? 'object-contain' : 'object-cover',
            loaded ? 'opacity-100' : 'opacity-0',
            imageClassName,
          )}
        />
      )}
      <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', SCRIMS[scrim])} />
      {overlay}
    </div>
  )
}
