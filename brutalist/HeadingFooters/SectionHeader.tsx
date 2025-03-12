import React from 'react';

// SectionHeader props
interface SectionHeaderProps {
  /**
   * Title of the section
   */
  title: React.ReactNode;
  /**
   * Optional subtitle
   */
  subtitle?: React.ReactNode;
  /**
   * Optional description text
   */
  description?: React.ReactNode;
  /**
   * Optional actions to display
   */
  actions?: React.ReactNode;
  /**
   * Whether to add a divider line
   */
  hasDivider?: boolean;
  /**
   * Style of the divider
   */
  dividerStyle?: 'solid' | 'dashed' | 'dotted' | 'double';
  /**
   * Variant of the section header
   */
  variant?: 'default' | 'bordered' | 'cutout';
  /**
   * Size of the section header
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Alignment of the content
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Custom class name
   */
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  actions,
  hasDivider = true,
  dividerStyle = 'solid',
  variant = 'default',
  size = 'medium',
  align = 'left',
  className = '',
}) => {
  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black p-4 transform rotate-[-0.5deg]';
      default:
        return '';
    }
  };
  
  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'mb-4';
      case 'large':
        return 'mb-12';
      case 'medium':
      default:
        return 'mb-8';
    }
  };
  
  // Get alignment styles
  const getAlignmentStyles = () => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      case 'left':
      default:
        return 'text-left';
    }
  };
  
  // Get divider styles
  const getDividerStyles = () => {
    if (!hasDivider) return '';
    
    let borderStyle = 'border-solid';
    
    switch (dividerStyle) {
      case 'dashed':
        borderStyle = 'border-dashed';
        break;
      case 'dotted':
        borderStyle = 'border-dotted';
        break;
      case 'double':
        borderStyle = 'border-double';
        break;
      default:
        borderStyle = 'border-solid';
    }
    
    return `border-b-2 border-black ${borderStyle} pb-2`;
  };
  
  return (
    <div 
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${getAlignmentStyles()}
        ${className}
      `}
    >
      <div className={getDividerStyles()}>
        {/* Title and subtitle container */}
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            {subtitle && (
              <div className="font-mono text-sm text-gray-600 uppercase mb-1">
                {subtitle}
              </div>
            )}
            
            <h2 className="text-2xl font-mono font-bold">
              {title}
            </h2>
          </div>
          
          {/* Actions */}
          {actions && (
            <div className="mt-2 md:mt-0 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>
      
      {/* Description */}
      {description && (
        <div className="mt-2 text-gray-600">
          {description}
        </div>
      )}
    </div>
  );
};

// Example implementations
export const SectionHeaderExamples: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Section Headers</h2>
        <p className="mb-8 font-sans">
          Section header components with brutalist styling for dividing page content.
        </p>
        
        {/* Basic Section Header */}
        <div className="mb-12">
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Section Header</h3>
          <SectionHeader
            title="Featured Products"
            description="Our most popular items this month"
          />
          
          <div className="p-4 border-2 border-gray-300 bg-gray-50">
            <p>Content would go here</p>
          </div>
        </div>
        
        {/* Section Header with Actions */}
        <div className="mb-12">
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">With Actions</h3>
          <SectionHeader
            title="Team Members"
            subtitle="Staff"
            description="Everyone who makes our company work"
            actions={
              <button className="px-3 py-1 border-2 border-black bg-white hover:bg-gray-100 font-mono text-sm">
                View All
              </button>
            }
          />
          
          <div className="p-4 border-2 border-gray-300 bg-gray-50">
            <p>Content would go here</p>
          </div>
        </div>
        
        {/* Section Header Variants */}
        <div className="mb-12">
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Header Variants</h3>
          <div className="space-y-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Default</h4>
              <SectionHeader
                title="Default Variant"
                description="Simple divider line below the title"
                variant="default"
              />
              
              <div className="p-4 border-2 border-gray-300 bg-gray-50">
                <p>Content would go here</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Bordered</h4>
              <SectionHeader
                title="Bordered Variant"
                description="With shadow effect and border around the header"
                variant="bordered"
              />
              
              <div className="p-4 border-2 border-gray-300 bg-gray-50">
                <p>Content would go here</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Cutout</h4>
              <SectionHeader
                title="Cutout Variant"
                description="With slight rotation for a raw look"
                variant="cutout"
              />
              
              <div className="p-4 border-2 border-gray-300 bg-gray-50">
                <p>Content would go here</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider Styles */}
        <div className="mb-12">
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Divider Styles</h3>
          <div className="space-y-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Solid (Default)</h4>
              <SectionHeader
                title="Solid Divider"
                dividerStyle="solid"
              />
              
              <div className="p-4 border-2 border-gray-300 bg-gray-50">
                <p>Content would go here</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Dashed</h4>
              <SectionHeader
                title="Dashed Divider"
                dividerStyle="dashed"
              />
              
              <div className="p-4 border-2 border-gray-300 bg-gray-50">
                <p>Content would go here</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Dotted</h4>
              <SectionHeader
                title="Dotted Divider"
                dividerStyle="dotted"
              />
              
              <div className="p-4 border-2 border-gray-300 bg-gray-50">
                <p>Content would go here</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Double</h4>
              <SectionHeader
                title="Double Divider"
                dividerStyle="double"
              />
              
              <div className="p-4 border-2 border-gray-300 bg-gray-50">
                <p>Content would go here</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">No Divider</h4>
              <SectionHeader
                title="No Divider"
                hasDivider={false}
              />
              
              <div className="p-4 border-2 border-gray-300 bg-gray-50">
                <p>Content would go here</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Alignment Variations */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Alignment Variations</h3>
          <div className="space-y-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Left Aligned (Default)</h4>
              <SectionHeader
                title="Left Aligned Header"
                description="Content aligned to the left"
                align="left"
                variant="bordered"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Center Aligned</h4>
              <SectionHeader
                title="Center Aligned Header"
                description="Content aligned to the center"
                align="center"
                variant="bordered"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Right Aligned</h4>
              <SectionHeader
                title="Right Aligned Header"
                description="Content aligned to the right"
                align="right"
                variant="bordered"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 