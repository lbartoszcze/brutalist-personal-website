import React from 'react';

// PageHeader props
interface PageHeaderProps {
  /**
   * Main title for the page header
   */
  title: React.ReactNode;
  /**
   * Optional subtitle or description
   */
  subtitle?: React.ReactNode;
  /**
   * Optional breadcrumbs component
   */
  breadcrumbs?: React.ReactNode;
  /**
   * Optional actions/buttons to display
   */
  actions?: React.ReactNode;
  /**
   * Optional background image URL
   */
  backgroundImage?: string;
  /**
   * Whether to add a bottom border
   */
  hasBorder?: boolean;
  /**
   * Size of the header
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Variant of the header
   */
  variant?: 'default' | 'bordered' | 'cutout';
  /**
   * Alignment of the content
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Custom class name
   */
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  backgroundImage,
  hasBorder = true,
  size = 'medium',
  variant = 'default',
  align = 'left',
  className = '',
}) => {
  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return hasBorder ? 'border-b-2 border-black' : '';
    }
  };
  
  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'py-4';
      case 'large':
        return 'py-12';
      case 'medium':
      default:
        return 'py-8';
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
  
  // Background styles
  const getBackgroundStyles = () => {
    if (backgroundImage) {
      return {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    return {};
  };
  
  return (
    <header 
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${getAlignmentStyles()}
        ${backgroundImage ? 'relative text-white' : ''}
        ${className}
      `}
      style={getBackgroundStyles()}
    >
      {/* Overlay for background image */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      )}
      
      <div className={`container mx-auto px-4 relative ${backgroundImage ? 'z-10' : ''}`}>
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <div className="mb-4">
            {breadcrumbs}
          </div>
        )}
        
        {/* Header content */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-mono font-bold">{title}</h1>
            {subtitle && (
              <div className="mt-2 text-lg opacity-80">
                {subtitle}
              </div>
            )}
          </div>
          
          {/* Actions */}
          {actions && (
            <div className="flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Example implementations
export const PageHeaderExamples: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Page Headers</h2>
        <p className="mb-8 font-sans">
          Page header components with brutalist styling for page titles and actions.
        </p>
        
        {/* Basic Page Header */}
        <div className="mb-12">
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Page Header</h3>
          <PageHeader
            title="Dashboard"
            subtitle="Welcome to your analytics dashboard"
            variant="bordered"
          />
        </div>
        
        {/* Page Header with Actions */}
        <div className="mb-12">
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">With Actions</h3>
          <PageHeader
            title="Products"
            subtitle="Manage your product catalog"
            variant="bordered"
            actions={
              <div className="flex space-x-2">
                <button className="px-3 py-2 border-2 border-black bg-white hover:bg-gray-100 font-mono">
                  Import
                </button>
                <button className="px-3 py-2 border-2 border-black bg-black text-white hover:bg-gray-900 font-mono">
                  Add Product
                </button>
              </div>
            }
          />
        </div>
        
        {/* Page Header with Breadcrumbs */}
        <div className="mb-12">
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">With Breadcrumbs</h3>
          <PageHeader
            title="Edit Product"
            subtitle="Update product information"
            variant="bordered"
            breadcrumbs={
              <div className="font-mono text-sm">
                <span>Home</span>
                <span className="mx-2">›</span>
                <span>Products</span>
                <span className="mx-2">›</span>
                <span className="font-bold">Edit Product</span>
              </div>
            }
            actions={
              <button className="px-3 py-2 border-2 border-black bg-black text-white hover:bg-gray-900 font-mono">
                Save Changes
              </button>
            }
          />
        </div>
        
        {/* Page Header Variants */}
        <div className="mb-12">
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Header Variants</h3>
          <div className="space-y-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Default</h4>
              <PageHeader
                title="Default Variant"
                subtitle="With simple bottom border"
                variant="default"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Bordered</h4>
              <PageHeader
                title="Bordered Variant"
                subtitle="With shadow effect"
                variant="bordered"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Cutout</h4>
              <PageHeader
                title="Cutout Variant"
                subtitle="With slight rotation"
                variant="cutout"
              />
            </div>
          </div>
        </div>
        
        {/* Page Header Sizes */}
        <div className="mb-12">
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Header Sizes</h3>
          <div className="space-y-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Small</h4>
              <PageHeader
                title="Small Header"
                subtitle="For less prominent pages"
                variant="bordered"
                size="small"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Medium (Default)</h4>
              <PageHeader
                title="Medium Header"
                subtitle="Standard size for most pages"
                variant="bordered"
                size="medium"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Large</h4>
              <PageHeader
                title="Large Header"
                subtitle="For important landing pages"
                variant="bordered"
                size="large"
              />
            </div>
          </div>
        </div>
        
        {/* Page Header with Background */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">With Background Image</h3>
          <PageHeader
            title="Featured Collection"
            subtitle="Explore our latest products"
            backgroundImage="https://images.unsplash.com/photo-1555421689-3f034debb7a6?auto=format&fit=crop&q=80&w=2070"
            variant="bordered"
            size="large"
            actions={
              <button className="px-4 py-2 border-2 border-white bg-transparent text-white hover:bg-white hover:text-black font-mono">
                View All
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
}; 