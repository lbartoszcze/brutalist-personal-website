'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewProject() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [demoUrl, setDemoUrl] = useState('')
  const [featured, setFeatured] = useState(false)
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ message: '', type: '' })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ message: '', type: '' })

    try {
      // Form validation
      if (!title.trim()) {
        setStatus({ message: 'Title is required', type: 'error' })
        setLoading(false)
        return
      }

      if (!description.trim()) {
        setStatus({ message: 'Description is required', type: 'error' })
        setLoading(false)
        return
      }

      if (!content.trim()) {
        setStatus({ message: 'Content is required', type: 'error' })
        setLoading(false)
        return
      }

      const formattedTechnologies = technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech.length > 0)

      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies (which will have the JWT token)
        body: JSON.stringify({
          title,
          description,
          content,
          technologies: formattedTechnologies,
          repoUrl: githubUrl || undefined,
          demoUrl: demoUrl || undefined,
          featured,
          published,
        }),
      })

      if (response.ok) {
        setStatus({ message: 'Project created successfully!', type: 'success' })
        
        // Redirect to manage projects page after 2 seconds
        setTimeout(() => {
          router.push('/admin/projects')
        }, 2000)
      } else {
        // Handle unauthorized response
        if (response.status === 401) {
          // Redirect to login if unauthorized
          router.push('/admin/login')
          return
        }
        
        const data = await response.json()
        setStatus({ message: data.error || 'Error creating project', type: 'error' })
      }
    } catch (error) {
      console.error('Error creating project:', error)
      setStatus({ message: 'An unexpected error occurred', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Project</h1>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Project title"
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
            placeholder="Brief description of your project"
          />
        </div>

        <div>
          <label className="block mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-64"
            placeholder="Detailed information about your project"
          />
          <p className="text-gray-500 text-sm mt-1">Markdown supported</p>
        </div>

        <div>
          <label className="block mb-2">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
            placeholder="Brief excerpt of your project"
          />
        </div>

        <div>
          <label className="block mb-2">Technologies</label>
          <input
            type="text"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            className="w-full p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="React, Node.js, MongoDB"
          />
          <p className="text-gray-500 text-sm mt-1">Comma separated list</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">GitHub URL (Optional)</label>
            <input
              type="text"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://github.com/username/repo"
            />
          </div>

          <div>
            <label className="block mb-2">Demo URL (Optional)</label>
            <input
              type="text"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              className="w-full p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-5 h-5 mr-3"
            />
            <label htmlFor="featured">Feature this project</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-5 h-5 mr-3"
            />
            <label htmlFor="published">Publish this project</label>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
          <Link
            href="/admin/projects"
            className="text-gray-600 hover:text-gray-800"
          >
            Cancel
          </Link>
        </div>

        {status.message && (
          <div
            className={`p-4 rounded ${
              status.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {status.message}
          </div>
        )}
      </form>
    </div>
  )
} 