import Image from "next/image";
import husarzPic from '@/public/husarz.jpg';

export default function MainImage() {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative">
        <Image
          src={husarzPic}
          alt="Husarz"
          width={900}
          height={600}
          className="w-full rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center px-4 text-white">
            going at it since 1997
          </h1>
        </div>
      </div>
      <div className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg 
          className="w-6 h-6"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}
