
import { useState, useEffect, useRef } from 'react';

const SECTIONS = ['home', 'about', 'skills', 'experience', 'articles', 'contact'];

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [navOpen, setNavOpen] = useState(false);
  const scrollRafId = useRef(0);
  
  useEffect(() => {
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of SECTIONS) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    // Throttle with a requestAnimationFrame latch: at most one scroll
    // calculation per frame.
    const handleScroll = () => {
      if (scrollRafId.current) return;
      scrollRafId.current = requestAnimationFrame(() => {
        scrollRafId.current = 0;
        updateActiveSection();
      });
    };
    
    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollRafId.current) {
        cancelAnimationFrame(scrollRafId.current);
        scrollRafId.current = 0;
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setNavOpen(false);
    }
  };
  
  return (
    <header className="fixed top-0 w-full z-50 border-b border-cyber-gray bg-cyber-dark/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center h-16" aria-label="Primary">
          <div className="flex items-center">
            <span className="font-mono font-bold text-cyber-blue text-lg mr-2">~/</span>
            <span className="font-mono font-bold">amal_pk</span>
            <span className="animate-terminal-cursor text-cyber-blue ml-1" aria-hidden="true">_</span>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden p-2 text-cyber-blue"
            aria-label="Toggle navigation menu"
            aria-expanded={navOpen}
            aria-controls="mobile-navigation"
          >
            {navOpen ? 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" focusable="false">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg> :
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" focusable="false">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            }
          </button>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-8">
            {SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`nav-link ${
                  activeSection === section ? 'text-cyber-blue' : ''
                }`}
                aria-current={activeSection === section ? 'true' : undefined}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </nav>
        
        {/* Mobile navigation */}
        {navOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden border-t border-cyber-gray py-4 animate-fade-in"
          >
            <div className="flex flex-col space-y-4">
              {SECTIONS.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`nav-link p-2 ${
                    activeSection === section ? 'text-cyber-blue bg-cyber-gray/30' : ''
                  }`}
                  aria-current={activeSection === section ? 'true' : undefined}
                >
                  {">"} {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
