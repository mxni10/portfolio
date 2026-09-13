import { education } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'

export function Education() {
  const details = [
    education.college && { label: 'College', value: education.college },
    education.branch && { label: 'Branch', value: education.branch },
    education.expectedGrad && { label: 'Expected Graduation', value: education.expectedGrad },
    education.cgpa && { label: 'CGPA', value: education.cgpa },
  ].filter((item): item is { label: string; value: string } => Boolean(item))

  return (
    <section id="education" className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="05" label="Education" />

        <Reveal>
          <div className="relative mt-8 rounded-3xl border border-line bg-white/[0.02] p-8 md:p-12 backdrop-blur-md">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-mono tracking-widest text-accent uppercase">
                  {education.period}
                </span>
              </div>

              <div className="lg:col-span-9">
                <h2 className="font-display text-4xl italic text-paper sm:text-5xl md:text-6xl">
                  {education.degree}
                </h2>
                <p className="mt-3 text-base text-mute">{education.yearLabel}</p>

                {details.length ? (
                  <dl className="mt-8 grid gap-6 border-t border-line/60 pt-8 sm:grid-cols-2">
                    {details.map((item) => (
                      <div key={item.label} className="rounded-xl border border-line/40 bg-black/20 p-4">
                        <dt className="text-[10px] tracking-[0.24em] text-accent uppercase">
                          {item.label}
                        </dt>
                        <dd className="mt-1.5 text-sm font-medium text-paper">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="mt-8 border-t border-line/60 pt-6 text-xs leading-relaxed text-mute">
                    College, branch, and CGPA live in{' '}
                    <code className="text-accent">src/data/content.ts</code> — add them when you are ready. Nothing here is invented.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
