import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/Header.tsx'
import Hero from './components/landing/Hero.tsx'
import ExperienceSlider from './components/ExperienceSlider.tsx'  // Updated import
import './index.css'

const App = () => {
  const [currentSection, setCurrentSection] = useState('01');

  // Handle section changes from header navigation
  const handleSectionChange = (sectionId: string) => {
    setCurrentSection(sectionId);
    
    // Optional: Smooth scroll to section
    const sectionMap: { [key: string]: string } = {
      '01': 'hero',
      '02': 'experience',
      // Add more sections as you create them
      // '03': 'projects',
      // '04': 'skills',
      // '05': 'contact'
    };
    
    const targetElement = document.getElementById(sectionMap[sectionId]);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <Header 
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
      />
      <main>
        <div id="hero">
          <Hero />
        </div>
        <div id="experience">
          <ExperienceSlider />  {/* Updated component */}
        </div>
        {/* Add more sections as needed */}
        {/* 
        <div id="projects">
          <Projects />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="contact">
          <Contact />
        </div>
        */}
      </main>
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
