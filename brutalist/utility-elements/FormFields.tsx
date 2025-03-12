import React from 'react';

// Text Input Props
interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'inset' | 'cutout';
  fullWidth?: boolean;
  required?: boolean;
  className?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  helperText,
  error,
  size = 'medium',
  variant = 'default',
  fullWidth = false,
  required = false,
  className = '',
  id,
  ...props
}) => {
  // Generate a random id if none is provided
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  // Size classes
  const sizeClasses = {
    small: 'py-1 px-2 text-sm',
    medium: 'py-2 px-3 text-base',
    large: 'py-2.5 px-4 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    default: 'border-2 border-black bg-white',
    inset: 'border-2 border-black bg-white shadow-[inset_2px_2px_0px_rgba(0,0,0,0.2)]',
    cutout: 'border-2 border-black bg-white transform rotate-[-0.5deg]',
  };
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block mb-1 font-mono"
        >
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        className={`
          font-mono
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${error ? 'border-red-600' : ''}
          ${fullWidth ? 'w-full' : ''}
          ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          focus:outline-none focus:ring-2 focus:ring-black
        `}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${inputId}-error` : 
          helperText ? `${inputId}-helper` : 
          undefined
        }
        required={required}
        {...props}
      />
      
      {helperText && !error && (
        <p 
          id={`${inputId}-helper`}
          className="mt-1 text-sm text-gray-600 font-sans"
        >
          {helperText}
        </p>
      )}
      
      {error && (
        <p 
          id={`${inputId}-error`}
          className="mt-1 text-sm text-red-600 font-mono"
        >
          {error}
        </p>
      )}
    </div>
  );
};

// Textarea Props
interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'inset' | 'cutout';
  fullWidth?: boolean;
  required?: boolean;
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  helperText,
  error,
  size = 'medium',
  variant = 'default',
  fullWidth = false,
  required = false,
  className = '',
  id,
  rows = 4,
  ...props
}) => {
  // Generate a random id if none is provided
  const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
  
  // Size classes
  const sizeClasses = {
    small: 'py-1 px-2 text-sm',
    medium: 'py-2 px-3 text-base',
    large: 'py-2.5 px-4 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    default: 'border-2 border-black bg-white',
    inset: 'border-2 border-black bg-white shadow-[inset_2px_2px_0px_rgba(0,0,0,0.2)]',
    cutout: 'border-2 border-black bg-white transform rotate-[-0.5deg]',
  };
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label 
          htmlFor={textareaId}
          className="block mb-1 font-mono"
        >
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        id={textareaId}
        rows={rows}
        className={`
          font-mono
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${error ? 'border-red-600' : ''}
          ${fullWidth ? 'w-full' : ''}
          ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          focus:outline-none focus:ring-2 focus:ring-black
          resize-y
        `}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${textareaId}-error` : 
          helperText ? `${textareaId}-helper` : 
          undefined
        }
        required={required}
        {...props}
      />
      
      {helperText && !error && (
        <p 
          id={`${textareaId}-helper`}
          className="mt-1 text-sm text-gray-600 font-sans"
        >
          {helperText}
        </p>
      )}
      
      {error && (
        <p 
          id={`${textareaId}-error`}
          className="mt-1 text-sm text-red-600 font-mono"
        >
          {error}
        </p>
      )}
    </div>
  );
};

