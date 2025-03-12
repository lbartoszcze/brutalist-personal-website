'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Project = {
  id: string;
  title: string;
  description: string;
  excerpt: string | null;
  slug: string;
  technologies: string[];
  repoUrl?: string | null;
  demoUrl?: string | null;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Function to render skeleton loaders
  const renderSkeletons = (count: number) => {
    return Array(count).fill(0).map((_, index) => (
      <div key={index} className="project animate-pulse">
        <div className="h-7 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-16 bg-gray-200 rounded w-full mb-4"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="mt-3">
          <div className="h-4 bg-gray-200 rounded w-28"></div>
        </div>
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="container">
        <h1>PROJECTS</h1>
        <div className="brutalist-box">
          <p>A showcase of selected works spanning technology, research, and innovation.</p>
        </div>
        <div className="grid">
          {renderSkeletons(6)}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>PROJECTS</h1>
        <div className="brutalist-box">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>PROJECTS</h1>
      <div className="brutalist-box">
        <p>A showcase of selected works spanning technology, research, and innovation.</p>
      </div>
      
      <div className="grid">
        {projects.length === 0 ? (
          <p>No projects available at this time.</p>
        ) : (
          projects.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.id}>
              <div className="project">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div>
                  {project.technologies.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                {(project.demoUrl || project.repoUrl) && (
                  <div className="mt-3">
                    <a 
                      href={project.demoUrl || project.repoUrl || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block border-b border-black hover:bg-red-500 hover:text-white hover:border-red-500 px-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const url = project.demoUrl || project.repoUrl;
                        if (url) window.open(url, '_blank');
                      }}
                    >
                      Check it out →
                    </a>
                  </div>
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
} 