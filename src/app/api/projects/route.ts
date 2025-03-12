import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

// GET all published projects
export async function GET() {
  try {
    // Check if the Project model exists to avoid runtime errors
    try {
      // This might fail if the schema is out of sync with the database
      const projects = await prisma.$queryRaw`
        SELECT 
          id, title, slug, description, technologies,
          "imageUrl", "repoUrl", "demoUrl", featured, "createdAt", content
        FROM "Project"
        WHERE published = true
        ORDER BY "createdAt" DESC
      `
      
      return NextResponse.json(projects)
    } catch (dbError) {
      console.error('Database error:', dbError)
      
      // Type guard for Error type
      if (dbError instanceof Error) {
        const errorMsg = dbError.message
        // If there's a specific error that indicates the model doesn't exist
        if (errorMsg.includes('does not exist') || errorMsg.includes('not found')) {
          // Return empty array - table might not exist yet
          console.log('Project model might not exist yet. Returning empty array.')
          return NextResponse.json([])
        }
      }
      
      // Fall back to returning an empty array for any database error
      return NextResponse.json([])
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Error fetching projects' },
      { status: 500 }
    )
  }
} 