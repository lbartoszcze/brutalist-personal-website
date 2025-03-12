import React from 'react';

interface BrandElementProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const BrandElement: React.FC<BrandElementProps> = ({ title, description, children }) => (
  <div className="border-2 border-black mb-8">
    <div className="p-3 border-b-2 border-black bg-gray-100">
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm mt-1">{description}</p>
    </div>
    <div className="p-6 flex justify-center items-center bg-white">
      {children}
    </div>
  </div>
);

export const Brand: React.FC = () => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">Brand</h2>
      <p className="mb-6">
        Our brand elements embrace brutalist principles with raw typography, 
        stark contrasts, and an unpolished aesthetic that celebrates function over decoration.
      </p>
      
      <BrandElement 
        title="Logo" 
        description="Our logo uses a bold, monospaced typeface with strong geometric shapes."
      >
        <div className="border-4 border-black p-4 inline-block">
          <span className="font-mono font-bold text-4xl tracking-tight">BRUT</span>
        </div>
      </BrandElement>
      
      <BrandElement 
        title="Color Palette" 
        description="Our brand colors are limited to black, white, and a single accent color for maximum impact."
      >
        <div className="flex space-x-4">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-black"></div>
            <div className="mt-2 text-sm font-mono">#000000</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-white border border-gray-300"></div>
            <div className="mt-2 text-sm font-mono">#FFFFFF</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-red-500"></div>
            <div className="mt-2 text-sm font-mono">#EF4444</div>
          </div>
        </div>
      </BrandElement>
      
      <BrandElement 
        title="Typography" 
        description="Our brand typography uses monospaced fonts for headings and sans-serif for body text."
      >
        <div className="space-y-4 w-full max-w-lg">
          <div>
            <div className="font-mono font-bold text-3xl">Headings</div>
            <div className="text-sm mt-1">Mono / Bold / 1.5-3rem</div>
          </div>
          <div>
            <div className="font-sans text-base">Body Text</div>
            <div className="text-sm mt-1">Sans-serif / Regular / 1rem</div>
          </div>
          <div>
            <div className="font-mono text-sm">CAPTIONS & LABELS</div>
            <div className="text-sm mt-1">Mono / Regular / 0.875rem</div>
          </div>
        </div>
      </BrandElement>
      
      <BrandElement 
        title="Visual Style" 
        description="Our visual style embraces asymmetry, raw edges, and exposed structure."
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="border-2 border-black h-24 flex items-center justify-center">
            <div className="w-12 h-12 bg-black"></div>
          </div>
          <div className="border-2 border-black h-24 flex items-center justify-center bg-black">
            <div className="w-12 h-12 bg-white"></div>
          </div>
          <div className="border-2 border-black h-24 flex items-center justify-center">
            <div className="w-12 h-12 bg-red-500"></div>
          </div>
        </div>
      </BrandElement>
      
      <div className="mt-8 p-4 border-2 border-black bg-gray-100">
        <h3 className="font-bold mb-2">Brand Guidelines</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Always maintain high contrast and legibility</li>
          <li>Embrace imperfection and raw aesthetics</li>
          <li>Use a limited color palette consistently</li>
          <li>Typography should be bold and direct</li>
          <li>Avoid decorative elements that don't serve a purpose</li>
        </ul>
      </div>
    </div>
  );
}; 