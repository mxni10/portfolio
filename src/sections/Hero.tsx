import { useEffect, useRef } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '../data/content'
import { Magnetic } from '../components/Magnetic'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useIsTouch } from '../hooks/useIsTouch'

gsap.registerPlugin(ScrollTrigger)

const keywords = ['React', 'Node.js', 'MySQL', 'C++', 'Express', 'MongoDB']

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const isTouch = useIsTouch()
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced || isTouch || !sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      // Parallax scroll exit into the About section
      gsap.to(contentRef.current, {
        y: 130,
        opacity: 0.2,
        filter: 'blur(3px)',
        ease: 'power1.in',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.4,
          opacity: 0.25,
          y: 80,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, isTouch])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden px-6 pt-32 pb-12 md:px-10 md:pb-20"
    >
      {/* Cinematic Ambient Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(228,199,160,0.18)_0%,transparent_70%)] blur-[100px]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.03),transparent_40%)]" />

      {/* Editorial Grid Texture */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(243,239,230,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(243,239,230,0.03)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:linear-gradient(180deg,black,transparent_90%)]" />

      <div ref={contentRef} className="relative mx-auto w-full max-w-6xl will-change-transform">
        {/* Status & Roles Row */}
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] tracking-[0.26em] text-mute uppercase">
          <span className="flex items-center gap-2 text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            {profile.year}
          </span>
          <span className="hidden h-px w-8 bg-line sm:block" />
          <span>{profile.roles.join(' · ')}</span>
        </div>

        {/* Masked Headline Reveal */}
        <div className="overflow-hidden">
          <motion.h1
            className="max-w-5xl font-display text-[12vw] leading-[0.9] tracking-tight text-paper italic sm:text-7xl md:text-8xl lg:text-9xl"
            initial={reduced ? false : { y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {profile.headline}
          </motion.h1>
        </div>

        {/* Narrative & Action Split */}
        <div className="mt-10 flex flex-col justify-between gap-10 md:mt-16 md:flex-row md:items-end">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display text-4xl tracking-tight text-accent italic md:text-5xl">
              {profile.name}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-mute md:text-base">
              {profile.summary}
            </p>
          </motion.div>

          <Magnetic>
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-full border border-line bg-white/[0.02] px-7 py-3.5 text-[12px] tracking-[0.2em] text-paper uppercase backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent"
            >
              Selected work
              <ArrowDownRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>
          </Magnetic>
        </div>

        {/* Technical Keyword Badges */}
        <div className="mt-16 flex flex-wrap gap-2">
          {keywords.map((word, index) => (
            <motion.span
              key={word}
              className="rounded-full border border-line bg-white/[0.02] px-3.5 py-1 text-[11px] tracking-[0.18em] text-mute uppercase backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-paper"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05, duration: 0.6 }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="absolute right-8 bottom-10 hidden items-center gap-2 text-[10px] tracking-[0.3em] text-mute uppercase md:flex">
        <span>Scroll</span>
        <span className="h-4 w-px bg-mute/40 animate-pulse" />
      </div>
    </section>
  )
}
