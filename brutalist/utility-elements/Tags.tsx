import React from 'react';

interface TagProps {
  label: string;
  onRemove?: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'bordered' | 'cutout';
  size?: 'small' | 'medium' | 'large';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  label,
  onRemove,
  icon,
  variant = 'default',
  size = 'medium',
  color = 'default',
  className = '',
}) => {
  // Size classes
  const sizeClasses = {
    small: 'text-xs py-0.5 px-2',
    medium: 'text-sm py-1 px-3',
    large: 'text-base py-1.5 px-4',
  };
  
  // Variant classes
  const variantClasses = {
    default: 'bg-white border-2 border-black',
    bordered: 'bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
    cutout: 'bg-white border-2 border-black rotate-[-1deg]',
  };
  
  // Color classes
  const colorClasses = {
    default: '',
    primary: 'border-blue-600',
    success: 'border-green-600',
    warning: 'border-yellow-600',
    danger: 'border-red-600',
  };

  // Remove button size classes
  const removeButtonSizeClasses = {
    small: 'text-xs ml-1 -mr-1',
    medium: 'text-sm ml-1.5 -mr-1',
    large: 'text-base ml-2 -mr-1',
  };
  
  return (
    <span 
      className={`
        inline-flex items-center font-mono
        ${sizeClasses[size]} 
        ${variantClasses[variant]}
        ${colorClasses[color]}
        ${className}
      `}
    >
      {icon && (
        <span className="mr-1.5 flex-shrink-0">{icon}</span>
      )}
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={`
            ${removeButtonSizeClasses[size]}
            hover:bg-gray-100 p-0.5
            focus:outline-none
          `}
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
};

interface TagsProps {
  tags: Array<{ 
    id: string | number; 
    label: string; 
    icon?: React.ReactNode;
  }>;
  onRemove?: (id: string | number) => void;
  variant?: TagProps['variant'];
  size?: TagProps['size'];
  color?: TagProps['color'];
  className?: string;
}

export const Tags: React.FC<TagsProps> = ({
  tags,
  onRemove,
  variant = 'default',
  size = 'medium',
  color = 'default',
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Tag
          key={tag.id}
          label={tag.label}
          icon={tag.icon}
          onRemove={onRemove ? () => onRemove(tag.id) : undefined}
          variant={variant}
          size={size}
          color={color}
        />
      ))}
    </div>
  );
};

