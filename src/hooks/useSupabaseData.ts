import { useEffect, useState } from 'react'
import {
  projects as fallbackProjects,
  certifications as fallbackCertifications,
  learning as fallbackLearning,
  type Project,
} from '../data/content'
import {
  supabase,
  isSupabaseConfigured,
  type DbProject,
  type DbCertification,
  type DbAchievement,
  type DbLearningTopic,
} from '../lib/supabase'

function mapDbProjectToProject(row: DbProject, indexNumber: number): Project {
  return {
    slug: row.slug,
    index: String(row.display_order || indexNumber + 1).padStart(2, '0'),
    name: row.name,
    tagline: row.tagline || row.short_description,
    description: row.short_description,
    year: row.year || '2025',
    role: row.role || 'Developer',
    tech: Array.isArray(row.technology) ? row.technology : [],
    features: Array.isArray(row.features) ? row.features : [],
    github: row.github_url || 'https://github.com/mxni10',
    live: row.live_url || '',
    accent: row.accent || '#e4c7a0',
    imageUrl: row.image_url || '',
    blocks: [
      {
        id: 'overview',
        title: 'Overview',
        body: row.short_description || 'Project overview and background.',
      },
      {
        id: 'problem',
        title: 'Problem',
        body: row.problem || 'Core problem addressed during development.',
      },
      {
        id: 'approach',
        title: 'Approach',
        body: row.approach || 'Architectural strategy and workflow.',
      },
      {
        id: 'technology',
        title: 'Technology',
        body: `Implemented using ${(row.technology || []).join(', ')}. Engineered with clean separation of concerns and version control.`,
      },
      {
        id: 'development',
        title: 'Development',
        body: row.development || 'Iterative build process and validation.',
      },
      {
        id: 'challenges',
        title: 'Challenges',
        body: row.challenges || 'Key edge cases, constraints, and engineering decisions.',
      },
      {
        id: 'solution',
        title: 'Solution',
        body: row.solution || 'Implemented system architecture and design.',
      },
      {
        id: 'result',
        title: 'Result',
        body: row.result || 'Outcome and capabilities demonstrated by this project.',
      },
      {
        id: 'future',
        title: 'Future improvements',
        body: row.future_improvements || 'Planned future iterations and enhancements.',
      },
    ],
  }
}

export function useProjects() {
  const [data, setData] = useState<Project[]>(fallbackProjects)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return
    }

    let isMounted = true

    async function fetchProjects() {
      try {
        const { data: rows, error } = await supabase!
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true })

        if (error) throw error

        if (isMounted && rows && rows.length > 0) {
          setData(rows.map((row, idx) => mapDbProjectToProject(row as DbProject, idx)))
        }
      } catch (err) {
        console.warn('Supabase projects fetch failed, using fallback:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchProjects()

    return () => {
      isMounted = false
    }
  }, [])

  return { projects: data, loading }
}

export function useProject(slug: string | undefined) {
  const { projects, loading } = useProjects()
  const project = projects.find((p) => p.slug === slug)
  return { project, loading }
}

export function useCertifications() {
  const [data, setData] = useState<
    { name: string; platform: string; year: string; url: string }[]
  >(fallbackCertifications)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return
    }

    let isMounted = true

    async function fetchCertifications() {
      try {
        const { data: rows, error } = await supabase!
          .from('certifications')
          .select('*')
          .order('display_order', { ascending: true })

        if (error) throw error

        if (isMounted && rows) {
          setData(
            rows.map((row: DbCertification) => ({
              name: row.name,
              platform: row.platform,
              year: row.year,
              url: row.certificate_url || '',
            }))
          )
        }
      } catch (err) {
        console.warn('Supabase certifications fetch failed, using fallback:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchCertifications()

    return () => {
      isMounted = false
    }
  }, [])

  return { certifications: data, loading }
}

export function useAchievements() {
  const [data, setData] = useState<DbAchievement[]>([])
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return
    }

    let isMounted = true

    async function fetchAchievements() {
      try {
        const { data: rows, error } = await supabase!
          .from('achievements')
          .select('*')
          .order('display_order', { ascending: true })

        if (error) throw error

        if (isMounted && rows) {
          setData(rows as DbAchievement[])
        }
      } catch (err) {
        console.warn('Supabase achievements fetch failed:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchAchievements()

    return () => {
      isMounted = false
    }
  }, [])

  return { achievements: data, loading }
}

export function useLearning() {
  const [data, setData] = useState<string[]>(Array.from(fallbackLearning))
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return
    }

    let isMounted = true

    async function fetchLearning() {
      try {
        const { data: rows, error } = await supabase!
          .from('currently_learning')
          .select('*')
          .order('display_order', { ascending: true })

        if (error) throw error

        if (isMounted && rows && rows.length > 0) {
          setData(rows.map((row: DbLearningTopic) => row.topic))
        }
      } catch (err) {
        console.warn('Supabase learning topics fetch failed, using fallback:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchLearning()

    return () => {
      isMounted = false
    }
  }, [])

  return { learning: data, loading }
}
