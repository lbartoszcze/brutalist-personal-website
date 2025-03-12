import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'bordered' | 'cutout';
  label?: React.ReactNode;
  fullScreen?: boolean;
  overlay?: boolean;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  variant = 'default',
  label,
  fullScreen = false,
  overlay = false,
  className = '',
}) => {
  // Get size-based styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'w-6 h-6 border-2';
      case 'large':
        return 'w-16 h-16 border-4';
      default: // medium
        return 'w-10 h-10 border-3';
    }
  };
  
  // Get variant-based styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'transform rotate-[-5deg]';
      default:
        return '';
    }
  };
  
  // Container styles based on fullScreen and overlay props
  const getContainerStyles = () => {
    if (fullScreen) {
      return 'fixed inset-0 flex items-center justify-center z-50' + 
        (overlay ? ' bg-white bg-opacity-80' : '');
    }
    
    return 'flex flex-col items-center justify-center';
  };
  
  return (
    <div className={`${getContainerStyles()} ${className}`}>
      <div
        className={`
          border-black rounded-none border-t-black border-l-black
          border-b-transparent border-r-transparent
          animate-spin
          ${getSizeStyles()}
          ${getVariantStyles()}
        `}
      />
      
      {label && (
        <div className="mt-4 font-mono font-bold text-center">
          {label}
        </div>
      )}
    </div>
  );
};

// Specialized loader variants
export const SpinningBoxLoader: React.FC<Omit<LoaderProps, 'variant'>> = (props) => {
  return (
    <div className={`flex flex-col items-center justify-center ${props.className || ''}`}>
      <div className={`
        relative
        ${props.size === 'small' ? 'w-8 h-8' : 
          props.size === 'large' ? 'w-20 h-20' : 
          'w-12 h-12'}
      `}>
        <div className={`
          absolute inset-0 border-2 border-black bg-white
          animate-spin
          ${props.size === 'small' ? 'border-2' : 
            props.size === 'large' ? 'border-4' : 
            'border-3'}
        `} />
        
        <div className={`
          absolute inset-0 border-2 border-black bg-white
          animate-spin animation-delay-150
          ${props.size === 'small' ? 'border-2' : 
            props.size === 'large' ? 'border-4' : 
            'border-3'}
        `} style={{ animationDelay: '-0.15s' }} />
        
        <div className={`
          absolute inset-0 border-2 border-black bg-white
          animate-spin animation-delay-300
          ${props.size === 'small' ? 'border-2' : 
            props.size === 'large' ? 'border-4' : 
            'border-3'}
        `} style={{ animationDelay: '-0.3s' }} />
      </div>
      
      {props.label && (
        <div className="mt-4 font-mono font-bold text-center">
          {props.label}
        </div>
      )}
    </div>
  );
};

export const DottedLoader: React.FC<Omit<LoaderProps, 'variant'>> = (props) => {
  const getDotSize = () => {
    switch (props.size) {
      case 'small':
        return 'w-2 h-2';
      case 'large':
        return 'w-4 h-4';
      default: // medium
        return 'w-3 h-3';
    }
  };
  
  return (
    <div className={`flex flex-col items-center justify-center ${props.className || ''}`}>
      <div className="flex space-x-2">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={`
              bg-black
              animate-pulse
              ${getDotSize()}
            `}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      
      {props.label && (
        <div className="mt-4 font-mono font-bold text-center">
          {props.label}
        </div>
      )}
    </div>
  );
};

export const ProgressLoader: React.FC<Omit<LoaderProps, 'variant'> & {
  progress: number;
  showPercentage?: boolean;
}> = ({
  progress,
  showPercentage = true,
  size = 'medium',
  label,
  className = '',
}) => {
  const getHeight = () => {
    switch (size) {
      case 'small':
        return 'h-2';
      case 'large':
        return 'h-6';
      default: // medium
        return 'h-4';
    }
  };
  
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="relative w-full border-2 border-black bg-white">
        <div
          className="absolute top-0 left-0 bottom-0 bg-black"
          style={{ width: `${normalizedProgress}%` }}
        />
        
        {showPercentage && (
          <div className={`
            relative text-center font-mono font-bold
            ${size === 'small' ? 'text-xs' : 
              size === 'large' ? 'text-lg py-1' : 
              'text-sm'}
          `}>
            {Math.round(normalizedProgress)}%
          </div>
        )}
      </div>
      
      {label && (
        <div className="mt-2 font-mono text-sm">
          {label}
        </div>
      )}
    </div>
  );
};

