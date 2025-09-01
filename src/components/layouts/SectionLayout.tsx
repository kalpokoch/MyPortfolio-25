import React from 'react';

interface SectionLayoutProps {
  sectionNumber: string;
  verticalText: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({
  sectionNumber,
  verticalText,
  title,
  subtitle,
  children,
  className = '',
  backgroundImage
}) => {
  return (
    <section className={`relative min-h-screen flex items-center bg-gray-100 overflow-hidden ${className}`}>
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-10">
          <img 
            src={backgroundImage} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-8">
        <div className="flex items-start gap-12">
          {/* Left side - Number, Vertical Line, and Vertical Text */}
          <div className="flex flex-col items-center">
            {/* Section Number */}
            <div className="text-8xl font-light text-black opacity-80 leading-none mb-8 font-bebas">
              {sectionNumber}
            </div>
            
            {/* Vertical Line */}
            <div className="w-px h-32 bg-black mb-8"></div>
            
            {/* Vertical Text */}
            <div 
              className="text-sm font-medium tracking-widest text-black font-bebas"
              style={{ 
                writingMode: 'vertical-rl', 
                textOrientation: 'mixed',
                transform: 'rotate(180deg)' 
              }}
            >
              {verticalText}
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1 max-w-2xl">
            {/* Title */}
            <h1 className="text-5xl font-normal text-black leading-tight mb-2 tracking-tight font-bebas">
              {title}
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-5xl font-light text-black leading-tight mb-8 tracking-tight font-bebas">
              {subtitle}
            </h2>
            
            {/* Divider */}
            <div className="w-20 h-1 bg-black mb-8"></div>
            
            {/* Dynamic Content */}
            <div className="max-w-xl space-y-6 font-sansita">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionLayout;
