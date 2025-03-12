import React, { useState } from 'react';

// Banner button interface
interface BannerButton {
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
   * Click handler
   */
  onClick?: () => void;
}

// Base banner props
interface BannerProps {
  /**
   * Banner content
   */
  content: React.ReactNode;
  /**
   * Action buttons
   */
  buttons?: BannerButton[];
  /**
   * Whether to show a close button
   */
  showCloseButton?: boolean;
  /**
   * Close handler
   */
  onClose?: () => void;
  /**
   * Whether the banner is visible
   */
  isVisible?: boolean;
  /**
   * Banner variant
   */
  variant?: 'default' | 'bordered' | 'cutout' | 'minimal';
  /**
   * Banner position
   */
  position?: 'top' | 'bottom';
  /**
   * Banner color
   */
  color?: 'default' | 'info' | 'success' | 'warning' | 'error';
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * Basic Banner component
 */
export const Banner: React.FC<BannerProps> = ({
  content,
  buttons,
  showCloseButton = true,
  onClose,
  isVisible = true,
  variant = 'default',
  position = 'top',
  color = 'default',
  className = '',
}) => {
  // State for visibility control when onClose is not provided
  const [isLocalVisible, setIsLocalVisible] = useState(true);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = onClose !== undefined;
  const visible = isControlled ? isVisible : isLocalVisible;
  
  // Handle close
  const handleClose = () => {
    if (isControlled) {
      onClose?.();
    } else {
      setIsLocalVisible(false);
    }
  };
  
  // Don't render if not visible
  if (!visible) {
    return null;
  }
  
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
  
  // Get color styles
  const getColorStyles = () => {
    switch (color) {
      case 'info':
        return 'bg-blue-50';
      case 'success':
        return 'bg-green-50';
      case 'warning':
        return 'bg-yellow-50';
      case 'error':
        return 'bg-red-50';
      default:
        return 'bg-white';
    }
  };
  
  // Get position styles
  const getPositionStyles = () => {
    return position === 'top' 
      ? 'mb-4' 
      : 'mt-4';
  };
  
  return (
    <div className={`
      ${getContainerStyles()}
      ${getColorStyles()}
      ${getPositionStyles()}
      p-4 md:p-5
      ${className}
    `}>
      <div className="flex items-center justify-between flex-wrap">
        {/* Content */}
        <div className="flex-1 pr-4 font-mono">
          {content}
        </div>
        
        {/* Actions */}
        <div className="flex items-center mt-2 md:mt-0 space-x-3">
          {buttons && buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`
                py-1.5 px-3 font-mono text-sm font-bold
                ${button.isPrimary 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'border-2 border-black hover:bg-black hover:text-white'}
                transition-colors
              `}
              {...(button.url ? { as: 'a', href: button.url } : {})}
            >
              {button.text}
            </button>
          ))}
          
          {/* Close button */}
          {showCloseButton && (
            <button
              aria-label="Close"
              onClick={handleClose}
              className="p-1 hover:bg-gray-200 transition-colors rounded-sm"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Sticky banner props (inherits from BannerProps)
interface StickyBannerProps extends BannerProps {
  /**
   * Whether to stick to the top or bottom of the page
   */
  stickyPosition?: 'top' | 'bottom';
  /**
   * Whether to animate in from top/bottom
   */
  animate?: boolean;
}

/**
 * Sticky Banner that stays at top or bottom of the viewport
 */
export const StickyBanner: React.FC<StickyBannerProps> = ({
  content,
  buttons,
  showCloseButton = true,
  onClose,
  isVisible = true,
  variant = 'default',
  color = 'default',
  stickyPosition = 'top',
  animate = true,
  className = '',
}) => {
  // State for visibility control when onClose is not provided
  const [isLocalVisible, setIsLocalVisible] = useState(true);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = onClose !== undefined;
  const visible = isControlled ? isVisible : isLocalVisible;
  
  // Handle close
  const handleClose = () => {
    if (isControlled) {
      onClose?.();
    } else {
      setIsLocalVisible(false);
    }
  };
  
  // Don't render if not visible
  if (!visible) {
    return null;
  }
  
  // Get container styles based on variant
  const getContainerStyles = () => {
    const baseStyles = 'z-50 w-full left-0 right-0';
    
    switch (variant) {
      case 'bordered':
        return `${baseStyles} ${stickyPosition === 'top' ? 'border-t-0 border-b-2' : 'border-b-0 border-t-2'} border-x-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`;
      case 'cutout':
        return `${baseStyles} ${stickyPosition === 'top' ? 'border-t-0 border-b-2' : 'border-b-0 border-t-2'} border-x-2 border-black transform rotate-[-0.5deg]`;
      case 'minimal':
        return `${baseStyles} ${stickyPosition === 'top' ? 'border-t-0 border-b' : 'border-b-0 border-t'} border-x border-gray-200`;
      default:
        return `${baseStyles} ${stickyPosition === 'top' ? 'border-t-0 border-b-2' : 'border-b-0 border-t-2'} border-x-2 border-black`;
    }
  };
  
  // Get color styles
  const getColorStyles = () => {
    switch (color) {
      case 'info':
        return 'bg-blue-50';
      case 'success':
        return 'bg-green-50';
      case 'warning':
        return 'bg-yellow-50';
      case 'error':
        return 'bg-red-50';
      default:
        return 'bg-white';
    }
  };
  
  // Get position styles
  const getPositionStyles = () => {
    const baseStyles = 'fixed';
    
    if (animate) {
      return `${baseStyles} ${stickyPosition === 'top' ? 'top-0 animate-slide-down' : 'bottom-0 animate-slide-up'}`;
    }
    
    return `${baseStyles} ${stickyPosition === 'top' ? 'top-0' : 'bottom-0'}`;
  };
  
  return (
    <div className={`
      ${getContainerStyles()}
      ${getColorStyles()}
      ${getPositionStyles()}
      ${className}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between flex-wrap">
          {/* Content */}
          <div className="flex-1 pr-4 font-mono">
            {content}
          </div>
          
          {/* Actions */}
          <div className="flex items-center mt-2 md:mt-0 space-x-3">
            {buttons && buttons.map((button, index) => (
              <button
                key={index}
                onClick={button.onClick}
                className={`
                  py-1.5 px-3 font-mono text-sm font-bold
                  ${button.isPrimary 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'border-2 border-black hover:bg-black hover:text-white'}
                  transition-colors
                `}
                {...(button.url ? { as: 'a', href: button.url } : {})}
              >
                {button.text}
              </button>
            ))}
            
            {/* Close button */}
            {showCloseButton && (
              <button
                aria-label="Close"
                onClick={handleClose}
                className="p-1 hover:bg-gray-200 transition-colors rounded-sm"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Required CSS for animations */}
      <style jsx>{`
        @keyframes slide-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(0); }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// Cookie consent banner props
interface CookieConsentBannerProps {
  /**
   * Banner title
   */
  title?: string;
  /**
   * Banner content
   */
  content: React.ReactNode;
  /**
   * Accept button text
   */
  acceptText?: string;
  /**
   * Reject button text
   */
  rejectText?: string;
  /**
   * Settings button text
   */
  settingsText?: string;
  /**
   * Action handlers
   */
  onAccept?: () => void;
  onReject?: () => void;
  onSettings?: () => void;
  /**
   * Banner variant
   */
  variant?: 'default' | 'bordered' | 'cutout' | 'minimal';
  /**
   * Banner position
   */
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left' | 'top-center';
  /**
   * Whether the banner is visible
   */
  isVisible?: boolean;
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * Cookie Consent Banner component
 */
export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  title = 'Cookie Policy',
  content,
  acceptText = 'Accept All',
  rejectText = 'Reject All',
  settingsText = 'Cookie Settings',
  onAccept,
  onReject,
  onSettings,
  variant = 'bordered',
  position = 'bottom-right',
  isVisible = true,
  className = '',
}) => {
  // State for local visibility
  const [isLocalVisible, setIsLocalVisible] = useState(true);
  
  // Controlled vs uncontrolled visibility
  const visible = onAccept !== undefined ? isVisible : isLocalVisible;
  
  // Don't render if not visible
  if (!visible) {
    return null;
  }
  
  // Handle actions
  const handleAccept = () => {
    if (onAccept) {
      onAccept();
    } else {
      setIsLocalVisible(false);
    }
  };
  
  const handleReject = () => {
    if (onReject) {
      onReject();
    } else {
      setIsLocalVisible(false);
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
  
  // Get position styles
  const getPositionStyles = () => {
    switch (position) {
      case 'bottom-left':
        return 'fixed bottom-4 left-4 max-w-sm';
      case 'bottom-center':
        return 'fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-md';
      case 'top-right':
        return 'fixed top-4 right-4 max-w-sm';
      case 'top-left':
        return 'fixed top-4 left-4 max-w-sm';
      case 'top-center':
        return 'fixed top-4 left-1/2 transform -translate-x-1/2 max-w-md';
      case 'bottom-right':
      default:
        return 'fixed bottom-4 right-4 max-w-sm';
    }
  };
  
  return (
    <div className={`
      ${getContainerStyles()}
      ${getPositionStyles()}
      p-4 md:p-5
      bg-white
      z-50
      animate-fade-in
      ${className}
    `}>
      {/* Title */}
      <div className="font-mono font-bold text-lg mb-2">
        {title}
      </div>
      
      {/* Content */}
      <div className="mb-4 text-sm">
        {content}
      </div>
      
      {/* Actions */}
      <div className="flex flex-col space-y-2">
        <button
          onClick={handleAccept}
          className="py-2 px-4 bg-black text-white font-mono font-bold hover:bg-gray-800 transition-colors w-full"
        >
          {acceptText}
        </button>
        
        <div className="flex space-x-2">
          <button
            onClick={handleReject}
            className="py-2 px-4 border-2 border-black font-mono font-bold hover:bg-black hover:text-white transition-colors flex-1"
          >
            {rejectText}
          </button>
          
          {onSettings && (
            <button
              onClick={onSettings}
              className="py-2 px-4 border-2 border-black font-mono font-bold hover:bg-black hover:text-white transition-colors flex-1"
            >
              {settingsText}
            </button>
          )}
        </div>
      </div>
      
      {/* Required CSS for animation */}
      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// Announcement banner props
interface AnnouncementBannerProps extends Omit<BannerProps, 'position'> {
  /**
   * Icon to display before content
   */
  icon?: React.ReactNode;
  /**
   * Whether to automatically dismiss the banner after a delay
   */
  autoDismiss?: boolean;
  /**
   * Delay in milliseconds before auto-dismissing
   */
  autoDismissDelay?: number;
}

/**
 * Announcement Banner for special messages
 */
export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  content,
  icon,
  buttons,
  showCloseButton = true,
  onClose,
  isVisible = true,
  variant = 'default',
  color = 'default',
  autoDismiss = false,
  autoDismissDelay = 5000,
  className = '',
}) => {
  // State for visibility control when onClose is not provided
  const [isLocalVisible, setIsLocalVisible] = useState(true);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = onClose !== undefined;
  const visible = isControlled ? isVisible : isLocalVisible;
  
  // Set up auto-dismiss
  React.useEffect(() => {
    if (autoDismiss && visible) {
      const timer = setTimeout(() => {
        if (isControlled) {
          onClose?.();
        } else {
          setIsLocalVisible(false);
        }
      }, autoDismissDelay);
      
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, autoDismissDelay, isControlled, onClose, visible]);
  
  // Handle close
  const handleClose = () => {
    if (isControlled) {
      onClose?.();
    } else {
      setIsLocalVisible(false);
    }
  };
  
  // Don't render if not visible
  if (!visible) {
    return null;
  }
  
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
  
  // Get color styles
  const getColorStyles = () => {
    switch (color) {
      case 'info':
        return 'bg-blue-50';
      case 'success':
        return 'bg-green-50';
      case 'warning':
        return 'bg-yellow-50';
      case 'error':
        return 'bg-red-50';
      default:
        return 'bg-white';
    }
  };
  
  return (
    <div className={`
      ${getContainerStyles()}
      ${getColorStyles()}
      p-4 md:p-5
      animate-fade-slide-down
      ${className}
    `}>
      <div className="flex items-center justify-between flex-wrap">
        {/* Icon and Content */}
        <div className="flex-1 pr-4 font-mono flex items-center">
          {icon && <span className="mr-3">{icon}</span>}
          <div>{content}</div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center mt-2 md:mt-0 space-x-3">
          {buttons && buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`
                py-1.5 px-3 font-mono text-sm font-bold
                ${button.isPrimary 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'border-2 border-black hover:bg-black hover:text-white'}
                transition-colors
              `}
              {...(button.url ? { as: 'a', href: button.url } : {})}
            >
              {button.text}
            </button>
          ))}
          
          {/* Close button */}
          {showCloseButton && (
            <button
              aria-label="Close"
              onClick={handleClose}
              className="p-1 hover:bg-gray-200 transition-colors rounded-sm"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      {/* Auto-dismiss progress bar */}
      {autoDismiss && (
        <div className="h-1 bg-gray-200 mt-2 w-full">
          <div 
            className="h-full bg-black"
            style={{ 
              animation: `shrink ${autoDismissDelay / 1000}s linear forwards`,
              transformOrigin: 'left'
            }}
          />
        </div>
      )}
      
      {/* Required CSS for animations */}
      <style jsx>{`
        @keyframes fade-slide-down {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-slide-down {
          animation: fade-slide-down 0.3s ease-out forwards;
        }
        
        @keyframes shrink {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
};

// Example implementation
export const BannerExamples: React.FC = () => {
  // State for sticky banner visibility
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  
  // State for cookie consent visibility
  const [isCookieVisible, setIsCookieVisible] = useState(false);
  
  // Toggle functions
  const toggleSticky = () => setIsStickyVisible(!isStickyVisible);
  const toggleCookie = () => setIsCookieVisible(!isCookieVisible);
  
  // Sample buttons
  const sampleButtons = [
    { text: 'Learn More', url: '#' },
    { text: 'Dismiss', isPrimary: true, onClick: () => console.log('Dismissed') },
  ];
  
  return (
    <div className="p-6 space-y-32">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Banner Components</h2>
      <p className="mb-8 font-sans">
        Banner components with brutalist styling for notifications and announcements.
      </p>
      
      {/* Standard Banner Examples */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Standard Banners</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-mono font-bold mb-2">Default Banner</h4>
            <Banner
              content="This is a standard banner message."
              buttons={sampleButtons}
              variant="default"
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Bordered Banner</h4>
            <Banner
              content="This is a bordered banner with an important message."
              buttons={sampleButtons}
              variant="bordered"
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Cutout Banner</h4>
            <Banner
              content="This banner uses the cutout style for a rugged look."
              buttons={sampleButtons}
              variant="cutout"
            />
          </div>
        </div>
      </div>
      
      {/* Colored Banner Examples */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Colored Banners</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-mono font-bold mb-2">Info Banner</h4>
            <Banner
              content="This banner contains helpful information."
              color="info"
              variant="bordered"
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Success Banner</h4>
            <Banner
              content="Your action was completed successfully!"
              color="success"
              variant="bordered"
              buttons={[{ text: 'Continue', isPrimary: true }]}
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Warning Banner</h4>
            <Banner
              content="Be careful! This action cannot be undone."
              color="warning"
              variant="bordered"
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Error Banner</h4>
            <Banner
              content="An error occurred while processing your request."
              color="error"
              variant="bordered"
              buttons={[{ text: 'Try Again', isPrimary: true }]}
            />
          </div>
        </div>
      </div>
      
      {/* Announcement Banner Examples */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Announcement Banners</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-mono font-bold mb-2">Basic Announcement</h4>
            <AnnouncementBanner
              content="Our new product is launching on July 1st!"
              icon="🎉"
              variant="bordered"
              buttons={[{ text: 'Learn More', isPrimary: true }]}
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Auto-dismiss Announcement</h4>
            <AnnouncementBanner
              content="This announcement will auto-dismiss in 5 seconds."
              icon="⏱️"
              variant="bordered"
              color="info"
              autoDismiss={true}
              buttons={[{ text: 'Take Action', isPrimary: true }]}
            />
          </div>
        </div>
      </div>
      
      {/* Sticky Banner Examples */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Sticky Banner</h3>
        <div className="flex justify-center mb-8">
          <button
            onClick={toggleSticky}
            className="py-2 px-4 bg-black text-white font-mono font-bold"
          >
            {isStickyVisible ? 'Hide Sticky Banner' : 'Show Sticky Banner'}
          </button>
        </div>
        
        {isStickyVisible && (
          <StickyBanner
            content="This is a sticky banner that stays at the top of the page."
            buttons={[{ text: 'Learn More', isPrimary: true }]}
            variant="bordered"
            color="info"
            isVisible={isStickyVisible}
            onClose={() => setIsStickyVisible(false)}
            stickyPosition="top"
          />
        )}
      </div>
      
      {/* Cookie Consent Banner Example */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Cookie Consent Banner</h3>
        <div className="flex justify-center mb-8">
          <button
            onClick={toggleCookie}
            className="py-2 px-4 bg-black text-white font-mono font-bold"
          >
            {isCookieVisible ? 'Hide Cookie Banner' : 'Show Cookie Banner'}
          </button>
        </div>
        
        {isCookieVisible && (
          <CookieConsentBanner
            title="Cookie Policy"
            content="We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies."
            onAccept={() => {
              console.log('Cookies accepted');
              setIsCookieVisible(false);
            }}
            onReject={() => {
              console.log('Cookies rejected');
              setIsCookieVisible(false);
            }}
            onSettings={() => console.log('Cookie settings opened')}
            variant="bordered"
            position="bottom-right"
            isVisible={isCookieVisible}
          />
        )}
      </div>
    </div>
  );
}; 