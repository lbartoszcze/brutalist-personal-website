import React, { useState, useEffect, useRef } from 'react';

interface CoachMarkProps {
  children: React.ReactNode;
  target: React.RefObject<HTMLElement>;
  title?: string;
  isOpen?: boolean; 
  onClose?: () => void;
  position?: 'top' | 'right' | 'bottom' | 'left';
  variant?: 'default' | 'bordered' | 'cutout';
  hasArrow?: boolean;
  hasCloseButton?: boolean;
  offset?: number;
  maxWidth?: number;
  zIndex?: number;
  className?: string;
}

export const CoachMark: React.FC<CoachMarkProps> = ({
  children,
  target,
  title,
  isOpen = false,
  onClose,
  position = 'bottom',
  variant = 'default',
  hasArrow = true,
  hasCloseButton = true,
  offset = 8,
  maxWidth = 300,
  zIndex = 50,
  className = '',
}) => {
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  // Calculate position
  const calculatePosition = () => {
    if (!target.current || !tooltipRef.current) return;
    
    const targetRect = target.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    
    let top = 0;
    let left = 0;
    
    switch (position) {
      case 'top':
        top = targetRect.top + scrollTop - tooltipRect.height - offset;
        left = targetRect.left + scrollLeft + (targetRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'right':
        top = targetRect.top + scrollTop + (targetRect.height / 2) - (tooltipRect.height / 2);
        left = targetRect.right + scrollLeft + offset;
        break;
      case 'bottom':
        top = targetRect.bottom + scrollTop + offset;
        left = targetRect.left + scrollLeft + (targetRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = targetRect.top + scrollTop + (targetRect.height / 2) - (tooltipRect.height / 2);
        left = targetRect.left + scrollLeft - tooltipRect.width - offset;
        break;
    }
    
    // Ensure tooltip stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    if (left < 0) left = 0;
    if (left + tooltipRect.width > viewportWidth) {
      left = viewportWidth - tooltipRect.width;
    }
    
    if (top < 0) top = 0;
    if (top + tooltipRect.height > viewportHeight + scrollTop) {
      top = viewportHeight + scrollTop - tooltipRect.height;
    }
    
    setCoords({ top, left });
  };
  
  // Update position when tooltip becomes visible
  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      
      // Recalculate on window resize or scroll
      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition);
      
      return () => {
        window.removeEventListener('resize', calculatePosition);
        window.removeEventListener('scroll', calculatePosition);
      };
    }
  }, [isOpen, target.current, tooltipRef.current]);
  
  // Handle escape key
  useEffect(() => {
    if (isOpen && onClose) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);
  
  // Handle outside click
  useEffect(() => {
    if (isOpen && onClose) {
      const handleOutsideClick = (e: MouseEvent) => {
        if (
          tooltipRef.current && 
          !tooltipRef.current.contains(e.target as Node) &&
          target.current &&
          !target.current.contains(e.target as Node)
        ) {
          onClose();
        }
      };
      
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  // Variant styles
  const variantClasses = {
    default: 'bg-white border-2 border-black',
    bordered: 'bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
    cutout: 'bg-white border-2 border-black transform rotate-[-1deg]',
  };
  
  // Arrow styles
  const arrowClasses = {
    top: 'bottom-[-8px] left-1/2 transform -translate-x-1/2 border-t-black border-r-black border-b-transparent border-l-transparent',
    right: 'left-[-8px] top-1/2 transform -translate-y-1/2 border-t-transparent border-r-black border-b-black border-l-transparent',
    bottom: 'top-[-8px] left-1/2 transform -translate-x-1/2 border-t-transparent border-r-transparent border-b-black border-l-black',
    left: 'right-[-8px] top-1/2 transform -translate-y-1/2 border-t-black border-r-transparent border-b-transparent border-l-black',
  };
  
  return (
    <div 
      ref={tooltipRef}
      className={`
        fixed font-mono p-4
        ${variantClasses[variant]}
        ${className}
      `}
      style={{ 
        top: coords.top, 
        left: coords.left,
        maxWidth,
        zIndex
      }}
    >
      {/* Title and close button */}
      {(title || hasCloseButton) && (
        <div className="flex justify-between items-center mb-2">
          {title && <div className="font-bold">{title}</div>}
          {hasCloseButton && (
            <button 
              onClick={onClose}
              className="ml-4 text-xl font-bold hover:text-gray-600"
              aria-label="Close"
            >
              ×
            </button>
          )}
        </div>
      )}
      
      {/* Content */}
      <div>{children}</div>
      
      {/* Arrow */}
      {hasArrow && (
        <div 
          className={`
            absolute w-0 h-0 
            border-solid border-[8px]
            ${arrowClasses[position]}
          `}
        />
      )}
    </div>
  );
};

// A sequence of coach marks forming a tour
interface TourStep {
  target: React.RefObject<HTMLElement>;
  title?: string;
  content: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

interface TourProps {
  steps: TourStep[];
  isOpen?: boolean;
  onFinish?: () => void;
  variant?: 'default' | 'bordered' | 'cutout';
  initialStep?: number;
  className?: string;
}

export const Tour: React.FC<TourProps> = ({
  steps,
  isOpen = false,
  onFinish,
  variant = 'default',
  initialStep = 0,
  className = '',
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isTourActive, setIsTourActive] = useState(isOpen);
  
  // Reset when tour opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(initialStep);
      setIsTourActive(true);
    } else {
      setIsTourActive(false);
    }
  }, [isOpen, initialStep]);
  
  // Handle next step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      setIsTourActive(false);
      if (onFinish) onFinish();
    }
  };
  
  // Handle previous step
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };
  
  // Handle close tour
  const handleClose = () => {
    setIsTourActive(false);
    if (onFinish) onFinish();
  };
  
  if (!isTourActive || !steps[currentStep]) return null;
  
  const { target, title, content, position } = steps[currentStep];
  
  return (
    <CoachMark
      target={target}
      title={title}
      isOpen={isTourActive}
      onClose={handleClose}
      position={position || 'bottom'}
      variant={variant}
      className={className}
      hasCloseButton={false}
    >
      <div>
        {content}
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm">
            Step {currentStep + 1} of {steps.length}
          </div>
          
          <div className="flex gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="border-2 border-black py-1 px-2 text-sm hover:bg-gray-100"
              >
                Previous
              </button>
            )}
            
            <button
              onClick={handleNext}
              className="border-2 border-black bg-black text-white py-1 px-2 text-sm hover:bg-gray-800"
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </button>
            
            <button
              onClick={handleClose}
              className="border-2 border-black py-1 px-2 text-sm hover:bg-gray-100"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </CoachMark>
  );
};

