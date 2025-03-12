import React from 'react';

// Feature item interface
interface PricingFeature {
  /**
   * Feature text
   */
  text: string;
  /**
   * Whether the feature is included in the plan
   */
  included: boolean;
  /**
   * Optional tooltip text for the feature
   */
  tooltip?: string;
}

// Price tier interface
interface PricingTier {
  /**
   * Plan name
   */
  name: string;
  /**
   * Price amount
   */
  price: number | string;
  /**
   * Billing period (e.g., monthly, yearly)
   */
  period?: string;
  /**
   * Description of the plan
   */
  description?: string;
  /**
   * Array of features in the plan
   */
  features: PricingFeature[];
  /**
   * Optional badge text (e.g., "Popular", "Best Value")
   */
  badge?: string;
  /**
   * Primary action button text
   */
  buttonText?: string;
  /**
   * Primary action button URL
   */
  buttonUrl?: string;
  /**
   * Secondary action text (e.g., "Learn more")
   */
  secondaryText?: string;
  /**
   * Secondary action URL
   */
  secondaryUrl?: string;
  /**
   * Whether the plan is highlighted
   */
  highlight?: boolean;
  /**
   * Whether the plan is disabled
   */
  disabled?: boolean;
}

// Pricing card props
interface PricingCardProps {
  /**
   * Pricing tier
   */
  tier: PricingTier;
  /**
   * Variant of the card
   */
  variant?: 'default' | 'bordered' | 'cutout' | 'minimal';
  /**
   * Currency symbol
   */
  currency?: string;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Click handler for primary button
   */
  onButtonClick?: (tier: PricingTier) => void;
}

/**
 * A single pricing card component
 */
