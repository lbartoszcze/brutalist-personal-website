'use client'
import BlogPostTile from '@/app/components/words/BlogPostTile';

// This would typically come from your CMS or database
const blogPosts = [
  {
    title: "The Art of Building",
    excerpt: "Exploring the intersection of technology and human creativity in modern software development...",
    date: "March 2024",
    slug: "art-of-building"
  },
  {
    title: "AI and Human Consciousness",
    excerpt: "Diving deep into the philosophical implications of artificial intelligence and its relationship with human consciousness...",
    date: "February 2024",
    slug: "ai-human-consciousness"
  },
  {
    title: "Journey Through Time",
    excerpt: "From Poland to New York, a personal reflection on the path that led me here...",
    date: "January 2024",
    slug: "journey-through-time"
  }
];

export default function WordsPage() {
  return (
    <div className="min-h-screen bg-zinc-900 px-8 py-24">
      <h1 className="text-6xl md:text-7xl font-bold text-white mb-12">
        Words
      </h1>
      
      <div className="space-y-8">
        {blogPosts.map((post) => (
          <div 
            key={post.slug}
            className="border border-red-500"
          >
            <BlogPostTile {...post} />
          </div>
        ))}
      </div>
    </div>
  );
}
