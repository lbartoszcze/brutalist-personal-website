import React, { useState } from 'react';

// Panel item interface
interface PanelItem {
  /**
   * Unique ID for the panel item
   */
  id: string;
  /**
   * Header or title of the panel
   */
  header: React.ReactNode;
  /**
   * Content of the panel
   */
  content: React.ReactNode;
  /**
   * Optional icon to display in the header
   */
  icon?: React.ReactNode;
  /**
   * Optional actions to display in the header
   */
  actions?: React.ReactNode;
  /**
   * Whether the panel is disabled
   */
  disabled?: boolean;
}

// Base panel props
interface ActionPanelsProps {
  /**
   * Array of panel items
   */
  items: PanelItem[];
  /**
   * Variant style of the panels
   */
  variant?: 'default' | 'bordered' | 'cutout' | 'minimal';
  /**
   * Size of the panels
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Custom class name
   */
  className?: string;
}

// Expandable panels props
interface ExpandablePanelsProps extends ActionPanelsProps {
  /**
   * Default expanded panel IDs
   */
  defaultExpandedIds?: string[];
  /**
   * Currently expanded panel IDs (controlled component)
   */
  expandedIds?: string[];
  /**
   * Change handler for expanded panels
   */
  onExpandChange?: (expandedIds: string[]) => void;
  /**
   * Whether multiple panels can be expanded at once
   */
  allowMultiple?: boolean;
}

// Draggable panels props
interface DraggablePanelsProps extends ActionPanelsProps {
  /**
   * Change handler for panel order
   */
  onOrderChange?: (itemIds: string[]) => void;
}

// Tabs panels props
interface TabPanelsProps extends ActionPanelsProps {
  /**
   * Default active tab ID
   */
  defaultActiveId?: string;
  /**
   * Currently active tab ID (controlled component)
   */
  activeId?: string;
  /**
   * Change handler for active tab
   */
  onActiveChange?: (activeId: string) => void;
  /**
   * Tab position
   */
  tabPosition?: 'top' | 'left';
}

/**
 * Base ActionPanels component to display a list of panels
 */
