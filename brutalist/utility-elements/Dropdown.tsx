import React, { useState, useRef, useEffect } from 'react';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'inset' | 'cutout';
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  size = 'medium',
  variant = 'default',
  required = false,
  disabled = false,
  className = '',
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Generate a random id if none is provided
  const dropdownId = id || `dropdown-${Math.random().toString(36).substring(2, 9)}`;
  
  // Update internal state when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Handle option selection
  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;
    
    setSelectedValue(option.value);
    setIsOpen(false);
    
    if (onChange) {
      onChange(option.value);
    }
  };
  
  // Get selected option label
  const getSelectedLabel = () => {
    if (!selectedValue) return placeholder;
    
    const selectedOption = options.find(option => option.value === selectedValue);
    return selectedOption ? selectedOption.label : placeholder;
  };
  
  // Size classes
  const sizeClasses = {
    small: {
      button: 'py-1 px-2 text-sm',
      dropdown: 'text-sm'
    },
    medium: {
      button: 'py-2 px-3 text-base',
      dropdown: 'text-base'
    },
    large: {
      button: 'py-3 px-4 text-lg',
      dropdown: 'text-lg'
    }
  };
  
  // Variant classes
  const variantClasses = {
    default: 'border-2 border-black bg-white',
    inset: 'border-2 border-black bg-white shadow-[inset_2px_2px_0px_rgba(0,0,0,0.2)]',
    cutout: 'border-2 border-black bg-white transform rotate-[-1deg]',
  };
  
  return (
    <div className={`${className}`}>
      {label && (
        <label 
          htmlFor={dropdownId}
          className="block mb-1 font-mono"
        >
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      
      <div 
        ref={dropdownRef}
        className="relative"
      >
        {/* Trigger button */}
        <button
          id={dropdownId}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
            w-full flex items-center justify-between font-mono
            ${sizeClasses[size].button}
            ${variantClasses[variant]}
            ${error ? 'border-red-600' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
          `}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={selectedValue ? '' : 'text-gray-500'}>
            {getSelectedLabel()}
          </span>
          <span className="ml-2">▼</span>
        </button>
        
        {/* Dropdown panel */}
        {isOpen && (
          <div 
            className={`
              absolute z-10 w-full mt-1 max-h-60 overflow-auto
              ${variantClasses[variant]}
              ${sizeClasses[size].dropdown}
            `}
          >
            <ul role="listbox">
              {options.map((option) => (
                <li 
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`
                    py-2 px-3 font-mono
                    ${option.disabled 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'cursor-pointer hover:bg-gray-100'}
                    ${selectedValue === option.value ? 'bg-black text-white' : ''}
                  `}
                  role="option"
                  aria-selected={selectedValue === option.value}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
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

export const Dropdowns: React.FC = () => {
  // Sample options
  const fruitOptions: DropdownOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'durian', label: 'Durian', disabled: true },
    { value: 'elderberry', label: 'Elderberry' },
  ];
  
  const countryOptions: DropdownOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' },
    { value: 'jp', label: 'Japan' },
    { value: 'au', label: 'Australia' },
  ];
  
  // State for each dropdown
  const [fruit, setFruit] = useState('banana');
  const [country, setCountry] = useState('');
  const [size, setSize] = useState('medium');
  const [variant, setVariant] = useState('default');
  
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Dropdowns</h2>
      <p className="mb-8 font-sans">
        Selection dropdowns with brutalist styling, featuring strong borders and clear selection states.
      </p>
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Dropdowns</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Dropdown
                label="Select a fruit"
                options={fruitOptions}
                value={fruit}
                onChange={setFruit}
                required
              />
              <p className="mt-2 font-mono text-sm">Selected: {fruit || 'None'}</p>
            </div>
            
            <div>
              <Dropdown
                label="Select a country"
                options={countryOptions}
                value={country}
                onChange={setCountry}
                placeholder="Choose your country"
              />
              <p className="mt-2 font-mono text-sm">Selected: {country || 'None'}</p>
            </div>
            
            <div>
              <Dropdown
                label="Dropdown with error"
                options={fruitOptions}
                error="This field is required"
              />
            </div>
            
            <div>
              <Dropdown
                label="Disabled dropdown"
                options={fruitOptions}
                disabled
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Dropdown Sizes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Dropdown
                label="Small"
                options={fruitOptions}
                size="small"
              />
            </div>
            
            <div>
              <Dropdown
                label="Medium (default)"
                options={fruitOptions}
                size="medium"
              />
            </div>
            
            <div>
              <Dropdown
                label="Large"
                options={fruitOptions}
                size="large"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Dropdown Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Dropdown
                label="Default variant"
                options={fruitOptions}
                variant="default"
              />
            </div>
            
            <div>
              <Dropdown
                label="Inset variant"
                options={fruitOptions}
                variant="inset"
              />
            </div>
            
            <div>
              <Dropdown
                label="Cutout variant"
                options={fruitOptions}
                variant="cutout"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Controlled Dropdowns</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="mb-2 font-mono">Size Selection:</p>
              <Dropdown
                label="Select size"
                options={[
                  { value: 'small', label: 'Small' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'large', label: 'Large' },
                ]}
                value={size}
                onChange={setSize}
              />
              
              <div className="mt-4">
                <p className="mb-2 font-mono">Result:</p>
                <Dropdown
                  options={fruitOptions}
                  size={size as 'small' | 'medium' | 'large'}
                />
              </div>
            </div>
            
            <div>
              <p className="mb-2 font-mono">Variant Selection:</p>
              <Dropdown
                label="Select variant"
                options={[
                  { value: 'default', label: 'Default' },
                  { value: 'inset', label: 'Inset' },
                  { value: 'cutout', label: 'Cutout' },
                ]}
                value={variant}
                onChange={setVariant}
              />
              
              <div className="mt-4">
                <p className="mb-2 font-mono">Result:</p>
                <Dropdown
                  options={fruitOptions}
                  variant={variant as 'default' | 'inset' | 'cutout'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 