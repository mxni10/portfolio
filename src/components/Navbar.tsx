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
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 backdrop-blur-md transition-all duration-500 md:px-5 ${
          scrolled || !onHome
            ? 'border-line bg-ink/80'
            : 'border-transparent bg-transparent'
        }`}
        aria-label="Primary"
      >
        <Magnetic>
          <Link
            to="/"
            className="font-display text-lg tracking-tight text-paper italic"
          >
            {profile.name}
          </Link>
        </Magnetic>

        <ul className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const current = onHome && active === item.id
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`relative text-[12px] tracking-[0.2em] uppercase transition-colors ${
                    current ? 'text-paper' : 'text-mute hover:text-paper'
                  }`}
                >
                  {item.label}
                  {current ? (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                    />
                  ) : null}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <span className="flex items-center gap-2 text-[11px] tracking-[0.16em] text-mute uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available
          </span>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-paper md:hidden"
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
            className="fixed inset-0 z-50 flex flex-col bg-ink px-8 pt-24 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-5 font-display text-4xl italic"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 * index }}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
