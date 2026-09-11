import { skillGroups } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'

export function Skills() {
  const loop = [...skillGroups.flatMap((group) => group.items), ...skillGroups.flatMap((group) => group.items)]

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <SectionLabel index="04" label="Tech stack" />
          <Reveal>
            <h2 className="max-w-3xl font-display text-4xl italic md:text-6xl">
              Tools I actually use — not a percentage chart.
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="mt-12 overflow-hidden border-y border-line py-4">
        <div className="marquee-track gap-10 pr-10">
          {loop.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="font-display text-3xl text-mute italic md:text-5xl"
            >
              {item}
              <span className="mx-10 text-accent">/</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-10 px-6 md:grid-cols-5 md:px-10">
        {skillGroups.map((group) => (
          <Reveal key={group.label}>
            <h3 className="text-[11px] tracking-[0.24em] text-accent uppercase">
              {group.label}
            </h3>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li key={item}>
                  <span
                    data-cursor="link"
                    className="inline-block text-sm text-paper transition-transform duration-300 hover:translate-x-1 hover:text-accent"
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
