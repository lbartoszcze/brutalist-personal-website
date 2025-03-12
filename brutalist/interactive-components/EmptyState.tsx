import React from 'react';

interface EmptyStateProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  variant?: 'default' | 'bordered' | 'cutout';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  secondaryAction,
  variant = 'default',
  size = 'medium',
  className = '',
}) => {
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
        return 'p-4 max-w-sm';
      case 'large':
        return 'p-8 max-w-2xl';
      default: // medium
        return 'p-6 max-w-lg';
    }
  };
  
  return (
    <div 
      className={`
        bg-white text-center
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${className}
      `}
    >
      {/* Icon */}
      {icon && (
        <div className="mb-4 text-4xl flex justify-center">
          {icon}
        </div>
      )}
      
      {/* Title */}
      <h3 className="text-xl font-mono font-bold mb-2">
        {title}
      </h3>
      
      {/* Description */}
      {description && (
        <p className="mb-6 font-sans">
          {description}
        </p>
      )}
      
      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
};

// Specialized Empty States
export const NoResultsState: React.FC<Omit<EmptyStateProps, 'title' | 'icon'> & {
  title?: React.ReactNode;
  searchTerm?: string;
}> = ({
  title = 'No Results Found',
  description = "We couldn't find any matches for your search.",
  searchTerm,
  ...props
}) => {
  return (
    <EmptyState
      title={title}
      description={searchTerm ? `We couldn't find any matches for "${searchTerm}".` : description}
      icon="🔍"
      {...props}
    />
  );
};

export const NoDataState: React.FC<Omit<EmptyStateProps, 'title' | 'icon'> & {
  title?: React.ReactNode;
}> = ({
  title = 'No Data Available',
  description = 'There is no data to display at this time.',
  ...props
}) => {
  return (
    <EmptyState
      title={title}
      description={description}
      icon="📊"
      {...props}
    />
  );
};

export const NoAccessState: React.FC<Omit<EmptyStateProps, 'title' | 'icon'> & {
  title?: React.ReactNode;
}> = ({
  title = 'Access Restricted',
  description = "You don't have permission to view this content.",
  ...props
}) => {
  return (
    <EmptyState
      title={title}
      description={description}
      icon="🔒"
      {...props}
    />
  );
};

export const ErrorState: React.FC<Omit<EmptyStateProps, 'title' | 'icon'> & {
  title?: React.ReactNode;
  error?: string;
}> = ({
  title = 'Something Went Wrong',
  description = 'An error occurred while loading this content.',
  error,
  ...props
}) => {
  return (
    <EmptyState
      title={title}
      description={
        <>
          {description}
          {error && (
            <div className="mt-2 p-2 bg-red-50 text-red-800 font-mono text-sm overflow-auto">
              {error}
            </div>
          )}
        </>
      }
      icon="⚠️"
      {...props}
    />
  );
};

// Examples
export const EmptyStateExamples: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Empty States</h2>
      <p className="mb-8 font-sans">
        Empty state components with brutalist styling for various scenarios when content is not available.
      </p>
      
      <div className="space-y-12">
        {/* Basic Empty States */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Empty State</h3>
          <div className="space-y-8">
            <div className="flex justify-center">
              <EmptyState
                title="No Items Yet"
                description="Start by adding your first item to the collection."
                icon="📦"
                action={
                  <button className="px-4 py-2 bg-black text-white border-2 border-black font-mono hover:bg-gray-800">
                    Add Item
                  </button>
                }
                secondaryAction={
                  <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
                    Learn More
                  </button>
                }
              />
            </div>
            
            <div className="flex justify-center">
              <EmptyState
                title="Empty Inbox"
                description="You've processed all messages. Great job!"
                icon="📨"
                variant="bordered"
              />
            </div>
            
            <div className="flex justify-center">
              <EmptyState
                title="No Notifications"
                description="We'll notify you when something important happens."
                icon="🔔"
                variant="cutout"
              />
            </div>
          </div>
        </div>
        
        {/* Size Variants */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Size Variants</h3>
          <div className="space-y-8">
            <div className="flex justify-center">
              <EmptyState
                title="Small Empty State"
                description="Compact version for limited spaces."
                icon="🔍"
                size="small"
                variant="bordered"
              />
            </div>
            
            <div className="flex justify-center">
              <EmptyState
                title="Medium Empty State"
                description="Standard size for most use cases."
                icon="📋"
                size="medium"
                variant="bordered"
              />
            </div>
            
            <div className="flex justify-center">
              <EmptyState
                title="Large Empty State"
                description="Expanded version for when you need more emphasis and visibility. Provides more space for longer descriptions and multiple actions."
                icon="📱"
                size="large"
                variant="bordered"
                action={
                  <button className="px-4 py-2 bg-black text-white border-2 border-black font-mono hover:bg-gray-800">
                    Primary Action
                  </button>
                }
                secondaryAction={
                  <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
                    Secondary Action
                  </button>
                }
              />
            </div>
          </div>
        </div>
        
        {/* Specialized Empty States */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Specialized Empty States</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <NoResultsState
              searchTerm="brutalist design"
              variant="bordered"
              action={
                <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
                  Clear Search
                </button>
              }
            />
            
            <NoDataState
              variant="bordered"
              action={
                <button className="px-4 py-2 bg-black text-white border-2 border-black font-mono hover:bg-gray-800">
                  Refresh Data
                </button>
              }
            />
            
            <NoAccessState
              variant="bordered"
              action={
                <button className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100">
                  Request Access
                </button>
              }
            />
            
            <ErrorState
              variant="bordered"
              error="Error 500: Internal Server Error"
              action={
                <button className="px-4 py-2 bg-black text-white border-2 border-black font-mono hover:bg-gray-800">
                  Try Again
                </button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 