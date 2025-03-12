import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-development-only'

// Use JWT authentication for both frontend and API routes
export async function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // For all admin routes (including API), check for a valid JWT in cookies
  const token = request.cookies.get('admin_token')?.value

  // If there's no token, redirect to login page for frontend or return 401 for API
  if (!token) {
    // For API routes, return 401 Unauthorized
    if (request.nextUrl.pathname.startsWith('/api/admin')) {
      return new NextResponse('Authentication required', {
        status: 401,
      })
    }
    
    // Check if already on login page to avoid redirect loop
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }
    
    // Redirect to login page for frontend routes
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  try {
    // Verify JWT token
    const secret = new TextEncoder().encode(JWT_SECRET)
    await jose.jwtVerify(token, secret)
    
    // Token is valid, allow access
    return NextResponse.next()
  } catch (error) {
    // For API routes, return 401 Unauthorized
    if (request.nextUrl.pathname.startsWith('/api/admin')) {
      return new NextResponse('Invalid token', {
        status: 401,
      })
    }
    
    // Invalid token, redirect to login for frontend routes
    const response = NextResponse.redirect(new URL('/admin/login', request.url))
    
    // Clear the invalid token
    response.cookies.delete('admin_token')
    
    return response
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
} 