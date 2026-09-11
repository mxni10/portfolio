# Mxni — Developer Portfolio

A dark, editorial developer portfolio built with React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, and backed by a **Supabase (PostgreSQL)** database. Configured for zero-config deployment on **Vercel**.

---

## 🚀 Architecture Highlights

* **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4
* **Animations:** Framer Motion (GPU-accelerated reveals, cycling ticker, magnetic CTAs, custom interactive cursor)
* **Backend / Database:** Supabase (PostgreSQL)
* **Hosting:** Vercel (with client-side SPA route rewrites in `vercel.json`)
* **Zero-Downtime Fallback:** If Supabase credentials are missing or offline, the site gracefully falls back to local data with skeleton loaders — zero broken screens or blank states.

---

## 🗄️ Database Setup (Supabase)

You don't need a custom admin dashboard — manage all your portfolio content directly via the official **Supabase Table Editor** in your web browser.

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free account.
2. Click **"New Project"**, give it a name (e.g. `portfolio`), choose a region close to you, and set a database password.

### 2. Run the SQL Migration Script
1. In your Supabase dashboard, click **SQL Editor** on the left navigation bar.
2. Click **New Query**, copy the entire contents of [`supabase/schema.sql`](./supabase/schema.sql), and click **Run**.
3. This creates all 5 tables with Row Level Security (RLS) enabled:
   * `projects` — dynamic projects with 9-part case studies and tags (public read)
   * `certifications` — verified certificates and credentials (public read)
   * `achievements` — milestone awards and recognitions (public read)
   * `currently_learning` — live topics cycling in your ticker (public read)
   * `contact_messages` — messages sent from your contact form (insert-only for privacy)

### 3. Manage Your Content in the Table Editor
In your Supabase dashboard, click **Table Editor** to:
* **Add / Edit Projects:** Add new projects with custom tags, GitHub/Live links, and case study details. Use `display_order` (1, 2, 3...) to control the order on your site.
* **Add Certifications & Achievements:** Fill your certifications and milestones.
* **View Contact Messages:** Click on `contact_messages` to see all messages submitted by visitors through your contact form!

---

## 💻 Local Development

### 1. Clone & Install
```bash
git clone https://github.com/mxni10/portfolio.git
cd portfolio
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
In your Supabase Dashboard, go to **Project Settings** → **API** and copy:
* **Project URL** → `VITE_SUPABASE_URL`
* **anon public API key** → `VITE_SUPABASE_ANON_KEY`

Paste them into `.env.local`:
```env
VITE_SUPABASE_URL=https://xyzcompany.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
*(Note: `.env.local` is already in `.gitignore` and will never be committed to GitHub).*

### 3. Start Dev Server
```bash
npm run dev
```

---

## 🌐 Deploy to Vercel

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "feat: integrate Supabase database and Vercel deployment"
   git push -u origin main
   ```
2. **Import to Vercel:**
   * Go to [vercel.com](https://vercel.com) and log in with your GitHub account (`mxni10`).
   * Click **"Add New..."** → **"Project"**.
   * Choose your repository: `mxni10/portfolio`.
   * Vercel will automatically detect **Vite** framework.
3. **Add Environment Variables:**
   * In the Vercel project configuration page (under *Environment Variables*), add:
     * `VITE_SUPABASE_URL` = your Supabase Project URL
     * `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
4. **Deploy:**
   * Click **"Deploy"**.
   * Vercel will build and deploy your portfolio to a high-speed global edge network with free HTTPS.
   * Every future commit pushed to `main` will automatically trigger a new deployment.
