
import React from 'react';
import SectionLayout from '../layouts/SectionLayout';

interface AboutProps {
  className?: string;
}

const Experience: React.FC<AboutProps> = ({ className = '' }) => {
  return (
    <SectionLayout
      sectionNumber="02"
      verticalText="EXPERIENCE"
      title="INTERN"
      subtitle="NIELIT"
      className={`bg-transparent ${className}`}
    >
      <p className="text-base leading-relaxed text-gray-700 font-normal lg:pr-7">
        I'm currently working as an AI/ML Intern at NIELIT(National Institute of Electronics & IT) 
        in Kokrajhar, Assam.
      </p>

      {/* <p className="text-base leading-relaxed text-gray-700 font-normal lg:pr-7">
        I'm currently working as an AI/ML Intern at NIELIT(National Institute of Electronics & IT) 
        in Kokrajhar, Assam.
      </p> */}
    
    </SectionLayout>
  );
};

export default Experience;
