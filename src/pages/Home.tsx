import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { About } from '../sections/About'
import { Achievements } from '../sections/Achievements'
import { Certifications } from '../sections/Certifications'
import { Contact } from '../sections/Contact'
import { Education } from '../sections/Education'
import { Hero } from '../sections/Hero'
import { Learning } from '../sections/Learning'
import { Projects } from '../sections/Projects'
import { Skills } from '../sections/Skills'

export function Home() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const target = document.querySelector(location.hash)
    target?.scrollIntoView({ behavior: 'smooth' })
  }, [location])

  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Education />
      <Certifications />
      <Achievements />
      <Learning />
      <Contact />
    </main>
  )
}
