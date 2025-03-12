import Link from 'next/link';

const menuItems = [
  { title: 'words', href: '/words' },
  { title: 'images', href: '/images' },
];

export default function MainMenu() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex justify-center space-x-4">
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            href={item.href} 
            className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-6 py-3 rounded-lg text-center transition-all duration-300 text-lg"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
