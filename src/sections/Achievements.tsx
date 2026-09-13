import { Trophy } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { useAchievements } from '../hooks/useSupabaseData'

export function Achievements() {
  const { achievements, loading } = useAchievements()

  // Only render section if achievements exist or are loading
  if (!loading && achievements.length === 0) {
    return null
  }

  return (
    <section id="achievements" className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="07" label="Milestones" />
        <Reveal>
          <h2 className="font-display text-4xl italic text-paper sm:text-5xl md:text-6xl">
            Selected achievements & recognitions.
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-line/60 border-y border-line/60">
          {loading ? (
            <div className="space-y-6 py-8">
              <div className="h-7 w-1/3 animate-pulse rounded bg-white/10" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-white/5" />
            </div>
          ) : (
            achievements.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 0.06}>
                <div className="group grid items-start gap-4 py-8 transition-colors hover:bg-white/[0.01] md:grid-cols-12 md:items-center">
                  <p className="font-mono text-xs tracking-wider text-accent md:col-span-2">
                    {item.date}
                  </p>
                  <div className="space-y-1.5 md:col-span-7">
                    <div className="flex items-center gap-2.5">
                      <Trophy size={16} className="text-accent transition-transform duration-300 group-hover:scale-110" />
                      <h3 className="font-display text-2xl italic text-paper transition-colors group-hover:text-accent md:text-3xl">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-mute leading-relaxed">{item.description}</p>
                  </div>
                  <div className="md:col-span-3 md:text-right">
                    <span className="inline-block rounded-full border border-line bg-white/[0.02] px-3.5 py-1 text-[10px] font-mono tracking-widest text-mute uppercase">
                      Milestone
                    </span>
                  </div>
                </div>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
