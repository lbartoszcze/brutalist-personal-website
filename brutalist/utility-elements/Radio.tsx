import React from 'react';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'inset' | 'cutout';
  error?: string;
  className?: string;
}

export const Radio: React.FC<RadioProps> = ({
  label,
  description,
  size = 'medium',
  variant = 'default',
  error,
  className = '',
  id,
  disabled = false,
  ...props
}) => {
  // Generate a random id if none is provided
  const inputId = id || `radio-${Math.random().toString(36).substring(2, 9)}`;
  
  // Size classes
  const sizeClasses = {
    small: {
      container: 'text-sm',
      radio: 'w-4 h-4',
      label: 'ml-2',
    },
    medium: {
      container: 'text-base',
      radio: 'w-5 h-5',
      label: 'ml-2.5',
    },
    large: {
      container: 'text-lg',
      radio: 'w-6 h-6',
      label: 'ml-3',
    },
  };

  // Variant classes
  const variantClasses = {
    default: 'border-2 border-black bg-white rounded-full',
    inset: 'border-2 border-black bg-white rounded-full shadow-[inset_2px_2px_0px_rgba(0,0,0,0.2)]',
    cutout: 'border-2 border-black bg-white rounded-full transform rotate-[-1deg]',
  };
  
  return (
    <div className={`${className}`}>
      <div className={`flex items-start ${sizeClasses[size].container}`}>
        <div className="relative flex items-center justify-center">
          {/* Hidden actual radio */}
          <input
            type="radio"
            id={inputId}
            disabled={disabled}
            className="sr-only"
            {...props}
          />
          
          {/* Custom radio */}
          <div 
            className={`
              ${sizeClasses[size].radio} 
              ${variantClasses[variant]}
              flex items-center justify-center
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {props.checked && (
              <div 
                className={`
                  bg-black rounded-full
                  ${size === 'small' ? 'w-2 h-2' : ''}
                  ${size === 'medium' ? 'w-2.5 h-2.5' : ''}
                  ${size === 'large' ? 'w-3 h-3' : ''}
                `}
              />
            )}
          </div>
          
          {/* Label and description */}
          {(label || description) && (
            <div className={`${sizeClasses[size].label}`}>
              {label && (
                <label 
                  htmlFor={inputId}
                  className={`
                    font-mono ${size === 'large' ? 'font-bold' : ''}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
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

// Radio group component
export const RadioGroup: React.FC<{
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  error?: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}> = ({
  label,
  name,
  value,
  onChange,
  children,
  error,
  orientation = 'vertical',
  className = '',
}) => {
  // Clone children to inject name, checked state, and onChange handler
  const radioButtons = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.type === Radio) {
      return React.cloneElement(child as React.ReactElement<any>, {
        name,
        checked: child.props.value === value,
        onChange,
      });
    }
    return child;
  });

  return (
    <fieldset className={`${className}`}>
      {label && (
        <legend className="mb-2 font-mono font-bold">{label}</legend>
      )}
      
      <div className={`
        flex ${orientation === 'horizontal' ? 'flex-row flex-wrap gap-4' : 'flex-col gap-2'}
      `}>
        {radioButtons}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 font-mono">
          {error}
        </p>
      )}
    </fieldset>
  );
};

export const Radios: React.FC = () => {
  const [selectedFruit, setSelectedFruit] = React.useState('banana');
  const [selectedSize, setSelectedSize] = React.useState('medium');
  const [selectedVariant, setSelectedVariant] = React.useState('inset');
  const [orientation, setOrientation] = React.useState('vertical');
  
  return (
    <div className="p-6 max-w-3xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Radio Buttons</h2>
      <p className="mb-8 font-sans">
        Radio buttons with brutalist styling, featuring strong borders and clear visual states.
      </p>
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Radio Buttons</h3>
          <div className="space-y-4">
            <RadioGroup
              label="Select a fruit"
              name="fruit"
              value={selectedFruit}
              onChange={(e) => setSelectedFruit(e.target.value)}
            >
              <Radio 
                label="Apple" 
                value="apple" 
              />
              
              <Radio 
                label="Banana" 
                value="banana" 
              />
              
              <Radio 
                label="Cherry" 
                value="cherry" 
                description="A small, round stone fruit that is typically bright or dark red."
              />
              
              <Radio 
                label="Disabled option" 
                value="disabled"
                disabled
              />
            </RadioGroup>
            
            <div className="mt-4 p-4 border-2 border-black bg-gray-50">
              <p className="font-mono">Selected value: <span className="font-bold">{selectedFruit}</span></p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Radio Button Sizes</h3>
          <div className="space-y-4">
            <RadioGroup
              label="Select a size"
              name="size"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <Radio 
                label="Small" 
                value="small"
                size="small"
              />
              
              <Radio 
                label="Medium (default)" 
                value="medium"
                size="medium"
              />
              
              <Radio 
                label="Large" 
                value="large"
                size="large"
              />
            </RadioGroup>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Radio Button Variants</h3>
          <div className="space-y-4">
            <RadioGroup
              label="Select a variant"
              name="variant"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
            >
              <Radio 
                label="Default variant" 
                value="default"
                variant="default"
              />
              
              <Radio 
                label="Inset variant" 
                value="inset"
                variant="inset"
              />
              
              <Radio 
                label="Cutout variant" 
                value="cutout"
                variant="cutout"
              />
            </RadioGroup>
            
            <div className="mt-4 p-4 border-2 border-black bg-gray-50">
              <p className="font-mono">Current radio variant: <span className="font-bold">{selectedVariant}</span></p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Radio Group Orientation</h3>
          <div className="space-y-6">
            <RadioGroup
              label="Select orientation"
              name="orientation"
              value={orientation}
              onChange={(e) => setOrientation(e.target.value)}
              orientation="horizontal"
            >
              <Radio 
                label="Vertical" 
                value="vertical"
              />
              
              <Radio 
                label="Horizontal" 
                value="horizontal"
              />
            </RadioGroup>
            
            <div>
              <h4 className="mb-3 text-base font-mono font-bold">{orientation === 'vertical' ? 'Vertical' : 'Horizontal'} Example:</h4>
              <RadioGroup
                label="Select a color"
                name="color-example"
                value="black"
                onChange={() => {}}
                orientation={orientation as 'horizontal' | 'vertical'}
                error={orientation === 'horizontal' ? 'Example error message for horizontal layout' : undefined}
              >
                <Radio label="Black" value="black" />
                <Radio label="White" value="white" />
                <Radio label="Gray" value="gray" />
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 