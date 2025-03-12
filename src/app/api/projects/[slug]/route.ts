import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import * as fs from 'fs'
import * as path from 'path'

// Define an interface for Project
interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  imageUrl?: string | null;
  repoUrl?: string | null;
  demoUrl?: string | null;
  featured?: boolean;
  createdAt?: Date;
  content: string;
  published?: boolean;
  updatedAt?: Date;
}

// GET a single project by slug
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Using raw query to avoid type errors when schema and DB are out of sync
    try {
      const projects = await prisma.$queryRaw`
        SELECT 
          id, title, slug, description, technologies,
          "imageUrl", "repoUrl", "demoUrl", featured, "createdAt", content,
          published, "updatedAt"
        FROM "Project"
        WHERE slug = ${params.slug} AND published = true
        LIMIT 1
      `
      
      // Check if we found any project
      const project: Project | null = Array.isArray(projects) && projects.length > 0 
        ? projects[0] as Project
        : null

      if (!project) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        )
      }

      // Check if a markdown file exists for this project
      const markdownPath = path.join(process.cwd(), 'public', 'projects', `${params.slug}.md`)
      
      try {
        if (fs.existsSync(markdownPath)) {
          // If markdown file exists, use its content
          const markdownContent = fs.readFileSync(markdownPath, 'utf8')
          project.content = markdownContent
          console.log(`Using markdown file for project ${params.slug}`)
        }
      } catch (fsError) {
        console.error('Error reading markdown file:', fsError)
        // Continue with database content if there's an error reading the file
      }

      return NextResponse.json(project)
    } catch (dbError) {
      console.error('Database error fetching project:', dbError)
      // Return not found if there's any database issue
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Error fetching project' },
      { status: 500 }
    )
  }
} 