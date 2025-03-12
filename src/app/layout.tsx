import './globals.css'
import type { Metadata } from 'next'
import Layout from '@/components/layout/Layout'

export const metadata: Metadata = {
  title: 'Łukasz Bartoszcze | Entrepreneur, Builder, Researcher',
  description: 'Personal website of Łukasz Bartoszcze - Entrepreneur, Builder, Researcher.',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
