import React from 'react';
import SectionLayout from '../layouts/SectionLayout';
import TextCarousel from '../ui/TextCarousel'; // Adjust path if needed

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  return (
    <div className="relative" id="INTRODUCE">
      {/* Background Image - Only for Hero */}
      <div className="absolute inset-0 z-10">
        <img 
          src="src/assets/Hero.svg" 
          alt="Grid background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Hero Content using SectionLayout */}
      <div className="relative z-20">
        <SectionLayout
          sectionNumber="01"
          verticalText="INTRODUCE"
          title="I'M KALPOJYOTI KOCH"
          // Replace subtitle string with TextCarousel
          subtitle={
            <TextCarousel 
              texts={["SOFTWARE ENGINEER", "WEB DEVELOPER", "AI ENGINEER"]}
              className="text-4xl lg:text-5xl font-bold text-white"
            />
          }
          className={`bg-transparent ${className}`}
        >
          {/* Description Content */}
          <p className="text-base leading-relaxed text-white font-normal">
            A Computer Science grad from Central Institute of Technology 
            (BTech, 2025) based in Kokrajhar, Assam.
          </p>
          
          <p className="text-base leading-relaxed text-white font-normal">
            With a passion for scalable web apps and smart ML systems, 
            I've interned at <span className="font-semibold text-[#585858]">NIELIT</span> on AI; Built responsive landing pages 
            with React and TypeScript at <span className="font-semibold text-[#585858]">SUZOCO</span>; and created a RAG based 
            Chatbot at <span className="font-semibold text-[#585858]">NEEPCO</span>.
          </p>
          
          <p className="text-base leading-relaxed text-white font-normal">
            Fluent in Python, C++ and tools like Node.js, FastAPI, 
            scikit-learn, plus AI/ML certifications. I'm excited to tackle 
            software or AI challenges in a collaborative team.
          </p>
        </SectionLayout>
      </div>
    </div>
  );
};

export default Hero;
