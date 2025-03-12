import React, { useState, useRef, useEffect } from 'react';

interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  variant?: 'default' | 'bordered' | 'cutout';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  autoPlay = false,
  interval = 5000,
  showArrows = true,
  showDots = true,
  variant = 'default',
  size = 'medium',
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideWidth = useRef(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize slideWidth and set up window resize listener
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        slideWidth.current = containerRef.current.offsetWidth;
        // Reset position when width changes
        setTranslateX(-activeIndex * slideWidth.current);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [activeIndex]);
  
  // Set up autoPlay
  useEffect(() => {
    if (autoPlay) {
      startAutoPlay();
    }
    
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, interval, activeIndex]);
  
  // Start autoplay
  const startAutoPlay = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    
    autoPlayTimerRef.current = setInterval(() => {
      goToSlide((activeIndex + 1) % children.length);
    }, interval);
  };
  
  // Stop autoplay
  const stopAutoPlay = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  };
  
  // Go to specific slide
  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setTranslateX(-index * slideWidth.current);
  };
  
  // Go to next slide
  const goToNext = () => {
    const nextIndex = (activeIndex + 1) % children.length;
    goToSlide(nextIndex);
  };
  
  // Go to previous slide
  const goToPrev = () => {
    const prevIndex = (activeIndex - 1 + children.length) % children.length;
    goToSlide(prevIndex);
  };
  
  // Handle mouse down / touch start
  const handleDragStart = (clientX: number) => {
    stopAutoPlay();
    setIsDragging(true);
    setStartX(clientX);
  };
  
  // Handle mouse move / touch move
  const handleDrag = (clientX: number) => {
    if (isDragging) {
      const deltaX = clientX - startX;
      setTranslateX(-activeIndex * slideWidth.current + deltaX);
    }
  };
  
  // Handle mouse up / touch end
  const handleDragEnd = (clientX: number) => {
    if (isDragging) {
      const deltaX = clientX - startX;
      const threshold = slideWidth.current * 0.2; // 20% threshold
      
      if (deltaX < -threshold && activeIndex < children.length - 1) {
        goToSlide(activeIndex + 1);
      } else if (deltaX > threshold && activeIndex > 0) {
        goToSlide(activeIndex - 1);
      } else {
        goToSlide(activeIndex); // Snap back to current slide
      }
      
      setIsDragging(false);
      if (autoPlay) {
        startAutoPlay();
      }
    }
  };
  
  // Get size-based styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'h-48';
      case 'large':
        return 'h-96';
      default: // medium
        return 'h-72';
    }
  };
  
  // Get variant-based styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Get button styles
  const getButtonStyles = () => {
    return `
      absolute top-1/2 transform -translate-y-1/2
      w-10 h-10 flex items-center justify-center
      bg-white border-2 border-black font-mono text-xl
      hover:bg-gray-100 z-10
    `;
  };
  
  return (
    <div 
      className={`
        relative overflow-hidden
        ${getSizeStyles()}
        ${getVariantStyles()}
        ${className}
      `}
      onMouseEnter={autoPlay ? stopAutoPlay : undefined}
      onMouseLeave={autoPlay ? startAutoPlay : undefined}
    >
      {/* Previous button */}
      {showArrows && (
        <button
          className={`${getButtonStyles()} left-2`}
          onClick={goToPrev}
          aria-label="Previous slide"
        >
          ‹
        </button>
      )}
      
      {/* Container */}
      <div
        ref={containerRef}
        className="h-full flex transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${translateX}px)` }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDrag(e.clientX)}
        onMouseUp={(e) => handleDragEnd(e.clientX)}
        onMouseLeave={(e) => isDragging && handleDragEnd(e.clientX)}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDrag(e.touches[0].clientX)}
        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
      >
        {/* Slides */}
        {children.map((child, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0"
            style={{ opacity: isDragging ? 0.8 : 1 }}
            aria-hidden={index !== activeIndex}
          >
            {child}
          </div>
        ))}
      </div>
      
      {/* Next button */}
      {showArrows && (
        <button
          className={`${getButtonStyles()} right-2`}
          onClick={goToNext}
          aria-label="Next slide"
        >
          ›
        </button>
      )}
      
      {/* Dots */}
      {showDots && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {children.map((_, index) => (
            <button
              key={index}
              className={`
                w-3 h-3 border-2 border-black rounded-full
                ${index === activeIndex ? 'bg-black' : 'bg-white'}
              `}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Carousel with thumbnails
interface CarouselWithThumbnailsProps extends Omit<CarouselProps, 'showDots'> {
  thumbnails: React.ReactNode[];
  thumbnailsPosition?: 'bottom' | 'right';
}

export const CarouselWithThumbnails: React.FC<CarouselWithThumbnailsProps> = ({
  children,
  thumbnails,
  thumbnailsPosition = 'bottom',
  ...carouselProps
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Go to slide when thumbnail is clicked
  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };
  
  // Track carousel position
  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
  };
  
  // Get variant-based styles
  const getVariantStyles = () => {
    switch (carouselProps.variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return 'border-2 border-black';
    }
  };
  
  return (
    <div className={`
      ${thumbnailsPosition === 'bottom' ? 'flex flex-col gap-2' : 'flex gap-2'}
    `}>
      {/* Main carousel */}
      <div className={thumbnailsPosition === 'bottom' ? 'w-full' : 'flex-1'}>
        <Carousel
          {...carouselProps}
          showDots={false}
          autoPlay={carouselProps.autoPlay || false}
        >
          {children}
        </Carousel>
      </div>
      
      {/* Thumbnails */}
      <div className={`
        ${thumbnailsPosition === 'bottom' ? 'w-full flex gap-2 overflow-x-auto' : 'flex flex-col gap-2 w-24'}
      `}>
        {thumbnails.map((thumbnail, index) => (
          <div
            key={index}
            className={`
              cursor-pointer flex-shrink-0
              ${getVariantStyles()}
              ${activeIndex === index ? 'opacity-100' : 'opacity-70 hover:opacity-100'}
              ${thumbnailsPosition === 'bottom' ? 'w-20 h-20' : 'w-full h-20'}
            `}
            onClick={() => handleThumbnailClick(index)}
          >
            {thumbnail}
          </div>
        ))}
      </div>
    </div>
  );
};

// Hero carousel component
interface HeroCarouselProps extends Omit<CarouselProps, 'size' | 'children'> {
  items: {
    image: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    ctaText?: string;
    ctaAction?: () => void;
  }[];
  height?: string;
  overlayOpacity?: number;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  items,
  height = 'h-[500px]',
  overlayOpacity = 0.3,
  variant = 'default',
  ...carouselProps
}) => {
  return (
    <Carousel
      {...carouselProps}
      variant={variant}
      className={height}
    >
      {items.map((item, index) => (
        <div key={index} className="relative w-full h-full">
          {/* Image */}
          <div className="absolute inset-0">
            {item.image}
          </div>
          
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          ></div>
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
            {item.title && (
              <h3 className="text-3xl font-mono font-bold mb-4">
                {item.title}
              </h3>
            )}
            
            {item.description && (
              <p className="text-lg mb-6 max-w-xl">
                {item.description}
              </p>
            )}
            
            {item.ctaText && (
              <button
                className="
                  px-6 py-3 border-2 border-white font-mono
                  hover:bg-white hover:text-black
                  transition-colors duration-200
                "
                onClick={item.ctaAction}
              >
                {item.ctaText}
              </button>
            )}
          </div>
        </div>
      ))}
    </Carousel>
  );
};

// Examples
export const CarouselExamples: React.FC = () => {
  // Mock images (in a real app, you'd use actual images)
  const mockImage = (
    <div className="w-full h-full flex items-center justify-center bg-gray-200">
      Image Placeholder
    </div>
  );
  
  const coloredSlides = [
    <div key={1} className="w-full h-full bg-red-200 flex items-center justify-center">Slide 1</div>,
    <div key={2} className="w-full h-full bg-blue-200 flex items-center justify-center">Slide 2</div>,
    <div key={3} className="w-full h-full bg-green-200 flex items-center justify-center">Slide 3</div>,
    <div key={4} className="w-full h-full bg-yellow-200 flex items-center justify-center">Slide 4</div>,
  ];
  
  const thumbnails = [
    <div key={1} className="w-full h-full bg-red-200 flex items-center justify-center text-xs">1</div>,
    <div key={2} className="w-full h-full bg-blue-200 flex items-center justify-center text-xs">2</div>,
    <div key={3} className="w-full h-full bg-green-200 flex items-center justify-center text-xs">3</div>,
    <div key={4} className="w-full h-full bg-yellow-200 flex items-center justify-center text-xs">4</div>,
  ];
  
  const heroItems = [
    {
      image: <div className="w-full h-full bg-blue-500 flex items-center justify-center">Image 1</div>,
      title: "Brutalist Design System",
      description: "A raw, unpolished design system embracing the principles of brutalist web design.",
      ctaText: "Learn More",
      ctaAction: () => console.log("CTA 1 clicked"),
    },
    {
      image: <div className="w-full h-full bg-red-500 flex items-center justify-center">Image 2</div>,
      title: "Strong Typography",
      description: "Monospace fonts, clear hierarchy, and bold contrasts. Brutalism prioritizes readability and impact.",
      ctaText: "Explore Typography",
      ctaAction: () => console.log("CTA 2 clicked"),
    },
    {
      image: <div className="w-full h-full bg-green-500 flex items-center justify-center">Image 3</div>,
      title: "Raw Aesthetic",
      description: "Embracing the unadorned and unrefined, brutalist design shows the true structure of digital interfaces.",
      ctaText: "See Examples",
      ctaAction: () => console.log("CTA 3 clicked"),
    },
  ];
  
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Carousel Components</h2>
      <p className="mb-8 font-sans">
        Carousel components with brutalist styling for showcasing multiple items in a single space.
      </p>
      
      <div className="space-y-12">
        {/* Basic Carousel */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Carousel</h3>
          <div className="space-y-8">
            <Carousel variant="default">
              {coloredSlides}
            </Carousel>
            
            <Carousel variant="bordered">
              {coloredSlides}
            </Carousel>
            
            <Carousel variant="cutout">
              {coloredSlides}
            </Carousel>
          </div>
        </div>
        
        {/* Size Variants */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Size Variants</h3>
          <div className="space-y-8">
            <Carousel variant="bordered" size="small">
              {coloredSlides}
            </Carousel>
            
            <Carousel variant="bordered" size="medium">
              {coloredSlides}
            </Carousel>
            
            <Carousel variant="bordered" size="large">
              {coloredSlides}
            </Carousel>
          </div>
        </div>
        
        {/* Auto-playing Carousel */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Auto-playing Carousel</h3>
          <Carousel 
            variant="bordered"
            autoPlay
            interval={3000}
          >
            {coloredSlides}
          </Carousel>
          <p className="mt-2 text-sm text-gray-600">This carousel auto-plays with a 3-second interval.</p>
        </div>
        
        {/* Carousel with Thumbnails */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Carousel with Thumbnails</h3>
          <div className="space-y-8">
            <CarouselWithThumbnails
              variant="bordered"
              thumbnails={thumbnails}
              thumbnailsPosition="bottom"
            >
              {coloredSlides}
            </CarouselWithThumbnails>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <CarouselWithThumbnails
                  variant="bordered"
                  thumbnails={thumbnails}
                  thumbnailsPosition="right"
                >
                  {coloredSlides}
                </CarouselWithThumbnails>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero Carousel */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Hero Carousel</h3>
          <HeroCarousel
            items={heroItems}
            variant="bordered"
            height="h-[400px]"
            autoPlay
            interval={5000}
          />
        </div>
      </div>
    </div>
  );
}; 