// Highlight overlay to focus on a specific element
interface HighlightOverlayProps {
  target: React.RefObject<HTMLElement>;
  isActive?: boolean;
  padding?: number;
  maskColor?: string;
  maskOpacity?: number;
  zIndex?: number;
}

export const HighlightOverlay: React.FC<HighlightOverlayProps> = ({
  target,
  isActive = false,
  padding = 8,
  maskColor = '#000',
  maskOpacity = 0.5,
  zIndex = 40,
}) => {
  const [targetRect, setTargetRect] = useState({ top: 0, left: 0, width: 0, height: 0 });
  
  // Update target rect when active
  useEffect(() => {
    if (isActive && target.current) {
      const updateRect = () => {
        const rect = target.current?.getBoundingClientRect();
        if (rect) {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
          
          setTargetRect({
            top: rect.top + scrollTop - padding,
            left: rect.left + scrollLeft - padding,
            width: rect.width + (padding * 2),
            height: rect.height + (padding * 2),
          });
        }
      };
      
      updateRect();
      
      window.addEventListener('resize', updateRect);
      window.addEventListener('scroll', updateRect);
      
      return () => {
        window.removeEventListener('resize', updateRect);
        window.removeEventListener('scroll', updateRect);
      };
    }
  }, [isActive, padding]);
  
  if (!isActive) return null;
  
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex }}
    >
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
      >
        <defs>
          <mask id="spotlight-mask">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={targetRect.left}
              y={targetRect.top}
              width={targetRect.width}
              height={targetRect.height}
              fill="black"
              rx="4"
              ry="4"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={maskColor}
          fillOpacity={maskOpacity}
          mask="url(#spotlight-mask)"
        />
      </svg>
      
      {/* Border around the highlighted element */}
      <div 
        className="absolute border-2 border-black"
        style={{
          top: targetRect.top,
          left: targetRect.left,
          width: targetRect.width,
          height: targetRect.height,
        }}
      />
    </div>
  );
};

