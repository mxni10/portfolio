import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, MapPin, X } from 'lucide-react'
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

interface HeroPhotoProps {
  photo: Photo
  colSpan: number
  index: number
  onSelect?: (photo: Photo) => void
}

function HeroPhoto({ photo, colSpan, index, onSelect }: HeroPhotoProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect?.(photo)}
      className="group relative cursor-pointer overflow-hidden rounded-sm"
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
      {/* hover caption overlay — always visible on mobile, hover-only on desktop */}
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-0 opacity-100 md:translate-y-2 md:opacity-0 md:transition-all md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100">
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

// ─── Accordion uniform gallery ───────────────────────────────────────────────
// Uses a balanced responsive CSS grid (4 columns on desktop, 2 on tablet, 1 on mobile).
// Cards maintain an elegant 4:5 ratio so all rows and columns align neatly with no empty voids.

interface GalleryPhotoProps {
  photo: Photo
  index: number
  onSelect?: (photo: Photo) => void
}

function GalleryPhotoCard({ photo, index, onSelect }: GalleryPhotoProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      key={photo.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect?.(photo)}
      className="group relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-sm bg-[#161c18]"
    >
      {/* shimmer skeleton while loading */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-[#1c2420]" />
      )}
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        style={{ opacity: loaded ? 1 : 0 }}
      />
      {/* hover overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-phot-ink/85 via-phot-ink/20 to-transparent p-3.5 opacity-100 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100">
        <p className="font-serif text-[12px] italic text-phot-cream/95 leading-snug drop-shadow-sm">
          {photo.alt}
        </p>
        {photo.location && (
          <p className="mt-1 flex items-center gap-1 font-mono text-[9px] tracking-[0.16em] text-phot-sage uppercase">
            <MapPin size={8} /> {photo.location} · {photo.year}
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
  onSelectPhoto?: (photo: Photo) => void
}

function AccordionCategory({ cat, photoList, defaultOpen = false, onSelectPhoto }: AccordionCatProps) {
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
            id={`cat-${cat.id}`}
            role="region"
            aria-labelledby={`cat-${cat.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {/* Balanced responsive grid: aligns rows and columns symmetrically without empty gaps */}
            <div className="grid grid-cols-1 gap-3 pb-8 sm:grid-cols-2 lg:grid-cols-4">
              {photoList.map((photo, i) => (
                <GalleryPhotoCard
                  key={photo.id}
                  photo={photo}
                  index={i}
                  onSelect={onSelectPhoto}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Merged Cinematic Video Statement & Feature Banner ───────────────────────

function MergedVideoSection() {
  const { ref, inView } = useInView(0.15)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.defaultMuted = true
    video.setAttribute('muted', '')
    video.play().catch(() => { })
  }, [])

  return (
    <div
      ref={ref}
      className="relative my-16 flex min-h-[65vh] w-full items-center justify-center overflow-hidden md:my-24 md:min-h-[72vh]"
    >
      {/* Background Video */}
      {videoSrc ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={featureBannerSrc || videoPosterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          onCanPlay={(e) => {
            e.currentTarget.play().catch(() => { })
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${featureBannerSrc || videoPosterSrc}')`,
            transform: inView ? 'scale(1)' : 'scale(1.04)',
            transition: 'transform 1.4s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      )}

      {/* Subtle translucent overlay — ensures clear video visibility while preserving typography legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(15,20,16,0.22), rgba(15,20,16,0.38))',
        }}
      />

      {/* Merged Text Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-20 text-center md:py-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl font-serif text-xl italic leading-relaxed text-phot-cream/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] md:text-2xl lg:text-3xl"
        >

        </motion.p>

        <div className="my-6 h-px w-16 bg-phot-cream/30" />

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl font-serif text-3xl italic leading-relaxed text-phot-cream drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)] md:text-4xl lg:text-5xl"
        >
          "Light is the only medium I haven't figured out yet."
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.85 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 font-mono text-[11px] tracking-[0.24em] text-phot-cream uppercase drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]"
        >
          — ongoing
        </motion.p>
      </div>

      {/* Reduced motion fallback */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          video { display: none !important; }
        }
      `}</style>
    </div>
  )
}


// ─── Page ────────────────────────────────────────────────────────────────────

export function Photography() {
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null)
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
              className="font-serif text-[clamp(2.5rem,10vw,9rem)] leading-[0.92] tracking-tight text-phot-cream"
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

          {/* Responsive grid: 1 col mobile, 2 col sm, 3 col md */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {featuredPhotos.map((photo, i) => (
              <HeroPhoto
                key={photo.id}
                photo={photo}
                colSpan={1}
                index={i}
                onSelect={setLightboxPhoto}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Merged Cinematic Video Statement & Feature Banner ── */}
      <MergedVideoSection />

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
                onSelectPhoto={setLightboxPhoto}
              />
            </motion.div>
          )
        })}
      </section>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              aria-label="Close image preview"
              className="absolute right-5 top-5 rounded-full bg-white/10 p-2.5 text-phot-cream transition hover:bg-white/20"
            >
              <X size={22} />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-5xl text-center"
            >
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.alt}
                className="max-h-[78vh] w-auto max-w-full rounded-sm object-contain shadow-2xl mx-auto"
              />
              <div className="mt-3">
                <p className="font-serif text-base italic text-phot-cream">
                  {lightboxPhoto.alt}
                </p>
                {lightboxPhoto.location && (
                  <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-phot-sage uppercase">
                    {lightboxPhoto.location} · {lightboxPhoto.year}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
