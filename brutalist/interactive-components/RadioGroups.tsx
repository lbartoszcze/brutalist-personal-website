import React, { useState } from 'react';

// Radio option interface
interface RadioOption {
  /**
   * Value of the radio option
   */
  value: string;
  /**
   * Label of the radio option
   */
  label: React.ReactNode;
  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
  /**
   * Help text for the option
   */
  helpText?: React.ReactNode;
}

// RadioGroup props
interface RadioGroupProps {
  /**
   * Name of the radio group
   */
  name: string;
  /**
   * Options for the radio group
   */
  options: RadioOption[];
  /**
   * Currently selected value
   */
  value?: string;
  /**
   * Default selected value
   */
  defaultValue?: string;
  /**
   * Change handler
   */
  onChange?: (value: string) => void;
  /**
   * Group label
   */
  label?: React.ReactNode;
  /**
   * Layout of the radio options
   */
  layout?: 'vertical' | 'horizontal' | 'grid';
  /**
   * Number of columns when layout is grid
   */
  columns?: 2 | 3 | 4;
  /**
   * Whether the radio group is disabled
   */
  disabled?: boolean;
  /**
   * Error message
   */
  error?: string;
  /**
   * Required field
   */
  required?: boolean;
  /**
   * Variant of the radio group
   */
  variant?: 'default' | 'bordered' | 'cutout';
  /**
   * Size of the radio options
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Custom class name
   */
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  defaultValue,
  onChange,
  label,
  layout = 'vertical',
  columns = 2,
  disabled = false,
  error,
  required = false,
  variant = 'default',
  size = 'medium',
  className = '',
}) => {
  // State for uncontrolled component
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');
  
  // Determine if component is controlled or uncontrolled
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : selectedValue;
  
  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (!isControlled) {
      setSelectedValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }
  };
  
  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black p-4 transform rotate-[-0.5deg]';
      default:
        return '';
    }
  };
  
  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'large':
        return 'text-lg';
      case 'medium':
      default:
        return 'text-base';
    }
  };
  
  // Get layout styles
  const getLayoutStyles = () => {
    switch (layout) {
      case 'horizontal':
        return 'flex flex-wrap space-x-4';
      case 'grid':
        return `grid grid-cols-1 md:grid-cols-${columns} gap-4`;
      case 'vertical':
      default:
        return 'space-y-2';
    }
  };
  
  return (
    <div className={`${className}`}>
      {/* Group label */}
      {label && (
        <div className="mb-2 font-mono font-bold">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </div>
      )}
      
      {/* Radio options container */}
      <div className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${getLayoutStyles()}
      `}>
        {options.map((option) => (
          <div 
            key={option.value} 
            className={`
              ${layout === 'horizontal' ? 'mr-4' : ''}
              ${disabled || option.disabled ? 'opacity-60' : ''}
            `}
          >
            <label className="flex items-start cursor-pointer">
              {/* Radio input (hidden) */}
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={currentValue === option.value}
                onChange={handleChange}
                disabled={disabled || option.disabled}
                className="sr-only"
                aria-describedby={option.helpText ? `${name}-${option.value}-description` : undefined}
              />
              
              {/* Custom radio button */}
              <span className={`
                relative inline-block w-5 h-5 flex-shrink-0 mt-0.5
                border-2 border-black bg-white
                ${currentValue === option.value ? 'bg-black' : 'bg-white'}
              `}>
                {currentValue === option.value && (
                  <span className="absolute inset-1 bg-white"></span>
                )}
              </span>
              
              {/* Label and optional help text */}
              <span className="ml-2">
                <span className="font-mono">{option.label}</span>
                
                {option.helpText && (
                  <span 
                    id={`${name}-${option.value}-description`}
                    className="block text-sm text-gray-500 mt-1"
                  >
                    {option.helpText}
                  </span>
                )}
              </span>
            </label>
          </div>
        ))}
      </div>
      
      {/* Error message */}
      {error && (
        <div className="mt-1 text-sm text-red-600 font-mono">
          {error}
        </div>
      )}
    </div>
  );
};

// Card radio group variant
interface CardRadioOption extends Omit<RadioOption, 'label'> {
  /**
   * Card title
   */
  title: React.ReactNode;
  /**
   * Card description
   */
  description?: React.ReactNode;
  /**
   * Icon to display
   */
  icon?: React.ReactNode;
  /**
   * Extra content to display in the card
   */
  extra?: React.ReactNode;
}

interface CardRadioGroupProps extends Omit<RadioGroupProps, 'options'> {
  /**
   * Card options for the radio group
   */
  options: CardRadioOption[];
}

export const CardRadioGroup: React.FC<CardRadioGroupProps> = ({
  options,
  ...radioGroupProps
}) => {
  // State for uncontrolled component
  const [selectedValue, setSelectedValue] = useState(radioGroupProps.defaultValue || '');
  
  // Determine if component is controlled or uncontrolled
  const isControlled = radioGroupProps.value !== undefined;
  const currentValue = isControlled ? radioGroupProps.value : selectedValue;
  
  // Handle change
  const handleChange = (value: string) => {
    if (!isControlled) {
      setSelectedValue(value);
    }
    
    if (radioGroupProps.onChange) {
      radioGroupProps.onChange(value);
    }
  };
  
  // Get variant styles
  const getVariantStyles = () => {
    switch (radioGroupProps.variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Convert card options to radio options
  const radioOptions = options.map(option => ({
    value: option.value,
    label: (
      <div className="ml-2">
        {option.title}
        {option.description && (
          <div className="text-sm text-gray-500 mt-1">{option.description}</div>
        )}
      </div>
    ),
    disabled: option.disabled,
  }));
  
  return (
    <div className={radioGroupProps.className}>
      {/* Group label */}
      {radioGroupProps.label && (
        <div className="mb-2 font-mono font-bold">
          {radioGroupProps.label}
          {radioGroupProps.required && <span className="text-red-500 ml-1">*</span>}
        </div>
      )}
      
      {/* Cards grid */}
      <div className={`
        grid grid-cols-1 ${radioGroupProps.layout === 'grid' ? `md:grid-cols-${radioGroupProps.columns || 2}` : ''}
        gap-4
      `}>
        {options.map((option) => (
          <div
            key={option.value}
            className={`
              ${getVariantStyles()}
              p-4 relative
              ${currentValue === option.value ? 'bg-gray-100' : 'bg-white'}
              ${(radioGroupProps.disabled || option.disabled) ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
              transition-colors
            `}
            onClick={() => {
              if (!radioGroupProps.disabled && !option.disabled) {
                handleChange(option.value);
              }
            }}
          >
            <input
              type="radio"
              name={radioGroupProps.name}
              value={option.value}
              checked={currentValue === option.value}
              onChange={() => handleChange(option.value)}
              disabled={radioGroupProps.disabled || option.disabled}
              className="sr-only"
            />
            
            <div className="flex">
              {/* Radio indicator */}
              <div className="mr-4 mt-1">
                <div className={`
                  w-5 h-5 rounded-full border-2 border-black
                  ${currentValue === option.value ? 'bg-black' : 'bg-white'}
                  relative
                `}>
                  {currentValue === option.value && (
                    <div className="absolute inset-1 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-grow">
                {/* Icon and title */}
                <div className="flex items-center mb-1">
                  {option.icon && (
                    <div className="mr-2">{option.icon}</div>
                  )}
                  <div className="font-mono font-bold">{option.title}</div>
                </div>
                
                {/* Description */}
                {option.description && (
                  <div className="text-sm text-gray-600">
                    {option.description}
                  </div>
                )}
                
                {/* Extra content */}
                {option.extra && (
                  <div className="mt-2">
                    {option.extra}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Error message */}
      {radioGroupProps.error && (
        <div className="mt-1 text-sm text-red-600 font-mono">
          {radioGroupProps.error}
        </div>
      )}
    </div>
  );
};

// Segmented radio control
interface SegmentedRadioGroupProps extends Omit<RadioGroupProps, 'layout' | 'variant'> {
  /**
   * Full width display
   */
  fullWidth?: boolean;
}

export const SegmentedRadioGroup: React.FC<SegmentedRadioGroupProps> = ({
  options,
  fullWidth = false,
  ...radioGroupProps
}) => {
  // State for uncontrolled component
  const [selectedValue, setSelectedValue] = useState(radioGroupProps.defaultValue || '');
  
  // Determine if component is controlled or uncontrolled
  const isControlled = radioGroupProps.value !== undefined;
  const currentValue = isControlled ? radioGroupProps.value : selectedValue;
  
  // Handle change
  const handleChange = (value: string) => {
    if (!isControlled) {
      setSelectedValue(value);
    }
    
    if (radioGroupProps.onChange) {
      radioGroupProps.onChange(value);
    }
  };
  
  // Get size styles
  const getSizeStyles = () => {
    switch (radioGroupProps.size) {
      case 'small':
        return 'text-xs py-1 px-2';
      case 'large':
        return 'text-base py-2 px-4';
      case 'medium':
      default:
        return 'text-sm py-1.5 px-3';
    }
  };
  
  return (
    <div className={radioGroupProps.className}>
      {/* Group label */}
      {radioGroupProps.label && (
        <div className="mb-2 font-mono font-bold">
          {radioGroupProps.label}
          {radioGroupProps.required && <span className="text-red-500 ml-1">*</span>}
        </div>
      )}
      
      {/* Segmented control */}
      <div className={`
        inline-flex border-2 border-black overflow-hidden
        ${fullWidth ? 'w-full' : ''}
        ${radioGroupProps.disabled ? 'opacity-60' : ''}
      `}>
        {options.map((option, index) => (
          <React.Fragment key={option.value}>
            {/* Add divider between options */}
            {index > 0 && <div className="w-px bg-black"></div>}
            
            <label
              className={`
                relative ${fullWidth ? 'flex-1' : ''}
                ${getSizeStyles()}
                font-mono text-center cursor-pointer
                ${currentValue === option.value ? 'bg-black text-white' : 'bg-white text-black'}
                ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
                transition-colors
              `}
            >
              <input
                type="radio"
                name={radioGroupProps.name}
                value={option.value}
                checked={currentValue === option.value}
                onChange={() => handleChange(option.value)}
                disabled={radioGroupProps.disabled || option.disabled}
                className="sr-only"
              />
              {option.label}
            </label>
          </React.Fragment>
        ))}
      </div>
      
      {/* Error message */}
      {radioGroupProps.error && (
        <div className="mt-1 text-sm text-red-600 font-mono">
          {radioGroupProps.error}
        </div>
      )}
    </div>
  );
};

// Image radio group
interface ImageRadioOption extends Omit<RadioOption, 'label'> {
  /**
   * Image source URL
   */
  imageSrc: string;
  /**
   * Image alt text
   */
  imageAlt: string;
  /**
   * Caption for the image
   */
  caption?: React.ReactNode;
}

interface ImageRadioGroupProps extends Omit<RadioGroupProps, 'options'> {
  /**
   * Image options for the radio group
   */
  options: ImageRadioOption[];
  /**
   * Size of the images
   */
  imageSize?: 'small' | 'medium' | 'large';
}

export const ImageRadioGroup: React.FC<ImageRadioGroupProps> = ({
  options,
  imageSize = 'medium',
  ...radioGroupProps
}) => {
  // State for uncontrolled component
  const [selectedValue, setSelectedValue] = useState(radioGroupProps.defaultValue || '');
  
  // Determine if component is controlled or uncontrolled
  const isControlled = radioGroupProps.value !== undefined;
  const currentValue = isControlled ? radioGroupProps.value : selectedValue;
  
  // Handle change
  const handleChange = (value: string) => {
    if (!isControlled) {
      setSelectedValue(value);
    }
    
    if (radioGroupProps.onChange) {
      radioGroupProps.onChange(value);
    }
  };
  
  // Get image size styles
  const getImageSizeStyles = () => {
    switch (imageSize) {
      case 'small':
        return 'h-24';
      case 'large':
        return 'h-64';
      case 'medium':
      default:
        return 'h-40';
    }
  };
  
  // Get variant styles
  const getVariantStyles = () => {
    switch (radioGroupProps.variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return 'border-2 border-black';
    }
  };
  
  return (
    <div className={radioGroupProps.className}>
      {/* Group label */}
      {radioGroupProps.label && (
        <div className="mb-2 font-mono font-bold">
          {radioGroupProps.label}
          {radioGroupProps.required && <span className="text-red-500 ml-1">*</span>}
        </div>
      )}
      
      {/* Images grid */}
      <div className={`
        grid grid-cols-1 ${radioGroupProps.layout === 'grid' ? `md:grid-cols-${radioGroupProps.columns || 2}` : ''}
        gap-4
      `}>
        {options.map((option) => (
          <div
            key={option.value}
            className={`
              ${getVariantStyles()}
              relative overflow-hidden
              ${(radioGroupProps.disabled || option.disabled) ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
            `}
            onClick={() => {
              if (!radioGroupProps.disabled && !option.disabled) {
                handleChange(option.value);
              }
            }}
          >
            <input
              type="radio"
              name={radioGroupProps.name}
              value={option.value}
              checked={currentValue === option.value}
              onChange={() => handleChange(option.value)}
              disabled={radioGroupProps.disabled || option.disabled}
              className="sr-only"
            />
            
            {/* Selected indicator */}
            {currentValue === option.value && (
              <div className="absolute inset-0 border-4 border-black z-10"></div>
            )}
            
            {/* Image */}
            <div className={`${getImageSizeStyles()} overflow-hidden bg-gray-100`}>
              <img
                src={option.imageSrc}
                alt={option.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Caption */}
            {option.caption && (
              <div className="p-2 font-mono text-center border-t-2 border-black">
                {option.caption}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Error message */}
      {radioGroupProps.error && (
        <div className="mt-1 text-sm text-red-600 font-mono">
          {radioGroupProps.error}
        </div>
      )}
    </div>
  );
};

// Example implementation
export const RadioGroupsExamples: React.FC = () => {
  // State for examples
  const [basicValue, setBasicValue] = useState('option1');
  const [cardValue, setCardValue] = useState('card1');
  const [segmentedValue, setSegmentedValue] = useState('tab1');
  const [imageValue, setImageValue] = useState('image1');
  
  // Sample options for basic radio group
  const basicOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
    { value: 'option4', label: 'Option 4', helpText: 'Additional information about this option' },
  ];
  
  // Sample options for card radio group
  const cardOptions = [
    {
      value: 'card1',
      title: 'Basic Plan',
      description: '$10/month - For individuals and small projects',
      icon: <span className="text-xl">💼</span>,
      extra: <div className="text-sm font-mono mt-2 p-2 bg-gray-100">Includes 5GB storage</div>,
    },
    {
      value: 'card2',
      title: 'Pro Plan',
      description: '$25/month - For professional use with advanced features',
      icon: <span className="text-xl">🚀</span>,
      extra: <div className="text-sm font-mono mt-2 p-2 bg-gray-100">Includes 50GB storage</div>,
    },
    {
      value: 'card3',
      title: 'Enterprise Plan',
      description: '$100/month - For large organizations with premium support',
      icon: <span className="text-xl">🏢</span>,
      extra: <div className="text-sm font-mono mt-2 p-2 bg-gray-100">Includes 500GB storage</div>,
    },
  ];
  
  // Sample options for segmented radio group
  const segmentedOptions = [
    { value: 'tab1', label: 'Details' },
    { value: 'tab2', label: 'Settings' },
    { value: 'tab3', label: 'History' },
    { value: 'tab4', label: 'Statistics' },
  ];
  
  // Sample options for image radio group
  const imageOptions = [
    {
      value: 'image1',
      imageSrc: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      imageAlt: 'Portrait of a person',
      caption: 'Portrait Style',
    },
    {
      value: 'image2',
      imageSrc: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
      imageAlt: 'Landscape with mountains',
      caption: 'Landscape Style',
    },
    {
      value: 'image3',
      imageSrc: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3',
      imageAlt: 'Abstract pattern',
      caption: 'Abstract Style',
    },
  ];
  
  return (
    <div className="p-6 max-w-6xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Radio Group Components</h2>
      <p className="mb-8 font-sans">
        Radio group components with brutalist styling for selecting from multiple options.
      </p>
      
      <div className="space-y-16">
        {/* Basic Radio Group */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Radio Group</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Vertical Layout (Default)</h4>
              <RadioGroup
                name="basic-vertical"
                options={basicOptions}
                label="Select an option"
                value={basicValue}
                onChange={setBasicValue}
                variant="bordered"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Horizontal Layout</h4>
              <RadioGroup
                name="basic-horizontal"
                options={basicOptions.slice(0, 3)}
                label="Select an option"
                layout="horizontal"
                value={basicValue}
                onChange={setBasicValue}
                variant="bordered"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Grid Layout</h4>
              <RadioGroup
                name="basic-grid"
                options={basicOptions}
                label="Select an option"
                layout="grid"
                columns={2}
                value={basicValue}
                onChange={setBasicValue}
                variant="bordered"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">With Error</h4>
              <RadioGroup
                name="basic-error"
                options={basicOptions}
                label="Select an option"
                error="Please select a valid option"
                variant="bordered"
              />
            </div>
          </div>
        </div>
        
        {/* Radio Group Variants */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Radio Group Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Default</h4>
              <RadioGroup
                name="variant-default"
                options={basicOptions.slice(0, 3)}
                label="Default Variant"
                variant="default"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Bordered</h4>
              <RadioGroup
                name="variant-bordered"
                options={basicOptions.slice(0, 3)}
                label="Bordered Variant"
                variant="bordered"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Cutout</h4>
              <RadioGroup
                name="variant-cutout"
                options={basicOptions.slice(0, 3)}
                label="Cutout Variant"
                variant="cutout"
              />
            </div>
          </div>
        </div>
        
        {/* Card Radio Group */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Card Radio Group</h3>
          <CardRadioGroup
            name="card-radio"
            options={cardOptions}
            label="Select a plan"
            value={cardValue}
            onChange={setCardValue}
            layout="grid"
            columns={3}
            variant="bordered"
          />
        </div>
        
        {/* Segmented Radio Group */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Segmented Radio Group</h3>
          <div className="space-y-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Default Size</h4>
              <SegmentedRadioGroup
                name="segmented-default"
                options={segmentedOptions}
                label="View options"
                value={segmentedValue}
                onChange={setSegmentedValue}
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Full Width</h4>
              <SegmentedRadioGroup
                name="segmented-full"
                options={segmentedOptions}
                label="View options"
                value={segmentedValue}
                onChange={setSegmentedValue}
                fullWidth
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Different Sizes</h4>
              <div className="space-y-4">
                <SegmentedRadioGroup
                  name="segmented-small"
                  options={segmentedOptions.slice(0, 3)}
                  size="small"
                  value={segmentedValue}
                  onChange={setSegmentedValue}
                />
                
                <SegmentedRadioGroup
                  name="segmented-medium"
                  options={segmentedOptions.slice(0, 3)}
                  size="medium"
                  value={segmentedValue}
                  onChange={setSegmentedValue}
                />
                
                <SegmentedRadioGroup
                  name="segmented-large"
                  options={segmentedOptions.slice(0, 3)}
                  size="large"
                  value={segmentedValue}
                  onChange={setSegmentedValue}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Image Radio Group */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Image Radio Group</h3>
          <ImageRadioGroup
            name="image-radio"
            options={imageOptions}
            label="Select a style"
            value={imageValue}
            onChange={setImageValue}
            layout="grid"
            columns={3}
            variant="bordered"
          />
        </div>
      </div>
    </div>
  );
}; 