export const CoachMarkExamples: React.FC = () => {
  const [isCoachMarkOpen, setIsCoachMarkOpen] = useState(false);
  const [isHighlightActive, setIsHighlightActive] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  
  const button1Ref = useRef<HTMLButtonElement>(null);
  const button2Ref = useRef<HTMLButtonElement>(null);
  const button3Ref = useRef<HTMLButtonElement>(null);
  const button4Ref = useRef<HTMLButtonElement>(null);
  
  // Tour steps
  const tourSteps: TourStep[] = [
    {
      target: button1Ref,
      title: 'Welcome to the Tour',
      content: 'This is a guided tour of the coach mark components.',
      position: 'bottom',
    },
    {
      target: button2Ref,
      title: 'Different Positions',
      content: 'Coach marks can be positioned at different sides of the target element.',
      position: 'right',
    },
    {
      target: button3Ref,
      title: 'Different Styles',
      content: 'They come in different styles to match your design language.',
      position: 'top',
    },
    {
      target: button4Ref,
      title: 'Highlight Overlay',
      content: 'You can also add a highlight overlay to focus attention on specific elements.',
      position: 'left',
    },
  ];
  
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Coach Marks</h2>
      <p className="mb-8 font-sans">
        Coach marks with brutalist styling, designed to guide users and explain interface elements.
      </p>
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Coach Mark</h3>
          <div>
            <button 
              ref={button1Ref}
              className="border-2 border-black px-4 py-2 font-mono bg-white hover:bg-gray-100"
              onClick={() => setIsCoachMarkOpen(!isCoachMarkOpen)}
            >
              {isCoachMarkOpen ? 'Hide' : 'Show'} Coach Mark
            </button>
            
            <CoachMark
              target={button1Ref}
              isOpen={isCoachMarkOpen}
              onClose={() => setIsCoachMarkOpen(false)}
              title="This is a Coach Mark"
              variant="default"
            >
              <p>Coach marks help guide users through a new interface or highlight important features.</p>
            </CoachMark>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Coach Mark Positions</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <button 
                ref={button2Ref}
                className="border-2 border-black px-4 py-2 font-mono bg-white hover:bg-gray-100"
              >
                Target Element
              </button>
              
              <div className="mt-4 space-x-2">
                <button 
                  className="border-2 border-black px-3 py-1 font-mono bg-white hover:bg-gray-100"
                  onClick={() => {
                    setIsCoachMarkOpen(false);
                    setIsTourActive(false);
                    setTimeout(() => {
                      (window as any).tempPosition = 'top';
                      setIsCoachMarkOpen(true);
                    }, 50);
                  }}
                >
                  Top
                </button>
                
                <button 
                  className="border-2 border-black px-3 py-1 font-mono bg-white hover:bg-gray-100"
                  onClick={() => {
                    setIsCoachMarkOpen(false);
                    setIsTourActive(false);
                    setTimeout(() => {
                      (window as any).tempPosition = 'right';
                      setIsCoachMarkOpen(true);
                    }, 50);
                  }}
                >
                  Right
                </button>
                
                <button 
                  className="border-2 border-black px-3 py-1 font-mono bg-white hover:bg-gray-100"
                  onClick={() => {
                    setIsCoachMarkOpen(false);
                    setIsTourActive(false);
                    setTimeout(() => {
                      (window as any).tempPosition = 'bottom';
                      setIsCoachMarkOpen(true);
                    }, 50);
                  }}
                >
                  Bottom
                </button>
                
                <button 
                  className="border-2 border-black px-3 py-1 font-mono bg-white hover:bg-gray-100"
                  onClick={() => {
                    setIsCoachMarkOpen(false);
                    setIsTourActive(false);
                    setTimeout(() => {
                      (window as any).tempPosition = 'left';
                      setIsCoachMarkOpen(true);
                    }, 50);
                  }}
                >
                  Left
                </button>
              </div>
              
              <CoachMark
                target={button2Ref}
                isOpen={isCoachMarkOpen && !isTourActive && (window as any).tempPosition !== undefined}
                onClose={() => {
                  setIsCoachMarkOpen(false);
                  (window as any).tempPosition = undefined;
                }}
                position={(window as any).tempPosition || 'bottom'}
                title="Position Example"
              >
                <p>This coach mark can be positioned at different sides of the target element.</p>
              </CoachMark>
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Using different positions allows you to:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Avoid overlapping other important UI elements</li>
                <li>Point to the specific part of an element you want to highlight</li>
                <li>Create a sequence of coach marks that flow in a logical direction</li>
                <li>Adapt to different screen sizes and layouts</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Coach Mark Variants</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <button 
                ref={button3Ref}
                className="border-2 border-black px-4 py-2 font-mono bg-white hover:bg-gray-100"
                onClick={() => {
                  setIsCoachMarkOpen(false);
                  setIsTourActive(false);
                  setTimeout(() => {
                    (window as any).tempVariant = 'default';
                    setIsCoachMarkOpen(true);
                  }, 50);
                }}
              >
                Default
              </button>
              
              <p className="mt-2 text-sm text-center">Clean style with a simple border</p>
            </div>
            
            <div className="flex flex-col items-center">
              <button 
                className="border-2 border-black px-4 py-2 font-mono bg-white hover:bg-gray-100"
                onClick={() => {
                  setIsCoachMarkOpen(false);
                  setIsTourActive(false);
                  setTimeout(() => {
                    (window as any).tempVariant = 'bordered';
                    setIsCoachMarkOpen(true);
                  }, 50);
                }}
              >
                Bordered
              </button>
              
              <p className="mt-2 text-sm text-center">With drop shadow for more emphasis</p>
            </div>
            
            <div className="flex flex-col items-center">
              <button 
                className="border-2 border-black px-4 py-2 font-mono bg-white hover:bg-gray-100"
                onClick={() => {
                  setIsCoachMarkOpen(false);
                  setIsTourActive(false);
                  setTimeout(() => {
                    (window as any).tempVariant = 'cutout';
                    setIsCoachMarkOpen(true);
                  }, 50);
                }}
              >
                Cutout
              </button>
              
              <p className="mt-2 text-sm text-center">Rotated for a raw, unrefined look</p>
            </div>
          </div>
          
          <CoachMark
            target={button3Ref}
            isOpen={isCoachMarkOpen && !isTourActive && (window as any).tempVariant !== undefined}
            onClose={() => {
              setIsCoachMarkOpen(false);
              (window as any).tempVariant = undefined;
            }}
            position="bottom"
            variant={(window as any).tempVariant || 'default'}
            title="Variant Example"
          >
            <p>This coach mark demonstrates the {(window as any).tempVariant || 'default'} variant.</p>
          </CoachMark>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Highlight Overlay</h3>
          <div className="space-y-4">
            <div>
              <button 
                ref={button4Ref}
                className="border-2 border-black px-4 py-2 font-mono bg-white hover:bg-gray-100"
                onClick={() => setIsHighlightActive(!isHighlightActive)}
              >
                {isHighlightActive ? 'Hide' : 'Show'} Highlight
              </button>
              
              <HighlightOverlay
                target={button4Ref}
                isActive={isHighlightActive}
              />
              
              <CoachMark
                target={button4Ref}
                isOpen={isHighlightActive}
                onClose={() => setIsHighlightActive(false)}
                position="bottom"
                variant="bordered"
                title="Highlight Example"
              >
                <p>The highlight overlay dims the rest of the screen to focus attention on a specific element.</p>
              </CoachMark>
            </div>
            
            <p className="text-sm text-gray-600 font-sans">
              Highlight overlays are useful for drawing attention to a specific part of the interface, especially during onboarding or when introducing new features.
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Guided Tour</h3>
          <div className="space-y-4">
            <div>
              <button 
                className="border-2 border-black px-4 py-2 font-mono bg-white hover:bg-gray-100"
                onClick={() => {
                  setIsCoachMarkOpen(false);
                  setIsHighlightActive(false);
                  setIsTourActive(true);
                }}
              >
                Start Guided Tour
              </button>
              
              <Tour
                steps={tourSteps}
                isOpen={isTourActive}
                onFinish={() => setIsTourActive(false)}
                variant="bordered"
              />
            </div>
            
            <p className="text-sm text-gray-600 font-sans">
              Guided tours combine multiple coach marks into a sequence to help users learn about different parts of the interface in a structured way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 