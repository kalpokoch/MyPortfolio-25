import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/Header'
import Hero from './components/landing/Hero'
import ExperienceSlider from './components/landing/ExperienceSlider'  // Updated import
import ProjectsSlider from './components/landing/Projects'  // Updated import
import Education from './components/landing/Education'
import Contact from './components/landing/Contact'
import './index.css'

const App = () => {
  const [currentSection, setCurrentSection] = useState('01');

  // Handle section changes from header navigation
  const handleSectionChange = (sectionId: string) => {
    setCurrentSection(sectionId);
    
    // // Optional: Smooth scroll to section
    // const sectionMap: { [key: string]: string } = {
    //   '01': 'hero',
    //   '02': 'experience',
    //   // Add more sections as you create them
    //   // '03': 'projects',
    //   // '04': 'skills',
    //   // '05': 'contact'
    // };
    
    // const targetElement = document.getElementById(sectionMap[sectionId]);
    // if (targetElement) {
    //   targetElement.scrollIntoView({ 
    //     behavior: 'smooth',
    //     block: 'start'
    //   });
    // }
  };

  return (
    <>
      <Header 
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
      />
      <main>
        <Hero />
        <ExperienceSlider />  {/* Updated component */}
        <ProjectsSlider />  {/* Updated component */}
        <Education />
        <Contact />
      </main>
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
