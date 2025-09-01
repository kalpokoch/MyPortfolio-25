import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Hero from './components/landing/Hero.tsx'
import About from './components/landing/About.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Hero />
    <About />
  </StrictMode>,
)
