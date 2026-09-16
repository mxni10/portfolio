import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { useLearning } from '../hooks/useSupabaseData'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function Learning() {
  const reduced = usePrefersReducedMotion()
  const { learning, loading } = useLearning()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced || learning.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % learning.length)
    }, 2400)
    return () => window.clearInterval(id)
  }, [reduced, learning.length])

  const currentTopic = learning[index] || learning[0] || 'Modern Web Development'

  return (
    <section id="learning" className="relative px-6 py-28 md:px-10 md:py-36">
      {/* Connected atmospheric layer */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_60%,rgba(228,199,160,0.025),transparent)]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionLabel index="08" label="Currently exploring" />

        <Reveal>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end">
            <p className="flex items-center gap-2 text-[11px] tracking-[0.28em] text-mute uppercase">
              <Sparkles size={13} className="text-accent animate-pulse" />
              <span>Currently exploring</span>
            </p>

            <div className="relative h-16 w-full overflow-hidden font-display text-4xl italic md:h-20 md:text-6xl lg:text-7xl">
              {loading ? (
                <div className="h-14 w-80 animate-pulse rounded bg-white/10" />
              ) : reduced ? (
                <span className="text-accent">{currentTopic}</span>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTopic}
                    className="absolute inset-0 text-accent will-change-transform"
                    initial={{ y: 36, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -36, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {currentTopic}
                  </motion.span>
                </AnimatePresence>
              )}
            </div>
          </div>
        </Reveal>

        <ul className="mt-14 flex flex-wrap gap-2.5">
          {learning.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line bg-white/[0.02] px-4 py-2 text-xs font-medium tracking-wide text-paper/85 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
