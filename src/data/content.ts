export const profile = {
  name: 'Mxni',
  handle: 'mxni10',
  title: 'Student Developer | Full-Stack Developer | Tech Enthusiast',
  year: '3rd Year BTech Student',
  roles: ['Developer', 'Builder', 'Learner'] as const,
  headline: 'Building things while learning how the web works.',
  summary:
    "I'm a BTech student who enjoys turning ideas into useful digital experiences — from database-driven applications to modern web interfaces.",
  about:
    "I'm currently in my third year of BTech, exploring software development, databases, frontend technologies, and the process of turning ideas into working products.",
  status: 'Open to internships & collaborations',
  github: 'https://github.com/mxni10',
  email: 'maniworks609@gmail.com',
  linkedin: '',
  resumeUrl: '',
  location: 'India',
}

export const education = {
  degree: 'BTech',
  branch: '',
  college: '',
  period: '2024 — Present',
  yearLabel: '3rd Year',
  expectedGrad: '',
  cgpa: '',
}

export const interests = [
  'Web Development',
  'Software Engineering',
  'Databases',
  'Problem Solving',
  'AI / Emerging Technology',
] as const

export const skillGroups = [
  {
    label: 'Languages',
    items: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'SQL'],
  },
  {
    label: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express.js'],
  },
  {
    label: 'Database',
    items: ['MySQL', 'MongoDB'],
  },
  {
    label: 'Tools',
    items: ['Git', 'GitHub', 'VS Code'],
  },
] as const

export const learning = [
  'React',
  'Advanced JavaScript',
  'Backend Development',
  'System Design',
  'Data Structures & Algorithms',
  'AI-assisted development',
] as const

export type CaseBlock = {
  id: string
  title: string
  body: string
}

export type Project = {
  slug: string
  index: string
  name: string
  tagline: string
  description: string
  year: string
  role: string
  tech: string[]
  features: string[]
  github: string
  live: string
  accent: string
  blocks: CaseBlock[]
}

export const projects: Project[] = [
  {
    slug: 'online-voting-system',
    index: '01',
    name: 'Online Voting System',
    tagline: 'Structured digital voting, built from the database up.',
    description:
      'A database-driven voting platform designed to provide a structured and efficient online voting experience.',
    year: '2025',
    role: 'Full-stack student project',
    tech: ['React', 'Node.js', 'Express', 'MySQL'],
    features: [
      'Role-based access for voters and administrators',
      'Secure ballot submission against a relational schema',
      'Live result aggregation from stored votes',
      'Admin flows for elections, candidates, and audit-friendly records',
    ],
    github: 'https://github.com/mxni10',
    live: '',
    accent: '#e4c7a0',
    blocks: [
      {
        id: 'overview',
        title: 'Overview',
        body: 'This project started as a question: how do you take a familiar campus process — voting — and model it as a reliable web application? I treated it as a full-stack exercise: a React interface, an Express API, and a MySQL schema that could represent elections, users, and ballots without collapsing into a messy single table.',
      },
      {
        id: 'problem',
        title: 'Problem',
        body: 'Paper-based or loosely organized voting is slow to tally and hard to verify. A naive web form is not enough either — without a clear data model, duplicate votes, unclear roles, and unreadable results show up quickly. I needed a system that felt simple on the surface and disciplined underneath.',
      },
      {
        id: 'approach',
        title: 'Approach',
        body: 'I split the work into three layers. First, the database: entities for users, elections, candidates, and votes, with relationships that make “one ballot per voter per election” enforceable. Second, the API: routes that create, read, and protect those records. Third, the interface: screens that match the real sequence of login, ballot, confirmation, and results.',
      },
      {
        id: 'technology',
        title: 'Technology',
        body: 'React handles the interactive UI. Node.js and Express expose REST endpoints. MySQL stores structured election data so queries for eligibility, tallies, and admin lists stay explicit. Git and GitHub were used to keep the work versioned as the schema and UI evolved together.',
      },
      {
        id: 'development',
        title: 'Development',
        body: 'I built the schema before polishing the visuals. That order mattered: once tables and constraints existed, the API had a contract, and the frontend could request real states instead of mock arrays. Iteration happened around edge cases — empty elections, already-voted users, and admin-only actions — not just happy-path screenshots.',
      },
      {
        id: 'challenges',
        title: 'Challenges',
        body: 'The hardest parts were not buttons; they were rules. Preventing double voting, keeping admin tools separate from voter views, and returning results that match what is stored — not a cached guess — required careful queries and server-side checks. I also learned how quickly frontend state can drift from the database if every action is not round-tripped through the API.',
      },
      {
        id: 'solution',
        title: 'Solution',
        body: 'Votes are written as records, not as a running counter in memory. Eligibility and role checks live on the server. The UI reflects those rules: a voter sees a ballot once, an admin sees configuration and tallies, and both sides read from the same source of truth.',
      },
      {
        id: 'result',
        title: 'Result',
        body: 'The project is a working demonstration of a database-backed product: authentication-aware flows, CRUD around elections, and a frontend that explains the process instead of hiding it. As a student build, it is evidence that I can connect interface, API, and schema into one coherent system.',
      },
      {
        id: 'future',
        title: 'Future improvements',
        body: 'Next iterations would add stronger authentication, clearer audit logs, accessibility passes on the ballot UI, and deployment with environment-based secrets. I would also write automated tests around the “one vote” invariant so that rule cannot regress silently.',
      },
    ],
  },
]

export const certifications: {
  name: string
  platform: string
  year: string
  url: string
}[] = []

export const navItems = [
  { id: 'home', label: 'Home', href: '/#home' },
  { id: 'about', label: 'About', href: '/#about' },
  { id: 'projects', label: 'Projects', href: '/#projects' },
  { id: 'skills', label: 'Skills', href: '/#skills' },
  { id: 'contact', label: 'Contact', href: '/#contact' },
] as const
