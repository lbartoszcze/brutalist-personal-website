import React, { useState } from 'react';

interface Step {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  optional?: boolean;
  disabled?: boolean;
  completed?: boolean;
  onClick?: (id: string) => void;
}

interface StepsProps {
  steps: Step[];
  activeStep?: string;
  onChange?: (id: string) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'bordered' | 'cutout' | 'numbered';
  size?: 'small' | 'medium' | 'large';
  showConnectors?: boolean;
  showContent?: boolean;
  progressPercent?: number;
  className?: string;
}

export const Steps: React.FC<StepsProps> = ({
  steps,
  activeStep,
  onChange,
  orientation = 'horizontal',
  variant = 'default',
  size = 'medium',
  showConnectors = true,
  showContent = false,
  progressPercent,
  className = '',
}) => {
  // Find the active step index if activeStep is provided
  const activeStepIndex = activeStep
    ? steps.findIndex(step => step.id === activeStep)
    : -1;
  
  // Determine the active index for controlled or uncontrolled mode
  const activeIndex = activeStepIndex >= 0 ? activeStepIndex : 0;
  
  // Handle step click
  const handleStepClick = (step: Step) => {
    if (step.disabled) return;
    
    if (step.onClick) {
      step.onClick(step.id);
    }
    
    if (onChange) {
      onChange(step.id);
    }
  };
  
  // Size-based styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          icon: 'w-6 h-6 text-sm',
          text: 'text-xs',
          connector: 'h-1',
          padding: 'px-2 py-1',
        };
      case 'large':
        return {
          icon: 'w-12 h-12 text-xl',
          text: 'text-lg',
          connector: 'h-2',
          padding: 'px-6 py-3',
        };
      default: // medium
        return {
          icon: 'w-9 h-9 text-base',
          text: 'text-base',
          connector: 'h-1.5',
          padding: 'px-4 py-2',
        };
    }
  };
  
  // Variant-based styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      case 'numbered':
        return 'border-2 border-black';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Get connector styles based on orientation
  const getConnectorStyles = (index: number) => {
    const isActive = index < activeIndex;
    const isLastItem = index === steps.length - 1;
    
    if (orientation === 'horizontal') {
      return `
        ${isLastItem ? 'hidden' : 'block'}
        flex-grow h-[2px] bg-gray-200
        ${isActive ? 'bg-black' : ''}
        ${getSizeStyles().connector}
      `;
    } else {
      return `
        ${isLastItem ? 'hidden' : 'block'}
        w-[2px] h-12 bg-gray-200
        ${isActive ? 'bg-black' : ''}
      `;
    }
  };
  
  // Render the step marker (icon, number, or custom content)
  const renderStepMarker = (step: Step, index: number) => {
    const isActive = index === activeIndex;
    const isCompleted = step.completed || index < activeIndex;
    const sizeStyles = getSizeStyles();
    
    const baseStyles = `
      flex items-center justify-center
      ${sizeStyles.icon}
      ${getVariantStyles()}
      ${isActive ? 'bg-black text-white' : 'bg-white text-black'}
      ${isCompleted ? 'bg-black text-white' : ''}
      ${step.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `;
    
    // Render icon if provided
    if (step.icon) {
      return (
        <div className={baseStyles}>
          {step.icon}
        </div>
      );
    }
    
    // Render number for numbered variant
    if (variant === 'numbered') {
      return (
        <div className={baseStyles}>
          {index + 1}
        </div>
      );
    }
    
    // Render check mark for completed steps
    if (isCompleted) {
      return (
        <div className={baseStyles}>
          ✓
        </div>
      );
    }
    
    // Default circle
    return (
      <div className={baseStyles}>
        {index + 1}
      </div>
    );
  };
  
  // Render a step with its marker and text
  const renderStep = (step: Step, index: number) => {
    const isActive = index === activeIndex;
    const isCompleted = step.completed || index < activeIndex;
    const sizeStyles = getSizeStyles();
    
    return (
      <div
        className={`
          ${orientation === 'horizontal' ? 'flex flex-col items-center' : 'flex items-start'}
          ${step.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${isActive ? 'font-bold' : ''}
        `}
        onClick={() => handleStepClick(step)}
      >
        {/* Step Marker */}
        {renderStepMarker(step, index)}
        
        {/* Step Text */}
        <div 
          className={`
            font-mono mt-2
            ${sizeStyles.text}
            ${orientation === 'horizontal' ? 'text-center' : 'ml-3'}
          `}
        >
          <div className="font-bold">{step.title}</div>
          {step.description && (
            <div className={`font-normal ${isActive ? 'text-gray-800' : 'text-gray-600'}`}>
              {step.description}
            </div>
          )}
          {step.optional && (
            <div className="text-gray-500 text-sm">(Optional)</div>
          )}
        </div>
      </div>
    );
  };
  
  // Render the active step content
  const renderContent = () => {
    if (!showContent) return null;
    
    const activeStep = steps[activeIndex];
    if (!activeStep?.content) return null;
    
    return (
      <div className={`
        mt-6 p-4
        ${getVariantStyles()}
      `}>
        {activeStep.content}
      </div>
    );
  };
  
  // Render progress bar if progressPercent provided
  const renderProgressBar = () => {
    if (progressPercent === undefined) return null;
    
    // Ensure progress is between 0 and 100
    const progress = Math.min(100, Math.max(0, progressPercent));
    
    return (
      <div className="w-full h-2 bg-gray-200 mt-4 border border-black">
        <div 
          className="h-full bg-black" 
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };
  
  return (
    <div className={className}>
      <div 
        className={`
          ${orientation === 'horizontal' 
            ? 'flex items-center' 
            : 'flex flex-col space-y-4'}
        `}
      >
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step */}
            {renderStep(step, index)}
            
            {/* Connector */}
            {showConnectors && (
              <div className={getConnectorStyles(index)} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Progress Bar */}
      {renderProgressBar()}
      
      {/* Content */}
      {renderContent()}
    </div>
  );
};

