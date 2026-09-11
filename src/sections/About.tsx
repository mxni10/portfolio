import { education, interests, profile } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'

export function About() {
  return (
    <section id="about" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="02" label="About" />
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7">
            <p className="font-display text-3xl leading-tight text-paper italic md:text-5xl">
              {profile.about}
            </p>
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-9" delay={0.1}>
            <dl className="space-y-8 text-sm">
              <div>
                <dt className="text-[11px] tracking-[0.24em] text-mute uppercase">
                  Education
                </dt>
                <dd className="mt-2 text-paper">
                  {education.degree}
                  {education.branch ? ` · ${education.branch}` : ''}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.24em] text-mute uppercase">
                  Currently
                </dt>
                <dd className="mt-2 text-paper">{education.yearLabel}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.24em] text-mute uppercase">
                  Interests
                </dt>
                <dd className="mt-2 space-y-1 text-paper">
                  {interests.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
