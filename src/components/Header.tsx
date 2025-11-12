import React, { useState, useEffect } from 'react';
import { Home, Briefcase, Folder, Code, Mail, Download } from 'lucide-react';


interface NavItem {
  id: string;
  label: string;
  number: string;
}


interface HeaderProps {
  currentSection?: string;
  onSectionChange?: (sectionId: string) => void;
  disableSnap?: (duration?: number) => void;
}


const iconMap: Record<string, React.ElementType> = {
  '01': Home,
  '02': Briefcase,
  '03': Folder,
  '04': Code,
  '05': Mail,
};


const Header: React.FC<HeaderProps> = ({
  currentSection = '01',
  onSectionChange,
  disableSnap
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);


  const navItems: NavItem[] = [
    { id: '01', label: 'INTRODUCE', number: '01' },
    { id: '02', label: 'EXPERIENCE', number: '02' },
    { id: '03', label: 'PROJECTS', number: '03' },
    { id: '04', label: 'EDUCATION', number: '04' },
    { id: '05', label: 'CONTACT', number: '05' }
  ];


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const handleNavClick = (sectionId: string) => {
    console.log(`Navigating to section: ${sectionId}`);
    
    disableSnap?.(1200);
    
    const sectionMap: Record<string, string> = {
      '01': 'INTRODUCE',
      '02': 'EXPERIENCE', 
      '03': 'PROJECTS',
      '04': 'EDUCATION',
      '05': 'CONTACT'
    };


    const elementId = sectionMap[sectionId];
    console.log(`Looking for element with ID: ${elementId}`);
    
    const element = document.getElementById(elementId);
    
    if (element) {
      console.log(`Found element, scrolling...`);
      
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
      
    } else {
      console.warn(`Element with ID '${elementId}' not found in DOM`);
      
      const fallbackElement = document.querySelector(`[data-section="${sectionId}"]`);
      if (fallbackElement) {
        fallbackElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start' 
        });
      }
    }


    onSectionChange?.(sectionId);
    setIsMenuOpen(false);
  };


  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'KalpojyotiKoch.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsAtTop(scrollPosition < 50);
    };


    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const sectionMap: Record<string, string> = {
        '01': 'INTRODUCE',
        '02': 'EXPERIENCE',
        '03': 'PROJECTS',
        '04': 'EDUCATION',
        '05': 'CONTACT'
      };


      const sections = Object.entries(sectionMap)
        .map(([id, elementId]) => ({
          id,
          element: document.getElementById(elementId)
        }))
        .filter(section => section.element);


      if (sections.length === 0) return;


      const scrollPosition = window.scrollY + (window.innerHeight / 2);


      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          if (currentSection !== section.id) {
            onSectionChange?.(section.id);
          }
          break;
        }
      }
    };


    window.addEventListener('scroll', handleScroll);
    handleScroll();


    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection, onSectionChange]);


  return (
    <>
      {/* Header Bar (desktop/tablet only) */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-transparent hidden md:block">
        <div className="flex items-center px-8 py-4">
          {/* Logo */}
          <div
            className={`text-2xl text-black font-bebas tracking-wider transition-opacity duration-200 ${
              isAtTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            KALPO
          </div>


          {/* Right side - Resume button and Hamburger menu */}
          <div className={`flex items-center ml-auto transition-all duration-300 ${
            isAtTop ? 'space-x-6' : 'space-x-3'
          }`}>
            {/* Resume Download Button */}
            <button
              onClick={handleResumeDownload}
              className="flex items-center overflow-hidden text-black font-bebas text-sm tracking-wider transition-all duration-300"
              aria-label="Download Resume"
            >
              <Download 
                size={16} 
                strokeWidth={2} 
                className="flex-shrink-0"
              />
              <span
                className={`ml-2 transition-all duration-300 whitespace-nowrap ${
                  isAtTop 
                    ? 'opacity-100 max-w-[100px]' 
                    : 'opacity-0 max-w-0 ml-0'
                }`}
              >
                RESUME
              </span>
            </button>


            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="relative w-8 h-8 flex flex-col justify-center items-center space-y-1.5 z-60 transition-all duration-300 ease-in-out flex-shrink-0"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>


      {/* Overlay (desktop/tablet only) */}
      <div
        className={`hidden md:block fixed inset-0 bg-black bg-opacity-50 z-[90] transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleMenu}
      />


      {/* Side Navigation Menu (desktop/tablet only) */}
      <nav
        className={`hidden md:block fixed top-0 right-0 h-full w-80 bg-[#DBDBDB] shadow-2xl z-[100] transform transition-transform duration-600 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col justify-center items-center h-full px-8 space-y-12">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`cursor-pointer group transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-white/20 rounded-lg p-2 ${
                currentSection === item.id ? 'scale-105' : ''
              }`}
              style={{
                animationDelay: isMenuOpen ? `${index * 100}ms` : '0ms'
              }}
              aria-label={`Navigate to ${item.label}`}
            >
              <div className="flex items-center space-x-6">
                <div
                  className={`text-6xl font-light font-bebas leading-none transition-all duration-300 ${
                    currentSection === item.id
                      ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] filter blur-[0.5px]'
                      : 'text-black opacity-60 group-hover:opacity-100'
                  }`}
                >
                  {item.number}
                </div>


                <div
                  className={`w-px h-16 transition-all duration-300 ${
                    currentSection === item.id
                      ? 'bg-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]'
                      : 'bg-black opacity-60 group-hover:opacity-100'
                  }`}
                />


                <div
                  className={`text-lg font-medium font-bebas tracking-widest transition-all duration-300 ${
                    currentSection === item.id
                      ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]'
                      : 'text-black opacity-60 group-hover:opacity-100'
                  }`}
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: 'rotate(180deg)'
                  }}
                >
                  {item.label}
                </div>
              </div>


              <div
                className={`mt-4 h-0.5 bg-black transition-all duration-300 ease-in-out ${
                  currentSection === item.id
                    ? 'w-full bg-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                    : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          ))}
        </div>
      </nav>


      {/* Mobile bottom navigation (mobile only) */}
      <nav
        aria-label="Primary"
        role="tablist"
        className="fixed bottom-0 left-0 right-0 z-[60] md:hidden pointer-events-auto"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="mx-auto max-w-screen-sm border-t border-black/10 bg-[#585858] backdrop-blur supports-[backdrop-filter]:bg-[#585858]/95 shadow-[0_-2px_8px_rgba(0,0,0,0.15)]">
          <ul className="grid grid-cols-6 gap-0">
            {navItems.map((item) => {
              const Icon = iconMap[item.id];
              const active = currentSection === item.id;
              return (
                <li key={item.id} role="presentation">
                  <button
                    role="tab"
                    aria-selected={active}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => handleNavClick(item.id)}
                    className={`h-14 w-full flex items-center justify-center
                      transition-all duration-200 ease-in-out
                      focus:outline-none
                      touch-manipulation pointer-events-auto relative
                      ${active 
                        ? 'text-white' 
                        : 'text-white/60 active:text-white/80'
                      }`}
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation'
                    }}
                  >
                    <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                    {active && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                    )}
                  </button>
                </li>
              );
            })}
            
            {/* Mobile Resume Download Button */}
            <li role="presentation">
              <button
                onClick={handleResumeDownload}
                className="h-14 w-full flex items-center justify-center
                         transition-all duration-200 ease-in-out
                         focus:outline-none
                         touch-manipulation pointer-events-auto text-white/60 active:text-white/80"
                style={{
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}
                aria-label="Download Resume"
              >
                <Download size={20} strokeWidth={2} />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};


export default Header;
