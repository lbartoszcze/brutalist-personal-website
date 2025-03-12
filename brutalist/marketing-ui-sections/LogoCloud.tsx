import React from 'react';

// Logo item interface
interface LogoItem {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for the logo
   */
  alt: string;
  /**
   * URL to navigate to when clicked
   */
  url?: string;
  /**
   * Width of the logo (in pixels or as a percentage)
   */
  width?: string | number;
  /**
   * Height of the logo (in pixels or as a percentage)
   */
  height?: string | number;
}

// Logo cloud props
interface LogoCloudProps {
  /**
   * Array of logo items
   */
  logos: LogoItem[];
  /**
   * Section title
   */
  title?: string;
  /**
   * Subtitle or description
   */
  subtitle?: string;
  /**
   * Number of columns for the logo grid
   */
  columns?: 2 | 3 | 4 | 5 | 6;
  /**
   * Variant of the logo cloud
   */
  variant?: 'default' | 'bordered' | 'cutout' | 'minimal';
  /**
   * Whether logos should be grayscale
   */
  grayscale?: boolean;
  /**
   * Whether to animate logos on hover
   */
  animateOnHover?: boolean;
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * Logo cloud component for displaying partner/client logos
 */
export const LogoCloud: React.FC<LogoCloudProps> = ({
  logos,
  title,
  subtitle,
  columns = 4,
  variant = 'default',
  grayscale = false,
  animateOnHover = true,
  className = '',
}) => {
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
        return '';
    }
  };
  
  // Get logo styles
  const getLogoStyles = (logo: LogoItem) => {
    return {
      width: logo.width || 'auto',
      height: logo.height || 'auto',
      maxWidth: '100%',
      maxHeight: '64px',
      filter: grayscale ? 'grayscale(100%)' : 'none',
      transition: animateOnHover ? 'transform 0.2s, opacity 0.2s, filter 0.2s' : 'none',
    };
  };
  
  // Render the logo
  const renderLogo = (logo: LogoItem, index: number) => {
    const logoContent = (
      <img
        src={logo.src}
        alt={logo.alt}
        style={getLogoStyles(logo)}
        className={`
          mx-auto
          ${animateOnHover ? 'hover:opacity-80 hover:scale-105' : ''}
          ${grayscale && animateOnHover ? 'hover:filter-none' : ''}
        `}
      />
    );
    
    if (logo.url) {
      return (
        <a
          key={index}
          href={logo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-4"
        >
          {logoContent}
        </a>
      );
    }
    
    return (
      <div key={index} className="flex items-center justify-center p-4">
        {logoContent}
      </div>
    );
  };
  
  // Dynamic grid column classes based on the columns prop
  const getGridColumns = () => {
    return `grid-cols-2 sm:grid-cols-2 md:grid-cols-${columns}`;
  };
  
  return (
    <div className={className}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && <h2 className="text-2xl md:text-3xl font-mono font-bold uppercase mb-4">{title}</h2>}
          {subtitle && <p className="text-lg max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}
      
      {/* Logo grid */}
      <div className={`${getContainerStyles()} p-4 bg-white`}>
        <div className={`grid ${getGridColumns()} gap-4 md:gap-8`}>
          {logos.map(renderLogo)}
        </div>
      </div>
    </div>
  );
};

// Marquee (scrolling) logo cloud props
interface MarqueeLogoCloudProps extends Omit<LogoCloudProps, 'columns'> {
  /**
   * Speed of the marquee animation (1-10)
   */
  speed?: number;
  /**
   * Whether to pause animation on hover
   */
  pauseOnHover?: boolean;
  /**
   * Whether to reverse the scrolling direction
   */
  reverse?: boolean;
}

/**
 * Marquee logo cloud with scrolling animation
 */
