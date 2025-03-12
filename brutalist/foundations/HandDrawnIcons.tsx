import React from 'react';

interface IconDisplayProps {
  name: string;
  icon: React.ReactNode;
}

const IconDisplay: React.FC<IconDisplayProps> = ({ name, icon }) => (
  <div className="border-2 border-black p-4 flex flex-col items-center">
    <div className="mb-4 h-16 w-16 flex items-center justify-center">
      {icon}
    </div>
    <div className="text-sm font-bold text-center">{name}</div>
  </div>
);

// SVG hand-drawn icons
const HomeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M20 5L5 18H10V32H16V24H24V32H30V18H35L20 5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: '1 0' }} />
  </svg>
);

const MailIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="5" y="10" width="30" height="20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: '1 0' }} />
    <path d="M5 10L20 22L35 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: '1 0' }} />
  </svg>
);

const UserIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="20" cy="15" r="7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: '1 0' }} />
    <path d="M7 35C7 28 12 25 20 25C28 25 33 28 33 35" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: '1 0' }} />
  </svg>
);

const SearchIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="18" cy="18" r="10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: '1 0' }} />
    <path d="M28 28L34 34" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: '1 0' }} />
  </svg>
);

const SettingsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="20" cy="20" r="5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: '1 0' }} />
    <path d="M20 8V12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: '1 0' }} />
    <path d="M20 28V32" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: '1 0' }} />
    <path d="M8 20H12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: '1 0' }} />
    <path d="M28 20H32" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: '1 0' }} />
  </svg>
);

export const HandDrawnIcons: React.FC = () => {
  const icons = [
    { name: 'Home', icon: <HomeIcon /> },
    { name: 'Mail', icon: <MailIcon /> },
    { name: 'User', icon: <UserIcon /> },
    { name: 'Search', icon: <SearchIcon /> },
    { name: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">Hand-Drawn Icons</h2>
      <p className="mb-6">
        Our icons use a hand-drawn style with irregular lines and imperfect shapes to 
        emphasize the raw, unpolished aesthetic of brutalism.
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {icons.map(icon => (
          <IconDisplay 
            key={icon.name}
            name={icon.name}
            icon={icon.icon}
          />
        ))}
      </div>
      
      <div className="mt-8 p-4 border-2 border-black bg-gray-100">
        <h3 className="font-bold mb-2">Usage Guidelines</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Icons should maintain their hand-drawn quality at all sizes</li>
          <li>Keep stroke widths consistent (2px recommended)</li>
          <li>Use irregular strokes to emphasize the raw aesthetic</li>
          <li>Icons should be simple and easily recognizable</li>
        </ul>
      </div>
    </div>
  );
}; 