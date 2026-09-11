import { createClient } from '@supabase/supabase-js'

const rawUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseUrl = rawUrl
  ? rawUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '')
  : undefined
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim()

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-project-id.supabase.co' &&
    !supabaseUrl.includes('your-project-id')
)

// Initialize Supabase client if credentials are present; otherwise create a dummy/fallback-safe instance
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null


export type DbProject = {
  id: string
  name: string
  slug: string
  tagline: string
  short_description: string
  year: string
  role: string
  accent: string
  technology: string[]
  features: string[]
  problem: string
  approach: string
  development: string
  challenges: string
  solution: string
  result: string
  future_improvements: string
  github_url: string
  live_url: string
  image_url: string
  display_order: number
  created_at: string
}

export type DbCertification = {
  id: string
  name: string
  platform: string
  year: string
  certificate_url: string
  display_order: number
  created_at: string
}

export type DbAchievement = {
  id: string
  title: string
  description: string
  date: string
  display_order: number
  created_at: string
}

export type DbLearningTopic = {
  id: string
  topic: string
  display_order: number
  created_at: string
}

export type DbContactMessage = {
  id?: string
  name: string
  email: string
  message: string
  submitted_at?: string
}
