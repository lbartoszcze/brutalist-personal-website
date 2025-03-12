'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { marked } from 'marked';

interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  technologies: string[];
  repoUrl?: string | null;
  demoUrl?: string | null;
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.slug}`);
        
        if (response.status === 404) {
          // Project not found, redirect to projects page
          router.push('/projects');
          return;
        }
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setProject(data);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.slug, router]);

  // Function to render project skeleton loader
  const renderSkeleton = () => (
    <div className="container animate-pulse">
      <header className="border-b-2 border-black pb-4 mb-8">
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="mt-4 flex gap-2">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
      </header>

      <div className="brutalist-box mb-8">
        <div className="h-5 bg-gray-200 rounded w-full mb-3"></div>
        <div className="h-5 bg-gray-200 rounded w-5/6"></div>
      </div>

      <div className="content-box">
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
        
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
        
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>

      <div className="mt-12">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );

  if (loading) {
    return renderSkeleton();
  }

  if (error || !project) {
    return (
      <div className="container">
        <h1>Project Not Found</h1>
        <div className="brutalist-box">
          <p className="text-red-500">{error || 'This project could not be found'}</p>
          <Link href="/projects" className="tag">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // Convert markdown to HTML if the content appears to be markdown
  const contentHtml = project.content.trim().startsWith('#') || 
                      project.content.includes('\n## ') || 
                      project.content.includes('\n- ') 
                        ? marked(project.content) 
                        : project.content;

  return (
    <div className="container">
      <header className="border-b-2 border-black pb-4 mb-8">
        <h1>{project.title.toUpperCase()}</h1>
        <div className="mt-4">
          {project.technologies.map((tag) => (
            <span key={tag} className="tag mr-2">{tag}</span>
          ))}
        </div>
      </header>

      <div className="brutalist-box mb-8">
        <p>{project.description}</p>
      </div>

      <div className="content-box" dangerouslySetInnerHTML={{ __html: contentHtml }} />

      {(project.repoUrl || project.demoUrl) && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Project Links</h3>
          <div className="flex flex-wrap gap-4">
            {project.repoUrl && (
              <a 
                href={project.repoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block border-b border-black hover:bg-red-500 hover:text-white hover:border-red-500 px-1"
              >
                View Repository →
              </a>
            )}
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block border-b border-black hover:bg-red-500 hover:text-white hover:border-red-500 px-1"
              >
                Live Demo →
              </a>
            )}
          </div>
        </div>
      )}

      <div className="mt-12">
        <Link href="/projects" className="tag">
          ← Back to Projects
        </Link>
      </div>
    </div>
  );
} 