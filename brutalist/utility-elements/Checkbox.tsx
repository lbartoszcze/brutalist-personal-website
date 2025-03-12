import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'inset' | 'cutout';
  isChecked?: boolean;
  isIndeterminate?: boolean;
  error?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  size = 'medium',
  variant = 'default',
  isChecked,
  isIndeterminate,
  error,
  className = '',
  id,
  disabled = false,
  onChange,
  ...props
}) => {
  // Generate a random id if none is provided
  const inputId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
  
  // Reference to the checkbox input
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  // Set indeterminate state (not controllable via HTML attribute)
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!isIndeterminate;
    }
  }, [isIndeterminate]);
  
  // Size classes
  const sizeClasses = {
    small: {
      container: 'text-sm',
      checkbox: 'w-4 h-4',
      label: 'ml-2',
    },
    medium: {
      container: 'text-base',
      checkbox: 'w-5 h-5',
      label: 'ml-2.5',
    },
    large: {
      container: 'text-lg',
      checkbox: 'w-6 h-6',
      label: 'ml-3',
    },
  };

  // Variant classes
  const variantClasses = {
    default: 'border-2 border-black bg-white',
    inset: 'border-2 border-black bg-white shadow-[inset_2px_2px_0px_rgba(0,0,0,0.2)]',
    cutout: 'border-2 border-black bg-white transform rotate-[-1deg]',
  };
  
  return (
    <div className={`${className}`}>
      <div className={`flex items-start ${sizeClasses[size].container}`}>
        <div className="relative flex items-center justify-center">
          {/* Hidden actual checkbox */}
          <input
            type="checkbox"
            id={inputId}
            ref={inputRef}
            checked={isChecked}
            disabled={disabled}
            onChange={onChange}
            className="sr-only"
            {...props}
          />
          
          {/* Custom checkbox */}
          <div 
            className={`
              ${sizeClasses[size].checkbox} 
              ${variantClasses[variant]}
              flex items-center justify-center
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {(isChecked || isIndeterminate) && (
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4"
                strokeLinecap="square" 
                strokeLinejoin="miter"
                className="w-full h-full p-0.5"
              >
                {isIndeterminate ? (
                  <line x1="5" y1="12" x2="19" y2="12" />
                ) : (
                  <polyline points="5,13 10,17 19,7" />
                )}
              </svg>
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

// Checkbox group component
export const CheckboxGroup: React.FC<{
  label?: string;
  children: React.ReactNode;
  error?: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}> = ({
  label,
  children,
  error,
  orientation = 'vertical',
  className = '',
}) => {
  return (
    <fieldset className={`${className}`}>
      {label && (
        <legend className="mb-2 font-mono font-bold">{label}</legend>
      )}
      
      <div className={`
        flex ${orientation === 'horizontal' ? 'flex-row flex-wrap gap-4' : 'flex-col gap-2'}
      `}>
        {children}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 font-mono">
          {error}
        </p>
      )}
    </fieldset>
  );
};

export const Checkboxes: React.FC = () => {
  const [checked, setChecked] = React.useState({
    option1: false,
    option2: true,
    option3: false,
    option4: false,
    indeterminate: false,
    
    fruit1: false,
    fruit2: false,
    fruit3: true,
    
    size1: true,
    size2: false,
    size3: false,
    
    variant1: false,
    variant2: true,
    variant3: false,
  });
  
  const handleChange = (option: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(prev => ({
      ...prev,
      [option]: e.target.checked
    }));
  };
  
  return (
    <div className="p-6 max-w-3xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Checkboxes</h2>
      <p className="mb-8 font-sans">
        Form checkboxes with brutalist styling, featuring strong borders and clear visual states.
      </p>
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Checkboxes</h3>
          <div className="space-y-4">
            <Checkbox 
              label="Default unchecked" 
              isChecked={checked.option1}
              onChange={handleChange('option1')}
            />
            
            <Checkbox 
              label="Default checked" 
              isChecked={checked.option2}
              onChange={handleChange('option2')}
            />
            
            <Checkbox 
              label="With description" 
              description="This is a helpful description that provides more context about the checkbox option."
              isChecked={checked.option3}
              onChange={handleChange('option3')}
            />
            
            <Checkbox 
              label="Disabled state" 
              disabled
            />
            
            <Checkbox 
              label="Indeterminate state" 
              isIndeterminate={true}
              onChange={handleChange('indeterminate')}
            />
            
            <Checkbox 
              label="With error" 
              isChecked={checked.option4}
              onChange={handleChange('option4')}
              error="This field is required"
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Checkbox Sizes</h3>
          <div className="space-y-4">
            <Checkbox 
              label="Small size" 
              size="small"
              isChecked={checked.size1}
              onChange={handleChange('size1')}
            />
            
            <Checkbox 
              label="Medium size (default)" 
              size="medium"
              isChecked={checked.size2}
              onChange={handleChange('size2')}
            />
            
            <Checkbox 
              label="Large size" 
              size="large"
              isChecked={checked.size3}
              onChange={handleChange('size3')}
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Checkbox Variants</h3>
          <div className="space-y-4">
            <Checkbox 
              label="Default variant" 
              variant="default"
              isChecked={checked.variant1}
              onChange={handleChange('variant1')}
            />
            
            <Checkbox 
              label="Inset variant" 
              variant="inset"
              isChecked={checked.variant2}
              onChange={handleChange('variant2')}
            />
            
            <Checkbox 
              label="Cutout variant" 
              variant="cutout"
              isChecked={checked.variant3}
              onChange={handleChange('variant3')}
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Checkbox Groups</h3>
          <div className="space-y-8">
            <CheckboxGroup label="Select fruits (vertical)">
              <Checkbox 
                label="Apple" 
                isChecked={checked.fruit1}
                onChange={handleChange('fruit1')}
              />
              <Checkbox 
                label="Banana" 
                isChecked={checked.fruit2}
                onChange={handleChange('fruit2')}
              />
              <Checkbox 
                label="Cherry" 
                isChecked={checked.fruit3}
                onChange={handleChange('fruit3')}
              />
            </CheckboxGroup>
            
            <CheckboxGroup 
              label="Select fruits (horizontal)" 
              orientation="horizontal"
              error="Please select at least one option"
            >
              <Checkbox 
                label="Apple" 
                isChecked={checked.fruit1}
                onChange={handleChange('fruit1')}
              />
              <Checkbox 
                label="Banana" 
                isChecked={checked.fruit2}
                onChange={handleChange('fruit2')}
              />
              <Checkbox 
                label="Cherry" 
                isChecked={checked.fruit3}
                onChange={handleChange('fruit3')}
              />
            </CheckboxGroup>
          </div>
        </div>
      </div>
    </div>
  );
}; 