import React from 'react';
import SectionLayout from '../layouts/SectionLayout';
import EducationLogoLoop from '../ui/EducationLogoLoop';
import VerticalExpandCards from '../ui/VerticalExpandCards';

// Skills data matching your original SkillsGrid
const skillsData = [
  { name: "Python", percentage: 90, category: "Language" },
  { name: "HTML", percentage: 85, category: "Language" },
  { name: "CSS", percentage: 85, category: "Language" },
  { name: "JavaScript", percentage: 85, category: "Language" },
  { name: "TypeScript", percentage: 80, category: "Language" },
  { name: "C", percentage: 87, category: "Language" },
  { name: "C++", percentage: 80, category: "Language" },
  { name: "React", percentage: 85, category: "Framework" },
  { name: "PyTorch", percentage: 85, category: "AI/ML" },
  { name: "Deep Learning", percentage: 85, category: "AI/ML" },
  { name: "Git", percentage: 90, category: "Tool" },
  { name: "Docker", percentage: 70, category: "Tool" },
  { name: "MongoDB", percentage: 75, category: "Database" },
  { name: "Node.js", percentage: 80, category: "Backend" },
];

// Education and Certification data
const educationData = [
  {
    id: 1,
    title: "B.Tech in Computer Science and Engineering",
    institution: "Central Institute of Technology Kokrajhar (CIT)",
    duration: "2021 - 2025",
    detail: "CGPA: 7.33"
  },
  {
    id: 2,
    title: "Higher Secondary in Science Stream",
    institution: "Kokrajhar Government College",
    duration: "2019 - 2021",
    detail: "Percentage: 78%"
  }
];

const certificationData = [
  {
    id: 1,
    title: "Fundamentals of Deep Learning",
    institution: "NVIDIA",
    duration: "Dec 2025",
    // detail: "Grade 'A'"
  },
  {
    id: 2,
    title: "Certificate in Feature Engineering",
    institution: "Kaggle",
    duration: "Dec 2025",
    // detail: "Grade 'A'"
  },
  {
    id: 3,
    title: "AI & Machine Learning using Python",
    institution: "National Institute of Electronics & Information",
    duration: "June-July 2023",
    detail: ""
  },
  {
    id: 4,
    title: "Certificate in Computer Applications (CCA)",
    institution: "Assam Electronics Development Corporation LTD",
    duration: "May-July 2019",
    detail: "Grade 'A'"
  },

];

// Mapping logos to skill data
const educationalLogos = [
  {
    src: "https://cdn.simpleicons.org/github/000000",
    alt: "GitHub",
    skillData: skillsData.find(skill => skill.name === "Git")
  },
  {
    src: "https://cdn.simpleicons.org/docker/000000",
    alt: "Docker",
    skillData: skillsData.find(skill => skill.name === "Docker")
  },
  {
    src: "https://cdn.simpleicons.org/python/000000",
    alt: "Python",
    skillData: skillsData.find(skill => skill.name === "Python")
  },
  {
    src: "https://cdn.simpleicons.org/react/000000",
    alt: "React",
    skillData: skillsData.find(skill => skill.name === "React")
  },
  {
    src: "https://cdn.simpleicons.org/typescript/000000",
    alt: "TypeScript",
    skillData: skillsData.find(skill => skill.name === "TypeScript")
  },
  {
    src: "https://cdn.simpleicons.org/nodedotjs/000000",
    alt: "Node.js",
    skillData: skillsData.find(skill => skill.name === "Node.js")
  },
  {
    src: "https://cdn.simpleicons.org/javascript/000000",
    alt: "JavaScript",
    skillData: skillsData.find(skill => skill.name === "JavaScript")
  },
  {
    src: "https://cdn.simpleicons.org/pytorch/000000",
    alt: "PyTorch",
    skillData: skillsData.find(skill => skill.name === "PyTorch")
  },
  {
    src: "https://cdn.simpleicons.org/tensorflow/000000",
    alt: "TensorFlow",
    skillData: skillsData.find(skill => skill.name === "Deep Learning")
  },
  {
    src: "https://cdn.simpleicons.org/arduino/000000",
    alt: "Arduino",
    skillData: skillsData.find(skill => skill.name === "C++")
  },
  {
    src: "https://cdn.simpleicons.org/mongodb/000000",
    alt: "MongoDB",
    skillData: skillsData.find(skill => skill.name === "MongoDB")
  },
  {
    src: "https://cdn.simpleicons.org/openapiinitiative/000000",
    alt: "API",
    skillData: skillsData.find(skill => skill.name === "Node.js")
  },
];

interface EducationProps {
  className?: string;
}

const Education: React.FC<EducationProps> = ({ className = '' }) => {
  return (
    <div id='EDUCATION' className={`w-full flex flex-col overflow-hidden ${className}`} style={{ height: '100vh', position: 'relative' }}>
      <div className="flex-1 min-h-0 pb-24">
        <SectionLayout
          sectionNumber="04"
          verticalText="Education"
          title="Skills &"
          subtitle="foundation"
          className="bg-transparent text-black h-full flex items-center"
          variant="image-right"
          imageComponent={
            <VerticalExpandCards
              educationData={educationData}
              certificationData={certificationData}
            />
          }
        >
          <div className="space-y-2">
            <h4 className="text-lg font-bebas tracking-wider text-black">
              Interactive Skills
            </h4>
            <p className="text-gray-600 font-sansita tracking-wider">
              Hover over the technologies below to see proficiency levels
            </p>
            
            <h4 className="text-lg font-bebas tracking-wider text-black mt-8">
              Continuous Learning
            </h4>
            <p className="text-gray-700 font-sansita tracking-wider leading-relaxed">
              My educational journey combines formal computer science foundations with 
              hands-on project experience across web development, machine learning, and 
              modern software engineering practices.
            </p>
            
            <h4 className="text-lg font-bebas tracking-wider text-black mt-8">
              Technical Expertise
            </h4>
            <p className="text-gray-700 font-sansita leading-relaxed tracking-wider">
              Proficient in multiple programming languages and frameworks, with specialized 
              knowledge in AI/ML technologies and full-stack development.
            </p>
          </div>
        </SectionLayout>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-300 px-4 py-3 shadow-inner"
        style={{ height: 72 }}
      >
        <EducationLogoLoop
          logos={educationalLogos}
          speed={60}
          direction="left"
          gap={48}
          logoHeight={40}
          pauseOnHover={true}
          fadeOut={true}
          scaleOnHover={true}
          className="simpleicons-monochrome"
        />
      </div>
    </div>
  );
};

export default Education;
