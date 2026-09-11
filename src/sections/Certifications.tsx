import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { useCertifications } from '../hooks/useSupabaseData'

export function Certifications() {
  const { certifications, loading } = useCertifications()

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
          {loading ? (
            <div className="space-y-4 py-6">
              <div className="h-6 w-full animate-pulse rounded bg-white/5" />
              <div className="h-6 w-3/4 animate-pulse rounded bg-white/5" />
            </div>
          ) : certifications.length ? (
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
              Add certificates directly in your Supabase{' '}
              <code className="text-accent">certifications</code> table or in{' '}
              <code className="text-accent">src/data/content.ts</code>.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
