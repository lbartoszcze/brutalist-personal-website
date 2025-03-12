import React, { useState, useRef, useEffect } from 'react';

// Accordion item props
interface AccordionItemProps {
  /**
   * Title of the accordion item
   */
  title: React.ReactNode;
  /**
   * Content of the accordion item
   */
  children: React.ReactNode;
  /**
   * Whether the accordion item is open
   */
  isOpen?: boolean;
  /**
   * Function to call when the accordion item is toggled
   */
  onToggle?: () => void;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Custom class name for the accordion item
   */
  className?: string;
  /**
   * Icon to display when the accordion item is closed
   */
  expandIcon?: React.ReactNode;
  /**
   * Icon to display when the accordion item is open
   */
  collapseIcon?: React.ReactNode;
  /**
   * Variant of the accordion item
   */
  variant?: 'default' | 'bordered' | 'cutout';
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  onToggle,
  disabled = false,
  className = '',
  expandIcon = '+',
  collapseIcon = '−',
  variant = 'default',
}) => {
  // Ref for the content element for animation
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return 'border-2 border-black';
    }
  };
  
  return (
    <div className={`mb-2 ${getVariantStyles()} ${className} ${disabled ? 'opacity-50' : ''}`}>
      {/* Accordion header */}
      <button
        className={`
          w-full px-4 py-3
          flex justify-between items-center
          font-mono font-bold text-left
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
          ${isOpen ? 'border-b-2 border-black' : ''}
        `}
        onClick={() => !disabled && onToggle?.()}
        aria-expanded={isOpen}
        disabled={disabled}
      >
        <span>{title}</span>
        <span className="text-xl">{isOpen ? collapseIcon : expandIcon}</span>
      </button>
      
      {/* Accordion content */}
      {isOpen && (
        <div
          ref={contentRef}
          className="p-4"
        >
          {children}
        </div>
      )}
    </div>
  );
};

// Accordion props
interface AccordionProps {
  /**
   * Children must be AccordionItem components
   */
  children: React.ReactNode;
  /**
   * Allow multiple items to be open at once
   */
  allowMultiple?: boolean;
  /**
   * Default open items (array of indices)
   */
  defaultOpen?: number[];
  /**
   * Controlled open state (array of indices)
   */
  openItems?: number[];
  /**
   * Function to call when open items change
   */
  onOpenChange?: (openIndices: number[]) => void;
  /**
   * Variant to apply to all items
   */
  variant?: 'default' | 'bordered' | 'cutout';
  /**
   * Custom class name
   */
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  allowMultiple = false,
  defaultOpen = [],
  openItems,
  onOpenChange,
  variant = 'default',
  className = '',
}) => {
  // State for tracking open items
  const [openIndices, setOpenIndices] = useState<number[]>(openItems || defaultOpen);
  
  // Sync with controlled prop
  useEffect(() => {
    if (openItems !== undefined) {
      setOpenIndices(openItems);
    }
  }, [openItems]);
  
  // Handle toggling an item
  const handleToggle = (index: number) => {
    const newOpenIndices = allowMultiple
      ? openIndices.includes(index)
        ? openIndices.filter(i => i !== index)
        : [...openIndices, index]
      : openIndices.includes(index)
        ? []
        : [index];
    
    setOpenIndices(newOpenIndices);
    onOpenChange?.(newOpenIndices);
  };
  
  // Clone children with props
  const items = React.Children.map(children, (child, index) => {
    if (React.isValidElement<AccordionItemProps>(child) && child.type === AccordionItem) {
      return React.cloneElement(child, {
        isOpen: openIndices.includes(index),
        onToggle: () => handleToggle(index),
        variant: child.props.variant || variant,
      });
    }
    return child;
  });
  
  return (
    <div className={className}>
      {items}
    </div>
  );
};

