'use client';

import React, { useState, useRef, ReactNode, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

interface DraggableCarouselProps {
  children: ReactNode[];
  itemWidth?: number;
  gap?: number;
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function DraggableCarousel({
  children,
  itemWidth = 300,
  gap = 24,
  className = '',
  showArrows = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 3000,
  onMouseEnter,
  onMouseLeave,
}: DraggableCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Calculate total width of an item (including gap)
  const itemTotalWidth = itemWidth + gap;
  
  // Handle arrow navigation
  const handlePrev = useCallback(() => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  }, [currentIndex]);
  
  const handleNext = useCallback(() => {
    setCurrentIndex(Math.min(children.length - 1, currentIndex + 1));
  }, [currentIndex, children.length]);
  
  // Implement autoPlay functionality
  useEffect(() => {
    if (!autoPlay || isPaused) return;
    
    const interval = setInterval(() => {
      if (currentIndex < children.length - 1) {
        handleNext();
      } else {
        setCurrentIndex(0); // Loop back to the beginning
      }
    }, autoPlayInterval);
    
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, currentIndex, children.length, isPaused, handleNext]);
  
  // Calculate the x-position based on current index
  const getXPosition = () => {
    // Don't move for the first item
    if (currentIndex === 0) return 0;
    
    // For subsequent items, move by item width + gap
    return -currentIndex * itemTotalWidth;
  };
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      ref={constraintsRef}
      onMouseEnter={() => {
        setIsPaused(true);
        if (onMouseEnter) onMouseEnter();
      }}
      onMouseLeave={() => {
        setIsPaused(false);
        if (onMouseLeave) onMouseLeave();
      }}
    >
      {/* Main carousel */}
      <motion.div
        ref={carouselRef}
        className="flex"
        style={{ paddingRight: gap }}
        drag="x"
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        dragMomentum={true}
        animate={{ x: getXPosition() }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(e, info) => {
          setIsDragging(false);
          
          // Determine drag direction and distance
          const dragDistance = Math.abs(info.offset.x);
          const dragThreshold = itemWidth * 0.2; // 20% of item width as threshold
          
          if (dragDistance > dragThreshold) {
            if (info.offset.x > 0 && currentIndex > 0) {
              // Dragged right (show prev)
              handlePrev();
            } else if (info.offset.x < 0 && currentIndex < children.length - 1) {
              // Dragged left (show next)
              handleNext();
            }
          }
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className={`flex-shrink-0 transition-opacity duration-300 ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ 
              width: itemWidth, 
              marginRight: index === children.length - 1 ? 0 : gap,
            }}
          >
            {child}
          </div>
        ))}
      </motion.div>
      
      {/* Navigation arrows */}
      {showArrows && (
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2 pointer-events-none">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md pointer-events-auto transition-opacity ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100'
            }`}
            aria-label="Previous item"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === children.length - 1}
            className={`z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md pointer-events-auto transition-opacity ${
              currentIndex === children.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100'
            }`}
            aria-label="Next item"
          >
            <FiArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {/* Pagination dots */}
      {showDots && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentIndex === index
                  ? 'bg-black/70 w-5'
                  : 'bg-black/30 hover:bg-black/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 