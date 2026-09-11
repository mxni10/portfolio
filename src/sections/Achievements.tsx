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
    <section id="achievements" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="07" label="Milestones" />
        <Reveal>
          <h2 className="font-display text-4xl italic md:text-5xl">
            Selected achievements & recognitions.
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {loading ? (
            <div className="space-y-6 py-8">
              <div className="h-6 w-1/3 animate-pulse rounded bg-white/10" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-white/5" />
            </div>
          ) : (
            achievements.map((item) => (
              <div
                key={item.id}
                className="grid items-start gap-4 py-8 md:grid-cols-12 md:items-center"
              >
                <p className="text-sm tracking-[0.16em] text-mute uppercase md:col-span-2">
                  {item.date}
                </p>
                <div className="space-y-1 md:col-span-7">
                  <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-accent" />
                    <h3 className="font-display text-2xl italic text-paper md:text-3xl">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-mute leading-relaxed">{item.description}</p>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <span className="inline-block rounded-full border border-line px-3 py-1 text-[11px] tracking-[0.16em] text-mute uppercase">
                    Verified
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
