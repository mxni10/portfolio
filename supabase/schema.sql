-- ==============================================================================
-- Supabase Schema for Personal Developer Portfolio (mxni10)
-- PostgreSQL Migration Script
-- ==============================================================================
-- Run this script in your Supabase Dashboard:
-- SQL Editor -> New Query -> Paste & Run
-- ==============================================================================

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT DEFAULT '',
  short_description TEXT NOT NULL,
  year TEXT DEFAULT '2025',
  role TEXT DEFAULT 'Full-stack student project',
  accent TEXT DEFAULT '#e4c7a0',
  technology TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  problem TEXT DEFAULT '',
  approach TEXT DEFAULT '',
  development TEXT DEFAULT '',
  challenges TEXT DEFAULT '',
  solution TEXT DEFAULT '',
  result TEXT DEFAULT '',
  future_improvements TEXT DEFAULT '',
  github_url TEXT DEFAULT '',
  live_url TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Certifications Table
CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  platform TEXT NOT NULL,
  year TEXT NOT NULL,
  certificate_url TEXT DEFAULT '',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Achievements Table
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Currently Learning Table
CREATE TABLE IF NOT EXISTS public.currently_learning (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Contact Messages Table (Populated via contact form)
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- Row Level Security (RLS) Configuration
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.currently_learning ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public Read Policies (Allow anyone to view published portfolio content)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Allow public read on projects') THEN
    CREATE POLICY "Allow public read on projects" ON public.projects FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'certifications' AND policyname = 'Allow public read on certifications') THEN
    CREATE POLICY "Allow public read on certifications" ON public.certifications FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'achievements' AND policyname = 'Allow public read on achievements') THEN
    CREATE POLICY "Allow public read on achievements" ON public.achievements FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'currently_learning' AND policyname = 'Allow public read on currently_learning') THEN
    CREATE POLICY "Allow public read on currently_learning" ON public.currently_learning FOR SELECT USING (true);
  END IF;

  -- Contact Messages: Allow public/anon to INSERT messages, but NO public SELECT (visitor privacy protected)
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'Allow anon insert on contact_messages') THEN
    CREATE POLICY "Allow anon insert on contact_messages" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
  END IF;
END $$;

-- ==============================================================================
-- Initial Seed Data
-- ==============================================================================

-- Seed Project: Online Voting System
INSERT INTO public.projects (
  name,
  slug,
  tagline,
  short_description,
  year,
  role,
  accent,
  technology,
  features,
  problem,
  approach,
  development,
  challenges,
  solution,
  result,
  future_improvements,
  github_url,
  live_url,
  display_order
)
VALUES (
  'Online Voting System',
  'online-voting-system',
  'Structured digital voting, built from the database up.',
  'A database-driven voting platform designed to provide a structured and efficient online voting experience.',
  '2025',
  'Full-stack student project',
  '#e4c7a0',
  ARRAY['React', 'Node.js', 'Express', 'MySQL'],
  ARRAY[
    'Role-based access for voters and administrators',
    'Secure ballot submission against a relational schema',
    'Live result aggregation from stored votes',
    'Admin flows for elections, candidates, and audit-friendly records'
  ],
  'Paper-based or loosely organized voting is slow to tally and hard to verify. A naive web form is not enough either — without a clear data model, duplicate votes, unclear roles, and unreadable results show up quickly. I needed a system that felt simple on the surface and disciplined underneath.',
  'I split the work into three layers. First, the database: entities for users, elections, candidates, and votes, with relationships that make "one ballot per voter per election" enforceable. Second, the API: routes that create, read, and protect those records. Third, the interface: screens that match the real sequence of login, ballot, confirmation, and results.',
  'I built the schema before polishing the visuals. That order mattered: once tables and constraints existed, the API had a contract, and the frontend could request real states instead of mock arrays. Iteration happened around edge cases — empty elections, already-voted users, and admin-only actions — not just happy-path screenshots.',
  'The hardest parts were not buttons; they were rules. Preventing double voting, keeping admin tools separate from voter views, and returning results that match what is stored — not a cached guess — required careful queries and server-side checks. I also learned how quickly frontend state can drift from the database if every action is not round-tripped through the API.',
  'Votes are written as records, not as a running counter in memory. Eligibility and role checks live on the server. The UI reflects those rules: a voter sees a ballot once, an admin sees configuration and tallies, and both sides read from the same source of truth.',
  'The project is a working demonstration of a database-backed product: authentication-aware flows, CRUD around elections, and a frontend that explains the process instead of hiding it. As a student build, it is evidence that I can connect interface, API, and schema into one coherent system.',
  'Next iterations would add stronger authentication, clearer audit logs, accessibility passes on the ballot UI, and deployment with environment-based secrets. I would also write automated tests around the "one vote" invariant so that rule cannot regress silently.',
  'https://github.com/mxni10',
  '',
  1
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Currently Learning
INSERT INTO public.currently_learning (topic, display_order)
VALUES
  ('React & Modern State', 1),
  ('Advanced JavaScript & TypeScript', 2),
  ('Backend Architecture & REST APIs', 3),
  ('System Design & Databases', 4),
  ('Data Structures & Algorithms', 5),
  ('AI-assisted Development Tools', 6)
ON CONFLICT DO NOTHING;

-- Seed Sample Achievements (You can edit or add more in Supabase Table Editor)
INSERT INTO public.achievements (title, description, date, display_order)
VALUES
  ('Hackathon Finalist', 'Built a real-time collaborative tool with relational persistence during a 36-hour hackathon.', '2025', 1),
  ('Dean''s Honor List', 'Maintained academic excellence across core engineering courses including Data Structures and DBMS.', '2024 — 2025', 2)
ON CONFLICT DO NOTHING;
