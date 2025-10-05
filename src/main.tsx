import { StrictMode, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header';
import Hero from './components/landing/Hero';
import ExperienceSlider from './components/landing/ExperienceSlider';
import ProjectsSlider from './components/landing/Projects';
import Education from './components/landing/Education';
import Contact from './components/landing/Contact';
import { useScrollSnap } from './hooks/useScrollSnap';
import './index.css';

const App = () => {
  const [currentSection, setCurrentSection] = useState('01');

  const heroRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Get the disable function
  const { disableSnap } = useScrollSnap([heroRef, experienceRef, educationRef, contactRef] as React.RefObject<HTMLElement>[]);

  const handleSectionChange = (sectionId: string) => {
    setCurrentSection(sectionId);
  };

  return (
    <>
      <Header 
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        disableSnap={disableSnap} // Pass it down
      />
      <main>
        {/* Add IDs that match Header's lookup */}
        <div ref={heroRef} id="INTRODUCE" className="snap-section">
          <Hero />
        </div>
        <div ref={experienceRef} id="EXPERIENCE" className="snap-section">
          <ExperienceSlider />
        </div>
        <div id="PROJECTS">
          <ProjectsSlider />
        </div>
        <div ref={educationRef} id="EDUCATION" className="snap-section">
          <Education />
        </div>
        <div ref={contactRef} id="CONTACT" className="snap-section">
          <Contact />
        </div>
      </main>
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
