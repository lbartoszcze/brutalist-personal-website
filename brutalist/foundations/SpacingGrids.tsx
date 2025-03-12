import React from 'react';

interface SpacingExampleProps {
  name: string;
  size: string;
  value: string;
}

const SpacingExample: React.FC<SpacingExampleProps> = ({ name, size, value }) => (
  <div className="mb-6 flex items-center">
    <div className="w-24 text-sm font-bold">{name}</div>
    <div className="flex-1">
      <div className="flex items-center">
        <div className="bg-black h-8"></div>
        <div className="bg-gray-200" style={{ width: value, height: '2rem' }}></div>
        <div className="bg-black h-8"></div>
      </div>
      <div className="mt-1 text-xs">{size} - {value}</div>
    </div>
  </div>
);

interface GridExampleProps {
  columns: number;
  name: string;
}

const GridExample: React.FC<GridExampleProps> = ({ columns, name }) => (
  <div className="mb-8 border-2 border-black">
    <div className="font-bold p-2 border-b-2 border-black bg-gray-100">
      {name} ({columns} columns)
    </div>
    <div className={`p-4 grid grid-cols-${columns} gap-2`}>
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className="bg-gray-200 h-12 flex items-center justify-center text-xs">
          Col {i + 1}
        </div>
      ))}
    </div>
  </div>
);

export const SpacingGrids: React.FC = () => {
  const spacings = [
    { name: 'XS', size: '0.25rem', value: '0.25rem' },
    { name: 'SM', size: '0.5rem', value: '0.5rem' },
    { name: 'MD', size: '1rem', value: '1rem' },
    { name: 'LG', size: '1.5rem', value: '1.5rem' },
    { name: 'XL', size: '2rem', value: '2rem' },
    { name: '2XL', size: '3rem', value: '3rem' },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">Spacing & Grids</h2>
      
      <div className="mb-10">
        <h3 className="text-xl font-bold mb-4">Spacing Scale</h3>
        <p className="mb-6">
          Our spacing system uses a consistent scale based on multiples of 0.25rem. 
          This creates rhythm and harmony across all components and layouts.
        </p>
        
        <div className="border-2 border-black p-4 bg-white">
          {spacings.map(spacing => (
            <SpacingExample 
              key={spacing.name}
              name={spacing.name}
              size={spacing.size}
              value={spacing.value}
            />
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-bold mb-4">Grid System</h3>
        <p className="mb-6">
          Our grid system is based on 12 columns that can be combined in various ways. 
          The brutalist approach often features asymmetrical layouts and strong grid lines.
        </p>
        
        <GridExample columns={1} name="Single Column" />
        <GridExample columns={2} name="Two Columns" />
        <GridExample columns={3} name="Three Columns" />
        <GridExample columns={4} name="Four Columns" />
        <GridExample columns={6} name="Six Columns" />
        <GridExample columns={12} name="Twelve Columns" />
      </div>
    </div>
  );
}; 