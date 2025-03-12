import Link from 'next/link';

interface BlogPostTileProps {
  title: string;
  slug: string;
}

export default function BlogPostTile({ title, slug }: BlogPostTileProps) {
  return (
    <Link href={`/words/${slug}`} className="block">
      <div className="w-[400px] h-[300px] bg-white border-2 border-[#e5b25d] p-8 rounded-lg transform transition-all duration-500 hover:scale-[1.02] hover:border-[#cff27e] hover:shadow-lg hover:shadow-[#f2dd6e]/20 flex items-center justify-center">
        <h3 className="text-4xl font-bold text-[#523a34] text-center group-hover:text-[#b87d4b] transition-colors">{title}</h3>
      </div>
    </Link>
  );
} 