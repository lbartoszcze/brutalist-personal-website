import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  variant?: 'default' | 'bordered' | 'cutout';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  showFirstButton = true,
  showLastButton = true,
  variant = 'default',
  size = 'medium',
  className = '',
}) => {
  // Guard clauses
  if (totalPages <= 0) return null;
  
  // Ensure current page is within bounds
  const page = Math.max(1, Math.min(currentPage, totalPages));
  
  // Generate page numbers array
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    // Calculate range based on current page and sibling/boundary counts
    const startPages = Array.from({ length: boundaryCount }, (_, i) => i + 1);
    const endPages = Array.from({ length: boundaryCount }, (_, i) => totalPages - i).reverse();
    
    // Calculate range around current page
    const siblingStart = Math.max(
      Math.min(page - siblingCount, totalPages - siblingCount * 2 - boundaryCount - 1),
      boundaryCount + 2
    );
    
    const siblingEnd = Math.min(
      Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length > 0 ? endPages[0] - 1 : totalPages - 1
    );
    
    const rangeWithSiblings = Array.from(
      { length: siblingEnd - siblingStart + 1 },
      (_, i) => siblingStart + i
    );
    
    // Determine where to add ellipses
    const shouldShowStartEllipsis = siblingStart > boundaryCount + 2;
    const shouldShowEndEllipsis = siblingEnd < totalPages - boundaryCount - 1;
    
    const itemList: (number | 'ellipsis')[] = [];
    
    // Add start pages
    itemList.push(...startPages);
    
    // Add start ellipsis
    if (shouldShowStartEllipsis) {
      itemList.push('ellipsis');
    } else if (boundaryCount + 1 < siblingStart) {
      // If there's just one number between boundary and sibling range, show it
      for (let i = boundaryCount + 1; i < siblingStart; i++) {
        itemList.push(i);
      }
    }
    
    // Add sibling pages
    itemList.push(...rangeWithSiblings);
    
    // Add end ellipsis
    if (shouldShowEndEllipsis) {
      itemList.push('ellipsis');
    } else if (siblingEnd + 1 < totalPages - boundaryCount + 1) {
      // If there's just one number between sibling range and end boundary, show it
      for (let i = siblingEnd + 1; i < totalPages - boundaryCount + 1; i++) {
        itemList.push(i);
      }
    }
    
    // Add end pages
    if (endPages.length > 0 && siblingEnd < endPages[0]) {
      itemList.push(...endPages);
    }
    
    return itemList;
  };
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      onPageChange(newPage);
    }
  };
  
  // Get size-based classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'text-sm p-1 min-w-[28px] h-7';
      case 'large':
        return 'text-lg p-2 min-w-[42px] h-11';
      default: // medium
        return 'text-base p-1.5 min-w-[36px] h-9';
    }
  };
  
  // Get variant-based classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return 'border-2 border-black';
    }
  };
  
  // Items to render
  const items = getPageNumbers();
  
  return (
    <nav 
      className={`inline-flex flex-wrap items-center gap-2 ${className}`}
      aria-label="Pagination"
    >
      {/* First page button */}
      {showFirstButton && (
        <button
          className={`
            flex items-center justify-center font-mono
            ${getSizeClasses()}
            ${getVariantClasses()}
            ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
          `}
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          aria-label="Go to first page"
        >
          «
        </button>
      )}
      
      {/* Previous page button */}
      <button
        className={`
          flex items-center justify-center font-mono
          ${getSizeClasses()}
          ${getVariantClasses()}
          ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
        `}
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        aria-label="Go to previous page"
      >
        ‹
      </button>
      
      {/* Page numbers */}
      {items.map((item, index) => {
        if (item === 'ellipsis') {
          return (
            <span 
              key={`ellipsis-${index}`} 
              className={`
                flex items-center justify-center font-mono
                ${getSizeClasses()}
              `}
            >
              …
            </span>
          );
        }
        
        const isSelected = item === page;
        
        return (
          <button
            key={item}
            className={`
              flex items-center justify-center font-mono
              ${getSizeClasses()}
              ${getVariantClasses()}
              ${isSelected ? 'bg-black text-white font-bold' : 'hover:bg-gray-100'}
            `}
            onClick={() => handlePageChange(item)}
            aria-current={isSelected ? 'page' : undefined}
            aria-label={`Go to page ${item}`}
          >
            {item}
          </button>
        );
      })}
      
      {/* Next page button */}
      <button
        className={`
          flex items-center justify-center font-mono
          ${getSizeClasses()}
          ${getVariantClasses()}
          ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
        `}
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Go to next page"
      >
        ›
      </button>
      
      {/* Last page button */}
      {showLastButton && (
        <button
          className={`
            flex items-center justify-center font-mono
            ${getSizeClasses()}
            ${getVariantClasses()}
            ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
          `}
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages}
          aria-label="Go to last page"
        >
          »
        </button>
      )}
    </nav>
  );
};

