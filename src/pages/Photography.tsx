import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, MapPin } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  type Photo,
  type PhotoCategory,
  featureBannerSrc,
  photoCategories,
  photos,
  videoSrc,
  videoPosterSrc,
} from '../data/photography'
import { profile } from '../data/content'

// ─── helpers ────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true)
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ─── Hero photo card ─────────────────────────────────────────────────────────
// No forced aspect ratio — the image renders at its natural dimensions.
// The grid column/span controls horizontal placement; height is intrinsic.

interface HeroPhotoProps {
  photo: Photo
  colSpan: number
  index: number
}

function HeroPhoto({ photo, colSpan, index }: HeroPhotoProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-sm"
      style={{
        gridColumn: `span ${colSpan}`,
        aspectRatio: '16 / 10',
      }}
    >
      {/* shimmer skeleton while loading */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-[#1c2420]" />
      )}
      {/* object-cover fills the fixed aspect-ratio container uniformly */}
      <img
        src={photo.src}
        alt={photo.alt}
        loading="eager"
        onLoad={() => setLoaded(true)}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        style={{ opacity: loaded ? 1 : 0 }}
      />
      {/* hover caption overlay — slides up from bottom */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="rounded-sm px-3 py-2 backdrop-blur-md" style={{ background: 'rgba(15,20,16,0.75)' }}>
          <p className="font-serif text-[11px] italic text-phot-cream/90 leading-snug">{photo.alt}</p>
          {photo.location && (
            <p className="mt-0.5 flex items-center gap-1 font-mono text-[9px] tracking-[0.18em] text-phot-sage uppercase">
              <MapPin size={9} />
              {photo.location} · {photo.year}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// 3 equal columns, uniform height via aspect-ratio: 16/10 on each card.
const HERO_LAYOUT = [
  { colSpan: 1 }, // left
  { colSpan: 1 }, // middle
  { colSpan: 1 }, // right
  { colSpan: 1 }, // 4th (if used)
  { colSpan: 1 }, // 5th (if used)
]

// ─── Accordion masonry gallery ───────────────────────────────────────────────
// Uses CSS `columns` (masonry-style) so images sit at their NATURAL dimensions.
// No fixed container ratio, no object-cover cropping.

interface MasonryPhotoProps {
  photo: Photo
  index: number
}

function MasonryPhoto({ photo, index }: MasonryPhotoProps) {
  return (
    <motion.div
      key={photo.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative mb-3 break-inside-avoid overflow-hidden rounded-sm"
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="block w-full h-auto transition-transform duration-500 group-hover:scale-[1.025]"
      />
      {/* hover overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-phot-ink/75 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-3">
        <p className="font-serif text-[11px] italic text-phot-cream/90 leading-snug">{photo.alt}</p>
        {photo.location && (
          <p className="mt-0.5 flex items-center gap-1 font-mono text-[9px] tracking-[0.16em] text-phot-sage uppercase">
            <MapPin size={8} /> {photo.location}
          </p>
        )}
      </div>
    </motion.div>
  )
}

interface AccordionCatProps {
  cat: PhotoCategory
  photoList: Photo[]
  defaultOpen?: boolean
}

function AccordionCategory({ cat, photoList, defaultOpen = false }: AccordionCatProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-phot-line">
      <button
        type="button"
        id={`cat-${cat.id}`}
        aria-expanded={open}
        aria-controls={`cat-panel-${cat.id}`}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-phot-cream"
      >
        <div>
          <h3 className="font-serif text-2xl italic text-phot-cream md:text-3xl">{cat.label}</h3>
          <p className="mt-1 max-w-lg font-sans text-sm leading-relaxed text-phot-sage/70">
            {cat.description}
          </p>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35 }}
          className="ml-6 shrink-0 text-phot-sage"
        >
          <ChevronDown size={22} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`cat-panel-${cat.id}`}
            role="region"
            aria-labelledby={`cat-${cat.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {/*
              CSS columns (masonry) layout — images stack at their natural heights.
              Portrait photos naturally take more vertical space; landscape photos less.
              No cropping, no forced boxes. Gap is handled by mb-3 on each item.
            */}
            <div className="columns-2 gap-3 pb-8 sm:columns-3 md:columns-4">
              {photoList.map((photo, i) => (
                <MasonryPhoto key={photo.id} photo={photo} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Full-width feature banner ────────────────────────────────────────────────
// Use a LANDSCAPE / HORIZONTAL photo here. See photography.ts for guidance.
// bg-size: cover + fixed height = the photo will be center-cropped to fill.
// Ideal: 16:9 or wider (e.g. 3840×2160, 3840×1600, any wide panoramic).

function FullWidthBreak() {
  const { ref, inView } = useInView(0.2)
  return (
    <div ref={ref} className="relative my-24 h-[65vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${featureBannerSrc}')`,
          filter: 'grayscale(100%) brightness(0.45)',
          transform: inView ? 'scale(1)' : 'scale(1.06)',
          transition: 'transform 1.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl font-serif text-3xl italic leading-relaxed text-phot-cream md:text-4xl lg:text-5xl"
        >
          "Light is the only medium I haven't figured out yet."
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.55 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-5 font-mono text-[11px] tracking-[0.24em] text-phot-cream uppercase"
        >
          — ongoing
        </motion.p>
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function Photography() {
  const featuredPhotos = photos.filter((p) => p.featured).slice(0, 5)

  return (
    <div className="min-h-screen" style={{ background: 'var(--phot-bg)' }}>



      {/* ── Hero ── */}
      <section className="relative px-6 pb-16 pt-28 md:px-10 md:pt-32 lg:px-20">
        {/* Grain texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-4 font-mono text-[10px] tracking-[0.32em] text-phot-sage uppercase"
          >
            Visual work · {new Date().getFullYear()}
          </motion.div>

          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto]">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(3.5rem,10vw,9rem)] leading-[0.92] tracking-tight text-phot-cream"
            >
              Photo&shy;graphy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-xs self-end pb-3 font-sans text-sm leading-relaxed text-phot-sage"
            >
              A side practice. Not an identity, just a habit — something to do
              with the phone camera between commits.
            </motion.p>
          </div>

          {/* 3-column equal grid — all cards same 16:10 height via aspect-ratio */}
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
          >
            {featuredPhotos.map((photo, i) => {
              const layout = HERO_LAYOUT[i] ?? HERO_LAYOUT[0]
              return (
                <HeroPhoto
                  key={photo.id}
                  photo={photo}
                  colSpan={layout.colSpan}
                  index={i}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Statement — video background ── */}
      <div className="relative overflow-hidden" style={{ minHeight: '38vh' }}>
        {/*
          Video background — autoplay, muted, loop, playsInline.
          When videoSrc is empty or prefers-reduced-motion is active,
          only the poster image shows. The dark overlay ensures text
          stays readable regardless of video content.

          Mobile / slow connection strategy: the video uses `preload="none"`
          so it doesn't load until the browser decides to — browsers on
          data-saver mode will typically not autoplay anyway. The poster
          image loads as a normal img and is always visible first.
        */}
        {videoSrc ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={videoSrc}
            poster={videoPosterSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            style={{
              // Respect prefers-reduced-motion: CSS media query hides the video
              // and shows only the poster via the .motion-safe utility below
            }}
          />
        ) : (
          // No video yet — show poster image as static background
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${videoPosterSrc}')`,
              filter: 'brightness(0.55)',
            }}
          />
        )}

        {/* Dark semi-transparent overlay — ensures quote readability */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(15,20,16,0.55), rgba(15,20,16,0.72))' }}
        />

        {/* Quote text */}
        <div className="relative z-10 flex min-h-[38vh] flex-col items-center justify-center px-6 py-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl font-serif text-2xl italic leading-relaxed text-phot-cream md:text-3xl lg:text-4xl"
          >
            Shot on a phone. Edited in Lightroom. No pretension.
          </motion.p>
        </div>

        {/* Hide video for prefers-reduced-motion users via inline style tag */}
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            video { display: none !important; }
          }
        `}</style>
      </div>

      {/* ── Feature banner ── */}
      <FullWidthBreak />

      {/* ── Archive accordions ── */}
      <section className="mx-auto max-w-7xl px-6 pb-32 md:px-10 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2 className="font-serif text-4xl italic text-phot-cream md:text-5xl">Archive</h2>
          <p className="mt-3 font-mono text-[10px] tracking-[0.28em] text-phot-sage uppercase">
            Organised by subject
          </p>
        </motion.div>

        {photoCategories.map((cat, i) => {
          const catPhotos = photos.filter((p) => p.category === cat.id)
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <AccordionCategory
                cat={cat}
                photoList={catPhotos}
                defaultOpen={i === 0}
              />
            </motion.div>
          )
        })}
      </section>

      {/* ── Footer ── */}
      <div className="border-t border-phot-line py-10 text-center">
        <p className="font-mono text-[10px] tracking-[0.22em] text-phot-sage/50 uppercase">
          All images © {new Date().getFullYear()} {profile.name}
        </p>
        <Link
          to="/"
          className="mt-3 inline-block font-serif text-sm italic text-phot-cream/50 underline underline-offset-4 transition-colors hover:text-phot-cream/80"
        >
          Back to developer work →
        </Link>
      </div>
    </div>
  )
}
