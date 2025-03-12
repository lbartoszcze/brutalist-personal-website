'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Project = {
  id: string
  title: string
  slug: string
  description: string
  imageUrl: string | null
  technologies: string[]
  featured: boolean
  published: boolean
  createdAt: string
}

export default function ManageProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/admin/projects', {
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
        setProjects(data)
      } catch (err) {
        setError('Failed to load projects')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [router])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        credentials: 'include', // Include JWT cookie
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      // Remove the deleted project from the state
      setProjects(projects.filter(project => project.id !== id))
    } catch (err) {
      console.error('Error deleting project:', err)
      alert('Failed to delete project')
    }
  }

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
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

      // Update the project in the state
      setProjects(
        projects.map(project =>
          project.id === id
            ? { ...project, published: !currentStatus }
            : project
        )
      )
    } catch (err) {
      console.error('Error updating project:', err)
      alert('Failed to update project')
    }
  }

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include JWT cookie
        body: JSON.stringify({ featured: !currentStatus }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      // Update the project in the state
      setProjects(
        projects.map(project =>
          project.id === id
            ? { ...project, featured: !currentStatus }
            : project
        )
      )
    } catch (err) {
      console.error('Error updating project:', err)
      alert('Failed to update project')
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Manage Projects</h1>
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Manage Projects</h1>
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Add New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p>No projects found. Create a new one to get started.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Technologies</th>
                <th className="py-3 px-6 text-center">Featured</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Created</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="font-medium">{project.title}</div>
                    <div className="text-xs text-gray-500">{project.slug}</div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    {project.technologies.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="bg-gray-200 px-2 py-1 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">No technologies</span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        project.featured
                          ? 'bg-purple-200 text-purple-800'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {project.featured ? 'Featured' : 'Not Featured'}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        project.published
                          ? 'bg-green-200 text-green-800'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {project.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        className="text-blue-500 hover:text-blue-700"
                        title="View"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/projects/edit/${project.id}`}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() =>
                          handleToggleFeatured(project.id, project.featured)
                        }
                        className={`hover:underline ${
                          project.featured
                            ? 'text-purple-500 hover:text-purple-700'
                            : 'text-indigo-500 hover:text-indigo-700'
                        }`}
                        title={project.featured ? 'Unfeature' : 'Feature'}
                      >
                        {project.featured ? 'Unfeature' : 'Feature'}
                      </button>
                      <button
                        onClick={() =>
                          handleTogglePublish(project.id, project.published)
                        }
                        className={`hover:underline ${
                          project.published
                            ? 'text-orange-500 hover:text-orange-700'
                            : 'text-green-500 hover:text-green-700'
                        }`}
                        title={project.published ? 'Unpublish' : 'Publish'}
                      >
                        {project.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
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