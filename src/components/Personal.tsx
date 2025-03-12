'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// Photo data with descriptions
const photos = [
  {
    src: '/personal/slub.jpg',
    alt: 'Wedding photo with my wife Zuzanna',
    description: 'My wedding day with Zuzanna. Happiest day of my life.'
  },
  {
    src: '/personal/puertorico.jpg',
    alt: 'Trip to Puerto Rico',
    description: 'Hitchiking across the island of Puerto Rico.'
  },
  {
    src: '/personal/columbia.jpg',
    alt: 'Columbia University',
    description: 'First weeks at Columbia University studying computer science and economics.'
  },
  {
    src: '/personal/pilkarz.jpg',
    alt: 'Playing football',
    description: 'In my sports era (before the injuries came).'
  },
  {
    src: '/personal/husarz.jpg',
    alt: 'Polish Hussar',
    description: 'Going at it since 1997.'
  },
  {
    src: '/personal/wawmun.jpg',
    alt: 'Warsaw',
    description: 'Secretary General of WawMUN 2015. Highschool years.'
  }
];

export default function Personal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [rotation, setRotation] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    setOffsetX(0);
    setOffsetY(0);
    setRotation(0);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    setOffsetX(0);
    setOffsetY(0);
    setRotation(0);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    
    // Handle different event types
    const clientX = 
      'touches' in e 
        ? e.touches[0].clientX 
        : (e as React.MouseEvent).clientX;
        
    const clientY = 
      'touches' in e 
        ? e.touches[0].clientY 
        : (e as React.MouseEvent).clientY;
        
    setStartX(clientX);
    setStartY(clientY);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    // Handle different event types
    const clientX = 
      'touches' in e 
        ? e.touches[0].clientX 
        : (e as React.MouseEvent).clientX;
        
    const clientY = 
      'touches' in e 
        ? e.touches[0].clientY 
        : (e as React.MouseEvent).clientY;
        
    const diffX = clientX - startX;
    const diffY = clientY - startY;
    
    // Calculate rotation based on horizontal movement
    const newRotation = diffX * 0.1; // Adjust for more/less rotation
    
    setOffsetX(diffX);
    setOffsetY(diffY);
    setRotation(newRotation);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    // Calculate the "throw" distance
    const throwDistance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    
    // If thrown/dragged far enough in any direction
    if (throwDistance > 100) {
      // If more horizontal than vertical and to the right, go to previous
      if (Math.abs(offsetX) > Math.abs(offsetY) && offsetX > 0) {
        goToPrev();
      } else {
        // Otherwise go to next (left swipe or any downward throw)
        goToNext();
      }
    } else {
      // Reset position if not thrown far enough
      setOffsetX(0);
      setOffsetY(0);
      setRotation(0);
    }
  };

  return (
    <section id="personal" className="brutalist-box p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Personal</h2>
      
      {/* Flex container for side-by-side layout */}
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Text content - takes more space on larger screens */}
        <div className="space-y-4 md:w-2/3">
          <p>
            I am living in San Francisco right now with my wife Zuzanna. I&apos;m really passionate 
            about building so most of my free time is spent hacking or writing AI papers.
          </p>
          <p>
            I love sports: running, martial arts and kitesurfing. I enjoy listening to Funk Tribu 
            or the Weeknd, reading communist-era Czech literature or playing Total War Warhammer 3.
          </p>
        </div>

        {/* Brutalist Card Stack - smaller and to the right */}
        <div className="w-full md:w-1/3 mt-4 md:mt-0 relative">
          {/* Container for card stack with specific overflow constraints */}
          <div className="relative h-[340px]">
            <div 
              className="relative h-[300px] w-full cursor-grab"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              {/* Cards - explicitly positioned in stack */}
              {photos.map((photo, index) => {
                // Calculate which cards should be visible - only current and next two
                const isVisible = 
                  index === currentIndex || 
                  index === (currentIndex + 1) % photos.length || 
                  index === (currentIndex + 2) % photos.length;
                
                // Only render visible cards
                if (!isVisible) return null;

                // Calculate card position and rotation
                let zIndex = 0;
                let baseTransform = '';
                let opacity = 0;
                let moveTransform = '';

                // Current card (top card)
                if (index === currentIndex) {
                  zIndex = 30;
                  baseTransform = 'translate(15px, 15px) rotate(-3deg)';
                  opacity = 1;
                  // Apply drag effect to the current card
                  moveTransform = isDragging 
                    ? `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)` 
                    : '';
                } 
                // Second card (always visible underneath)
                else if (index === (currentIndex + 1) % photos.length) {
                  zIndex = 20;
                  baseTransform = 'translate(30px, 25px) rotate(2deg)';
                  opacity = 0.9;
                } 
                // Third card (bottom of stack)
                else if (index === (currentIndex + 2) % photos.length) {
                  zIndex = 10;
                  baseTransform = 'translate(45px, 35px) rotate(-2deg)';
                  opacity = 0.8;
                }

                // Render card component
                return (
                  <div 
                    key={index}
                    className="absolute top-0 left-0 w-[85%] h-[260px] border-4 border-black bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-3"
                    style={{ 
                      zIndex, 
                      transform: `${baseTransform} ${moveTransform}`,
                      opacity,
                      transition: isDragging ? 'none' : 'all 0.3s ease'
                    }}
                    onClick={() => !isDragging && goToNext()}
                  >
                    {/* Larger image container with less padding */}
                    <div className="h-4/5 flex items-center justify-center">
                      <div className="border-4 border-black inline-block bg-white">
                        <Image 
                          src={photo.src}
                          alt={photo.alt}
                          width={220}
                          height={180}
                          className="w-auto h-auto max-h-[170px]"
                          style={{ display: 'block' }}
                          draggable="false"
                        />
                      </div>
                    </div>
                    <div className="mt-1 font-mono text-xs">
                      <p className="border-2 border-black p-1 bg-gray-100 line-clamp-2 text-[10px]">{photo.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 