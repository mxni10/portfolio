import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProjectVisual } from '../components/ProjectVisual'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { projects } from '../data/content'

export function Projects() {
  return (
    <section id="projects" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="03" label="Selected work" />
        <Reveal>
          <h2 className="max-w-4xl font-display text-4xl italic md:text-6xl">
            Projects as products — problem, system, result.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-28">
          {projects.map((project, index) => {
            const reverse = index % 2 === 1
            return (
              <article
                key={project.slug}
                className={`grid items-center gap-10 md:grid-cols-12 ${reverse ? 'md:text-right' : ''}`}
              >
                <Reveal className={reverse ? 'md:col-span-7 md:col-start-6' : 'md:col-span-7'}>
                  <Link
                    to={`/work/${project.slug}`}
                    data-cursor="view"
                    className="group block overflow-hidden rounded-[1.4rem]"
                  >
                    <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                      <ProjectVisual
                        accent={project.accent}
                        title={project.name}
                        index={project.index}
                      />
                    </div>
                  </Link>
                </Reveal>

                <Reveal
                  className={reverse ? 'md:col-span-5 md:col-start-1 md:row-start-1' : 'md:col-span-5'}
                  delay={0.08}
                >
                  <p className="text-[11px] tracking-[0.28em] text-accent uppercase">
                    Project {project.index}
                  </p>
                  <h3 className="mt-3 font-display text-4xl italic md:text-5xl">
                    {project.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-mute md:text-base">
                    {project.description}
                  </p>
                  <ul
                    className={`mt-6 flex flex-wrap gap-2 ${reverse ? 'md:justify-end' : ''}`}
                  >
                    {project.tech.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-line px-3 py-1 text-[11px] tracking-[0.14em] uppercase"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`mt-8 flex flex-wrap gap-4 text-[12px] tracking-[0.18em] uppercase ${reverse ? 'md:justify-end' : ''}`}
                  >
                    <Link
                      to={`/work/${project.slug}`}
                      className="inline-flex items-center gap-1 text-accent hover:underline"
                    >
                      View case study <ArrowUpRight size={14} />
                    </Link>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-mute hover:text-paper"
                    >
                      GitHub
                    </a>
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="text-mute hover:text-paper"
                      >
                        Live
                      </a>
                    ) : null}
                  </div>
                </Reveal>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
