import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'segmented' | 'stepped';
  color?: 'default' | 'success' | 'warning' | 'danger';
  animated?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = false,
  size = 'medium',
  variant = 'default',
  color = 'default',
  animated = false,
  className = ''
}) => {
  // Ensure value is between 0 and max
  const clampedValue = Math.min(Math.max(0, value), max);
  const percentage = (clampedValue / max) * 100;
  
  // Size classes
  const sizeClasses = {
    small: 'h-2',
    medium: 'h-4',
    large: 'h-6',
  };
  
  // Color classes
  const colorClasses = {
    default: 'bg-black',
    success: 'bg-green-600',
    warning: 'bg-yellow-500',
    danger: 'bg-red-600',
  };

  // Segment configuration for segmented variant
  const segments = variant === 'segmented' ? 10 : 0;
  
  // Step configuration for stepped variant
  const steps = variant === 'stepped' ? 5 : 0;
  const activeSteps = Math.floor((steps * percentage) / 100);
  
  return (
    <div className={className}>
      {/* Label and value display */}
      {(label || showValue) && (
        <div className="flex justify-between mb-1">
          {label && (
            <span className="font-mono">{label}</span>
          )}
          {showValue && (
            <span className="font-mono">{clampedValue}/{max}</span>
          )}
        </div>
      )}
      
      {/* Progress bar container */}
      <div 
        className={`
          w-full border-2 border-black bg-white overflow-hidden
          ${variant === 'stepped' ? 'flex gap-1' : ''}
        `}
      >
        {/* For default and segmented variants */}
        {variant !== 'stepped' && (
          <div 
            className={`
              ${colorClasses[color]} 
              ${sizeClasses[size]} 
              ${animated ? 'transition-all duration-500 ease-in-out' : ''}
              ${variant === 'segmented' ? 'flex' : ''}
            `}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
          >
            {/* Segments for segmented variant */}
            {variant === 'segmented' && (
              Array.from({ length: segments }).map((_, index) => (
                <div 
                  key={index} 
                  className={`
                    flex-1 h-full 
                    ${index % 2 === 0 ? colorClasses[color] : 'bg-black'}
                    ${index < segments - 1 ? 'border-r border-white' : ''}
                  `}
                />
              ))
            )}
          </div>
        )}
        
        {/* For stepped variant */}
        {variant === 'stepped' && (
          Array.from({ length: steps }).map((_, index) => (
            <div 
              key={index}
              className={`
                flex-1 ${sizeClasses[size]}
                ${index < activeSteps ? colorClasses[color] : 'bg-gray-200'}
                ${animated ? 'transition-colors duration-300' : ''}
              `}
              role={index === 0 ? "progressbar" : undefined}
              aria-valuenow={index === 0 ? value : undefined}
              aria-valuemin={index === 0 ? 0 : undefined}
              aria-valuemax={index === 0 ? max : undefined}
            />
          ))
        )}
      </div>
    </div>
  );
};

export const IndeterminateProgressBar: React.FC<{
  size?: 'small' | 'medium' | 'large';
  color?: 'default' | 'success' | 'warning' | 'danger';
  label?: string;
  className?: string;
}> = ({
  size = 'medium',
  color = 'default',
  label,
  className = ''
}) => {
  // Size classes
  const sizeClasses = {
    small: 'h-2',
    medium: 'h-4',
    large: 'h-6',
  };
  
  // Color classes
  const colorClasses = {
    default: 'bg-black',
    success: 'bg-green-600',
    warning: 'bg-yellow-500',
    danger: 'bg-red-600',
  };
  
  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <div className="mb-1">
          <span className="font-mono">{label}</span>
        </div>
      )}
      
      {/* Indeterminate progress bar */}
      <div 
        className={`
          w-full border-2 border-black bg-white overflow-hidden
          ${sizeClasses[size]}
          relative
        `}
      >
        <div 
          className={`
            ${colorClasses[color]} 
            absolute top-0 bottom-0
            animate-indeterminate
          `}
          style={{ width: '40%' }}
          role="progressbar"
          aria-busy="true"
          aria-valuetext="Loading..."
        />
      </div>
    </div>
  );
};

// Define animation for indeterminate progress bar
const animationStyles = `
  @keyframes indeterminate {
    0% {
      left: -40%;
    }
    100% {
      left: 100%;
    }
  }
  .animate-indeterminate {
    animation: indeterminate 1.5s infinite linear;
  }
`;

export const ProgressBars: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl">
      {/* Include animation styles */}
      <style>{animationStyles}</style>
      
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Progress Bars</h2>
      <p className="mb-8 font-sans">
        Progress indicators with brutalist styling, featuring strong borders and clear visual representation.
      </p>
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Progress Bars</h3>
          <div className="space-y-4 max-w-xl">
            <ProgressBar 
              value={25} 
              label="25% Complete"
            />
            
            <ProgressBar 
              value={50} 
              label="With Value Display"
              showValue
            />
            
            <ProgressBar 
              value={75} 
              max={200}
              label="Custom Maximum"
              showValue
            />
            
            <ProgressBar 
              value={100} 
              label="Completed"
              showValue
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Progress Bar Sizes</h3>
          <div className="space-y-4 max-w-xl">
            <ProgressBar 
              value={60} 
              label="Small"
              size="small"
            />
            
            <ProgressBar 
              value={60} 
              label="Medium (default)"
              size="medium"
            />
            
            <ProgressBar 
              value={60} 
              label="Large"
              size="large"
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Progress Bar Colors</h3>
          <div className="space-y-4 max-w-xl">
            <ProgressBar 
              value={65} 
              label="Default"
              color="default"
              showValue
            />
            
            <ProgressBar 
              value={65} 
              label="Success"
              color="success"
              showValue
            />
            
            <ProgressBar 
              value={65} 
              label="Warning"
              color="warning"
              showValue
            />
            
            <ProgressBar 
              value={65} 
              label="Danger"
              color="danger"
              showValue
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Progress Bar Variants</h3>
          <div className="space-y-4 max-w-xl">
            <ProgressBar 
              value={70} 
              label="Default"
              variant="default"
              showValue
            />
            
            <ProgressBar 
              value={70} 
              label="Segmented"
              variant="segmented"
              showValue
            />
            
            <ProgressBar 
              value={70} 
              label="Stepped"
              variant="stepped"
              showValue
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Animated Progress</h3>
          <div className="space-y-4 max-w-xl">
            <ProgressBar 
              value={45} 
              label="Animated Default"
              animated
              showValue
            />
            
            <ProgressBar 
              value={45} 
              label="Animated Stepped"
              variant="stepped"
              animated
              showValue
            />
            
            <div className="mt-6">
              <h4 className="text-lg font-mono mb-2">Indeterminate Progress:</h4>
              <IndeterminateProgressBar 
                label="Loading..."
              />
            </div>
            
            <div>
              <IndeterminateProgressBar 
                label="Processing..."
                size="large"
                color="success"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 