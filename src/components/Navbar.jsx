import React, { useState, useCallback, useMemo } from "react";

import { useTheme } from "../context/Themecontext";
import { Link } from "react-scroll";

const Navbar = ({ tabs = ["Home", "About", "Skills", "Projects", "Contact"] }) => {
  const { theme, setTheme } = useTheme();
  const [isActiveBtn, setisActiveBtn] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Memoize tabs to prevent recreation
  const memoizedTabs = useMemo(() => tabs, [tabs]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleTabClick = useCallback((tab) => {
    setisActiveBtn(tab);
  }, []);

  const handleThemeChange = useCallback((e) => {
    setTheme(e.target.value);
  }, [setTheme]);

  const handleMobileTabClick = useCallback((tab) => {
    setisActiveBtn(tab);
    closeMobileMenu();
  }, [closeMobileMenu]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[9999] px-4 md:px-48 flex bg-bg bg-opacity-95 backdrop-blur-sm justify-between items-center p-2 text-white shadow-xl border-b border-border/20">
        
        {/* Logo */}
        <div className="text-xl font-bold text-white bg-border p-2 md:p-4 border rounded-b-lg hover:cursor-pointer hover:scale-105 transition-transform">MB</div>
         
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center px-8 py-3 rounded-3xl border-2 border-border text-lg bg-bg/50 backdrop-blur-sm shadow-lg shadow-border/10">
          {memoizedTabs.map((tab, index) => (
            <NavbarItem 
              key={index}  
              label={tab}
              isActive={isActiveBtn === tab}
              onClick={() => handleTabClick(tab)}
            />
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <select
            value={theme}
            onChange={handleThemeChange}
            className="px-2 py-1 text-diffcolor rounded-lg bg-bg border-2 border-border text-sm hover:border-border/80 transition-colors"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="blue">Blue</option>
          </select>
          
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-white hover:text-border transition-all duration-300 bg-border/20 rounded-lg hover:bg-border/40 hover:scale-110"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Theme Selector */}
        <select
          value={theme}
          onChange={handleThemeChange}
          className="hidden md:block px-4 py-2 text-diffcolor rounded-lg ml-4 bg-bg border-2 border-border hover:border-border/80 transition-colors"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="blue">Blue</option>
        </select>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-gradient-to-br from-bg via-bg/95 to-border/10 backdrop-blur-md z-[9998] animate-fadeIn">
          {/* Close button */}
          <button
            onClick={closeMobileMenu}
            className="absolute top-4 right-4 p-2 text-white hover:text-border transition-all duration-300 bg-border/20 rounded-full hover:bg-border/40 hover:scale-110 z-50"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Menu content */}
          <div className="flex flex-col items-center justify-center h-full space-y-6 px-4">
            {/* Menu title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-border mb-2">Menu</h2>
              <div className="w-16 h-1 bg-border rounded-full mx-auto"></div>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col items-center space-y-6 w-full max-w-sm">
              {memoizedTabs.map((tab, index) => (
                <Link
                  key={index}
                  to={`${tab.toLowerCase()}`}
                  smooth={true}
                  duration={500}
                  className={`w-full text-center py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                    isActiveBtn === tab 
                      ? "bg-border text-white shadow-lg shadow-border/30" 
                      : "bg-white/10 text-diffcolor hover:bg-white/20 hover:text-border border border-white/10 hover:border-border/30"
                  }`}
                  onClick={() => handleMobileTabClick(tab)}
                >
                  {tab}
                </Link>
              ))}
            </div>

            {/* Bottom decoration */}
            <div className="mt-8 text-center">
              <div className="w-24 h-1 bg-border/30 rounded-full mx-auto mb-4"></div>
              <p className="text-sm text-diffcolor/70">Navigate to explore</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const NavbarItem = React.memo(({ label, isActive, onClick }) => {
  return (
    <Link 
      to={`${label.toLowerCase()}`}  
      smooth={true}
      duration={500} 
      className={`relative px-4 py-2 mx-1 font-semibold transition-all duration-300 hover:scale-105 rounded-lg ${
        isActive 
          ? "text-white bg-border shadow-lg shadow-border/30 border border-border/50" 
          : "text-diffcolor hover:text-border hover:bg-white/5"
      }`} 
      onClick={onClick}
    >
      {label}
      {isActive && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white rounded-full"></div>
      )}
    </Link>
  );
});

NavbarItem.displayName = 'NavbarItem';

export default Navbar;
