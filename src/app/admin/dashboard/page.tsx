'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BlogPost } from '@/types/blog'

interface Stats {
  postsCount: number;
  projectsCount: number;
}

// Define a simplified Project type since it's not exported from blog.ts
interface Project {
  id: string;
  title: string;
  slug: string;
}

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<Stats>({ postsCount: 0, projectsCount: 0 })
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState<string | null>(null)
  
  // We're not using these yet, so we'll just remove them
  // const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  // const [recentProjects, setRecentProjects] = useState<Project[]>([])

  useEffect(() => {
    // Fetch stats for the dashboard
    const fetchStats = async () => {
      setStatsLoading(true)
      try {
        // Fetch thoughts stats
        const thoughtsRes = await fetch('/api/admin/thoughts')
        const thoughtsData = await thoughtsRes.json()
        
        // Fetch projects stats
        const projectsRes = await fetch('/api/admin/projects')
        const projectsData = await projectsRes.json()
        
        setStats({
          postsCount: thoughtsData.length || 0,
          projectsCount: projectsData.length || 0
        })
        
        setStatsError(null)
      } catch (error) {
        console.error('Error fetching stats:', error)
        setStatsError('Failed to load statistics')
      } finally {
        setStatsLoading(false)
      }
    }
    
    fetchStats()
  }, [])

  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setLoading(false)
    }
  }
  
  // Function to render skeleton loaders for stats
  const renderStatSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {[1, 2, 3].map((index) => (
        <div key={index} className="brutalist-box p-4 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="container">
      <header className="flex justify-between items-center mb-8">
        <h1>ADMIN DASHBOARD</h1>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="tag bg-red-600 text-white hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging out...' : 'Logout'}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="brutalist-box">
          <h2>Thoughts</h2>
          <p className="mb-6">
            Create and manage blog posts and thoughts.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/admin/thoughts/new"
              className="tag bg-blue-600 text-white hover:bg-blue-700"
            >
              Create New Thought
            </Link>
            <Link
              href="/admin/thoughts"
              className="tag"
            >
              Manage Thoughts
            </Link>
          </div>
        </div>

        <div className="brutalist-box">
          <h2>Projects</h2>
          <p className="mb-6">
            Create and manage your project portfolio.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/admin/projects/new"
              className="tag bg-blue-600 text-white hover:bg-blue-700"
            >
              Create New Project
            </Link>
            <Link
              href="/admin/projects"
              className="tag"
            >
              Manage Projects
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 brutalist-box">
        <h2>Quick Stats</h2>
        {statsLoading ? (
          renderStatSkeletons()
        ) : statsError ? (
          <div className="mt-4 text-red-600">{statsError}</div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="brutalist-box p-4">
              <h3>Total Thoughts</h3>
              <p className="text-3xl text-blue-600">{stats.postsCount}</p>
            </div>
            <div className="brutalist-box p-4">
              <h3>Total Projects</h3>
              <p className="text-3xl text-blue-600">{stats.projectsCount}</p>
            </div>
            <div className="brutalist-box p-4">
              <h3>Published Content</h3>
              <p className="text-3xl text-blue-600">{stats.postsCount + stats.projectsCount}</p>
              <p className="text-sm text-gray-600">out of {stats.postsCount + stats.projectsCount} items</p>
            </div>
          </div>
        ) : (
          <div className="mt-4 text-gray-600">No statistics available</div>
        )}
      </div>
    </div>
  )
} 