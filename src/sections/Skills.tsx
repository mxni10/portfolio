import { skillGroups } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { TitleReveal } from '../components/TitleReveal'

export function Skills() {
  const loop = [
    ...skillGroups.flatMap((group) => group.items),
    ...skillGroups.flatMap((group) => group.items),
  ]

  return (
    <section id="skills" className="relative py-28 md:py-36">
      {/* Connected atmospheric layer */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(228,199,160,0.03),transparent)]" />

      <div className="relative px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <SectionLabel index="04" label="Tech stack" />
          <TitleReveal>
            <h2 className="max-w-3xl font-display text-4xl italic leading-tight text-paper md:text-6xl">
              Tools I actually use — not a percentage chart.
            </h2>
          </TitleReveal>
        </div>
      </div>

      {/* Infinite Luxury Marquee Strip */}
      <div className="mt-14 overflow-hidden border-y border-line/60 bg-white/[0.01] py-5 backdrop-blur-sm">
        <div className="marquee-track gap-10 pr-10 hover:[animation-play-state:paused]">
          {loop.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="font-display text-3xl text-mute/80 italic transition-colors hover:text-paper md:text-5xl"
            >
              {item}
              <span className="mx-10 text-accent/60">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* Categorized Architecture Grid */}
      <div className="mx-auto mt-16 grid max-w-6xl gap-6 px-6 sm:grid-cols-2 md:px-10 lg:grid-cols-5">
        {skillGroups.map((group, groupIdx) => (
          <Reveal key={group.label} delay={groupIdx * 0.06}>
            <div className="group h-full rounded-2xl border border-line bg-white/[0.02] p-6 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.04]">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] tracking-[0.24em] text-accent uppercase">
                  {group.label}
                </h3>
                <span className="font-mono text-[10px] text-mute">0{groupIdx + 1}</span>
              </div>

              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item}>
                    <span
                      data-cursor="link"
                      className="inline-flex items-center gap-2 text-sm text-paper/85 transition-all duration-300 hover:translate-x-1.5 hover:text-accent"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent/40 group-hover:bg-accent" />
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
