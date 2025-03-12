import React from 'react';

// Testimonial item interface
interface TestimonialItem {
  /**
   * Content of the testimonial
   */
  content: string;
  /**
   * Author of the testimonial
   */
  author: string;
  /**
   * Author's role or company
   */
  role?: string;
  /**
   * Avatar image URL
   */
  avatar?: string;
  /**
   * Rating (out of 5)
   */
  rating?: number;
}

// Testimonial component props
interface TestimonialProps {
  /**
   * Single testimonial item
   */
  testimonial: TestimonialItem;
  /**
   * Variant of the testimonial
   */
  variant?: 'default' | 'bordered' | 'cutout' | 'minimal';
  /**
   * Size of the testimonial
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Whether to show the rating
   */
  showRating?: boolean;
  /**
   * Custom quote icon
   */
  quoteIcon?: React.ReactNode;
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * A single testimonial component
 */
export const Testimonial: React.FC<TestimonialProps> = ({
  testimonial,
  variant = 'default',
  size = 'medium',
  showRating = true,
  quoteIcon = '❝',
  className = '',
}) => {
  const { content, author, role, avatar, rating = 0 } = testimonial;
  
  // Get container styles based on variant
  const getContainerStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      case 'minimal':
        return 'border border-gray-200';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Get content styles based on size
  const getContentStyles = () => {
    switch (size) {
      case 'small':
        return 'text-sm p-4';
      case 'large':
        return 'text-lg p-8';
      case 'medium':
      default:
        return 'text-base p-6';
    }
  };
  
  // Generate star rating
  const renderRating = () => {
    if (!showRating || rating <= 0) return null;
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center mb-4">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-black">★</span>
        ))}
        {hasHalfStar && <span className="text-black">⭐</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">☆</span>
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}/5</span>
      </div>
    );
  };
  
  return (
    <div className={`${getContainerStyles()} bg-white ${className}`}>
      <div className={getContentStyles()}>
        {/* Rating */}
        {renderRating()}
        
        {/* Quote icon */}
        <div className="font-mono text-4xl text-gray-200 mb-2">
          {quoteIcon}
        </div>
        
        {/* Testimonial content */}
        <p className="mb-6 font-sans italic">
          {content}
        </p>
        
        {/* Author information */}
        <div className="flex items-center">
          {avatar && (
            <div className="mr-4">
              <img
                src={avatar}
                alt={`${author} avatar`}
                className="w-12 h-12 object-cover border-2 border-black"
              />
            </div>
          )}
          <div>
            <p className="font-mono font-bold">{author}</p>
            {role && <p className="text-sm text-gray-600">{role}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

// Testimonial grid props
interface TestimonialGridProps {
  /**
   * Array of testimonial items
   */
  testimonials: TestimonialItem[];
  /**
   * Title of the testimonial section
   */
  title?: string;
  /**
   * Subtitle or description
   */
  subtitle?: string;
  /**
   * Number of columns in the grid
   */
  columns?: 1 | 2 | 3 | 4;
  /**
   * Variant of the testimonials
   */
  variant?: 'default' | 'bordered' | 'cutout' | 'minimal';
  /**
   * Size of the testimonials
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Whether to show ratings
   */
  showRating?: boolean;
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * A grid of testimonials
 */
export const TestimonialGrid: React.FC<TestimonialGridProps> = ({
  testimonials,
  title = 'What Our Customers Say',
  subtitle,
  columns = 3,
  variant = 'bordered',
  size = 'medium',
  showRating = true,
  className = '',
}) => {
  return (
    <div className={`${className}`}>
      {/* Section header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-mono font-bold uppercase mb-4">{title}</h2>
        {subtitle && <p className="text-lg max-w-2xl mx-auto">{subtitle}</p>}
      </div>
      
      {/* Testimonials grid */}
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-8`}>
        {testimonials.map((testimonial, index) => (
          <Testimonial
            key={index}
            testimonial={testimonial}
            variant={variant}
            size={size}
            showRating={showRating}
          />
        ))}
      </div>
    </div>
  );
};

// Featured testimonial props
interface FeaturedTestimonialProps {
  /**
   * Testimonial item
   */
  testimonial: TestimonialItem;
  /**
   * Background image URL
   */
  backgroundImage?: string;
  /**
   * Section title
   */
  title?: string;
  /**
   * Variant of the testimonial
   */
  variant?: 'default' | 'bordered' | 'cutout';
  /**
   * Whether to show the rating
   */
  showRating?: boolean;
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * A featured testimonial with background
 */
export const FeaturedTestimonial: React.FC<FeaturedTestimonialProps> = ({
  testimonial,
  backgroundImage,
  title = 'Customer Spotlight',
  variant = 'bordered',
  showRating = true,
  className = '',
}) => {
  return (
    <div className={`relative py-16 ${className}`}>
      {/* Background image if provided */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      
      {/* Content container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-mono font-bold uppercase mb-8 text-center">{title}</h2>
        
        <div className={`
          mx-auto max-w-3xl ${variant === 'cutout' ? 'transform rotate-[-0.5deg]' : ''}
          ${variant === 'default' ? 'border-4' : 'border-2'} border-black bg-white
          ${variant === 'bordered' ? 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' : ''}
          p-8 md:p-12
        `}>
          {/* Rating */}
          {showRating && testimonial.rating !== undefined && (
            <div className="flex items-center justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i}
                  className={`text-2xl ${i < Math.floor(testimonial.rating || 0) ? 'text-black' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
          )}
          
          {/* Testimonial content */}
          <p className="text-xl md:text-2xl mb-8 font-sans italic text-center">
            "{testimonial.content}"
          </p>
          
          {/* Author information with centered layout */}
          <div className="flex flex-col items-center">
            {testimonial.avatar && (
              <div className="mb-4">
                <img
                  src={testimonial.avatar}
                  alt={`${testimonial.author} avatar`}
                  className="w-16 h-16 object-cover border-2 border-black rounded-full"
                />
              </div>
            )}
            <p className="font-mono font-bold text-lg">{testimonial.author}</p>
            {testimonial.role && <p className="text-gray-600">{testimonial.role}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

// Testimonial carousel props
interface TestimonialCarouselProps {
  /**
   * Array of testimonial items
   */
  testimonials: TestimonialItem[];
  /**
   * Title of the testimonial section
   */
  title?: string;
  /**
   * Subtitle or description
   */
  subtitle?: string;
  /**
   * Auto play interval in milliseconds (0 to disable)
   */
  autoPlayInterval?: number;
  /**
   * Variant of the testimonials
   */
  variant?: 'default' | 'bordered' | 'cutout' | 'minimal';
  /**
   * Whether to show ratings
   */
  showRating?: boolean;
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * A carousel of testimonials
 */
export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  title = 'Customer Reviews',
  subtitle,
  autoPlayInterval = 0,
  variant = 'bordered',
  showRating = true,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  
  // Auto play functionality
  React.useEffect(() => {
    if (autoPlayInterval <= 0 || isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, autoPlayInterval);
    
    return () => clearInterval(interval);
  }, [autoPlayInterval, isPaused, testimonials.length]);
  
  // Handle next slide
  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };
  
  // Handle previous slide
  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <div 
      className={`${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Section header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl font-mono font-bold uppercase mb-4">{title}</h2>}
          {subtitle && <p className="text-lg max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}
      
      {/* Carousel container */}
      <div className="max-w-4xl mx-auto px-4">
        {/* Active testimonial */}
        <div className="mb-8">
          <Testimonial
            testimonial={testimonials[activeIndex]}
            variant={variant}
            size="large"
            showRating={showRating}
          />
        </div>
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="border-2 border-black px-4 py-2 font-mono font-bold hover:bg-black hover:text-white transition-colors"
          >
            Previous
          </button>
          
          {/* Indicators */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-black' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={handleNext}
            className="border-2 border-black px-4 py-2 font-mono font-bold hover:bg-black hover:text-white transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Example implementation
export const TestimonialExamples: React.FC = () => {
  // Sample testimonial data
  const sampleTestimonials = [
    {
      content: "This product completely changed how we work. The brutalist design is a refreshing departure from the cookie-cutter interfaces we're used to seeing.",
      author: "Jane Smith",
      role: "Product Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
    },
    {
      content: "I was skeptical at first, but after using it for a month, I can't imagine going back. The straightforward approach saves me hours every week.",
      author: "Michael Johnson",
      role: "Developer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      rating: 4.5,
    },
    {
      content: "The attention to detail and functionality over flashiness is exactly what our team needed. It's like the interface gets out of your way and lets you focus.",
      author: "Sarah Williams",
      role: "Project Manager",
      avatar: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=150&h=150&fit=crop",
      rating: 5,
    },
    {
      content: "Refreshingly different and incredibly efficient. The brutalist design language might seem stark at first, but it's perfect for daily use.",
      author: "Alex Chen",
      role: "UX Researcher",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 4,
    },
    {
      content: "We've implemented this across our entire organization and productivity has increased significantly. The learning curve is minimal and the impact is substantial.",
      author: "Taylor Jackson",
      role: "CTO",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop",
      rating: 5,
    },
  ];
  
  // Featured testimonial
  const featuredTestimonial = {
    content: "Switching to this system was the best decision we made this year. The brutalist design is not just visually distinctive, it actually helps our team focus on what matters. We've cut meeting times in half and everyone appreciates the straightforward approach.",
    author: "Christopher Lee",
    role: "Director of Operations, TechFront Inc.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    rating: 5,
  };
  
  return (
    <div className="p-6 space-y-32">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Testimonial Components</h2>
      <p className="mb-8 font-sans">
        Testimonial components with brutalist styling for showcasing customer feedback.
      </p>
      
      {/* Single Testimonial Examples */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Single Testimonial Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-mono font-bold mb-2">Default Variant</h4>
            <Testimonial
              testimonial={sampleTestimonials[0]}
              variant="default"
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Bordered Variant</h4>
            <Testimonial
              testimonial={sampleTestimonials[1]}
              variant="bordered"
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Cutout Variant</h4>
            <Testimonial
              testimonial={sampleTestimonials[2]}
              variant="cutout"
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Minimal Variant</h4>
            <Testimonial
              testimonial={sampleTestimonials[3]}
              variant="minimal"
            />
          </div>
        </div>
      </div>
      
      {/* Testimonial Grid Example */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Testimonial Grid</h3>
        <TestimonialGrid
          testimonials={sampleTestimonials.slice(0, 3)}
          title="What Our Users Say"
          subtitle="Real feedback from real customers using our products every day."
          columns={3}
          variant="bordered"
        />
      </div>
      
      {/* Featured Testimonial Example */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Featured Testimonial</h3>
        <FeaturedTestimonial
          testimonial={featuredTestimonial}
          title="Customer Spotlight"
          variant="bordered"
        />
      </div>
      
      {/* Testimonial Carousel Example */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Testimonial Carousel</h3>
        <TestimonialCarousel
          testimonials={sampleTestimonials}
          title="Customer Reviews"
          subtitle="Swipe or use the navigation to view more testimonials."
          variant="bordered"
          autoPlayInterval={0} // Disabled for demo
        />
      </div>
    </div>
  );
}; 