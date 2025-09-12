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
  isCompact?: boolean;
  index?: number;
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
  className = '',
  isCompact = false,
  index = 0
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
          @keyframes fadeInUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .slide-down {
            animation: slideDown 0.3s ease-out;
          }
          .fade-in-up {
            animation: fadeInUp 0.5s ease-out;
            animation-delay: ${index * 0.1}s;
            animation-fill-mode: both;
          }
        `
      }} />
      
      <div 
        className={`bg-white border border-gray-300 shadow-sm transition-all duration-300 relative fade-in-up ${
          isExpanded ? 'shadow-lg z-50' : 'hover:shadow-md'
        } ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ 
          zIndex: isExpanded ? 1000 + index : 1,
          marginBottom: isExpanded ? '20px' : '0px'
        }}
      >
        {/* Base Card Content - Compact version for stacked layout */}
        <div className={`${isCompact ? 'p-3' : 'p-4 sm:p-6'}`}>
          <div className="mb-2">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className={`${isCompact ? 'text-sm sm:text-base md:text-lg' : 'text-lg sm:text-xl md:text-2xl lg:text-3xl'} font-bebas tracking-wider text-black leading-tight`}>
                  {title}
                </h3>
                <h4 className={`${isCompact ? 'text-sm sm:text-base md:text-lg' : 'text-lg sm:text-xl md:text-2xl lg:text-3xl'} font-bebas tracking-wider text-black leading-tight`}>
                  {subtitle}
                </h4>
              </div>
              {duration && (
                <span className="text-xs text-gray-500 font-sansita bg-gray-100 px-2 py-1">
                  {duration}
                </span>
              )}
            </div>
            
            <p className={`${isCompact ? 'text-xs' : 'text-sm md:text-base'} text-gray-600 font-sansita font-medium`}>
              {category}
            </p>
            
            <div className={`${isCompact ? 'w-8 h-0.5' : 'w-12 h-1'} bg-black ${isCompact ? 'mt-2' : 'mt-3'}`}></div>
          </div>

          {/* Hover Indicator - Only show when not expanded */}
          {!isExpanded && isCompact && (
            <div className="flex items-center justify-center text-xs text-gray-500 font-sansita pt-2">
              <span className="hidden sm:inline">Hover to expand</span>
              <span className="sm:hidden">Tap to expand</span>
              <svg 
                className="ml-2 w-3 h-3 animate-bounce" 
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

        {/* Expanded Content Overlay - Positioned to not interfere with other cards */}
        {isExpanded && (
          <div 
            className="absolute top-0 left-0 right-0 bg-white border border-gray-300 shadow-xl slide-down"
            style={{ 
              minWidth: isCompact ? '320px' : 'auto',
              left: isCompact ? '-10px' : '0',
              right: isCompact ? '-10px' : '0'
            }}
          >
            {/* Repeat the header content */}
            <div className="p-4">
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bebas tracking-wider text-black leading-tight">
                      {title}
                    </h3>
                    <h4 className="text-base sm:text-lg md:text-xl font-bebas tracking-wider text-black leading-tight">
                      {subtitle}
                    </h4>
                  </div>
                  {duration && (
                    <span className="text-xs text-gray-500 font-sansita bg-gray-100 px-2 py-1">
                      {duration}
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 font-sansita font-medium">
                  {category}
                </p>
                
                <div className="w-12 h-1 bg-black mt-3"></div>
              </div>

              {/* Full Content - Condensed for compact layout */}
              <div className="mb-3">
                <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed text-gray-700 font-sansita">
                  {description.slice(0, 2).map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>

              {achievements && achievements.length > 0 && (
                <div className="mb-3">
                  <h5 className="text-sm font-medium text-black mb-1 font-sansita">Key Achievements:</h5>
                  <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 font-sansita ml-2">
                    {achievements.slice(0, 2).map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-4">
                <h5 className="text-sm font-medium text-black mb-2 font-sansita">Technologies:</h5>
                <div className="flex flex-wrap gap-1">
                  {technologies.slice(0, 4).map((tech, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-200 text-gray-700 font-sansita hover:bg-gray-300 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {technologies.length > 4 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 font-sansita">
                      +{technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {(liveDemo || githubRepo) && (
                <div className="flex gap-2 mt-auto">
                  {liveDemo && (
                    <Button
                      onClick={() => window.open(liveDemo, '_blank', 'noopener,noreferrer')}
                      variant="dark"
                      size="sm"
                      className="flex-1 text-xs"
                    >
                      Live Demo
                    </Button>
                  )}
                  {githubRepo && (
                    <Button
                      onClick={() => window.open(githubRepo, '_blank', 'noopener,noreferrer')}
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
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
