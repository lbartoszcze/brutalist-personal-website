import React from 'react';

// Stat item props
interface StatItemProps {
  /**
   * Label for the stat
   */
  label: React.ReactNode;
  /**
   * Value of the stat
   */
  value: React.ReactNode;
  /**
   * Optional description or helper text
   */
  description?: React.ReactNode;
  /**
   * Optional icon to display
   */
  icon?: React.ReactNode;
  /**
   * Optional change indicator (positive or negative)
   */
  change?: number;
  /**
   * Whether to show the change indicator
   */
  showChange?: boolean;
  /**
   * Variant of the stat item
   */
  variant?: 'default' | 'bordered' | 'cutout';
  /**
   * Size of the stat item
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Alignment of the content
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Custom class name
   */
  className?: string;
}

export const StatItem: React.FC<StatItemProps> = ({
  label,
  value,
  description,
  icon,
  change,
  showChange = true,
  variant = 'default',
  size = 'medium',
  align = 'left',
  className = '',
}) => {
  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'p-3';
      case 'large':
        return 'p-6';
      case 'medium':
      default:
        return 'p-4';
    }
  };
  
  // Get alignment styles
  const getAlignmentStyles = () => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      case 'left':
      default:
        return 'text-left';
    }
  };
  
  // Get change indicator color
  const getChangeColor = () => {
    if (!change) return 'text-gray-500';
    return change > 0 ? 'text-green-600' : 'text-red-600';
  };
  
  // Format change for display
  const formatChange = () => {
    if (!change) return '0%';
    const sign = change > 0 ? '+' : '';
    return `${sign}${change}%`;
  };
  
  return (
    <div 
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${getAlignmentStyles()}
        ${className}
      `}
    >
      {/* Label */}
      <div className="font-mono text-sm text-gray-500 uppercase mb-1">
        {label}
      </div>
      
      {/* Value row */}
      <div className="flex items-center">
        {/* Icon */}
        {icon && (
          <div className="mr-2">
            {icon}
          </div>
        )}
        
        {/* Value */}
        <div className="text-2xl font-mono font-bold">
          {value}
        </div>
        
        {/* Change indicator */}
        {showChange && change !== undefined && (
          <div className={`ml-2 text-sm font-mono ${getChangeColor()}`}>
            {formatChange()}
          </div>
        )}
      </div>
      
      {/* Description */}
      {description && (
        <div className="mt-1 text-sm text-gray-600">
          {description}
        </div>
      )}
    </div>
  );
};

// Stats grid props
interface StatsGridProps {
  /**
   * Items to display in the grid
   */
  items: StatItemProps[];
  /**
   * Number of columns in the grid
   */
  columns?: 1 | 2 | 3 | 4 | 5;
  /**
   * Gap between items
   */
  gap?: 'none' | 'small' | 'medium' | 'large';
  /**
   * Variant to apply to all items
   */
  variant?: 'default' | 'bordered' | 'cutout';
  /**
   * Size to apply to all items
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Custom class name
   */
  className?: string;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  items,
  columns = 3,
  gap = 'medium',
  variant = 'default',
  size = 'medium',
  className = '',
}) => {
  // Get columns styles
  const getColumnsStyles = () => {
    switch (columns) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      case 5:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5';
      default:
        return 'grid-cols-1 md:grid-cols-3';
    }
  };
  
  // Get gap styles
  const getGapStyles = () => {
    switch (gap) {
      case 'none':
        return 'gap-0';
      case 'small':
        return 'gap-2';
      case 'large':
        return 'gap-6';
      case 'medium':
      default:
        return 'gap-4';
    }
  };
  
  return (
    <div 
      className={`
        grid ${getColumnsStyles()} ${getGapStyles()}
        ${className}
      `}
    >
      {items.map((item, index) => (
        <StatItem
          key={index}
          variant={item.variant || variant}
          size={item.size || size}
          {...item}
        />
      ))}
    </div>
  );
};

// Stat comparison props
interface StatComparisonProps {
  /**
   * Title of the comparison
   */
  title?: React.ReactNode;
  /**
   * First value to compare
   */
  value1: React.ReactNode;
  /**
   * Second value to compare
   */
  value2: React.ReactNode;
  /**
   * Label for the first value
   */
  label1: React.ReactNode;
  /**
   * Label for the second value
   */
  label2: React.ReactNode;
  /**
   * Percentage difference between values
   */
  difference?: number;
  /**
   * Whether to show the difference indicator
   */
  showDifference?: boolean;
  /**
   * Higher is better (for coloring the difference)
   */
  higherIsBetter?: boolean;
  /**
   * Variant of the comparison
   */
  variant?: 'default' | 'bordered' | 'cutout';
  /**
   * Custom class name
   */
  className?: string;
}

export const StatComparison: React.FC<StatComparisonProps> = ({
  title,
  value1,
  value2,
  label1,
  label2,
  difference,
  showDifference = true,
  higherIsBetter = true,
  variant = 'default',
  className = '',
}) => {
  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Get difference color
  const getDifferenceColor = () => {
    if (!difference) return 'text-gray-500';
    
    if (higherIsBetter) {
      return difference > 0 ? 'text-green-600' : 'text-red-600';
    } else {
      return difference > 0 ? 'text-red-600' : 'text-green-600';
    }
  };
  
  // Format difference for display
  const formatDifference = () => {
    if (!difference) return '0%';
    const sign = difference > 0 ? '+' : '';
    return `${sign}${difference}%`;
  };
  
  return (
    <div 
      className={`
        ${getVariantStyles()}
        p-4
        ${className}
      `}
    >
      {/* Title */}
      {title && (
        <div className="font-mono font-bold mb-3">
          {title}
        </div>
      )}
      
      <div className="flex">
        {/* First value */}
        <div className="w-1/2 pr-2">
          <div className="text-2xl font-mono font-bold">
            {value1}
          </div>
          <div className="text-sm text-gray-500 font-mono">
            {label1}
          </div>
        </div>
        
        {/* Divider */}
        <div className="mx-2 border-r border-gray-300"></div>
        
        {/* Second value */}
        <div className="w-1/2 pl-2">
          <div className="text-2xl font-mono font-bold">
            {value2}
          </div>
          <div className="text-sm text-gray-500 font-mono">
            {label2}
          </div>
        </div>
      </div>
      
      {/* Difference indicator */}
      {showDifference && difference !== undefined && (
        <div className={`mt-2 text-center text-sm font-mono ${getDifferenceColor()}`}>
          {formatDifference()} difference
        </div>
      )}
    </div>
  );
};

// Stat trend props
interface StatTrendProps {
  /**
   * Label for the stat
   */
  label: React.ReactNode;
  /**
   * Current value
   */
  value: React.ReactNode;
  /**
   * Data points for the trend
   */
  data: number[];
  /**
   * Whether the trend is positive (up is good)
   */
  isPositive?: boolean;
  /**
   * Height of the trend chart
   */
  height?: number;
  /**
   * Variant of the trend
   */
  variant?: 'default' | 'bordered' | 'cutout';
  /**
   * Custom class name
   */
  className?: string;
}

export const StatTrend: React.FC<StatTrendProps> = ({
  label,
  value,
  data,
  isPositive = true,
  height = 40,
  variant = 'default',
  className = '',
}) => {
  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Get trend color
  const getTrendColor = () => {
    if (data.length < 2) return 'black';
    
    const firstValue = data[0];
    const lastValue = data[data.length - 1];
    const trend = lastValue - firstValue;
    
    if (trend === 0) return 'black';
    
    if (isPositive) {
      return trend > 0 ? '#10B981' : '#EF4444';
    } else {
      return trend > 0 ? '#EF4444' : '#10B981';
    }
  };
  
  // Generate sparkline path
  const generateSparklinePath = () => {
    if (data.length === 0) return '';
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1; // Avoid division by zero
    
    const width = 100;
    const getX = (index: number) => (index / (data.length - 1)) * width;
    const getY = (value: number) => height - ((value - min) / range) * height;
    
    let path = `M 0,${getY(data[0])}`;
    
    for (let i = 1; i < data.length; i++) {
      path += ` L ${getX(i)},${getY(data[i])}`;
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
    >
      {/* Label */}
      <div className="font-mono text-sm text-gray-500 uppercase mb-1">
        {label}
      </div>
      
      {/* Value */}
      <div className="text-2xl font-mono font-bold mb-3">
        {value}
      </div>
      
      {/* Trend chart */}
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
      >
        <path
          d={generateSparklinePath()}
          fill="none"
          stroke={getTrendColor()}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

// Examples
export const StatsExamples: React.FC = () => {
  // Sample data for examples
  const sampleStats = [
    {
      label: 'Total Revenue',
      value: '$24,567',
      description: 'For the past 30 days',
      change: 12.5,
    },
    {
      label: 'Active Users',
      value: '4,123',
      description: 'Currently online',
      change: -2.3,
    },
    {
      label: 'Conversion Rate',
      value: '3.2%',
      description: 'From visitors to customers',
      change: 0.8,
    },
    {
      label: 'Avg. Order Value',
      value: '$89.45',
      description: 'Per transaction',
      change: 5.1,
    },
  ];
  
  // Sample trend data
  const revenueData = [30, 35, 28, 45, 40, 50, 55, 48, 60, 65];
  const usersData = [800, 820, 810, 835, 845, 860, 880, 870, 890, 920];
  const conversionData = [3.1, 3.0, 2.9, 3.0, 3.2, 3.1, 3.3, 3.2, 3.4, 3.2];
  
  return (
    <div className="p-6 max-w-6xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Stat Components</h2>
      <p className="mb-8 font-sans">
        Statistics and metrics display components with brutalist styling.
      </p>
      
      <div className="space-y-16">
        {/* Basic Stat Items */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Individual Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatItem
              label="Revenue"
              value="$42,900"
              description="Total monthly revenue"
              change={8.2}
              variant="bordered"
            />
            
            <StatItem
              label="Users"
              value="1,429"
              description="Active this week"
              change={-3.1}
              variant="bordered"
            />
            
            <StatItem
              label="Conversion"
              value="4.3%"
              description="From visitors to customers"
              change={0.4}
              variant="bordered"
            />
            
            <StatItem
              label="Bounce Rate"
              value="28.5%"
              description="Visitor exits without actions"
              change={-5.2}
              showChange={true}
              variant="bordered"
            />
          </div>
        </div>
        
        {/* Stats Grid */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Stats Grid</h3>
          <StatsGrid
            items={sampleStats}
            columns={4}
            gap="medium"
            variant="bordered"
          />
        </div>
        
        {/* Stat Variants */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Stat Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Default</h4>
              <StatItem
                label="Page Views"
                value="12,345"
                description="Last 7 days"
                change={4.2}
                variant="default"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Bordered</h4>
              <StatItem
                label="Page Views"
                value="12,345"
                description="Last 7 days"
                change={4.2}
                variant="bordered"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Cutout</h4>
              <StatItem
                label="Page Views"
                value="12,345"
                description="Last 7 days"
                change={4.2}
                variant="cutout"
              />
            </div>
          </div>
        </div>
        
        {/* Stat Sizes */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Stat Sizes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Small</h4>
              <StatItem
                label="New Orders"
                value="42"
                description="Today"
                change={2.8}
                variant="bordered"
                size="small"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Medium</h4>
              <StatItem
                label="New Orders"
                value="42"
                description="Today"
                change={2.8}
                variant="bordered"
                size="medium"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Large</h4>
              <StatItem
                label="New Orders"
                value="42"
                description="Today"
                change={2.8}
                variant="bordered"
                size="large"
              />
            </div>
          </div>
        </div>
        
        {/* Stat Alignments */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Stat Alignments</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Left Aligned</h4>
              <StatItem
                label="Total Sales"
                value="$18,245"
                description="This quarter"
                change={6.7}
                variant="bordered"
                align="left"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Center Aligned</h4>
              <StatItem
                label="Total Sales"
                value="$18,245"
                description="This quarter"
                change={6.7}
                variant="bordered"
                align="center"
              />
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Right Aligned</h4>
              <StatItem
                label="Total Sales"
                value="$18,245"
                description="This quarter"
                change={6.7}
                variant="bordered"
                align="right"
              />
            </div>
          </div>
        </div>
        
        {/* Stat Comparison */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Stat Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StatComparison
              title="Monthly Revenue Comparison"
              value1="$42,900"
              value2="$38,700"
              label1="This Month"
              label2="Last Month"
              difference={10.9}
              variant="bordered"
            />
            
            <StatComparison
              title="Bounce Rate Comparison"
              value1="24.8%"
              value2="29.4%"
              label1="This Month"
              label2="Last Month"
              difference={-15.6}
              higherIsBetter={false}
              variant="bordered"
            />
          </div>
        </div>
        
        {/* Stat Trends */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Stat Trends</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatTrend
              label="Revenue Trend"
              value="$65,230"
              data={revenueData}
              variant="bordered"
            />
            
            <StatTrend
              label="User Growth"
              value="920"
              data={usersData}
              variant="bordered"
            />
            
            <StatTrend
              label="Conversion Rate"
              value="3.2%"
              data={conversionData}
              variant="bordered"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 