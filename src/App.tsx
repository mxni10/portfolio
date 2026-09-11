import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CustomCursor } from './components/CustomCursor'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { ScrollProgress } from './components/ScrollProgress'
import { Home } from './pages/Home'
import { ProjectCase } from './pages/ProjectCase'

export default function App() {
  return (
    <BrowserRouter>
      <div className="grain" aria-hidden />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<ProjectCase />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
