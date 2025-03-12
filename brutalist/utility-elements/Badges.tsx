import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type BadgeSize = 'small' | 'medium' | 'large';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  isOutlined?: boolean;
  hasOffset?: boolean;
  hasBorder?: boolean;
  isRotated?: boolean;
  count?: number;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  isOutlined = false,
  hasOffset = false,
  hasBorder = true,
  isRotated = false,
  icon,
  className = '',
}) => {
  // Colors for different variants
  const variantClasses = {
    default: isOutlined 
      ? 'bg-white text-black' 
      : 'bg-black text-white',
    primary: isOutlined 
      ? 'bg-white text-blue-600' 
      : 'bg-blue-600 text-white',
    secondary: isOutlined 
      ? 'bg-white text-gray-600' 
      : 'bg-gray-600 text-white',
    success: isOutlined 
      ? 'bg-white text-green-600' 
      : 'bg-green-600 text-white',
    danger: isOutlined 
      ? 'bg-white text-red-600' 
      : 'bg-red-600 text-white',
    warning: isOutlined 
      ? 'bg-white text-yellow-600' 
      : 'bg-yellow-600 text-black',
    info: isOutlined 
      ? 'bg-white text-cyan-600' 
      : 'bg-cyan-600 text-white',
  };

  // Size classes
  const sizeClasses = {
    small: 'text-xs px-1.5 py-0.5',
    medium: 'text-sm px-2 py-1',
    large: 'text-base px-3 py-1.5',
  };

  // Border color based on variant
  const borderClasses = {
    default: 'border-black',
    primary: 'border-blue-600',
    secondary: 'border-gray-600',
    success: 'border-green-600',
    danger: 'border-red-600',
    warning: 'border-yellow-600',
    info: 'border-cyan-600',
  };

  return (
    <span 
      className={`
        inline-flex items-center font-mono font-bold uppercase
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${hasBorder ? `border-2 ${borderClasses[variant]}` : ''}
        ${hasOffset ? 'translate-x-0.5 translate-y-0.5' : ''}
        ${isRotated ? 'rotate-1' : ''}
        ${className}
      `}
    >
      {icon && (
        <span className="mr-1">{icon}</span>
      )}
      {children}
    </span>
  );
};

export const CountBadge: React.FC<{
  count: number;
  max?: number;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}> = ({
  count,
  max = 99,
  variant = 'danger',
  size = 'small',
  className = '',
}) => {
  const displayCount = count > max ? `${max}+` : count;
  
  return (
    <Badge 
      variant={variant} 
      size={size}
      className={`rounded-full min-w-5 h-5 flex items-center justify-center ${className}`}
    >
      {displayCount}
    </Badge>
  );
};

// Badge that can be used on an avatar or icon
export const DotBadge: React.FC<{
  variant?: BadgeVariant;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  className?: string;
}> = ({ 
  variant = 'danger',
  position = 'top-right',
  className = '',
}) => {
  const positionClasses = {
    'top-right': 'top-0 right-0 -translate-y-1/3 translate-x-1/3',
    'top-left': 'top-0 left-0 -translate-y-1/3 -translate-x-1/3',
    'bottom-right': 'bottom-0 right-0 translate-y-1/3 translate-x-1/3',
    'bottom-left': 'bottom-0 left-0 translate-y-1/3 -translate-x-1/3',
  };

  // Colors for different variants
  const variantColors = {
    default: 'bg-black',
    primary: 'bg-blue-600',
    secondary: 'bg-gray-600',
    success: 'bg-green-600',
    danger: 'bg-red-600',
    warning: 'bg-yellow-600',
    info: 'bg-cyan-600',
  };

  return (
    <span 
      className={`
        block absolute w-2.5 h-2.5 border border-black
        ${variantColors[variant]}
        ${positionClasses[position]}
        ${className}
      `}
    />
  );
};

export const Badges: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Badges</h2>
      <p className="mb-8 font-sans">
        Status and notification badges with brutalist styling, featuring strong borders and clear visual hierarchy.
      </p>
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Badge Variants</h3>
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Outlined Badges</h3>
          <div className="flex flex-wrap gap-4">
            <Badge isOutlined>Default</Badge>
            <Badge isOutlined variant="primary">Primary</Badge>
            <Badge isOutlined variant="secondary">Secondary</Badge>
            <Badge isOutlined variant="success">Success</Badge>
            <Badge isOutlined variant="danger">Danger</Badge>
            <Badge isOutlined variant="warning">Warning</Badge>
            <Badge isOutlined variant="info">Info</Badge>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Badge Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Badge size="small">Small</Badge>
            <Badge size="medium">Medium</Badge>
            <Badge size="large">Large</Badge>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Styled Badges</h3>
          <div className="flex flex-wrap gap-4">
            <Badge hasOffset>Offset</Badge>
            <Badge isRotated>Rotated</Badge>
            <Badge hasOffset isRotated>Offset & Rotated</Badge>
            <Badge hasBorder={false}>No Border</Badge>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Count Badges</h3>
          <div className="flex flex-wrap gap-8">
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <button className="relative px-4 py-2 border-2 border-black font-mono">
                  Inbox
                  <span className="absolute -top-2 -right-2">
                    <CountBadge count={5} />
                  </span>
                </button>
              </div>
              <p className="text-xs font-mono">Count: 5</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <button className="relative px-4 py-2 border-2 border-black font-mono">
                  Notifications
                  <span className="absolute -top-2 -right-2">
                    <CountBadge count={42} />
                  </span>
                </button>
              </div>
              <p className="text-xs font-mono">Count: 42</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <button className="relative px-4 py-2 border-2 border-black font-mono">
                  Alerts
                  <span className="absolute -top-2 -right-2">
                    <CountBadge count={150} max={99} />
                  </span>
                </button>
              </div>
              <p className="text-xs font-mono">Count: 150 (max: 99)</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Dot Badges</h3>
          <div className="flex flex-wrap gap-12">
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <div className="w-12 h-12 border-2 border-black bg-gray-100 flex items-center justify-center font-mono">
                  <span>A</span>
                  <DotBadge />
                </div>
              </div>
              <p className="text-xs font-mono">Top Right</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <div className="w-12 h-12 border-2 border-black bg-gray-100 flex items-center justify-center font-mono">
                  <span>B</span>
                  <DotBadge position="top-left" variant="success" />
                </div>
              </div>
              <p className="text-xs font-mono">Top Left</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <div className="w-12 h-12 border-2 border-black bg-gray-100 flex items-center justify-center font-mono">
                  <span>C</span>
                  <DotBadge position="bottom-right" variant="warning" />
                </div>
              </div>
              <p className="text-xs font-mono">Bottom Right</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <div className="w-12 h-12 border-2 border-black bg-gray-100 flex items-center justify-center font-mono">
                  <span>D</span>
                  <DotBadge position="bottom-left" variant="info" />
                </div>
              </div>
              <p className="text-xs font-mono">Bottom Left</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 