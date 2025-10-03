import React from 'react';
import SectionLayout from '../layouts/SectionLayout';
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";


interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  hoverColor: string;
}


const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    icon: <FaGithub className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />,
    url: "https://github.com/kalpokoch", // Add your GitHub URL here
    hoverColor: "#333333"
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />,
    url: "https://www.linkedin.com/in/kalpo07/", // Add your LinkedIn URL here
    hoverColor: "#0A66C2"
  },
  {
    name: "Gmail",
    icon: <SiGmail className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />,
    url: "", // Add your Gmail URL here (mailto:your@email.com)
    hoverColor: "#EA4335"
  },
  {
    name: "Instagram",
    icon: <FaInstagram className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />,
    url: "", // Add your Instagram URL here
    hoverColor: "#E4405F"
  }
];


interface ContactProps {
  className?: string;
}


const Contact: React.FC<ContactProps> = ({ className = '' }) => {
  return (
    <div id='CONTACT' className={`w-full ${className}`}>
      <SectionLayout
        sectionNumber="05"
        verticalText="Contact"
        title="Get in"
        subtitle="touch"
        className="text-white !bg-[#585858]"
        variant="image-right"
        imageComponent={
          <div className="flex items-center justify-center h-full">
            <div className="grid grid-cols-2 gap-8 md:gap-10 lg:gap-12">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center p-6 md:p-8 transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                  style={{ color: "#FFF" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = social.hoverColor }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#FFF" }}
                >
                  {social.icon}
                  <span className="mt-3 md:mt-4 text-sm md:text-base font-bebas tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        }
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-lg font-bebas tracking-wider text-white mb-2">
              Let's Connect
            </h4>
            <p className="text-gray-300 font-sansita tracking-wider leading-relaxed">
              I'm always interested in hearing about new opportunities, 
              collaborations, or just having a chat about technology and innovation.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bebas tracking-wider text-white mb-2">
              Available For
            </h4>
            <p className="text-gray-300 font-sansita tracking-wider leading-relaxed">
              Full-time positions, freelance projects, consulting work, 
              and open-source collaborations in web development and machine learning.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bebas tracking-wider text-white mb-2">
              Quick Response
            </h4>
            <p className="text-gray-300 font-sansita tracking-wider leading-relaxed">
              Feel free to reach out through any of the platforms. 
              I typically respond within 24-48 hours.
            </p>
          </div>
        </div>
      </SectionLayout>
    </div>
  );
};


export default Contact;
