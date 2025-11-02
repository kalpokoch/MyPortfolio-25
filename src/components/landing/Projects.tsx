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
      id: "screener",
      title: "Respiratory Screener",
      subtitle: "NIELIT",
      category: "Deep Learning",
      description: [
        "Built multi-label CNN for respiratory symptom detection from cough audio",
        "Applied Focal Loss and custom oversampling to handle 66% class imbalance",
        "Deployed CPU-optimized model with 60% parameter reduction",
        "Achieved 5-10x training speedup via pre-processed mel spectrograms"
      ],
      technologies: ["Docker", " Librosa", "PyTorch Lightning", "FastAPI", "Python"],
      achievements: [
        "K-fold validation with per-symptom threshold optimization",
        "SpecAugment with time/frequency masking for data augmentation",
        "Multi-label classification across 6 symptom categories"
      ],
      liveDemo: "https://respiratoryscreener.netlify.app/",
      githubRepo: "https://github.com/kalpokoch/breath-wise-scan"
    },
    {
      id: "chatbot",
      title: "Rag Based chatbot",
      subtitle: "NEEPCO's DOP",
      category: "Transformers",
      description: [
        "Developed a RAG based chatbot to help employees answer DOP queries",
        "Fine Tuned the Base TinyLlama on our custom dataset using Kaggle",
        "Integrated with ChromaDB for semantic search & context retrieval",
        "End-to-end deployment with FastAPI + Docker on Hugging Face Spaces (free tier)"
      ],
      technologies: ["Docker", "Hugging Face", "ChromaDB", "FastAPI", "Python"],
      achievements: [
        "Quantized LLM (TinyLlama, GGUF) enabling CPU-only inference",
        "ChromaDB-powered semantic search",
        "reference-backed answers"
      ],
      liveDemo: "https://neepcodop.netlify.app/",
      githubRepo: "https://github.com/kalpokoch/RAG-based-Chatbot-for-Delegation-of-power-DOP-NEEPCO"
    },
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
      liveDemo: undefined,
      githubRepo: undefined
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
      ],
      liveDemo: undefined,
      githubRepo: "https://github.com/kalpokoch/Smart-Home-Automation"
    },
    {
      id: "Suzoco",
      title: "Landing Page",
      subtitle: "SUZOCO services PVT LTD.",
      category: "Web Development",
      description: [
        "Led the end-to-end development of Suzoco Services Pvt Ltd. landing page",
        "a business consultancy and SaaS platform built with React, Vite, and TypeScript",
        "This project showcases a modern, scalable, and type-safe web application",
        "tailored for entrepreneurs, SMEs, and franchise partners"
      ],
      technologies: ["React", "TypeScript", "TailWind CSS", "Vite", "NodeJS"],
      achievements: [
        "Visually appealing and responsive UI",
        "SEO and mobile optimized",
        "Team collaboration with Git and GitHub version control"
      ],
      liveDemo: "https://suzocoservices.in/",
      githubRepo: "https://github.com/ZCSasia/SuzocoLandingPageFrontend"
    },
  ];

  // Updated Projects stack - removed height constraints, full width
  const ProjectsStack = (
    <div className="space-y-6 w-full">
      {projects.map((project, index) => (
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
          isStatic={true}
          index={index}
        />
      ))}
    </div>
  );

  return (
    <div id="PROJECTS" className="relative bg-[#585858]">
      <SectionLayout
        sectionNumber="03"
        verticalText="PROJECTS"
        title="MY"
        subtitle="INVENTORY"
        className={`bg-transparent ${className}`}
        variant="image-right-stack"
        imageComponent={ProjectsStack}
      >
        <p className="text-base leading-relaxed text-white font-sansita">
          Real projects. Real experience. A collection spanning AI/ML applications, scalable web platforms,
          and IoT systems built to solve genuine problems using modern technologies and best practices
        </p>
      </SectionLayout>
    </div>
  );
};

export default Projects;
