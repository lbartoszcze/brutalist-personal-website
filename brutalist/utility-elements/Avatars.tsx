import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  initials?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  border?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  shape = 'circle',
  initials,
  status,
  border = true,
  className = '',
}) => {
  // Size classes
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-2xl',
  };
  
  // Shape classes
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
  };

  // Status classes and styles
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400', 
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  };
  
  const statusPositions = {
    xs: 'w-2 h-2 right-0 bottom-0',
    sm: 'w-2.5 h-2.5 right-0 bottom-0',
    md: 'w-3 h-3 right-0 bottom-0',
    lg: 'w-4 h-4 right-0.5 bottom-0.5',
    xl: 'w-5 h-5 right-1 bottom-1',
  };
  
  return (
    <div className={`relative inline-block ${className}`}>
      <div 
        className={`
          flex items-center justify-center bg-gray-100 overflow-hidden
          ${sizeClasses[size]} 
          ${shapeClasses[shape]}
          ${border ? 'border-2 border-black' : ''}
        `}
      >
        {src ? (
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-mono font-bold uppercase">
            {initials || alt.charAt(0)}
          </span>
        )}
      </div>
      
      {status && (
        <span className={`
          absolute border border-black
          ${statusColors[status]}
          ${statusPositions[size]}
        `}></span>
      )}
    </div>
  );
};

export const AvatarGroup: React.FC<{
  avatars: AvatarProps[];
  max?: number;
  size?: AvatarProps['size'];
  className?: string;
}> = ({ 
  avatars, 
  max = 4,
  size = 'md',
  className = '' 
}) => {
  // Calculate overlap based on size
  const overlapValue = {
    xs: '-ml-1.5',
    sm: '-ml-2',
    md: '-ml-3',
    lg: '-ml-4',
    xl: '-ml-6'
  };
  
  const displayedAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length > max ? avatars.length - max : 0;
  
  return (
    <div className={`flex ${className}`}>
      {displayedAvatars.map((avatar, index) => (
        <div 
          key={index} 
          className={`${index !== 0 ? overlapValue[size] : ''}`}
          style={{ zIndex: 10 - index }}
        >
          <Avatar {...avatar} size={size} />
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div 
          className={`${overlapValue[size]}`}
          style={{ zIndex: 10 - max }}
        >
          <div 
            className={`
              flex items-center justify-center bg-gray-200 
              border-2 border-black font-mono font-bold
              ${size === 'xs' ? 'text-xs' : ''}
              ${size === 'sm' ? 'text-sm' : ''}
              ${sizeClasses[size]} 
              rounded-full
            `}
          >
            +{remainingCount}
          </div>
        </div>
      )}
    </div>
  );
};

// Size classes for AvatarGroup
const sizeClasses = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

export const Avatars: React.FC = () => {
  const sampleAvatars = [
    { src: "https://i.pravatar.cc/150?img=1", alt: "User 1" },
    { src: "https://i.pravatar.cc/150?img=2", alt: "User 2" },
    { src: "https://i.pravatar.cc/150?img=3", alt: "User 3" },
    { src: "https://i.pravatar.cc/150?img=4", alt: "User 4" },
    { src: "https://i.pravatar.cc/150?img=5", alt: "User 5" },
    { src: "https://i.pravatar.cc/150?img=6", alt: "User 6" }
  ];
  
  return (
    <div className="p-6 max-w-3xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Avatars</h2>
      <p className="mb-8 font-sans">
        User avatars with brutalist styling, featuring strong borders and minimalist indicators.
      </p>
      
      <div className="mb-10">
        <h3 className="text-xl font-mono font-bold mb-4 uppercase">Sizes</h3>
        <div className="flex items-end space-x-4">
          <div>
            <Avatar size="xs" src="https://i.pravatar.cc/150?img=1" />
            <p className="mt-2 text-xs font-mono">XS</p>
          </div>
          <div>
            <Avatar size="sm" src="https://i.pravatar.cc/150?img=2" />
            <p className="mt-2 text-xs font-mono">SM</p>
          </div>
          <div>
            <Avatar size="md" src="https://i.pravatar.cc/150?img=3" />
            <p className="mt-2 text-xs font-mono">MD</p>
          </div>
          <div>
            <Avatar size="lg" src="https://i.pravatar.cc/150?img=4" />
            <p className="mt-2 text-xs font-mono">LG</p>
          </div>
          <div>
            <Avatar size="xl" src="https://i.pravatar.cc/150?img=5" />
            <p className="mt-2 text-xs font-mono">XL</p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h3 className="text-xl font-mono font-bold mb-4 uppercase">Shapes</h3>
        <div className="flex space-x-4">
          <div>
            <Avatar shape="circle" src="https://i.pravatar.cc/150?img=6" />
            <p className="mt-2 text-xs font-mono">Circle</p>
          </div>
          <div>
            <Avatar shape="square" src="https://i.pravatar.cc/150?img=7" />
            <p className="mt-2 text-xs font-mono">Square</p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h3 className="text-xl font-mono font-bold mb-4 uppercase">Initials</h3>
        <div className="flex space-x-4">
          <Avatar initials="JD" />
          <Avatar initials="AB" shape="square" />
          <Avatar initials="XY" size="lg" />
        </div>
      </div>
      
      <div className="mb-10">
        <h3 className="text-xl font-mono font-bold mb-4 uppercase">Status Indicators</h3>
        <div className="flex space-x-4">
          <div>
            <Avatar src="https://i.pravatar.cc/150?img=8" status="online" />
            <p className="mt-2 text-xs font-mono">Online</p>
          </div>
          <div>
            <Avatar src="https://i.pravatar.cc/150?img=9" status="offline" />
            <p className="mt-2 text-xs font-mono">Offline</p>
          </div>
          <div>
            <Avatar src="https://i.pravatar.cc/150?img=10" status="away" />
            <p className="mt-2 text-xs font-mono">Away</p>
          </div>
          <div>
            <Avatar src="https://i.pravatar.cc/150?img=11" status="busy" />
            <p className="mt-2 text-xs font-mono">Busy</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-mono font-bold mb-4 uppercase">Avatar Groups</h3>
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-mono">Small Group:</p>
            <AvatarGroup 
              avatars={sampleAvatars.slice(0, 3)} 
              size="md"
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-mono">Group with More:</p>
            <AvatarGroup 
              avatars={sampleAvatars} 
              max={3}
              size="sm"
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-mono">Group with Small Size:</p>
            <AvatarGroup 
              avatars={sampleAvatars}
              size="xs"
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-mono">Group with Large Size:</p>
            <AvatarGroup 
              avatars={sampleAvatars.slice(0, 4)} 
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 