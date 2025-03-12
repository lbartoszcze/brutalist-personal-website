import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Notification item props
interface NotificationItemProps {
  /**
   * Unique identifier for the notification
   */
  id: string;
  /**
   * Title of the notification
   */
  title?: React.ReactNode;
  /**
   * Content of the notification
   */
  content: React.ReactNode;
  /**
   * Type of notification
   */
  type?: 'info' | 'success' | 'warning' | 'error';
  /**
   * Optional icon to display
   */
  icon?: React.ReactNode;
  /**
   * Whether to show the icon
   */
  showIcon?: boolean;
  /**
   * Whether to show the close button
   */
  showCloseButton?: boolean;
  /**
   * Whether the notification should auto-dismiss
   */
  autoDismiss?: boolean;
  /**
   * Duration in milliseconds before auto-dismissing
   */
  autoDismissDuration?: number;
  /**
   * On close callback
   */
  onClose?: (id: string) => void;
  /**
   * On click callback
   */
  onClick?: (id: string) => void;
  /**
   * Optional link for the notification
   */
  link?: string;
  /**
   * Creation date of the notification
   */
  createdAt?: Date;
  /**
   * Whether the notification is read
   */
  isRead?: boolean;
  /**
   * Variant of the notification
   */
  variant?: 'default' | 'bordered' | 'cutout';
  /**
   * Custom class name
   */
  className?: string;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  title,
  content,
  type = 'info',
  icon,
  showIcon = true,
  showCloseButton = true,
  autoDismiss = false,
  autoDismissDuration = 5000,
  onClose,
  onClick,
  link,
  createdAt,
  isRead = false,
  variant = 'default',
  className = '',
}) => {
  // Auto-dismiss timer
  useEffect(() => {
    if (autoDismiss && onClose) {
      const timer = setTimeout(() => {
        onClose(id);
      }, autoDismissDuration);
      
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, autoDismissDuration, id, onClose]);
  
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
  
  // Get type-based styles
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-600';
      case 'warning':
        return 'bg-yellow-50 border-yellow-600';
      case 'error':
        return 'bg-red-50 border-red-600';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-600';
    }
  };
  
  // Get type-based icon
  const getTypeIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'success':
        return <span className="text-green-600">✓</span>;
      case 'warning':
        return <span className="text-yellow-600">⚠️</span>;
      case 'error':
        return <span className="text-red-600">⚠️</span>;
      case 'info':
      default:
        return <span className="text-blue-600">ℹ</span>;
    }
  };
  
  // Format the notification time
  const getTimeLabel = () => {
    if (!createdAt) return null;
    
    const now = new Date();
    const diff = now.getTime() - createdAt.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };
  
  // Click handler
  const handleClick = () => {
    if (onClick) onClick(id);
    if (link) window.location.href = link;
  };
  
  // Render the notification
  const content_wrapper = (
    <div
      className={`
        ${getVariantStyles()}
        ${getTypeStyles()}
        p-4 relative
        ${!isRead ? 'font-semibold' : ''}
        ${onClick || link ? 'cursor-pointer hover:opacity-90' : ''}
        ${className}
      `}
      onClick={handleClick}
      role="alert"
    >
      <div className="flex">
        {/* Icon */}
        {showIcon && (
          <div className="mr-3 text-lg flex-shrink-0">
            {getTypeIcon()}
          </div>
        )}
        
        {/* Content */}
        <div className="flex-grow">
          {/* Title and timestamp */}
          {(title || createdAt) && (
            <div className="flex justify-between items-start mb-1">
              {title && (
                <div className="font-mono font-bold">
                  {title}
                </div>
              )}
              
              {createdAt && (
                <div className="text-xs text-gray-500 ml-2 flex-shrink-0">
                  {getTimeLabel()}
                </div>
              )}
            </div>
          )}
          
          {/* Message */}
          <div className="text-sm">
            {content}
          </div>
        </div>
        
        {/* Close button */}
        {showCloseButton && (
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
            onClick={(e) => {
              e.stopPropagation();
              if (onClose) onClose(id);
            }}
            aria-label="Close notification"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
  
  // If it has a link, wrap in an anchor
  if (link) {
    return (
      <a 
        href={link} 
        className="block no-underline" 
        onClick={(e) => e.preventDefault()}
      >
        {content_wrapper}
      </a>
    );
  }
  
  return content_wrapper;
};

// Notification center props
interface NotificationCenterProps {
  /**
   * Initial notifications to display
   */
  notifications?: NotificationItemProps[];
  /**
   * Maximum number of notifications to show
   */
  maxNotifications?: number;
  /**
   * Whether notifications should auto-dismiss
   */
  autoDismiss?: boolean;
  /**
   * Duration in milliseconds before auto-dismissing
   */
  autoDismissDuration?: number;
  /**
   * Position of the notification center
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  /**
   * Spacing between notifications
   */
  spacing?: 'none' | 'small' | 'medium' | 'large';
  /**
   * Variant to apply to all notifications
   */
  variant?: 'default' | 'bordered' | 'cutout';
  /**
   * Z-index for the notification center
   */
  zIndex?: number;
  /**
   * Custom class name
   */
  className?: string;
}

// Notification manager context
interface NotificationContextType {
  notifications: NotificationItemProps[];
  addNotification: (notification: Omit<NotificationItemProps, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export const NotificationContext = React.createContext<NotificationContextType | undefined>(undefined);

// Notification provider component
interface NotificationProviderProps {
  children: React.ReactNode;
  defaultNotifications?: NotificationItemProps[];
  maxNotifications?: number;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  defaultNotifications = [],
  maxNotifications = 100,
}) => {
  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItemProps[]>(defaultNotifications);
  
  // Add a new notification
  const addNotification = (notification: Omit<NotificationItemProps, 'id'>): string => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newNotification = { ...notification, id, createdAt: notification.createdAt || new Date(), isRead: false };
    
    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      return updated.slice(0, maxNotifications);
    });
    
    return id;
  };
  
  // Remove a notification
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };
  
  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  
  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };
  
  const contextValue: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    markAsRead,
    markAllAsRead,
  };
  
  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook to use the notification context
