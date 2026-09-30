import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsTouch } from '../hooks/useIsTouch'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll() {
  const isTouch = useIsTouch()
  const reducedMotion = usePrefersReducedMotion()
  const location = useLocation()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (isTouch || reducedMotion) {
      return
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const updateRaf = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateRaf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateRaf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [isTouch, reducedMotion])

  // Route change handling: reset scroll and refresh ScrollTrigger triggers
  useEffect(() => {
    if (lenisRef.current && !location.hash) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }

    const refresh = () => {
      ScrollTrigger.refresh()
    }

    // Refresh at staggered intervals to catch fast and slow layout shifts
    const t1 = setTimeout(refresh, 100)
    const t2 = setTimeout(refresh, 400)
    const t3 = setTimeout(refresh, 1200)

    // Refresh when web fonts finish downloading
    document.fonts?.ready?.then(refresh)

    // Observe body height changes caused by async Supabase data or image loads
    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      let timeoutId: ReturnType<typeof setTimeout>
      ro = new ResizeObserver(() => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(refresh, 100)
      })
      ro.observe(document.body)
    }

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      ro?.disconnect()
    }
  }, [location.pathname, location.hash])

  return null
}
