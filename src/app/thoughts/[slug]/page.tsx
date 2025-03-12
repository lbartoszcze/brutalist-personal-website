'use client'

import { useEffect, useState, Suspense } from 'react';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';
import { marked } from 'marked'; // We'll use marked to render markdown

// The main content component
function ThoughtContent({ slug }: { slug: string }) {
  const [thought, setThought] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/posts/${slug}`)
      .then(res => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Thought not found');
          }
          throw new Error('An error occurred while fetching the thought');
        }
        return res.json();
      })
      .then((data: BlogPost) => {
        setThought(data);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching thought:', error);
        setError(error.message || 'Failed to load thought');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  const renderContent = (content: string) => {
    try {
      return { __html: marked(content) };
    } catch (error) {
      console.error('Error rendering markdown:', error);
      return { __html: content };
    }
  };

  // Skeleton loader for the thought content
  const renderSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-3/4 mb-8"></div>
      
      <div className="brutalist-box">
        <div className="flex gap-2 mb-5">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
        
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
      </div>
      
      <div className="brutalist-box">
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
        
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
        
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="brutalist-box">
        <Link href="/thoughts" className="tag">← BACK TO THOUGHTS</Link>
      </div>

      {loading ? (
        renderSkeleton()
      ) : error ? (
        <div className="brutalist-box">
          <h2>Error</h2>
          <p className="text-red-600">{error}</p>
          <div className="mt-4">
            <Link href="/thoughts" className="tag">
              Return to Thoughts
            </Link>
          </div>
        </div>
      ) : thought ? (
        <article>
          <h1>{thought.title}</h1>
          
          <div className="brutalist-box">
            {thought.tags && thought.tags.length > 0 && (
              <div className="tags">
                {thought.tags.map(tag => (
                  <Link 
                    key={tag} 
                    href={`/thoughts?tag=${encodeURIComponent(tag)}`}
                    className="tag"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
            
            {thought.createdAt && (
              <div className="mb-8 text-gray-500">
                {new Date(thought.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            )}
          </div>
          
          <div className="brutalist-box">
            <div dangerouslySetInnerHTML={renderContent(thought.content)} />
          </div>
        </article>
      ) : (
        <div className="brutalist-box">
          <p>Thought not found</p>
        </div>
      )}
    </div>
  );
}

// Loading fallback component
function ThoughtLoading() {
  // Skeleton loader for the thought content
  const renderSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-3/4 mb-8"></div>
      
      <div className="brutalist-box">
        <div className="flex gap-2 mb-5">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
        
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
      </div>
      
      <div className="brutalist-box">
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
        
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
        
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="brutalist-box">
        <Link href="/thoughts" className="tag">← BACK TO THOUGHTS</Link>
      </div>
      {renderSkeleton()}
    </div>
  );
}

// Main exported component with Suspense boundary
export default function ThoughtPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<ThoughtLoading />}>
      <ThoughtContent slug={params.slug} />
    </Suspense>
  );
} 