// Interactive Steps with state management
export const InteractiveSteps: React.FC<
  Omit<StepsProps, 'activeStep' | 'onChange'> & {
    initialStep?: string;
    onComplete?: () => void;
    completeButtonText?: string;
    nextButtonText?: string;
    prevButtonText?: string;
    validateStep?: (id: string) => boolean | Promise<boolean>;
  }
> = ({
  steps,
  initialStep,
  onComplete,
  completeButtonText = 'Complete',
  nextButtonText = 'Next',
  prevButtonText = 'Back',
  validateStep,
  showContent = true,
  ...props
}) => {
  // Find initial step index
  const initialIndex = initialStep 
    ? steps.findIndex(step => step.id === initialStep)
    : 0;
  
  const [activeStepIndex, setActiveStepIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [isValidating, setIsValidating] = useState(false);
  
  // Calculate the effective active step
  const activeStep = steps[activeStepIndex];
  
  // Handle next step
  const handleNext = async () => {
    // Optional validation
    if (validateStep) {
      setIsValidating(true);
      const isValid = await validateStep(activeStep.id);
      setIsValidating(false);
      
      if (!isValid) return;
    }
    
    // Mark current step as completed
    setCompleted(prev => ({
      ...prev,
      [activeStep.id]: true
    }));
    
    // Move to next step if not at the end
    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    } else if (onComplete) {
      onComplete();
    }
  };
  
  // Handle previous step
  const handlePrev = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    }
  };
  
  // Handle step change
  const handleStepChange = (id: string) => {
    const index = steps.findIndex(step => step.id === id);
    if (index >= 0) {
      setActiveStepIndex(index);
    }
  };
  
  // Calculate progress percentage
  const progressPercent = (activeStepIndex / (steps.length - 1)) * 100;
  
  // Map steps with completed state
  const mappedSteps = steps.map(step => ({
    ...step,
    completed: completed[step.id] || false
  }));
  
  return (
    <div>
      <Steps
        steps={mappedSteps}
        activeStep={activeStep.id}
        onChange={handleStepChange}
        showContent={showContent}
        progressPercent={progressPercent}
        {...props}
      />
      
      {showContent && (
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className={`
              px-4 py-2 border-2 border-black font-mono
              ${activeStepIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
            `}
            onClick={handlePrev}
            disabled={activeStepIndex === 0}
          >
            {prevButtonText}
          </button>
          
          <button
            type="button"
            className={`
              px-4 py-2 border-2 border-black font-mono bg-black text-white hover:bg-gray-800
              ${isValidating ? 'opacity-75 cursor-wait' : ''}
            `}
            onClick={handleNext}
            disabled={isValidating}
          >
            {activeStepIndex === steps.length - 1 ? completeButtonText : nextButtonText}
          </button>
        </div>
      )}
    </div>
  );
};

