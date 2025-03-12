import React, { useState, useRef, useEffect } from 'react';

interface MenuItem {
  id: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  submenu?: MenuItem[];
  divider?: boolean;
}

// Type guard to ensure label is present when not a divider
function isRegularMenuItem(item: MenuItem): item is MenuItem & { label: React.ReactNode } {
  return !item.divider;
}

interface FlyoutMenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  position?: 'top' | 'right' | 'bottom' | 'left';
  alignment?: 'start' | 'center' | 'end';
  variant?: 'default' | 'bordered' | 'cutout';
  size?: 'small' | 'medium' | 'large';
  width?: number | string;
  maxHeight?: number | string;
  closeOnItemClick?: boolean;
  className?: string;
  menuClassName?: string;
}

export const FlyoutMenu: React.FC<FlyoutMenuProps> = ({
  trigger,
  items,
  position = 'bottom',
  alignment = 'start',
  variant = 'default',
  size = 'medium',
  width = 'auto',
  maxHeight = 'auto',
  closeOnItemClick = true,
  className = '',
  menuClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);
  
  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // Toggle menu
  const toggleMenu = () => {
    setIsOpen(prev => !prev);
    if (isOpen) {
      setActiveSubmenu(null);
    }
  };
  
  // Handle menu item click
  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;
    
    if (item.onClick) {
      item.onClick();
    }
    
    if (closeOnItemClick && !item.submenu) {
      setIsOpen(false);
      setActiveSubmenu(null);
    }
  };
  
  // Handle submenu
  const handleSubmenuHover = (itemId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setActiveSubmenu(itemId);
    }, 100);
  };
  
  // Get variant-based styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg] bg-white';
      default:
        return 'border-2 border-black bg-white';
    }
  };
  
  // Get size-based styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'text-sm p-1';
      case 'large':
        return 'text-lg p-3';
      default: // medium
        return 'text-base p-2';
    }
  };
  
  // Get position-based styles
  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return 'bottom-full mb-1';
      case 'right':
        return 'left-full ml-1';
      case 'left':
        return 'right-full mr-1';
      default: // bottom
        return 'top-full mt-1';
    }
  };
  
  // Get alignment-based styles
  const getAlignmentStyles = () => {
    if (position === 'top' || position === 'bottom') {
      switch (alignment) {
        case 'center':
          return 'left-1/2 transform -translate-x-1/2';
        case 'end':
          return 'right-0';
        default: // start
          return 'left-0';
      }
    } else {
      switch (alignment) {
        case 'center':
          return 'top-1/2 transform -translate-y-1/2';
        case 'end':
          return 'bottom-0';
        default: // start
          return 'top-0';
      }
    }
  };
  
  // Render menu items
  const renderMenuItems = (menuItems: MenuItem[], isSubmenu = false) => {
    return menuItems.map((item, index) => {
      // If it's a divider
      if (item.divider) {
        return <div key={`divider-${index}`} className="border-t border-black my-1" />;
      }
      
      // Ensure item is a regular menu item with a label
      if (!isRegularMenuItem(item)) {
        return null;
      }
      
      const hasSubmenu = !!item.submenu?.length;
      const isActive = activeSubmenu === item.id;
      const isSubmenuActive = isActive && hasSubmenu;
      
      return (
        <div
          key={item.id}
          className="relative"
          onMouseEnter={() => hasSubmenu && handleSubmenuHover(item.id)}
          onMouseLeave={() => hasSubmenu && setActiveSubmenu(null)}
        >
          {item.href ? (
            <a
              href={item.disabled ? undefined : item.href}
              className={`
                block w-full text-left font-mono
                ${getSizeStyles()}
                ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
                ${hasSubmenu ? 'pr-8' : ''}
              `}
              onClick={(e) => {
                if (item.disabled) {
                  e.preventDefault();
                  return;
                }
                handleItemClick(item);
              }}
            >
              <div className="flex items-center">
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </div>
            </a>
          ) : (
            <button
              type="button"
              className={`
                block w-full text-left font-mono
                ${getSizeStyles()}
                ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
                ${hasSubmenu ? 'pr-8' : ''}
              `}
              onClick={() => !item.disabled && handleItemClick(item)}
              disabled={item.disabled}
            >
              <div className="flex items-center">
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </div>
            </button>
          )}
          
          {/* Submenu arrow */}
          {hasSubmenu && (
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none">
              ▶
            </div>
          )}
          
          {/* Submenu */}
          {hasSubmenu && isSubmenuActive && item.submenu && (
            <div className={`
              absolute left-full top-0 ml-1 z-10 min-w-[150px]
              ${getVariantStyles()}
            `}>
              {renderMenuItems(item.submenu, true)}
            </div>
          )}
        </div>
      );
    });
  };
  
  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      {/* Trigger */}
      <div onClick={toggleMenu} className="cursor-pointer">
        {trigger}
      </div>
      
      {/* Menu */}
      {isOpen && (
        <div
          className={`
            absolute z-10 min-w-[150px] max-w-[300px]
            ${getPositionStyles()}
            ${getAlignmentStyles()}
            ${getVariantStyles()}
            ${menuClassName}
          `}
          style={{ 
            width: typeof width === 'number' ? `${width}px` : width,
            maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
            overflow: maxHeight !== 'auto' ? 'auto' : undefined
          }}
        >
          {renderMenuItems(items)}
        </div>
      )}
    </div>
  );
};

