import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import slugify from 'slugify'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      title, 
      description, 
      content,
      githubUrl, 
      demoUrl, 
      technologies, 
      featured 
    } = body

    // Create a unique slug from the title
    const baseSlug = slugify(title, { lower: true, strict: true })
    
    // Check if slug already exists - first need to check if the Project model exists
    let existingProject = null
    try {
      existingProject = await prisma.project.findUnique({
        where: { slug: baseSlug },
      })
    } catch (error) {
      console.error('Project model might not exist yet:', error)
      // Continue with the operation - the slug will be unique on first creation
    }
    
    // If slug exists, append a timestamp to make it unique
    const slug = existingProject 
      ? `${baseSlug}-${Date.now().toString().substring(9, 13)}` 
      : baseSlug

    try {
      const project = await prisma.project.create({
        data: {
          title,
          description,
          content,
          slug,
          imageUrl: null, // Not used in current UI
          repoUrl: githubUrl || null,
          demoUrl: demoUrl || null,
          technologies: technologies || [],
          featured: featured || false,
          published: true, // Default to published
        },
      })
      return NextResponse.json(project)
    } catch (error) {
      // If prisma isn't properly set up for the Project model, inform the user
      console.error('Error creating project in database:', error)
      return NextResponse.json(
        { error: 'Error creating project. ' + (error instanceof Error ? error.message : '') },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Error creating project' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Check if the Project model exists before querying
    let projects = []
    try {
      projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          imageUrl: true,
          technologies: true,
          featured: true,
          published: true,
          createdAt: true,
        },
      })
    } catch (error) {
      console.error('Project model might not exist yet:', error)
      // Return empty array - table might not exist yet
      return NextResponse.json([])
    }

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Error fetching projects' },
      { status: 500 }
    )
  }
} 