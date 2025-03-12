import React from 'react';

// CTA action button interface
interface CTAButton {
  /**
   * Button text
   */
  text: string;
  /**
   * URL to navigate to
   */
  url?: string;
  /**
   * Whether this is the primary button
   */
  isPrimary?: boolean;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Icon to display with the button
   */
  icon?: React.ReactNode;
}

// Base CTA props
interface CTAProps {
  /**
   * Main heading text
   */
  heading: string;
  /**
   * Subheading or description
   */
  subheading?: string;
  /**
   * Array of action buttons
   */
  buttons: CTAButton[];
  /**
   * Variant of the CTA
   */
  variant?: 'default' | 'bordered' | 'cutout' | 'minimal';
  /**
   * Background color
   */
  bgColor?: string;
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * Simple Call-to-Action component
 */
export const CTA: React.FC<CTAProps> = ({
  heading,
  subheading,
  buttons,
  variant = 'default',
  bgColor = 'bg-white',
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
  
  return (
    <div className={`${getContainerStyles()} ${bgColor} p-8 md:p-12 text-center ${className}`}>
      <h2 className="text-2xl md:text-3xl font-mono font-bold mb-4">{heading}</h2>
      
      {subheading && (
        <p className="mb-8 max-w-3xl mx-auto text-lg">{subheading}</p>
      )}
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            className={`
              py-3 px-6 font-mono font-bold
              ${button.isPrimary 
                ? 'bg-black text-white hover:bg-gray-800' 
                : 'border-2 border-black hover:bg-black hover:text-white'}
              transition-colors flex items-center justify-center
            `}
            {...(button.url ? { as: 'a', href: button.url } : {})}
          >
            {button.icon && <span className="mr-2">{button.icon}</span>}
            {button.text}
          </button>
        ))}
      </div>
    </div>
  );
};

// Full width CTA props
interface FullWidthCTAProps extends CTAProps {
  /**
   * Background image URL
   */
  backgroundImage?: string;
  /**
   * Text color
   */
  textColor?: string;
  /**
   * Content alignment
   */
  align?: 'left' | 'center' | 'right';
}

/**
 * Full-width Call-to-Action with background
 */
