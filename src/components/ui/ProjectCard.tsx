import React, { useState } from 'react';
import Button from './Button';

interface ProjectCardProps {
  title: string;
  subtitle: string;
  category: string;
  duration?: string;
  description: string[];
  technologies: string[];
  achievements?: string[];
  liveDemo?: string;
  githubRepo?: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  subtitle,
  category,
  duration,
  description,
  technologies,
  achievements,
  liveDemo,
  githubRepo,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  const handleTouchStart = () => setIsTouched(true);
  const handleTouchEnd = () => {
    setTimeout(() => setIsTouched(false), 3000);
  };

  const isExpanded = isHovered || isTouched;

  return (
    <>
      {/* Global styles for animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideDown {
            from {
              transform: translateY(-10px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .slide-down {
            animation: slideDown 0.5s ease-out;
          }
        `
      }} />
      
      <div 
        className={`bg-white border border-gray-300 shadow-sm transition-shadow duration-300 relative ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Base Card Content - Always visible and maintains grid structure */}
        <div className="p-4 sm:p-6">
          <div className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bebas tracking-wider text-black leading-tight">
                  {title}
                </h3>
                <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bebas tracking-wider text-black leading-tight">
                  {subtitle}
                </h4>
              </div>
              {duration && (
                <span className="text-xs text-gray-500 font-sansita bg-gray-100 px-2 py-1">
                  {duration}
                </span>
              )}
            </div>
            
            <p className="text-sm md:text-base text-gray-600 font-sansita font-medium">
              {category}
            </p>
            
            <div className="w-12 h-1 bg-black mt-3"></div>
          </div>

          {/* Hover Indicator */}
          {!isExpanded && (
            <div className="flex items-center justify-center text-xs text-gray-500 font-sansita pt-2">
              <span className="hidden sm:inline">Hover to expand</span>
              <span className="sm:hidden">Tap to expand</span>
              <svg 
                className="ml-2 w-4 h-4 animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </div>
          )}
        </div>

        {/* Expanded Content Overlay - Absolutely positioned */}
        {isExpanded && (
          <div className="absolute top-0 left-0 right-0 bg-white border border-gray-300 shadow-lg z-50 slide-down">
            {/* Repeat the header content */}
            <div className="p-4 sm:p-6">
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bebas tracking-wider text-black leading-tight">
                      {title}
                    </h3>
                    <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bebas tracking-wider text-black leading-tight">
                      {subtitle}
                    </h4>
                  </div>
                  {duration && (
                    <span className="text-xs text-gray-500 font-sansita bg-gray-100 px-2 py-1">
                      {duration}
                    </span>
                  )}
                </div>
                
                <p className="text-sm md:text-base text-gray-600 font-sansita font-medium">
                  {category}
                </p>
                
                <div className="w-12 h-1 bg-black mt-3"></div>
              </div>

              {/* Full Content */}
              <div className="mb-4">
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base leading-relaxed text-gray-700 font-sansita">
                  {description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>

              {achievements && achievements.length > 0 && (
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-black mb-2 font-sansita">Key Achievements:</h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 font-sansita ml-4">
                    {achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-6">
                <h5 className="text-sm font-medium text-black mb-2 font-sansita">Technologies Used:</h5>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-xs bg-gray-200 text-gray-700 font-sansita hover:bg-gray-300 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {(liveDemo || githubRepo) && (
                <div className="flex gap-3 mt-auto">
                  {liveDemo && (
                    <Button
                      onClick={() => window.open(liveDemo, '_blank', 'noopener,noreferrer')}
                      variant="dark"
                      size="sm"
                      className="flex-1"
                    >
                      Live Demo
                    </Button>
                  )}
                  {githubRepo && (
                    <Button
                      onClick={() => window.open(githubRepo, '_blank', 'noopener,noreferrer')}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      View Code
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectCard;
