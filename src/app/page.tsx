'use client'

import { useEffect, useState } from "react";
import { BlogPost } from '@/types/blog';
import Link from 'next/link';

// Define a Project type for TypeScript
interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  repoUrl?: string;
  demoUrl?: string;
  featured: boolean;
  createdAt: string;
}

export default function Home() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isThoughtsLoading, setIsThoughtsLoading] = useState(true);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);

  useEffect(() => {
    // Fetch blog posts
    fetch('/api/posts')
      .then(res => res.json())
      .then((data: BlogPost[]) => {
        setBlogPosts(data);
        setIsThoughtsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setIsThoughtsLoading(false);
      });
      
    // Fetch projects
    fetch('/api/projects')
      .then(res => res.json())
      .then((data: Project[]) => {
        setProjects(data);
        setIsProjectsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setIsProjectsLoading(false);
      });
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
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <header>
        <h1>ŁUKASZ BARTOSZCZE</h1>
        <p className="brutalist-box">ENTREPRENEUR / BUILDER / RESEARCHER</p>
      </header>
      
      <main>
        <section id="intro">
          <div className="brutalist-box">
            <p>I explore the intersection of entrepreneurship and research to push the boundaries of what is possible.</p>
            <p>This website is a raw collection of my thoughts, projects, and research findings.</p>
          </div>
        </section>
        
        <section id="thoughts">
          <Link href="/thoughts">
            <h2>LATEST THOUGHTS →</h2>
          </Link>
          <div className="grid">
            {isThoughtsLoading ? (
              renderSkeletons(2)
            ) : blogPosts && blogPosts.length > 0 ? (
              blogPosts.slice(0, 2).map((post) => (
                <Link href={`/thoughts/${post.slug}`} key={post.slug}>
                  <div className="project">
                    <h3>{post.title}</h3>
                    <p>{post.excerpt || 'Click to read more about this topic.'}</p>
                    <div>
                      {post.tags?.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-2 text-center py-4">
                <p>No thoughts found. Add some in the admin panel.</p>
              </div>
            )}
          </div>
        </section>
        
        <section id="projects">
          <Link href="/projects">
            <h2>SELECTED PROJECTS →</h2>
          </Link>
          <div className="grid">
            {isProjectsLoading ? (
              renderSkeletons(2)
            ) : projects && projects.length > 0 ? (
              // Display featured projects first, then others, up to 2 total
              projects
                .sort((a, b) => {
                  // First by featured status
                  if (a.featured !== b.featured) return a.featured ? -1 : 1;
                  // Then by creation date (newest first)
                  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                })
                .slice(0, 2)
                .map((project) => (
                  <Link href={`/projects/${project.slug}`} key={project.id}>
                    <div className="project">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div>
                        {project.technologies?.map((tech) => (
                          <span key={tech} className="tag">{tech}</span>
                        ))}
                      </div>
                      {(project.demoUrl || project.repoUrl) && (
                        <div className="mt-3">
                          <a 
                            href={project.demoUrl || project.repoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block border-b border-black hover:bg-red-500 hover:text-white hover:border-red-500 px-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              window.open(project.demoUrl || project.repoUrl, '_blank');
                            }}
                          >
                            Check it out →
                          </a>
                        </div>
                      )}
                    </div>
                  </Link>
                ))
            ) : (
              <div className="col-span-2 text-center py-4">
                <p>No projects found. Add some in the admin panel.</p>
              </div>
            )}
          </div>
        </section>
        
        <section id="research">
          <h2>RESEARCH AREAS</h2>
          <div className="brutalist-box">
            <h3>REPRESENTATION ENGINEERING</h3>
            <p> Finding new methods to diagnose and edit the brains of Large Language Models. On the way to semantically-aware, dynamic and self-improving AI systems.</p>
            
            <h3>ROBUST SYSTEMS</h3>
            <p>Understanding how complex systems break and how to make them resilient without sacrificing performance. Using this concept to analyze computer vision models, LLMs and wider societies.</p>
            
            <h3>GAME THEORY</h3>
            <p>Exploring the universal laws governing human behavior and how to use them to create incentives to reach optimal outcomes.</p>
            
            <p className="mt-4">
              <a 
                href="https://scholar.google.com/citations?user=8pSVNn0AAAAJ&hl=en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block border-b border-black hover:bg-red-500 hover:text-white hover:border-red-500 px-1"
              >
                View my research →
              </a>
            </p>
          </div>
        </section>

        <section id="about">
          <Link href="/about">
            <h2>ABOUT →</h2>
          </Link>
          <div className="brutalist-box">
            <p>I&apos;m an entrepreneur, researcher, and programmer sharing my thoughts and experiences in technology and innovation. My work spans across developing new solutions, exploring emerging technologies, and building products that solve real-world problems.</p>
            <p>I was born in 1997. Since then, I&apos;ve founded multiple ventures, conducted research in cutting-edge fields, and developed software that pushes boundaries.</p>
            <p className="mt-4">
              <Link href="/about" className="inline-block border-b border-black hover:bg-red-500 hover:text-white hover:border-red-500 px-1">Read more →</Link>
            </p>
          </div>
        </section>

        <section id="contact">
          <h2>CONTACT</h2>
          <div className="brutalist-box">
            <p>Interested in collaboration, research opportunities, or discussing innovative ideas? Reach out and I&apos;ll get back to you soon.</p>
            <p>
              <a href="mailto:lukasz.bartoszcze@gmail.com">lukasz.bartoszcze@gmail.com</a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