// Select Props
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  label?: string;
  helperText?: string;
  error?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'inset' | 'cutout';
  fullWidth?: boolean;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  label,
  helperText,
  error,
  size = 'medium',
  variant = 'default',
  fullWidth = false,
  required = false,
  className = '',
  id,
  placeholder,
  ...props
}) => {
  // Generate a random id if none is provided
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
  
  // Size classes
  const sizeClasses = {
    small: 'py-1 pl-2 pr-8 text-sm',
    medium: 'py-2 pl-3 pr-8 text-base',
    large: 'py-2.5 pl-4 pr-8 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    default: 'border-2 border-black bg-white',
    inset: 'border-2 border-black bg-white shadow-[inset_2px_2px_0px_rgba(0,0,0,0.2)]',
    cutout: 'border-2 border-black bg-white transform rotate-[-0.5deg]',
  };
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label 
          htmlFor={selectId}
          className="block mb-1 font-mono"
        >
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          id={selectId}
          className={`
            font-mono appearance-none
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${error ? 'border-red-600' : ''}
            ${fullWidth ? 'w-full' : ''}
            ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            focus:outline-none focus:ring-2 focus:ring-black
          `}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${selectId}-error` : 
            helperText ? `${selectId}-helper` : 
            undefined
          }
          required={required}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <span className="text-black">▼</span>
        </div>
      </div>
      
      {helperText && !error && (
        <p 
          id={`${selectId}-helper`}
          className="mt-1 text-sm text-gray-600 font-sans"
        >
          {helperText}
        </p>
      )}
      
      {error && (
        <p 
          id={`${selectId}-error`}
          className="mt-1 text-sm text-red-600 font-mono"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export const FormFields: React.FC = () => {
  // Sample options for select
  const fruitOptions: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'durian', label: 'Durian', disabled: true },
    { value: 'elderberry', label: 'Elderberry' },
  ];
  
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Form Fields</h2>
      <p className="mb-8 font-sans">
        Input fields with brutalist styling, featuring strong borders and minimalist aesthetics.
      </p>
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Text Inputs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              label="Default Input"
              placeholder="Enter text here"
            />
            
            <TextInput
              label="Required Input"
              placeholder="This field is required"
              required
              helperText="This is helper text providing additional information."
            />
            
            <TextInput
              label="With Error"
              value="Invalid value"
              error="This field has an error"
            />
            
            <TextInput
              label="Disabled Input"
              placeholder="This input is disabled"
              disabled
            />
            
            <TextInput
              label="Full Width Input"
              placeholder="This input takes up the full width"
              fullWidth
            />
            
            <TextInput
              label="Password Input"
              type="password"
              placeholder="Enter password"
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Input Sizes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TextInput
              label="Small Input"
              placeholder="Small size"
              size="small"
            />
            
            <TextInput
              label="Medium Input (default)"
              placeholder="Medium size"
              size="medium"
            />
            
            <TextInput
              label="Large Input"
              placeholder="Large size"
              size="large"
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Input Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TextInput
              label="Default Variant"
              placeholder="Default variant"
              variant="default"
            />
            
            <TextInput
              label="Inset Variant"
              placeholder="Inset variant"
              variant="inset"
            />
            
            <TextInput
              label="Cutout Variant"
              placeholder="Cutout variant"
              variant="cutout"
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Textareas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Textarea
              label="Default Textarea"
              placeholder="Enter longer text here"
            />
            
            <Textarea
              label="Required Textarea"
              placeholder="This field is required"
              required
              helperText="This textarea supports markdown."
            />
            
            <Textarea
              label="With Error"
              value="This text is too short"
              error="Please enter at least 20 characters"
              rows={3}
            />
            
            <Textarea
              label="Disabled Textarea"
              placeholder="This textarea is disabled"
              disabled
            />
            
            <Textarea
              label="Inset Variant"
              placeholder="With inset styling"
              variant="inset"
              rows={3}
            />
            
            <Textarea
              label="Cutout Variant"
              placeholder="With cutout styling"
              variant="cutout"
              rows={3}
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Select Fields</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Default Select"
              options={fruitOptions}
            />
            
            <Select
              label="With Placeholder"
              options={fruitOptions}
              placeholder="Select a fruit"
            />
            
            <Select
              label="Required Select"
              options={fruitOptions}
              required
            />
            
            <Select
              label="With Error"
              options={fruitOptions}
              error="Please select an option"
            />
            
            <Select
              label="Inset Variant"
              options={fruitOptions}
              variant="inset"
            />
            
            <Select
              label="Cutout Variant"
              options={fruitOptions}
              variant="cutout"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 