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
//   asymmetric grid at the top of the page. The grid gives each one a
//   different column width, but the HEIGHT is determined by YOUR photo's
//   own aspect ratio — tall photos render tall, wide photos render wide.
//   Mixing orientations here creates the "scattered editorial" effect.
//   Pick your most visually striking shots for this grid.
//
// ARCHIVE ACCORDION
//   All photos appear here, grouped by category. The accordion uses a
//   CSS column (masonry) layout so images naturally stack at their true
//   proportions — no cropping, no forced boxes.
//
// EXPORT RECOMMENDATIONS
//   Horizontal (landscape) photos → export at 3:2 or 16:9 aspect ratio,
//     minimum 1600px on the long edge, e.g. 2400×1600 or 3200×1800.
//   Vertical (portrait) photos   → export at 2:3 or 4:5 aspect ratio,
//     minimum 1600px on the long edge, e.g. 1067×1600 or 1280×1600.
//   Quality: save at 80–85% JPEG. Lightroom "Export for Web" preset works.
//
// FEATURE BANNER (the full-width B&W photo with quote overlay)
//   This is a fixed-height banner (~65vh). Use a HORIZONTAL / LANDSCAPE photo
//   here. Ideal aspect ratio: 16:9 or wider (3:1 panoramic works well too).
//   The photo is displayed with background-size: cover and desaturated to B&W,
//   so subject matter matters more than color — strong compositions, leading
//   lines, or wide environmental shots work best.
//   → Update the `featureBannerSrc` export below with your image path.
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

// ─── Feature banner ───────────────────────────────────────────────────────────
// Replace with your own wide/landscape image. See orientation notes above.
export const featureBannerSrc =
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1600&q=70'

// ─── Categories ──────────────────────────────────────────────────────────────
export const photoCategories: PhotoCategory[] = [
  {
    id: 'urban',
    label: 'Urban & Street',
    description:
      'Architecture, geometry, and the rhythm of city life — found in shadows, surfaces, and unposed moments.',
  },
  {
    id: 'nature',
    label: 'Nature & Landscape',
    description:
      'Light behaving honestly — golden hours, overcast skies, and the patience of wide-open spaces.',
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
// Unsplash placeholders — replace src with '/photography/your-file.jpg'
// Mix of landscape and portrait intentionally to verify dynamic layout.
export const photos: Photo[] = [
  // Urban — mix of landscape and portrait
  {
    id: 'u1',
    src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    alt: 'Reflections on glass tower facades',
    location: 'Kuala Lumpur',
    year: '2024',
    category: 'urban',
    featured: true, // portrait orientation
  },
  {
    id: 'u2',
    src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80',
    alt: 'City skyline at dusk',
    location: 'Penang',
    year: '2024',
    category: 'urban',
    featured: true, // landscape orientation
  },
  {
    id: 'u3',
    src: 'https://images.unsplash.com/photo-1530305408560-82d13781b33a?w=700&q=80',
    alt: 'Concrete staircase spiral',
    location: 'Kuala Lumpur',
    year: '2023',
    category: 'urban',
  },
  {
    id: 'u4',
    src: 'https://images.unsplash.com/photo-1514565131-fce0801e6f04?w=800&q=80',
    alt: 'Alley shadows and shopfronts',
    location: 'George Town',
    year: '2023',
    category: 'urban',
    featured: true, // portrait orientation
  },
  // Nature — mix of landscape and portrait
  {
    id: 'n1',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
    alt: 'Mountain ridge at golden hour',
    location: 'Cameron Highlands',
    year: '2024',
    category: 'nature',
    featured: true, // landscape orientation
  },
  {
    id: 'n2',
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    alt: 'Forest path in morning light',
    location: 'Pahang',
    year: '2023',
    category: 'nature',
  },
  {
    id: 'n3',
    src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
    alt: 'Sunrise over water',
    location: 'Terengganu',
    year: '2024',
    category: 'nature',
  },
  {
    id: 'n4',
    src: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=700&q=80',
    alt: 'Rain on leaves close-up',
    location: 'Kuala Lumpur',
    year: '2023',
    category: 'nature',
    featured: true, // square-ish
  },
  // Portrait
  {
    id: 'p1',
    src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80',
    alt: 'Environmental portrait, window light',
    location: 'Kuala Lumpur',
    year: '2024',
    category: 'portrait',
  },
  {
    id: 'p2',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80',
    alt: 'Candid street portrait',
    location: 'Ipoh',
    year: '2023',
    category: 'portrait',
  },
  {
    id: 'p3',
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=700&q=80',
    alt: 'Backlit silhouette portrait',
    location: 'Kuala Lumpur',
    year: '2024',
    category: 'portrait',
  },
  // Abstract
  {
    id: 'a1',
    src: 'https://images.unsplash.com/photo-1551376347-075b0121a65b?w=800&q=80',
    alt: 'Concrete texture and shadow geometry',
    location: 'KL',
    year: '2024',
    category: 'abstract',
  },
  {
    id: 'a2',
    src: 'https://images.unsplash.com/photo-1519638831568-d9897f54ed69?w=900&q=80',
    alt: 'Color field — peeling wall layers',
    location: 'George Town',
    year: '2023',
    category: 'abstract',
  },
  {
    id: 'a3',
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
    alt: 'Water surface refraction',
    location: 'Kuala Lumpur',
    year: '2024',
    category: 'abstract',
  },
]
