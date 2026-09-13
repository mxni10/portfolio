# Developer Portfolio — Deployment & Management Guide

A comprehensive guide for managing the database, environment variables, GitHub repository, and Vercel production deployment for **Mxni's Developer Portfolio**.

---

## 1. Project Overview & Tech Stack

* **Repository:** [https://github.com/mxni10/portfolio.git](https://github.com/mxni10/portfolio.git)
* **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide React
* **Backend / Database:** Supabase (PostgreSQL with Row Level Security)
* **Hosting Target:** Vercel (Edge Network with SPA Client-Side Routing via `vercel.json`)

---

## 2. Supabase Configuration & Keys

Your Supabase project is set up at:
* **Project URL:** `https://krzugxpqhijmrqpaovhh.supabase.co`
* **Publishable / Anon Key:** `sb_publishable_HDGsNy03zjpuUhpO4Kul1Q_Ntqc9GYC`

> [!CAUTION]
> **Security Notice regarding the Secret Key:**
> Your `secret key` (`sb_secret_...`) has full root permissions that bypass all Row Level Security. **Never** include it in client-side code, `.env` files prefixed with `VITE_`, or GitHub. Only the `publishable key` belongs in the frontend.

### Database Migration & Schema
The full PostgreSQL migration script is located in [`supabase/schema.sql`](./supabase/schema.sql).

To run or reset your schema:
1. Open your [Supabase Project Dashboard](https://supabase.com/dashboard/project/krzugxpqhijmrqpaovhh).
2. Go to **SQL Editor** → **New Query**.
3. Copy all code from [`supabase/schema.sql`](./supabase/schema.sql) and click **Run**.

This establishes 5 tables with Row Level Security (RLS):
* `projects` — Dynamic project case studies with 9-part editorial breakdowns (Public Read).
* `certifications` — Certificates and credentials (Public Read).
* `achievements` — Milestones and awards (Public Read).
* `currently_learning` — Live cycling topics in the learning ticker (Public Read).
* `contact_messages` — Inquiries from the website contact form (**Insert-only** for public/anon; only the database owner can view submissions).

---

## 3. Managing Content in the Supabase Table Editor

You do not need to edit code to update your portfolio. You can manage everything through your browser:

1. Open your [Supabase Dashboard](https://supabase.com/dashboard/project/krzugxpqhijmrqpaovhh) → **Table Editor**.
2. Select any table:
   * **`projects`**: Add new projects. Fill out `name`, `slug`, `short_description`, `technology` (e.g. `{"React", "Node.js"}`), `github_url`, etc. Use `display_order` (1, 2, 3...) to control the sequence on your portfolio.
   * **`certifications`**: Add your certificates, platforms, completion years, and certificate URLs.
   * **`achievements`**: Add milestones, hackathon awards, or academic recognitions.
   * **`currently_learning`**: Add or remove topics that cycle on the homepage.
   * **`contact_messages`**: Click here to view all messages sent by visitors through your contact form.

---

## 4. Local Development

### 1. Local Environment Variables
Create a file named `.env.local` in the root folder (already added to `.gitignore`):
```env
VITE_SUPABASE_URL=https://krzugxpqhijmrqpaovhh.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_HDGsNy03zjpuUhpO4Kul1Q_Ntqc9GYC
```

### 2. Run Locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run production build check
npm run build

# Run linter
npm run lint
```

---

## 5. Deploying to Vercel

### Step 1: Push Local Code to GitHub
```bash
git add .
git commit -m "feat: portfolio update"
git push origin main
```

### Step 2: Configure Vercel Project
1. Open [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** → **Project**.
3. Import `mxni10/portfolio`.
4. Framework Preset: **Vite** (auto-detected).
5. Open **Environment Variables** and add:
   * `VITE_SUPABASE_URL` = `https://krzugxpqhijmrqpaovhh.supabase.co`
   * `VITE_SUPABASE_ANON_KEY` = `sb_publishable_HDGsNy03zjpuUhpO4Kul1Q_Ntqc9GYC`
6. Click **Deploy**.

---

## 6. Vercel Troubleshooting & URL Verification

### Resolving `404: NOT_FOUND (DEPLOYMENT_NOT_FOUND)`
If visiting a Vercel link results in `DEPLOYMENT_NOT_FOUND`:
1. **Renamed Projects:** If you renamed your project in Vercel settings, old URLs (such as `portfolio-flame-eight-...vercel.app`) stop working immediately. Use the new active domain.
2. **Finding the Permanent Production Domain:**
   * Go to **Vercel Dashboard** → your project.
   * Click **Settings** → **Domains**.
   * Your permanent production URL will be listed there (e.g. `https://your-project.vercel.app`).
   * Alternatively, go to the **Deployments** tab and click the one with the blue **Production** badge.
3. **Redeploying with Environment Variables:**
   * If you added environment variables after creating the deployment, trigger a redeploy:
     * Go to **Deployments** → click the `...` menu on the latest deployment → **Redeploy**.

---

## 7. Zero-Downtime Fallback Architecture

The site includes built-in resilience:
* If Supabase is unreachable or credentials are temporarily missing, the frontend automatically falls back to local data defined in `src/data/content.ts`.
* Data sections show subtle dark-mode skeleton loaders (`animate-pulse`) while fetching, eliminating layout shifts.
* Contact messages fail gracefully with direct email fallbacks if the database connection drops.
