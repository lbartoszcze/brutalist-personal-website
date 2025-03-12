import React, { useState, useRef, useEffect } from 'react';

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';
type TooltipVariant = 'default' | 'bordered' | 'cutout';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: TooltipPosition;
  variant?: TooltipVariant;
  showArrow?: boolean;
  delay?: number;
  maxWidth?: number;
  disabled?: boolean;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  variant = 'default',
  showArrow = true,
  delay = 0,
  maxWidth = 250,
  disabled = false,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Calculate tooltip position
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    
    let top = 0;
    let left = 0;
    
    switch (position) {
      case 'top':
        top = triggerRect.top + scrollTop - tooltipRect.height - 8;
        left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'right':
        top = triggerRect.top + scrollTop + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.right + scrollLeft + 8;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollTop + 8;
        left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = triggerRect.top + scrollTop + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.left + scrollLeft - tooltipRect.width - 8;
        break;
    }
    
    // Ensure tooltip stays within viewport
    if (left < 0) left = 0;
    if (left + tooltipRect.width > window.innerWidth) {
      left = window.innerWidth - tooltipRect.width;
    }
    
    if (top < 0) top = 0;
    if (top + tooltipRect.height > window.innerHeight) {
      top = window.innerHeight - tooltipRect.height;
    }
    
    setTooltipPosition({ top, left });
  };
  
  // Handle mouse enter
  const handleMouseEnter = () => {
    if (disabled) return;
    
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    } else {
      setIsVisible(true);
    }
  };
  
  // Handle mouse leave
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // Update position when tooltip becomes visible or when window resizes
  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      
      // Recalculate on window resize
      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition);
      
      return () => {
        window.removeEventListener('resize', calculatePosition);
        window.removeEventListener('scroll', calculatePosition);
      };
    }
  }, [isVisible]);
  
  // Variant styles
  const variantClasses = {
    default: 'bg-black text-white border border-black',
    bordered: 'bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
    cutout: 'bg-white text-black border-2 border-black rotate-[-1deg]',
  };
  
  // Arrow classes based on position
  const arrowClasses = {
    top: 'bottom-[-6px] left-1/2 transform -translate-x-1/2 rotate-45',
    right: 'left-[-6px] top-1/2 transform -translate-y-1/2 rotate-45',
    bottom: 'top-[-6px] left-1/2 transform -translate-x-1/2 rotate-45',
    left: 'right-[-6px] top-1/2 transform -translate-y-1/2 rotate-45',
  };
  
  // Arrow background color
  const arrowBgColor = variant === 'default' ? 'bg-black' : 'bg-white';
  
  // Clone the children to attach event handlers and ref
  const childWithHandlers = React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleMouseEnter,
    onBlur: handleMouseLeave,
  });
  
  return (
    <>
      {childWithHandlers}
      
      {isVisible && (
        <div 
          ref={tooltipRef}
          className={`
            fixed z-50 py-1 px-2 font-mono text-sm pointer-events-none
            ${variantClasses[variant]}
            ${className}
          `}
          style={{ 
            top: tooltipPosition.top, 
            left: tooltipPosition.left,
            maxWidth: maxWidth ? `${maxWidth}px` : undefined
          }}
          onMouseEnter={handleMouseLeave} // Hide tooltip when mouse enters it
        >
          {content}
          
          {/* Arrow */}
          {showArrow && (
            <div 
              className={`
                absolute w-3 h-3 border border-black
                ${arrowBgColor}
                ${arrowClasses[position]}
                ${position === 'top' || position === 'bottom' ? 'border-r border-b' : ''}
                ${position === 'left' || position === 'right' ? 'border-t border-l' : ''}
              `}
            />
          )}
        </div>
      )}
    </>
  );
};

// Controlled tooltip that can be shown/hidden programmatically
export const ControlledTooltip: React.FC<Omit<TooltipProps, 'children'> & {
  isOpen: boolean;
  target: React.RefObject<HTMLElement>;
  onClose?: () => void;
}> = ({
  content,
  isOpen,
  target,
  position = 'top',
  variant = 'default',
  showArrow = true,
  maxWidth = 250,
  onClose,
  className = '',
}) => {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  // Calculate tooltip position
  const calculatePosition = () => {
    if (!target.current || !tooltipRef.current) return;
    
    const triggerRect = target.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    
    let top = 0;
    let left = 0;
    
    switch (position) {
      case 'top':
        top = triggerRect.top + scrollTop - tooltipRect.height - 8;
        left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'right':
        top = triggerRect.top + scrollTop + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.right + scrollLeft + 8;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollTop + 8;
        left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = triggerRect.top + scrollTop + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.left + scrollLeft - tooltipRect.width - 8;
        break;
    }
    
    // Ensure tooltip stays within viewport
    if (left < 0) left = 0;
    if (left + tooltipRect.width > window.innerWidth) {
      left = window.innerWidth - tooltipRect.width;
    }
    
    if (top < 0) top = 0;
    if (top + tooltipRect.height > window.innerHeight) {
      top = window.innerHeight - tooltipRect.height;
    }
    
    setTooltipPosition({ top, left });
  };
  
  // Update position when tooltip becomes visible or when window resizes
  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      
      // Recalculate on window resize
      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition);
      
      // Handle clicking outside to close
      const handleClickOutside = (event: MouseEvent) => {
        if (
          tooltipRef.current && 
          !tooltipRef.current.contains(event.target as Node) && 
          target.current && 
          !target.current.contains(event.target as Node)
        ) {
          if (onClose) onClose();
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      
      return () => {
        window.removeEventListener('resize', calculatePosition);
        window.removeEventListener('scroll', calculatePosition);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose]);
  
  // Variant styles
  const variantClasses = {
    default: 'bg-black text-white border border-black',
    bordered: 'bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
    cutout: 'bg-white text-black border-2 border-black rotate-[-1deg]',
  };
  
  // Arrow classes based on position
  const arrowClasses = {
    top: 'bottom-[-6px] left-1/2 transform -translate-x-1/2 rotate-45',
    right: 'left-[-6px] top-1/2 transform -translate-y-1/2 rotate-45',
    bottom: 'top-[-6px] left-1/2 transform -translate-x-1/2 rotate-45',
    left: 'right-[-6px] top-1/2 transform -translate-y-1/2 rotate-45',
  };
  
  // Arrow background color
  const arrowBgColor = variant === 'default' ? 'bg-black' : 'bg-white';
  
  if (!isOpen) return null;
  
  return (
    <div 
      ref={tooltipRef}
      className={`
        fixed z-50 py-1 px-2 font-mono text-sm
        ${variantClasses[variant]}
        ${className}
      `}
      style={{ 
        top: tooltipPosition.top, 
        left: tooltipPosition.left,
        maxWidth: maxWidth ? `${maxWidth}px` : undefined
      }}
    >
      {content}
      
      {/* Arrow */}
      {showArrow && (
        <div 
          className={`
            absolute w-3 h-3 border border-black
            ${arrowBgColor}
            ${arrowClasses[position]}
            ${position === 'top' || position === 'bottom' ? 'border-r border-b' : ''}
            ${position === 'left' || position === 'right' ? 'border-t border-l' : ''}
          `}
        />
      )}
    </div>
  );
};

