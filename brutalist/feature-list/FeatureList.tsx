import React from 'react';

interface FeatureItemProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  isHighlighted?: boolean;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ 
  title, 
  description, 
  icon, 
  isHighlighted = false 
}) => (
  <div 
    className={`
      p-4 border-2 border-black 
      ${isHighlighted ? 'rotate-1 bg-gray-100' : ''}
    `}
  >
    {icon && (
      <div className="mb-3 text-2xl">{icon}</div>
    )}
    <h3 className="text-xl font-mono font-bold uppercase mb-2">{title}</h3>
    <p className="font-sans">{description}</p>
  </div>
);

interface FeatureListProps {
  title: string;
  description?: string;
  features: FeatureItemProps[];
  columns?: 1 | 2 | 3 | 4;
}

export const FeatureList: React.FC<FeatureListProps> = ({
  title,
  description,
  features,
  columns = 3
}) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-mono font-bold mb-2 uppercase">{title}</h2>
      
      {description && (
        <p className="mb-6 max-w-2xl font-sans">{description}</p>
      )}
      
      <div className={`grid ${gridClasses[columns]} gap-4 mt-6`}>
        {features.map((feature, index) => (
          <FeatureItem 
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            isHighlighted={feature.isHighlighted}
          />
        ))}
      </div>
    </div>
  );
};

// Example usage
export const FeatureListExample: React.FC = () => {
  const features = [
    {
      title: 'Raw Typography',
      description: 'Monospaced fonts and stark typographic treatments create an unfiltered, direct communication style.',
      isHighlighted: true
    },
    {
      title: 'Exposed Structure',
      description: 'Revealing the underlying grid and structural elements rather than hiding them.',
    },
    {
      title: 'High Contrast',
      description: 'Bold visual disparity between elements creates a striking, memorable impression.',
    },
    {
      title: 'Asymmetry',
      description: 'Intentionally breaking from perfect alignment to create tension and visual interest.',
    },
    {
      title: 'Imperfection',
      description: 'Embracing "flaws" as design features rather than trying to create a polished aesthetic.',
    },
    {
      title: 'Functional Honesty',
      description: 'Prioritizing usability and clear function over decorative elements.',
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <FeatureList
        title="Brutalist Design Principles"
        description="Brutalism in digital design draws inspiration from the architectural movement, focusing on raw, unpolished aesthetics that embrace functionality and expose the structural elements of the design."
        features={features}
        columns={3}
      />
    </div>
  );
}; 