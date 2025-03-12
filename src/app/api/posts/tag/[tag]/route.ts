import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { tag: string } }
) {
  try {
    const tag = params.tag;
    
    if (!tag) {
      return NextResponse.json(
        { error: 'Tag is required' },
        { status: 400 }
      );
    }

    const posts = await prisma.blogPost.findMany({
      where: {
        tags: {
          has: tag.toUpperCase() // Assuming tags are stored in uppercase
        },
        published: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        title: true,
        slug: true,
        excerpt: true,
        tags: true,
        createdAt: true
      }
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts by tag' },
      { status: 500 }
    );
  }
} 