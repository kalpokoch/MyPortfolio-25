import React from 'react';
import SectionLayout from '../layouts/SectionLayout';
import ProjectCard from '../ui/ProjectCard';

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  duration?: string;
  description: string[];
  technologies: string[];
  achievements?: string[];
  liveDemo?: string;
  githubRepo?: string;
}

interface ProjectsProps {
  className?: string;
}

const Projects: React.FC<ProjectsProps> = ({ className = '' }) => {
  // Your projects data
  const projects: ProjectData[] = [
    {
      id: "automated-attendance",
      title: "AUTOMATED",
      subtitle: "ATTENDANCE SYSTEM",
      category: "Deep Learning",
      description: [
        "Developed a facial recognition attendance system using Convolutional Neural Networks",
        "Built with a comprehensive custom dataset of 75,000+ facial images for robust training",
        "Implemented real-time face detection and recognition for automated attendance tracking",
        "Integrated with SQL database for efficient attendance record management"
      ],
      technologies: ["PyTorch", "SQL", "ResNet50", "Mediapipe", "Python"],
      achievements: [
        "75,000+ facial images dataset",
        "Real-time processing capability",
        "High accuracy face recognition"
      ],
      liveDemo: "", // Add your demo link
      githubRepo: "" // Add your GitHub repo link
    },
    {
      id: "home-automation",
      title: "HOME",
      subtitle: "AUTOMATION SYSTEM",
      category: "IoT Development",
      description: [
        "Designed a smart IoT system for remote home control using Arduino and GSM modules",
        "Implemented gas detection sensors for safety monitoring and alert systems",
        "Developed mobile control interface for fan and light management",
        "Created automated response system for emergency gas leak detection"
      ],
      technologies: ["Arduino UNO", "GSM Module", "C++", "IoT", "Mobile Interface"],
      achievements: [
        "Remote device control capability",
        "Real-time gas detection",
        "Mobile app integration"
      ],
      liveDemo: "", // Add your demo link
      githubRepo: "" // Add your GitHub repo link
    },
    {
      id: "sign-language-detection",
      title: "SIGN LANGUAGE",
      subtitle: "DETECTION SYSTEM",
      category: "Computer Vision",
      description: [
        "Developed a hand sign detection system using Convolutional Neural Networks",
        "Created and trained on a custom dataset of 30,000+ hand gesture images",
        "Implemented real-time hand tracking and gesture recognition using Mediapipe",
        "Built accessible interface for sign language interpretation and learning"
      ],
      technologies: ["TensorFlow", "CNN", "Mediapipe", "Python", "Computer Vision"],
      achievements: [
        "30,000+ hand gesture dataset",
        "Real-time gesture recognition",
        "Multi-gesture classification"
      ],
      liveDemo: "", // Add your demo link
      githubRepo: "" // Add your GitHub repo link
    }
  ];

  return (
    <div id="PROJECTS" className="relative bg-[#585858]">
      {/* Section Header */}
      <SectionLayout
        sectionNumber="03"
        verticalText="PROJECTS"
        title="MY"
        subtitle="PROJECTS"
        className={`bg-transparent ${className}`}
        variant="default"
      >
        <p className="text-base leading-relaxed text-white font-sansita">
          A collection of projects showcasing my expertise in AI/ML, web development, and IoT systems. 
          Each project demonstrates practical application of modern technologies and problem-solving skills.
        </p>
      </SectionLayout>

      {/* Projects Grid - Outside SectionLayout */}
      <div className="bg-gray-100 py-16 md:py-20 lg:py-24">
        <div className="px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                subtitle={project.subtitle}
                category={project.category}
                duration={project.duration}
                description={project.description}
                technologies={project.technologies}
                achievements={project.achievements}
                liveDemo={project.liveDemo}
                githubRepo={project.githubRepo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
