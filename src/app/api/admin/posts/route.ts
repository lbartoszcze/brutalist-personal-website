import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import slugify from 'slugify'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, content } = body

    const slug = slugify(title, { lower: true })

    const post = await prisma.blogPost.create({
      data: {
        title,
        content,
        slug,
        published: true,
      },
    })

    return NextResponse.json(post)
  } catch {
    return NextResponse.json(
      { error: 'Error creating post' },
      { status: 500 }
    )
  }
} 