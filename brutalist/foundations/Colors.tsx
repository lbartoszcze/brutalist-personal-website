import React from 'react';

interface ColorSwatchProps {
  color: string;
  name: string;
  hex: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, name, hex }) => (
  <div className="border-2 border-black mb-4">
    <div 
      className="w-full h-20" 
      style={{ backgroundColor: hex }}
    ></div>
    <div className="p-2 bg-white">
      <div className="font-bold">{name}</div>
      <div className="text-sm">{hex}</div>
    </div>
  </div>
);

export const Colors: React.FC = () => {
  const colors = [
    { name: 'Black', hex: '#000000', color: 'bg-black' },
    { name: 'White', hex: '#FFFFFF', color: 'bg-white' },
    { name: 'Primary', hex: '#FF0000', color: 'bg-red-500' },
    { name: 'Secondary', hex: '#333333', color: 'bg-gray-800' },
    { name: 'Accent', hex: '#FFFF00', color: 'bg-yellow-400' },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">Colors</h2>
      <p className="mb-6">
        Our brutalist design system uses a limited color palette with high contrast 
        to create bold, stark visual experiences.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {colors.map(color => (
          <ColorSwatch 
            key={color.name}
            name={color.name}
            hex={color.hex}
            color={color.color}
          />
        ))}
      </div>
    </div>
  );
}; 