// Simplified pagination variant with just previous/next buttons
export const SimplePagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  previousLabel?: React.ReactNode;
  nextLabel?: React.ReactNode;
  variant?: 'default' | 'bordered' | 'cutout';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}> = ({
  currentPage,
  totalPages,
  onPageChange,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  variant = 'default',
  size = 'medium',
  className = '',
}) => {
  // Ensure current page is within bounds
  const page = Math.max(1, Math.min(currentPage, totalPages));
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      onPageChange(newPage);
    }
  };
  
  // Get size-based classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'text-sm py-1 px-2';
      case 'large':
        return 'text-lg py-2 px-4';
      default: // medium
        return 'text-base py-1.5 px-3';
    }
  };
  
  // Get variant-based classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return 'border-2 border-black';
    }
  };
  
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <button
        className={`
          font-mono
          ${getSizeClasses()}
          ${getVariantClasses()}
          ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
        `}
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        {previousLabel}
      </button>
      
      <span className="font-mono">
        Page {page} of {totalPages}
      </span>
      
      <button
        className={`
          font-mono
          ${getSizeClasses()}
          ${getVariantClasses()}
          ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
        `}
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        {nextLabel}
      </button>
    </div>
  );
};

// Mini pagination variant with just page indication and small buttons
export const MiniPagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: 'default' | 'bordered' | 'cutout';
  className?: string;
}> = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'default',
  className = '',
}) => {
  // Ensure current page is within bounds
  const page = Math.max(1, Math.min(currentPage, totalPages));
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      onPageChange(newPage);
    }
  };
  
  // Get variant-based classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'bordered':
        return 'border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]';
      case 'cutout':
        return 'border-2 border-black transform rotate-[-0.5deg]';
      default:
        return 'border-2 border-black';
    }
  };
  
  return (
    <div className={`inline-flex items-center ${className}`}>
      <button
        className={`
          w-7 h-7 flex items-center justify-center font-mono
          ${getVariantClasses()}
          ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
        `}
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        ‹
      </button>
      
      <span className="mx-2 font-mono">
        {page} / {totalPages}
      </span>
      
      <button
        className={`
          w-7 h-7 flex items-center justify-center font-mono
          ${getVariantClasses()}
          ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
        `}
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  );
};

// Example component
export const PaginationExamples: React.FC = () => {
  // State for the various pagination examples
  const [standardPage, setStandardPage] = React.useState(1);
  const [manyPagesPage, setManyPagesPage] = React.useState(5);
  const [simplePage, setSimplePage] = React.useState(1);
  const [miniPage, setMiniPage] = React.useState(1);
  
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Pagination</h2>
      <p className="mb-8 font-sans">
        Pagination components with brutalist styling for navigating through multiple pages of content.
      </p>
      
      <div className="space-y-12">
        {/* Standard Pagination */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Standard Pagination</h3>
          <div className="space-y-4">
            <div>
              <Pagination
                currentPage={standardPage}
                totalPages={10}
                onPageChange={setStandardPage}
                variant="default"
              />
            </div>
            <div>
              <Pagination
                currentPage={standardPage}
                totalPages={10}
                onPageChange={setStandardPage}
                variant="bordered"
              />
            </div>
            <div>
              <Pagination
                currentPage={standardPage}
                totalPages={10}
                onPageChange={setStandardPage}
                variant="cutout"
              />
            </div>
          </div>
        </div>
        
        {/* Size Variants */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Size Variants</h3>
          <div className="space-y-4">
            <div>
              <Pagination
                currentPage={standardPage}
                totalPages={10}
                onPageChange={setStandardPage}
                variant="bordered"
                size="small"
              />
            </div>
            <div>
              <Pagination
                currentPage={standardPage}
                totalPages={10}
                onPageChange={setStandardPage}
                variant="bordered"
                size="medium"
              />
            </div>
            <div>
              <Pagination
                currentPage={standardPage}
                totalPages={10}
                onPageChange={setStandardPage}
                variant="bordered"
                size="large"
              />
            </div>
          </div>
        </div>
        
        {/* Many Pages */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Many Pages with Ellipsis</h3>
          <div>
            <Pagination
              currentPage={manyPagesPage}
              totalPages={50}
              onPageChange={setManyPagesPage}
              siblingCount={1}
              boundaryCount={1}
              variant="bordered"
            />
            <div className="mt-2 font-mono">
              Current Page: {manyPagesPage}
            </div>
          </div>
        </div>
        
        {/* Custom Configuration */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Custom Configuration</h3>
          <div>
            <Pagination
              currentPage={manyPagesPage}
              totalPages={50}
              onPageChange={setManyPagesPage}
              siblingCount={2}
              boundaryCount={2}
              showFirstButton={false}
              showLastButton={false}
              variant="cutout"
              size="large"
            />
          </div>
        </div>
        
        {/* Simplified Pagination */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Simplified Pagination</h3>
          <div className="space-y-4">
            <div>
              <SimplePagination
                currentPage={simplePage}
                totalPages={10}
                onPageChange={setSimplePage}
                variant="default"
              />
            </div>
            <div>
              <SimplePagination
                currentPage={simplePage}
                totalPages={10}
                onPageChange={setSimplePage}
                variant="bordered"
                previousLabel="← Back"
                nextLabel="Next →"
              />
            </div>
            <div>
              <SimplePagination
                currentPage={simplePage}
                totalPages={10}
                onPageChange={setSimplePage}
                variant="cutout"
                size="small"
              />
            </div>
          </div>
        </div>
        
        {/* Mini Pagination */}
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Mini Pagination</h3>
          <div className="space-y-4">
            <div>
              <MiniPagination
                currentPage={miniPage}
                totalPages={10}
                onPageChange={setMiniPage}
                variant="default"
              />
            </div>
            <div>
              <MiniPagination
                currentPage={miniPage}
                totalPages={10}
                onPageChange={setMiniPage}
                variant="bordered"
              />
            </div>
            <div>
              <MiniPagination
                currentPage={miniPage}
                totalPages={10}
                onPageChange={setMiniPage}
                variant="cutout"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 