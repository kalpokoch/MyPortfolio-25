import React from 'react';
import SectionLayout from '../layouts/SectionLayout';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  return (
    <SectionLayout
      sectionNumber="01"
      verticalText="INTRODUCE"
      title="I'M KALPOJYOTI KOCH"
      subtitle="SOFTWARE ENGINEER"
      backgroundImage="src/assets/Hero.svg"
      className={className}
    >
      {/* Content with proper colors */}
      <p className="text-base leading-relaxed text-gray-700 font-normal">
        A Computer Science grad from Central Institute of Technology 
        (BTech, 2025) based in Kokrajhar, Assam.
      </p>
      
      <p className="text-base leading-relaxed text-gray-700 font-normal">
        With a passion for scalable web apps and smart ML systems, 
        I've integrated <span className="font-semibold text-black">AI-ML</span> on <span className="font-semibold text-black">AlgoHealth</span>; responsive landing pages 
        with React and TypeScript at <span className="font-semibold text-black">SUZOCO</span>; and created a RAG based 
        Chatbot at <span className="font-semibold text-black">NEEPCO</span>.
      </p>
      
      <p className="text-base leading-relaxed text-gray-700 font-normal">
        Fluent in Python, C++ and tools like Node.js, FastAPI, 
        scikit-learn, plus AI/ML certifications. I'm excited to tackle 
        software or AI challenges in a collaborative team.
      </p>
    </SectionLayout>
  );
};

export default Hero;
