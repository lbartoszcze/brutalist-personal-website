'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiSettings } from 'react-icons/fi';

// Define available themes
const themes = [
  {
    name: 'Nature',
    colors: ['#cff27e', '#f2dd6e', '#e5b25d', '#b87d4b', '#523a34'],
    icon: '🌿'
  },
  {
    name: 'Ocean',
    colors: ['#a6cfd5', '#7fb7be', '#5a9aa8', '#287a8c', '#1d566e'],
    icon: '🌊'
  },
  {
    name: 'Sunset',
    colors: ['#ff7e5f', '#feb47b', '#ffaa5a', '#ff8c42', '#cc5803'],
    icon: '🌅'
  },
  {
    name: 'Lavender',
    colors: ['#e9d5f9', '#d0a9f5', '#b67df5', '#9953f5', '#7209b7'],
    icon: '💜'
  },
  {
    name: 'Monochrome',
    colors: ['#f8f9fa', '#e9ecef', '#dee2e6', '#6c757d', '#212529'],
    icon: '🖤'
  },
];

interface ThemeSwitcherProps {
  onThemeChange?: (colors: string[]) => void;
  className?: string;
}

export default function ThemeSwitcher({ 
  onThemeChange,
  className = '' 
}: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(0); // Default to first theme
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Apply the theme colors to CSS variables
  useEffect(() => {
    const theme = themes[selectedTheme];
    
    // Update CSS variables
    document.documentElement.style.setProperty('--color-primary', theme.colors[0]);
    document.documentElement.style.setProperty('--color-secondary', theme.colors[1]);
    document.documentElement.style.setProperty('--color-tertiary', theme.colors[2]);
    document.documentElement.style.setProperty('--color-quaternary', theme.colors[3]);
    document.documentElement.style.setProperty('--color-quinary', theme.colors[4]);
    
    // Call the callback if provided
    if (onThemeChange) {
      onThemeChange(theme.colors);
    }
  }, [selectedTheme, onThemeChange]);
  
  // Handle dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  // Panel variants for animation
  const panelVariants = {
    closed: { 
      opacity: 0,
      scale: 0.9,
      y: 10,
      transition: { 
        duration: 0.3 
      }
    },
    open: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const themeItemVariants = {
    closed: { 
      opacity: 0,
      y: 10
    },
    open: { 
      opacity: 1,
      y: 0
    }
  };
  
  return (
    <div className={`relative z-50 ${className}`}>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-md hover:bg-black/20 dark:hover:bg-white/20 transition-colors duration-300"
        aria-label="Change theme"
      >
        <FiSettings className="w-5 h-5 text-white" />
      </button>
      
      {/* Theme panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={panelVariants}
            className="absolute right-0 mt-2 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-xl w-64 backdrop-blur-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900 dark:text-white">Theme</h3>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDarkMode ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {themes.map((theme, index) => (
                  <motion.button
                    key={theme.name}
                    variants={themeItemVariants}
                    onClick={() => {
                      setSelectedTheme(index);
                      setTimeout(() => setIsOpen(false), 300);
                    }}
                    className={`flex items-center p-2 rounded-md transition-all duration-300 ${
                      selectedTheme === index 
                        ? 'bg-gray-100 dark:bg-gray-700 ring-2 ring-blue-500' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex space-x-1 mr-2">
                      {theme.colors.map((color, i) => (
                        <div 
                          key={i} 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: color }} 
                        />
                      ))}
                    </div>
                    <span className="mr-1">{theme.icon}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {theme.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 