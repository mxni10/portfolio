import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CustomCursor } from './components/CustomCursor'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { ScrollProgress } from './components/ScrollProgress'
import { SmoothScroll } from './components/SmoothScroll'
import { Home } from './pages/Home'
import { Photography } from './pages/Photography'
import { ProjectCase } from './pages/ProjectCase'

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <div className="grain" aria-hidden />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<ProjectCase />} />
        <Route path="/photography" element={<Photography />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
