import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 right-0 left-0 z-[90] h-[2px] origin-left bg-gradient-to-r from-accent/30 via-accent to-accent shadow-[0_0_12px_rgba(228,199,160,0.6)]"
      style={{ scaleX }}
    />
  )
}