export const PricingCard: React.FC<PricingCardProps> = ({
  tier,
  variant = 'default',
  currency = '$',
  className = '',
  onButtonClick,
}) => {
  const {
    name,
    price,
    period,
    description,
    features,
    badge,
    buttonText = 'Subscribe',
    buttonUrl,
    secondaryText,
    secondaryUrl,
    highlight = false,
    disabled = false,
  } = tier;
  
  // Get container styles based on variant
  const getContainerStyles = () => {
    const baseStyles = 'flex flex-col h-full bg-white relative';
    
    switch (variant) {
      case 'bordered':
        return `${baseStyles} border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`;
      case 'cutout':
        return `${baseStyles} border-2 border-black transform rotate-[-0.5deg]`;
      case 'minimal':
        return `${baseStyles} border border-gray-200`;
      default:
        return `${baseStyles} border-2 border-black`;
    }
  };
  
  // Handle button click
  const handleButtonClick = () => {
    if (disabled) return;
    
    if (onButtonClick) {
      onButtonClick(tier);
    } else if (buttonUrl) {
      window.location.href = buttonUrl;
    }
  };
  
  // Format the price display
  const formatPrice = () => {
    if (typeof price === 'string') {
      return price;
    }
    
    // Format as currency
    return `${currency}${price}`;
  };
  
  return (
    <div 
      className={`
        ${getContainerStyles()}
        ${highlight ? 'border-4 border-black' : ''}
        ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-black text-white px-3 py-1 font-mono text-sm">
          {badge}
        </div>
      )}
      
      {/* Header */}
      <div className="p-6 border-b-2 border-black">
        <h3 className="text-xl font-mono font-bold mb-2">{name}</h3>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
      
      {/* Pricing */}
      <div className="p-6 border-b-2 border-black text-center">
        <div className="flex items-end justify-center">
          <span className="text-3xl font-mono font-bold">{formatPrice()}</span>
          {period && <span className="ml-1 text-gray-600">/{period}</span>}
        </div>
      </div>
      
      {/* Features */}
      <div className="p-6 flex-grow">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li 
              key={index}
              className="flex items-start"
              title={feature.tooltip}
            >
              <span className={`mr-2 ${feature.included ? 'text-green-500' : 'text-red-500'}`}>
                {feature.included ? '✓' : '✕'}
              </span>
              <span className={feature.included ? 'font-medium' : 'text-gray-500'}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Actions */}
      <div className="p-6 mt-auto">
        <button
          onClick={handleButtonClick}
          disabled={disabled}
          className={`
            w-full mb-2 py-2 px-4 font-mono font-bold
            ${disabled ? 'cursor-not-allowed bg-gray-200 text-gray-500' : 
              highlight ? 'bg-black text-white hover:bg-gray-800' : 
              'border-2 border-black hover:bg-black hover:text-white'}
            transition-colors
          `}
        >
          {buttonText}
        </button>
        
        {secondaryText && (
          <a 
            href={secondaryUrl} 
            className="block text-center text-sm text-gray-600 hover:underline"
          >
            {secondaryText}
          </a>
        )}
      </div>
    </div>
  );
};

// Pricing table props
interface PricingTableProps {
  /**
   * Array of pricing tiers
   */
  tiers: PricingTier[];
  /**
   * Title of the section
   */
  title?: string;
  /**
   * Subtitle or description
   */
  subtitle?: string;
  /**
   * Variant of the cards
   */
  variant?: 'default' | 'bordered' | 'cutout' | 'minimal';
  /**
   * Currency symbol
   */
  currency?: string;
  /**
   * Whether to show a divider between tiers
   */
  showDivider?: boolean;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Click handler for action buttons
   */
  onButtonClick?: (tier: PricingTier) => void;
}

/**
 * A pricing table component
 */
export const PricingTable: React.FC<PricingTableProps> = ({
  tiers,
  title = 'Pricing Plans',
  subtitle,
  variant = 'bordered',
  currency = '$',
  showDivider = true,
  className = '',
  onButtonClick,
}) => {
  return (
    <div className={`${className}`}>
      {/* Section header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-mono font-bold uppercase mb-4">{title}</h2>
        {subtitle && <p className="text-lg max-w-2xl mx-auto">{subtitle}</p>}
      </div>
      
      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, index) => (
          <React.Fragment key={index}>
            <PricingCard
              tier={tier}
              variant={variant}
              currency={currency}
              onButtonClick={onButtonClick}
            />
            
            {/* Optional divider between tiers */}
            {showDivider && index < tiers.length - 1 && (
              <div className="hidden md:block absolute h-full w-px bg-gray-200 -ml-4" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Toggle pricing period props
interface PricingToggleProps {
  /**
   * First period option
   */
  firstOption: string;
  /**
   * Second period option
   */
  secondOption: string;
  /**
   * Currently selected option
   */
  selectedOption: string;
  /**
   * Change handler
   */
  onChange: (option: string) => void;
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * A toggle for switching between pricing periods
 */
export const PricingToggle: React.FC<PricingToggleProps> = ({
  firstOption,
  secondOption,
  selectedOption,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-center mb-8 ${className}`}>
      <button
        onClick={() => onChange(firstOption)}
        className={`
          py-2 px-4 font-mono font-bold
          ${selectedOption === firstOption ? 'bg-black text-white' : 'border-2 border-black'}
          transition-colors
        `}
      >
        {firstOption}
      </button>
      <button
        onClick={() => onChange(secondOption)}
        className={`
          py-2 px-4 font-mono font-bold
          ${selectedOption === secondOption ? 'bg-black text-white' : 'border-2 border-black'}
          border-l-0
          transition-colors
        `}
      >
        {secondOption}
      </button>
    </div>
  );
};

// Horizontal pricing comparison props
interface PricingComparisonProps {
  /**
   * Array of pricing tiers
   */
  tiers: PricingTier[];
  /**
   * Title of the section
   */
  title?: string;
  /**
   * Subtitle or description
   */
  subtitle?: string;
  /**
   * Currency symbol
   */
  currency?: string;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Click handler for action buttons
   */
  onButtonClick?: (tier: PricingTier) => void;
}

/**
 * A horizontal pricing comparison table
 */