export const useNotifications = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Notification center component
export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications = [],
  maxNotifications = 5,
  autoDismiss = true,
  autoDismissDuration = 5000,
  position = 'top-right',
  spacing = 'medium',
  variant = 'bordered',
  zIndex = 50,
  className = '',
}) => {
  // State for component mounting
  const [isMounted, setIsMounted] = useState(false);
  
  // Mount effect
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Get position styles
  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-4 right-4 flex-col-reverse';
      case 'bottom-left':
        return 'bottom-4 left-4 flex-col-reverse';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2 flex-col-reverse';
      case 'top-right':
      default:
        return 'top-4 right-4';
    }
  };
  
  // Get spacing styles
  const getSpacingStyles = () => {
    switch (spacing) {
      case 'none':
        return 'space-y-0';
      case 'small':
        return 'space-y-2';
      case 'large':
        return 'space-y-6';
      case 'medium':
      default:
        return 'space-y-4';
    }
  };
  
  // Don't render if not mounted
  if (!isMounted) return null;
  
  // Limit the number of notifications to display
  const visibleNotifications = notifications.slice(0, maxNotifications);
  
  return createPortal(
    <div 
      className={`fixed ${getPositionStyles()} z-${zIndex} flex flex-col ${getSpacingStyles()} w-80 ${className}`}
      role="log"
      aria-live="polite"
    >
      {visibleNotifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          {...notification}
          variant={notification.variant || variant}
          autoDismiss={notification.autoDismiss !== undefined ? notification.autoDismiss : autoDismiss}
          autoDismissDuration={notification.autoDismissDuration || autoDismissDuration}
        />
      ))}
    </div>,
    document.body
  );
};

