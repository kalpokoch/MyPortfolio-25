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

  // Remove explicit type, let TypeScript infer
  const heroRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Type assert in the hook call
  useScrollSnap([heroRef, experienceRef, educationRef, contactRef] as React.RefObject<HTMLElement>[]);

  const handleSectionChange = (sectionId: string) => {
    setCurrentSection(sectionId);
  };

  return (
    <>
      <Header 
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
      />
      <main>
        <div ref={heroRef} className="snap-section">
          <Hero />
        </div>
        <div ref={experienceRef} className="snap-section">
          <ExperienceSlider />
        </div>
        {/* ProjectsSlider is NOT wrapped - no snapping */}
        <ProjectsSlider />
        <div ref={educationRef} className="snap-section">
          <Education />
        </div>
        <div ref={contactRef} className="snap-section">
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
