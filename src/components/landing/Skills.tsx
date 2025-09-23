import React from 'react';
import SectionLayout from '../layouts/SectionLayout';
import LogoLoop from '../ui/LogoLoop'; // Adjust path as needed

const logoData = [
  { name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'React', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Docker', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' }
];

const logos = logoData.map(skill => ({
  src: skill.iconUrl,
  alt: skill.name
}));


interface SkillsProps {
  className?: string;
}

const Skills: React.FC<SkillsProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <SectionLayout
        sectionNumber="04"
        verticalText="Skills"
        title="I'M KALPOJYOTI KOCH"
        subtitle="" // Remove subtitle or add any static text as needed
        className="bg-transparent"
      >
        {/* Add children content here - this was missing */}
        <div className="mt-6">
          {/* You can add any content inside SectionLayout here */}
          <p className="text-gray-600">My technical skills and expertise</p>
        </div>
      </SectionLayout>
      
      {/* LogoLoop at the bottom */}
      <div className="mt-6 w-full">
        <LogoLoop
          logos={logos}
          speed={120}
          direction="left"
          gap={32}
          logoHeight={28}
          pauseOnHover={true}
          fadeOut={true}
          scaleOnHover={true}
        />
      </div>
    </div>
  );
};

export default Skills;
