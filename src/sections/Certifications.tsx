import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { useCertifications } from '../hooks/useSupabaseData'

export function Certifications() {
  const { certifications, loading } = useCertifications()

  return (
    <section id="certifications" className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="06" label="Certifications" />
        <Reveal>
          <h2 className="font-display text-4xl italic text-paper sm:text-5xl md:text-6xl">
            Proof of learning, listed without noise.
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-line/60 border-y border-line/60">
          {loading ? (
            <div className="space-y-4 py-8">
              <div className="h-8 w-full animate-pulse rounded bg-white/5" />
              <div className="h-8 w-3/4 animate-pulse rounded bg-white/5" />
            </div>
          ) : certifications.length ? (
            certifications.map((item, idx) => (
              <Reveal key={item.name} delay={idx * 0.05}>
                <div className="group grid items-center gap-4 py-6 transition-colors hover:bg-white/[0.01] md:grid-cols-12">
                  <p className="font-mono text-xs tracking-wider text-accent md:col-span-2">
                    {item.year}
                  </p>
                  <p className="text-base font-medium text-paper transition-colors group-hover:text-accent md:col-span-5">
                    {item.name}
                  </p>
                  <p className="text-sm text-mute md:col-span-3">{item.platform}</p>
                  <div className="md:col-span-2 md:text-right">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[11px] font-medium tracking-[0.16em] text-paper uppercase transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent"
                      >
                        Verify <ArrowUpRight size={13} />
                      </a>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))
          ) : (
            <p className="py-10 text-sm text-mute">
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