// Skeleton Loader
interface SkeletonProps {
  variant?: 'line' | 'circle' | 'rectangle';
  width?: string;
  height?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'line',
  width,
  height,
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'circle':
        return 'rounded-full';
      case 'rectangle':
        return 'rounded-none';
      default: // line
        return 'rounded-none';
    }
  };
  
  const defaultDimensions = () => {
    switch (variant) {
      case 'circle':
        return {
          width: width || 'w-12',
          height: height || 'h-12',
        };
      case 'rectangle':
        return {
          width: width || 'w-full',
          height: height || 'h-24',
        };
      default: // line
        return {
          width: width || 'w-full',
          height: height || 'h-4',
        };
    }
  };
  
  const { width: defaultWidth, height: defaultHeight } = defaultDimensions();
  
  return (
    <div
      className={`
        bg-gray-200 animate-pulse border border-black
        ${getVariantStyles()}
        ${width || defaultWidth}
        ${height || defaultHeight}
        ${className}
      `}
    />
  );
};

// Examples
export const LoaderExamples: React.FC = () => {
  const [progress, setProgress] = React.useState(45);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 5;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Loaders</h2>
      <p className="mb-8 font-sans">
        Loading indicator components with brutalist styling for various loading scenarios.
      </p>
      
      <div className="space-y-12">
        {/* Standard Spinner */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Standard Spinners</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Loader size="small" label="Small" />
            </div>
            <div className="flex flex-col items-center">
              <Loader size="medium" label="Medium" />
            </div>
            <div className="flex flex-col items-center">
              <Loader size="large" label="Large" />
            </div>
          </div>
        </div>
        
        {/* Variants */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Spinner Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Loader variant="default" label="Default" />
            </div>
            <div className="flex flex-col items-center">
              <Loader variant="bordered" label="Bordered" />
            </div>
            <div className="flex flex-col items-center">
              <Loader variant="cutout" label="Cutout" />
            </div>
          </div>
        </div>
        
        {/* Specialized Loaders */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Specialized Loaders</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <SpinningBoxLoader label="Spinning Boxes" />
            </div>
            <div className="flex flex-col items-center">
              <DottedLoader label="Dotted" />
            </div>
            <div className="flex flex-col items-center">
              <ProgressLoader 
                progress={progress} 
                label={`Loading... ${progress}%`}
                className="w-full max-w-xs"
              />
            </div>
          </div>
        </div>
        
        {/* Skeleton Loaders */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Skeleton Loaders</h3>
          <div className="space-y-4 max-w-lg">
            <Skeleton variant="line" />
            <Skeleton variant="line" />
            <Skeleton variant="line" width="w-2/3" />
            
            <div className="flex items-center mt-6 space-x-4">
              <Skeleton variant="circle" width="w-16" height="h-16" />
              <div className="flex-1 space-y-2">
                <Skeleton variant="line" height="h-6" />
                <Skeleton variant="line" width="w-3/4" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <Skeleton variant="rectangle" height="h-32" />
              <Skeleton variant="rectangle" height="h-32" />
              <Skeleton variant="rectangle" height="h-32" />
            </div>
          </div>
        </div>
        
        {/* Full Screen Overlay */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Full Screen Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-64 border-2 border-black p-4">
              <div className="mb-4">Click the button to show a loader:</div>
              <button
                className="px-4 py-2 border-2 border-black font-mono hover:bg-gray-100"
                onClick={() => {
                  alert('This would show a full-screen loader in a real application');
                }}
              >
                Show Full Screen Loader
              </button>
              
              <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
                <Loader label="Loading..." />
              </div>
            </div>
            
            <div className="relative h-64 border-2 border-black p-4 flex items-center justify-center">
              <ProgressLoader 
                progress={progress} 
                label="Loading Content..."
                className="w-3/4"
                size="large"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 