// An input component that can create tags
interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  variant?: TagProps['variant'];
  size?: TagProps['size'];
  color?: TagProps['color'];
  maxTags?: number;
  allowDuplicates?: boolean;
  className?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onTagsChange,
  placeholder = 'Add tag...',
  variant = 'default',
  size = 'medium',
  color = 'default',
  maxTags = Infinity,
  allowDuplicates = false,
  className = '',
}) => {
  const [inputValue, setInputValue] = React.useState('');
  
  // Size classes
  const sizeClasses = {
    small: 'py-1 px-2 text-xs',
    medium: 'py-2 px-3 text-sm',
    large: 'py-2.5 px-4 text-base',
  };
  
  // Variant classes
  const variantClasses = {
    default: 'border-2 border-black',
    bordered: 'border-2 border-black',
    cutout: 'border-2 border-black rotate-[-0.5deg]',
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  // Handle key down event
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '') {
      removeLastTag();
    }
  };
  
  // Add a tag
  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue !== '' && tags.length < maxTags) {
      if (allowDuplicates || !tags.includes(trimmedValue)) {
        onTagsChange([...tags, trimmedValue]);
      }
      setInputValue('');
    }
  };
  
  // Remove a tag by index
  const removeTag = (indexToRemove: number) => {
    onTagsChange(tags.filter((_, index) => index !== indexToRemove));
  };
  
  // Remove the last tag (when backspace is pressed on empty input)
  const removeLastTag = () => {
    if (tags.length > 0) {
      onTagsChange(tags.slice(0, -1));
    }
  };
  
  return (
    <div className={className}>
      <div 
        className={`
          flex flex-wrap items-center gap-2 bg-white
          ${variantClasses[variant]} p-2
        `}
      >
        {tags.map((tag, index) => (
          <Tag
            key={index}
            label={tag}
            onRemove={() => removeTag(index)}
            variant={variant}
            size={size}
            color={color}
          />
        ))}
        
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={tags.length < maxTags ? placeholder : ''}
          className={`
            font-mono flex-grow min-w-[120px] outline-none
            ${sizeClasses[size]}
            ${tags.length >= maxTags ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          disabled={tags.length >= maxTags}
        />
      </div>
      
      <div className="mt-1 text-xs text-gray-600 font-mono">
        Press Enter to add a tag, Backspace to remove the last tag
      </div>
    </div>
  );
};

export const TagsShowcase: React.FC = () => {
  // State for demo tags
  const [demoTags, setDemoTags] = React.useState(['brutalist', 'design', 'system']);
  
  // Sample tags for display
  const sampleTags = [
    { id: 1, label: 'brutalist' },
    { id: 2, label: 'design' },
    { id: 3, label: 'raw' },
    { id: 4, label: 'minimal' },
    { id: 5, label: 'typography' },
  ];
  
  // Sample tags with icons
  const iconTags = [
    { id: 1, label: 'react', icon: '⚛️' },
    { id: 2, label: 'typescript', icon: '🔷' },
    { id: 3, label: 'css', icon: '🎨' },
    { id: 4, label: 'html', icon: '📄' },
  ];
  
  // Handle tag removal
  const handleRemove = (id: string | number) => {
    console.log(`Removed tag with id: ${id}`);
    // In a real app, you would filter out the tag with this id
  };
  
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Tags</h2>
      <p className="mb-8 font-sans">
        Tag components with brutalist styling, featuring strong borders and minimal aesthetics.
      </p>
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Tags</h3>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-mono">Default tags:</p>
              <Tags tags={sampleTags} />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Tags with close button:</p>
              <Tags tags={sampleTags} onRemove={handleRemove} />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Tags with icons:</p>
              <Tags tags={iconTags} />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Tag Variants</h3>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-mono">Default variant:</p>
              <Tags tags={sampleTags.slice(0, 3)} variant="default" />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Bordered variant:</p>
              <Tags tags={sampleTags.slice(0, 3)} variant="bordered" />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Cutout variant:</p>
              <Tags tags={sampleTags.slice(0, 3)} variant="cutout" />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Tag Sizes</h3>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-mono">Small:</p>
              <Tags tags={sampleTags.slice(0, 3)} size="small" />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Medium (default):</p>
              <Tags tags={sampleTags.slice(0, 3)} size="medium" />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Large:</p>
              <Tags tags={sampleTags.slice(0, 3)} size="large" />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Tag Colors</h3>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-mono">Default:</p>
              <Tags tags={[{ id: 1, label: 'default color' }]} color="default" />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Primary:</p>
              <Tags tags={[{ id: 1, label: 'primary color' }]} color="primary" />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Success:</p>
              <Tags tags={[{ id: 1, label: 'success color' }]} color="success" />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Warning:</p>
              <Tags tags={[{ id: 1, label: 'warning color' }]} color="warning" />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Danger:</p>
              <Tags tags={[{ id: 1, label: 'danger color' }]} color="danger" />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Tag Input</h3>
          <div className="space-y-4 max-w-xl">
            <div>
              <p className="mb-2 text-sm font-mono">Basic tag input:</p>
              <TagInput 
                tags={demoTags}
                onTagsChange={setDemoTags}
              />
            </div>
            
            <div className="p-4 border-2 border-black">
              <p className="font-mono">Current tags: {demoTags.join(', ')}</p>
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">With max tags limit (5):</p>
              <TagInput 
                tags={demoTags}
                onTagsChange={setDemoTags}
                maxTags={5}
                variant="bordered"
              />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Cutout variant:</p>
              <TagInput 
                tags={demoTags}
                onTagsChange={setDemoTags}
                variant="cutout"
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 