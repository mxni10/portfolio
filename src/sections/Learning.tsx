import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
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
    <section id="learning" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="08" label="Currently exploring" />
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end">
            <p className="text-[11px] tracking-[0.28em] text-mute uppercase">
              Currently learning
            </p>
            <div className="relative h-16 overflow-hidden font-display text-4xl italic md:h-20 md:text-6xl">
              {loading ? (
                <div className="h-12 w-64 animate-pulse rounded bg-white/10" />
              ) : reduced ? (
                <span>{currentTopic}</span>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTopic}
                    className="absolute inset-0 text-accent"
                    initial={{ y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -28, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {currentTopic}
                  </motion.span>
                </AnimatePresence>
              )}
            </div>
          </div>
        </Reveal>
        <ul className="mt-12 flex flex-wrap gap-2">
          {learning.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line px-4 py-2 text-sm text-mute"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
