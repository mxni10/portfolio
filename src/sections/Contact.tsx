import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Magnetic } from '../components/Magnetic'
import { Reveal } from '../components/Reveal'
import { profile } from '../data/content'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const mailto = profile.email ? `mailto:${profile.email}` : profile.github
  const canCopy = Boolean(profile.email)

  const copy = async () => {
    if (!profile.email) return
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <section id="contact" className="px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] tracking-[0.28em] text-mute uppercase">08 — Contact</p>
          <h2 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] italic md:text-8xl">
            Have an idea?
            <br />
            Let’s build something.
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <Magnetic>
            <a
              href={mailto}
              className="group inline-flex items-center gap-4 font-display text-4xl italic md:text-6xl"
            >
              Let’s talk
              <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </Magnetic>

          <div className="space-y-3 text-sm">
            {profile.email ? (
              <p>
                <a href={`mailto:${profile.email}`} className="hover:text-accent">
                  {profile.email}
                </a>
              </p>
            ) : (
              <p className="text-mute">
                Add your email in <code className="text-accent">src/data/content.ts</code>
              </p>
            )}
            <p>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                GitHub
              </a>
            </p>
            {profile.linkedin ? (
              <p>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent"
                >
                  LinkedIn
                </a>
              </p>
            ) : null}
            {canCopy ? (
              <button
                type="button"
                onClick={() => void copy()}
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy email'}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
