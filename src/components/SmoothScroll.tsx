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
    if (lenisRef.current) {
      if (!location.hash) {
        lenisRef.current.scrollTo(0, { immediate: true })
      }
      // Allow DOM to settle, then refresh ScrollTrigger positions
      const timeout = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [location.pathname, location.hash])

  return null
}
