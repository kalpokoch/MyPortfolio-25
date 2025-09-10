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
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 ${className}`}>
      {/* Card Header */}
      <div className="mb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bebas tracking-wider text-black leading-tight">
              {title}
            </h3>
            <h4 className="text-xl md:text-2xl lg:text-3xl font-bebas tracking-wider text-black leading-tight">
              {subtitle}
            </h4>
          </div>
          {duration && (
            <span className="text-xs text-gray-500 font-sansita bg-gray-100 px-2 py-1 rounded">
              {duration}
            </span>
          )}
        </div>
        
        <p className="text-sm md:text-base text-gray-600 font-sansita font-medium">
          {category}
        </p>
        
        <div className="w-12 h-1 bg-black mt-3 mb-4"></div>
      </div>


      {/* Description */}
      <div className="mb-4">
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base leading-relaxed text-gray-700 font-sansita">
          {description.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
      </div>


      {/* Key Achievements */}
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


      {/* Technologies */}
      <div className="mb-6">
        <h5 className="text-sm font-medium text-black mb-2 font-sansita">Technologies Used:</h5>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full font-sansita hover:bg-gray-300 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>


      {/* Action Buttons */}
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
  );
};

export default ProjectCard;