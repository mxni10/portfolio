import { ArrowDownRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { profile } from '../data/content'
import { Magnetic } from '../components/Magnetic'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const keywords = ['React', 'Node.js', 'MySQL', 'C++', 'Express', 'MongoDB']

export function Hero() {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden px-6 pt-28 pb-10 md:px-10 md:pb-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(228,199,160,0.12),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(243,239,230,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(243,239,230,0.04)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(180deg,black,transparent)]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] tracking-[0.24em] text-mute uppercase">
          <span>{profile.year}</span>
          <span className="hidden h-px w-8 bg-line sm:block" />
          <span>{profile.roles.join(' · ')}</span>
        </div>

        <motion.h1
          className="max-w-5xl font-display text-[13vw] leading-[0.9] tracking-tight text-paper italic sm:text-7xl md:text-8xl lg:text-9xl"
          initial={reduced ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {profile.headline}
        </motion.h1>

        <div className="mt-10 flex flex-col justify-between gap-10 md:mt-16 md:flex-row md:items-end">
          <div>
            <p className="font-display text-4xl tracking-tight text-accent italic md:text-5xl">
              {profile.name}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-mute md:text-base">
              {profile.summary}
            </p>
          </div>

          <Magnetic>
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-full border border-line px-6 py-3 text-[12px] tracking-[0.2em] uppercase transition-colors hover:border-accent hover:text-accent"
            >
              Selected work
              <ArrowDownRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>
          </Magnetic>
        </div>

        <div className="mt-16 flex flex-wrap gap-2">
          {keywords.map((word, index) => (
            <motion.span
              key={word}
              className="rounded-full border border-line px-3 py-1 text-[11px] tracking-[0.18em] text-mute uppercase"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.06 }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>

      <a
        href="#about"
        className="absolute right-8 bottom-8 hidden text-[11px] tracking-[0.28em] text-mute uppercase md:block"
      >
        Scroll
      </a>
    </section>
  )
}
