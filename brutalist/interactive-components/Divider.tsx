import React from 'react';

interface DividerProps {
  label?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted' | 'double';
  thickness?: number;
  color?: string;
  labelPosition?: 'start' | 'center' | 'end';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  label,
  orientation = 'horizontal',
  variant = 'solid',
  thickness = 2,
  color = 'black',
  labelPosition = 'center',
  className = '',
}) => {
  // Border styles based on variant
  const borderStyles = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
    double: 'border-double',
  };
  
  // Label position classes
  const labelPositionClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  };
  
  // Horizontal divider
  if (orientation === 'horizontal') {
    // With label
    if (label) {
      return (
        <div 
          className={`
            flex items-center w-full
            ${labelPositionClasses[labelPosition]}
            ${className}
          `}
        >
          <div 
            className={`
              ${labelPosition !== 'start' ? 'flex-grow ' : ''}
              ${borderStyles[variant]}
            `}
            style={{ 
              borderBottomWidth: thickness,
              borderColor: color,
              marginRight: labelPosition !== 'end' ? '0.5rem' : 0
            }}
          />
          
          <span className="font-mono text-black px-2">{label}</span>
          
          <div 
            className={`
              ${labelPosition !== 'end' ? 'flex-grow ' : ''}
              ${borderStyles[variant]}
            `}
            style={{ 
              borderBottomWidth: thickness,
              borderColor: color,
              marginLeft: labelPosition !== 'start' ? '0.5rem' : 0
            }}
          />
        </div>
      );
    }
    
    // Without label
    return (
      <hr 
        className={`
          w-full my-4
          ${borderStyles[variant]}
          ${className}
        `}
        style={{ 
          borderWidth: thickness,
          borderColor: color 
        }}
      />
    );
  }
  
  // Vertical divider
  return (
    <div 
      className={`
        inline-block h-full mx-2
        ${borderStyles[variant]}
        ${className}
      `}
      style={{ 
        borderLeftWidth: thickness,
        borderColor: color,
        height: '100%',
        minHeight: '1rem'
      }}
    />
  );
};

export const ContentDivider: React.FC<{
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  className?: string;
}> = ({
  children,
  orientation = 'horizontal',
  thickness = 2,
  className = '',
}) => {
  if (orientation === 'horizontal') {
    return (
      <div 
        className={`
          flex items-center justify-center w-full
          ${className}
        `}
      >
        <div 
          className="flex-grow border-t-solid"
          style={{ 
            borderTopWidth: thickness,
            borderColor: 'black'
          }}
        />
        
        <div className="mx-4">
          {children}
        </div>
        
        <div 
          className="flex-grow border-t-solid"
          style={{ 
            borderTopWidth: thickness,
            borderColor: 'black'
          }}
        />
      </div>
    );
  }
  
  return (
    <div 
      className={`
        flex items-center justify-center h-full
        ${className}
      `}
      style={{ height: '100%' }}
    >
      <div 
        className="h-full border-l-solid"
        style={{ 
          borderLeftWidth: thickness,
          borderColor: 'black'
        }}
      />
      
      <div className="mx-2 transform -rotate-90">
        {children}
      </div>
      
      <div 
        className="h-full border-l-solid"
        style={{ 
          borderLeftWidth: thickness,
          borderColor: 'black'
        }}
      />
    </div>
  );
};

export const StepDivider: React.FC<{
  steps: number;
  currentStep: number;
  thickness?: number;
  className?: string;
}> = ({
  steps,
  currentStep,
  thickness = 2,
  className = '',
}) => {
  return (
    <div 
      className={`
        flex items-center w-full
        ${className}
      `}
    >
      {Array.from({ length: steps }).map((_, index) => (
        <React.Fragment key={index}>
          {/* Step marker */}
          <div 
            className={`
              flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
              border-2 border-black
              ${index < currentStep ? 'bg-black text-white' : 'bg-white text-black'}
              ${index === currentStep ? 'font-bold' : ''}
            `}
          >
            {index + 1}
          </div>
          
          {/* Connecting line (except after last step) */}
          {index < steps - 1 && (
            <div 
              className="flex-grow"
              style={{ 
                borderTopWidth: thickness,
                borderColor: 'black',
                borderStyle: index < currentStep - 1 ? 'solid' : 'dashed'
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export const Dividers: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Dividers</h2>
      <p className="mb-8 font-sans">
        Divider components with brutalist styling, providing clean separation between content sections.
      </p>
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Dividers</h3>
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-mono">Default horizontal divider:</p>
              <Divider />
            </div>
            
            <div className="flex h-20 items-stretch">
              <p className="mr-2 text-sm font-mono">Vertical divider:</p>
              <div className="bg-gray-100 p-4">Content A</div>
              <Divider orientation="vertical" />
              <div className="bg-gray-100 p-4">Content B</div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Divider Variants</h3>
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-mono">Solid:</p>
              <Divider variant="solid" />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Dashed:</p>
              <Divider variant="dashed" />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Dotted:</p>
              <Divider variant="dotted" />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Double:</p>
              <Divider variant="double" thickness={1} />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Divider Customization</h3>
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-mono">Thick divider:</p>
              <Divider thickness={4} />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Colored divider:</p>
              <Divider color="#ff3e00" thickness={3} />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Combined customization:</p>
              <Divider variant="dashed" thickness={3} color="#0066cc" />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Dividers with Labels</h3>
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-mono">Center label (default):</p>
              <Divider label="SECTION DIVIDER" />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Start label:</p>
              <Divider label="START" labelPosition="start" />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">End label:</p>
              <Divider label="END" labelPosition="end" />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">With custom styling:</p>
              <Divider 
                label={<span className="bg-black text-white px-2 py-1">IMPORTANT</span>} 
                variant="dashed" 
                thickness={2}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Content Dividers</h3>
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-mono">Content divider with text:</p>
              <ContentDivider>
                <span className="font-mono font-bold">CONTENT SECTION</span>
              </ContentDivider>
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Content divider with custom element:</p>
              <ContentDivider>
                <div className="border-2 border-black px-3 py-1 bg-white">
                  <span className="font-mono">CUSTOM ELEMENT</span>
                </div>
              </ContentDivider>
            </div>
            
            <div className="flex h-32 items-stretch">
              <p className="mr-2 text-sm font-mono">Vertical content divider:</p>
              <div className="bg-gray-100 p-4">Left</div>
              <ContentDivider orientation="vertical">
                <span className="font-mono font-bold">MIDDLE</span>
              </ContentDivider>
              <div className="bg-gray-100 p-4">Right</div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Step Dividers</h3>
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-mono">Step 1 of 4:</p>
              <StepDivider steps={4} currentStep={1} />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Step 2 of 4:</p>
              <StepDivider steps={4} currentStep={2} />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Step 3 of 4:</p>
              <StepDivider steps={4} currentStep={3} />
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Step 4 of 4:</p>
              <StepDivider steps={4} currentStep={4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 