export const MarqueeLogoCloud: React.FC<MarqueeLogoCloudProps> = ({
  logos,
  title,
  subtitle,
  variant = 'default',
  grayscale = false,
  animateOnHover = true,
  speed = 5,
  pauseOnHover = true,
  reverse = false,
  className = '',
}) => {
  // Calculate animation duration based on speed
  const getDuration = () => {
    // Slower speed means longer duration
    return `${30 - (speed * 2)}s`;
  };
  
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
        return '';
    }
  };
  
  // Get logo styles
  const getLogoStyles = (logo: LogoItem) => {
    return {
      width: logo.width || 'auto',
      height: logo.height || 'auto',
      maxWidth: '100%',
      maxHeight: '64px',
      filter: grayscale ? 'grayscale(100%)' : 'none',
      transition: animateOnHover ? 'opacity 0.2s, filter 0.2s' : 'none',
    };
  };
  
  // Render the logo
  const renderLogo = (logo: LogoItem, index: number) => {
    const logoContent = (
      <img
        src={logo.src}
        alt={logo.alt}
        style={getLogoStyles(logo)}
        className={`
          mx-auto
          ${animateOnHover ? 'hover:opacity-80' : ''}
          ${grayscale && animateOnHover ? 'hover:filter-none' : ''}
        `}
      />
    );
    
    if (logo.url) {
      return (
        <a
          key={index}
          href={logo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-8"
        >
          {logoContent}
        </a>
      );
    }
    
    return (
      <div key={index} className="flex items-center justify-center px-8">
        {logoContent}
      </div>
    );
  };
  
  // Double the logos for continuous scrolling
  const doubledLogos = [...logos, ...logos];
  
  return (
    <div className={className}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && <h2 className="text-2xl md:text-3xl font-mono font-bold uppercase mb-4">{title}</h2>}
          {subtitle && <p className="text-lg max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}
      
      {/* Marquee container */}
      <div className={`${getContainerStyles()} overflow-hidden bg-white py-8`}>
        <div 
          className={`
            flex whitespace-nowrap
            ${pauseOnHover ? 'hover:pause' : ''}
          `}
          style={{
            animation: `scroll${reverse ? 'Reverse' : ''} ${getDuration()} linear infinite`,
          }}
        >
          {doubledLogos.map(renderLogo)}
        </div>
      </div>
      
      {/* Required CSS for the animation */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes scrollReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

// Logo grid with featured item props
interface FeaturedLogoCloudProps extends Omit<LogoCloudProps, 'columns'> {
  /**
   * Featured logo with additional content
   */
  featuredLogo: {
    /**
     * Logo item
     */
    logo: LogoItem;
    /**
     * Featured heading
     */
    heading: string;
    /**
     * Featured description
     */
    description: string;
    /**
     * Button text
     */
    buttonText?: string;
    /**
     * Button URL
     */
    buttonUrl?: string;
  };
  /**
   * Whether the featured logo should be on the left
   */
  featuredLeft?: boolean;
}

/**
 * Logo cloud with a featured logo and testimonial/content
 */
export const FeaturedLogoCloud: React.FC<FeaturedLogoCloudProps> = ({
  logos,
  featuredLogo,
  title,
  subtitle,
  variant = 'default',
  grayscale = false,
  animateOnHover = true,
  featuredLeft = true,
  className = '',
}) => {
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
  
  // Get logo styles
  const getLogoStyles = (logo: LogoItem) => {
    return {
      width: logo.width || 'auto',
      height: logo.height || 'auto',
      maxWidth: '100%',
      maxHeight: '64px',
      filter: grayscale ? 'grayscale(100%)' : 'none',
      transition: animateOnHover ? 'transform 0.2s, opacity 0.2s, filter 0.2s' : 'none',
    };
  };
  
  // Render regular logo
  const renderLogo = (logo: LogoItem, index: number) => {
    const logoContent = (
      <img
        src={logo.src}
        alt={logo.alt}
        style={getLogoStyles(logo)}
        className={`
          mx-auto
          ${animateOnHover ? 'hover:opacity-80 hover:scale-105' : ''}
          ${grayscale && animateOnHover ? 'hover:filter-none' : ''}
        `}
      />
    );
    
    if (logo.url) {
      return (
        <a
          key={index}
          href={logo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-4"
        >
          {logoContent}
        </a>
      );
    }
    
    return (
      <div key={index} className="flex items-center justify-center p-4">
        {logoContent}
      </div>
    );
  };
  
  // Order based on featuredLeft
  const featuredOrder = featuredLeft ? 'md:order-1' : 'md:order-2';
  const gridOrder = featuredLeft ? 'md:order-2' : 'md:order-1';
  
  return (
    <div className={className}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && <h2 className="text-2xl md:text-3xl font-mono font-bold uppercase mb-4">{title}</h2>}
          {subtitle && <p className="text-lg max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}
      
      {/* Main container */}
      <div className={`${getContainerStyles()} bg-white overflow-hidden`}>
        <div className="flex flex-col md:flex-row">
          {/* Featured logo section */}
          <div className={`${featuredOrder} md:w-1/3 p-8 md:p-12 bg-gray-50 border-b-2 md:border-b-0 ${featuredLeft ? 'md:border-r-2' : 'md:border-l-2'} border-black`}>
            <div className="flex flex-col items-center text-center h-full">
              {/* Featured logo */}
              <div className="mb-6">
                <img
                  src={featuredLogo.logo.src}
                  alt={featuredLogo.logo.alt}
                  style={{
                    width: featuredLogo.logo.width || 'auto',
                    height: featuredLogo.logo.height || 'auto',
                    maxWidth: '100%',
                    maxHeight: '80px',
                  }}
                />
              </div>
              
              {/* Featured content */}
              <h3 className="text-xl font-mono font-bold mb-4">{featuredLogo.heading}</h3>
              <p className="mb-6">{featuredLogo.description}</p>
              
              {/* Button if provided */}
              {featuredLogo.buttonText && (
                <a
                  href={featuredLogo.buttonUrl || '#'}
                  className="mt-auto py-2 px-4 bg-black text-white font-mono font-bold hover:bg-gray-800 transition-colors"
                >
                  {featuredLogo.buttonText}
                </a>
              )}
            </div>
          </div>
          
          {/* Logo grid section */}
          <div className={`${gridOrder} md:w-2/3 p-6`}>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {logos.map(renderLogo)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example implementation
export const LogoCloudExamples: React.FC = () => {
  // Sample logos
  const sampleLogos = [
    {
      src: 'https://via.placeholder.com/150x50?text=Logo+1',
      alt: 'Company 1',
      url: '#',
    },
    {
      src: 'https://via.placeholder.com/150x50?text=Logo+2',
      alt: 'Company 2',
      url: '#',
    },
    {
      src: 'https://via.placeholder.com/150x50?text=Logo+3',
      alt: 'Company 3',
      url: '#',
    },
    {
      src: 'https://via.placeholder.com/150x50?text=Logo+4',
      alt: 'Company 4',
      url: '#',
    },
    {
      src: 'https://via.placeholder.com/150x50?text=Logo+5',
      alt: 'Company 5',
      url: '#',
    },
    {
      src: 'https://via.placeholder.com/150x50?text=Logo+6',
      alt: 'Company 6',
      url: '#',
    },
    {
      src: 'https://via.placeholder.com/150x50?text=Logo+7',
      alt: 'Company 7',
      url: '#',
    },
    {
      src: 'https://via.placeholder.com/150x50?text=Logo+8',
      alt: 'Company 8',
      url: '#',
    },
  ];
  
  // Featured logo for the featured example
  const featuredLogo = {
    logo: {
      src: 'https://via.placeholder.com/200x80?text=Featured+Logo',
      alt: 'Featured Company',
      url: '#',
    },
    heading: 'Our Main Partner',
    description: 'We\'ve been working with this amazing company for over 5 years, delivering exceptional results together.',
    buttonText: 'Learn More',
    buttonUrl: '#',
  };
  
  // Marquee logos (more for continuous scrolling)
  const marqueeLogos = [
    ...sampleLogos,
    {
      src: 'https://via.placeholder.com/150x50?text=Logo+9',
      alt: 'Company 9',
      url: '#',
    },
    {
      src: 'https://via.placeholder.com/150x50?text=Logo+10',
      alt: 'Company 10',
      url: '#',
    },
  ];
  
  return (
    <div className="p-6 space-y-32">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Logo Cloud Components</h2>
      <p className="mb-8 font-sans">
        Logo cloud components with brutalist styling for showcasing partners and clients.
      </p>
      
      {/* Basic Logo Cloud */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Basic Logo Cloud</h3>
        <LogoCloud
          logos={sampleLogos.slice(0, 6)}
          title="Our Partners"
          subtitle="We're proud to work with these amazing companies"
          columns={3}
          variant="bordered"
        />
      </div>
      
      {/* Logo Variants */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Logo Cloud Variants</h3>
        <div className="space-y-12">
          <div>
            <h4 className="font-mono font-bold mb-2">Bordered Variant</h4>
            <LogoCloud
              logos={sampleLogos.slice(0, 4)}
              variant="bordered"
              columns={4}
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Cutout Variant</h4>
            <LogoCloud
              logos={sampleLogos.slice(0, 4)}
              variant="cutout"
              columns={4}
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Minimal Variant</h4>
            <LogoCloud
              logos={sampleLogos.slice(0, 4)}
              variant="minimal"
              columns={4}
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Grayscale Logos</h4>
            <LogoCloud
              logos={sampleLogos.slice(0, 4)}
              variant="bordered"
              columns={4}
              grayscale={true}
            />
          </div>
        </div>
      </div>
      
      {/* Marquee Logo Cloud */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Marquee Logo Cloud</h3>
        <MarqueeLogoCloud
          logos={marqueeLogos}
          title="Trusted By"
          subtitle="Join these leading companies using our platform"
          variant="bordered"
          speed={3}
          pauseOnHover={true}
        />
        
        <div className="mt-12">
          <h4 className="font-mono font-bold mb-2">Reverse Direction</h4>
          <MarqueeLogoCloud
            logos={marqueeLogos}
            variant="cutout"
            speed={5}
            reverse={true}
            grayscale={true}
          />
        </div>
      </div>
      
      {/* Featured Logo Cloud */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Featured Logo Cloud</h3>
        <FeaturedLogoCloud
          logos={sampleLogos.slice(0, 6)}
          featuredLogo={featuredLogo}
          title="Our Partnerships"
          subtitle="Collaborating with industry leaders to deliver excellence"
          variant="bordered"
          featuredLeft={true}
        />
        
        <div className="mt-12">
          <h4 className="font-mono font-bold mb-2">Featured on Right</h4>
          <FeaturedLogoCloud
            logos={sampleLogos.slice(0, 6)}
            featuredLogo={featuredLogo}
            variant="cutout"
            featuredLeft={false}
          />
        </div>
      </div>
    </div>
  );
}; 