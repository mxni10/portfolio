import { education } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'

export function Education() {
  const details = [
    education.college && { label: 'College', value: education.college },
    education.branch && { label: 'Branch', value: education.branch },
    education.expectedGrad && { label: 'Expected', value: education.expectedGrad },
    education.cgpa && { label: 'CGPA', value: education.cgpa },
  ].filter((item): item is { label: string; value: string } => Boolean(item))

  return (
    <section id="education" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="05" label="Education" />
        <Reveal>
          <div className="grid gap-8 border-t border-line py-10 md:grid-cols-12">
            <p className="text-sm tracking-[0.18em] text-mute uppercase md:col-span-3">
              {education.period}
            </p>
            <div className="md:col-span-9">
              <h2 className="font-display text-4xl italic md:text-6xl">
                {education.degree}
              </h2>
              <p className="mt-3 text-mute">{education.yearLabel}</p>
              {details.length ? (
                <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                  {details.map((item) => (
                    <div key={item.label}>
                      <dt className="text-[11px] tracking-[0.22em] text-mute uppercase">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-paper">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-6 max-w-md text-sm text-mute">
                  College, branch, and CGPA live in{' '}
                  <code className="text-accent">src/data/content.ts</code> — add them
                  when you are ready. Nothing here is invented.
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
