import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { CinematicProjectCard } from '../components/CinematicProjectCard'
import { useProjects } from '../hooks/useSupabaseData'

export function Projects() {
  const { projects, loading } = useProjects()

  return (
    <section id="projects" className="relative px-6 py-28 md:px-10 md:py-40">
      {/* Subtle ambient lighting behind projects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(228,199,160,0.04),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionLabel index="03" label="Selected work" />
        <Reveal>
          <h2 className="max-w-4xl font-display text-4xl italic leading-[1.05] text-paper sm:text-5xl md:text-7xl">
            Projects as products — problem, system, result.
          </h2>
        </Reveal>

        <div className="mt-20 space-y-36 md:space-y-48">
          {loading ? (
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="aspect-[16/10] animate-pulse rounded-[1.6rem] border border-line bg-white/[0.03] lg:col-span-7" />
              <div className="space-y-4 lg:col-span-5">
                <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
                <div className="h-10 w-3/4 animate-pulse rounded bg-white/10" />
                <div className="h-16 w-full animate-pulse rounded bg-white/5" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 animate-pulse rounded-full bg-white/10" />
                  <div className="h-6 w-16 animate-pulse rounded-full bg-white/10" />
                </div>
              </div>
            </div>
          ) : (
            projects.map((project, index) => (
              <CinematicProjectCard
                key={project.slug}
                project={project}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
