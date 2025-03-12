'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface AnimatedHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  gradient?: boolean;
  className?: string;
  delay?: number;
  animated?: boolean;
  centered?: boolean;
  staggerChildren?: boolean;
  splitBy?: 'word' | 'character';
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: i * 0.1,
    },
  }),
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function AnimatedHeading({
  text,
  as = 'h2',
  gradient = false,
  className = '',
  delay = 0,
  animated = true,
  centered = false,
  staggerChildren = true,
  splitBy = 'word',
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  // Split text into words or characters
  const items = splitBy === 'word' 
    ? text.split(' ').map(word => word + ' ')
    : text.split('');

  // Define the heading based on the 'as' prop
  const renderHeading = (children: React.ReactNode) => {
    switch (as) {
      case 'h1':
        return <h1 className={`${centered ? 'text-center' : ''} ${className}`}>{children}</h1>;
      case 'h3':
        return <h3 className={`${centered ? 'text-center' : ''} ${className}`}>{children}</h3>;
      case 'h4':
        return <h4 className={`${centered ? 'text-center' : ''} ${className}`}>{children}</h4>;
      default:
        return <h2 className={`${centered ? 'text-center' : ''} ${className}`}>{children}</h2>;
    }
  };

  return (
    <div ref={ref} className={`${gradient ? 'text-gradient' : ''}`}>
      {animated ? (
        renderHeading(
          <motion.span
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            custom={delay}
            className="inline-block"
          >
            {staggerChildren ? (
              items.map((item, i) => (
                <motion.span key={i} variants={itemVariants} className="inline-block overflow-hidden">
                  {item}
                </motion.span>
              ))
            ) : (
              <motion.span variants={itemVariants} className="inline-block">
                {text}
              </motion.span>
            )}
          </motion.span>
        )
      ) : (
        renderHeading(text)
      )}
    </div>
  );
} 