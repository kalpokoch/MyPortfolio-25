import React, { useRef, useEffect, useState } from 'react';

type LayoutVariant = 'default' | 'image-center' | 'image-right';

interface SectionLayoutProps {
  sectionNumber: string;
  verticalText: string;
  title: string;
  subtitle: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  variant?: LayoutVariant;
  imageComponent?: React.ReactNode;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({
  sectionNumber,
  verticalText,
  title,
  subtitle,
  children,
  className = '',
  variant = 'default',
  imageComponent
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
  }, [children, variant, imageComponent]);

  const renderLayout = () => {
    const sidebarContent = (
      <div 
        className="flex flex-col items-center justify-between flex-shrink-0"
        style={{ height: `${contentHeight}px`, minHeight: '200px' }}
      >
        {/* Section Number */}
        <div className="text-6xl sm:text-7xl md:text-9xl font-light text-[#DBDBDB] lg:mt-[-8px] opacity-80 leading-none font-bebas flex-shrink-0">
          {sectionNumber}
        </div>
        
        {/* Vertical Line */}
        <div className="w-px bg-black flex-1 my-6 sm:my-7 md:my-8 min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem]"></div>
        
        {/* Vertical Text */}
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
    );

    const textContent = (
      <div ref={contentRef} className="flex-1 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-black leading-tight tracking-wider font-bebas">
          {title}
        </h1>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-black leading-tight mb-6 sm:mb-7 md:mb-8 tracking-wider font-bebas">
          {subtitle}
        </h2>
        
        <div className="w-16 sm:w-18 md:w-20 h-1.5 sm:h-2 bg-black mb-8 sm:mb-10 md:mb-12"></div>
        
        <div className="max-w-xs sm:max-w-sm md:max-w-md tracking-wider space-y-4 sm:space-y-5 md:space-y-8 font-sansita text-sm sm:text-base lg:mt-[97px]">
          {children}
        </div>
      </div>
    );

    const imageElement = imageComponent && (
      <div className="flex-shrink-0 hidden md:block border">
        <div className="w-64 md:w-72 lg:w-80 xl:w-[520px] h-64 md:h-72 lg:h-80 xl:h-auto lg:mt-0 flex items-center justify-center">
          {imageComponent}
        </div>
      </div>
    );

    switch (variant) {
      case 'image-center':
        return (
          <>
            {sidebarContent}
            {imageElement}
            {textContent}
          </>
        );
      
      case 'image-right':
        return (
          <>
            {sidebarContent}
            {textContent}
            {imageElement}
          </>
        );
      
      case 'default':
      default:
        return (
          <>
            {sidebarContent}
            {textContent}
          </>
        );
    }
  };

  const getFlexGap = () => {
    switch (variant) {
      case 'image-center':
      case 'image-right':
        return 'gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12';
      default:
        return 'gap-6 sm:gap-8 md:gap-10 lg:gap-12';
    }
  };

  return (
    <section className={`relative min-h-screen flex items-center bg-gray-100 overflow-hidden ${className}`}>
      <div className="relative z-20 w-full pl-8 pr-8 sm:pl-12 sm:pr-12 md:pl-16 md:pr-16 lg:pl-20 lg:pr-20 xl:pl-24 xl:pr-24">
        {/* Mobile Layout - Stack vertically on small screens for image variants */}
        <div className="md:hidden">
          <div className="flex gap-6 sm:gap-8 items-start">
            <div 
              className="flex flex-col items-center justify-between flex-shrink-0"
              style={{ height: `${contentHeight}px`, minHeight: '200px' }}
            >
              <div className="text-6xl sm:text-7xl font-light text-[#DBDBDB] opacity-80 leading-none font-bebas flex-shrink-0">
                {sectionNumber}
              </div>
              <div className="w-px bg-black flex-1 my-6 sm:my-7 min-h-[3rem] sm:min-h-[3.5rem]"></div>
              <div 
                className="text-xs sm:text-sm font-medium tracking-widest text-black font-bebas flex-shrink-0"
                style={{ 
                  writingMode: 'vertical-rl', 
                  textOrientation: 'mixed',
                  transform: 'rotate(180deg)' 
                }}
              >
                {verticalText}
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-normal text-black leading-tight tracking-wider font-bebas">
                {title}
              </h1>
              <h2 className="text-2xl sm:text-3xl font-normal text-black leading-tight mb-6 sm:mb-7 tracking-wider font-bebas">
                {subtitle}
              </h2>
              <div className="w-16 sm:w-18 h-1.5 sm:h-2 bg-black mb-8 sm:mb-10"></div>
              
              {/* Mobile Image */}
              {imageComponent && (
                <div className="mb-6 sm:mb-8 flex justify-center">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                    {imageComponent}
                  </div>
                </div>
              )}
              
              <div className="max-w-xs sm:max-w-sm tracking-wider space-y-4 sm:space-y-5 font-sansita text-sm sm:text-base">
                {children}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className={`hidden md:flex ${getFlexGap()} items-start max-w-none`}>
          {renderLayout()}
        </div>
      </div>
    </section>
  );
};

export default SectionLayout;
