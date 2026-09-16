import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ProjectVisual } from '../components/ProjectVisual'
import { useProject } from '../hooks/useSupabaseData'

export function ProjectCase() {
  const { slug } = useParams()
  const { project, loading } = useProject(slug)

  if (loading) {
    return (
      <main className="px-6 pt-28 pb-24 md:px-10">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
          <div className="h-14 w-3/4 animate-pulse rounded bg-white/10" />
          <div className="aspect-[16/10] animate-pulse rounded-[1.4rem] bg-white/5" />
        </div>
      </main>
    )
  }

  if (!project) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="px-6 pt-28 pb-24 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] text-mute uppercase hover:text-paper"
        >
          <ArrowLeft size={14} /> Back
        </Link>

        <p className="mt-10 text-[11px] tracking-[0.28em] text-accent uppercase">
          Project {project.index} · {project.year}
        </p>
        <h1 className="mt-4 font-display text-5xl italic md:text-8xl">{project.name}</h1>
        <p className="mt-6 max-w-2xl text-lg text-mute">{project.tagline}</p>

        <div className="mt-10" data-cursor="explore">
          <ProjectVisual
            accent={project.accent}
            title={project.name}
            index={project.index}
            imageUrl={project.imageUrl}
          />
        </div>

        <dl className="mt-10 grid gap-6 border-y border-line py-8 sm:grid-cols-3">
          <div>
            <dt className="text-[11px] tracking-[0.22em] text-mute uppercase">Role</dt>
            <dd className="mt-2">{project.role}</dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.22em] text-mute uppercase">Stack</dt>
            <dd className="mt-2">{project.tech.join(' · ')}</dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.22em] text-mute uppercase">Links</dt>
            <dd className="mt-2 flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-accent"
              >
                GitHub <ArrowUpRight size={14} />
              </a>
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-accent"
                >
                  Live <ArrowUpRight size={14} />
                </a>
              ) : null}
            </dd>
          </div>
        </dl>

        <ol className="mt-16 space-y-16">
          {project.blocks.map((block, index) => (
            <li key={block.id} className="grid gap-6 md:grid-cols-12">
              <p className="text-[11px] tracking-[0.24em] text-accent uppercase md:col-span-3">
                {String(index + 1).padStart(2, '0')} — {block.title}
              </p>
              <p className="text-base leading-relaxed text-paper/90 md:col-span-8">
                {block.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16">
          <h2 className="text-[11px] tracking-[0.24em] text-mute uppercase">Key features</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {project.features.map((feature) => (
              <li key={feature} className="border-t border-line pt-3 text-sm">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
