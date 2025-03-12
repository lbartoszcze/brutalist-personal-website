import React, { useState, useRef, useEffect } from 'react';

// Base interface for all menu items
interface BaseMenuItem {
  id: string;
  disabled?: boolean;
}

// Interface for regular menu items
interface RegularMenuItem extends BaseMenuItem {
  label: string;
  icon?: React.ReactNode;
  divider?: false;
  onClick?: () => void;
}

// Interface for divider items
interface DividerMenuItem extends BaseMenuItem {
  divider: true;
  label?: never;
  icon?: never;
  onClick?: never;
}

// Union type for all menu item types
type MenuItem = RegularMenuItem | DividerMenuItem;

interface MenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  align?: 'left' | 'right';
  variant?: 'default' | 'bordered' | 'cutout';
  className?: string;
}

export const Menu: React.FC<MenuProps> = ({
  trigger,
  items,
  align = 'left',
  variant = 'default',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        triggerRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Close menu when pressing escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);
  
  // Handle menu item click
  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;
    
    if (!item.divider && item.onClick) {
      item.onClick();
    }
    
    setIsOpen(false);
  };
  
  // Variant classes
  const variantClasses = {
    default: 'bg-white border-2 border-black',
    bordered: 'bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
    cutout: 'bg-white border-2 border-black transform rotate-[-1deg]',
  };
  
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Trigger element */}
      <div 
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>
      
      {/* Menu panel */}
      {isOpen && (
        <div 
          ref={menuRef}
          className={`
            absolute z-10 min-w-[12rem] py-1 mt-1
            ${variantClasses[variant]}
            ${align === 'right' ? 'right-0' : 'left-0'}
          `}
        >
          <ul>
            {items.map((item) => (
              <React.Fragment key={item.id}>
                {item.divider ? (
                  <li className="h-px bg-black my-1" />
                ) : (
                  <li>
                    <button
                      onClick={() => handleItemClick(item)}
                      className={`
                        w-full text-left px-4 py-2 font-mono
                        ${item.disabled 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-gray-100 cursor-pointer'}
                        flex items-center
                      `}
                      disabled={item.disabled}
                    >
                      {item.icon && (
                        <span className="mr-2">{item.icon}</span>
                      )}
                      {item.label}
                    </button>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Menu with Icon Trigger
export const IconMenu: React.FC<Omit<MenuProps, 'trigger'>> = (props) => {
  return (
    <Menu
      {...props}
      trigger={
        <button className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center hover:bg-gray-100">
          <span className="font-mono font-bold">≡</span>
        </button>
      }
    />
  );
};

// Menu with Text Trigger
export const TextMenu: React.FC<Omit<MenuProps, 'trigger'> & {
  label: string;
}> = ({ label, ...props }) => {
  return (
    <Menu
      {...props}
      trigger={
        <button className="px-4 py-2 border-2 border-black bg-white font-mono hover:bg-gray-100 flex items-center">
          {label}
          <span className="ml-2">▼</span>
        </button>
      }
    />
  );
};

export const Menus: React.FC = () => {
  // Example menu items
  const menuItems: MenuItem[] = [
    { id: 'item1', label: 'Profile', icon: '👤' },
    { id: 'item2', label: 'Settings', icon: '⚙️' },
    { id: 'divider1', divider: true },
    { id: 'item3', label: 'Help', icon: '❓' },
    { id: 'item4', label: 'Disabled Option', disabled: true },
    { id: 'divider2', divider: true },
    { id: 'item5', label: 'Sign Out', icon: '🚪' },
  ];
  
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Menus</h2>
      <p className="mb-8 font-sans">
        Dropdown menus with brutalist styling, featuring strong borders and minimal aesthetics.
      </p>
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Icon Menus</h3>
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="mb-2 text-sm font-mono">Default Variant:</p>
              <IconMenu items={menuItems} />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Bordered Variant:</p>
              <IconMenu items={menuItems} variant="bordered" />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Cutout Variant:</p>
              <IconMenu items={menuItems} variant="cutout" />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Right Aligned:</p>
              <IconMenu items={menuItems} align="right" />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Text Menus</h3>
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="mb-2 text-sm font-mono">Default Variant:</p>
              <TextMenu label="Options" items={menuItems} />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Bordered Variant:</p>
              <TextMenu label="Settings" items={menuItems} variant="bordered" />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Cutout Variant:</p>
              <TextMenu label="Account" items={menuItems} variant="cutout" />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Right Aligned:</p>
              <TextMenu label="Menu" items={menuItems} align="right" />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Custom Trigger</h3>
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="mb-2 text-sm font-mono">With Button Trigger:</p>
              <Menu
                items={menuItems}
                trigger={
                  <button className="px-4 py-2 bg-black text-white font-mono uppercase border-2 border-black hover:bg-gray-800">
                    Custom Trigger
                  </button>
                }
              />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">With Text Trigger:</p>
              <Menu
                items={menuItems}
                trigger={
                  <span className="underline font-mono cursor-pointer">
                    Click me for menu
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 