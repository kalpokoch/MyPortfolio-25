import { StrictMode, useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header';
import Hero from './components/landing/Hero';
import ExperienceSlider from './components/landing/ExperienceSlider';
import ProjectsSlider from './components/landing/Projects';
import Education from './components/landing/Education';
import Contact from './components/landing/Contact';
import { useScrollSnap } from './hooks/useScrollSnap';
import Loader from './components/Loader';
import './index.css';

// Import all images that need to be preloaded
import NeepcoInternImg from './assets/NeepcoIntern.webp';
import SuzocoInternImg from './assets/SuzocoIntern.webp';
import NielitInternImg from './assets/NielitIntern.webp';
import AmityAdminAssitant from './assets/AmityAdminAssistant.webp';


const App = () => {
  const [currentSection, setCurrentSection] = useState('01');
  const [isLoading, setIsLoading] = useState(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Get the disable function
  const { disableSnap } = useScrollSnap([heroRef, experienceRef, educationRef, contactRef] as React.RefObject<HTMLElement>[]);

  // Preload images function
  useEffect(() => {
    const imagesToPreload = [
      NeepcoInternImg,
      SuzocoInternImg,
      NielitInternImg,
      AmityAdminAssitant
    ];

    const preloadImages = (imageUrls: string[]) => {
      return Promise.all(
        imageUrls.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = () => resolve(img); // Resolve even on error to prevent blocking
          });
        })
      );
    };

    const handleLoad = async () => {
      try {
        await preloadImages(imagesToPreload);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsLoading(false);
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const handleSectionChange = (sectionId: string) => {
    setCurrentSection(sectionId);
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <Header 
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        disableSnap={disableSnap}
      />
      <main>
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
