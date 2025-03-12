import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

// Base Modal Props
interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  /**
   * Function to call when the modal should close
   */
  onClose: () => void;
  /**
   * Modal title
   */
  title?: React.ReactNode;
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Footer content
   */
  footer?: React.ReactNode;
  /**
   * Size of the modal
   */
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  /**
   * Whether to close on outside click
   */
  closeOnOutsideClick?: boolean;
  /**
   * Whether to close on escape key
   */
  closeOnEsc?: boolean;
  /**
   * Whether to show the close button
   */
  showCloseButton?: boolean;
  /**
   * Custom class name for the modal
   */
  className?: string;
  /**
   * Modal variant
   */
  variant?: 'default' | 'bordered' | 'cutout';
  /**
   * Initial focus element
   */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /**
   * Z-index for the modal
   */
  zIndex?: number;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnOutsideClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className = '',
  variant = 'default',
  initialFocusRef,
  zIndex = 50,
}) => {
  // Ref for the modal content
  const modalRef = useRef<HTMLDivElement>(null);
  
  // State to track if we're rendering in the browser
  const [isMounted, setIsMounted] = useState(false);
  
  // Mount effect
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return;
    
    // Set initial focus
    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    } else if (modalRef.current) {
      modalRef.current.focus();
    }
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // Handle escape key
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEsc) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      // Cleanup
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose, closeOnEsc, initialFocusRef]);
  
  // Handle outside click
  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node) && closeOnOutsideClick) {
      onClose();
    }
  }, [onClose, closeOnOutsideClick]);
  
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
  
  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'w-full max-w-md';
      case 'medium':
        return 'w-full max-w-lg';
      case 'large':
        return 'w-full max-w-4xl';
      case 'fullscreen':
        return 'w-[calc(100%-2rem)] h-[calc(100%-2rem)] max-w-full max-h-full';
      default:
        return 'w-full max-w-lg';
    }
  };
  
  // Don't render anything if not open
  if (!isOpen || !isMounted) return null;
  
  // Use createPortal to render at the document body level
  return createPortal(
    <div 
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 p-4`}
      style={{ zIndex }}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div 
        ref={modalRef}
        className={`
          ${getSizeStyles()}
          ${getVariantStyles()}
          bg-white
          flex flex-col max-h-[calc(100vh-2rem)]
          ${className}
        `}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b-2 border-black">
            {title && (
              <h2 className="text-xl font-mono font-bold">
                {title}
              </h2>
            )}
            
            {showCloseButton && (
              <button
                className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-100"
                onClick={onClose}
                aria-label="Close modal"
              >
                ×
              </button>
            )}
          </div>
        )}
        
        {/* Modal body */}
        <div className="p-4 overflow-y-auto">
          {children}
        </div>
        
        {/* Modal footer */}
        {footer && (
          <div className="p-4 border-t-2 border-black">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

// Dialog component - A pre-configured modal for simple dialogs
interface DialogProps extends Omit<ModalProps, 'children' | 'footer'> {
  /**
   * Dialog content
   */
  content: React.ReactNode;
  /**
   * Confirm button text
   */
  confirmText?: string;
  /**
   * Cancel button text
   */
  cancelText?: string;
  /**
   * Confirm button handler
   */
  onConfirm?: () => void;
  /**
   * Whether to show the cancel button
   */
  showCancel?: boolean;
  /**
   * Type of dialog
   */
  type?: 'info' | 'error' | 'success' | 'warning' | 'confirm';
  /**
   * Whether the confirm button is destructive
   */
  isDestructive?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  content,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  showCancel = true,
  type = 'info',
  isDestructive = false,
  ...modalProps
}) => {
  // Get icon based on dialog type
  const getDialogIcon = () => {
    switch (type) {
      case 'error':
        return '⚠️';
      case 'success':
        return '✓';
      case 'warning':
        return '⚠️';
      case 'confirm':
        return '?';
      case 'info':
      default:
        return 'ℹ';
    }
  };
  
  // Get button styles based on dialog type
  const getButtonStyles = () => {
    if (isDestructive) {
      return 'bg-red-600 hover:bg-red-700 text-white';
    }
    
    switch (type) {
      case 'error':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'warning':
        return 'bg-yellow-500 hover:bg-yellow-600 text-black';
      case 'confirm':
      case 'info':
      default:
        return 'bg-black hover:bg-gray-900 text-white';
    }
  };
  
  // Dialog footer with action buttons
  const dialogFooter = (
    <div className="flex justify-end space-x-3">
      {showCancel && (
        <button
          className="px-4 py-2 font-mono border-2 border-black hover:bg-gray-100"
          onClick={modalProps.onClose}
        >
          {cancelText}
        </button>
      )}
      <button
        className={`px-4 py-2 font-mono border-2 border-black ${getButtonStyles()}`}
        onClick={() => {
          onConfirm?.();
          modalProps.onClose();
        }}
      >
        {confirmText}
      </button>
    </div>
  );
  
  return (
    <Modal
      size="small"
      footer={dialogFooter}
      {...modalProps}
    >
      <div className="flex">
        <div className="mr-4 text-3xl">
          {getDialogIcon()}
        </div>
        <div>
          {content}
        </div>
      </div>
    </Modal>
  );
};

// Drawer component - A sliding panel from the side
interface DrawerProps extends Omit<ModalProps, 'size'> {
  /**
   * Position of the drawer
   */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * Size of the drawer
   */
  size?: 'small' | 'medium' | 'large' | 'full';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  position = 'right',
  size = 'medium',
  closeOnOutsideClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className = '',
  variant = 'default',
  initialFocusRef,
  zIndex = 50,
}) => {
  // Ref for the drawer content
  const drawerRef = useRef<HTMLDivElement>(null);
  
  // State to track if we're rendering in the browser
  const [isMounted, setIsMounted] = useState(false);
  
  // Mount effect
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return;
    
    // Set initial focus
    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    } else if (drawerRef.current) {
      drawerRef.current.focus();
    }
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // Handle escape key
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEsc) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      // Cleanup
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose, closeOnEsc, initialFocusRef]);
  
  // Handle outside click
  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target as Node) && closeOnOutsideClick) {
      onClose();
    }
  }, [onClose, closeOnOutsideClick]);
  
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
  
  // Get size and position styles
  const getSizeAndPositionStyles = () => {
    // Base styles for all positions
    let styles = 'fixed bg-white';
    
    // Size classes
    const sizeClasses = {
      small: {
        left: 'w-64',
        right: 'w-64',
        top: 'h-64',
        bottom: 'h-64',
      },
      medium: {
        left: 'w-80',
        right: 'w-80',
        top: 'h-80',
        bottom: 'h-80',
      },
      large: {
        left: 'w-96',
        right: 'w-96',
        top: 'h-96',
        bottom: 'h-96',
      },
      full: {
        left: 'w-full',
        right: 'w-full',
        top: 'h-full',
        bottom: 'h-full',
      },
    };
    
    // Position classes
    switch (position) {
      case 'left':
        styles += ` top-0 left-0 h-full ${sizeClasses[size].left}`;
        styles += ` transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`;
        break;
      case 'right':
        styles += ` top-0 right-0 h-full ${sizeClasses[size].right}`;
        styles += ` transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`;
        break;
      case 'top':
        styles += ` top-0 left-0 w-full ${sizeClasses[size].top}`;
        styles += ` transform ${isOpen ? 'translate-y-0' : '-translate-y-full'}`;
        break;
      case 'bottom':
        styles += ` bottom-0 left-0 w-full ${sizeClasses[size].bottom}`;
        styles += ` transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`;
        break;
      default:
        styles += ` top-0 right-0 h-full ${sizeClasses[size].right}`;
        styles += ` transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`;
    }
    
    return styles;
  };
  
  // Don't render anything if not open or not in browser
  if (!isMounted) return null;
  
  // Use createPortal to render at the document body level
  return createPortal(
    <div
      className={`${isOpen ? 'fixed inset-0' : 'hidden'} z-${zIndex}`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'bg-opacity-40' : 'bg-opacity-0'}`}
        onClick={handleBackdropClick}
      />
      
      {/* Drawer */}
      <div 
        ref={drawerRef}
        className={`
          ${getSizeAndPositionStyles()}
          ${getVariantStyles()}
          transition-transform duration-300 ease-in-out
          flex flex-col
          ${className}
        `}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b-2 border-black">
            {title && (
              <h2 className="text-xl font-mono font-bold">
                {title}
              </h2>
            )}
            
            {showCloseButton && (
              <button
                className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-100"
                onClick={onClose}
                aria-label="Close drawer"
              >
                ×
              </button>
            )}
          </div>
        )}
        
        {/* Drawer content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {children}
        </div>
        
        {/* Drawer footer */}
        {footer && (
          <div className="p-4 border-t-2 border-black">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

// Examples
export const ModalExamples: React.FC = () => {
  // State for managing open states
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'info' | 'error' | 'success' | 'warning' | 'confirm'>('info');
  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('right');
  
  // Sample custom footer
  const modalFooter = (
    <div className="flex justify-end space-x-2">
      <button
        className="px-4 py-2 border-2 border-black font-mono"
        onClick={() => setIsBasicModalOpen(false)}
      >
        Cancel
      </button>
      <button
        className="px-4 py-2 border-2 border-black bg-black text-white font-mono"
        onClick={() => {
          alert('Action confirmed!');
          setIsBasicModalOpen(false);
        }}
      >
        Confirm
      </button>
    </div>
  );
  
  return (
    <div className="p-6 max-w-6xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Modal Components</h2>
      <p className="mb-8 font-sans">
        Modal, dialog, and drawer components with brutalist styling for overlays and notifications.
      </p>
      
      <div className="space-y-16">
        {/* Basic Modal */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Modal</h3>
          <div className="space-y-4">
            <button
              className="px-4 py-2 border-2 border-black font-mono"
              onClick={() => setIsBasicModalOpen(true)}
            >
              Open Modal
            </button>
            
            <Modal
              isOpen={isBasicModalOpen}
              onClose={() => setIsBasicModalOpen(false)}
              title="Modal Title"
              footer={modalFooter}
              variant="bordered"
            >
              <div className="space-y-4">
                <p className="font-sans">
                  This is a basic modal with a title, content, and custom footer.
                </p>
                <p className="font-sans">
                  The modal has a bordered variant, which adds a shadow to create a 3D effect consistent with brutalist design.
                </p>
              </div>
            </Modal>
          </div>
        </div>
        
        {/* Dialog */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Dialog Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              className="px-4 py-2 border-2 border-black font-mono"
              onClick={() => {
                setDialogType('info');
                setIsDialogOpen(true);
              }}
            >
              Info Dialog
            </button>
            
            <button
              className="px-4 py-2 border-2 border-black font-mono"
              onClick={() => {
                setDialogType('success');
                setIsDialogOpen(true);
              }}
            >
              Success Dialog
            </button>
            
            <button
              className="px-4 py-2 border-2 border-black font-mono"
              onClick={() => {
                setDialogType('warning');
                setIsDialogOpen(true);
              }}
            >
              Warning Dialog
            </button>
            
            <button
              className="px-4 py-2 border-2 border-black font-mono"
              onClick={() => {
                setDialogType('error');
                setIsDialogOpen(true);
              }}
            >
              Error Dialog
            </button>
            
            <button
              className="px-4 py-2 border-2 border-black font-mono"
              onClick={() => {
                setDialogType('confirm');
                setIsDialogOpen(true);
              }}
            >
              Confirmation Dialog
            </button>
          </div>
          
          <Dialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            title={`${dialogType.charAt(0).toUpperCase() + dialogType.slice(1)} Dialog`}
            content={
              <p className="font-sans">
                {dialogType === 'info' && 'This is an informational message.'}
                {dialogType === 'success' && 'The operation was completed successfully!'}
                {dialogType === 'warning' && 'This action might have consequences.'}
                {dialogType === 'error' && 'An error occurred while processing your request.'}
                {dialogType === 'confirm' && 'Are you sure you want to proceed with this action?'}
              </p>
            }
            type={dialogType}
            confirmText={dialogType === 'confirm' ? 'Yes, proceed' : 'OK'}
            cancelText="Cancel"
            showCancel={dialogType === 'confirm' || dialogType === 'warning'}
            onConfirm={() => console.log(`${dialogType} dialog confirmed`)}
            variant="bordered"
          />
        </div>
        
        {/* Drawer */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Drawer Positions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              className="px-4 py-2 border-2 border-black font-mono"
              onClick={() => {
                setDrawerPosition('left');
                setIsDrawerOpen(true);
              }}
            >
              Left Drawer
            </button>
            
            <button
              className="px-4 py-2 border-2 border-black font-mono"
              onClick={() => {
                setDrawerPosition('right');
                setIsDrawerOpen(true);
              }}
            >
              Right Drawer
            </button>
            
            <button
              className="px-4 py-2 border-2 border-black font-mono"
              onClick={() => {
                setDrawerPosition('top');
                setIsDrawerOpen(true);
              }}
            >
              Top Drawer
            </button>
            
            <button
              className="px-4 py-2 border-2 border-black font-mono"
              onClick={() => {
                setDrawerPosition('bottom');
                setIsDrawerOpen(true);
              }}
            >
              Bottom Drawer
            </button>
          </div>
          
          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            position={drawerPosition}
            title={`${drawerPosition.charAt(0).toUpperCase() + drawerPosition.slice(1)} Drawer`}
            variant="bordered"
            footer={
              <button
                className="w-full px-4 py-2 border-2 border-black bg-black text-white font-mono"
                onClick={() => setIsDrawerOpen(false)}
              >
                Close Drawer
              </button>
            }
          >
            <div className="space-y-4">
              <p className="font-sans">
                This is a drawer that slides in from the {drawerPosition}.
              </p>
              <p className="font-sans">
                Drawers are useful for secondary content or navigation that doesn't require the full attention of the user.
              </p>
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="p-4 border-2 border-black font-mono">
                    Drawer item {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </Drawer>
        </div>
        
        {/* Modal Variants */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Modal Variants & Sizes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <button
              className="px-4 py-2 border-2 border-black font-mono"
              onClick={() => {
                setIsBasicModalOpen(true);
              }}
            >
              Default Variant
            </button>
            
            <button
              className="px-4 py-2 border-2 border-black font-mono"
              onClick={() => {
                setIsBasicModalOpen(true);
              }}
            >
              Bordered Variant
            </button>
            
            <button
              className="px-4 py-2 border-2 border-black font-mono"
              onClick={() => {
                setIsBasicModalOpen(true);
              }}
            >
              Cutout Variant
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              className="px-4 py-2 border-2 border-black font-mono"
              onClick={() => {
                setIsBasicModalOpen(true);
              }}
            >
              Small Size
            </button>
            
            <button
              className="px-4 py-2 border-2 border-black font-mono"
              onClick={() => {
                setIsBasicModalOpen(true);
              }}
            >
              Medium Size
            </button>
            
            <button
              className="px-4 py-2 border-2 border-black font-mono"
              onClick={() => {
                setIsBasicModalOpen(true);
              }}
            >
              Large Size
            </button>
            
            <button
              className="px-4 py-2 border-2 border-black font-mono"
              onClick={() => {
                setIsBasicModalOpen(true);
              }}
            >
              Fullscreen Size
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 