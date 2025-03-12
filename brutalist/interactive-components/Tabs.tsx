import React, { useState, useEffect, useRef } from 'react';

interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  defaultActiveTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'bordered' | 'cutout' | 'folder';
  orientation?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  contentClassName?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveTab,
  activeTab: controlledActiveTab,
  onChange,
  variant = 'default',
  orientation = 'horizontal',
  size = 'medium',
  fullWidth = false,
  contentClassName = '',
  className = '',
}) => {
  // Initialize activeTab state
  const [activeTab, setActiveTab] = useState<string>(() => {
    // If controlledActiveTab is provided, use it
    if (controlledActiveTab) return controlledActiveTab;
    // If defaultActiveTab is provided, use it
    if (defaultActiveTab) return defaultActiveTab;
    // Otherwise, use the first non-disabled tab
    const firstEnabledTab = items.find(item => !item.disabled);
    return firstEnabledTab ? firstEnabledTab.id : '';
  });
  
  // Indicator element references
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  
  // Update activeTab when controlledActiveTab changes
  useEffect(() => {
    if (controlledActiveTab !== undefined) {
      setActiveTab(controlledActiveTab);
    }
  }, [controlledActiveTab]);
  
  // Update indicator position when activeTab changes
  useEffect(() => {
    updateIndicatorPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, orientation, variant]);
  
  // Update indicator on window resize
  useEffect(() => {
    const handleResize = () => {
      updateIndicatorPosition();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Function to update indicator position
  const updateIndicatorPosition = () => {
    if (!indicatorRef.current || !activeTabRef.current || !tabsRef.current) return;
    
    const activeTabElement = activeTabRef.current;
    const indicator = indicatorRef.current;
    
    if (orientation === 'horizontal') {
      indicator.style.width = `${activeTabElement.offsetWidth}px`;
      indicator.style.height = '3px';
      indicator.style.transform = `translateX(${activeTabElement.offsetLeft}px)`;
      indicator.style.top = '';
      indicator.style.left = '0';
      indicator.style.bottom = '0';
    } else {
      indicator.style.height = `${activeTabElement.offsetHeight}px`;
      indicator.style.width = '3px';
      indicator.style.transform = `translateY(${activeTabElement.offsetTop}px)`;
      indicator.style.left = '0';
      indicator.style.top = '0';
      indicator.style.bottom = '';
    }
  };
  
  // Handle tab selection
  const handleTabClick = (tabId: string, disabled: boolean = false) => {
    if (disabled) return;
    
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };
  
  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      case 'folder':
        return 'border-b-2 border-black';
      default:
        return 'border-b-2 border-black';
    }
  };
  
  // Size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'text-sm py-1 px-2';
      case 'large':
        return 'text-lg py-3 px-6';
      default: // medium
        return 'text-base py-2 px-4';
    }
  };
  
  // Tab container styles
  const getTabContainerStyles = () => {
    if (orientation === 'horizontal') {
      return `flex ${fullWidth ? 'w-full' : ''} relative`;
    } else {
      return 'flex flex-col relative';
    }
  };
  
  // Tab styles
  const getTabStyles = (isActive: boolean, isDisabled: boolean, isFolder: boolean) => {
    let styles = `
      font-mono font-medium relative 
      ${getSizeStyles()}
      ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-100'}
      transition-colors duration-200
    `;
    
    if (isFolder && orientation === 'horizontal') {
      styles += `
        ${isActive ? 'bg-white border-t-2 border-l-2 border-r-2 border-black rounded-t-md mb-[-2px] z-10' : 'border-b-2 border-black'}
      `;
    } else {
      styles += `
        ${isActive ? 'font-bold' : ''}
      `;
    }
    
    return styles;
  };
  
  // Content styles
  const getContentStyles = () => {
    if (variant === 'folder') {
      return `
        border-l-2 border-r-2 border-b-2 border-black p-4 
        ${contentClassName}
      `;
    } else if (variant === 'bordered') {
      return `
        border-l-2 border-r-2 border-b-2 border-black p-4 
        ${contentClassName}
      `;
    } else if (variant === 'cutout') {
      return `
        border-l-2 border-r-2 border-b-2 border-black p-4 
        transform rotate-[0.5deg] 
        ${contentClassName}
      `;
    } else {
      return `
        p-4 
        ${contentClassName}
      `;
    }
  };
  
  // Function to render tabs
  const renderTabs = () => {
    return items.map((item) => (
      <button
        key={item.id}
        ref={item.id === activeTab ? activeTabRef : undefined}
        onClick={() => handleTabClick(item.id, item.disabled)}
        className={getTabStyles(
          item.id === activeTab,
          !!item.disabled,
          variant === 'folder'
        )}
        disabled={item.disabled}
        aria-selected={item.id === activeTab}
        role="tab"
      >
        {item.label}
      </button>
    ));
  };
  
  // Function to render active content
  const renderActiveContent = () => {
    const activeItem = items.find(item => item.id === activeTab);
    return activeItem ? activeItem.content : null;
  };
  
  return (
    <div className={`tabs-component ${className}`}>
      {/* Tabs */}
      <div 
        ref={tabsRef}
        className={`${getTabContainerStyles()} ${getVariantStyles()}`}
        role="tablist"
      >
        {renderTabs()}
        
        {/* Active tab indicator */}
        {variant !== 'folder' && (
          <div 
            ref={indicatorRef}
            className="absolute bg-black transition-all duration-300 ease-in-out"
          />
        )}
      </div>
      
      {/* Content */}
      <div className={getContentStyles()}>
        {renderActiveContent()}
      </div>
    </div>
  );
};

