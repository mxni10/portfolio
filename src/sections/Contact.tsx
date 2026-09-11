import { ArrowUpRight, Check, Copy, Loader2, Send } from 'lucide-react'
import { useState } from 'react'
import { Magnetic } from '../components/Magnetic'
import { Reveal } from '../components/Reveal'
import { profile } from '../data/content'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const mailto = profile.email ? `mailto:${profile.email}` : profile.github
  const canCopy = Boolean(profile.email)

  const copy = async () => {
    if (!profile.email) return
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return

    setStatus('submitting')
    setErrorMessage('')

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('contact_messages').insert([
          {
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
          },
        ])

        if (error) throw error
      } else {
        // Fallback simulation when Supabase credentials are not yet configured
        await new Promise((resolve) => setTimeout(resolve, 800))
        console.info('Contact message submitted (mock/fallback mode):', {
          name,
          email,
          message,
        })
      }

      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
      setTimeout(() => setStatus('idle'), 6000)
    } catch (err: unknown) {
      console.error('Contact form submission error:', err)
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Unable to send message right now. Please try again or email directly.'
      )
    }
  }

  return (
    <section id="contact" className="px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] tracking-[0.28em] text-mute uppercase">09 — Contact</p>
          <h2 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] italic md:text-8xl">
            Have an idea?
            <br />
            Let’s build something.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Direct Links & Info */}
          <div className="space-y-8 lg:col-span-5">
            <Magnetic>
              <a
                href={mailto}
                className="group inline-flex items-center gap-3 font-display text-4xl italic text-paper transition-colors hover:text-accent md:text-5xl"
              >
                Let’s talk
                <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </Magnetic>

            <p className="text-sm leading-relaxed text-mute">
              Whether you are looking for a student developer for an internship, collaborating
              on an engineering project, or discussing full-stack systems — feel free to drop a line.
            </p>

            <div className="space-y-3 text-sm">
              {profile.email ? (
                <p>
                  <a href={`mailto:${profile.email}`} className="hover:text-accent">
                    {profile.email}
                  </a>
                </p>
              ) : null}
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
                  className="inline-flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase text-mute transition-colors hover:text-paper"
                >
                  {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy email'}
                </button>
              ) : null}
            </div>
          </div>

          {/* Right Column: Database-backed Contact Form */}
          <div className="rounded-[1.6rem] border border-line bg-white/[0.02] p-8 md:p-10 lg:col-span-7">
            <h3 className="font-display text-2xl italic text-paper md:text-3xl">
              Send a direct message
            </h3>
            <p className="mt-2 text-xs tracking-wider text-mute uppercase">
              Stored directly in Postgres via Supabase
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[11px] tracking-[0.2em] text-mute uppercase">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    disabled={status === 'submitting'}
                    className="w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm text-paper placeholder-white/20 transition-colors focus:border-accent focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[11px] tracking-[0.2em] text-mute uppercase">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    disabled={status === 'submitting'}
                    className="w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm text-paper placeholder-white/20 transition-colors focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-[11px] tracking-[0.2em] text-mute uppercase">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project, idea, or opportunity..."
                  disabled={status === 'submitting'}
                  className="w-full resize-none rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm text-paper placeholder-white/20 transition-colors focus:border-accent focus:outline-none"
                />
              </div>

              {status === 'success' ? (
                <div className="flex items-center gap-3 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm text-paper">
                  <Check size={18} className="text-accent" />
                  <span>Message sent successfully! Thank you for reaching out.</span>
                </div>
              ) : null}

              {status === 'error' ? (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
                  {errorMessage}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-line bg-paper px-8 py-3.5 text-[12px] font-medium tracking-[0.2em] text-ink uppercase transition-all hover:border-accent hover:bg-accent disabled:opacity-50 sm:w-auto"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
