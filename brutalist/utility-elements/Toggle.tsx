import React from 'react';

interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'inset' | 'contrast';
  isChecked?: boolean;
  labelPosition?: 'left' | 'right';
  error?: string;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  description,
  size = 'medium',
  variant = 'default',
  isChecked,
  labelPosition = 'right',
  error,
  className = '',
  id,
  disabled = false,
  onChange,
  ...props
}) => {
  // Generate a random id if none is provided
  const inputId = id || `toggle-${Math.random().toString(36).substring(2, 9)}`;
  
  // Size classes
  const sizeClasses = {
    small: {
      container: 'text-sm',
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      thumbOffset: 'translate-x-5',
      label: labelPosition === 'left' ? 'mr-2' : 'ml-2',
    },
    medium: {
      container: 'text-base',
      track: 'w-10 h-5',
      thumb: 'w-4 h-4',
      thumbOffset: 'translate-x-6',
      label: labelPosition === 'left' ? 'mr-3' : 'ml-3',
    },
    large: {
      container: 'text-lg',
      track: 'w-12 h-6',
      thumb: 'w-5 h-5',
      thumbOffset: 'translate-x-7',
      label: labelPosition === 'left' ? 'mr-4' : 'ml-4',
    },
  };

  // Variant classes
  const variantClasses = {
    default: {
      track: {
        on: 'bg-black',
        off: 'bg-gray-300',
      },
      thumb: {
        on: 'bg-white border-2 border-black',
        off: 'bg-white border-2 border-black',
      },
    },
    inset: {
      track: {
        on: 'bg-black shadow-[inset_2px_2px_0px_rgba(0,0,0,0.2)]',
        off: 'bg-gray-300 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.2)]',
      },
      thumb: {
        on: 'bg-white border-2 border-black shadow-md',
        off: 'bg-white border-2 border-black shadow-md',
      },
    },
    contrast: {
      track: {
        on: 'bg-white border-2 border-black',
        off: 'bg-black border-2 border-black',
      },
      thumb: {
        on: 'bg-black',
        off: 'bg-white',
      },
    },
  };
  
  // Whether the toggle is checked
  const checked = props.checked !== undefined ? props.checked : isChecked;
  
  // Order of elements based on label position
  const labelOrder = labelPosition === 'left' ? 'order-first' : 'order-last';
  const toggleOrder = labelPosition === 'left' ? 'order-last' : 'order-first';
  
  return (
    <div className={`${className}`}>
      <div className={`flex items-start ${sizeClasses[size].container}`}>
        <div className={`flex items-center ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {/* Label and description */}
          {(label || description) && (
            <div className={`${sizeClasses[size].label} ${labelOrder}`}>
              {label && (
                <label 
                  htmlFor={inputId}
                  className={`
                    font-mono ${size === 'large' ? 'font-bold' : ''}
                    ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {label}
                </label>
              )}
              {description && (
                <p className="text-sm text-gray-600 mt-0.5 font-sans">
                  {description}
                </p>
              )}
            </div>
          )}
          
          {/* Toggle control */}
          <div className={`relative ${toggleOrder}`}>
            {/* Hidden actual checkbox */}
            <input
              type="checkbox"
              id={inputId}
              checked={checked}
              disabled={disabled}
              onChange={onChange}
              className="sr-only"
              {...props}
            />
            
            {/* Custom toggle */}
            <div 
              className={`
                ${sizeClasses[size].track} 
                ${checked 
                  ? variantClasses[variant].track.on 
                  : variantClasses[variant].track.off
                }
                relative transition-colors duration-200 rounded-none
                ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {/* Thumb/handle */}
              <div 
                className={`
                  ${sizeClasses[size].thumb}
                  ${checked 
                    ? variantClasses[variant].thumb.on 
                    : variantClasses[variant].thumb.off
                  }
                  absolute left-0 top-1/2 -translate-y-1/2
                  transition-transform duration-200
                  ${checked ? sizeClasses[size].thumbOffset : 'translate-x-0'}
                `}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-600 font-mono">
          {error}
        </p>
      )}
    </div>
  );
};

// Define toggle state type for type safety
interface ToggleStates {
  default: boolean;
  checked: boolean;
  withDescription: boolean;
  disabled: boolean;
  withError: boolean;
  small: boolean;
  medium: boolean;
  large: boolean;
  defaultVariant: boolean;
  insetVariant: boolean;
  contrastVariant: boolean;
  rightLabel: boolean;
  leftLabel: boolean;
  [key: string]: boolean; // Index signature to allow string indexing
}

export const Toggles: React.FC = () => {
  const [toggleStates, setToggleStates] = React.useState<ToggleStates>({
    default: false,
    checked: true,
    withDescription: false,
    disabled: false,
    withError: false,
    
    small: false,
    medium: true,
    large: false,
    
    defaultVariant: true,
    insetVariant: false,
    contrastVariant: false,
    
    rightLabel: true,
    leftLabel: false,
  });
  
  const handleToggle = (toggle: string) => () => {
    setToggleStates(prev => ({
      ...prev,
      [toggle]: !prev[toggle]
    }));
  };
  
  return (
    <div className="p-6 max-w-3xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Toggle Switches</h2>
      <p className="mb-8 font-sans">
        Toggle switches with brutalist styling, featuring strong borders and clear visual states.
      </p>
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Toggles</h3>
          <div className="space-y-4">
            <Toggle 
              label="Default unchecked" 
              isChecked={toggleStates.default}
              onChange={handleToggle('default')}
            />
            
            <Toggle 
              label="Default checked" 
              isChecked={toggleStates.checked}
              onChange={handleToggle('checked')}
            />
            
            <Toggle 
              label="With description" 
              description="This is a helpful description that provides more context about this toggle switch."
              isChecked={toggleStates.withDescription}
              onChange={handleToggle('withDescription')}
            />
            
            <Toggle 
              label="Disabled state" 
              disabled
              isChecked={false}
            />
            
            <Toggle 
              label="Disabled and checked" 
              disabled
              isChecked={true}
            />
            
            <Toggle 
              label="With error" 
              isChecked={toggleStates.withError}
              onChange={handleToggle('withError')}
              error="This field has an error state"
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Toggle Sizes</h3>
          <div className="space-y-4">
            <Toggle 
              label="Small size" 
              size="small"
              isChecked={toggleStates.small}
              onChange={handleToggle('small')}
            />
            
            <Toggle 
              label="Medium size (default)" 
              size="medium"
              isChecked={toggleStates.medium}
              onChange={handleToggle('medium')}
            />
            
            <Toggle 
              label="Large size" 
              size="large"
              isChecked={toggleStates.large}
              onChange={handleToggle('large')}
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Toggle Variants</h3>
          <div className="space-y-4">
            <Toggle 
              label="Default variant" 
              variant="default"
              isChecked={toggleStates.defaultVariant}
              onChange={handleToggle('defaultVariant')}
            />
            
            <Toggle 
              label="Inset variant" 
              variant="inset"
              isChecked={toggleStates.insetVariant}
              onChange={handleToggle('insetVariant')}
            />
            
            <Toggle 
              label="Contrast variant" 
              variant="contrast"
              isChecked={toggleStates.contrastVariant}
              onChange={handleToggle('contrastVariant')}
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Label Positions</h3>
          <div className="space-y-4">
            <Toggle 
              label="Label on right (default)" 
              labelPosition="right"
              isChecked={toggleStates.rightLabel}
              onChange={handleToggle('rightLabel')}
            />
            
            <Toggle 
              label="Label on left" 
              labelPosition="left"
              isChecked={toggleStates.leftLabel}
              onChange={handleToggle('leftLabel')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 