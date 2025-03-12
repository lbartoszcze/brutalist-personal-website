import React, { useState } from 'react';

// FAQ item interface
interface FAQItem {
  /**
   * Question text
   */
  question: string;
  /**
   * Answer content
   */
  answer: React.ReactNode;
  /**
   * Whether this item is initially expanded
   */
  isInitiallyExpanded?: boolean;
  /**
   * Optional tag/category
   */
  tag?: string;
}

// Base FAQ props
interface FAQProps {
  /**
   * Array of FAQ items
   */
  items: FAQItem[];
  /**
   * Section title
   */
  title?: string;
  /**
   * Section subtitle or description
   */
  subtitle?: string;
  /**
   * Component variant
   */
  variant?: 'default' | 'bordered' | 'cutout' | 'minimal';
  /**
   * Whether multiple items can be expanded simultaneously
   */
  allowMultiple?: boolean;
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * Basic FAQ component that displays collapsible questions and answers
 */
export const FAQ: React.FC<FAQProps> = ({
  items,
  title = 'Frequently Asked Questions',
  subtitle,
  variant = 'default',
  allowMultiple = false,
  className = '',
}) => {
  // Initialize expanded state based on isInitiallyExpanded
  const initialExpandedItems = items
    .map((item, index) => item.isInitiallyExpanded ? index : -1)
    .filter(index => index !== -1);
  
  // State for tracking which items are expanded
  const [expandedItems, setExpandedItems] = useState<number[]>(initialExpandedItems);
  
  // Toggle item expansion
  const toggleItem = (index: number) => {
    if (expandedItems.includes(index)) {
      // Item is already expanded, collapse it
      setExpandedItems(expandedItems.filter(i => i !== index));
    } else {
      // Item is collapsed, expand it
      if (allowMultiple) {
        // Keep other items expanded
        setExpandedItems([...expandedItems, index]);
      } else {
        // Collapse others, expand only this one
        setExpandedItems([index]);
      }
    }
  };
  
  // Get container styles based on variant
  const getContainerStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      case 'minimal':
        return 'border border-gray-200';
      default:
        return '';
    }
  };
  
  // Get item styles based on variant
  const getItemStyles = () => {
    switch (variant) {
      case 'bordered':
      case 'cutout':
        return 'border-b-2 border-black last:border-b-0';
      case 'minimal':
        return 'border-b border-gray-200 last:border-b-0';
      default:
        return 'border-b-2 border-black last:border-b-0';
    }
  };
  
  return (
    <div className={`${className}`}>
      {/* Section header */}
      {(title || subtitle) && (
        <div className="mb-12 text-center">
          {title && (
            <h2 className="text-2xl md:text-3xl font-mono font-bold uppercase mb-4">{title}</h2>
          )}
          {subtitle && (
            <p className="text-lg max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}
      
      {/* FAQ Items */}
      <div className={`${getContainerStyles()} bg-white overflow-hidden`}>
        {items.map((item, index) => (
          <div key={index} className={`${getItemStyles()}`}>
            {/* Question (clickable header) */}
            <button
              onClick={() => toggleItem(index)}
              className="w-full text-left flex items-center justify-between py-4 px-6 font-mono font-bold focus:outline-none hover:bg-gray-50 transition-colors"
            >
              <div className="pr-8">
                {item.question}
                {item.tag && (
                  <span className="ml-2 text-xs py-1 px-2 bg-gray-100 font-normal">
                    {item.tag}
                  </span>
                )}
              </div>
              
              {/* Expand/collapse icon */}
              <span className={`transform transition-transform ${expandedItems.includes(index) ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            
            {/* Answer (collapsible content) */}
            <div 
              className={`
                transition-all duration-200 overflow-hidden
                ${expandedItems.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <div className="px-6 pb-4 pt-2 font-sans">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Grouped FAQ props
interface GroupedFAQProps extends Omit<FAQProps, 'items'> {
  /**
   * Items organized by category
   */
  groups: {
    /**
     * Category title
     */
    title: string;
    /**
     * Items in this category
     */
    items: FAQItem[];
  }[];
}

/**
 * FAQ component with grouped questions by category
 */
export const GroupedFAQ: React.FC<GroupedFAQProps> = ({
  groups,
  title = 'Frequently Asked Questions',
  subtitle,
  variant = 'default',
  allowMultiple = true,
  className = '',
}) => {
  return (
    <div className={`${className}`}>
      {/* Section header */}
      {(title || subtitle) && (
        <div className="mb-12 text-center">
          {title && (
            <h2 className="text-2xl md:text-3xl font-mono font-bold uppercase mb-4">{title}</h2>
          )}
          {subtitle && (
            <p className="text-lg max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}
      
      {/* Groups */}
      <div className="space-y-12">
        {groups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="text-xl font-mono font-bold mb-6">{group.title}</h3>
            <FAQ
              items={group.items}
              variant={variant}
              allowMultiple={allowMultiple}
              title="" // No title for sub-sections
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Searchable FAQ props
interface SearchableFAQProps extends FAQProps {
  /**
   * Placeholder text for search input
   */
  searchPlaceholder?: string;
  /**
   * Message to show when no results are found
   */
  noResultsMessage?: string;
}

/**
 * FAQ component with search functionality
 */
export const SearchableFAQ: React.FC<SearchableFAQProps> = ({
  items,
  title = 'Frequently Asked Questions',
  subtitle,
  variant = 'default',
  allowMultiple = false,
  searchPlaceholder = 'Search questions...',
  noResultsMessage = 'No matching questions found.',
  className = '',
}) => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter items based on search query
  const filteredItems = items.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.question.toLowerCase().includes(query) ||
      (typeof item.answer === 'string' && item.answer.toLowerCase().includes(query))
    );
  });
  
  return (
    <div className={`${className}`}>
      {/* Section header */}
      {(title || subtitle) && (
        <div className="mb-8 text-center">
          {title && (
            <h2 className="text-2xl md:text-3xl font-mono font-bold uppercase mb-4">{title}</h2>
          )}
          {subtitle && (
            <p className="text-lg max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}
      
      {/* Search input */}
      <div className="max-w-md mx-auto mb-8">
        <div className={`
          border-2 border-black focus-within:ring-2 focus-within:ring-offset-2
          bg-white overflow-hidden
        `}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full px-4 py-3 font-mono focus:outline-none"
          />
        </div>
      </div>
      
      {/* FAQ items or "no results" message */}
      {filteredItems.length > 0 ? (
        <FAQ
          items={filteredItems}
          variant={variant}
          allowMultiple={allowMultiple}
          title="" // No title, we already displayed it above
        />
      ) : (
        <div className="text-center p-8 border-2 border-black bg-white">
          <p className="font-mono">{noResultsMessage}</p>
        </div>
      )}
    </div>
  );
};

// Two column FAQ props
interface TwoColumnFAQProps extends FAQProps {
  /**
   * Whether to randomize which column questions appear in
   */
  randomizeColumns?: boolean;
}

/**
 * FAQ component with questions displayed in two columns
 */
export const TwoColumnFAQ: React.FC<TwoColumnFAQProps> = ({
  items,
  title = 'Frequently Asked Questions',
  subtitle,
  variant = 'default',
  allowMultiple = true,
  randomizeColumns = false,
  className = '',
}) => {
  // Split items into two columns
  const splitItems = () => {
    if (randomizeColumns) {
      // Randomly assign items to columns (but keep even distribution)
      const shuffled = [...items].sort(() => Math.random() - 0.5);
      const midpoint = Math.ceil(shuffled.length / 2);
      return [shuffled.slice(0, midpoint), shuffled.slice(midpoint)];
    } else {
      // Split items evenly between columns
      const midpoint = Math.ceil(items.length / 2);
      return [items.slice(0, midpoint), items.slice(midpoint)];
    }
  };
  
  const [leftColumn, rightColumn] = splitItems();
  
  return (
    <div className={`${className}`}>
      {/* Section header */}
      {(title || subtitle) && (
        <div className="mb-12 text-center">
          {title && (
            <h2 className="text-2xl md:text-3xl font-mono font-bold uppercase mb-4">{title}</h2>
          )}
          {subtitle && (
            <p className="text-lg max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}
      
      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <div>
          <FAQ
            items={leftColumn}
            variant={variant}
            allowMultiple={allowMultiple}
            title="" // No title for sub-sections
          />
        </div>
        
        <div>
          <FAQ
            items={rightColumn}
            variant={variant}
            allowMultiple={allowMultiple}
            title="" // No title for sub-sections
          />
        </div>
      </div>
    </div>
  );
};

// Example implementation
export const FAQExamples: React.FC = () => {
  // Sample FAQ items
  const basicFAQItems: FAQItem[] = [
    {
      question: 'What is a brutalist design system?',
      answer: 'A brutalist design system is characterized by raw, unpolished aesthetics, emphasizing function over form. It often features bold typography, high contrast, and minimal use of decoration.',
      isInitiallyExpanded: true,
    },
    {
      question: 'How do I install and use this design system?',
      answer: (
        <div>
          <p className="mb-2">You can install it using npm or yarn:</p>
          <pre className="bg-gray-100 p-2 mb-2">npm install brutalist-ui</pre>
          <p>Then import the components you need in your project.</p>
        </div>
      ),
    },
    {
      question: 'Is this design system accessible?',
      answer: 'Yes, we\'ve designed all components with accessibility in mind, ensuring they work well with screen readers and keyboard navigation.',
    },
    {
      question: 'Can I customize the components?',
      answer: 'Absolutely! All components accept custom class names and many have props for different variants and styles.',
    },
    {
      question: 'Is this design system responsive?',
      answer: 'Yes, all components are built to be responsive and work well on devices of all sizes.',
    },
  ];
  
  // Sample FAQ items with tags
  const taggedFAQItems: FAQItem[] = [
    {
      question: 'What browsers are supported?',
      answer: 'Our design system supports all modern browsers including Chrome, Firefox, Safari, and Edge.',
      tag: 'Technical',
    },
    {
      question: 'Do you offer enterprise support?',
      answer: 'Yes, we offer enterprise support plans for organizations that need dedicated assistance.',
      tag: 'Business',
    },
    {
      question: 'Can I use this in commercial projects?',
      answer: 'Yes, this design system is available under the MIT license and can be used in commercial projects.',
      tag: 'Licensing',
    },
    {
      question: 'How frequently do you release updates?',
      answer: 'We aim to release minor updates monthly and major versions quarterly, depending on community contributions and feedback.',
      tag: 'Technical',
    },
  ];
  
  // Sample grouped FAQ items
  const groupedFAQItems = [
    {
      title: 'General Questions',
      items: [
        {
          question: 'What is a brutalist design system?',
          answer: 'A brutalist design system is characterized by raw, unpolished aesthetics, emphasizing function over form.',
        },
        {
          question: 'Is this design system free to use?',
          answer: 'Yes, it is open source and free to use in both personal and commercial projects.',
        },
      ],
    },
    {
      title: 'Technical Questions',
      items: [
        {
          question: 'What technologies does this use?',
          answer: 'This design system is built with React and TypeScript, and uses Tailwind CSS for styling.',
        },
        {
          question: 'Can I use this with Next.js?',
          answer: 'Yes, these components are fully compatible with Next.js projects.',
        },
        {
          question: 'Is server-side rendering supported?',
          answer: 'Yes, all components work well with server-side rendering.',
        },
      ],
    },
    {
      title: 'Support Questions',
      items: [
        {
          question: 'Where can I get help if I have issues?',
          answer: 'You can open an issue on our GitHub repository or join our community Discord server.',
        },
        {
          question: 'Do you offer custom development services?',
          answer: 'Yes, we can provide custom development and integration services. Contact our team for details.',
        },
      ],
    },
  ];
  
  return (
    <div className="p-6 space-y-32">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">FAQ Components</h2>
      <p className="mb-8 font-sans">
        Frequently Asked Questions components with brutalist styling.
      </p>
      
      {/* Basic FAQ Example */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Basic FAQ</h3>
        <FAQ
          items={basicFAQItems}
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our brutalist design system."
          variant="bordered"
        />
      </div>
      
      {/* FAQ Variants */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">FAQ Variants</h3>
        <div className="space-y-16">
          <div>
            <h4 className="font-mono font-bold mb-2">Default Variant</h4>
            <FAQ
              items={taggedFAQItems}
              title="Technical Questions"
              variant="default"
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Bordered Variant</h4>
            <FAQ
              items={taggedFAQItems}
              title="Business Questions"
              variant="bordered"
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Cutout Variant</h4>
            <FAQ
              items={taggedFAQItems}
              title="Support Questions"
              variant="cutout"
            />
          </div>
          
          <div>
            <h4 className="font-mono font-bold mb-2">Minimal Variant</h4>
            <FAQ
              items={taggedFAQItems}
              title="Design Questions"
              variant="minimal"
            />
          </div>
        </div>
      </div>
      
      {/* Grouped FAQ Example */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Grouped FAQ</h3>
        <GroupedFAQ
          groups={groupedFAQItems}
          title="Frequently Asked Questions"
          subtitle="Browse questions by category"
          variant="bordered"
        />
      </div>
      
      {/* Searchable FAQ Example */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Searchable FAQ</h3>
        <SearchableFAQ
          items={[...basicFAQItems, ...taggedFAQItems]}
          title="Search Our FAQ"
          subtitle="Find answers to your questions quickly"
          variant="bordered"
          searchPlaceholder="Type to search..."
        />
      </div>
      
      {/* Two-Column FAQ Example */}
      <div>
        <h3 className="text-xl font-mono font-bold mb-6 uppercase">Two-Column FAQ</h3>
        <TwoColumnFAQ
          items={[...basicFAQItems, ...taggedFAQItems]}
          title="Frequently Asked Questions"
          subtitle="Organized in a two-column layout for better readability"
          variant="bordered"
        />
      </div>
    </div>
  );
}; 