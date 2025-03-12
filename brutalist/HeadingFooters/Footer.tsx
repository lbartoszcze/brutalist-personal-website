import React from 'react';

// Footer props
interface FooterProps {
  /**
   * Logo or brand element
   */
  logo?: React.ReactNode;
  /**
   * Copyright text
   */
  copyright?: React.ReactNode;
  /**
   * Navigation links
   */
  links?: {
    title: string;
    href: string;
  }[];
  /**
   * Footer columns with grouped links
   */
  columns?: {
    title: string;
    links: {
      label: string;
      href: string;
    }[];
  }[];
  /**
   * Social media links
   */
  socialLinks?: {
    icon: React.ReactNode;
    href: string;
    label: string;
  }[];
  /**
   * Legal links (terms, privacy policy, etc.)
   */
  legalLinks?: {
    label: string;
    href: string;
  }[];
  /**
   * Contact information
   */
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  /**
   * Optional newsletter signup component
   */
  newsletter?: React.ReactNode;
  /**
   * Whether to add a top border
   */
  hasBorder?: boolean;
  /**
   * Variant of the footer
   */
  variant?: 'default' | 'bordered' | 'cutout';
  /**
   * Size of the footer
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Custom background color
   */
  backgroundColor?: string;
  /**
   * Custom class name
   */
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  logo,
  copyright = `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
  links,
  columns,
  socialLinks,
  legalLinks,
  contactInfo,
  newsletter,
  hasBorder = true,
  variant = 'default',
  size = 'medium',
  backgroundColor,
  className = '',
}) => {
  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return `${hasBorder ? 'border-t-2' : ''} border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`;
      case 'cutout':
        return `${hasBorder ? 'border-t-2' : ''} border-2 border-black transform rotate-[-0.5deg]`;
      default:
        return hasBorder ? 'border-t-2 border-black' : '';
    }
  };
  
  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'py-4';
      case 'large':
        return 'py-16';
      case 'medium':
      default:
        return 'py-8';
    }
  };
  
  // Background style
  const bgStyle = backgroundColor ? { backgroundColor } : {};
  
  return (
    <footer 
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${className}
      `}
      style={bgStyle}
    >
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand column */}
          <div className="col-span-1">
            {logo && (
              <div className="mb-4">
                {logo}
              </div>
            )}
            
            {contactInfo && (
              <div className="mb-4 font-mono text-sm">
                {contactInfo.address && (
                  <p className="mb-2">{contactInfo.address}</p>
                )}
                {contactInfo.phone && (
                  <p className="mb-2">
                    <a href={`tel:${contactInfo.phone}`} className="hover:underline">
                      {contactInfo.phone}
                    </a>
                  </p>
                )}
                {contactInfo.email && (
                  <p className="mb-2">
                    <a href={`mailto:${contactInfo.email}`} className="hover:underline">
                      {contactInfo.email}
                    </a>
                  </p>
                )}
              </div>
            )}
            
            {/* Social links */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex space-x-4 mb-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="hover:opacity-75"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
          
          {/* Link columns */}
          {columns && columns.map((column, index) => (
            <div key={index} className="col-span-1">
              <h3 className="font-mono font-bold mb-4 uppercase text-sm">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="font-mono text-sm hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter */}
          {newsletter && (
            <div className="col-span-1">
              {newsletter}
            </div>
          )}
        </div>
        
        {/* Bottom bar */}
        <div className="pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="mb-4 md:mb-0 font-mono text-sm">
            {copyright}
          </div>
          
          {/* Legal links */}
          {legalLinks && legalLinks.length > 0 && (
            <div className="flex flex-wrap justify-center md:justify-end">
              {legalLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <a 
                    href={link.href} 
                    className="font-mono text-sm hover:underline mx-2"
                  >
                    {link.label}
                  </a>
                  {index < legalLinks.length - 1 && (
                    <span className="font-mono text-sm mx-2">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

// Simple footer with minimal content
export const SimpleFooter: React.FC<Omit<FooterProps, 'columns' | 'socialLinks' | 'newsletter'>> = (props) => {
  return (
    <Footer {...props} />
  );
};

// Example implementations
export const FooterExamples: React.FC = () => {
  // Sample footer data
  const sampleColumns = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Press', href: '#' },
      ],
    },
    {
      title: 'Products',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Customers', href: '#' },
        { label: 'Integrations', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Guides', href: '#' },
        { label: 'Support', href: '#' },
        { label: 'API Reference', href: '#' },
      ],
    },
  ];
  
  const sampleSocialLinks = [
    {
      icon: <span className="text-xl">𝕏</span>,
      href: 'https://twitter.com',
      label: 'Twitter',
    },
    {
      icon: <span className="text-xl">ƒ</span>,
      href: 'https://facebook.com',
      label: 'Facebook',
    },
    {
      icon: <span className="text-xl">𝕀</span>,
      href: 'https://instagram.com',
      label: 'Instagram',
    },
    {
      icon: <span className="text-xl">𝕃</span>,
      href: 'https://linkedin.com',
      label: 'LinkedIn',
    },
  ];
  
  const sampleLegalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ];
  
  const sampleLogo = (
    <div className="font-mono font-bold text-xl">BRUTALIST</div>
  );
  
  const sampleNewsletter = (
    <div>
      <h3 className="font-mono font-bold mb-4 uppercase text-sm">Newsletter</h3>
      <p className="font-mono text-sm mb-2">Stay updated with our latest news and products.</p>
      <div className="flex">
        <input
          type="email"
          placeholder="your@email.com"
          className="border-2 border-black py-2 px-3 w-full font-mono text-sm"
        />
        <button className="bg-black text-white font-mono py-2 px-4 border-2 border-black">
          →
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="space-y-16">
      <div>
        <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Footer Components</h2>
        <p className="mb-8 font-sans">
          Footer components with brutalist styling for page footers.
        </p>
        
        {/* Full Featured Footer */}
        <div className="mb-16">
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Full Featured Footer</h3>
          <div className="border-2 border-gray-300 p-4 bg-gray-50">
            <Footer
              logo={sampleLogo}
              columns={sampleColumns}
              socialLinks={sampleSocialLinks}
              legalLinks={sampleLegalLinks}
              contactInfo={{
                email: 'hello@example.com',
                phone: '+1 (555) 123-4567',
                address: '123 Brutalist Ave, Design District, 12345',
              }}
              newsletter={sampleNewsletter}
              variant="bordered"
            />
          </div>
        </div>
        
        {/* Simple Footer */}
        <div className="mb-16">
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Simple Footer</h3>
          <div className="border-2 border-gray-300 p-4 bg-gray-50">
            <SimpleFooter
              logo={sampleLogo}
              legalLinks={sampleLegalLinks}
              contactInfo={{
                email: 'hello@example.com',
                phone: '+1 (555) 123-4567',
              }}
              variant="bordered"
            />
          </div>
        </div>
        
        {/* Footer Variants */}
        <div className="mb-16">
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Footer Variants</h3>
          <div className="space-y-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Default</h4>
              <div className="border-2 border-gray-300 p-4 bg-gray-50">
                <Footer
                  logo={sampleLogo}
                  columns={sampleColumns.slice(0, 2)}
                  socialLinks={sampleSocialLinks}
                  legalLinks={sampleLegalLinks}
                  variant="default"
                  size="small"
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Bordered</h4>
              <div className="border-2 border-gray-300 p-4 bg-gray-50">
                <Footer
                  logo={sampleLogo}
                  columns={sampleColumns.slice(0, 2)}
                  socialLinks={sampleSocialLinks}
                  legalLinks={sampleLegalLinks}
                  variant="bordered"
                  size="small"
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Cutout</h4>
              <div className="border-2 border-gray-300 p-4 bg-gray-50">
                <Footer
                  logo={sampleLogo}
                  columns={sampleColumns.slice(0, 2)}
                  socialLinks={sampleSocialLinks}
                  legalLinks={sampleLegalLinks}
                  variant="cutout"
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Sizes */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Footer Sizes</h3>
          <div className="space-y-8">
            <div>
              <h4 className="font-mono font-bold mb-2">Small</h4>
              <div className="border-2 border-gray-300 p-4 bg-gray-50">
                <Footer
                  logo={sampleLogo}
                  legalLinks={sampleLegalLinks}
                  variant="bordered"
                  size="small"
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Medium (Default)</h4>
              <div className="border-2 border-gray-300 p-4 bg-gray-50">
                <Footer
                  logo={sampleLogo}
                  columns={sampleColumns.slice(0, 2)}
                  legalLinks={sampleLegalLinks}
                  variant="bordered"
                  size="medium"
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-mono font-bold mb-2">Large</h4>
              <div className="border-2 border-gray-300 p-4 bg-gray-50">
                <Footer
                  logo={sampleLogo}
                  columns={sampleColumns}
                  socialLinks={sampleSocialLinks}
                  legalLinks={sampleLegalLinks}
                  contactInfo={{
                    email: 'hello@example.com',
                    phone: '+1 (555) 123-4567',
                    address: '123 Brutalist Ave, Design District, 12345',
                  }}
                  newsletter={sampleNewsletter}
                  variant="bordered"
                  size="large"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 