// Notification bell component
interface NotificationBellProps {
  /**
   * Number of unread notifications
   */
  count?: number;
  /**
   * Maximum count to display
   */
  maxCount?: number;
  /**
   * Whether to show zero count
   */
  showZeroCount?: boolean;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Custom icon
   */
  icon?: React.ReactNode;
  /**
   * Variant of the notification bell
   */
  variant?: 'default' | 'bordered' | 'cutout';
  /**
   * Size of the notification bell
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Custom class name
   */
  className?: string;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({
  count = 0,
  maxCount = 99,
  showZeroCount = false,
  onClick,
  icon,
  variant = 'default',
  size = 'medium',
  className = '',
}) => {
  // Determine the display count
  const displayCount = count > maxCount ? `${maxCount}+` : count;
  
  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return '';
    }
  };
  
  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'w-8 h-8 text-sm';
      case 'large':
        return 'w-12 h-12 text-xl';
      case 'medium':
      default:
        return 'w-10 h-10 text-base';
    }
  };
  
  return (
    <button
      className={`
        relative rounded-full flex items-center justify-center
        hover:bg-gray-100 focus:outline-none
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${className}
      `}
      onClick={onClick}
      aria-label={`Notifications: ${count} unread`}
    >
      {/* Bell icon */}
      {icon || (
        <span role="img" aria-hidden="true" className="text-xl">
          🔔
        </span>
      )}
      
      {/* Notification count */}
      {(count > 0 || showZeroCount) && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-2 py-1 font-mono">
          {displayCount}
        </span>
      )}
    </button>
  );
};

