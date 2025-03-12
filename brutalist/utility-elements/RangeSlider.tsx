import React, { useState, useRef, useEffect } from 'react';

interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  label?: string;
  showValue?: boolean;
  showTicks?: boolean;
  tickCount?: number;
  showLabels?: boolean;
  labelFormatter?: (value: number) => string;
  onChange?: (value: number) => void;
  disabled?: boolean;
  variant?: 'default' | 'filled' | 'brutalist';
  className?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = min,
  label,
  showValue = false,
  showTicks = false,
  tickCount = 5,
  showLabels = false,
  labelFormatter = (value) => `${value}`,
  onChange,
  disabled = false,
  variant = 'default',
  className = ''
}) => {
  // Track whether the component is controlled or uncontrolled
  const isControlled = controlledValue !== undefined;
  
  // State for uncontrolled value
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  // Current value (controlled or uncontrolled)
  const value = isControlled ? controlledValue : internalValue;
  
  // Calculate percentage for positioning
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Handle value change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    
    // Update internal state for uncontrolled component
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    // Call onChange callback if provided
    if (onChange) {
      onChange(newValue);
    }
  };
  
  // Generate ticks
  const ticks = showTicks ? Array.from({ length: tickCount }).map((_, i) => {
    const tickPercentage = (i / (tickCount - 1)) * 100;
    const tickValue = min + ((max - min) * i) / (tickCount - 1);
    return { percentage: tickPercentage, value: tickValue };
  }) : [];
  
  // Variant styles
  const trackStyles = {
    default: 'h-2 bg-gray-200 border-2 border-black',
    filled: 'h-2 bg-gray-200 border-2 border-black',
    brutalist: 'h-4 bg-white border-2 border-black',
  };
  
  const progressStyles = {
    default: 'hidden',
    filled: 'bg-black h-full absolute top-0 left-0',
    brutalist: 'hidden',
  };
  
  const thumbStyles = {
    default: 'w-6 h-6 bg-white border-2 border-black rounded-none',
    filled: 'w-6 h-6 bg-white border-2 border-black rounded-none',
    brutalist: 'w-8 h-8 -mt-2 bg-white border-4 border-black',
  };
  
  return (
    <div className={`${className}`}>
      {/* Label and value display */}
      {(label || showValue) && (
        <div className="flex justify-between mb-1">
          {label && (
            <span className="font-mono">{label}</span>
          )}
          {showValue && (
            <span className="font-mono">{value}</span>
          )}
        </div>
      )}
      
      {/* Slider container */}
      <div className="relative pt-1">
        {/* Track */}
        <div className={`relative w-full ${trackStyles[variant]}`}>
          {/* Progress fill (for filled variant) */}
          {variant === 'filled' && (
            <div 
              className={progressStyles[variant]}
              style={{ width: `${percentage}%` }}
            />
          )}
          
          {/* Ticks */}
          {showTicks && (
            <div className="absolute w-full top-3">
              {ticks.map((tick, index) => (
                <React.Fragment key={index}>
                  <div 
                    className="absolute w-0.5 h-2 bg-black"
                    style={{ left: `${tick.percentage}%`, marginLeft: '-1px' }}
                  />
                  
                  {/* Tick labels */}
                  {showLabels && (
                    <div 
                      className="absolute font-mono text-xs -mt-1" 
                      style={{ 
                        left: `${tick.percentage}%`, 
                        transform: 'translateX(-50%)',
                        top: '16px' 
                      }}
                    >
                      {labelFormatter(tick.value)}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
        
        {/* Range input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={`
            absolute top-0 w-full opacity-0 cursor-pointer z-10 h-2
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
        />
        
        {/* Custom thumb */}
        <div 
          className={`
            absolute top-0 ${thumbStyles[variant]}
            ${disabled ? 'opacity-50' : 'hover:bg-gray-50'}
            transform -translate-x-1/2 mt-0.5
          `}
          style={{ 
            left: `${percentage}%`,
            transition: 'left 0.1s ease-out',
            pointerEvents: 'none'
          }}
        />
        
        {/* Labels container for bottom labels */}
        {showLabels && !showTicks && (
          <div className="w-full flex justify-between mt-2">
            <span className="font-mono text-xs">{labelFormatter(min)}</span>
            <span className="font-mono text-xs">{labelFormatter(max)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const RangeSliderWithTooltip: React.FC<RangeSliderProps> = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(0);
  const [tooltipValue, setTooltipValue] = useState(props.defaultValue || props.min || 0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Handle value change
  const handleChange = (value: number) => {
    setTooltipValue(value);
    if (props.onChange) {
      props.onChange(value);
    }
    
    // Update tooltip position
    updateTooltipPosition(value);
  };
  
  // Calculate tooltip position based on value
  const updateTooltipPosition = (value: number) => {
    if (sliderRef.current) {
      const min = props.min || 0;
      const max = props.max || 100;
      const percentage = ((value - min) / (max - min)) * 100;
      setTooltipPosition(percentage);
    }
  };
  
  // Update tooltip position on mount and when controlled value changes
  useEffect(() => {
    if (props.value !== undefined) {
      setTooltipValue(props.value);
      updateTooltipPosition(props.value);
    }
  }, [props.value]);
  
  return (
    <div 
      ref={sliderRef}
      className={props.className}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <RangeSlider 
        {...props}
        onChange={handleChange}
      />
      
      {/* Tooltip */}
      {showTooltip && !props.disabled && (
        <div 
          className="absolute -mt-8 transform -translate-x-1/2 z-20"
          style={{ left: `${tooltipPosition}%` }}
        >
          <div className="bg-black text-white px-2 py-1 font-mono text-xs">
            {props.labelFormatter ? props.labelFormatter(tooltipValue) : tooltipValue}
          </div>
        </div>
      )}
    </div>
  );
};

export const DualRangeSlider: React.FC<{
  min?: number;
  max?: number;
  step?: number;
  defaultMinValue?: number;
  defaultMaxValue?: number;
  label?: string;
  showValues?: boolean;
  onChange?: (values: [number, number]) => void;
  disabled?: boolean;
  variant?: 'default' | 'filled' | 'brutalist';
  className?: string;
}> = ({
  min = 0,
  max = 100,
  step = 1,
  defaultMinValue = min,
  defaultMaxValue = max,
  label,
  showValues = false,
  onChange,
  disabled = false,
  variant = 'default',
  className = ''
}) => {
  const [minValue, setMinValue] = useState(defaultMinValue);
  const [maxValue, setMaxValue] = useState(defaultMaxValue);
  
  // Calculate percentages for positioning
  const minPercentage = ((minValue - min) / (max - min)) * 100;
  const maxPercentage = ((maxValue - min) / (max - min)) * 100;
  
  // Handle min value change
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinValue = parseFloat(e.target.value);
    if (newMinValue <= maxValue) {
      setMinValue(newMinValue);
      if (onChange) {
        onChange([newMinValue, maxValue]);
      }
    }
  };
  
  // Handle max value change
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = parseFloat(e.target.value);
    if (newMaxValue >= minValue) {
      setMaxValue(newMaxValue);
      if (onChange) {
        onChange([minValue, newMaxValue]);
      }
    }
  };
  
  // Variant styles
  const trackStyles = {
    default: 'h-2 bg-gray-200 border-2 border-black',
    filled: 'h-2 bg-gray-200 border-2 border-black',
    brutalist: 'h-4 bg-white border-2 border-black',
  };
  
  const progressStyles = {
    default: 'hidden',
    filled: 'bg-black h-full absolute top-0',
    brutalist: 'hidden',
  };
  
  const thumbStyles = {
    default: 'w-6 h-6 bg-white border-2 border-black rounded-none',
    filled: 'w-6 h-6 bg-white border-2 border-black rounded-none',
    brutalist: 'w-8 h-8 -mt-2 bg-white border-4 border-black',
  };
  
  return (
    <div className={`${className}`}>
      {/* Label and value display */}
      {(label || showValues) && (
        <div className="flex justify-between mb-1">
          {label && (
            <span className="font-mono">{label}</span>
          )}
          {showValues && (
            <span className="font-mono">{minValue} - {maxValue}</span>
          )}
        </div>
      )}
      
      {/* Slider container */}
      <div className="relative pt-1">
        {/* Track */}
        <div className={`relative w-full ${trackStyles[variant]}`}>
          {/* Progress fill (for filled variant) */}
          {variant === 'filled' && (
            <div 
              className={progressStyles[variant]}
              style={{ 
                left: `${minPercentage}%`,
                width: `${maxPercentage - minPercentage}%`
              }}
            />
          )}
        </div>
        
        {/* Min range input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          disabled={disabled}
          className={`
            absolute top-0 w-full opacity-0 cursor-pointer z-10 h-2
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
        />
        
        {/* Max range input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          disabled={disabled}
          className={`
            absolute top-0 w-full opacity-0 cursor-pointer z-20 h-2
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
        />
        
        {/* Custom min thumb */}
        <div 
          className={`
            absolute top-0 ${thumbStyles[variant]}
            ${disabled ? 'opacity-50' : 'hover:bg-gray-50'}
            transform -translate-x-1/2 mt-0.5 z-10
          `}
          style={{ 
            left: `${minPercentage}%`,
            transition: 'left 0.1s ease-out',
            pointerEvents: 'none'
          }}
        />
        
        {/* Custom max thumb */}
        <div 
          className={`
            absolute top-0 ${thumbStyles[variant]}
            ${disabled ? 'opacity-50' : 'hover:bg-gray-50'}
            transform -translate-x-1/2 mt-0.5 z-20
          `}
          style={{ 
            left: `${maxPercentage}%`,
            transition: 'left 0.1s ease-out',
            pointerEvents: 'none'
          }}
        />
        
        {/* Labels container */}
        <div className="w-full flex justify-between mt-2">
          <span className="font-mono text-xs">{min}</span>
          <span className="font-mono text-xs">{max}</span>
        </div>
      </div>
    </div>
  );
};

export const RangeSliders: React.FC = () => {
  const [singleValue, setSingleValue] = useState(30);
  const [dualValues, setDualValues] = useState<[number, number]>([20, 60]);
  
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Range Sliders</h2>
      <p className="mb-8 font-sans">
        Slider inputs with brutalist styling, featuring strong borders and distinctive thumbs.
      </p>
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Range Sliders</h3>
          <div className="space-y-6 max-w-xl">
            <RangeSlider 
              label="Default Slider"
            />
            
            <RangeSlider 
              label="With Value Display"
              showValue
              value={singleValue}
              onChange={setSingleValue}
            />
            
            <RangeSlider 
              label="Disabled Slider"
              value={50}
              disabled
            />
            
            <RangeSlider 
              label="Custom Range"
              min={-50}
              max={50}
              defaultValue={0}
              showValue
            />
            
            <RangeSlider 
              label="Custom Step"
              step={10}
              showTicks
              showLabels
              showValue
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Slider Variants</h3>
          <div className="space-y-6 max-w-xl">
            <RangeSlider 
              label="Default Variant"
              variant="default"
              showValue
              value={40}
            />
            
            <RangeSlider 
              label="Filled Variant"
              variant="filled"
              showValue
              value={60}
            />
            
            <RangeSlider 
              label="Brutalist Variant"
              variant="brutalist"
              showValue
              value={80}
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">With Ticks and Labels</h3>
          <div className="space-y-6 max-w-xl">
            <RangeSlider 
              label="With Ticks"
              showTicks
              showValue
            />
            
            <RangeSlider 
              label="With Ticks and Labels"
              showTicks
              showLabels
              showValue
            />
            
            <RangeSlider 
              label="Custom Number of Ticks"
              showTicks
              tickCount={10}
              showLabels
              showValue
            />
            
            <RangeSlider 
              label="Formatted Labels"
              showTicks
              showLabels
              min={0}
              max={1}
              step={0.1}
              labelFormatter={(value) => `${Math.round(value * 100)}%`}
              showValue
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Tooltip Slider</h3>
          <div className="space-y-6 max-w-xl relative">
            <RangeSliderWithTooltip 
              label="Hover to See Tooltip"
              showValue
            />
            
            <RangeSliderWithTooltip 
              label="Tooltip with Formatting"
              min={0}
              max={100}
              labelFormatter={(value) => `${value}%`}
              variant="brutalist"
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Dual Range Slider</h3>
          <div className="space-y-6 max-w-xl">
            <DualRangeSlider 
              label="Price Range"
              showValues
              defaultMinValue={20}
              defaultMaxValue={60}
              onChange={setDualValues}
            />
            
            <div className="p-4 border-2 border-black">
              <p className="font-mono">
                Selected range: {dualValues[0]} - {dualValues[1]}
              </p>
            </div>
            
            <DualRangeSlider 
              label="Date Range"
              min={2000}
              max={2023}
              step={1}
              defaultMinValue={2010}
              defaultMaxValue={2020}
              showValues
              variant="brutalist"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 