import { profile } from '../data/content'

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-mute md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-paper">{profile.name}</p>
          <p className="mt-1">{profile.title}</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-paper">
            GitHub
          </a>
          {profile.linkedin ? (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-paper">
              LinkedIn
            </a>
          ) : null}
          {profile.email ? (
            <a href={`mailto:${profile.email}`} className="hover:text-paper">
              Email
            </a>
          ) : null}
          <button
            type="button"
            className="hover:text-paper"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top ↑
          </button>
        </div>
        <p>© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  )
}
