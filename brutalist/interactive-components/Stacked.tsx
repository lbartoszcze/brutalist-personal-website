import React, { useState, useEffect, useRef } from 'react';

interface StackedItemProps {
  /**
   * Content of the stacked item
   */
  children: React.ReactNode;
  /**
   * Z-index offset for the item
   */
  zIndex?: number;
  /**
   * Whether to add a shadow to the item
   */
  hasShadow?: boolean;
  /**
   * Rotation angle for the item in degrees
   */
  rotation?: number;
  /**
   * Custom class name
   */
  className?: string;
}

export const StackedItem: React.FC<StackedItemProps> = ({
  children,
  zIndex = 0,
  hasShadow = true,
  rotation = 0,
  className = '',
}) => {
  return (
    <div
      className={`
        absolute
        ${hasShadow ? 'shadow-md' : ''}
        transition-transform duration-200
        ${className}
      `}
      style={{
        zIndex,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {children}
    </div>
  );
};

interface StackedCardsProps {
  /**
   * Cards to display in the stack
   */
  children: React.ReactNode[];
  /**
   * Maximum number of visible cards
   */
  maxVisible?: number;
  /**
   * Distance between cards in the stack
   */
  offset?: number;
  /**
   * Whether to apply a rotation effect
   */
  hasRotation?: boolean;
  /**
   * Maximum rotation angle in degrees
   */
  maxRotation?: number;
  /**
   * Custom class name
   */
  className?: string;
}

export const StackedCards: React.FC<StackedCardsProps> = ({
  children,
  maxVisible = 3,
  offset = 8,
  hasRotation = true,
  maxRotation = 5,
  className = '',
}) => {
  // Limit the number of visible children
  const visibleChildren = React.Children.toArray(children).slice(0, maxVisible);
  
  // Calculate rotation for each card
  const getRotation = (index: number) => {
    if (!hasRotation) return 0;
    
    // Alternate rotation direction based on index
    const direction = index % 2 === 0 ? 1 : -1;
    return direction * (Math.random() * maxRotation);
  };
  
  return (
    <div className={`relative ${className}`} style={{ height: '100%', width: '100%' }}>
      {visibleChildren.map((child, index) => (
        <StackedItem
          key={index}
          zIndex={visibleChildren.length - index}
          rotation={getRotation(index)}
          className={`
            top-${index * offset / 4} 
            left-${index * offset / 4}
          `}
        >
          {child}
        </StackedItem>
      ))}
    </div>
  );
};

interface StackedImagesProps {
  /**
   * Array of image sources
   */
  images: string[];
  /**
   * Alternative text for images
   */
  alt?: string;
  /**
   * Maximum number of visible images
   */
  maxVisible?: number;
  /**
   * Distance between images in the stack
   */
  offset?: number;
  /**
   * Whether to apply a rotation effect
   */
  hasRotation?: boolean;
  /**
   * Custom class name
   */
  className?: string;
}

export const StackedImages: React.FC<StackedImagesProps> = ({
  images,
  alt = '',
  maxVisible = 3,
  offset = 8,
  hasRotation = true,
  className = '',
}) => {
  // Limit the number of visible images
  const visibleImages = images.slice(0, maxVisible);
  
  return (
    <div className={`relative ${className}`} style={{ height: '100%', width: '100%' }}>
      {visibleImages.map((src, index) => (
        <StackedItem
          key={index}
          zIndex={visibleImages.length - index}
          rotation={hasRotation ? (index % 2 === 0 ? 2 : -2) : 0}
          className={`
            top-${index * offset / 4} 
            left-${index * offset / 4}
            border-2 border-black
            overflow-hidden
          `}
        >
          <img src={src} alt={`${alt} ${index + 1}`} className="w-full h-full object-cover" />
        </StackedItem>
      ))}
    </div>
  );
};

interface StackedPapersProps {
  /**
   * Array of paper contents
   */
  contents: React.ReactNode[];
  /**
   * Maximum number of visible papers
   */
  maxVisible?: number;
  /**
   * Distance between papers in the stack
   */
  offset?: number;
  /**
   * Whether to apply a rotation effect
   */
  hasRotation?: boolean;
  /**
   * Paper color variations
   */
  colorVariations?: string[];
  /**
   * Custom class name
   */
  className?: string;
}

export const StackedPapers: React.FC<StackedPapersProps> = ({
  contents,
  maxVisible = 3,
  offset = 15,
  hasRotation = true,
  colorVariations = ['bg-white', 'bg-gray-50', 'bg-yellow-50', 'bg-blue-50', 'bg-pink-50'],
  className = '',
}) => {
  // Limit the number of visible papers
  const visibleContents = contents.slice(0, maxVisible);
  
  return (
    <div className={`relative ${className}`} style={{ height: '100%', width: '100%' }}>
      {visibleContents.map((content, index) => {
        // Get a color variation based on index
        const colorIndex = index % colorVariations.length;
        const colorClass = colorVariations[colorIndex];
        
        return (
          <StackedItem
            key={index}
            zIndex={visibleContents.length - index}
            rotation={hasRotation ? (Math.random() * 6 - 3) : 0}
            className={`
              top-${index * offset / 4} 
              left-${index * offset / 4}
              ${colorClass}
              border-2 border-black
              p-4
              shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
            `}
          >
            {content}
          </StackedItem>
        );
      })}
    </div>
  );
};

interface CarouselCardProps {
  /**
   * Content of the card
   */
  children: React.ReactNode;
  /**
   * Whether the card is active/selected
   */
  isActive?: boolean;
  /**
   * Custom class name
   */
  className?: string;
}

interface StackedCarouselProps {
  /**
   * Array of card contents
   */
  children: React.ReactNode[];
  /**
   * Index of the active card
   */
  activeIndex?: number;
  /**
   * Change handler for active index
   */
  onActiveChange?: (index: number) => void;
  /**
   * Maximum cards to show at once
   */
  maxVisible?: number;
  /**
   * Custom class name
   */
  className?: string;
}

export const StackedCarousel: React.FC<StackedCarouselProps> = ({
  children,
  activeIndex: controlledActiveIndex,
  onActiveChange,
  maxVisible = 3,
  className = '',
}) => {
  // State for uncontrolled component
  const [localActiveIndex, setLocalActiveIndex] = useState(0);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledActiveIndex !== undefined;
  const activeIndex = isControlled ? controlledActiveIndex : localActiveIndex;
  
  // Refs for carousel container and cards
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle next card
  const handleNext = () => {
    const newIndex = (activeIndex + 1) % children.length;
    
    if (!isControlled) {
      setLocalActiveIndex(newIndex);
    }
    
    if (onActiveChange) {
      onActiveChange(newIndex);
    }
  };
  
  // Handle previous card
  const handlePrev = () => {
    const newIndex = (activeIndex - 1 + children.length) % children.length;
    
    if (!isControlled) {
      setLocalActiveIndex(newIndex);
    }
    
    if (onActiveChange) {
      onActiveChange(newIndex);
    }
  };
  
  // Calculate which cards to display and their positions
  const calculateVisibleCards = () => {
    const allCards = React.Children.toArray(children);
    const visibleCards: React.ReactNode[] = [];
    
    // Determine the range of cards to show
    const halfVisible = Math.floor(maxVisible / 2);
    let startIndex = activeIndex - halfVisible;
    
    // Adjust start index if it's out of bounds
    if (startIndex < 0) {
      startIndex = allCards.length + startIndex;
    }
    
    // Collect the visible cards in order
    for (let i = 0; i < maxVisible; i++) {
      const cardIndex = (startIndex + i) % allCards.length;
      visibleCards.push(allCards[cardIndex]);
    }
    
    return visibleCards;
  };
  
  const visibleCards = calculateVisibleCards();
  
  return (
    <div className={`relative ${className}`}>
      <div 
        ref={containerRef}
        className="relative h-80 w-full"
      >
        {visibleCards.map((card, index) => {
          // Calculate z-index based on distance from active card
          const isActive = index === Math.floor(maxVisible / 2);
          const zIndex = maxVisible - Math.abs(index - Math.floor(maxVisible / 2));
          
          // Calculate position and size (active card is centered and largest)
          const translateX = (index - Math.floor(maxVisible / 2)) * 100;
          const scale = isActive ? 1 : 0.85;
          const opacity = isActive ? 1 : 0.7;
          
          return (
            <div
              key={index}
              className={`
                absolute top-0 left-1/2 
                transition-all duration-300 ease-in-out
                cursor-pointer
                transform -translate-x-1/2
                ${isActive ? 'z-30' : ''}
              `}
              style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                opacity,
                zIndex,
              }}
              onClick={() => {
                // Move to this card if not active
                if (!isActive) {
                  const direction = index < Math.floor(maxVisible / 2) ? -1 : 1;
                  if (direction < 0) {
                    handlePrev();
                  } else {
                    handleNext();
                  }
                }
              }}
            >
              {card}
            </div>
          );
        })}
      </div>
      
      {/* Navigation */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={handlePrev}
          className="border-2 border-black px-4 py-2 font-mono font-bold hover:bg-black hover:text-white transition-colors"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="border-2 border-black px-4 py-2 font-mono font-bold hover:bg-black hover:text-white transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Card component for use with StackedCarousel
export const CarouselCard: React.FC<CarouselCardProps> = ({
  children,
  isActive = false,
  className = '',
}) => {
  return (
    <div
      className={`
        border-2 border-black
        ${isActive ? 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-gray-100'}
        p-6 w-64 h-64
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Example implementation
export const StackedExamples: React.FC = () => {
  // State for carousel
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Sample card contents for StackedCards
  const cardContents = [
    <div key="card1" className="border-2 border-black bg-white p-4 w-40 h-56">
      <h3 className="text-lg font-mono font-bold">Card 1</h3>
      <p className="text-sm">This is the first card in the stack.</p>
    </div>,
    <div key="card2" className="border-2 border-black bg-gray-50 p-4 w-40 h-56">
      <h3 className="text-lg font-mono font-bold">Card 2</h3>
      <p className="text-sm">This is the second card in the stack.</p>
    </div>,
    <div key="card3" className="border-2 border-black bg-blue-50 p-4 w-40 h-56">
      <h3 className="text-lg font-mono font-bold">Card 3</h3>
      <p className="text-sm">This is the third card in the stack.</p>
    </div>,
  ];
  
  // Sample image sources for StackedImages
  const imageSources = [
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=300&h=400&fit=crop',
  ];
  
  // Sample paper contents for StackedPapers
  const paperContents = [
    <div key="paper1" className="font-mono">
      <h3 className="text-lg font-bold">Note 1</h3>
      <p className="text-sm">This is an important note about the project.</p>
    </div>,
    <div key="paper2" className="font-mono">
      <h3 className="text-lg font-bold">Note 2</h3>
      <p className="text-sm">Remember to update the documentation.</p>
    </div>,
    <div key="paper3" className="font-mono">
      <h3 className="text-lg font-bold">Note 3</h3>
      <p className="text-sm">Meeting scheduled for next week.</p>
    </div>,
  ];
  
  // Sample carousel cards
  const carouselCards = [
    <CarouselCard key="carousel1" isActive={activeIndex === 0}>
      <h3 className="text-lg font-mono font-bold">Item 1</h3>
      <p className="mt-2">This is the first carousel item.</p>
    </CarouselCard>,
    <CarouselCard key="carousel2" isActive={activeIndex === 1}>
      <h3 className="text-lg font-mono font-bold">Item 2</h3>
      <p className="mt-2">This is the second carousel item.</p>
    </CarouselCard>,
    <CarouselCard key="carousel3" isActive={activeIndex === 2}>
      <h3 className="text-lg font-mono font-bold">Item 3</h3>
      <p className="mt-2">This is the third carousel item.</p>
    </CarouselCard>,
    <CarouselCard key="carousel4" isActive={activeIndex === 3}>
      <h3 className="text-lg font-mono font-bold">Item 4</h3>
      <p className="mt-2">This is the fourth carousel item.</p>
    </CarouselCard>,
    <CarouselCard key="carousel5" isActive={activeIndex === 4}>
      <h3 className="text-lg font-mono font-bold">Item 5</h3>
      <p className="mt-2">This is the fifth carousel item.</p>
    </CarouselCard>,
  ];
  
  return (
    <div className="p-6 max-w-6xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Stacked Components</h2>
      <p className="mb-8 font-sans">
        Stacked components with brutalist styling for creating visually interesting layouts.
      </p>
      
      <div className="space-y-16">
        {/* Stacked Cards */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Stacked Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Default Stack</h4>
              <div className="h-64 w-48 relative">
                <StackedCards>
                  {cardContents}
                </StackedCards>
              </div>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">No Rotation</h4>
              <div className="h-64 w-48 relative">
                <StackedCards hasRotation={false} offset={12}>
                  {cardContents}
                </StackedCards>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stacked Images */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Stacked Images</h3>
          <div className="h-80 w-64 relative mx-auto">
            <StackedImages
              images={imageSources}
              alt="Sample image"
              hasRotation={true}
              offset={10}
            />
          </div>
        </div>
        
        {/* Stacked Papers */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Stacked Papers</h3>
          <div className="h-64 w-64 relative mx-auto">
            <StackedPapers
              contents={paperContents}
              hasRotation={true}
              offset={20}
            />
          </div>
        </div>
        
        {/* Stacked Carousel */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Stacked Carousel</h3>
          <StackedCarousel
            activeIndex={activeIndex}
            onActiveChange={setActiveIndex}
            maxVisible={3}
          >
            {carouselCards}
          </StackedCarousel>
          <div className="text-center mt-4 font-mono">
            Current slide: {activeIndex + 1} of {carouselCards.length}
          </div>
        </div>
      </div>
    </div>
  );
}; 