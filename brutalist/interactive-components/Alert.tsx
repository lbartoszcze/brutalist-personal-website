import React, { useState, useEffect } from 'react';

// Alert props
interface AlertProps {
  /**
   * Alert content
   */
  children: React.ReactNode;
  /**
   * Alert title
   */
  title?: React.ReactNode;
  /**
   * Type of alert
   */
  type?: 'info' | 'success' | 'warning' | 'error';
  /**
   * Whether to show the close button
   */
  showCloseButton?: boolean;
  /**
   * Function to call when the alert is closed
   */
  onClose?: () => void;
  /**
   * Whether the alert is visible
   */
  isVisible?: boolean;
  /**
   * Whether the alert should automatically dismiss after a timeout
   */
  autoDismiss?: boolean;
  /**
   * Timeout in milliseconds before auto-dismissing
   */
  autoDismissTimeout?: number;
  /**
   * Variant of the alert
   */
  variant?: 'default' | 'bordered' | 'cutout';
  /**
   * Icon to display in the alert
   */
  icon?: React.ReactNode;
  /**
   * Whether to show the icon
   */
  showIcon?: boolean;
  /**
   * Custom class name
   */
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  title,
  type = 'info',
  showCloseButton = true,
  onClose,
  isVisible = true,
  autoDismiss = false,
  autoDismissTimeout = 5000,
  variant = 'default',
  icon,
  showIcon = true,
  className = '',
}) => {
  const [visible, setVisible] = useState(isVisible);
  
  // Handle visibility changes
  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);
  
  // Handle auto-dismiss
  useEffect(() => {
    if (autoDismiss && visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, autoDismissTimeout);
      
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, autoDismissTimeout, visible, onClose]);
  
  // Handle close
  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };
  
  // Don't render if not visible
  if (!visible) return null;
  
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
  
  return (
    <div
      className={`
        ${getVariantStyles()}
        ${getTypeStyles()}
        p-4
        ${className}
      `}
      role="alert"
    >
      <div className="flex">
        {/* Icon */}
        {showIcon && (
          <div className="flex-shrink-0 mr-3 text-xl">
            {getTypeIcon()}
          </div>
        )}
        
        {/* Content */}
        <div className="flex-grow">
          {/* Title */}
          {title && (
            <div className="font-mono font-bold mb-1">
              {title}
            </div>
          )}
          
          {/* Body */}
          <div className="text-sm">
            {children}
          </div>
        </div>
        
        {/* Close button */}
        {showCloseButton && (
          <button
            className="flex-shrink-0 ml-2 -mr-1 text-gray-500 hover:text-black"
            onClick={handleClose}
            aria-label="Close alert"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

// Toast component for notifications
interface ToastProps extends Omit<AlertProps, 'variant'> {
  /**
   * Position of the toast on the screen
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const Toast: React.FC<ToastProps> = ({
  position = 'top-right',
  ...alertProps
}) => {
  // Get position styles
  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'top-right':
      default:
        return 'top-4 right-4';
    }
  };
  
  return (
    <div className={`fixed ${getPositionStyles()} z-50 w-72`}>
      <Alert
        variant="bordered"
        showCloseButton
        autoDismiss
        {...alertProps}
      />
    </div>
  );
};

// Toast container for multiple toasts
interface ToastContainerProps {
  /**
   * Position of the toasts on the screen
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  /**
   * Maximum number of toasts to show
   */
  maxToasts?: number;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'top-right',
  maxToasts = 3,
}) => {
  // Get position styles
  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4 flex-col-reverse';
      case 'bottom-left':
        return 'bottom-4 left-4 flex-col-reverse';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2 flex-col-reverse';
      case 'top-right':
      default:
        return 'top-4 right-4';
    }
  };
  
  return (
    <div className={`fixed ${getPositionStyles()} z-50 flex flex-col gap-2 w-72`}>
      {/* Toasts will be rendered here by a toast manager */}
    </div>
  );
};

