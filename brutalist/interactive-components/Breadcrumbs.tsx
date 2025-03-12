import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  variant?: 'default' | 'bordered' | 'cutout';
  size?: 'small' | 'medium' | 'large';
  maxItems?: number;
  homeIcon?: React.ReactNode;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = '/',
  variant = 'default',
  size = 'medium',
  maxItems = 0,
  homeIcon,
  className = '',
}) => {
  // Handle maxItems
  const visibleItems = 
    maxItems > 0 && items.length > maxItems 
      ? [...items.slice(0, 1), { label: '...', href: undefined }, ...items.slice(-1 * (maxItems - 2))]
      : items;
  
  // Size classes
  const sizeClasses = {
    small: 'text-sm py-1',
    medium: 'text-base py-1.5',
    large: 'text-lg py-2',
  };
  
  // Variant classes
  const variantClasses = {
    default: '',
    bordered: 'border-2 border-black px-3',
    cutout: 'border-2 border-black px-3 transform rotate-[-0.5deg]',
  };
  
  // Properly style the items based on if they're links or just text
  const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    // Basic style for all items
    const baseClasses = 'font-mono';
    
    // Style for the current (last) item
    const currentClasses = isLast ? 'font-bold' : '';
    
    // Interactive vs non-interactive
    const interactiveClasses = (item.href || item.onClick) && !isLast
      ? 'hover:underline cursor-pointer'
      : '';
    
    // Combine classes
    const itemClasses = `${baseClasses} ${currentClasses} ${interactiveClasses}`;
    
    // If we have a home icon for the first item
    const content = index === 0 && homeIcon 
      ? <span className="flex items-center">{homeIcon}{item.icon && <span className="ml-1">{item.icon}</span>}{item.label}</span>
      : <span className="flex items-center">{item.icon && <span className="mr-1">{item.icon}</span>}{item.label}</span>;
    
    // Render as link or span based on props
    if (item.href && !isLast) {
      return (
        <a 
          href={item.href} 
          className={itemClasses}
          onClick={item.onClick}
        >
          {content}
        </a>
      );
    } else {
      return (
        <span 
          className={itemClasses}
          onClick={!isLast && item.onClick ? item.onClick : undefined}
        >
          {content}
        </span>
      );
    }
  };
  
  return (
    <nav 
      aria-label="Breadcrumb"
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      <ol className="flex flex-wrap items-center">
        {visibleItems.map((item, index) => (
          <li 
            key={index} 
            className={index !== 0 ? 'flex items-center' : ''}
          >
            {index !== 0 && (
              <span className="mx-2 text-gray-500">
                {separator}
              </span>
            )}
            {renderItem(item, index, index === visibleItems.length - 1)}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export const HomeBreadcrumb = ({ href = '/' }: { href?: string }) => (
  <a href={href} className="font-mono hover:underline">
    <span className="flex items-center">
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="square" 
        strokeLinejoin="miter"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
      <span className="ml-1">Home</span>
    </span>
  </a>
);

export const BreadcrumbsExamples: React.FC = () => {
  // Sample breadcrumb items
  const basicItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Breadcrumbs' },
  ];
  
  const longItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Computers', href: '/products/electronics/computers' },
    { label: 'Laptops', href: '/products/electronics/computers/laptops' },
    { label: 'Gaming Laptops', href: '/products/electronics/computers/laptops/gaming' },
    { label: 'Product XYZ' },
  ];
  
  const iconItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/', icon: '🏠' },
    { label: 'Blog', href: '/blog', icon: '📝' },
    { label: 'Technology', href: '/blog/technology', icon: '💻' },
    { label: 'Article Title', icon: '📰' },
  ];
  
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Breadcrumbs</h2>
      <p className="mb-8 font-sans">
        Navigation breadcrumbs with brutalist styling, helping users understand their location in the site hierarchy.
      </p>
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Breadcrumbs</h3>
          <div className="space-y-4">
            <div>
              <Breadcrumbs items={basicItems} />
            </div>
            
            <div className="mt-6">
              <p className="mb-2 text-sm font-mono">With home icon:</p>
              <Breadcrumbs 
                items={basicItems} 
                homeIcon={
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="square" 
                    strokeLinejoin="miter"
                    className="mr-1"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                } 
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Breadcrumb Separators</h3>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-mono">Default separator (/):</p>
              <Breadcrumbs items={basicItems} />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Arrow separator:</p>
              <Breadcrumbs 
                items={basicItems} 
                separator="→"
              />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Bullet separator:</p>
              <Breadcrumbs 
                items={basicItems} 
                separator="•"
              />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Custom component separator:</p>
              <Breadcrumbs 
                items={basicItems} 
                separator={
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="square" 
                    strokeLinejoin="miter"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                }
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Breadcrumb Sizes</h3>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-mono">Small:</p>
              <Breadcrumbs 
                items={basicItems} 
                size="small"
              />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Medium (default):</p>
              <Breadcrumbs 
                items={basicItems} 
                size="medium"
              />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Large:</p>
              <Breadcrumbs 
                items={basicItems} 
                size="large"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Breadcrumb Variants</h3>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-mono">Default:</p>
              <Breadcrumbs 
                items={basicItems} 
                variant="default"
              />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Bordered:</p>
              <Breadcrumbs 
                items={basicItems} 
                variant="bordered"
              />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Cutout:</p>
              <Breadcrumbs 
                items={basicItems} 
                variant="cutout"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Truncated Breadcrumbs</h3>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-mono">Full path (long):</p>
              <Breadcrumbs items={longItems} />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Truncated to 3 items:</p>
              <Breadcrumbs 
                items={longItems} 
                maxItems={3}
              />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Truncated to 4 items:</p>
              <Breadcrumbs 
                items={longItems} 
                maxItems={4}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Breadcrumbs with Icons</h3>
          <div className="space-y-4">
            <Breadcrumbs 
              items={iconItems}
              separator="→"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 