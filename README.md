# Mxni — Developer Portfolio

Premium, dark, editorial portfolio for a 3rd-year BTech student developer.

## Stack

React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide, React Router.

No database. Certificates, projects, and profile text live in `src/data/content.ts`. That is the correct architecture for a static portfolio on Netlify.

## Develop

```bash
npm install
npm run dev
```

## Edit your details

Open `src/data/content.ts` and fill:

- `profile.name`, `email`, `linkedin`, `resumeUrl`
- `education.college`, `branch`, `expectedGrad`, `cgpa`
- `projects` (GitHub / live URLs)
- `certifications`

Empty fields are hidden instead of faked.

## Deploy (Netlify)

1. Push this repo to GitHub.
2. In [Netlify](https://netlify.com): Add new site → Import from Git → `mxni10/portfolio`.
3. Build command: `npm run build`
4. Publish directory: `dist`

`netlify.toml` already sets this. SPA routes (`/work/:slug`) are redirected to `index.html`.

GitHub Pages is also free, but Netlify handles client-side routing more cleanly for this app.
