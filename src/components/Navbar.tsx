import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navItems, profile } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { Magnetic } from './Magnetic'

export function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(['home', 'about', 'projects', 'skills', 'contact'])
  const onHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu when clicking navigation items


  return (
    <header className="fixed top-0 right-0 left-0 z-[60] px-4 pt-4 md:px-6">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 backdrop-blur-xl transition-all duration-500 md:px-5 ${
          scrolled || !onHome
            ? 'border-line/80 bg-black/70 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'border-white/[0.06] bg-black/20'
        }`}
        aria-label="Primary"
      >
        <Magnetic>
          <Link
            to="/"
            className="font-display text-lg tracking-tight text-paper italic transition-colors hover:text-accent"
          >
            {profile.name}
          </Link>
        </Magnetic>

        <ul className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const current = onHome && active === item.id
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`relative rounded-full px-3.5 py-1.5 text-[11px] font-medium tracking-[0.22em] uppercase transition-all duration-300 ${
                    current ? 'text-paper' : 'text-mute hover:text-paper hover:bg-white/[0.03]'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {current ? (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full border border-white/[0.08] bg-white/[0.06] shadow-[0_0_15px_rgba(228,199,160,0.12)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                  {current ? (
                    <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_6px_#e4c7a0]" />
                  ) : null}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <span className="flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[10px] font-mono tracking-[0.18em] text-mute uppercase backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available
          </span>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-paper transition-colors hover:bg-white/[0.05] md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-ink/95 px-8 pt-24 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line/60 py-5 font-display text-4xl italic text-paper transition-colors hover:text-accent"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * index, duration: 0.4 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
