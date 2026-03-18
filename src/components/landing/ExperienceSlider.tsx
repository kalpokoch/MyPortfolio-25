import React, { useState, useEffect, useRef } from 'react';
import SectionLayout from '../layouts/SectionLayout';
import Button from '../ui/Button';
import NeepcoInternImg from '../../assets/NeepcoIntern.webp';
import SuzocoInternImg from '../../assets/SuzocoIntern.webp';
import NielitInternImg from '../../assets/NielitIntern.webp';
import AmityAdminAssitant from '../../assets/AmityAdminAssistant.webp';

interface ExperienceData {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
  liveDemo?: string;
  image?: string;
  imageAlt?: string;
  imagePlaceholder?: string;
}

interface ExperienceSliderProps {
  className?: string;
}

const ExperienceSlider: React.FC<ExperienceSliderProps> = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [_isExperienceVisible, setIsExperienceVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const containerRef = useRef<HTMLDivElement>(null);

  // Your experience data with images
  const experiences: ExperienceData[] = [
    {
      id: "amity",
      title: "Project Engineer",
      subtitle: "AI/ML",
      company: "Amity",
      location: "Noida, Uttar pradesh",
      duration: "Oct 2025 - Present",
      responsibilities: [
        "Multi-label classifier on 5.4M+ ICMR-NIE records for 26 viral infection predictions",
        "Custom Gated Residual Transformer — 0.71 F1, outperforming XGBoost by 2%",
        "Supporting AI model development for personalized diagnosis",
        "Collaborating on data integration for lab network optimization",
      ],
      liveDemo: "https://virusprednie.netlify.app/",
      image: AmityAdminAssitant,
      imageAlt: "Amity Admin Assistant project",
      imagePlaceholder: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0'/%3E%3C/svg%3E"
    },
    {
      id: "nielit",
      title: "INTERN",
      subtitle: "AI/ML",
      company: "NIELIT",
      location: "Kokrajhar, Assam",
      duration: "Aug 2025 - Oct 2025",
      responsibilities: [
        "Developed a Cough-Based Respiratory Screener",
        "Developing an AI pipeline (audio → spectrogram → classification) to detect key respiratory symptoms",
        "Deployed the model on HuggingFace with a Netlify frontend",
      ],
      liveDemo: "https://respiratoryscreener.netlify.app/",
      image: NielitInternImg,
      imageAlt: "NIELIT AI/ML project",
      imagePlaceholder: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0'/%3E%3C/svg%3E"
    },
    {
      id: "suzoco",
      title: "INTERN",
      subtitle: "Web Development",
      company: "SUZOCO",
      location: "Kokrajhar, Assam",
      duration: "Mar 2025 – Jun 2025",
      responsibilities: [
        "Developed a responsive landing page with React, TypeScript, and Vite",
        "Ensured smooth user experience across devices",
        "Integrated dynamic content in collaboration with design and backend teams",
      ],
      liveDemo: "https://suzocoservices.in/",
      image: SuzocoInternImg,
      imageAlt: "SUZOCO website landing page",
      imagePlaceholder: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0'/%3E%3C/svg%3E"
    },
    {
      id: "neepco",
      title: "INTERN",
      subtitle: "AI/ML",
      company: "NEEPCO",
      location: "Shillong, Meghalaya",
      duration: "Jul 2024 – Aug 2024",
      responsibilities: [
        "Built a RAG chatbot for NEEPCO's(DOP) with semantic retrieval & clause-level chunking",
        "Delivered traceable, policy-backed answers for reliability",
        "Deployed on free-tier CPU using a quantized TinyLlama",
      ],
      liveDemo: "https://neepcodop.netlify.app/",
      image: NeepcoInternImg,
      imageAlt: "NEEPCO DOP chatbot interface",
      imagePlaceholder: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0'/%3E%3C/svg%3E"
    }
  ];

  // Preload all images on component mount for instant transitions
  useEffect(() => {
    experiences.forEach((exp) => {
      if (exp.image) {
        const img = new Image();
        img.src = exp.image;
      }
    });
  }, []);

  // Navigation functions
  const goToNext = () => {
    if (isTransitioning) return;
    setSlideDirection('left');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % experiences.length);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 500);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setSlideDirection('right');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 500);
  };

  const goToIndex = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setSlideDirection(index > currentIndex ? 'left' : 'right');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 500);
  };

  // Keyboard navigation
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
  }, [isTransitioning]);

  // Check if Experience section is in viewport
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

  // Calculate transform and opacity based on transition state
  const getContentStyles = () => {
    if (!isTransitioning) {
      return {
        transform: 'translateX(0) scale(1)',
        opacity: 1,
      };
    }

    const translateX = slideDirection === 'left' ? '-100px' : '100px';
    return {
      transform: `translateX(${translateX}) scale(0.95)`,
      opacity: 0,
    };
  };

  // Dynamic content renderer
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
      
      <ul className="w-full list-disc list-inside space-y-2 text-base leading-relaxed text-gray-700 font-sansita">
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

  // Create image component for current experience with fade animation
  const renderImageComponent = (experience: ExperienceData) => {
    if (!experience.image) return null;
    
    const [isLoaded, setIsLoaded] = useState(false);

    const getImageStyles = () => {
      const baseStyles = {
        opacity: isLoaded ? 1 : 0,
        transform: 'scale(1)',
        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      };
      if (isTransitioning && isLoaded) {
        return {
          ...baseStyles,
          opacity: 0,
          transform: 'scale(1.05)',
        };
      }
      return baseStyles;
      
      // if (!isTransitioning) {
      //   return {
      //     opacity: 1,
      //     transform: 'scale(1)',
      //   };
      // }

      // return {
      //   opacity: 0,
      //   transform: 'scale(1.05)',
      // };
    };

    return (
      <div className="w-auto h-auto flex items-center justify-center bg-gray-50 overflow-hidden relative">
        {/* Placeholder - shown while loading */}
        {!isLoaded && experience.imagePlaceholder && (
          <img 
            src={experience.imagePlaceholder}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-md"
            aria-hidden="true"
          />
        )}
        
        {/* Main image */}
        <img 
          src={experience.image}
          alt={experience.imageAlt || `${experience.company} project`}
          className="w-full h-full object-cover"
          loading="lazy"
          fetchPriority={currentIndex === experiences.findIndex(e => e.id === experience.id) ? "high" : "low"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            ...getImageStyles()
          }}
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
        key={currentExperience.id}
        sectionNumber="02"
        verticalText="EXPERIENCE"
        title={currentExperience.title}
        subtitle={currentExperience.subtitle}
        className={`bg-transparent ${className}`}
        variant="image-center"
        contentBodyClassName="max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl"
        imageComponent={renderImageComponent(currentExperience)}
      >
        {/* Dynamic Content with smooth transition */}
        <div 
          style={{
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            ...getContentStyles()
          }}
        >
          {renderExperienceContent(currentExperience)}
        </div>
      </SectionLayout>

      {/* Bar-Style Dots */}
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

      {/* Navigation Arrows */}
      <>
        {/* Left Arrow */}
        <button
          onClick={goToPrev}
          disabled={isTransitioning}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 
                     w-10 h-10 md:w-12 md:h-12 
                     flex items-center justify-center
                     text-black/40 hover:text-black/80 
                     transition-all duration-300 ease-in-out
                     hover:scale-110 active:scale-95
                     focus:outline-none focus:ring-2 focus:ring-black/20 rounded-full
                     disabled:opacity-30 disabled:cursor-not-allowed
                     group"
          aria-label="Previous experience"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path 
              d="M15 18L9 12L15 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          disabled={isTransitioning}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 
                     w-10 h-10 md:w-12 md:h-12 
                     flex items-center justify-center
                     text-black/40 hover:text-black/80 
                     transition-all duration-300 ease-in-out
                     hover:scale-110 active:scale-95
                     focus:outline-none focus:ring-2 focus:ring-black/20 rounded-full
                     disabled:opacity-30 disabled:cursor-not-allowed
                     group"
          aria-label="Next experience"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path 
              d="M9 18L15 12L9 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </>
    </div>
  );
};

export default ExperienceSlider;
