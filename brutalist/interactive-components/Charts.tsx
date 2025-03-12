import React from 'react';

// Common interface for all chart components
interface ChartBaseProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  variant?: 'default' | 'bordered' | 'cutout';
  className?: string;
}

// Bar Chart
interface BarChartProps extends ChartBaseProps {
  data: {
    label: string;
    value: number;
    color?: string;
  }[];
  showValues?: boolean;
  showLabels?: boolean;
  valueFormat?: (value: number) => string;
  horizontal?: boolean;
  maxValue?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  description,
  width = '100%',
  height = 300,
  variant = 'default',
  showValues = true,
  showLabels = true,
  valueFormat = (value) => value.toString(),
  horizontal = false,
  maxValue,
  className = '',
}) => {
  // Calculate maximum value for scaling
  const calculatedMax = maxValue || Math.max(...data.map(item => item.value), 0);
  
  // Get variant-based styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Calculate percentage of the max value
  const getPercentage = (value: number) => {
    return calculatedMax > 0 ? (value / calculatedMax) * 100 : 0;
  };
  
  // Get bar color
  const getBarColor = (color?: string) => {
    return color || 'bg-black';
  };
  
  return (
    <div 
      className={`
        ${getVariantStyles()}
        p-4
        ${className}
      `}
      style={{ 
        width, 
        height: typeof height === 'number' ? `${height}px` : height 
      }}
    >
      {/* Chart header */}
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-mono font-bold">{title}</h3>}
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
      )}
      
      {/* Chart body */}
      <div className="h-full flex flex-col">
        {/* Chart container */}
        <div className={`
          flex ${horizontal ? 'flex-row h-full' : 'flex-col-reverse w-full'}
          items-end justify-between gap-2
          ${horizontal ? 'mt-4' : ''}
          flex-grow
        `}>
          {data.map((item, index) => (
            <div 
              key={index}
              className={`
                flex ${horizontal ? 'flex-row items-center' : 'flex-col justify-end h-full'}
                relative
              `}
              style={{ 
                flexBasis: horizontal ? 'auto' : `${100 / data.length}%`,
                flexGrow: horizontal ? 0 : 1,
              }}
            >
              {/* Bar */}
              <div 
                className={`
                  ${getBarColor(item.color)}
                  ${horizontal ? 'h-8' : 'w-full'}
                `}
                style={{ 
                  width: horizontal ? `${getPercentage(item.value)}%` : undefined,
                  height: horizontal ? undefined : `${getPercentage(item.value)}%`,
                }}
              />
              
              {/* Value */}
              {showValues && (
                <div className={`
                  absolute text-sm font-mono
                  ${horizontal 
                    ? 'left-full ml-2 transform -translate-y-1/2' 
                    : 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full'}
                `}>
                  {valueFormat(item.value)}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Labels */}
        {showLabels && (
          <div className={`
            flex ${horizontal ? 'flex-col mr-4' : 'flex-row mt-4'}
            justify-between
          `}>
            {data.map((item, index) => (
              <div 
                key={index}
                className={`
                  text-xs font-mono text-center overflow-hidden text-ellipsis
                  ${horizontal ? 'mb-2 text-right' : 'text-center'}
                `}
                style={{ 
                  flexBasis: horizontal ? 'auto' : `${100 / data.length}%`,
                  flexGrow: horizontal ? 0 : 1,
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Line Chart
interface LineChartProps extends ChartBaseProps {
  data: {
    label: string;
    value: number;
  }[];
  showPoints?: boolean;
  showValues?: boolean;
  showLabels?: boolean;
  valueFormat?: (value: number) => string;
  lineColor?: string;
  pointColor?: string;
  maxValue?: number;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  title,
  description,
  width = '100%',
  height = 300,
  variant = 'default',
  showPoints = true,
  showValues = true,
  showLabels = true,
  valueFormat = (value) => value.toString(),
  lineColor = 'black',
  pointColor = 'black',
  maxValue,
  className = '',
}) => {
  // Calculate maximum value for scaling
  const calculatedMax = maxValue || Math.max(...data.map(item => item.value), 0);
  
  // Get variant-based styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Calculate percentage of the max value
  const getPercentage = (value: number) => {
    return calculatedMax > 0 ? (value / calculatedMax) * 100 : 0;
  };
  
  // Generate SVG path for line
  const generateLinePath = () => {
    if (data.length === 0) return '';
    
    const pointWidth = 100 / (data.length - 1);
    let path = `M 0,${100 - getPercentage(data[0].value)}`;
    
    for (let i = 1; i < data.length; i++) {
      const x = i * pointWidth;
      const y = 100 - getPercentage(data[i].value);
      path += ` L ${x},${y}`;
    }
    
    return path;
  };
  
  return (
    <div 
      className={`
        ${getVariantStyles()}
        p-4
        ${className}
      `}
      style={{ 
        width, 
        height: typeof height === 'number' ? `${height}px` : height 
      }}
    >
      {/* Chart header */}
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-mono font-bold">{title}</h3>}
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
      )}
      
      {/* Chart body */}
      <div className="h-full flex flex-col">
        {/* Chart container */}
        <div className="relative flex-grow">
          <svg 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            {/* Line */}
            <path
              d={generateLinePath()}
              fill="none"
              stroke={lineColor}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Points */}
            {showPoints && data.map((item, index) => {
              const pointWidth = 100 / (data.length - 1);
              const x = index * pointWidth;
              const y = 100 - getPercentage(item.value);
              
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="3"
                  fill={pointColor}
                  stroke="white"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
          
          {/* Values */}
          {showValues && data.map((item, index) => {
            const pointWidth = 100 / (data.length - 1);
            const left = `${index * pointWidth}%`;
            const top = `${100 - getPercentage(item.value)}%`;
            
            return (
              <div
                key={index}
                className="absolute text-xs font-mono transform -translate-x-1/2 -translate-y-full mb-1"
                style={{ left, top }}
              >
                {valueFormat(item.value)}
              </div>
            );
          })}
        </div>
        
        {/* Labels */}
        {showLabels && (
          <div className="flex justify-between mt-4">
            {data.map((item, index) => (
              <div 
                key={index}
                className="text-xs font-mono text-center overflow-hidden text-ellipsis"
                style={{ 
                  width: `${100 / data.length}%`,
                  marginLeft: index === 0 ? 0 : `-${50 / data.length}%`,
                  marginRight: index === data.length - 1 ? 0 : `-${50 / data.length}%`,
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Pie Chart
interface PieChartProps extends ChartBaseProps {
  data: {
    label: string;
    value: number;
    color?: string;
  }[];
  showLegend?: boolean;
  showPercentages?: boolean;
  valueFormat?: (value: number) => string;
  donut?: boolean;
  donutThickness?: number;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  title,
  description,
  width = '100%',
  height = 300,
  variant = 'default',
  showLegend = true,
  showPercentages = true,
  valueFormat = (value) => value.toString(),
  donut = false,
  donutThickness = 30,
  className = '',
}) => {
  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Get variant-based styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Get pie segments
  const getSegments = () => {
    let cumulativePercent = 0;
    
    return data.map((item, index) => {
      const percent = total > 0 ? (item.value / total) * 100 : 0;
      const startPercent = cumulativePercent;
      cumulativePercent += percent;
      
      // Calculate coordinates for the path
      const startX = Math.cos(2 * Math.PI * startPercent / 100);
      const startY = Math.sin(2 * Math.PI * startPercent / 100);
      const endX = Math.cos(2 * Math.PI * cumulativePercent / 100);
      const endY = Math.sin(2 * Math.PI * cumulativePercent / 100);
      
      // Generate path for the segment
      const largeArcFlag = percent > 50 ? 1 : 0;
      const pathData = [
        `M 0 0`,
        `L ${startX} ${startY}`,
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        `Z`
      ].join(' ');
      
      // Default colors
      const defaultColors = [
        'black', '#666', '#999', '#ccc', '#555', '#888', '#aaa', '#333'
      ];
      
      // Calculate the middle angle for label positioning
      const midPercent = startPercent + percent / 2;
      const midX = Math.cos(2 * Math.PI * midPercent / 100) * 0.7;
      const midY = Math.sin(2 * Math.PI * midPercent / 100) * 0.7;
      
      return {
        path: pathData,
        color: item.color || defaultColors[index % defaultColors.length],
        label: item.label,
        value: item.value,
        percent,
        labelPosition: {
          x: midX,
          y: midY,
        }
      };
    });
  };
  
  const segments = getSegments();
  
  return (
    <div 
      className={`
        ${getVariantStyles()}
        p-4
        ${className}
      `}
      style={{ 
        width, 
        height: typeof height === 'number' ? `${height}px` : height 
      }}
    >
      {/* Chart header */}
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-mono font-bold">{title}</h3>}
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
      )}
      
      <div className={`
        flex ${showLegend ? 'flex-row' : 'justify-center'} 
        h-full
      `}>
        {/* Chart container */}
        <div className={`
          ${showLegend ? 'w-2/3' : 'w-full'} 
          h-full flex items-center justify-center
        `}>
          <div className="relative" style={{ width: '80%', paddingBottom: '80%' }}>
            <svg
              viewBox="-1 -1 2 2"
              style={{ 
                position: 'absolute', 
                width: '100%', 
                height: '100%',
                transform: 'rotate(-90deg)' // Start first segment at the top
              }}
            >
              {segments.map((segment, index) => (
                <path
                  key={index}
                  d={segment.path}
                  fill={segment.color}
                  stroke="white"
                  strokeWidth="0.02"
                />
              ))}
              
              {/* Donut hole */}
              {donut && (
                <circle
                  cx="0"
                  cy="0"
                  r={donutThickness / 100}
                  fill="white"
                />
              )}
              
              {/* Percentage labels */}
              {showPercentages && segments.map((segment, index) => (
                <g
                  key={`label-${index}`}
                  transform={`rotate(90)`} // Counter-rotate to make text upright
                >
                  {segment.percent >= 5 && ( // Only show for segments large enough
                    <text
                      x={segment.labelPosition.x}
                      y={segment.labelPosition.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      style={{ fontSize: '0.1px', fontFamily: 'monospace', fontWeight: 'bold' }}
                    >
                      {Math.round(segment.percent)}%
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>
        
        {/* Legend */}
        {showLegend && (
          <div className="w-1/3 pl-4 flex flex-col justify-center">
            <div className="space-y-2">
              {segments.map((segment, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-4 h-4 mr-2 flex-shrink-0" 
                    style={{ backgroundColor: segment.color }}
                  />
                  <div className="text-sm font-mono truncate">
                    {segment.label}
                    <span className="ml-2 text-xs">
                      {valueFormat(segment.value)} ({Math.round(segment.percent)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Gauge Chart
interface GaugeChartProps extends ChartBaseProps {
  value: number;
  min?: number;
  max?: number;
  segments?: {
    value: number;
    color?: string;
    label?: string;
  }[];
  valueFormat?: (value: number) => string;
  showLabels?: boolean;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  min = 0,
  max = 100,
  segments = [],
  title,
  description,
  width = '100%',
  height = 200,
  variant = 'default',
  valueFormat = (value) => value.toString(),
  showLabels = true,
  className = '',
}) => {
  // Normalize value
  const normalizedValue = Math.max(min, Math.min(max, value));
  const percentage = (normalizedValue - min) / (max - min);
  
  // Get variant-based styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Default segments if none provided
  const normalizedSegments = segments.length > 0 ? segments : [
    { value: max * 0.33, color: 'black' },
    { value: max * 0.66, color: '#666' },
    { value: max, color: '#aaa' },
  ];
  
  // Sort segments by value
  const sortedSegments = [...normalizedSegments].sort((a, b) => a.value - b.value);
  
  // Generate arcs for each segment
  const generateArcs = () => {
    let prevValue = min;
    return sortedSegments.map((segment, index) => {
      const normalizedStart = (prevValue - min) / (max - min);
      const normalizedEnd = (segment.value - min) / (max - min);
      
      const startAngle = -Math.PI / 2 + (Math.PI * normalizedStart);
      const endAngle = -Math.PI / 2 + (Math.PI * normalizedEnd);
      
      const startX = Math.cos(startAngle);
      const startY = Math.sin(startAngle);
      const endX = Math.cos(endAngle);
      const endY = Math.sin(endAngle);
      
      const largeArcFlag = normalizedEnd - normalizedStart > 0.5 ? 1 : 0;
      
      const pathData = [
        `M ${startX} ${startY}`,
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      ].join(' ');
      
      const result = {
        path: pathData,
        color: segment.color || 'black',
        label: segment.label,
      };
      
      prevValue = segment.value;
      return result;
    });
  };
  
  // Calculate needle position
  const calculateNeedlePosition = () => {
    const angle = -Math.PI / 2 + (Math.PI * percentage);
    const x = Math.cos(angle) * 0.75;
    const y = Math.sin(angle) * 0.75;
    
    return { x, y };
  };
  
  const arcs = generateArcs();
  const needlePosition = calculateNeedlePosition();
  
  return (
    <div 
      className={`
        ${getVariantStyles()}
        p-4
        ${className}
      `}
      style={{ 
        width, 
        height: typeof height === 'number' ? `${height}px` : height 
      }}
    >
      {/* Chart header */}
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-mono font-bold">{title}</h3>}
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
      )}
      
      <div className="h-full flex flex-col">
        {/* Chart container */}
        <div className="relative flex-grow flex items-center justify-center">
          <svg
            viewBox="-1.1 -1.1 2.2 1.2" // Extra space for labels
            className="w-full"
            style={{ maxHeight: '100%' }}
          >
            {/* Gauge background */}
            <path
              d="M -1 0 A 1 1 0 0 1 1 0"
              fill="none"
              stroke="#e5e5e5"
              strokeWidth="0.15"
            />
            
            {/* Segments */}
            {arcs.map((arc, index) => (
              <path
                key={index}
                d={arc.path}
                fill="none"
                stroke={arc.color}
                strokeWidth="0.15"
              />
            ))}
            
            {/* Label min value */}
            {showLabels && (
              <text
                x="-1"
                y="0.2"
                textAnchor="middle"
                dominantBaseline="hanging"
                style={{ fontSize: '0.1px', fontFamily: 'monospace' }}
              >
                {min}
              </text>
            )}
            
            {/* Label max value */}
            {showLabels && (
              <text
                x="1"
                y="0.2"
                textAnchor="middle"
                dominantBaseline="hanging"
                style={{ fontSize: '0.1px', fontFamily: 'monospace' }}
              >
                {max}
              </text>
            )}
            
            {/* Needle */}
            <line
              x1="0"
              y1="0"
              x2={needlePosition.x}
              y2={needlePosition.y}
              stroke="black"
              strokeWidth="0.03"
            />
            
            {/* Needle center */}
            <circle
              cx="0"
              cy="0"
              r="0.05"
              fill="black"
            />
            
            {/* Value display */}
            <text
              x="0"
              y="0.5"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontSize: '0.15px', fontFamily: 'monospace', fontWeight: 'bold' }}
            >
              {valueFormat(normalizedValue)}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

// Example implementation
export const ChartExamples: React.FC = () => {
  // Sample data for bar chart
  const barData = [
    { label: 'Jan', value: 45 },
    { label: 'Feb', value: 70 },
    { label: 'Mar', value: 35 },
    { label: 'Apr', value: 60 },
    { label: 'May', value: 80 },
    { label: 'Jun', value: 50 },
  ];
  
  // Sample data for line chart
  const lineData = [
    { label: 'Mon', value: 30 },
    { label: 'Tue', value: 60 },
    { label: 'Wed', value: 45 },
    { label: 'Thu', value: 70 },
    { label: 'Fri', value: 55 },
    { label: 'Sat', value: 80 },
    { label: 'Sun', value: 65 },
  ];
  
  // Sample data for pie chart
  const pieData = [
    { label: 'Product A', value: 35, color: 'black' },
    { label: 'Product B', value: 25, color: '#555' },
    { label: 'Product C', value: 20, color: '#888' },
    { label: 'Product D', value: 15, color: '#aaa' },
    { label: 'Others', value: 5, color: '#ccc' },
  ];
  
  // Sample data for gauge chart
  const gaugeValue = 67;
  const gaugeSegments = [
    { value: 33, color: '#888', label: 'Low' },
    { value: 66, color: '#555', label: 'Medium' },
    { value: 100, color: 'black', label: 'High' },
  ];
  
  return (
    <div className="p-6 max-w-6xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Chart Components</h2>
      <p className="mb-8 font-sans">
        Chart components with brutalist styling for data visualization.
      </p>
      
      <div className="space-y-16">
        {/* Bar Charts */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Bar Charts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Vertical Bar Chart</h4>
              <BarChart
                data={barData}
                title="Monthly Sales"
                description="Sales performance over the past 6 months"
                variant="bordered"
                valueFormat={(value) => `$${value}k`}
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Horizontal Bar Chart</h4>
              <BarChart
                data={barData}
                title="Monthly Sales"
                horizontal
                variant="bordered"
                valueFormat={(value) => `$${value}k`}
              />
            </div>
          </div>
        </div>
        
        {/* Line Charts */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Line Chart</h3>
          <div className="grid grid-cols-1 gap-8">
            <LineChart
              data={lineData}
              title="Weekly Traffic"
              description="Website visitors per day"
              variant="bordered"
              valueFormat={(value) => `${value}k`}
            />
          </div>
        </div>
        
        {/* Pie Charts */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Pie Charts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Pie Chart</h4>
              <PieChart
                data={pieData}
                title="Revenue by Product"
                variant="bordered"
                valueFormat={(value) => `$${value}k`}
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Donut Chart</h4>
              <PieChart
                data={pieData}
                title="Revenue by Product"
                variant="bordered"
                valueFormat={(value) => `$${value}k`}
                donut
              />
            </div>
          </div>
        </div>
        
        {/* Gauge Chart */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Gauge Chart</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Basic Gauge</h4>
              <GaugeChart
                value={gaugeValue}
                title="Performance Metric"
                variant="bordered"
                valueFormat={(value) => `${value}%`}
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Segmented Gauge</h4>
              <GaugeChart
                value={gaugeValue}
                title="System Load"
                variant="bordered"
                valueFormat={(value) => `${value}%`}
                segments={gaugeSegments}
              />
            </div>
          </div>
        </div>
        
        {/* Chart Variants */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Chart Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Default</h4>
              <BarChart
                data={barData.slice(0, 3)}
                variant="default"
                height={200}
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Bordered</h4>
              <BarChart
                data={barData.slice(0, 3)}
                variant="bordered"
                height={200}
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Cutout</h4>
              <BarChart
                data={barData.slice(0, 3)}
                variant="cutout"
                height={200}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 