'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Thought = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  tags: string[]
  published: boolean
  createdAt: string
}

export default function ManageThoughts() {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const response = await fetch('/api/admin/thoughts', {
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
        setThoughts(data)
      } catch (err) {
        setError('Failed to load thoughts')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchThoughts()
  }, [router])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this thought?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/thoughts/${id}`, {
        method: 'DELETE',
        credentials: 'include', // Include JWT cookie
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      // Remove the deleted thought from the state
      setThoughts(thoughts.filter(thought => thought.id !== id))
    } catch (err) {
      console.error('Error deleting thought:', err)
      alert('Failed to delete thought')
    }
  }

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/thoughts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include JWT cookie
        body: JSON.stringify({ published: !currentStatus }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      // Update the thought in the state
      setThoughts(
        thoughts.map(thought =>
          thought.id === id
            ? { ...thought, published: !currentStatus }
            : thought
        )
      )
    } catch (err) {
      console.error('Error updating thought:', err)
      alert('Failed to update thought')
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Manage Thoughts</h1>
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Manage Thoughts</h1>
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Thoughts</h1>
        <Link
          href="/admin/thoughts/new"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Add New Thought
        </Link>
      </div>

      {thoughts.length === 0 ? (
        <p>No thoughts found. Create a new one to get started.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Slug</th>
                <th className="py-3 px-6 text-left">Tags</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Created</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {thoughts.map((thought) => (
                <tr
                  key={thought.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="font-medium">{thought.title}</div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span className="font-medium">{thought.slug}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    {thought.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {thought.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-gray-200 px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">No tags</span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        thought.published
                          ? 'bg-green-200 text-green-800'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {thought.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    {new Date(thought.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        href={`/thoughts/${thought.slug}`}
                        target="_blank"
                        className="text-blue-500 hover:text-blue-700"
                        title="View"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/thoughts/edit/${thought.id}`}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() =>
                          handleTogglePublish(thought.id, thought.published)
                        }
                        className={`hover:underline ${
                          thought.published
                            ? 'text-orange-500 hover:text-orange-700'
                            : 'text-green-500 hover:text-green-700'
                        }`}
                        title={thought.published ? 'Unpublish' : 'Publish'}
                      >
                        {thought.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => handleDelete(thought.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
} 