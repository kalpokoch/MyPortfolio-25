import React, { useState, useEffect } from 'react';

interface NavItem {
  id: string;
  label: string;
  number: string;
}

interface HeaderProps {
  currentSection?: string;
  onSectionChange?: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentSection = '01', 
  onSectionChange 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const navItems: NavItem[] = [
    { id: '01', label: 'INTRODUCE', number: '01' },
    { id: '02', label: 'EXPERIENCE', number: '02' },
    { id: '03', label: 'PROJECTS', number: '03' },
    { id: '04', label: 'SKILLS', number: '04' },
    { id: '05', label: 'CONTACT', number: '05' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (sectionId: string) => {
    onSectionChange?.(sectionId);
    setIsMenuOpen(false); // Close menu after selection
  };

  // Logo visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsAtTop(scrollPosition < 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section detection on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Map section IDs to their corresponding DOM element IDs
      const sectionMap = {
        '01': 'hero',
        '02': 'experience',
        '03': 'projects', // Add these as you create the sections
        '04': 'skills',
        '05': 'contact'
      };

      const sections = Object.entries(sectionMap).map(([id, elementId]) => ({
        id,
        element: document.getElementById(elementId)
      })).filter(section => section.element); // Only include sections that exist

      if (sections.length === 0) return;

      const scrollPosition = window.scrollY + (window.innerHeight / 2);

      // Find the current section (iterate from bottom to top)
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

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Check initial position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection, onSectionChange]);

  return (
    <>
      {/* Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="flex justify-between items-center px-8 py-4">
          {/* Logo */}
          <div className={`text-2xl text-black font-bebas tracking-wider transition-opacity duration-200 ${
            isAtTop ? 'opacity-100' : 'opacity-0'
          }`}>
            KALPO
          </div>
          
          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="relative w-8 h-8 flex flex-col justify-center items-center space-y-1.5 z-60 transition-all duration-300 ease-in-out"
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
      </header>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleMenu}
      />

      {/* Side Navigation Menu */}
      <nav 
        className={`fixed top-0 right-0 h-full w-80 bg-[#DBDBDB] shadow-2xl z-50 transform transition-transform duration-600 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col justify-center items-center h-full px-8 space-y-12">
          {navItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`cursor-pointer group transition-all duration-300 ease-in-out transform hover:scale-105 ${
                currentSection === item.id ? 'scale-105' : ''
              }`}
              style={{
                animationDelay: isMenuOpen ? `${index * 100}ms` : '0ms'
              }}
            >
              {/* Navigation Item Container */}
              <div className="flex items-center space-x-6">
                {/* Section Number */}
                <div 
                  className={`text-6xl font-light font-bebas leading-none transition-all duration-300 ${
                    currentSection === item.id 
                      ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] filter blur-[0.5px]' 
                      : 'text-black opacity-60 group-hover:opacity-100'
                  }`}
                >
                  {item.number}
                </div>
                
                {/* Vertical Line */}
                <div 
                  className={`w-px h-16 transition-all duration-300 ${
                    currentSection === item.id 
                      ? 'bg-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]' 
                      : 'bg-black opacity-60 group-hover:opacity-100'
                  }`}
                />
                
                {/* Section Label */}
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
              
              {/* Hover Effect Line */}
              <div 
                className={`mt-4 h-0.5 bg-black transition-all duration-300 ease-in-out ${
                  currentSection === item.id 
                    ? 'w-full bg-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]' 
                    : 'w-0 group-hover:w-full'
                }`}
              />
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Header;
