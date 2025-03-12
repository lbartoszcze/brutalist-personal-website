'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollPromptProps {
  targetId?: string;
  color?: 'light' | 'dark';
  className?: string;
}

export default function ScrollPrompt({
  targetId,
  color = 'dark',
  className = '',
}: ScrollPromptProps) {
  const handleClick = () => {
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If no target ID is provided, scroll to the next viewport height
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  const textColor = color === 'dark' ? 'text-vandyke' : 'text-white';

  return (
    <motion.div
      className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer ${textColor} ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
    >
      <p className="text-sm font-medium mb-2 uppercase tracking-widest text-center">Scroll</p>
      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        <svg
          className={`w-6 h-6 ${textColor}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
} 