// Controlled accordion that manages its own state
export const SimpleAccordion: React.FC<{
  items: {
    title: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
  }[];
  allowMultiple?: boolean;
  defaultOpen?: number[];
  variant?: 'default' | 'bordered' | 'cutout';
  className?: string;
}> = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  variant = 'default',
  className = '',
}) => {
  return (
    <Accordion
      allowMultiple={allowMultiple}
      defaultOpen={defaultOpen}
      variant={variant}
      className={className}
    >
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          disabled={item.disabled}
        >
          {item.content}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

// Example implementation
export const AccordionExamples: React.FC = () => {
  // State for controlled accordion
  const [openItems, setOpenItems] = useState<number[]>([0]);
  
  // Sample items for simple accordion
  const simpleItems = [
    {
      title: 'Section 1',
      content: (
        <div className="space-y-2">
          <p>This is the content for section 1.</p>
          <p>You can put any content here, including other components.</p>
        </div>
      ),
    },
    {
      title: 'Section 2',
      content: (
        <div className="space-y-2">
          <p>This is the content for section 2.</p>
          <p>It can have multiple paragraphs and elements.</p>
        </div>
      ),
    },
    {
      title: 'Section 3 (Disabled)',
      content: <p>This content won't be accessible because the section is disabled.</p>,
      disabled: true,
    },
  ];
  
  return (
    <div className="p-6 max-w-6xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Accordion</h2>
      <p className="mb-8 font-sans">
        Accordion components with brutalist styling for collapsible content sections.
      </p>
      
      <div className="space-y-16">
        {/* Basic Accordion */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Accordion</h3>
          <Accordion defaultOpen={[0]}>
            <AccordionItem title="What is brutalist design?">
              <p className="font-sans">
                Brutalist design is characterized by raw, unpolished aesthetics. It embraces 
                stark typography, bold contrasts, and a functional approach that prioritizes 
                content over decoration.
              </p>
            </AccordionItem>
            
            <AccordionItem title="How is it applied to web design?">
              <p className="font-sans">
                In web design, brutalism manifests through minimalist layouts, monospaced fonts, 
                visible borders, and high contrast elements. It often breaks from conventional 
                design patterns and embraces asymmetry and raw structures.
              </p>
            </AccordionItem>
            
            <AccordionItem title="Why use a brutalist design system?">
              <p className="font-sans">
                A brutalist design system offers a unique, bold aesthetic that stands out from 
                mainstream design trends. It creates memorable user experiences and can effectively 
                convey a sense of authenticity and directness.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Accordion Variants */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Accordion Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Default</h4>
              <Accordion defaultOpen={[0]} variant="default">
                <AccordionItem title="Default Variant">
                  <p className="font-sans">
                    The default variant uses simple borders to define the accordion structure.
                  </p>
                </AccordionItem>
                <AccordionItem title="Second Item">
                  <p className="font-sans">
                    Content for the second item in the default variant.
                  </p>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Bordered</h4>
              <Accordion defaultOpen={[0]} variant="bordered">
                <AccordionItem title="Bordered Variant">
                  <p className="font-sans">
                    The bordered variant adds a shadow effect to create a sense of depth.
                  </p>
                </AccordionItem>
                <AccordionItem title="Second Item">
                  <p className="font-sans">
                    Content for the second item in the bordered variant.
                  </p>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Cutout</h4>
              <Accordion defaultOpen={[0]} variant="cutout">
                <AccordionItem title="Cutout Variant">
                  <p className="font-sans">
                    The cutout variant applies a slight rotation for a raw, asymmetrical look.
                  </p>
                </AccordionItem>
                <AccordionItem title="Second Item">
                  <p className="font-sans">
                    Content for the second item in the cutout variant.
                  </p>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        
        {/* Multiple Open Items */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Multiple Open Items</h3>
          <Accordion allowMultiple defaultOpen={[0, 1]} variant="bordered">
            <AccordionItem title="First Section">
              <p className="font-sans">
                This accordion allows multiple sections to be open simultaneously. Try opening 
                another section without closing this one.
              </p>
            </AccordionItem>
            
            <AccordionItem title="Second Section">
              <p className="font-sans">
                This section is also open by default. The accordion is configured to allow 
                multiple open sections.
              </p>
            </AccordionItem>
            
            <AccordionItem title="Third Section">
              <p className="font-sans">
                Click to open this section while keeping others open.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Controlled Accordion */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Controlled Accordion</h3>
          <div className="mb-4">
            <p className="font-sans mb-2">
              This accordion's state is controlled externally. Use these buttons to control it:
            </p>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 border-2 border-black font-mono text-sm"
                onClick={() => setOpenItems([0])}
              >
                Open First
              </button>
              <button
                className="px-3 py-1 border-2 border-black font-mono text-sm"
                onClick={() => setOpenItems([1])}
              >
                Open Second
              </button>
              <button
                className="px-3 py-1 border-2 border-black font-mono text-sm"
                onClick={() => setOpenItems([0, 1])}
              >
                Open Both
              </button>
              <button
                className="px-3 py-1 border-2 border-black font-mono text-sm"
                onClick={() => setOpenItems([])}
              >
                Close All
              </button>
            </div>
          </div>
          
          <Accordion
            openItems={openItems}
            onOpenChange={setOpenItems}
            allowMultiple
            variant="bordered"
          >
            <AccordionItem title="Controlled Section 1">
              <p className="font-sans">
                This section's open state is controlled by the buttons above. You can still 
                toggle it by clicking on the header.
              </p>
            </AccordionItem>
            
            <AccordionItem title="Controlled Section 2">
              <p className="font-sans">
                This section is also controlled externally. The current open items are: 
                {openItems.join(', ')}
              </p>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Simple Accordion */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Simple Accordion</h3>
          <p className="font-sans mb-4">
            The SimpleAccordion component provides a more streamlined API when you don't need 
            full control over individual accordion items.
          </p>
          
          <SimpleAccordion
            items={simpleItems}
            variant="bordered"
            allowMultiple
            defaultOpen={[0]}
          />
        </div>
      </div>
    </div>
  );
}; 