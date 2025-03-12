'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewThought() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [tags, setTags] = useState('')
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

      if (!content.trim()) {
        setStatus({ message: 'Content is required', type: 'error' })
        setLoading(false)
        return
      }

      const formattedTags = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const response = await fetch('/api/admin/thoughts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies (which will have the JWT token)
        body: JSON.stringify({
          title,
          content,
          excerpt: excerpt || undefined,
          tags: formattedTags,
          published,
        }),
      })

      if (response.ok) {
        setStatus({ message: 'Thought created successfully!', type: 'success' })
        
        // Redirect to manage thoughts page after 2 seconds
        setTimeout(() => {
          router.push('/admin/thoughts')
        }, 2000)
      } else {
        // Handle unauthorized response
        if (response.status === 401) {
          // Redirect to login if unauthorized
          router.push('/admin/login')
          return
        }
        
        const data = await response.json()
        setStatus({ message: data.error || 'Error creating thought', type: 'error' })
      }
    } catch (error) {
      console.error('Error creating thought:', error)
      setStatus({ message: 'An unexpected error occurred', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <header className="flex justify-between items-center mb-8">
        <h1>CREATE NEW THOUGHT</h1>
        <Link
          href="/admin/dashboard"
          className="tag"
        >
          Back to Dashboard
        </Link>
      </header>

      <form onSubmit={handleSubmit} className="brutalist-box space-y-6">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label className="block mb-2">Excerpt (Optional)</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
            placeholder="Brief summary of your thought"
          />
        </div>

        <div>
          <label className="block mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-64"
            placeholder="Write your thought content here..."
          />
          <p className="text-gray-500 text-sm mt-1">Markdown supported</p>
        </div>

        <div>
          <label className="block mb-2">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter tags separated by commas"
          />
          <p className="text-gray-500 text-sm mt-1">Ex: technology, programming, thoughts</p>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-5 h-5 mr-3"
          />
          <label htmlFor="published">Publish immediately</label>
        </div>

        {status.message && (
          <div className={`brutalist-box p-3 ${status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {status.message}
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <Link
            href="/admin/thoughts"
            className="tag"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="tag bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Thought'}
          </button>
        </div>
      </form>
    </div>
  )
} 