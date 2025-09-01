import React, { useRef, useEffect, useState } from 'react';

interface SectionLayoutProps {
  sectionNumber: string;
  verticalText: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({
  sectionNumber,
  verticalText,
  title,
  subtitle,
  children,
  className = ''
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, [children]);

  return (
    <section className={`relative min-h-screen flex items-center bg-gray-100 overflow-hidden ${className}`}>
      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-8">
        <div className="flex gap-12 items-start">
          {/* Left sidebar - Number, Line, and Vertical Text */}
          <div 
            className="flex flex-col items-center justify-between"
            style={{ height: `${contentHeight}px`, minHeight: '200px' }}
          >
            {/* Section Number aligned with title top */}
            <div className="text-8xl font-light text-[#DBDBDB] opacity-80 leading-none font-bebas flex-shrink-0">
              {sectionNumber}
            </div>
            
            {/* Vertical Line - grows to fill space */}
            <div className="w-px bg-black flex-1 my-8 min-h-[4rem]"></div>
            
            {/* Vertical Text aligned with content bottom */}
            <div 
              className="text-sm font-medium tracking-widest text-black font-bebas lg:text-3xl flex-shrink-0"
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
          <div ref={contentRef} className="flex-1 max-w-2xl">
            {/* Title */}
            <h1 className="text-4xl font-normal text-black leading-tight tracking-wide font-bebas">
              {title}
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-4xl font-light text-black leading-tight mb-8 tracking-tight font-bebas">
              {subtitle}
            </h2>
            
            {/* Divider */}
            <div className="w-20 h-2 bg-black lg:mb-[60px]"></div>
            
            {/* Dynamic Content */}
            <div className="max-w-[450px] tracking-wider space-y-6 font-sansita">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionLayout;