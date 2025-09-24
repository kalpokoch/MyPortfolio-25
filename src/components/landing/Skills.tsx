import React from 'react';
import SectionLayout from '../layouts/SectionLayout';
import LogoLoop from '../ui/LogoLoop';

// Simple Icons CDN URLs for black monochrome theme
const simpleIconLogos = [
  {
    src: "https://cdn.simpleicons.org/github/000000",
    alt: "GitHub",
  },
  {
    src: "https://cdn.simpleicons.org/docker/000000",
    alt: "Docker",
  },
  {
    src: "https://cdn.simpleicons.org/python/000000",
    alt: "Python",
  },
  {
    src: "https://cdn.simpleicons.org/react/000000",
    alt: "React",
  },
  {
    src: "https://cdn.simpleicons.org/typescript/000000",
    alt: "TypeScript",
  },
  {
    src: "https://cdn.simpleicons.org/nodedotjs/000000",
    alt: "Node.js",
  },
  {
    src: "https://cdn.simpleicons.org/javascript/000000",
    alt: "JavaScript",
  },
  {
    src: "https://cdn.simpleicons.org/pytorch/000000",
    alt: "PyTorch",
  },
  {
    src: "https://cdn.simpleicons.org/tensorflow/000000",
    alt: "TensorFlow",
  },
  {
    src: "https://cdn.simpleicons.org/arduino/000000",
    alt: "Arduino",
  },
  {
    src: "https://cdn.simpleicons.org/mongodb/000000",
    alt: "MongoDB",
  },
  {
    src: "https://cdn.simpleicons.org/openapiinitiative/000000",
    alt: "API",
  },
];

interface SkillsProps {
  className?: string;
}

const Skills: React.FC<SkillsProps> = ({ className = '' }) => {
  return (
    <div className={`${className}`}>
      <SectionLayout
        sectionNumber="04"
        verticalText="Skills"
        title="I'M KALPOJYOTI KOCH"
        subtitle=""
        className="bg-transparent text-black"
      >
        <></>
      </SectionLayout>

      {/* Simple Icons logo loop with monochrome (black) theme */}
      <div className="mt-8 w-full py-8">
        <LogoLoop
          logos={simpleIconLogos}
          speed={80}
          direction="left"
          gap={64}
          logoHeight={48}
          pauseOnHover={true}
          fadeOut={true}
          scaleOnHover={true}
          className="simpleicons-monochrome"
        />
      </div>
    </div>
  );
};

export default Skills;