// Context Menu
interface ContextMenuProps {
  items: MenuItem[];
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'cutout';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  menuClassName?: string;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  children,
  variant = 'default',
  size = 'medium',
  className = '',
  menuClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);
  
  // Handle context menu
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    
    // Ensure menu is within viewport bounds
    const x = Math.min(event.clientX, window.innerWidth - 200);
    const y = Math.min(event.clientY, window.innerHeight - 200);
    
    setPosition({ x, y });
    setIsOpen(true);
  };
  
  // Handle menu item click
  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;
    
    if (item.onClick) {
      item.onClick();
    }
    
    setIsOpen(false);
  };
  
  // Get variant-based styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg] bg-white';
      default:
        return 'border-2 border-black bg-white';
    }
  };
  
  // Get size-based styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'text-sm p-1';
      case 'large':
        return 'text-lg p-3';
      default: // medium
        return 'text-base p-2';
    }
  };
  
  // Render menu items
  const renderMenuItems = (menuItems: MenuItem[]) => {
    return menuItems.map((item, index) => {
      // If it's a divider
      if (item.divider) {
        return <div key={`divider-${index}`} className="border-t border-black my-1" />;
      }
      
      return (
        <div key={item.id} className="relative">
          <button
            type="button"
            className={`
              block w-full text-left font-mono
              ${getSizeStyles()}
              ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
            `}
            onClick={() => !item.disabled && handleItemClick(item)}
            disabled={item.disabled}
          >
            <div className="flex items-center">
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </div>
          </button>
        </div>
      );
    });
  };
  
  return (
    <div
      className={`relative ${className}`}
      ref={containerRef}
      onContextMenu={handleContextMenu}
    >
      {children}
      
      {isOpen && (
        <div
          ref={menuRef}
          className={`
            fixed z-50 min-w-[150px] max-w-[300px]
            ${getVariantStyles()}
            ${menuClassName}
          `}
          style={{ 
            top: position.y,
            left: position.x,
          }}
        >
          {renderMenuItems(items)}
        </div>
      )}
    </div>
  );
};