// Examples
export const AlertExamples: React.FC = () => {
  // State for toast example
  const [toastVisible, setToastVisible] = useState(false);
  const [toastType, setToastType] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [toastPosition, setToastPosition] = useState<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'>('top-right');
  
  return (
    <div className="p-6 max-w-6xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Alert Components</h2>
      <p className="mb-8 font-sans">
        Alert and notification components with brutalist styling for user feedback.
      </p>
      
      <div className="space-y-16">
        {/* Basic Alerts */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Alert Types</h3>
          <div className="grid grid-cols-1 gap-4">
            <Alert type="info" title="Information">
              <p>This is an informational alert providing general guidance.</p>
            </Alert>
            
            <Alert type="success" title="Success">
              <p>The operation was completed successfully.</p>
            </Alert>
            
            <Alert type="warning" title="Warning">
              <p>This action may have consequences. Please review before proceeding.</p>
            </Alert>
            
            <Alert type="error" title="Error">
              <p>An error occurred while processing your request. Please try again.</p>
            </Alert>
          </div>
        </div>
        
        {/* Alert Variants */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Alert Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Default</h4>
              <Alert
                variant="default"
                type="info"
                title="Default Variant"
              >
                <p>Standard border styling.</p>
              </Alert>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Bordered</h4>
              <Alert
                variant="bordered"
                type="info"
                title="Bordered Variant"
              >
                <p>Adds a shadow for depth.</p>
              </Alert>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Cutout</h4>
              <Alert
                variant="cutout"
                type="info"
                title="Cutout Variant"
              >
                <p>Slight rotation for raw look.</p>
              </Alert>
            </div>
          </div>
        </div>
        
        {/* Alert Without Icon/Title */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Alert Configurations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Without Icon</h4>
              <Alert
                type="info"
                title="No Icon Alert"
                showIcon={false}
                variant="bordered"
              >
                <p>This alert does not display an icon.</p>
              </Alert>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Without Title</h4>
              <Alert
                type="info"
                showIcon={true}
                variant="bordered"
              >
                <p>This alert does not have a title, only content.</p>
              </Alert>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">With Custom Icon</h4>
              <Alert
                type="info"
                title="Custom Icon"
                icon={<span className="text-purple-600">★</span>}
                variant="bordered"
              >
                <p>This alert uses a custom icon instead of the default.</p>
              </Alert>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Without Close Button</h4>
              <Alert
                type="info"
                title="No Close Button"
                showCloseButton={false}
                variant="bordered"
              >
                <p>This alert does not have a close button.</p>
              </Alert>
            </div>
          </div>
        </div>
        
        {/* Toast Examples */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Toast Notifications</h3>
          <div className="space-y-4">
            <p className="font-sans">
              Toasts are temporary notifications that appear in a corner of the screen.
              Use the controls below to trigger different types of toasts:
            </p>
            
            {/* Toast controls */}
            <div className="space-y-4">
              <div>
                <label className="block font-mono mb-2">Toast Type:</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-3 py-1 border-2 border-black font-mono text-sm ${toastType === 'info' ? 'bg-black text-white' : ''}`}
                    onClick={() => setToastType('info')}
                  >
                    Info
                  </button>
                  <button
                    className={`px-3 py-1 border-2 border-black font-mono text-sm ${toastType === 'success' ? 'bg-black text-white' : ''}`}
                    onClick={() => setToastType('success')}
                  >
                    Success
                  </button>
                  <button
                    className={`px-3 py-1 border-2 border-black font-mono text-sm ${toastType === 'warning' ? 'bg-black text-white' : ''}`}
                    onClick={() => setToastType('warning')}
                  >
                    Warning
                  </button>
                  <button
                    className={`px-3 py-1 border-2 border-black font-mono text-sm ${toastType === 'error' ? 'bg-black text-white' : ''}`}
                    onClick={() => setToastType('error')}
                  >
                    Error
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block font-mono mb-2">Toast Position:</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-3 py-1 border-2 border-black font-mono text-sm ${toastPosition === 'top-right' ? 'bg-black text-white' : ''}`}
                    onClick={() => setToastPosition('top-right')}
                  >
                    Top Right
                  </button>
                  <button
                    className={`px-3 py-1 border-2 border-black font-mono text-sm ${toastPosition === 'top-left' ? 'bg-black text-white' : ''}`}
                    onClick={() => setToastPosition('top-left')}
                  >
                    Top Left
                  </button>
                  <button
                    className={`px-3 py-1 border-2 border-black font-mono text-sm ${toastPosition === 'bottom-right' ? 'bg-black text-white' : ''}`}
                    onClick={() => setToastPosition('bottom-right')}
                  >
                    Bottom Right
                  </button>
                  <button
                    className={`px-3 py-1 border-2 border-black font-mono text-sm ${toastPosition === 'bottom-left' ? 'bg-black text-white' : ''}`}
                    onClick={() => setToastPosition('bottom-left')}
                  >
                    Bottom Left
                  </button>
                  <button
                    className={`px-3 py-1 border-2 border-black font-mono text-sm ${toastPosition === 'top-center' ? 'bg-black text-white' : ''}`}
                    onClick={() => setToastPosition('top-center')}
                  >
                    Top Center
                  </button>
                  <button
                    className={`px-3 py-1 border-2 border-black font-mono text-sm ${toastPosition === 'bottom-center' ? 'bg-black text-white' : ''}`}
                    onClick={() => setToastPosition('bottom-center')}
                  >
                    Bottom Center
                  </button>
                </div>
              </div>
              
              <div>
                <button
                  className="px-4 py-2 border-2 border-black font-mono bg-black text-white"
                  onClick={() => setToastVisible(true)}
                >
                  Show Toast
                </button>
              </div>
            </div>
            
            {/* Toast */}
            {toastVisible && (
              <Toast
                type={toastType}
                title={`${toastType.charAt(0).toUpperCase() + toastType.slice(1)} Toast`}
                position={toastPosition}
                autoDismiss
                autoDismissTimeout={3000}
                onClose={() => setToastVisible(false)}
              >
                {toastType === 'info' && 'This is an informational toast message.'}
                {toastType === 'success' && 'Operation completed successfully!'}
                {toastType === 'warning' && 'This is a warning notification.'}
                {toastType === 'error' && 'An error occurred. Please try again.'}
              </Toast>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 