import Link from 'next/link';

interface ContentTileProps {
  title: string;
  href?: string;
  description?: string;
  backgroundColor: string;
  type?: string;
}

export default function ContentTile({ title, href = "#", description, backgroundColor }: ContentTileProps) {
  return (
    <div className={`min-h-screen ${backgroundColor} p-8 relative`}>
      <h2 className="absolute top-8 left-8 text-4xl md:text-5xl font-bold text-white">
        {title}
      </h2>

      <div className="h-full flex items-center justify-center">
        <div className="max-w-3xl w-full text-center">
          <p className="text-xl text-gray-300 mb-8">{description}</p>
          <Link 
            href={href}
            className="inline-block bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-8 py-4 rounded-lg text-xl transition-all duration-300"
          >
            Explore {title}
          </Link>
        </div>
      </div>
    </div>
  );
} 