import React from 'react';
import SectionLayout from '../layouts/SectionLayout';

const About: React.FC = () => {
  return (
    <SectionLayout
      sectionNumber="02"
      verticalText="ABOUT"
      title="WHO AM I"
      subtitle="MY JOURNEY"
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
