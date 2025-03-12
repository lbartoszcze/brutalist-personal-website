import Link from 'next/link';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

interface BlogPostParams {
  params: {
    slug: string;
  };
}

async function getBlogPost(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: {
      slug: slug
    }
  });
  
  if (!post) {
    notFound();
  }
  
  return post;
}

export default async function BlogPost({ params }: BlogPostParams) {
  const post = await getBlogPost(params.slug);
  
  return (
    <article className="min-h-screen bg-zinc-900 px-4 py-24 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/" 
          className="text-gray-400 hover:text-white transition-colors mb-12 block"
        >
          ← Back to Home
        </Link>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
          {post.title}
        </h1>
        
        <p className="text-xl text-gray-400 mb-12">
          {new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
          })}
        </p>
        
        <div className="prose prose-invert prose-lg max-w-none">
          {post.content}
        </div>
      </div>
    </article>
  );
}
