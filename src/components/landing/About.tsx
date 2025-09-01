// src/components/landing/About.tsx
import React from 'react';
import SectionLayout from '../layouts/SectionLayout';


interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className = '' }) => {
  return (
    <SectionLayout
      sectionNumber="02"
      verticalText="ABOUT"
      title="WHO AM I"
      subtitle="MY JOURNEY"
      className={`bg-transparent ${className}`}
    >
      <p className="text-base leading-relaxed text-gray-700 font-normal">
        Your about content goes here...
      </p>
      
      <p className="text-base leading-relaxed text-gray-700 font-normal">
        More about content...
      </p>
    </SectionLayout>
  );
};

export default About;