// Complete notification interface
interface NotificationDropdownProps {
  /**
   * Notifications to display
   */
  notifications?: NotificationItemProps[];
  /**
   * Whether the dropdown is open
   */
  isOpen?: boolean;
  /**
   * On toggle function
   */
  onToggle?: () => void;
  /**
   * On click notification
   */
  onClickNotification?: (id: string) => void;
  /**
   * On remove notification
   */
  onRemoveNotification?: (id: string) => void;
  /**
   * On clear all notifications
   */
  onClearAll?: () => void;
  /**
   * On mark all as read
   */
  onMarkAllAsRead?: () => void;
  /**
   * Maximum number of notifications to display
   */
  maxNotifications?: number;
  /**
   * Empty state message
   */
  emptyMessage?: React.ReactNode;
  /**
   * Header title
   */
  title?: React.ReactNode;
  /**
   * Notification bell props
   */
  bellProps?: Omit<NotificationBellProps, 'count' | 'onClick'>;
  /**
   * Variant of the dropdown
   */
  variant?: 'default' | 'bordered' | 'cutout';
  /**
   * Width of the dropdown
   */
  width?: string | number;
  /**
   * Position of the dropdown
   */
  position?: 'left' | 'right' | 'center';
  /**
   * Custom class name
   */
  className?: string;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications = [],
  isOpen = false,
  onToggle,
  onClickNotification,
  onRemoveNotification,
  onClearAll,
  onMarkAllAsRead,
  maxNotifications = 5,
  emptyMessage = 'No new notifications',
  title = 'Notifications',
  bellProps,
  variant = 'bordered',
  width = 320,
  position = 'right',
  className = '',
}) => {
  // Ref for detecting outside clicks
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isOpen) {
        onToggle?.();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, onToggle]);
  
  // Count unread notifications
  const unreadCount = notifications.filter(notif => !notif.isRead).length;
  
  // Get variant styles
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
  
  // Get position styles
  const getPositionStyles = () => {
    switch (position) {
      case 'left':
        return 'left-0';
      case 'center':
        return 'left-1/2 transform -translate-x-1/2';
      case 'right':
      default:
        return 'right-0';
    }
  };
  
  // Limit the number of notifications to display
  const visibleNotifications = notifications.slice(0, maxNotifications);
  const hasMoreNotifications = notifications.length > maxNotifications;
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Notification bell */}
      <NotificationBell
        count={unreadCount}
        onClick={onToggle}
        variant={bellProps?.variant || variant}
        size={bellProps?.size || 'medium'}
        {...bellProps}
      />
      
      {/* Dropdown */}
      {isOpen && (
        <div 
          className={`
            absolute top-full mt-2 ${getPositionStyles()}
            ${getVariantStyles()} bg-white z-50
          `}
          style={{ width: typeof width === 'number' ? `${width}px` : width }}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="font-mono font-bold text-lg">{title}</h3>
            
            <div className="flex space-x-2">
              {onMarkAllAsRead && (
                <button
                  className="text-sm font-mono hover:underline"
                  onClick={onMarkAllAsRead}
                  disabled={unreadCount === 0}
                >
                  Mark all as read
                </button>
              )}
              
              {onClearAll && (
                <button
                  className="text-sm font-mono hover:underline"
                  onClick={onClearAll}
                  disabled={notifications.length === 0}
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
          
          {/* Notification list */}
          <div className="max-h-96 overflow-y-auto">
            {visibleNotifications.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {visibleNotifications.map((notification) => (
                  <div key={notification.id} className="p-2">
                    <NotificationItem
                      {...notification}
                      variant="default"
                      onClick={(id) => onClickNotification?.(id)}
                      onClose={(id) => onRemoveNotification?.(id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                {emptyMessage}
              </div>
            )}
          </div>
          
          {/* Footer with more count */}
          {hasMoreNotifications && (
            <div className="p-3 text-center text-sm font-mono border-t border-gray-200">
              + {notifications.length - maxNotifications} more notifications
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Example implementations
export const NotificationExamples: React.FC = () => {
  // State for the examples
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItemProps[]>([
    {
      id: '1',
      title: 'New Message',
      content: 'You have received a new message from John Doe',
      type: 'info',
      createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      isRead: false,
    },
    {
      id: '2',
      title: 'Task Completed',
      content: 'Your task "Update documentation" has been completed',
      type: 'success',
      createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: true,
    },
    {
      id: '3',
      title: 'System Warning',
      content: 'Disk space is running low. Please clean up some files.',
      type: 'warning',
      createdAt: new Date(Date.now() - 120 * 60 * 1000), // 2 hours ago
      isRead: false,
    },
    {
      id: '4',
      title: 'Error Detected',
      content: 'Failed to upload file. Please try again later.',
      type: 'error',
      createdAt: new Date(Date.now() - 240 * 60 * 1000), // 4 hours ago
      isRead: false,
    },
    {
      id: '5',
      title: 'New Comment',
      content: 'Sarah left a comment on your post',
      type: 'info',
      createdAt: new Date(Date.now() - 1440 * 60 * 1000), // 1 day ago
      isRead: true,
    },
  ]);
  
  // Add a notification
  const addNotification = (type: 'info' | 'success' | 'warning' | 'error') => {
    const titles = {
      info: 'New Notification',
      success: 'Success!',
      warning: 'Warning',
      error: 'Error',
    };
    
    const contents = {
      info: 'This is an informational notification.',
      success: 'Operation completed successfully!',
      warning: 'Please be aware of this warning.',
      error: 'An error has occurred. Please try again.',
    };
    
    const newNotification: NotificationItemProps = {
      id: `${Date.now()}`,
      title: titles[type],
      content: contents[type],
      type,
      createdAt: new Date(),
      isRead: false,
    };
    
    setNotifications([newNotification, ...notifications]);
  };
  
  // Handle notification click
  const handleNotificationClick = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };
  
  // Handle notification removal
  const handleRemoveNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };
  
  // Clear all notifications
  const handleClearAll = () => {
    setNotifications([]);
  };
  
  return (
    <div className="p-6 max-w-6xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Notification Components</h2>
      <p className="mb-8 font-sans">
        Notification components with brutalist styling for user feedback and alerts.
      </p>
      
      <div className="space-y-16">
        {/* Individual Notifications */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Notification Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-mono font-bold mb-2">Info Notification</h4>
              <NotificationItem
                id="example-info"
                title="Information"
                content="This is an informational notification."
                type="info"
                variant="bordered"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Success Notification</h4>
              <NotificationItem
                id="example-success"
                title="Success"
                content="Operation completed successfully!"
                type="success"
                variant="bordered"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Warning Notification</h4>
              <NotificationItem
                id="example-warning"
                title="Warning"
                content="Please be aware of this warning."
                type="warning"
                variant="bordered"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Error Notification</h4>
              <NotificationItem
                id="example-error"
                title="Error"
                content="An error has occurred. Please try again."
                type="error"
                variant="bordered"
              />
            </div>
          </div>
        </div>
        
        {/* Notification Variants */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Notification Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Default</h4>
              <NotificationItem
                id="example-default"
                title="Default Variant"
                content="Standard border styling."
                type="info"
                variant="default"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Bordered</h4>
              <NotificationItem
                id="example-bordered"
                title="Bordered Variant"
                content="With shadow effect for depth."
                type="info"
                variant="bordered"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Cutout</h4>
              <NotificationItem
                id="example-cutout"
                title="Cutout Variant"
                content="With slight rotation for a raw look."
                type="info"
                variant="cutout"
              />
            </div>
          </div>
        </div>
        
        {/* Notification Bell */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Notification Bell</h3>
          <div className="flex space-x-8">
            <div>
              <h4 className="font-mono font-bold mb-2">No Notifications</h4>
              <NotificationBell 
                count={0}
                variant="bordered"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">With Notifications</h4>
              <NotificationBell 
                count={5}
                variant="bordered"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Many Notifications</h4>
              <NotificationBell 
                count={99}
                maxCount={99}
                variant="bordered"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Different Sizes</h4>
              <div className="flex space-x-4 items-center">
                <NotificationBell 
                  count={3}
                  variant="bordered"
                  size="small"
                />
                <NotificationBell 
                  count={3}
                  variant="bordered"
                  size="medium"
                />
                <NotificationBell 
                  count={3}
                  variant="bordered"
                  size="large"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Notification Dropdown */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Notification Dropdown</h3>
          <div className="flex justify-between items-start">
            <div>
              <p className="mb-4">
                Click the bell icon to toggle the notification dropdown.
              </p>
              
              <NotificationDropdown
                notifications={notifications}
                isOpen={isDropdownOpen}
                onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                onClickNotification={handleNotificationClick}
                onRemoveNotification={handleRemoveNotification}
                onClearAll={handleClearAll}
                onMarkAllAsRead={handleMarkAllAsRead}
                maxNotifications={3}
                variant="bordered"
              />
            </div>
            
            <div>
              <p className="mb-4">
                Add sample notifications:
              </p>
              
              <div className="flex space-x-2">
                <button
                  className="px-2 py-1 border-2 border-black bg-blue-50"
                  onClick={() => addNotification('info')}
                >
                  Info
                </button>
                <button
                  className="px-2 py-1 border-2 border-black bg-green-50"
                  onClick={() => addNotification('success')}
                >
                  Success
                </button>
                <button
                  className="px-2 py-1 border-2 border-black bg-yellow-50"
                  onClick={() => addNotification('warning')}
                >
                  Warning
                </button>
                <button
                  className="px-2 py-1 border-2 border-black bg-red-50"
                  onClick={() => addNotification('error')}
                >
                  Error
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notification Center */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Notification Center</h3>
          <p>
            The notification center displays notifications in a fixed position on the screen.
            To demonstrate it, click one of the buttons below to add a notification:
          </p>
          
          <div className="mt-4 flex space-x-4">
            <button
              className="px-3 py-2 border-2 border-black bg-white font-mono"
              onClick={() => {
                const center = document.getElementById('notification-center-demo');
                if (center) {
                  const newNotif: NotificationItemProps = {
                    id: `${Date.now()}`,
                    title: 'New Notification',
                    content: 'This is a notification from the demo.',
                    type: 'info',
                    createdAt: new Date(),
                    onClose: (id) => {
                      const element = document.getElementById(`notif-${id}`);
                      if (element) element.remove();
                    },
                    autoDismiss: true,
                  };
                  
                  const notifElement = document.createElement('div');
                  notifElement.id = `notif-${newNotif.id}`;
                  notifElement.className = 'mb-4';
                  
                  const notif = document.createElement('div');
                  notif.className = 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-blue-50 p-4';
                  notif.innerHTML = `
                    <div class="font-mono font-bold">${newNotif.title}</div>
                    <div class="text-sm">${newNotif.content}</div>
                  `;
                  
                  notifElement.appendChild(notif);
                  center.appendChild(notifElement);
                  
                  // Auto dismiss
                  setTimeout(() => {
                    const element = document.getElementById(`notif-${newNotif.id}`);
                    if (element) {
                      element.style.opacity = '0';
                      element.style.transform = 'translateX(100%)';
                      element.style.transition = 'opacity 300ms, transform 300ms';
                      
                      setTimeout(() => {
                        if (element) element.remove();
                      }, 300);
                    }
                  }, 3000);
                }
              }}
            >
              Add Notification
            </button>
          </div>
          
          <div className="mt-8 border-2 border-gray-300 p-4 bg-gray-50 h-64 relative">
            <div id="notification-center-demo" className="absolute top-4 right-4 w-72">
              {/* Notifications will be added here */}
            </div>
            
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Simulated viewport for notification center demo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 