'use client'

import { useEffect, useState, Suspense } from 'react';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// The main component that uses useSearchParams
function ThoughtsContent() {
  const [thoughts, setThoughts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const tagParam = searchParams.get('tag');

  useEffect(() => {
    // If there's a tag parameter, filter by that tag
    const fetchUrl = tagParam 
      ? `/api/posts/tag/${encodeURIComponent(tagParam)}`
      : '/api/posts';
    
    setLoading(true);
    setActiveTag(tagParam);
    
    fetch(fetchUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        return res.json();
      })
      .then((data: BlogPost[]) => {
        setThoughts(data);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching thoughts:', error);
        setError('Failed to load thoughts. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tagParam]);

  const handleTagClick = (tag: string) => {
    // We're using client-side navigation with search params to handle tag filtering
    window.history.pushState({}, '', `/thoughts?tag=${encodeURIComponent(tag)}`);
    
    // Manually trigger state update since we're not using Next.js router navigate
    setActiveTag(tag);
    
    // Fetch the filtered posts
    setLoading(true);
    fetch(`/api/posts/tag/${encodeURIComponent(tag)}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        return res.json();
      })
      .then((data: BlogPost[]) => {
        setThoughts(data);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching thoughts by tag:', error);
        setError('Failed to load thoughts. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Function to render skeleton loaders
  const renderSkeletons = (count: number) => {
    return Array(count).fill(0).map((_, index) => (
      <div key={index} className="project animate-pulse">
        <div className="h-7 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-16 bg-gray-200 rounded w-full mb-4"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="mt-3">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <h1>THOUGHTS</h1>
      <div className="brutalist-box">
        <p>A collection of ideas, insights, and explorations across technology, entrepreneurship, and research.</p>
        
        {activeTag && (
          <div className="mt-4">
            <span>Filtering by tag: </span>
            <span className="tag">
              {activeTag}
            </span>
            <button 
              onClick={() => {
                window.history.pushState({}, '', '/thoughts');
                // Refresh without tag filter
                setActiveTag(null);
                setLoading(true);
                fetch('/api/posts')
                  .then(res => res.json())
                  .then((data: BlogPost[]) => {
                    setThoughts(data);
                    setLoading(false);
                  })
                  .catch(error => {
                    console.error('Error fetching thoughts:', error);
                    setLoading(false);
                  });
              }}
              className="ml-2 text-blue-600 hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>
      
      {loading ? (
        <div className="grid">
          {renderSkeletons(4)}
        </div>
      ) : error ? (
        <div className="brutalist-box">
          <p className="text-red-600">{error}</p>
        </div>
      ) : thoughts.length > 0 ? (
        <div className="grid">
          {thoughts.map((thought) => (
            <Link href={`/thoughts/${thought.slug}`} key={thought.slug}>
              <div className="project">
                <h3>{thought.title}</h3>
                <p>
                  {thought.excerpt || 'Click to read more about this topic.'}
                </p>
                
                <div>
                  {thought.tags?.map((tag) => (
                    <button
                      key={tag}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent link navigation
                        handleTagClick(tag);
                      }}
                      className={`tag ${activeTag === tag ? 'bg-blue-600 text-white' : ''}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                
                <div className="mt-3 text-sm text-gray-500">
                  {thought.createdAt ? new Date(thought.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'No date available'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="brutalist-box">
          <p>No thoughts found. {activeTag ? 'Try a different tag.' : 'Check back later!'}</p>
        </div>
      )}
    </div>
  );
}

// Loading fallback component with skeleton loaders
function ThoughtsLoading() {
  // Function to render skeleton loaders
  const renderSkeletons = (count: number) => {
    return Array(count).fill(0).map((_, index) => (
      <div key={index} className="project animate-pulse">
        <div className="h-7 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-16 bg-gray-200 rounded w-full mb-4"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="mt-3">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <h1>THOUGHTS</h1>
      <div className="brutalist-box">
        <p>A collection of ideas, insights, and explorations across technology, entrepreneurship, and research.</p>
      </div>
      <div className="grid">
        {renderSkeletons(4)}
      </div>
    </div>
  );
}

// The main exported component with Suspense boundary
export default function ThoughtsPage() {
  return (
    <Suspense fallback={<ThoughtsLoading />}>
      <ThoughtsContent />
    </Suspense>
  );
} 