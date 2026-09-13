import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ProjectVisual } from './ProjectVisual'
import { useIsTouch } from '../hooks/useIsTouch'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import type { Project } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  project: Project
  index: number
}

export function CinematicProjectCard({ project, index }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const isTouch = useIsTouch()
  const reducedMotion = usePrefersReducedMotion()
  const reverse = index % 2 === 1

  useEffect(() => {
    if (reducedMotion || isTouch || !containerRef.current || !frameRef.current || !innerRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      // 1. Cinematic Frame Reveal: starts narrowed, expands wide as you scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'top 25%',
          scrub: 1.2,
        },
      })

      tl.fromTo(
        frameRef.current,
        {
          clipPath: 'inset(14% 10% 14% 10% round 2.5rem)',
          scale: 0.94,
        },
        {
          clipPath: 'inset(0% 0% 0% 0% round 1.6rem)',
          scale: 1,
          ease: 'power2.out',
        }
      )

      tl.fromTo(
        innerRef.current,
        {
          scale: 1.18,
          filter: 'brightness(0.85)',
        },
        {
          scale: 1,
          filter: 'brightness(1)',
          ease: 'power2.out',
        },
        0
      )

      // 2. Cinematic Frame Exit: softly contracts as user scrolls past into next project scene
      gsap.fromTo(
        frameRef.current,
        {
          scale: 1,
          opacity: 1,
        },
        {
          scale: 0.96,
          opacity: 0.75,
          ease: 'power1.in',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'bottom 40%',
            end: 'bottom 0%',
            scrub: 1,
          },
        }
      )

      // 3. Title line-mask entrance
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [reducedMotion, isTouch])

  return (
    <article
      ref={containerRef}
      className={`relative grid items-center gap-10 lg:grid-cols-12 lg:gap-14 ${
        reverse ? 'lg:text-right' : ''
      }`}
    >
      {/* Visual Frame Column */}
      <div
        className={`w-full ${
          reverse ? 'lg:col-span-7 lg:col-start-6' : 'lg:col-span-7'
        }`}
      >
        <Link
          to={`/work/${project.slug}`}
          data-cursor="view"
          className="group block cursor-pointer"
        >
          {/* Outer Frame with clipPath reveal */}
          <div
            ref={frameRef}
            className="overflow-hidden rounded-[1.6rem] transition-shadow duration-700 group-hover:shadow-[0_0_50px_rgba(228,199,160,0.15)]"
            style={{
              clipPath: reducedMotion || isTouch ? 'none' : undefined,
            }}
          >
            {/* Inner Visual with counter-zoom */}
            <div
              ref={innerRef}
              className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            >
              <ProjectVisual
                accent={project.accent}
                title={project.name}
                index={project.index}
              />
            </div>
          </div>
        </Link>
      </div>

      {/* Content Narrative Column */}
      <div
        ref={contentRef}
        className={`space-y-6 ${
          reverse
            ? 'lg:col-span-5 lg:col-start-1 lg:row-start-1'
            : 'lg:col-span-5'
        }`}
      >
        <div className="flex items-center gap-3 text-[11px] tracking-[0.28em] text-accent uppercase">
          <span>Project {project.index}</span>
          <span className="h-px w-6 bg-accent/40" />
          <span className="text-mute">{project.year}</span>
        </div>

        {/* Masked Title Reveal */}
        <div className="overflow-hidden">
          <h3
            ref={titleRef}
            className="font-display text-4xl italic text-paper md:text-5xl lg:text-6xl"
          >
            {project.name}
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-mute md:text-base">
          {project.description}
        </p>

        {/* Tech Stack Badges */}
        <ul
          className={`flex flex-wrap gap-2 ${
            reverse ? 'lg:justify-end' : ''
          }`}
        >
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line bg-white/[0.02] px-3.5 py-1 text-[11px] font-medium tracking-[0.14em] text-paper/90 uppercase backdrop-blur-sm transition-colors hover:border-accent/60 hover:text-accent"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* Action Links */}
        <div
          className={`flex flex-wrap items-center gap-6 pt-2 text-[12px] tracking-[0.2em] uppercase ${
            reverse ? 'lg:justify-end' : ''
          }`}
        >
          <Link
            to={`/work/${project.slug}`}
            className="group inline-flex items-center gap-1.5 text-accent transition-colors hover:text-paper"
          >
            <span>Case study</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="text-mute transition-colors hover:text-paper"
          >
            GitHub
          </a>

          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="text-mute transition-colors hover:text-paper"
            >
              Live demo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
