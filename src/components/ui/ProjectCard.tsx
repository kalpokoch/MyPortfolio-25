import React from 'react';
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
  isStatic?: boolean;
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
  // isStatic = false,
  index = 0
}) => {
  return (
    <>
      {/* Animation styles for entrance */}
      <style dangerouslySetInnerHTML={{
        __html: `
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
          .fade-in-up {
            animation: fadeInUp 0.6s ease-out;
            animation-delay: ${index * 0.15}s;
            animation-fill-mode: both;
          }
        `
      }} />
      
      <div 
        className={`bg-white border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300 fade-in-up ${className}`}
      >
        {/* Full Card Content - Always Expanded */}
        <div className="p-5 sm:p-6 md:p-7 lg:p-8">
          {/* Header */}
          <div className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-3xl font-bebas tracking-wider text-black leading-tight">
                  {title}
                </h3>
                <h4 className="text-base sm:text-lg md:text-xl lg:text-3xl font-bebas tracking-wider text-black leading-tight">
                  {subtitle}
                </h4>
              </div>
              {duration && (
                <span className="text-xs text-gray-500 font-sansita bg-gray-100 px-2 py-1 rounded">
                  {duration}
                </span>
              )}
            </div>
            
            <p className="text-xs sm:text-sm lg:text-xl text-gray-600 font-sansita font-medium">
              {category}
            </p>
            
            <div className="w-8 h-0.5 bg-black mt-2"></div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm tracking-wider leading-relaxed text-gray-700 font-sansita">
              {description.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          {achievements && achievements.length > 0 && (
            <div className="mb-4">
              <h5 className="text-xs sm:text-sm lg:text-xl font-medium text-black mb-2 font-sansita">
                Key Achievements:
              </h5>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 font-sansita ml-3">
                {achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          <div className="mb-5">
            <h5 className="text-xs sm:text-sm font-medium text-black mb-2 font-sansita">
              Technologies:
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {technologies.map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-1 text-xs bg-gray-200 text-gray-700 font-sansita hover:bg-gray-300 transition-colors duration-200 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          {(liveDemo || githubRepo) && (
            <div className="flex gap-2">
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
    </>
  );
};

export default ProjectCard;
