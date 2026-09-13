import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsTouch } from '../hooks/useIsTouch'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll() {
  const isTouch = useIsTouch()
  const reducedMotion = usePrefersReducedMotion()

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

    lenis.on('scroll', ScrollTrigger.update)

    const updateRaf = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateRaf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateRaf)
      lenis.destroy()
    }
  }, [isTouch, reducedMotion])

  return null
}
