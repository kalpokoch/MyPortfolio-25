import React, { useRef, useEffect, useState } from 'react';

interface SectionLayoutProps {
  sectionNumber: string;
  verticalText: string;
  title: string;
  subtitle: string | React.ReactNode;
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
      <div className="relative z-20 w-full pl-8 pr-8 sm:pl-12 sm:pr-12 md:pl-16 md:pr-16 lg:pl-20 lg:pr-20 xl:pl-24 xl:pr-24">
        <div className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start max-w-none ">
          {/* Left sidebar - Number, Line, and Vertical Text */}
          <div 
            className="flex flex-col items-center justify-between flex-shrink-0"
            style={{ height: `${contentHeight}px`, minHeight: '200px' }}
          >
            {/* Section Number aligned with title top */}
            <div className="text-6xl sm:text-7xl md:text-9xl font-light text-[#DBDBDB] lg:mt-[-8px] opacity-80 leading-none font-bebas flex-shrink-0">
              {sectionNumber}
            </div>
            
            {/* Vertical Line - grows to fill space */}
            <div className="w-px bg-black flex-1 my-6 sm:my-7 md:my-8 min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem]"></div>
            
            {/* Vertical Text aligned with content bottom */}
            <div 
              className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-3xl font-medium tracking-widest text-black font-bebas flex-shrink-0"
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
          <div ref={contentRef} className="flex-1 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-black leading-tight tracking-wider font-bebas">
              {title}
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-black leading-tight mb-6 sm:mb-7 md:mb-8 tracking-wider font-bebas">
              {subtitle}
            </h2>
            
            {/* Divider */}
            <div className="w-16 sm:w-18 md:w-20 h-1.5 sm:h-2 bg-black mb-8 sm:mb-10 md:mb-12"></div>
            
            {/* Dynamic Content */}
            <div className="max-w-xs sm:max-w-sm md:max-w-md tracking-wider space-y-4 sm:space-y-5 md:space-y-8 font-sansita text-sm sm:text-base lg:mt-[97px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionLayout;
