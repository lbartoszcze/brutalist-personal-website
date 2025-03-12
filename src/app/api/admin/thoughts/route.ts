import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import slugify from 'slugify'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, content, excerpt, tags, published } = body

    // Create a unique slug from the title
    const baseSlug = slugify(title, { lower: true, strict: true })
    
    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: baseSlug },
    })
    
    // If slug exists, append a timestamp to make it unique
    const slug = existingPost 
      ? `${baseSlug}-${Date.now().toString().substring(9, 13)}` 
      : baseSlug

    const post = await prisma.blogPost.create({
      data: {
        title,
        content,
        slug,
        excerpt: excerpt || null,
        tags: tags || [],
        published: published || false,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error creating thought:', error)
    return NextResponse.json(
      { error: 'Error creating thought' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        tags: true,
        published: true,
        createdAt: true,
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching thoughts:', error)
    return NextResponse.json(
      { error: 'Error fetching thoughts' },
      { status: 500 }
    )
  }
} 