import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-white font-bold">
            Home
          </Link>
          <div className="flex space-x-4">
            <Link href="/words" className="text-gray-300 hover:text-white px-3 py-2">
              Words
            </Link>
            <Link href="/images" className="text-gray-300 hover:text-white px-3 py-2">
              Images
            </Link>
            <Link href="/videos" className="text-gray-300 hover:text-white px-3 py-2">
              Videos
            </Link>
            <Link href="/jobs" className="text-gray-300 hover:text-white px-3 py-2">
              Jobs
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white px-3 py-2">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 