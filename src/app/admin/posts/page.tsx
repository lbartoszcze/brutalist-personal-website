'use client'
import { useState } from 'react'

export default function AdminPosts() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
        }),
      })

      if (response.ok) {
        setStatus('Post created successfully!')
        setTitle('')
        setContent('')
      } else {
        setStatus('Error creating post')
      }
    } catch {
      setStatus('Error creating post')
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Add New Post</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-white mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700 h-64"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Post
        </button>

        {status && (
          <p className="text-white mt-4">{status}</p>
        )}
      </form>
    </div>
  )
} 