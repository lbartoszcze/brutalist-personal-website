'use client';

import React, { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxElementProps {
  children: ReactNode;
  speed?: number; // -1 to 1, negative means opposite direction, 0 means no movement
  direction?: 'vertical' | 'horizontal';
  className?: string;
  reverse?: boolean;
  offset?: [number, number]; // [start, end] in the viewport
}

export default function ParallaxElement({
  children,
  speed = 0.2,
  direction = 'vertical',
  className = '',
  reverse = false,
  offset = [0, 1],
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const adjustedSpeed = reverse ? -speed : speed;
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });
  
  // For vertical parallax (moving up/down)
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, direction === 'vertical' ? adjustedSpeed * 100 : 0]
  );
  
  // For horizontal parallax (moving left/right)
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, direction === 'horizontal' ? adjustedSpeed * 100 : 0]
  );
  
  return (
    <div ref={ref} className={`${className} overflow-hidden`}>
      <motion.div style={{ x, y }}>
        {children}
      </motion.div>
    </div>
  );
} 