// Wizard for form-based steps
export const StepWizard: React.FC<{
  children: React.ReactElement[];
  onComplete?: () => void;
  variant?: 'default' | 'bordered' | 'cutout' | 'numbered';
  orientation?: 'horizontal' | 'vertical';
  showStepContent?: boolean;
  className?: string;
}> = ({
  children,
  onComplete,
  variant = 'default',
  orientation = 'horizontal',
  showStepContent = true,
  className = '',
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const childrenArray = React.Children.toArray(children);
  
  // Build steps from children props
  const steps = childrenArray.map((child, index) => {
    const childElement = child as React.ReactElement;
    const { title, description, optional, icon } = childElement.props;
    
    return {
      id: `step-${index}`,
      title: title || `Step ${index + 1}`,
      description,
      optional,
      icon,
      content: childElement,
      completed: index < activeStep,
    };
  });
  
  // Handle step change
  const handleStepChange = (id: string) => {
    const index = steps.findIndex(step => step.id === id);
    if (index >= 0) {
      setActiveStep(index);
    }
  };
  
  // Handle next step
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else if (onComplete) {
      onComplete();
    }
  };
  
  // Handle previous step
  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  
  // Calculate progress percentage
  const progressPercent = (activeStep / (steps.length - 1)) * 100;
  
  // Render only the active child with next/prev buttons
  const renderActiveChild = () => {
    if (!showStepContent) return null;
    
    const activeChild = childrenArray[activeStep] as React.ReactElement;
    
    // Add navigation props to child
    const childWithProps = React.cloneElement(activeChild, {
      onNext: handleNext,
      onPrev: handlePrev,
      isFirstStep: activeStep === 0,
      isLastStep: activeStep === steps.length - 1,
    });
    
    return (
      <div className="mt-6">
        {childWithProps}
      </div>
    );
  };
  
  return (
    <div className={className}>
      <Steps
        steps={steps}
        activeStep={steps[activeStep].id}
        onChange={handleStepChange}
        orientation={orientation}
        variant={variant}
        progressPercent={progressPercent}
        showContent={false}
      />
      
      {renderActiveChild()}
    </div>
  );
};

// Step form component to be used with StepWizard
export const StepForm: React.FC<{
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  optional?: boolean;
  children: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  nextText?: string;
  prevText?: string;
  completeText?: string;
  className?: string;
}> = ({
  children,
  onNext,
  onPrev,
  isFirstStep = false,
  isLastStep = false,
  nextText = 'Next',
  prevText = 'Back',
  completeText = 'Complete',
  className = '',
}) => {
  return (
    <div className={`p-4 border-2 border-black ${className}`}>
      <div className="mb-6">
        {children}
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          className={`
            px-4 py-2 border-2 border-black font-mono
            ${isFirstStep ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
          `}
          onClick={onPrev}
          disabled={isFirstStep}
        >
          {prevText}
        </button>
        
        <button
          type="button"
          className="px-4 py-2 border-2 border-black font-mono bg-black text-white hover:bg-gray-800"
          onClick={onNext}
        >
          {isLastStep ? completeText : nextText}
        </button>
      </div>
    </div>
  );
};

