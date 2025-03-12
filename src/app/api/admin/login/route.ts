import { NextResponse } from 'next/server'
import * as jose from 'jose'
import { cookies } from 'next/headers'

// Security-critical constants should come from environment variables
const JWT_SECRET = process.env.JWT_SECRET
const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const TOKEN_EXPIRY = '24h'

export async function POST(request: Request) {
  try {
    // Check if environment variables are set
    if (!JWT_SECRET || !ADMIN_USERNAME || !ADMIN_PASSWORD) {
      console.error('Admin authentication environment variables are not properly configured')
      return NextResponse.json(
        { error: 'Server authentication configuration error' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { username, password } = body

    // Validate credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    // Create a JWT token
    const secret = new TextEncoder().encode(JWT_SECRET)
    const token = await new jose.SignJWT({ 
      username,
      role: 'admin'
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(TOKEN_EXPIRY)
      .sign(secret)

    // Set cookie
    cookies().set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    )
  }
} 