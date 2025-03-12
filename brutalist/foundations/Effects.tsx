import React from 'react';

interface EffectExampleProps {
  name: string;
  description: string;
  children: React.ReactNode;
}

const EffectExample: React.FC<EffectExampleProps> = ({ name, description, children }) => (
  <div className="border-2 border-black mb-8">
    <div className="p-3 border-b-2 border-black bg-gray-100">
      <h3 className="font-bold">{name}</h3>
      <p className="text-sm mt-1">{description}</p>
    </div>
    <div className="p-6 flex justify-center items-center bg-white">
      {children}
    </div>
  </div>
);

export const Effects: React.FC = () => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">Effects</h2>
      <p className="mb-6">
        Our brutalist design system uses minimal effects, focusing on raw elements 
        with occasional dramatic touches to create visual interest.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EffectExample 
          name="Hard Shadow" 
          description="Offset shadows with no blur create a strong, graphic effect."
        >
          <div className="w-32 h-32 bg-white border-2 border-black" style={{ boxShadow: '8px 8px 0 0 #000' }}></div>
        </EffectExample>
        
        <EffectExample 
          name="Rotation" 
          description="Slight rotations add dynamism and a hand-made quality."
        >
          <div className="w-32 h-32 bg-white border-2 border-black transform rotate-3"></div>
        </EffectExample>
        
        <EffectExample 
          name="Cutout" 
          description="Negative space creates a 'cut out' effect typical of brutalist design."
        >
          <div className="w-40 h-40 bg-black relative">
            <div className="absolute w-24 h-24 bg-white" style={{ top: '20%', left: '20%' }}></div>
          </div>
        </EffectExample>
        
        <EffectExample 
          name="Stacking" 
          description="Layered elements create depth and hierarchy."
        >
          <div className="relative">
            <div className="w-32 h-32 bg-gray-300 border-2 border-black absolute" style={{ top: '-8px', left: '-8px' }}></div>
            <div className="w-32 h-32 bg-white border-2 border-black relative z-10"></div>
          </div>
        </EffectExample>
        
        <EffectExample 
          name="Distortion" 
          description="Skewed or distorted elements add tension and visual interest."
        >
          <div className="w-32 h-32 bg-white border-2 border-black transform skew-x-6 skew-y-3"></div>
        </EffectExample>
        
        <EffectExample 
          name="Pixelation" 
          description="Low-resolution or pixelated elements reference early digital aesthetics."
        >
          <div className="w-32 h-32 border-2 border-black grid grid-cols-8">
            {Array.from({ length: 64 }).map((_, i) => (
              <div 
                key={i} 
                className="aspect-square" 
                style={{ 
                  backgroundColor: Math.random() > 0.7 ? 'black' : 'white',
                }}
              ></div>
            ))}
          </div>
        </EffectExample>
      </div>
      
      <div className="mt-8 p-4 border-2 border-black bg-gray-100">
        <h3 className="font-bold mb-2">Usage Guidelines</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use effects sparingly to maintain the raw, unpolished aesthetic</li>
          <li>Prefer hard edges and geometric shapes over rounded or soft elements</li>
          <li>Embrace asymmetry and imperfection</li>
          <li>Effects should enhance the content, not distract from it</li>
        </ul>
      </div>
    </div>
  );
}; 