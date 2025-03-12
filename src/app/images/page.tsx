import Image from 'next/image';
import husarzPic from '@/public/personal/husarz.jpg';
import wawmunPic from '@/public/personal/wawmun.jpg';
import columbiaPic from '@/public/personal/columbia.jpg';
import puertoricoPic from '@/public/personal/puertorico.jpg';
import pilkarzPic from '@/public/personal/pilkarz.jpg';
import slubPic from '@/public/personal/slub.jpg';

export default function ImagesPage() {
  return (
    <div className="min-h-screen bg-zinc-900 p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Images</h1>
      <Image src={husarzPic} alt="Husarz" />
      <Image src={wawmunPic} alt="Wawmun" />
      <Image src={columbiaPic} alt="Columbia" />
      <Image src={puertoricoPic} alt="Puertorico" />
      <Image src={pilkarzPic} alt="Pilkarz" />
      <Image src={slubPic} alt="Slub" />
    </div>
  );
}
