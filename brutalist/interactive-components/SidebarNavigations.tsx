import React, { useState } from 'react';

interface NavItem {
  id: string;
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  items?: NavItem[];
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

interface SidebarProps {
  items: NavItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'bordered' | 'cutout';
  size?: 'small' | 'medium' | 'large';
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  togglePosition?: 'top' | 'bottom';
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  header,
  footer,
  variant = 'default',
  size = 'medium',
  collapsible = false,
  defaultCollapsed = false,
  togglePosition = 'top',
  className = '',
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  
  // Toggle sidebar collapse state
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    if (!collapsed) {
      // Close all expanded items when collapsing
      setExpandedItems({});
    }
  };
  
  // Toggle a submenu
  const toggleSubmenu = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };
  
  // Handle item click
  const handleItemClick = (item: NavItem) => {
    if (item.disabled) return;
    
    if (item.onClick) {
      item.onClick();
    }
  };
  
  // Get variant-based styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Get size-based styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          item: 'py-1 px-2 text-sm',
          icon: 'w-4 h-4 mr-2',
          collapsed: 'w-12',
          expanded: 'w-48',
        };
      case 'large':
        return {
          item: 'py-3 px-4 text-lg',
          icon: 'w-6 h-6 mr-3',
          collapsed: 'w-20',
          expanded: 'w-64',
        };
      default: // medium
        return {
          item: 'py-2 px-3 text-base',
          icon: 'w-5 h-5 mr-2',
          collapsed: 'w-16',
          expanded: 'w-56',
        };
    }
  };
  
  // Get collapse toggle button
  const renderCollapseToggle = () => {
    if (!collapsible) return null;
    
    return (
      <button
        type="button"
        className="w-full py-2 border-t-2 border-black font-mono text-center hover:bg-gray-100"
        onClick={toggleCollapse}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? '→' : '←'}
      </button>
    );
  };
  
  // Render a nav item
  const renderNavItem = (item: NavItem, level = 0) => {
    const hasSubmenu = item.items && item.items.length > 0;
    const isExpanded = expandedItems[item.id];
    const sizeStyles = getSizeStyles();
    
    // Base classes for all items
    const baseClasses = `
      flex items-center font-mono relative
      ${sizeStyles.item}
      ${item.active ? 'font-bold bg-gray-100' : ''}
      ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}
      ${level > 0 ? 'pl-6' : ''}
      ${hasSubmenu ? 'justify-between' : 'justify-start'}
    `;
    
    // Content to render inside the item
    const itemContent = (
      <>
        <div className="flex items-center overflow-hidden">
          {/* Icon */}
          {item.icon && (
            <span className={`
              flex-shrink-0 
              ${collapsed ? 'mx-auto' : sizeStyles.icon}
            `}>
              {item.icon}
            </span>
          )}
          
          {/* Label */}
          {!collapsed && (
            <span className="truncate">{item.label}</span>
          )}
        </div>
        
        {/* Badge */}
        {item.badge && !collapsed && (
          <span className="ml-2 flex-shrink-0">{item.badge}</span>
        )}
        
        {/* Submenu indicator */}
        {hasSubmenu && !collapsed && (
          <span className="ml-2">
            {isExpanded ? '−' : '+'}
          </span>
        )}
      </>
    );
    
    // Create the item, either as a link or button
    const navElement = item.href ? (
      <a 
        href={item.disabled ? undefined : item.href}
        className={baseClasses}
        onClick={(e) => {
          if (item.disabled) {
            e.preventDefault();
            return;
          }
          if (hasSubmenu) {
            e.preventDefault();
            toggleSubmenu(item.id);
          } else {
            handleItemClick(item);
          }
        }}
        title={collapsed ? String(item.label) : undefined}
      >
        {itemContent}
      </a>
    ) : (
      <button
        type="button"
        className={`${baseClasses} text-left w-full`}
        onClick={() => {
          if (hasSubmenu) {
            toggleSubmenu(item.id);
          } else {
            handleItemClick(item);
          }
        }}
        disabled={item.disabled}
        title={collapsed ? String(item.label) : undefined}
      >
        {itemContent}
      </button>
    );
    
    return (
      <div key={item.id}>
        {navElement}
        
        {/* Submenu */}
        {hasSubmenu && isExpanded && !collapsed && item.items && (
          <div className="border-l border-gray-300 ml-4">
            {item.items.map(subItem => renderNavItem(subItem, level + 1))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <nav 
      className={`
        bg-white overflow-hidden h-full flex flex-col
        transition-all duration-300 ease-in-out
        ${getVariantStyles()}
        ${collapsed ? getSizeStyles().collapsed : getSizeStyles().expanded}
        ${className}
      `}
    >
      {/* Header */}
      {header && (
        <div className={`
          border-b-2 border-black p-3
          ${collapsed ? 'text-center' : ''}
        `}>
          {header}
        </div>
      )}
      
      {/* Top toggle */}
      {collapsible && togglePosition === 'top' && renderCollapseToggle()}
      
      {/* Navigation items */}
      <div className="flex-grow overflow-y-auto">
        {items.map(item => renderNavItem(item))}
      </div>
      
      {/* Bottom toggle */}
      {collapsible && togglePosition === 'bottom' && renderCollapseToggle()}
      
      {/* Footer */}
      {footer && (
        <div className={`
          border-t-2 border-black p-3
          ${collapsed ? 'text-center' : ''}
        `}>
          {footer}
        </div>
      )}
    </nav>
  );
};

// Vertical tabs styled as a sidebar
export const VerticalTabs: React.FC<{
  items: (NavItem & { content?: React.ReactNode })[];
  header?: React.ReactNode;
  activeTab?: string;
  onChange?: (id: string) => void;
  variant?: 'default' | 'bordered' | 'cutout';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}> = ({
  items,
  header,
  activeTab,
  onChange,
  variant = 'default',
  size = 'medium',
  className = '',
}) => {
  // Find active item
  const activeItem = items.find(item => item.id === activeTab);

  // Handle tab change
  const handleTabChange = (item: NavItem) => {
    if (item.disabled) return;
    
    if (onChange) {
      onChange(item.id);
    }
    
    if (item.onClick) {
      item.onClick();
    }
  };
  
  // Get size-based styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'py-1 px-2 text-sm';
      case 'large':
        return 'py-3 px-4 text-lg';
      default: // medium
        return 'py-2 px-3 text-base';
    }
  };
  
  return (
    <div className={`flex h-full ${className}`}>
      {/* Tabs sidebar */}
      <div className={`
        w-64 h-full overflow-y-auto
        border-2 border-black
        ${variant === 'bordered' ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : ''}
        ${variant === 'cutout' ? 'transform rotate-[-0.5deg]' : ''}
      `}>
        {header && (
          <div className="p-4 border-b-2 border-black">
            {header}
          </div>
        )}
        
        <div className="p-2">
          {items.map(item => (
            <div 
              key={item.id}
              className={`
                p-3 mb-2 cursor-pointer
                ${item.id === activeTab ? 'bg-black text-white' : 'hover:bg-gray-100'}
                ${getSizeStyles()}
              `}
              onClick={() => handleTabChange(item)}
            >
              <div className="flex items-center">
                {item.icon && (
                  <span className="mr-2">{item.icon}</span>
                )}
                <span className="font-mono">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Content area */}
      <div className={`
        flex-grow p-6 ml-4
        border-2 border-black
        ${variant === 'bordered' ? 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : ''}
        ${variant === 'cutout' ? 'transform rotate-[-0.5deg]' : ''}
      `}>
        {activeItem && activeItem.content ? (
          <div className="h-full">
            {activeItem.content}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 font-mono">
            Select an item to view content
          </div>
        )}
      </div>
    </div>
  );
};

// Compact side navigation
export const CompactSidebar: React.FC<{
  items: {
    icon: React.ReactNode;
    label: string;
    href?: string;
    active?: boolean;
    onClick?: () => void;
  }[];
  variant?: 'default' | 'bordered' | 'cutout';
  className?: string;
}> = ({
  items,
  variant = 'default',
  className = '',
}) => {
  // Get variant-based styles
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
    <div className={`
      w-16 bg-white overflow-hidden
      ${getVariantStyles()}
      ${className}
    `}>
      {items.map((item, index) => {
        const element = (
          <div className={`
            flex flex-col items-center justify-center py-3
            ${item.active ? 'bg-black text-white' : 'hover:bg-gray-100 cursor-pointer'}
          `}>
            <div className="text-lg mb-1">{item.icon}</div>
            <div className="text-xs font-mono">{item.label}</div>
          </div>
        );
        
        return (
          <div key={index}>
            {item.href ? (
              <a href={item.href} onClick={item.onClick}>
                {element}
              </a>
            ) : (
              <button 
                className="w-full" 
                onClick={item.onClick}
              >
                {element}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Examples
export const SidebarNavigationsExamples: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  
  // Sample navigation items
  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      href: '#dashboard',
      active: true,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: '👤',
      href: '#profile',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      items: [
        {
          id: 'account',
          label: 'Account',
          href: '#account',
        },
        {
          id: 'security',
          label: 'Security',
          href: '#security',
        },
        {
          id: 'notifications',
          label: 'Notifications',
          href: '#notifications',
          badge: <span className="bg-black text-white text-xs px-2 py-1 rounded-full">3</span>,
        },
      ],
    },
    {
      id: 'help',
      label: 'Help',
      icon: '❓',
      href: '#help',
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: '🚪',
      href: '#logout',
    },
  ];
  
  // Sample tab content
  const tabItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      content: (
        <div>
          <h2 className="text-2xl font-mono font-bold mb-4">Dashboard</h2>
          <p>This is the dashboard content.</p>
        </div>
      ),
    },
    {
      id: 'users',
      label: 'Users',
      icon: '👥',
      content: (
        <div>
          <h2 className="text-2xl font-mono font-bold mb-4">Users</h2>
          <p>This is the users management content.</p>
        </div>
      ),
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: '📈',
      content: (
        <div>
          <h2 className="text-2xl font-mono font-bold mb-4">Analytics</h2>
          <p>This is the analytics content.</p>
        </div>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      content: (
        <div>
          <h2 className="text-2xl font-mono font-bold mb-4">Settings</h2>
          <p>This is the settings content.</p>
        </div>
      ),
    },
  ];
  
  // Compact sidebar items
  const compactItems = [
    {
      icon: '🏠',
      label: 'Home',
      href: '#home',
      active: true,
    },
    {
      icon: '📄',
      label: 'Docs',
      href: '#docs',
    },
    {
      icon: '💬',
      label: 'Chat',
      href: '#chat',
    },
    {
      icon: '⚙️',
      label: 'Settings',
      href: '#settings',
    },
    {
      icon: '👤',
      label: 'Profile',
      href: '#profile',
    },
  ];
  
  return (
    <div className="p-6 max-w-6xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Sidebar Navigations</h2>
      <p className="mb-8 font-sans">
        Sidebar navigation components with brutalist styling for application interfaces.
      </p>
      
      <div className="space-y-20">
        {/* Basic Sidebar */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Sidebar</h3>
          <div className="h-96 flex">
            <Sidebar
              items={navItems}
              header={<div className="font-mono font-bold">BRUTALIST</div>}
              footer={<div className="text-sm text-gray-500">v1.0.0</div>}
              variant="bordered"
            />
            <div className="ml-4 flex-grow border-2 border-gray-200 p-4">
              <p>Main content area</p>
            </div>
          </div>
        </div>
        
        {/* Collapsible Sidebar */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Collapsible Sidebar</h3>
          <div className="h-96 flex">
            <Sidebar
              items={navItems}
              header={<div className="font-mono font-bold">BRUTALIST</div>}
              variant="bordered"
              collapsible
              defaultCollapsed={collapsed}
              togglePosition="bottom"
            />
            <div className="ml-4 flex-grow border-2 border-gray-200 p-4">
              <p>Main content area</p>
              <button 
                onClick={() => setCollapsed(!collapsed)}
                className="mt-4 px-4 py-2 border-2 border-black font-mono"
              >
                {collapsed ? 'Expand' : 'Collapse'} Sidebar
              </button>
            </div>
          </div>
        </div>
        
        {/* Sidebar Variants */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Sidebar Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64">
              <h4 className="font-mono font-bold mb-2">Default</h4>
              <Sidebar
                items={navItems.slice(0, 3)}
                header={<div className="font-mono font-bold">BRUTALIST</div>}
                variant="default"
              />
            </div>
            
            <div className="h-64">
              <h4 className="font-mono font-bold mb-2">Bordered</h4>
              <Sidebar
                items={navItems.slice(0, 3)}
                header={<div className="font-mono font-bold">BRUTALIST</div>}
                variant="bordered"
              />
            </div>
            
            <div className="h-64">
              <h4 className="font-mono font-bold mb-2">Cutout</h4>
              <Sidebar
                items={navItems.slice(0, 3)}
                header={<div className="font-mono font-bold">BRUTALIST</div>}
                variant="cutout"
              />
            </div>
          </div>
        </div>
        
        {/* Sidebar Sizes */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Sidebar Sizes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64">
              <h4 className="font-mono font-bold mb-2">Small</h4>
              <Sidebar
                items={navItems.slice(0, 3)}
                header={<div className="font-mono font-bold">BRUTALIST</div>}
                variant="bordered"
                size="small"
              />
            </div>
            
            <div className="h-64">
              <h4 className="font-mono font-bold mb-2">Medium</h4>
              <Sidebar
                items={navItems.slice(0, 3)}
                header={<div className="font-mono font-bold">BRUTALIST</div>}
                variant="bordered"
                size="medium"
              />
            </div>
            
            <div className="h-64">
              <h4 className="font-mono font-bold mb-2">Large</h4>
              <Sidebar
                items={navItems.slice(0, 3)}
                header={<div className="font-mono font-bold">BRUTALIST</div>}
                variant="bordered"
                size="large"
              />
            </div>
          </div>
        </div>
        
        {/* Vertical Tabs */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Vertical Tabs</h3>
          <div className="h-96">
            <VerticalTabs
              items={tabItems}
              activeTab={activeTab}
              onChange={setActiveTab}
              header={<div className="font-mono font-bold">BRUTALIST</div>}
              variant="bordered"
            />
          </div>
        </div>
        
        {/* Compact Sidebar */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Compact Sidebar</h3>
          <div className="h-96 flex">
            <CompactSidebar
              items={compactItems}
              variant="bordered"
            />
            <div className="ml-4 flex-grow border-2 border-gray-200 p-4">
              <p>Main content area</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 