export const PricingComparison: React.FC<PricingComparisonProps> = ({
  tiers,
  title = 'Compare Plans',
  subtitle,
  currency = '$',
  className = '',
  onButtonClick,
}) => {
  // Get all unique features across all tiers
  const getAllFeatures = () => {
    const allFeatures = new Set<string>();
    
    tiers.forEach(tier => {
      tier.features.forEach(feature => {
        allFeatures.add(feature.text);
      });
    });
    
    return Array.from(allFeatures);
  };
  
  const allFeatures = getAllFeatures();
  
  // Check if a tier includes a specific feature
  const hasFeature = (tier: PricingTier, featureText: string) => {
    const feature = tier.features.find(f => f.text === featureText);
    return feature ? feature.included : false;
  };
  
  // Get tooltip for a specific feature in a tier
  const getTooltip = (tier: PricingTier, featureText: string) => {
    const feature = tier.features.find(f => f.text === featureText);
    return feature ? feature.tooltip : undefined;
  };
  
  // Format the price display
  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') {
      return price;
    }
    
    // Format as currency
    return `${currency}${price}`;
  };
  
  return (
    <div className={`${className}`}>
      {/* Section header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-mono font-bold uppercase mb-4">{title}</h2>
        {subtitle && <p className="text-lg max-w-2xl mx-auto">{subtitle}</p>}
      </div>
      
      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-2 border-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-2 border-black p-4 text-left font-mono">Feature</th>
              {tiers.map((tier, index) => (
                <th key={index} className="border-2 border-black p-4 text-center font-mono">
                  {tier.badge && (
                    <span className="inline-block bg-black text-white px-2 py-0.5 text-xs mb-2">
                      {tier.badge}
                    </span>
                  )}
                  <div className="text-xl">{tier.name}</div>
                </th>
              ))}
            </tr>
            <tr>
              <th className="border-2 border-black p-4 text-left font-mono">Price</th>
              {tiers.map((tier, index) => (
                <th key={index} className="border-2 border-black p-4 text-center">
                  <div className="text-xl font-mono font-bold">{formatPrice(tier.price)}</div>
                  {tier.period && <div className="text-sm text-gray-600">/{tier.period}</div>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allFeatures.map((feature, featureIndex) => (
              <tr key={featureIndex} className={featureIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border-2 border-black p-4 font-mono">{feature}</td>
                {tiers.map((tier, tierIndex) => (
                  <td 
                    key={tierIndex} 
                    className="border-2 border-black p-4 text-center"
                    title={getTooltip(tier, feature)}
                  >
                    <span className={`text-xl ${hasFeature(tier, feature) ? 'text-green-500' : 'text-red-500'}`}>
                      {hasFeature(tier, feature) ? '✓' : '✕'}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="border-2 border-black p-4"></td>
              {tiers.map((tier, index) => (
                <td key={index} className="border-2 border-black p-4 text-center">
                  <button
                    onClick={() => onButtonClick && onButtonClick(tier)}
                    disabled={tier.disabled}
                    className={`
                      py-2 px-4 font-mono font-bold
                      ${tier.disabled ? 'cursor-not-allowed bg-gray-200 text-gray-500' : 
                        tier.highlight ? 'bg-black text-white hover:bg-gray-800' : 
                        'border-2 border-black hover:bg-black hover:text-white'}
                      transition-colors
                    `}
                  >
                    {tier.buttonText || 'Subscribe'}
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Example implementation
export const PricingExamples: React.FC = () => {
  // State for toggle
  const [selectedPeriod, setSelectedPeriod] = React.useState('Monthly');
  
  // Sample pricing tiers - Monthly
  const monthlyTiers = [
    {
      name: 'Basic',
      price: 9.99,
      period: 'month',
      description: 'Perfect for individuals and small projects',
      features: [
        { text: 'Up to 5 projects', included: true },
        { text: '10GB storage', included: true },
        { text: 'Basic support', included: true },
        { text: 'Access to core features', included: true },
        { text: 'Advanced analytics', included: false },
        { text: 'Custom domains', included: false },
        { text: 'Priority support', included: false },
      ],
      buttonText: 'Start Free Trial',
      secondaryText: 'No credit card required',
    },
    {
      name: 'Pro',
      price: 29.99,
      period: 'month',
      description: 'Ideal for professionals and growing teams',
      badge: 'POPULAR',
      highlight: true,
      features: [
        { text: 'Up to 20 projects', included: true },
        { text: '50GB storage', included: true },
        { text: 'Basic support', included: true },
        { text: 'Access to core features', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Custom domains', included: true },
        { text: 'Priority support', included: false, tooltip: 'Available in Enterprise plan' },
      ],
      buttonText: 'Subscribe Now',
    },
    {
      name: 'Enterprise',
      price: 99.99,
      period: 'month',
      description: 'For large organizations with advanced needs',
      features: [
        { text: 'Unlimited projects', included: true },
        { text: '250GB storage', included: true },
        { text: 'Basic support', included: true },
        { text: 'Access to core features', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Custom domains', included: true },
        { text: 'Priority support', included: true },
      ],
      buttonText: 'Contact Sales',
    },
  ];
  
  // Sample pricing tiers - Yearly (with discount)
  const yearlyTiers = [
    {
      name: 'Basic',
      price: 99.99,
      period: 'year',
      description: 'Perfect for individuals and small projects',
      features: [
        { text: 'Up to 5 projects', included: true },
        { text: '10GB storage', included: true },
        { text: 'Basic support', included: true },
        { text: 'Access to core features', included: true },
        { text: 'Advanced analytics', included: false },
        { text: 'Custom domains', included: false },
        { text: 'Priority support', included: false },
      ],
      buttonText: 'Start Free Trial',
      secondaryText: '2 months free',
    },
    {
      name: 'Pro',
      price: 299.99,
      period: 'year',
      description: 'Ideal for professionals and growing teams',
      badge: 'BEST VALUE',
      highlight: true,
      features: [
        { text: 'Up to 20 projects', included: true },
        { text: '50GB storage', included: true },
        { text: 'Basic support', included: true },
        { text: 'Access to core features', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Custom domains', included: true },
        { text: 'Priority support', included: false, tooltip: 'Available in Enterprise plan' },
      ],
      buttonText: 'Subscribe Now',
      secondaryText: '2 months free',
    },
    {
      name: 'Enterprise',
      price: 999.99,
      period: 'year',
      description: 'For large organizations with advanced needs',
      features: [
        { text: 'Unlimited projects', included: true },
        { text: '250GB storage', included: true },
        { text: 'Basic support', included: true },
        { text: 'Access to core features', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Custom domains', included: true },
        { text: 'Priority support', included: true },
      ],
      buttonText: 'Contact Sales',
      secondaryText: '2 months free',
    },
  ];
  
  // Get current tiers based on selected period
  const currentTiers = selectedPeriod === 'Monthly' ? monthlyTiers : yearlyTiers;
  
  // Handle button click
  const handleButtonClick = (tier: PricingTier) => {
    console.log(`Selected tier: ${tier.name}, Price: ${tier.price} / ${tier.period}`);
  };
  
  return (
    <div className="p-6 space-y-32">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Pricing Components</h2>
      <p className="mb-8 font-sans">
        Pricing components with brutalist styling for showcasing product pricing.
      </p>
      
      {/* Single Pricing Card Examples */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Pricing Card Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard
            tier={monthlyTiers[0]}
            variant="default"
          />
          
          <PricingCard
            tier={monthlyTiers[1]}
            variant="bordered"
          />
          
          <PricingCard
            tier={monthlyTiers[2]}
            variant="cutout"
          />
        </div>
      </div>
      
      {/* Pricing Table with Toggle Example */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Pricing Table with Period Toggle</h3>
        <PricingToggle
          firstOption="Monthly"
          secondOption="Yearly"
          selectedOption={selectedPeriod}
          onChange={setSelectedPeriod}
        />
        
        <PricingTable
          tiers={currentTiers}
          title="Choose Your Plan"
          subtitle="All plans include a 14-day free trial. No credit card required to start."
          variant="bordered"
          onButtonClick={handleButtonClick}
        />
      </div>
      
      {/* Pricing Comparison Table Example */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Pricing Comparison Table</h3>
        <PricingComparison
          tiers={currentTiers}
          title="Compare Features"
          subtitle="See which plan is right for your needs."
          onButtonClick={handleButtonClick}
        />
      </div>
    </div>
  );
}; 