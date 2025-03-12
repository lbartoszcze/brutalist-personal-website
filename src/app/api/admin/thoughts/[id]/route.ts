import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

// GET a single thought by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const thought = await prisma.blogPost.findUnique({
      where: { id: params.id },
    })

    if (!thought) {
      return NextResponse.json(
        { error: 'Thought not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(thought)
  } catch (error) {
    console.error('Error fetching thought:', error)
    return NextResponse.json(
      { error: 'Error fetching thought' },
      { status: 500 }
    )
  }
}

// PATCH (update) a thought
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validate the thought exists
    const existingThought = await prisma.blogPost.findUnique({
      where: { id: params.id },
    })

    if (!existingThought) {
      return NextResponse.json(
        { error: 'Thought not found' },
        { status: 404 }
      )
    }

    // Update the thought
    const updatedThought = await prisma.blogPost.update({
      where: { id: params.id },
      data: body,
    })

    return NextResponse.json(updatedThought)
  } catch (error) {
    console.error('Error updating thought:', error)
    return NextResponse.json(
      { error: 'Error updating thought' },
      { status: 500 }
    )
  }
}

// DELETE a thought
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validate the thought exists
    const thought = await prisma.blogPost.findUnique({
      where: { id: params.id },
    })

    if (!thought) {
      return NextResponse.json(
        { error: 'Thought not found' },
        { status: 404 }
      )
    }

    // Delete the thought
    await prisma.blogPost.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting thought:', error)
    return NextResponse.json(
      { error: 'Error deleting thought' },
      { status: 500 }
    )
  }
} 