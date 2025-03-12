'use client';

import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'light' | 'gradient' | 'grain';
  fullHeight?: boolean;
  centered?: boolean;
  withOverflow?: boolean;
  delayIndex?: number;
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Section({
  children,
  className = '',
  id,
  background = 'white',
  fullHeight = false,
  centered = false,
  withOverflow = false,
  delayIndex = 0,
}: SectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  // Determine background class based on the background prop
  const bgClass = {
    white: 'bg-white',
    light: 'bg-[#f2dd6e]/10',
    gradient: 'bg-gradient-secondary',
    grain: 'bg-white bg-grain',
  }[background];

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative ${fullHeight ? 'min-h-screen' : 'py-20 md:py-24'} ${
        bgClass
      } ${withOverflow ? 'overflow-hidden' : ''} ${className}`}
    >
      <motion.div
        className={`container-xl ${
          centered ? 'flex flex-col items-center justify-center h-full' : ''
        }`}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={sectionVariants}
        custom={delayIndex}
      >
        {children}
      </motion.div>
    </section>
  );
} 