import React, { useState, useEffect, useRef } from 'react';

interface NavItem {
  id: string;
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  items?: NavItem[];
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

interface NavbarProps {
  brand?: React.ReactNode;
  items?: NavItem[];
  actions?: React.ReactNode;
  variant?: 'default' | 'bordered' | 'cutout';
  position?: 'static' | 'sticky' | 'fixed';
  mobileBreakpoint?: 'sm' | 'md' | 'lg' | 'xl';
  elevated?: boolean;
  transparent?: boolean;
  containerClassName?: string;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  items = [],
  actions,
  variant = 'default',
  position = 'static',
  mobileBreakpoint = 'md',
  elevated = false,
  transparent = false,
  containerClassName = '',
  className = '',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  
  // Close menu on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(false);
      setActiveSubmenu(null);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Close on click outside
  useEffect(() => {
    if (!isMenuOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setActiveSubmenu(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  // Close on Escape key
  useEffect(() => {
    if (!isMenuOpen) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setActiveSubmenu(null);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setActiveSubmenu(null);
    }
  };
  
  // Toggle submenu
  const toggleSubmenu = (itemId: string) => {
    setActiveSubmenu(activeSubmenu === itemId ? null : itemId);
  };
  
  // Get variant-based styles
  const getVariantStyles = () => {
    let baseStyles = '';
    
    if (!transparent) {
      baseStyles = 'bg-white';
    }
    
    switch (variant) {
      case 'bordered':
        return `${baseStyles} border-2 border-black ${elevated ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : ''}`;
      case 'cutout':
        return `${baseStyles} border-2 border-black transform rotate-[-0.5deg]`;
      default:
        return `${baseStyles} border-b-2 border-black`;
    }
  };
  
  // Get position-based styles
  const getPositionStyles = () => {
    switch (position) {
      case 'sticky':
        return 'sticky top-0 z-30';
      case 'fixed':
        return 'fixed top-0 left-0 right-0 z-30';
      default:
        return '';
    }
  };
  
  // Handle item click
  const handleItemClick = (item: NavItem) => {
    if (item.disabled) return;
    
    if (item.onClick) {
      item.onClick();
    }
    
    if (!item.items) {
      setIsMenuOpen(false);
      setActiveSubmenu(null);
    }
  };
  
  // Render a nav item
  const renderNavItem = (item: NavItem, isMobile = false, isSubmenuItem = false) => {
    const hasSubmenu = item.items && item.items.length > 0;
    const isSubmenuActive = activeSubmenu === item.id;
    
    const baseClasses = `
      font-mono whitespace-nowrap
      ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      ${item.active ? 'font-bold' : ''}
      ${isSubmenuItem ? 'pl-4' : ''}
    `;
    
    const desktopClasses = `
      px-3 py-2
      ${!isSubmenuItem && item.active ? 'border-b-2 border-black -mb-[2px]' : ''}
      ${!item.disabled && !isSubmenuItem ? 'hover:bg-gray-100' : ''}
    `;
    
    const mobileClasses = `
      px-4 py-3 
      ${hasSubmenu ? 'flex justify-between items-center' : ''}
      ${!item.disabled ? 'hover:bg-gray-100' : ''}
      ${isSubmenuActive ? 'bg-gray-100' : ''}
    `;
    
    const classes = isMobile ? `${baseClasses} ${mobileClasses}` : `${baseClasses} ${desktopClasses}`;
    
    const content = (
      <>
        <div className="flex items-center">
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.label}
        </div>
        {hasSubmenu && isMobile && (
          <span className="ml-2">{isSubmenuActive ? '−' : '+'}</span>
        )}
        {hasSubmenu && !isMobile && (
          <span className="ml-1">▼</span>
        )}
      </>
    );
    
    // Use an anchor if href is provided
    if (item.href) {
      return (
        <a
          href={item.disabled ? undefined : item.href}
          className={classes}
          onClick={(e) => {
            if (item.disabled) {
              e.preventDefault();
              return;
            }
            handleItemClick(item);
          }}
        >
          {content}
        </a>
      );
    }
    
    // Otherwise use a button
    return (
      <button
        type="button"
        className={classes}
        onClick={() => {
          if (hasSubmenu && isMobile) {
            toggleSubmenu(item.id);
          }
          handleItemClick(item);
        }}
        disabled={item.disabled}
      >
        {content}
      </button>
    );
  };
  
  // Render submenu for desktop
  const renderDesktopSubmenu = (item: NavItem) => {
    if (!item.items || item.items.length === 0) return null;
    
    return (
      <div className={`
        absolute top-full left-0 mt-1 z-10 min-w-[200px]
        bg-white border-2 border-black shadow-md
      `}>
        {item.items.map(subItem => (
          <div key={subItem.id}>
            {renderNavItem(subItem, false, true)}
          </div>
        ))}
      </div>
    );
  };
  
  // Render mobile submenu
  const renderMobileSubmenu = (item: NavItem) => {
    if (!item.items || item.items.length === 0) return null;
    
    return (
      <div className="pl-4 border-l border-black">
        {item.items.map(subItem => (
          <div key={subItem.id}>
            {renderNavItem(subItem, true, true)}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div
      ref={navRef}
      className={`
        ${getPositionStyles()}
        ${getVariantStyles()}
        ${className}
      `}
    >
      <div className={`
        container mx-auto px-4
        ${containerClassName}
      `}>
        <div className="flex justify-between items-center h-16">
          {/* Brand/Logo */}
          {brand && (
            <div className="flex-shrink-0">
              {brand}
            </div>
          )}
          
          {/* Desktop Navigation */}
          <div className={`hidden ${mobileBreakpoint}:flex flex-grow justify-center ml-6 mr-6`}>
            {items.map(item => (
              <div key={item.id} className="relative group">
                {renderNavItem(item)}
                {item.items && item.items.length > 0 && (
                  <div className="absolute top-full left-0 hidden group-hover:block">
                    {renderDesktopSubmenu(item)}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Actions */}
          {actions && (
            <div className={`hidden ${mobileBreakpoint}:flex items-center`}>
              {actions}
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <div className={`${mobileBreakpoint}:hidden ml-auto`}>
            <button
              type="button"
              className="px-3 py-2 border-2 border-black font-mono text-lg"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? '×' : '☰'}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`${mobileBreakpoint}:hidden bg-white border-t-2 border-black`}>
            <div className="py-2">
              {items.map(item => (
                <div key={item.id}>
                  {renderNavItem(item, true)}
                  {activeSubmenu === item.id && item.items && (
                    renderMobileSubmenu(item)
                  )}
                </div>
              ))}
              
              {actions && (
                <div className="px-4 py-3 mt-2 border-t border-black">
                  {actions}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Simple Navbar component with fewer options
export const SimpleNavbar: React.FC<{
  brand?: React.ReactNode;
  links: { label: string; href: string; active?: boolean }[];
  variant?: 'default' | 'bordered' | 'cutout';
  className?: string;
}> = ({
  brand,
  links,
  variant = 'default',
  className = '',
}) => {
  // Convert links to NavItem format
  const items: NavItem[] = links.map((link, index) => ({
    id: `link-${index}`,
    label: link.label,
    href: link.href,
    active: link.active,
  }));
  
  return (
    <Navbar
      brand={brand}
      items={items}
      variant={variant}
      className={className}
    />
  );
};

// Examples
export const NavbarExamples: React.FC = () => {
  // Example items
  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      href: '#',
      active: true,
    },
    {
      id: 'about',
      label: 'About',
      href: '#',
    },
    {
      id: 'services',
      label: 'Services',
      items: [
        {
          id: 'service1',
          label: 'Web Design',
          href: '#',
        },
        {
          id: 'service2',
          label: 'Development',
          href: '#',
        },
        {
          id: 'service3',
          label: 'Consulting',
          href: '#',
        },
      ],
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      href: '#',
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '#',
    },
  ];
  
  return (
    <div className="p-6 max-w-4xl space-y-20">
      <div>
        <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Navigation Bars</h2>
        <p className="mb-8 font-sans">
          Navigation bar components with brutalist styling for site-wide navigation and branding.
        </p>
      </div>
      
      {/* Default Navbar */}
      <div className="space-y-2">
        <h3 className="text-xl font-mono font-bold mb-4 uppercase">Default Navbar</h3>
        <Navbar
          brand={<span className="text-xl font-mono font-bold">BRUTALIST</span>}
          items={navItems}
          actions={
            <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
              Login
            </button>
          }
        />
        <p className="text-sm text-gray-500 mt-2">
          Default navbar with bottom border only.
        </p>
      </div>
      
      {/* Bordered Navbar */}
      <div className="space-y-2">
        <h3 className="text-xl font-mono font-bold mb-4 uppercase">Bordered Navbar</h3>
        <Navbar
          brand={<span className="text-xl font-mono font-bold">BRUTALIST</span>}
          items={navItems}
          actions={
            <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
              Login
            </button>
          }
          variant="bordered"
        />
        <p className="text-sm text-gray-500 mt-2">
          Bordered navbar with a clean, defined edge.
        </p>
      </div>
      
      {/* Elevated Navbar */}
      <div className="space-y-2">
        <h3 className="text-xl font-mono font-bold mb-4 uppercase">Elevated Navbar</h3>
        <Navbar
          brand={<span className="text-xl font-mono font-bold">BRUTALIST</span>}
          items={navItems}
          actions={
            <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
              Login
            </button>
          }
          variant="bordered"
          elevated
        />
        <p className="text-sm text-gray-500 mt-2">
          Elevated navbar with shadow for more depth.
        </p>
      </div>
      
      {/* Cutout Navbar */}
      <div className="space-y-2">
        <h3 className="text-xl font-mono font-bold mb-4 uppercase">Cutout Navbar</h3>
        <Navbar
          brand={<span className="text-xl font-mono font-bold">BRUTALIST</span>}
          items={navItems}
          actions={
            <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
              Login
            </button>
          }
          variant="cutout"
        />
        <p className="text-sm text-gray-500 mt-2">
          Cutout navbar with a slight rotation for a raw, unpolished look.
        </p>
      </div>
      
      {/* Transparent Navbar */}
      <div className="space-y-2 p-6 bg-gray-200">
        <h3 className="text-xl font-mono font-bold mb-4 uppercase">Transparent Navbar</h3>
        <Navbar
          brand={<span className="text-xl font-mono font-bold">BRUTALIST</span>}
          items={navItems}
          actions={
            <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
              Login
            </button>
          }
          variant="bordered"
          transparent
        />
        <p className="text-sm text-gray-500 mt-2">
          Transparent navbar that lets the background show through.
        </p>
      </div>
      
      {/* Simple Navbar */}
      <div className="space-y-2">
        <h3 className="text-xl font-mono font-bold mb-4 uppercase">Simple Navbar</h3>
        <SimpleNavbar
          brand={<span className="text-xl font-mono font-bold">BRUTALIST</span>}
          links={[
            { label: 'Home', href: '#', active: true },
            { label: 'About', href: '#' },
            { label: 'Services', href: '#' },
            { label: 'Contact', href: '#' },
          ]}
          variant="bordered"
        />
        <p className="text-sm text-gray-500 mt-2">
          A simplified navbar component for quick implementation.
        </p>
      </div>
    </div>
  );
}; 