export const ActionPanels: React.FC<ActionPanelsProps> = ({
  items,
  variant = 'default',
  size = 'medium',
  className = '',
}) => {
  // Get panel container styles based on variant
  const getPanelContainerStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      case 'minimal':
        return 'border border-gray-200';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Get panel header styles based on size
  const getPanelHeaderStyles = () => {
    const baseStyles = 'font-mono font-bold flex justify-between items-center w-full';
    
    switch (size) {
      case 'small':
        return `${baseStyles} text-sm p-2`;
      case 'large':
        return `${baseStyles} text-lg p-4`;
      case 'medium':
      default:
        return `${baseStyles} text-base p-3`;
    }
  };
  
  // Get panel content styles based on size
  const getPanelContentStyles = () => {
    switch (size) {
      case 'small':
        return 'p-2';
      case 'large':
        return 'p-4';
      case 'medium':
      default:
        return 'p-3';
    }
  };
  
  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item) => (
        <div 
          key={item.id}
          className={`
            ${getPanelContainerStyles()}
            ${item.disabled ? 'opacity-60 cursor-not-allowed' : ''}
            bg-white
          `}
        >
          <div className={getPanelHeaderStyles()}>
            <div className="flex items-center">
              {item.icon && <span className="mr-2">{item.icon}</span>}
              <span>{item.header}</span>
            </div>
            {item.actions && <div>{item.actions}</div>}
          </div>
          
          <div className={`${getPanelContentStyles()} border-t-2 border-black`}>
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * ExpandablePanels component that allows expanding/collapsing panels
 */
export const ExpandablePanels: React.FC<ExpandablePanelsProps> = ({
  items,
  variant = 'default',
  size = 'medium',
  className = '',
  defaultExpandedIds = [],
  expandedIds,
  onExpandChange,
  allowMultiple = false,
}) => {
  // State for uncontrolled component
  const [localExpandedIds, setLocalExpandedIds] = useState<string[]>(defaultExpandedIds);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = expandedIds !== undefined;
  const currentExpandedIds = isControlled ? expandedIds : localExpandedIds;
  
  // Handle toggle panel
  const togglePanel = (id: string) => {
    let newExpandedIds: string[];
    
    if (currentExpandedIds.includes(id)) {
      // Remove the panel from expanded list
      newExpandedIds = currentExpandedIds.filter(itemId => itemId !== id);
    } else {
      if (allowMultiple) {
        // Add the panel to expanded list
        newExpandedIds = [...currentExpandedIds, id];
      } else {
        // Replace the expanded list with only this panel
        newExpandedIds = [id];
      }
    }
    
    if (!isControlled) {
      setLocalExpandedIds(newExpandedIds);
    }
    
    if (onExpandChange) {
      onExpandChange(newExpandedIds);
    }
  };
  
  // Get panel container styles based on variant
  const getPanelContainerStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      case 'minimal':
        return 'border border-gray-200';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Get panel header styles based on size
  const getPanelHeaderStyles = () => {
    const baseStyles = 'font-mono font-bold flex justify-between items-center w-full cursor-pointer';
    
    switch (size) {
      case 'small':
        return `${baseStyles} text-sm p-2`;
      case 'large':
        return `${baseStyles} text-lg p-4`;
      case 'medium':
      default:
        return `${baseStyles} text-base p-3`;
    }
  };
  
  // Get panel content styles based on size
  const getPanelContentStyles = () => {
    switch (size) {
      case 'small':
        return 'p-2';
      case 'large':
        return 'p-4';
      case 'medium':
      default:
        return 'p-3';
    }
  };
  
  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item) => {
        const isExpanded = currentExpandedIds.includes(item.id);
        
        return (
          <div 
            key={item.id}
            className={`
              ${getPanelContainerStyles()}
              ${item.disabled ? 'opacity-60 cursor-not-allowed' : ''}
              bg-white
            `}
          >
            <div 
              className={getPanelHeaderStyles()}
              onClick={() => {
                if (!item.disabled) {
                  togglePanel(item.id);
                }
              }}
            >
              <div className="flex items-center">
                {item.icon && <span className="mr-2">{item.icon}</span>}
                <span>{item.header}</span>
              </div>
              
              <div className="flex items-center">
                {item.actions && <div className="mr-2">{item.actions}</div>}
                <span className="transform transition-transform duration-200 ml-2">
                  {isExpanded ? '▲' : '▼'}
                </span>
              </div>
            </div>
            
            {isExpanded && (
              <div className={`${getPanelContentStyles()} border-t-2 border-black`}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/**
 * DraggablePanels component that allows reordering panels via drag and drop
 */
export const DraggablePanels: React.FC<DraggablePanelsProps> = ({
  items,
  variant = 'default',
  size = 'medium',
  className = '',
  onOrderChange,
}) => {
  // State for tracking the current order
  const [orderedItems, setOrderedItems] = useState<PanelItem[]>(items);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  
  // Handle drag start
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setDraggedItemId(id);
    e.dataTransfer.effectAllowed = 'move';
    // Need to set some data for Firefox
    e.dataTransfer.setData('text/plain', id);
    
    // Add a class to the dragged item
    const element = e.currentTarget;
    setTimeout(() => {
      element.classList.add('opacity-50');
    }, 0);
  };
  
  // Handle drag end
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggedItemId(null);
    e.currentTarget.classList.remove('opacity-50');
  };
  
  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    
    if (draggedItemId === targetId) {
      return;
    }
    
    const draggedIndex = orderedItems.findIndex(item => item.id === draggedItemId);
    const targetIndex = orderedItems.findIndex(item => item.id === targetId);
    
    if (draggedIndex === -1 || targetIndex === -1) {
      return;
    }
    
    // Create a new array with the reordered items
    const newOrderedItems = [...orderedItems];
    const [draggedItem] = newOrderedItems.splice(draggedIndex, 1);
    newOrderedItems.splice(targetIndex, 0, draggedItem);
    
    setOrderedItems(newOrderedItems);
    
    if (onOrderChange) {
      onOrderChange(newOrderedItems.map(item => item.id));
    }
  };
  
  // Get panel container styles based on variant
  const getPanelContainerStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      case 'minimal':
        return 'border border-gray-200';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Get panel header styles based on size
  const getPanelHeaderStyles = () => {
    const baseStyles = 'font-mono font-bold flex justify-between items-center w-full cursor-grab';
    
    switch (size) {
      case 'small':
        return `${baseStyles} text-sm p-2`;
      case 'large':
        return `${baseStyles} text-lg p-4`;
      case 'medium':
      default:
        return `${baseStyles} text-base p-3`;
    }
  };
  
  // Get panel content styles based on size
  const getPanelContentStyles = () => {
    switch (size) {
      case 'small':
        return 'p-2';
      case 'large':
        return 'p-4';
      case 'medium':
      default:
        return 'p-3';
    }
  };
  
  return (
    <div className={`space-y-4 ${className}`}>
      {orderedItems.map((item) => (
        <div 
          key={item.id}
          draggable={!item.disabled}
          onDragStart={(e) => handleDragStart(e, item.id)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, item.id)}
          className={`
            ${getPanelContainerStyles()}
            ${item.disabled ? 'opacity-60 cursor-not-allowed' : ''}
            bg-white transition-shadow duration-200
            ${draggedItemId === item.id ? 'shadow-lg' : ''}
          `}
        >
          <div className={getPanelHeaderStyles()}>
            <div className="flex items-center">
              <span className="mr-2">☰</span>
              {item.icon && <span className="mr-2">{item.icon}</span>}
              <span>{item.header}</span>
            </div>
            {item.actions && <div>{item.actions}</div>}
          </div>
          
          <div className={`${getPanelContentStyles()} border-t-2 border-black`}>
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * TabPanels component that displays panels as tabs
 */
export const TabPanels: React.FC<TabPanelsProps> = ({
  items,
  variant = 'default',
  size = 'medium',
  className = '',
  defaultActiveId = '',
  activeId,
  onActiveChange,
  tabPosition = 'top',
}) => {
  // State for uncontrolled component
  const [localActiveId, setLocalActiveId] = useState<string>(
    defaultActiveId || (items.length > 0 ? items[0].id : '')
  );
  
  // Determine if component is controlled or uncontrolled
  const isControlled = activeId !== undefined;
  const currentActiveId = isControlled ? activeId : localActiveId;
  
  // Handle tab change
  const handleTabChange = (id: string) => {
    if (!isControlled) {
      setLocalActiveId(id);
    }
    
    if (onActiveChange) {
      onActiveChange(id);
    }
  };
  
  // Get tabs container styles based on variant
  const getTabsContainerStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      case 'minimal':
        return 'border border-gray-200';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Get tab styles based on size
  const getTabStyles = (isActive: boolean) => {
    const baseStyles = 'font-mono font-bold cursor-pointer transition-colors';
    const activeStyles = isActive ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100';
    
    switch (size) {
      case 'small':
        return `${baseStyles} ${activeStyles} text-sm py-1 px-2`;
      case 'large':
        return `${baseStyles} ${activeStyles} text-lg py-2 px-4`;
      case 'medium':
      default:
        return `${baseStyles} ${activeStyles} text-base py-1.5 px-3`;
    }
  };
  
  // Get content styles based on size
  const getContentStyles = () => {
    switch (size) {
      case 'small':
        return 'p-2';
      case 'large':
        return 'p-4';
      case 'medium':
      default:
        return 'p-3';
    }
  };
  
  // Get active panel content
  const activePanel = items.find(item => item.id === currentActiveId);
  
  // Render vertical layout (tabs on left)
  if (tabPosition === 'left') {
    return (
      <div className={`flex ${className}`}>
        {/* Tabs on left */}
        <div className="pr-4 space-y-2 min-w-[150px]">
          {items.map(item => (
            <div
              key={item.id}
              className={`
                ${getTabStyles(item.id === currentActiveId)}
                ${item.disabled ? 'opacity-60 cursor-not-allowed' : ''}
                flex items-center
              `}
              onClick={() => {
                if (!item.disabled) {
                  handleTabChange(item.id);
                }
              }}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              <span>{item.header}</span>
            </div>
          ))}
        </div>
        
        {/* Content area */}
        <div className={`flex-1 ${getTabsContainerStyles()}`}>
          <div className={getContentStyles()}>
            {activePanel ? activePanel.content : null}
          </div>
        </div>
      </div>
    );
  }
  
  // Render horizontal layout (tabs on top)
  return (
    <div className={className}>
      {/* Tabs on top */}
      <div className="flex border-b-2 border-black mb-4">
        {items.map(item => (
          <div
            key={item.id}
            className={`
              ${getTabStyles(item.id === currentActiveId)}
              ${item.disabled ? 'opacity-60 cursor-not-allowed' : ''}
              ${item.id === currentActiveId ? 'border-b-2 border-black -mb-[2px]' : ''}
            `}
            onClick={() => {
              if (!item.disabled) {
                handleTabChange(item.id);
              }
            }}
          >
            <div className="flex items-center">
              {item.icon && <span className="mr-2">{item.icon}</span>}
              <span>{item.header}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Content area */}
      <div className={getTabsContainerStyles()}>
        <div className={getContentStyles()}>
          {activePanel ? activePanel.content : null}
        </div>
      </div>
    </div>
  );
};

// Example implementation
export const ActionPanelsExamples: React.FC = () => {
  // State for examples
  const [expandedIds, setExpandedIds] = useState<string[]>(['panel1']);
  const [activeTabId, setActiveTabId] = useState<string>('tab1');
  
  // Sample panel items
  const basicItems = [
    {
      id: 'panel1',
      header: 'Panel 1',
      content: (
        <div>
          <p className="mb-2">This is the content of panel 1.</p>
          <button className="border-2 border-black px-3 py-1 font-mono hover:bg-black hover:text-white transition-colors">
            Action
          </button>
        </div>
      ),
      icon: <span className="text-xl">📝</span>,
      actions: (
        <button className="border border-black px-2 py-1 text-xs font-mono">
          Edit
        </button>
      ),
    },
    {
      id: 'panel2',
      header: 'Panel 2',
      content: 'This is the content of panel 2.',
      icon: <span className="text-xl">📊</span>,
    },
    {
      id: 'panel3',
      header: 'Panel 3 (Disabled)',
      content: 'This is the content of panel 3.',
      disabled: true,
    },
  ];
  
  // Sample expandable panel items
  const expandableItems = [
    {
      id: 'panel1',
      header: 'Section 1',
      content: (
        <div>
          <p className="mb-2">This section contains important information about the product.</p>
          <p>You can add more details here.</p>
        </div>
      ),
    },
    {
      id: 'panel2',
      header: 'Section 2',
      content: 'This section contains additional information.',
    },
    {
      id: 'panel3',
      header: 'Section 3',
      content: 'This section contains even more information.',
    },
  ];
  
  // Sample draggable panel items
  const draggableItems = [
    {
      id: 'panel1',
      header: 'Task 1',
      content: 'Complete the user interface design.',
      icon: <span className="text-xl">1️⃣</span>,
    },
    {
      id: 'panel2',
      header: 'Task 2',
      content: 'Implement the front-end functionality.',
      icon: <span className="text-xl">2️⃣</span>,
    },
    {
      id: 'panel3',
      header: 'Task 3',
      content: 'Test the application with users.',
      icon: <span className="text-xl">3️⃣</span>,
    },
  ];
  
  // Sample tab panel items
  const tabItems = [
    {
      id: 'tab1',
      header: 'Details',
      content: (
        <div>
          <h3 className="text-lg font-mono font-bold mb-2">Product Details</h3>
          <p>This tab shows detailed information about the product.</p>
        </div>
      ),
      icon: <span className="text-sm">📋</span>,
    },
    {
      id: 'tab2',
      header: 'Specifications',
      content: (
        <div>
          <h3 className="text-lg font-mono font-bold mb-2">Product Specifications</h3>
          <ul className="list-disc list-inside">
            <li>Specification 1</li>
            <li>Specification 2</li>
            <li>Specification 3</li>
          </ul>
        </div>
      ),
      icon: <span className="text-sm">🔧</span>,
    },
    {
      id: 'tab3',
      header: 'Reviews',
      content: (
        <div>
          <h3 className="text-lg font-mono font-bold mb-2">Product Reviews</h3>
          <p>This tab shows reviews from customers.</p>
        </div>
      ),
      icon: <span className="text-sm">⭐</span>,
    },
  ];
  
  return (
    <div className="p-6 max-w-6xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Action Panels Components</h2>
      <p className="mb-8 font-sans">
        Panel components with brutalist styling for organizing content and actions.
      </p>
      
      <div className="space-y-16">
        {/* Basic Panels */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Panels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Default Variant</h4>
              <ActionPanels
                items={basicItems}
                variant="default"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Bordered Variant</h4>
              <ActionPanels
                items={basicItems}
                variant="bordered"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Cutout Variant</h4>
              <ActionPanels
                items={basicItems}
                variant="cutout"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Minimal Variant</h4>
              <ActionPanels
                items={basicItems}
                variant="minimal"
              />
            </div>
          </div>
        </div>
        
        {/* Panel Sizes */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Panel Sizes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Small Size</h4>
              <ActionPanels
                items={basicItems.slice(0, 2)}
                variant="bordered"
                size="small"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Medium Size</h4>
              <ActionPanels
                items={basicItems.slice(0, 2)}
                variant="bordered"
                size="medium"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Large Size</h4>
              <ActionPanels
                items={basicItems.slice(0, 2)}
                variant="bordered"
                size="large"
              />
            </div>
          </div>
        </div>
        
        {/* Expandable Panels */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Expandable Panels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Single Expansion</h4>
              <ExpandablePanels
                items={expandableItems}
                variant="bordered"
                expandedIds={expandedIds}
                onExpandChange={setExpandedIds}
                allowMultiple={false}
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Multiple Expansion</h4>
              <ExpandablePanels
                items={expandableItems}
                variant="bordered"
                expandedIds={expandedIds}
                onExpandChange={setExpandedIds}
                allowMultiple={true}
              />
            </div>
          </div>
        </div>
        
        {/* Draggable Panels */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Draggable Panels</h3>
          <p className="mb-4 font-sans italic">Drag panels to reorder them</p>
          <DraggablePanels
            items={draggableItems}
            variant="bordered"
            onOrderChange={(ids) => console.log('New order:', ids)}
          />
        </div>
        
        {/* Tab Panels */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Tab Panels</h3>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Tabs on Top</h4>
              <TabPanels
                items={tabItems}
                variant="bordered"
                activeId={activeTabId}
                onActiveChange={setActiveTabId}
                tabPosition="top"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Tabs on Left</h4>
              <TabPanels
                items={tabItems}
                variant="bordered"
                activeId={activeTabId}
                onActiveChange={setActiveTabId}
                tabPosition="left"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 