// Examples
export const StepsExamples: React.FC = () => {
  // Sample step data
  const basicSteps = [
    {
      id: 'account',
      title: 'Account',
      description: 'Create account',
      completed: true,
    },
    {
      id: 'profile',
      title: 'Profile',
      description: 'Complete profile',
      active: true,
    },
    {
      id: 'payment',
      title: 'Payment',
      description: 'Add payment method',
    },
    {
      id: 'review',
      title: 'Review',
      description: 'Review and submit',
      optional: true,
    },
  ];
  
  // Steps with content
  const stepsWithContent = [
    {
      id: 'step1',
      title: 'Step 1',
      description: 'Introduction',
      content: (
        <div>
          <h3 className="font-mono font-bold text-lg mb-2">Welcome to the Guide</h3>
          <p>This is the content for step 1. Here you would put your introduction content.</p>
        </div>
      )
    },
    {
      id: 'step2',
      title: 'Step 2',
      description: 'Configuration',
      content: (
        <div>
          <h3 className="font-mono font-bold text-lg mb-2">Configure Settings</h3>
          <p>This is the content for step 2. Here you would put configuration options.</p>
        </div>
      )
    },
    {
      id: 'step3',
      title: 'Step 3',
      description: 'Finalize',
      content: (
        <div>
          <h3 className="font-mono font-bold text-lg mb-2">Complete Setup</h3>
          <p>This is the content for step 3. Here you would put finalization content.</p>
        </div>
      )
    },
  ];
  
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Steps & Wizards</h2>
      <p className="mb-8 font-sans">
        Step components with brutalist styling for multi-step processes and wizards.
      </p>
      
      <div className="space-y-16">
        {/* Basic Steps */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Steps</h3>
          <Steps
            steps={basicSteps}
            activeStep="profile"
          />
        </div>
        
        {/* Step Variants */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Step Variants</h3>
          <div className="space-y-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Default</h4>
              <Steps
                steps={basicSteps}
                activeStep="profile"
                variant="default"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Bordered</h4>
              <Steps
                steps={basicSteps}
                activeStep="profile"
                variant="bordered"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Cutout</h4>
              <Steps
                steps={basicSteps}
                activeStep="profile"
                variant="cutout"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Numbered</h4>
              <Steps
                steps={basicSteps}
                activeStep="profile"
                variant="numbered"
              />
            </div>
          </div>
        </div>
        
        {/* Step Sizes */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Step Sizes</h3>
          <div className="space-y-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Small</h4>
              <Steps
                steps={basicSteps}
                activeStep="profile"
                variant="bordered"
                size="small"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Medium</h4>
              <Steps
                steps={basicSteps}
                activeStep="profile"
                variant="bordered"
                size="medium"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Large</h4>
              <Steps
                steps={basicSteps}
                activeStep="profile"
                variant="bordered"
                size="large"
              />
            </div>
          </div>
        </div>
        
        {/* Vertical Steps */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Vertical Steps</h3>
          <div className="max-w-sm">
            <Steps
              steps={basicSteps}
              activeStep="profile"
              variant="bordered"
              orientation="vertical"
            />
          </div>
        </div>
        
        {/* Steps with Content */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Steps with Content</h3>
          <Steps
            steps={stepsWithContent}
            activeStep="step1"
            variant="bordered"
            showContent
          />
        </div>
        
        {/* Interactive Steps */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Interactive Steps</h3>
          <InteractiveSteps
            steps={stepsWithContent}
            variant="bordered"
            onComplete={() => alert('All steps completed!')}
          />
        </div>
        
        {/* Step Wizard */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Step Wizard</h3>
          <StepWizard
            variant="bordered"
            onComplete={() => alert('Wizard completed!')}
          >
            <StepForm
              title="Account Setup"
              description="Create your account"
              icon="👤"
            >
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-mono">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-2 border-2 border-black"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-mono">Password</label>
                  <input 
                    type="password" 
                    className="w-full p-2 border-2 border-black"
                    placeholder="Create a password"
                  />
                </div>
              </div>
            </StepForm>
            
            <StepForm
              title="Personal Info"
              description="Tell us about yourself"
              icon="📝"
            >
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-mono">Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border-2 border-black"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-mono">Bio</label>
                  <textarea
                    className="w-full p-2 border-2 border-black"
                    placeholder="Tell us about yourself"
                    rows={3}
                  />
                </div>
              </div>
            </StepForm>
            
            <StepForm
              title="Review"
              description="Confirm your details"
              icon="✓"
            >
              <div>
                <p className="mb-4">Please review your information before submitting.</p>
                <div className="p-4 border-2 border-black bg-gray-50">
                  <p><strong>Email:</strong> user@example.com</p>
                  <p><strong>Name:</strong> John Doe</p>
                  <p><strong>Bio:</strong> Example user bio...</p>
                </div>
              </div>
            </StepForm>
          </StepWizard>
        </div>
      </div>
    </div>
  );
}; 