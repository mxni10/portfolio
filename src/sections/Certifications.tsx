import { ArrowUpRight } from 'lucide-react'
import { certifications } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'

export function Certifications() {
  return (
    <section id="certifications" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="06" label="Certifications" />
        <Reveal>
          <h2 className="font-display text-4xl italic md:text-5xl">
            Proof of learning, listed without noise.
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {certifications.length ? (
            certifications.map((item) => (
              <div
                key={item.name}
                className="grid items-center gap-3 py-6 md:grid-cols-12"
              >
                <p className="text-sm tracking-[0.16em] text-mute uppercase md:col-span-2">
                  {item.year}
                </p>
                <p className="md:col-span-5">{item.name}</p>
                <p className="text-mute md:col-span-3">{item.platform}</p>
                <div className="md:col-span-2 md:text-right">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[12px] tracking-[0.16em] text-accent uppercase"
                    >
                      View <ArrowUpRight size={14} />
                    </a>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <p className="py-8 text-sm text-mute">
              Add certificates in <code className="text-accent">src/data/content.ts</code>.
              This section stays honest until then.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