export const FullWidthCTA: React.FC<FullWidthCTAProps> = ({
  heading,
  subheading,
  buttons,
  variant = 'default',
  bgColor = 'bg-gray-100',
  backgroundImage,
  textColor = 'text-black',
  align = 'center',
  className = '',
}) => {
  // Get text alignment styles
  const getAlignmentStyles = () => {
    switch (align) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      default:
        return 'text-center';
    }
  };
  
  return (
    <div className={`relative py-16 md:py-24 ${bgColor} ${className}`}>
      {/* Background image if provided */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      
      {/* Content */}
      <div className={`relative z-10 container mx-auto px-4 ${getAlignmentStyles()}`}>
        <h2 className={`text-3xl md:text-4xl font-mono font-bold mb-4 ${textColor}`}>
          {heading}
        </h2>
        
        {subheading && (
          <p className={`mb-8 max-w-3xl mx-auto text-lg ${textColor} ${align === 'center' ? 'mx-auto' : ''}`}>
            {subheading}
          </p>
        )}
        
        <div className={`flex flex-col sm:flex-row gap-4 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`
                py-3 px-6 font-mono font-bold
                ${button.isPrimary 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : `border-2 border-black ${textColor} hover:bg-black hover:text-white`}
                transition-colors flex items-center justify-center
              `}
              {...(button.url ? { as: 'a', href: button.url } : {})}
            >
              {button.icon && <span className="mr-2">{button.icon}</span>}
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Split CTA props
interface SplitCTAProps extends Omit<CTAProps, 'variant'> {
  /**
   * Image URL for the split section
   */
  image: string;
  /**
   * Alt text for the image
   */
  imageAlt: string;
  /**
   * Whether the image should be on the left
   */
  imageLeft?: boolean;
  /**
   * Content padding
   */
  padding?: string;
}

/**
 * Split Call-to-Action with image and content
 */
export const SplitCTA: React.FC<SplitCTAProps> = ({
  heading,
  subheading,
  buttons,
  image,
  imageAlt,
  imageLeft = false,
  bgColor = 'bg-white',
  padding = 'p-8 md:p-12',
  className = '',
}) => {
  // Order of content and image based on imageLeft prop
  const contentOrder = imageLeft ? 'md:order-2' : 'md:order-1';
  const imageOrder = imageLeft ? 'md:order-1' : 'md:order-2';
  
  return (
    <div className={`border-2 border-black overflow-hidden ${className}`}>
      <div className="flex flex-col md:flex-row">
        {/* Content section */}
        <div className={`${contentOrder} md:w-1/2 ${bgColor} ${padding}`}>
          <h2 className="text-2xl md:text-3xl font-mono font-bold mb-4">{heading}</h2>
          
          {subheading && (
            <p className="mb-8 text-lg">{subheading}</p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={button.onClick}
                className={`
                  py-3 px-6 font-mono font-bold
                  ${button.isPrimary 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'border-2 border-black hover:bg-black hover:text-white'}
                  transition-colors flex items-center justify-center
                `}
                {...(button.url ? { as: 'a', href: button.url } : {})}
              >
                {button.icon && <span className="mr-2">{button.icon}</span>}
                {button.text}
              </button>
            ))}
          </div>
        </div>
        
        {/* Image section */}
        <div className={`${imageOrder} md:w-1/2 border-t-2 md:border-t-0 ${imageLeft ? 'md:border-r-2' : 'md:border-l-2'} border-black`}>
          <img 
            src={image} 
            alt={imageAlt} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

// Sticky CTA props
interface StickyCTAProps extends Omit<CTAProps, 'variant'> {
  /**
   * Whether the CTA is visible/expanded
   */
  isVisible?: boolean;
  /**
   * Position of the sticky CTA
   */
  position?: 'top' | 'bottom';
  /**
   * Whether to show a close button
   */
  showCloseButton?: boolean;
  /**
   * Close button handler
   */
  onClose?: () => void;
}

/**
 * Sticky Call-to-Action that appears at the top or bottom
 */
export const StickyCTA: React.FC<StickyCTAProps> = ({
  heading,
  subheading,
  buttons,
  isVisible = true,
  position = 'bottom',
  showCloseButton = true,
  onClose,
  bgColor = 'bg-white',
  className = '',
}) => {
  // Calculate position styles
  const getPositionStyles = () => {
    return position === 'top' 
      ? 'top-0 border-t-0 border-r-2 border-l-2 border-b-2' 
      : 'bottom-0 border-b-0 border-r-2 border-l-2 border-t-2';
  };
  
  // Handle transition styles
  const getTransitionStyles = () => {
    if (!isVisible) {
      return position === 'top' ? '-translate-y-full' : 'translate-y-full';
    }
    return 'translate-y-0';
  };
  
  return (
    <div 
      className={`
        fixed left-0 right-0 z-50
        ${getPositionStyles()}
        border-black
        ${bgColor}
        transition-transform duration-300
        ${getTransitionStyles()}
        ${className}
      `}
    >
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Content */}
          <div className="mb-4 md:mb-0 md:mr-6 text-center md:text-left">
            <h2 className="text-lg md:text-xl font-mono font-bold">{heading}</h2>
            {subheading && <p className="text-sm">{subheading}</p>}
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={button.onClick}
                className={`
                  py-2 px-4 font-mono font-bold text-sm
                  ${button.isPrimary 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'border-2 border-black hover:bg-black hover:text-white'}
                  transition-colors flex items-center justify-center
                `}
                {...(button.url ? { as: 'a', href: button.url } : {})}
              >
                {button.icon && <span className="mr-2">{button.icon}</span>}
                {button.text}
              </button>
            ))}
          </div>
          
          {/* Close button */}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-xl"
              aria-label="Close"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Newsletter CTA props
interface NewsletterCTAProps {
  /**
   * Main heading text
   */
  heading: string;
  /**
   * Subheading or description
   */
  subheading?: string;
  /**
   * Button text
   */
  buttonText?: string;
  /**
   * Placeholder text for the email input
   */
  placeholder?: string;
  /**
   * Initial value for the email input
   */
  initialEmail?: string;
  /**
   * Form submission handler
   */
  onSubmit?: (email: string) => void;
  /**
   * Variant of the CTA
   */
  variant?: 'default' | 'bordered' | 'cutout' | 'minimal';
  /**
   * Background color
   */
  bgColor?: string;
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * Newsletter signup Call-to-Action
 */
export const NewsletterCTA: React.FC<NewsletterCTAProps> = ({
  heading,
  subheading,
  buttonText = 'Subscribe',
  placeholder = 'Enter your email',
  initialEmail = '',
  onSubmit,
  variant = 'default',
  bgColor = 'bg-white',
  className = '',
}) => {
  // State for email input
  const [email, setEmail] = React.useState(initialEmail);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email);
    }
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
        return 'border-2 border-black';
    }
  };
  
  return (
    <div className={`${getContainerStyles()} ${bgColor} p-8 md:p-12 ${className}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-mono font-bold mb-4">{heading}</h2>
        
        {subheading && (
          <p className="mb-8 text-lg">{subheading}</p>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            className="py-3 px-4 border-2 border-black font-mono focus:outline-none flex-grow max-w-md"
          />
          
          <button
            type="submit"
            className="py-3 px-6 bg-black text-white font-mono font-bold hover:bg-gray-800 transition-colors"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

// Example implementation
export const CTAExamples: React.FC = () => {
  // Sample buttons
  const primaryButtons = [
    { text: 'Get Started', isPrimary: true },
    { text: 'Learn More' },
  ];
  
  const singleButton = [
    { text: 'Sign Up Now', isPrimary: true, icon: <span>→</span> },
  ];
  
  // Newsletter form handler
  const handleNewsletterSubmit = (email: string) => {
    console.log(`Subscribed with email: ${email}`);
  };
  
  // Sticky CTA state
  const [isStickyCTAVisible, setIsStickyCTAVisible] = React.useState(true);
  
  return (
    <div className="p-6 space-y-32">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Call-to-Action Components</h2>
      <p className="mb-8 font-sans">
        Call-to-action components with brutalist styling to prompt user engagement.
      </p>
      
      {/* Standard CTA Examples */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Standard CTA Variants</h3>
        <div className="space-y-12">
          <div>
            <h4 className="font-mono font-bold mb-2">Default Variant</h4>
            <CTA
              heading="Ready to Get Started?"
              subheading="Join thousands of users who have already transformed their workflow."
              buttons={primaryButtons}
              variant="default"
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Bordered Variant</h4>
            <CTA
              heading="Try Our Premium Plan"
              subheading="Unlock all features and take your experience to the next level."
              buttons={primaryButtons}
              variant="bordered"
              bgColor="bg-gray-50"
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Cutout Variant</h4>
            <CTA
              heading="Limited Time Offer"
              subheading="Get 50% off your first month when you sign up today."
              buttons={singleButton}
              variant="cutout"
            />
          </div>
        </div>
      </div>
      
      {/* Full Width CTA Examples */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Full Width CTA</h3>
        <FullWidthCTA
          heading="Join Our Community"
          subheading="Connect with designers and developers who share your passion."
          buttons={primaryButtons}
          bgColor="bg-gray-100"
        />
        
        <div className="mt-12">
          <h4 className="font-mono font-bold mb-2">With Background Image</h4>
          <FullWidthCTA
            heading="Elevate Your Design System"
            subheading="Brutalist design components that stand out from the crowd."
            buttons={singleButton}
            backgroundImage="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&auto=format"
            bgColor="bg-gray-900"
            textColor="text-white"
          />
        </div>
        
        <div className="mt-12">
          <h4 className="font-mono font-bold mb-2">Left-Aligned Content</h4>
          <FullWidthCTA
            heading="Ready For The Next Step?"
            subheading="Our team is ready to help you implement your design vision."
            buttons={primaryButtons}
            align="left"
            bgColor="bg-yellow-50"
          />
        </div>
      </div>
      
      {/* Split CTA Examples */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Split CTA</h3>
        <SplitCTA
          heading="Build Better Interfaces"
          subheading="Our brutalist components combine raw aesthetics with functional design principles."
          buttons={primaryButtons}
          image="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&auto=format"
          imageAlt="Designer working on interface"
        />
        
        <div className="mt-12">
          <h4 className="font-mono font-bold mb-2">Image on Left</h4>
          <SplitCTA
            heading="Crafted For Developers"
            subheading="Clean code, thoughtful APIs, and developer-friendly implementation."
            buttons={singleButton}
            image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format"
            imageAlt="Code on screen"
            imageLeft={true}
            bgColor="bg-gray-50"
          />
        </div>
      </div>
      
      {/* Newsletter CTA Examples */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Newsletter CTA</h3>
        <NewsletterCTA
          heading="Stay In The Loop"
          subheading="Subscribe to our newsletter for updates, tips, and exclusive content."
          buttonText="Subscribe"
          placeholder="you@example.com"
          onSubmit={handleNewsletterSubmit}
          variant="bordered"
        />
        
        <div className="mt-12">
          <h4 className="font-mono font-bold mb-2">Alternative Style</h4>
          <NewsletterCTA
            heading="Join Our Design Community"
            subheading="Get weekly insights and resources straight to your inbox."
            buttonText="Join Now"
            variant="cutout"
            bgColor="bg-gray-50"
          />
        </div>
      </div>
      
      {/* Sticky CTA Example */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Sticky CTA</h3>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setIsStickyCTAVisible(!isStickyCTAVisible)}
            className="border-2 border-black px-4 py-2 font-mono"
          >
            {isStickyCTAVisible ? 'Hide Sticky CTA' : 'Show Sticky CTA'}
          </button>
        </div>
        
        <StickyCTA
          heading="Get 20% Off Today!"
          subheading="Use code BRUTALIST20 at checkout."
          buttons={[{ text: 'Claim Offer', isPrimary: true }]}
          isVisible={isStickyCTAVisible}
          position="bottom"
          showCloseButton={true}
          onClose={() => setIsStickyCTAVisible(false)}
          bgColor="bg-yellow-100"
        />
      </div>
    </div>
  );
}; 