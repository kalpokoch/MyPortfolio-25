import React, { useState, useEffect, useRef } from 'react';
import SectionLayout from '../layouts/SectionLayout';
import Button from '../ui/Button';
import NeepcoInternImg from '../../assets/NeepcoIntern.png';
import SuzocoInternImg from '../../assets/SuzocoIntern.png';
import NielitInternImg from '../../assets/NielitIntern.png';


interface ExperienceData {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
  liveDemo?: string;
  image?: string; // New: Image path/URL
  imageAlt?: string; // New: Alt text for accessibility
}

interface ExperienceSliderProps {
  className?: string;
}

const ExperienceSlider: React.FC<ExperienceSliderProps> = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExperienceVisible, setIsExperienceVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Your experience data with images
  const experiences: ExperienceData[] = [
    {
      id: "nielit",
      title: "INTERN",
      subtitle: "AI/ML",
      company: "NIELIT",
      location: "Kokrajhar, Assam",
      duration: "Aug 2025 - Present",
      responsibilities: [
        "Working on a Cough-Based Respiratory Screener"
      ],
      image: NielitInternImg,
      imageAlt: "NIELIT AI/ML project"
    },
    {
      id: "suzoco",
      title: "INTERN",
      subtitle: "Web Development",
      company: "SUZOCO",
      location: "Kokrajhar, Assam",
      duration: "Mar 2025 – Jun 2025",
      responsibilities: [
        "Developed a responsive, high performance landing page using React, TypeScript and Vite",
        "Collaborated with design and backend teams to integrate dynamic content and ensure cross-browser compatibility"
      ],
      liveDemo: "https://suzocoservices.in/",
      image: SuzocoInternImg,
      imageAlt: "SUZOCO website landing page"
    },
    {
      id: "neepco",
      title: "INTERN",
      subtitle: "AI/ML",
      company: "NEEPCO",
      location: "Shillong, Meghalaya",
      duration: "Jul 2024 – Aug 2024",
      responsibilities: [
        "Built a Retrieval-Augmented Generation chatbot for NEEPCO's DOP delivering traceable, policy-backed answers via semantic retrieval and fine-grained clause chunking optimized for CPU-only constraints",
        "Deployed with a quantized TinyLlama backend and sequential request handling on free-tier infrastructure to improve reliability, timeout control, and response accuracy for policy queries"
      ],
      liveDemo: "https://neepcodop.netlify.app/",
      image: NeepcoInternImg,
      imageAlt: "NEEPCO DOP chatbot interface"
    }
  ];

  // Navigation functions (same as before)
  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToIndex = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Keyboard navigation (same as before)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check if Experience section is in viewport (same as before)
  useEffect(() => {
    const experienceSection = document.getElementById('experience');
    
    if (!experienceSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsExperienceVisible(entry.isIntersecting);
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    observer.observe(experienceSection);
    return () => observer.disconnect();
  }, []);

  const currentExperience = experiences[currentIndex];

  // Dynamic content renderer (same as before)
  const renderExperienceContent = (experience: ExperienceData) => (
    <div className="space-y-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg lg:text-5xl font-bebas tracking-wider text-black">
            {experience.company}
          </h3>
          <p className="text-sm text-gray-600 font-sansita lg:text-xl ">
            {experience.location}
          </p>
        </div>
        <p className="flex text-sm text-gray-600 font-sansita">
          {experience.duration}
        </p>
      </div>
      
      <ul className="list-disc list-inside space-y-2 text-base leading-relaxed text-gray-700 font-sansita lg:pr-7">
        {experience.responsibilities.map((responsibility, index) => (
          <li key={index}>{responsibility}</li>
        ))}
      </ul>

      {experience.liveDemo && (
        <div className="mt-6 pt-4 ">
          <Button
            onClick={() => window.open(experience.liveDemo, '_blank', 'noopener,noreferrer')}
            variant="dark"
            size="md"
          >
            Project Demonstration
          </Button>
        </div>
      )}
    </div>
  );

  // Create image component for current experience
  const renderImageComponent = (experience: ExperienceData) => {
    if (!experience.image) return null;
    
    return (
      <div className="w-auto h-auto flex items-center justify-center bg-gray-50 overflow-hidden">
        <img 
          src={experience.image}
          alt={experience.imageAlt || `${experience.company} project`}
          className="w-full h-full object-cover transition-all duration-300 ease-in-out hover:scale-105"
          loading="lazy"
        />
      </div>
    );
  };

  return (
    <div
      id="EXPERIENCE" 
      className="relative select-none"
      ref={containerRef}
    >
      <SectionLayout
        sectionNumber="02"
        verticalText="EXPERIENCE"
        title={currentExperience.title}
        subtitle={currentExperience.subtitle}
        className={`bg-transparent transition-all duration-500 ease-in-out ${className}`}
        variant="image-center" // Use image-center variant
        imageComponent={renderImageComponent(currentExperience)} // Pass the current experience image
      >
        {/* Dynamic Content with smooth transition */}
        <div className={`transition-all duration-300 ease-in-out transform ${
          isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        }`}>
          {renderExperienceContent(currentExperience)}
        </div>
      </SectionLayout>

      {/* Bar-Style Dots (same as before) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex justify-center items-center gap-4">
          {experiences.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              type="button"
              className={`h-1.5 transition-all duration-700 ease-in-out hover:scale-y-150 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === currentIndex 
                  ? 'w-12 bg-[#DBDBDB] scale-y-150' 
                  : 'w-12 bg-[#585858] hover:bg-white/50'
              }`}
              aria-label={`Go to experience ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSlider;