// Examples
export const FlyoutMenuExamples: React.FC = () => {
  // Generate example menu items
  const menuItems: MenuItem[] = [
    {
      id: 'item1',
      label: 'Profile',
      icon: '👤',
      onClick: () => console.log('Profile clicked'),
    },
    {
      id: 'item2',
      label: 'Settings',
      icon: '⚙️',
      onClick: () => console.log('Settings clicked'),
    },
    {
      id: 'submenu1',
      label: 'Share',
      icon: '🔗',
      submenu: [
        {
          id: 'submenu1-1',
          label: 'Twitter',
          icon: '🐦',
          onClick: () => console.log('Twitter clicked'),
        },
        {
          id: 'submenu1-2',
          label: 'Facebook',
          icon: '📘',
          onClick: () => console.log('Facebook clicked'),
        },
        {
          id: 'submenu1-3',
          label: 'Email',
          icon: '📧',
          onClick: () => console.log('Email clicked'),
        },
      ],
    },
    { divider: true, id: 'divider1' },
    {
      id: 'item3',
      label: 'Help',
      icon: '❓',
      onClick: () => console.log('Help clicked'),
    },
    {
      id: 'item4',
      label: 'Logout',
      icon: '🚪',
      onClick: () => console.log('Logout clicked'),
    },
  ];
  
  // Context menu items
  const contextMenuItems: MenuItem[] = [
    {
      id: 'context1',
      label: 'Edit',
      icon: '✏️',
      onClick: () => console.log('Edit clicked'),
    },
    {
      id: 'context2',
      label: 'Copy',
      icon: '📋',
      onClick: () => console.log('Copy clicked'),
    },
    {
      id: 'context3',
      label: 'Delete',
      icon: '🗑️',
      onClick: () => console.log('Delete clicked'),
    },
    { divider: true, id: 'context-divider1' },
    {
      id: 'context4',
      label: 'Properties',
      icon: '📊',
      onClick: () => console.log('Properties clicked'),
    },
  ];
  
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Flyout Menus</h2>
      <p className="mb-8 font-sans">
        Dropdown and context menu components with brutalist styling for various navigational and action scenarios.
      </p>
      
      <div className="space-y-12">
        {/* Basic Flyout Menus */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Flyout Menu Variants</h3>
          <div className="flex flex-wrap gap-8 items-start">
            <div>
              <FlyoutMenu
                trigger={
                  <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
                    Default Menu
                  </button>
                }
                items={menuItems}
                variant="default"
              />
            </div>
            
            <div>
              <FlyoutMenu
                trigger={
                  <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
                    Bordered Menu
                  </button>
                }
                items={menuItems}
                variant="bordered"
              />
            </div>
            
            <div>
              <FlyoutMenu
                trigger={
                  <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
                    Cutout Menu
                  </button>
                }
                items={menuItems}
                variant="cutout"
              />
            </div>
          </div>
        </div>
        
        {/* Sizes */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Size Variants</h3>
          <div className="flex flex-wrap gap-8 items-start">
            <div>
              <FlyoutMenu
                trigger={
                  <button className="px-3 py-1 text-sm border-2 border-black font-mono hover:bg-gray-100">
                    Small
                  </button>
                }
                items={menuItems}
                variant="bordered"
                size="small"
              />
            </div>
            
            <div>
              <FlyoutMenu
                trigger={
                  <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
                    Medium
                  </button>
                }
                items={menuItems}
                variant="bordered"
                size="medium"
              />
            </div>
            
            <div>
              <FlyoutMenu
                trigger={
                  <button className="px-5 py-3 text-lg border-2 border-black font-mono hover:bg-gray-100">
                    Large
                  </button>
                }
                items={menuItems}
                variant="bordered"
                size="large"
              />
            </div>
          </div>
        </div>
        
        {/* Positions */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Position Variants</h3>
          <div className="flex flex-wrap gap-8 items-center justify-center h-64">
            <div>
              <FlyoutMenu
                trigger={
                  <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
                    Bottom
                  </button>
                }
                items={menuItems}
                variant="bordered"
                position="bottom"
              />
            </div>
            
            <div>
              <FlyoutMenu
                trigger={
                  <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
                    Top
                  </button>
                }
                items={menuItems}
                variant="bordered"
                position="top"
              />
            </div>
            
            <div>
              <FlyoutMenu
                trigger={
                  <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
                    Right
                  </button>
                }
                items={menuItems}
                variant="bordered"
                position="right"
              />
            </div>
            
            <div>
              <FlyoutMenu
                trigger={
                  <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
                    Left
                  </button>
                }
                items={menuItems}
                variant="bordered"
                position="left"
              />
            </div>
          </div>
        </div>
        
        {/* Alignment */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Alignment Variants</h3>
          <div className="flex flex-wrap gap-8 items-start">
            <div>
              <FlyoutMenu
                trigger={
                  <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
                    Start
                  </button>
                }
                items={menuItems}
                variant="bordered"
                alignment="start"
              />
            </div>
            
            <div>
              <FlyoutMenu
                trigger={
                  <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
                    Center
                  </button>
                }
                items={menuItems}
                variant="bordered"
                alignment="center"
              />
            </div>
            
            <div>
              <FlyoutMenu
                trigger={
                  <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
                    End
                  </button>
                }
                items={menuItems}
                variant="bordered"
                alignment="end"
              />
            </div>
          </div>
        </div>
        
        {/* Context Menu */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Context Menu</h3>
          <ContextMenu
            items={contextMenuItems}
            variant="bordered"
          >
            <div className="p-8 border-2 border-black bg-gray-100 text-center">
              Right-click in this area to open the context menu
            </div>
          </ContextMenu>
          <p className="mt-2 text-sm text-gray-600">
            Note: Right-click in the box above to see the context menu.
          </p>
        </div>
      </div>
    </div>
  );
}; 