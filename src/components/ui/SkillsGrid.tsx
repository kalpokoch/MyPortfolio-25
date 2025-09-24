// ui/SkillsGrid.tsx
import React, { useEffect, useState } from 'react';

interface Skill {
  name: string;
  percentage: number;
  category: string;
}

const skillsData: Skill[] = [
  { name: "Python", percentage: 90, category: "Language" },
  { name: "JavaScript", percentage: 85, category: "Language" },
  { name: "TypeScript", percentage: 80, category: "Language" },
  { name: "React", percentage: 85, category: "Framework" },
  { name: "PyTorch", percentage: 85, category: "AI/ML" },
  { name: "Deep Learning", percentage: 85, category: "AI/ML" },
  { name: "Git", percentage: 90, category: "Tool" },
  { name: "Docker", percentage: 70, category: "Tool" },
  { name: "MongoDB", percentage: 75, category: "Database" },
  { name: "Node.js", percentage: 80, category: "Backend" },
];

interface SkillCardProps {
  skill: Skill;
  delay: number;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, delay, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setAnimatedWidth(skill.percentage), 200);
    }, delay);

    return () => clearTimeout(timer);
  }, [skill.percentage, delay]);

  return (
    <div
      className={`relative group cursor-pointer transform transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } ${
        isHovered ? 'scale-105 -translate-y-1' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transitionDelay: isVisible ? '0ms' : `${delay}ms` }}
    >
      {/* Glow effect on hover */}
      <div className={`absolute -inset-0.5 bg-black rounded-md blur-sm transition-opacity duration-300 ${
        isHovered ? 'opacity-20' : 'opacity-0'
      }`} />
      
      <div className={`relative bg-white border-2 rounded-md p-2 h-full transition-all duration-300 ${
        isHovered ? 'border-black shadow-lg' : 'border-gray-200 shadow-sm'
      }`}>
        {/* Pulse animation dot and category */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-1">
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              isHovered ? 'bg-black animate-pulse' : 'bg-gray-400'
            }`} />
            <span className="text-gray-500 text-xs font-sansita tracking-wider uppercase">
              {skill.category}
            </span>
          </div>
          <span className={`font-bold font-bebas transition-all duration-300 ${
            isHovered ? 'text-black text-sm' : 'text-gray-700 text-xs'
          }`}>
            {skill.percentage}%
          </span>
        </div>

        <h3 className={`font-bold font-bebas tracking-wide transition-all duration-300 mb-1 ${
          isHovered ? 'text-black text-sm' : 'text-gray-800 text-xs'
        }`}>
          {skill.name}
        </h3>

        {/* Interactive progress bar */}
        <div className="relative">
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                isHovered ? 'bg-black shadow-md' : 'bg-gray-600'
              }`}
              style={{ 
                width: `${animatedWidth}%`,
                transform: isHovered ? 'scaleY(1.5)' : 'scaleY(1)'
              }}
            />
          </div>
          {/* Animated shimmer effect */}
          <div className={`absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform -skew-x-12 transition-transform duration-1000 ${
            isHovered ? 'translate-x-full' : '-translate-x-full'
          }`} />
        </div>
      </div>
    </div>
  );
};

const SkillsGrid: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start">
      
      {/* Grid container that fills available height */}
      <div className="flex-1 grid grid-cols-2 gap-2 auto-rows-fr">
        {skillsData.map((skill, index) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            delay={index * 100}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsGrid;
