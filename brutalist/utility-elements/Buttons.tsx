import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  isBlock?: boolean;
  isDisabled?: boolean;
  hasOffset?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  isBlock = false,
  isDisabled = false,
  hasOffset = false,
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-white text-black border-2 border-black hover:bg-gray-100',
    tertiary: 'bg-transparent text-black underline hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  const sizeClasses = {
    small: 'py-1 px-3 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-lg'
  };

  const offsetClasses = hasOffset ? 'translate-x-1 translate-y-1' : '';
  const blockClasses = isBlock ? 'w-full' : '';
  
  return (
    <button
      className={`
        font-mono font-bold uppercase 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${blockClasses}
        ${offsetClasses}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
        transition-transform duration-100 ease-in-out
        active:translate-x-0.5 active:translate-y-0.5
      `}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Button with shadow effect
export const ShadowButton: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  isBlock = false,
  isDisabled = false,
  hasOffset = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`relative inline-block ${isBlock ? 'w-full' : ''}`}>
      <div className="absolute inset-0 bg-black translate-x-2 translate-y-2"></div>
      <Button
        variant={variant}
        size={size}
        isBlock={isBlock}
        isDisabled={isDisabled}
        hasOffset={hasOffset}
        className={`relative z-10 border-2 border-black ${className}`}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};

// Button with cutout effect
export const CutoutButton: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  isBlock = false,
  isDisabled = false,
  hasOffset = false,
  className = '',
  ...props
}) => {
  const bgColor = variant === 'primary' || variant === 'danger' ? 'bg-white' : 'bg-black';
  const textColor = variant === 'primary' || variant === 'danger' ? 'text-black' : 'text-white';
  
  return (
    <button
      className={`
        font-mono font-bold uppercase 
        ${sizeClasses[size]} 
        ${isBlock ? 'w-full' : ''}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
        border-2 border-black
        relative overflow-hidden
        transition-transform duration-100 ease-in-out
        active:translate-x-0.5 active:translate-y-0.5
      `}
      disabled={isDisabled}
      {...props}
    >
      <span className={`relative z-10 ${textColor}`}>
        {children}
      </span>
      <span className={`absolute inset-0 ${bgColor} -rotate-3 scale-110`}></span>
    </button>
  );
};

export const Buttons: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-8 uppercase">Brutalist Buttons</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Standard Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Button Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Shadow Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <ShadowButton>Primary</ShadowButton>
            <ShadowButton variant="secondary">Secondary</ShadowButton>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Cutout Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <CutoutButton>Primary</CutoutButton>
            <CutoutButton variant="secondary">Secondary</CutoutButton>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Block Buttons</h3>
          <div className="space-y-4 max-w-md">
            <Button isBlock>Block Button</Button>
            <ShadowButton isBlock>Block Shadow Button</ShadowButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const sizeClasses = {
  small: 'py-1 px-3 text-sm',
  medium: 'py-2 px-4 text-base',
  large: 'py-3 px-6 text-lg'
}; 