export const Tooltips: React.FC = () => {
  const [isControlledTooltipOpen, setIsControlledTooltipOpen] = useState(false);
  const controlledTooltipTargetRef = useRef<HTMLButtonElement>(null);
  
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Tooltips</h2>
      <p className="mb-8 font-sans">
        Tooltip components with brutalist styling, providing contextual information.
      </p>
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Tooltips</h3>
          <div className="space-x-4 flex">
            <Tooltip content="This is a basic tooltip">
              <button className="border-2 border-black px-3 py-1 font-mono">
                Hover Me
              </button>
            </Tooltip>
            
            <Tooltip 
              content="Tooltips can contain longer text that wraps to multiple lines. They can also contain formatting or other elements." 
              maxWidth={200}
            >
              <button className="border-2 border-black px-3 py-1 font-mono">
                With Long Text
              </button>
            </Tooltip>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Tooltip Positions</h3>
          <div className="flex flex-wrap gap-4">
            <Tooltip content="Top tooltip" position="top">
              <button className="border-2 border-black px-3 py-1 font-mono">
                Top
              </button>
            </Tooltip>
            
            <Tooltip content="Right tooltip" position="right">
              <button className="border-2 border-black px-3 py-1 font-mono">
                Right
              </button>
            </Tooltip>
            
            <Tooltip content="Bottom tooltip" position="bottom">
              <button className="border-2 border-black px-3 py-1 font-mono">
                Bottom
              </button>
            </Tooltip>
            
            <Tooltip content="Left tooltip" position="left">
              <button className="border-2 border-black px-3 py-1 font-mono">
                Left
              </button>
            </Tooltip>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Tooltip Variants</h3>
          <div className="flex flex-wrap gap-4">
            <Tooltip 
              content="Default variant" 
              variant="default"
            >
              <button className="border-2 border-black px-3 py-1 font-mono">
                Default
              </button>
            </Tooltip>
            
            <Tooltip 
              content="Bordered variant" 
              variant="bordered"
            >
              <button className="border-2 border-black px-3 py-1 font-mono">
                Bordered
              </button>
            </Tooltip>
            
            <Tooltip 
              content="Cutout variant" 
              variant="cutout"
            >
              <button className="border-2 border-black px-3 py-1 font-mono">
                Cutout
              </button>
            </Tooltip>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Tooltip Customization</h3>
          <div className="flex flex-wrap gap-4">
            <Tooltip 
              content="Tooltip without arrow" 
              showArrow={false}
            >
              <button className="border-2 border-black px-3 py-1 font-mono">
                No Arrow
              </button>
            </Tooltip>
            
            <Tooltip 
              content="Tooltip with delay" 
              delay={500}
            >
              <button className="border-2 border-black px-3 py-1 font-mono">
                With Delay (500ms)
              </button>
            </Tooltip>
            
            <Tooltip 
              content={
                <div className="p-1">
                  <div className="font-bold mb-1">Rich Content</div>
                  <div className="text-xs">Tooltips can contain structured content</div>
                </div>
              }
              maxWidth={200}
              variant="bordered"
            >
              <button className="border-2 border-black px-3 py-1 font-mono">
                Rich Content
              </button>
            </Tooltip>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Controlled Tooltip</h3>
          <div className="space-y-4">
            <button 
              ref={controlledTooltipTargetRef}
              className="border-2 border-black px-3 py-1 font-mono"
              onClick={() => setIsControlledTooltipOpen(!isControlledTooltipOpen)}
            >
              {isControlledTooltipOpen ? 'Hide Tooltip' : 'Show Tooltip'}
            </button>
            
            <ControlledTooltip 
              content="This tooltip is manually controlled"
              isOpen={isControlledTooltipOpen}
              target={controlledTooltipTargetRef}
              onClose={() => setIsControlledTooltipOpen(false)}
              variant="bordered"
              position="bottom"
            />
            
            <p className="text-sm text-gray-600 font-sans">
              Controlled tooltips can be shown/hidden programmatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 