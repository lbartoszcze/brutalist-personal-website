import React from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  variant?: 'left' | 'right' | 'center' | 'asymmetric';
  hasNoise?: boolean;
  hasBorder?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  ctaText,
  ctaUrl = '#',
  imageUrl,
  imageAlt = '',
  variant = 'left',
  hasNoise = false,
  hasBorder = true,
}) => {
  const containerClasses = 
    variant === 'asymmetric' 
      ? 'grid-cols-1 lg:grid-cols-12 gap-0' 
      : variant === 'center' 
        ? 'grid-cols-1 text-center' 
        : 'grid-cols-1 lg:grid-cols-2 gap-0';

  const contentClasses = 
    variant === 'asymmetric' 
      ? 'lg:col-span-7 lg:order-1' 
      : variant === 'right' 
        ? 'lg:order-2' 
        : '';

  const imageClasses = 
    variant === 'asymmetric' 
      ? 'lg:col-span-5 lg:order-2' 
      : variant === 'right' 
        ? 'lg:order-1' 
        : '';
  
  const noiseFilter = hasNoise 
    ? `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")` 
    : 'none';

  return (
    <div 
      className={`
        relative grid ${containerClasses} 
        ${hasBorder ? 'border-2 border-black' : ''}
        min-h-[500px] overflow-hidden
      `}
      style={{ 
        backgroundImage: noiseFilter,
      }}
    >
      {/* Content section */}
      <div className={`${contentClasses} p-8 lg:p-12 flex flex-col justify-center`}>
        {subtitle && (
          <div className="font-mono text-sm uppercase tracking-wider mb-4 rotate-[-1deg]">
            <span className="bg-black text-white px-2 py-1 inline-block">
              {subtitle}
            </span>
          </div>
        )}
        
        <h1 className="font-mono font-bold text-4xl md:text-5xl lg:text-6xl uppercase mb-6 leading-tight">
          {title}
        </h1>
        
        {description && (
          <p className="font-sans text-lg mb-8 max-w-lg">
            {description}
          </p>
        )}
        
        {ctaText && (
          <div className="mt-4">
            <a
              href={ctaUrl}
              className="relative inline-block"
            >
              <div className="absolute inset-0 bg-black translate-x-2 translate-y-2"></div>
              <button className="relative z-10 bg-white border-2 border-black px-8 py-3 font-mono font-bold uppercase hover:bg-gray-100 transition-colors">
                {ctaText}
              </button>
            </a>
          </div>
        )}
      </div>
      
      {/* Image section */}
      {imageUrl && (
        <div 
          className={`
            ${imageClasses} relative min-h-[300px] lg:min-h-0
            ${variant === 'center' ? 'mt-6' : ''}
            ${hasBorder && variant !== 'center' ? 'border-t-2 lg:border-t-0 lg:border-l-2 border-black' : ''}
          `}
        >
          <img 
            src={imageUrl} 
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0 border-4 border-black m-4 pointer-events-none"
            style={{ transform: 'rotate(-1deg)' }}
          ></div>
        </div>
      )}
    </div>
  );
};

export const HeroExamples: React.FC = () => {
  return (
    <div className="space-y-12 p-4 max-w-6xl mx-auto">
      <div>
        <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Left Image Hero</h2>
        <Hero
          title="Raw Brutalist Design for the Digital Age"
          subtitle="Minimal & Functional"
          description="Embracing exposed structure, raw materials, and unfiltered aesthetics for creating memorable digital experiences that stand out from the homogenized web."
          ctaText="Explore Our Work"
          imageUrl="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          imageAlt="Brutalist architecture"
        />
      </div>
      
      <div>
        <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Right Image Hero</h2>
        <Hero
          title="Break the Conventions of Digital Design"
          subtitle="Bold & Honest"
          description="Our brutalist approach strips away unnecessary embellishment, focusing on content and functionality with an aesthetic that celebrates digital materiality."
          ctaText="View Portfolio"
          imageUrl="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          imageAlt="Concrete brutalist structure"
          variant="right"
          hasNoise={true}
        />
      </div>
      
      <div>
        <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Asymmetric Hero</h2>
        <Hero
          title="Functional Design that Exposes the Truth"
          subtitle="Honest & Direct"
          description="We create digital experiences that reflect the raw, unpolished nature of brutalism while maintaining usability and purpose."
          ctaText="Contact Us"
          imageUrl="https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          imageAlt="Brutalist architecture detail"
          variant="asymmetric"
          hasNoise={true}
        />
      </div>
      
      <div>
        <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Center Hero (No Image)</h2>
        <Hero
          title="Typography-Focused Brutalist Hero"
          subtitle="Stark & Memorable"
          description="This variant emphasizes typography and messaging with a centered layout that commands attention through simplicity and contrast."
          ctaText="Learn More"
          variant="center"
          hasBorder={true}
          hasNoise={true}
        />
      </div>
    </div>
  );
}; 