// Card tab component
interface CardTabsProps {
  items: TabItem[];
  defaultActiveTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'bordered' | 'cutout';
  className?: string;
}

export const CardTabs: React.FC<CardTabsProps> = ({
  items,
  defaultActiveTab,
  activeTab: controlledActiveTab,
  onChange,
  variant = 'default',
  className = '',
}) => {
  // Initialize activeTab state
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (controlledActiveTab) return controlledActiveTab;
    if (defaultActiveTab) return defaultActiveTab;
    const firstEnabledTab = items.find(item => !item.disabled);
    return firstEnabledTab ? firstEnabledTab.id : '';
  });
  
  // Update activeTab when controlledActiveTab changes
  useEffect(() => {
    if (controlledActiveTab !== undefined) {
      setActiveTab(controlledActiveTab);
    }
  }, [controlledActiveTab]);
  
  // Handle tab selection
  const handleTabClick = (tabId: string, disabled: boolean = false) => {
    if (disabled) return;
    
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };
  
  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'transform rotate-[-0.5deg]';
      default:
        return '';
    }
  };
  
  return (
    <div className={`card-tabs ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleTabClick(item.id, item.disabled)}
            className={`
              border-2 border-black p-4 cursor-pointer 
              transition-all duration-200 
              ${item.id === activeTab ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}
              ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${getVariantStyles()}
            `}
          >
            <div className="font-mono font-bold mb-2">{item.label}</div>
            {item.id === activeTab && (
              <div className="mt-4">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Accordion-style tabs
interface AccordionTabsProps {
  items: TabItem[];
  defaultActiveTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
  allowMultiple?: boolean;
  variant?: 'default' | 'bordered' | 'cutout';
  className?: string;
}

export const AccordionTabs: React.FC<AccordionTabsProps> = ({
  items,
  defaultActiveTab,
  activeTab: controlledActiveTab,
  onChange,
  allowMultiple = false,
  variant = 'default',
  className = '',
}) => {
  // Initialize activeTab state (can be string or array)
  const [activeTabs, setActiveTabs] = useState<string[]>(() => {
    if (controlledActiveTab) return [controlledActiveTab];
    if (defaultActiveTab) return [defaultActiveTab];
    return [];
  });
  
  // Update activeTab when controlledActiveTab changes
  useEffect(() => {
    if (controlledActiveTab !== undefined) {
      setActiveTabs([controlledActiveTab]);
    }
  }, [controlledActiveTab]);
  
  // Handle tab toggle
  const handleTabToggle = (tabId: string, disabled: boolean = false) => {
    if (disabled) return;
    
    setActiveTabs(prev => {
      const isActive = prev.includes(tabId);
      
      if (isActive) {
        // If this tab is active, remove it (unless it's the only one and allowMultiple is false)
        if (prev.length === 1 && !allowMultiple) {
          return prev;
        }
        return prev.filter(id => id !== tabId);
      } else {
        // If this tab is not active, add it
        if (allowMultiple) {
          return [...prev, tabId];
        } else {
          // If not allowMultiple, replace existing tab
          return [tabId];
        }
      }
    });
    
    if (onChange) {
      onChange(tabId);
    }
  };
  
  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'transform rotate-[-0.5deg]';
      default:
        return '';
    }
  };
  
  return (
    <div className={`accordion-tabs ${className}`}>
      <div className="space-y-2">
        {items.map((item) => {
          const isActive = activeTabs.includes(item.id);
          
          return (
            <div 
              key={item.id}
              className={`
                border-2 border-black 
                ${getVariantStyles()}
              `}
            >
              <button
                onClick={() => handleTabToggle(item.id, item.disabled)}
                className={`
                  w-full text-left font-mono font-medium p-3
                  flex justify-between items-center
                  ${item.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-100'}
                  ${isActive ? 'bg-gray-100 font-bold' : ''}
                  transition-colors duration-200
                `}
                disabled={item.disabled}
                aria-expanded={isActive}
              >
                {item.label}
                <span>{isActive ? '−' : '+'}</span>
              </button>
              
              {isActive && (
                <div className="p-3 border-t-2 border-black">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Example component
export const TabsExamples: React.FC = () => {
  // Sample tab items
  const tabItems: TabItem[] = [
    {
      id: 'tab1',
      label: 'First Tab',
      content: (
        <div>
          <h3 className="text-lg font-mono font-bold mb-2">First Tab Content</h3>
          <p>This is the content for the first tab. You can put any content here.</p>
        </div>
      )
    },
    {
      id: 'tab2',
      label: 'Second Tab',
      content: (
        <div>
          <h3 className="text-lg font-mono font-bold mb-2">Second Tab Content</h3>
          <p>This is the content for the second tab. Different content appears based on which tab is active.</p>
        </div>
      )
    },
    {
      id: 'tab3',
      label: 'Third Tab',
      content: (
        <div>
          <h3 className="text-lg font-mono font-bold mb-2">Third Tab Content</h3>
          <p>This is the content for the third tab, showing yet another content example.</p>
        </div>
      )
    },
    {
      id: 'tab4',
      label: 'Disabled Tab',
      content: (
        <div>
          <h3 className="text-lg font-mono font-bold mb-2">Disabled Tab Content</h3>
          <p>This content shouldn't be visible since the tab is disabled.</p>
        </div>
      ),
      disabled: true
    }
  ];
  
  // For example purposes
  const [activeTab, setActiveTab] = useState('tab1');
  
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Tab Components</h2>
      <p className="mb-8 font-sans">
        Tab UI components with brutalist styling. Includes standard tabs, folder tabs, card tabs, and accordion tabs.
      </p>
      
      <div className="space-y-12">
        {/* Default Tabs */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Default Tabs</h3>
          <Tabs 
            items={tabItems} 
            defaultActiveTab="tab1" 
          />
        </div>
        
        {/* Bordered Tabs */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Bordered Tabs</h3>
          <Tabs 
            items={tabItems}
            defaultActiveTab="tab2"
            variant="bordered"
          />
        </div>
        
        {/* Cutout Tabs */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Cutout Tabs</h3>
          <Tabs 
            items={tabItems}
            defaultActiveTab="tab3"
            variant="cutout"
          />
        </div>
        
        {/* Folder Tabs */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Folder Tabs</h3>
          <Tabs 
            items={tabItems.slice(0, 3)}
            defaultActiveTab="tab1"
            variant="folder"
          />
        </div>
        
        {/* Controlled Tabs */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Controlled Tabs with External Buttons</h3>
          <div className="mb-4 space-x-2">
            {tabItems.slice(0, 3).map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  px-4 py-2 border-2 border-black font-mono
                  ${activeTab === item.id ? 'bg-black text-white' : 'hover:bg-gray-100'}
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
          <Tabs 
            items={tabItems}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="bordered"
          />
        </div>
        
        {/* Vertical Tabs */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Vertical Tabs</h3>
          <div className="flex">
            <div className="w-1/3">
              <Tabs 
                items={tabItems}
                defaultActiveTab="tab1"
                orientation="vertical"
                variant="bordered"
              />
            </div>
          </div>
        </div>
        
        {/* Card Tabs */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Card Tabs</h3>
          <CardTabs 
            items={tabItems}
            defaultActiveTab="tab1"
            variant="bordered"
          />
        </div>
        
        {/* Accordion Tabs */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Accordion Tabs</h3>
          <AccordionTabs 
            items={tabItems.slice(0, 3)}
            defaultActiveTab="tab1"
            variant="bordered"
          />
        </div>
        
        {/* Multi-Accordion Tabs */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Multi-Accordion Tabs</h3>
          <AccordionTabs 
            items={tabItems.slice(0, 3)}
            defaultActiveTab="tab1"
            allowMultiple
            variant="cutout"
          />
        </div>
      </div>
    </div>
  );
}; 