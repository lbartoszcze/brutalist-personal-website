'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Thought = {
  id: string
  title: string
  content: string
  excerpt: string | null
  tags: string[]
  published: boolean
}

export default function EditThought({ params }: { params: { id: string } }) {
  const [thought, setThought] = useState<Thought | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [tags, setTags] = useState('')
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState({ message: '', type: '' })
  const router = useRouter()

  useEffect(() => {
    const fetchThought = async () => {
      try {
        const response = await fetch(`/api/admin/thoughts/${params.id}`, {
          credentials: 'include', // Include JWT cookie
        })

        if (!response.ok) {
          if (response.status === 401) {
            // Redirect to login if unauthorized
            router.push('/admin/login')
            return
          }
          throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()
        setThought(data)
        
        // Pre-fill form with existing data
        setTitle(data.title || '')
        setContent(data.content || '')
        setExcerpt(data.excerpt || '')
        setTags(data.tags?.join(', ') || '')
        setPublished(data.published || false)
      } catch (err) {
        console.error('Error fetching thought:', err)
        setStatus({ message: 'Failed to load thought', type: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchThought()
  }, [params.id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setStatus({ message: '', type: '' })

    try {
      // Form validation
      if (!title.trim()) {
        setStatus({ message: 'Title is required', type: 'error' })
        setSaving(false)
        return
      }

      if (!content.trim()) {
        setStatus({ message: 'Content is required', type: 'error' })
        setSaving(false)
        return
      }

      const formattedTags = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const response = await fetch(`/api/admin/thoughts/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies with JWT token
        body: JSON.stringify({
          title,
          content,
          excerpt: excerpt || undefined,
          tags: formattedTags,
          published,
        }),
      })

      if (response.ok) {
        setStatus({ message: 'Thought updated successfully!', type: 'success' })
        
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
        setStatus({ message: data.error || 'Error updating thought', type: 'error' })
      }
    } catch (error) {
      console.error('Error updating thought:', error)
      setStatus({ message: 'An unexpected error occurred', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Thought</h1>
        <p>Loading thought data...</p>
      </div>
    )
  }

  if (!thought) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Thought</h1>
        <p className="text-red-500">Thought not found.</p>
        <Link href="/admin/thoughts" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to Thoughts
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Thought: {thought.title}</h1>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Thought title"
          />
        </div>

        <div>
          <label className="block mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-64"
            placeholder="Your thoughts..."
          />
          <p className="text-gray-500 text-sm mt-1">Markdown supported</p>
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
          <label className="block mb-2">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="technology, philosophy, learning"
          />
          <p className="text-gray-500 text-sm mt-1">Comma separated list</p>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-5 h-5 mr-3"
          />
          <label htmlFor="published">Published</label>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded ${
              saving ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <Link
            href="/admin/thoughts"
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