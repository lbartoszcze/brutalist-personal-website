'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface CursorFollowerProps {
  cursorPosition: { x: number; y: number };
  cursorVariant: string;
}

export default function CursorFollower({
  cursorPosition,
  cursorVariant,
}: CursorFollowerProps) {
  // Define cursor variants
  const variants: Variants = {
    default: {
      x: cursorPosition.x - 12,
      y: cursorPosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: 'rgba(82, 58, 52, 0.3)',
      // Use TypeScript non-null assertion for types that framer-motion accepts
      mixBlendMode: 'normal' as const,
      border: '0px solid rgba(82, 58, 52, 0.8)',
    },
    link: {
      x: cursorPosition.x - 20,
      y: cursorPosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: 'rgba(207, 242, 126, 0.5)',
      mixBlendMode: 'normal' as const,
      border: '2px solid rgba(207, 242, 126, 1)',
    },
    button: {
      x: cursorPosition.x - 25,
      y: cursorPosition.y - 25,
      height: 50,
      width: 50,
      backgroundColor: 'rgba(229, 178, 93, 0.3)',
      mixBlendMode: 'normal' as const,
      border: '2px solid rgba(229, 178, 93, 0.8)',
    },
    input: {
      x: cursorPosition.x - 15,
      y: cursorPosition.y - 15,
      height: 30,
      width: 30,
      backgroundColor: 'rgba(207, 242, 126, 0.2)',
      mixBlendMode: 'normal' as const,
      border: '1px solid rgba(207, 242, 126, 0.8)',
    },
    text: {
      x: cursorPosition.x - 40,
      y: cursorPosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: 'rgba(184, 125, 75, 0.1)',
      mixBlendMode: 'normal' as const,
      border: '0px solid rgba(184, 125, 75, 0.3)',
    },
    image: {
      x: cursorPosition.x - 30,
      y: cursorPosition.y - 30,
      height: 60,
      width: 60,
      backgroundColor: 'rgba(242, 221, 110, 0.2)',
      mixBlendMode: 'normal' as const,
      border: '1px solid rgba(242, 221, 110, 0.8)',
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 rounded-full pointer-events-none mix-blend-difference"
      variants={variants}
      animate={cursorVariant}
      transition={{
        type: 'spring',
        stiffness: 800,
        damping: 35,
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full opacity-50"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </motion.div>
  );
} 