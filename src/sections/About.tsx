import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { education, interests, profile } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useIsTouch } from '../hooks/useIsTouch'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const statementRef = useRef<HTMLParagraphElement>(null)
  const containerRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const isTouch = useIsTouch()

  useEffect(() => {
    if (reduced || isTouch || !statementRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      // Subtle scroll scrub illumination on the statement text
      gsap.fromTo(
        statementRef.current,
        { opacity: 0.4, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statementRef.current,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 1,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [reduced, isTouch])

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative overflow-hidden px-6 py-28 md:px-10 md:py-36"
    >
      {/* Seamless transition bleed from Hero */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-3/4 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(228,199,160,0.04),transparent_70%)] blur-[80px]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionLabel index="02" label="About" />

        <div className="mt-8 grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Main Editorial Statement */}
          <div className="lg:col-span-7">
            <p
              ref={statementRef}
              className="font-display text-3xl leading-[1.15] text-paper italic sm:text-4xl md:text-5xl lg:text-[3.2rem]"
            >
              {profile.about}
            </p>

            <div className="mt-12 flex items-center gap-4 text-xs tracking-[0.24em] text-mute uppercase">
              <span className="h-px w-10 bg-accent/40" />
              <span>Engineering foundations · Creative execution</span>
            </div>
          </div>

          {/* Structured Metadata Cards */}
          <div className="lg:col-span-5 lg:pl-6">
            <Reveal delay={0.1}>
              <div className="space-y-6">
                {/* Education Card */}
                <div className="group rounded-2xl border border-line bg-white/[0.02] p-6 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.04]">
                  <dt className="text-[10px] tracking-[0.26em] text-accent uppercase">
                    Education
                  </dt>
                  <dd className="mt-3 text-lg font-medium text-paper">
                    {education.degree}
                    {education.branch ? (
                      <span className="block text-sm font-normal text-mute mt-0.5">
                        {education.branch}
                      </span>
                    ) : null}
                  </dd>
                  <p className="mt-2 text-xs tracking-wider text-mute">
                    {education.yearLabel} · {education.period}
                  </p>
                </div>

                {/* Core Focus / Interests Card */}
                <div className="group rounded-2xl border border-line bg-white/[0.02] p-6 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.04]">
                  <dt className="text-[10px] tracking-[0.26em] text-accent uppercase">
                    Core Focus & Interests
                  </dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {interests.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-line/70 bg-black/40 px-3 py-1 text-xs text-paper/85 transition-colors group-hover:border-accent/30"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
