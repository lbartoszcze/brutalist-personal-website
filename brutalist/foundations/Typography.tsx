import React from 'react';

interface TypeSpecimenProps {
  name: string;
  element: React.ReactNode;
  description: string;
  code: string;
}

const TypeSpecimen: React.FC<TypeSpecimenProps> = ({ name, element, description, code }) => (
  <div className="border-2 border-black mb-6">
    <div className="p-4 border-b-2 border-black bg-white">
      <h3 className="font-bold text-lg mb-2">{name}</h3>
      <p className="text-sm mb-4">{description}</p>
      <div className="my-6">{element}</div>
    </div>
    <div className="p-2 bg-gray-100 font-mono text-sm overflow-x-auto">
      {code}
    </div>
  </div>
);

export const Typography: React.FC = () => {
  const specimens = [
    {
      name: 'Heading 1',
      element: <h1 className="text-4xl font-bold">The quick brown fox jumps over the lazy dog</h1>,
      description: 'Used for main page headings and critical information.',
      code: '<h1 className="text-4xl font-bold">The quick brown fox jumps over the lazy dog</h1>'
    },
    {
      name: 'Heading 2',
      element: <h2 className="text-3xl font-bold">The quick brown fox jumps over the lazy dog</h2>,
      description: 'Used for section headings and important content blocks.',
      code: '<h2 className="text-3xl font-bold">The quick brown fox jumps over the lazy dog</h2>'
    },
    {
      name: 'Heading 3',
      element: <h3 className="text-2xl font-bold">The quick brown fox jumps over the lazy dog</h3>,
      description: 'Used for subsection headings and component titles.',
      code: '<h3 className="text-2xl font-bold">The quick brown fox jumps over the lazy dog</h3>'
    },
    {
      name: 'Body Text',
      element: <p className="text-base">The quick brown fox jumps over the lazy dog. This is normal paragraph text used for the main content of the page. It should be highly readable with appropriate line height and spacing.</p>,
      description: 'Default text style for paragraphs and content.',
      code: '<p className="text-base">The quick brown fox jumps over the lazy dog...</p>'
    },
    {
      name: 'Small Text',
      element: <p className="text-sm">The quick brown fox jumps over the lazy dog. This smaller text is used for secondary information, captions, and metadata.</p>,
      description: 'Used for secondary information, captions, and footnotes.',
      code: '<p className="text-sm">The quick brown fox jumps over the lazy dog...</p>'
    },
    {
      name: 'Monospace',
      element: <pre className="font-mono text-sm p-2 bg-gray-100">const greeting = "Hello, Brutalist World!";</pre>,
      description: 'Used for code snippets and technical content.',
      code: '<pre className="font-mono text-sm p-2 bg-gray-100">const greeting = "Hello, Brutalist World!";</pre>'
    }
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">Typography</h2>
      <p className="mb-6">
        Our typography system uses a minimal set of fonts and sizes for clarity and impact. 
        Text is treated as a visual element with strong hierarchy and contrast.
      </p>
      
      <div className="space-y-8">
        {specimens.map(specimen => (
          <TypeSpecimen 
            key={specimen.name}
            name={specimen.name}
            element={specimen.element}
            description={specimen.description}
            code={specimen.code}
          />
        ))}
      </div>
    </div>
  );
}; 