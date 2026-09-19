// =============================================================================
// PHOTOGRAPHY DATA FILE
// =============================================================================
//
// ORIENTATION — HOW TO ADD YOUR PHOTOS
// ─────────────────────────────────────────────────────────────────────────────
// The layout is fully DYNAMIC — you do NOT need to match a specific photo
// orientation to a specific slot. Both landscape (horizontal) and portrait
// (vertical) photos work in any position; the layout adapts to each image's
// natural dimensions without cropping.
//
// HERO GRID (featured: true)
//   Mark up to 5 photos as featured: true. They appear in the scattered
//   asymmetric grid at the top of the page. Pick your most visually striking.
//
// ARCHIVE ACCORDION
//   All photos appear here, grouped by category. Uses CSS column/masonry
//   layout — no cropping, no forced boxes.
//
// EXPORT RECOMMENDATIONS
//   Horizontal (landscape) → 3:2 or 16:9, min 1600px long edge
//   Vertical (portrait)    → 2:3 or 4:5, min 1600px long edge
//   Quality: JPEG 80–85%.
//
// FEATURE BANNER (full-width section with quote overlay)
//   Use a HORIZONTAL / LANDSCAPE photo. Ideal: 16:9 or wider.
//   → Update `featureBannerSrc` below.
//
// VIDEO BACKGROUND (behind the quote / statement section)
//   ⚠️  COMPRESS BEFORE USE. The video must be under ~8 MB for web.
//   Use HandBrake: H.264 codec, 720p, CRF 28, MP4 container.
//   Then replace `videoSrc` below with '/photography/your-compressed-video.mp4'.
//   Until a compressed version is available, the poster image is shown instead.
//   → Update `videoSrc` and `videoPosterSrc` below.
//
// FILE PATHS
//   Drop your images in /public/photography/ and reference them as:
//   src: '/photography/your-filename.jpg'
//
// =============================================================================

export interface Photo {
  id: string
  src: string
  alt: string
  location?: string
  year: string
  category: string
  featured?: boolean // true = appears in hero asymmetric grid (pick ≤5)
}

export interface PhotoCategory {
  id: string
  label: string
  description: string
}

// ─── Video / banner sources ───────────────────────────────────────────────────

// Video for the statement section background.
// Set to '/photography/your-video.mp4' when you add a compressed video file to public/photography/
export const videoSrc = ''

// Poster image — shown while video loads, and as fallback when video is disabled.
// Using the lake-sunrise shot — strong horizontal composition, ideal for a banner.
export const videoPosterSrc = '/photography/IMG_20250210_055251.jpg.jpeg'

// Feature banner (full-width B&W section below the statement)
export const featureBannerSrc = '/photography/IMG_20250210_055251.jpg.jpeg'

// ─── Categories ──────────────────────────────────────────────────────────────
export const photoCategories: PhotoCategory[] = [
  {
    id: 'nature',
    label: 'Nature & Sky',
    description:
      'Sunsets, clouds, trees, and the slow drama of light changing — mostly shot on a phone, mostly unplanned.',
  },
  {
    id: 'urban',
    label: 'Urban & Street',
    description:
      'Architecture, geometry, and the rhythm of city life — found in shadows, surfaces, and unposed moments.',
  },
  {
    id: 'portrait',
    label: 'Portrait',
    description:
      'People at ease. The small gap between performance and presence.',
  },
  {
    id: 'abstract',
    label: 'Abstract & Texture',
    description:
      'Form before content — the visual grammar underneath familiar surfaces.',
  },
]

// ─── Photos ──────────────────────────────────────────────────────────────────
export const photos: Photo[] = [

  // ── Nature & Sky ────────────────────────────────────────────────────────────

  // FEATURED — Lake city sunrise reflection: strongest composition, perfect symmetry.
  // Wide landscape — ideal for the hero grid's wide slots.
  {
    id: 'n1',
    src: '/photography/IMG_20250210_055251.jpg.jpeg',
    alt: 'Sunrise reflected perfectly on a still city lake',
    location: 'India',
    year: '2025',
    category: 'nature',
    featured: true,
  },

  // FEATURED — Dramatic blue-gold storm clouds with treeline silhouette.
  // Tall portrait — moved to archive, was too long in middle hero slot.
  {
    id: 'n2',
    src: '/photography/IMG-20250712-WA0082.jpg.jpeg',
    alt: 'Storm clouds splitting into blue and gold over a treeline',
    year: '2025',
    category: 'nature',
    featured: false,
  },

  // Sunset over water with building silhouettes — warm orange tones.
  {
    id: 'n3',
    src: '/photography/IMG-20250712-WA0020.jpg.jpeg',
    alt: 'Sunset reflected in rippling water, buildings silhouetted',
    year: '2025',
    category: 'nature',
  },

  // Pine tree silhouette against a fading dusk sky — tall portrait.
  {
    id: 'n4',
    src: '/photography/IMG-20250712-WA0022.jpg.jpeg',
    alt: 'Conifer silhouette against a dusk sky with cloud streaks',
    year: '2025',
    category: 'nature',
  },

  // Dramatic sunset cloud formation — portrait, dark purples and warm amber.
  {
    id: 'n5',
    src: '/photography/IMG-20250712-WA0023.jpg.jpeg',
    alt: 'Brooding sunset clouds — purples and amber over a treeline',
    year: '2025',
    category: 'nature',
  },

  // Crescent moon framed by tree canopy — deep blue night sky.
  {
    id: 'n6',
    src: '/photography/IMG-20250712-WA0078.jpg.jpeg',
    alt: 'Crescent moon framed by tropical tree canopy at dusk',
    year: '2025',
    category: 'nature',
  },

  // FEATURED — Birds in flight through wispy clouds — landscape/square, high contrast.
  // Wide orientation suits the colSpan-2 middle hero slot perfectly.
  {
    id: 'n7',
    src: '/photography/IMG_3056.JPG.jpeg',
    alt: 'Two birds in flight through dramatic white cloud formations',
    year: '2025',
    category: 'nature',
    featured: true,
  },

  // ── Abstract & Texture ───────────────────────────────────────────────────────

  // Yellow flower macro — vivid detail, clean subject, great colour pop.
  {
    id: 'a1',
    src: '/photography/IMG_0758.JPG.jpeg',
    alt: 'Yellow daisy macro against dark leaves',
    year: '2025',
    category: 'abstract',
    featured: true,
  },

  // ── Placeholders for "photography bottom" folder ──────────────────────────
  // Once you drop images into public/photography/ from the "photography bottom"
  // folder, add entries here following the same pattern.
  // Urban & Street examples:
  // { id: 'u1', src: '/photography/your-urban-photo.jpg', alt: '...', year: '2025', category: 'urban' },
  //
  // Portrait examples:
  // { id: 'p1', src: '/photography/your-portrait-photo.jpg', alt: '...', year: '2025', category: 'portrait' },
]
