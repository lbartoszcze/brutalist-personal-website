'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Career() {
  const [mounted, setMounted] = useState(false);
  const [visibleLogos, setVisibleLogos] = useState<number[]>([]);
  
  // Control logo visibility to make them appear 10x less frequently
  useEffect(() => {
    if (!mounted) return;
    
    // Initially no logos visible
    setVisibleLogos([]);
    
    // Set up interval to maybe show a logo
    const interval = setInterval(() => {
      // 10% chance of showing a logo
      if (Math.random() < 0.1) {
        // Pick a random logo to show
        const logoIndex = Math.floor(Math.random() * 8);
        
        setVisibleLogos(prev => {
          // Add this logo
          const newLogos = [...prev, logoIndex];
          
          // Remove it after its animation completes (around 2s)
          setTimeout(() => {
            setVisibleLogos(current => current.filter(idx => idx !== logoIndex));
          }, 20000);
          
          return newLogos;
        });
      }
    }, 1000); // Check every second
    
    return () => clearInterval(interval);
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Logos configuration
  const logos = [
    { src: '/career/columbia_logo.png', alt: 'Columbia', path: 'top-path-1' },
    { src: '/career/warwick_logo.jpeg', alt: 'Warwick', path: 'right-path-1' },
    { src: '/career/accenture-logo.png', alt: 'Accenture', path: 'top-path-2' },
    { src: '/career/bcgplatinion_logo.png', alt: 'BCG', path: 'right-path-2' },
    { src: '/career/palantir_logo.png', alt: 'Palantir', path: 'top-path-3' },
    { src: '/career/controlai_logo.png', alt: 'ControlAI', path: 'right-path-3' },
    { src: '/career/turbot_logo.png', alt: 'Turbot', path: 'top-path-4' },
    { src: '/career/wisent_logo.png', alt: 'Wisent', path: 'right-path-4' },
  ];

  return (
    <section id="career" className="brutalist-box p-6 w-full">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Content */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold mb-4">Career</h2>
          <div className="space-y-4">
            <p>
              I am currently the CEO of Wisent, the representation engineering company, backed by 
              Entrepreneur First and Transpose. My background is in computer science and economics, 
              having studied at Columbia and the University of Warwick.
            </p>
            <p>
              I tried to brute force my way up the career ladder, working at Accenture, BCG and 
              Palantir before eventually becoming confident enough in my abilities to be a founder. 
              Since then, I have exited ControlAI and am now running Wisent.
            </p>
          </div>
        </div>

        {/* Animation Container */}
        <div className="w-80 h-80 relative border-2 border-black bg-white overflow-hidden">
          {/* Static Ladder Frame */}
          <div 
            className="absolute w-10"
            style={{
              left: '50%',
              top: '50%',
              height: '140%',
              transform: 'translate(-50%, -50%) rotate(45deg)',
              zIndex: 10
            }}
          >
            {/* Ladder sides */}
            <div className="absolute left-0 top-0 h-full w-0.5 bg-black" />
            <div className="absolute right-0 top-0 h-full w-0.5 bg-black" />
            
            {/* Moving Steps Container */}
            <div className="absolute inset-x-0 top-0 h-full">
              <div 
                className="absolute inset-0 animate-steps"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 10px, black 10px, black 12px)',
                }}
              />
            </div>

            {/* Stick Figure */}
            <div 
              className="absolute w-4 h-6 animate-figure text-red-500"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Head */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border border-red-500 rounded-full" />
              
              {/* Body */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-red-500" />
              
              {/* Arms */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 animate-arms">
                <div className="absolute left-0 w-1 h-[1px] bg-red-500 origin-right animate-leftArm" />
                <div className="absolute right-0 w-1 h-[1px] bg-red-500 origin-left animate-rightArm" />
              </div>
              
              {/* Legs */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2">
                <div className="absolute left-0 w-[1px] h-1.5 bg-red-500 origin-top animate-leftLeg" />
                <div className="absolute right-0 w-[1px] h-1.5 bg-red-500 origin-top animate-rightLeg" />
              </div>
            </div>
          </div>

          {mounted && (
            <>
              {/* Render only visible logos */}
              {logos.map((logo, index) => (
                visibleLogos.includes(index) && (
                  <div key={index} className={`absolute w-12 h-12 ${logo.path}`}>
                    <div className="w-full h-full rounded-full border-2 border-black overflow-hidden bg-white flex items-center justify-center">
                      <Image 
                        src={logo.src}
                        alt={logo.alt}
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                  </div>
                )
              ))}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes steps {
          0% { transform: translateY(0); }
          100% { transform: translateY(12px); }
        }

        @keyframes figure {
          0%, 100% { transform: translate(-50%, -50%); }
          50% { transform: translate(-50%, -70%); }
        }

        @keyframes leftArm {
          0%, 100% { transform: rotate(-45deg); }
          50% { transform: rotate(45deg); }
        }

        @keyframes rightArm {
          0%, 100% { transform: rotate(45deg); }
          50% { transform: rotate(-45deg); }
        }

        @keyframes leftLeg {
          0%, 100% { transform: rotate(-30deg); }
          50% { transform: rotate(30deg); }
        }

        @keyframes rightLeg {
          0%, 100% { transform: rotate(30deg); }
          50% { transform: rotate(-30deg); }
        }

        /* Falling paths on the TOP side of the ladder (top-right to bottom-left) */
        @keyframes top-path-1 {
          0% { top: -40px; right: 64px; opacity: 1; }
          10% { top: 32px; right: 128px; opacity: 1; }
          20% { top: 64px; right: 192px; opacity: 1; }
          30% { top: 96px; right: 256px; opacity: 1; }
          40% { top: 128px; right: 302px; opacity: 1; }
          50% { top: 160px; right: 348px; opacity: 1; }
          60% { top: 192px; right: 394px; opacity: 1; }
          70% { top: 224px; right: 440px; opacity: 1; }
          80% { top: 256px; right: 464px; opacity: 1; }
          90% { top: 288px; right: 464px; opacity: 1; }
          100% { top: 320px; right: 464px; opacity: 0; }
        }

        @keyframes top-path-2 {
          0% { top: -40px; right: 120px; opacity: 1; }
          10% { top: 32px; right: 184px; opacity: 1; }
          20% { top: 64px; right: 248px; opacity: 1; }
          30% { top: 96px; right: 312px; opacity: 1; }
          40% { top: 128px; right: 358px; opacity: 1; }
          50% { top: 160px; right: 404px; opacity: 1; }
          60% { top: 192px; right: 450px; opacity: 1; }
          70% { top: 224px; right: 496px; opacity: 1; }
          80% { top: 256px; right: 520px; opacity: 1; }
          90% { top: 288px; right: 520px; opacity: 1; }
          100% { top: 320px; right: 520px; opacity: 0; }
        }

        @keyframes top-path-3 {
          0% { top: -40px; right: 180px; opacity: 1; }
          10% { top: 32px; right: 244px; opacity: 1; }
          20% { top: 64px; right: 308px; opacity: 1; }
          30% { top: 96px; right: 372px; opacity: 1; }
          40% { top: 128px; right: 418px; opacity: 1; }
          50% { top: 160px; right: 464px; opacity: 1; }
          60% { top: 192px; right: 510px; opacity: 1; }
          70% { top: 224px; right: 556px; opacity: 1; }
          80% { top: 256px; right: 580px; opacity: 1; }
          90% { top: 288px; right: 580px; opacity: 1; }
          100% { top: 320px; right: 580px; opacity: 0; }
        }

        @keyframes top-path-4 {
          0% { top: -40px; right: 240px; opacity: 1; }
          10% { top: 32px; right: 304px; opacity: 1; }
          20% { top: 64px; right: 368px; opacity: 1; }
          30% { top: 96px; right: 432px; opacity: 1; }
          40% { top: 128px; right: 478px; opacity: 1; }
          50% { top: 160px; right: 524px; opacity: 1; }
          60% { top: 192px; right: 570px; opacity: 1; }
          70% { top: 224px; right: 616px; opacity: 1; }
          80% { top: 256px; right: 640px; opacity: 1; }
          90% { top: 288px; right: 640px; opacity: 1; }
          100% { top: 320px; right: 640px; opacity: 0; }
        }

        /* Falling paths on the RIGHT side of the ladder (right-middle to left-bottom) */
        @keyframes right-path-1 {
          0% { top: 64px; right: -40px; opacity: 1; }
          10% { top: 94px; right: 22px; opacity: 1; }
          20% { top: 124px; right: 84px; opacity: 1; }
          30% { top: 154px; right: 146px; opacity: 1; }
          40% { top: 184px; right: 178px; opacity: 1; }
          50% { top: 214px; right: 210px; opacity: 1; }
          60% { top: 244px; right: 242px; opacity: 1; }
          70% { top: 274px; right: 256px; opacity: 1; }
          80% { top: 304px; right: 256px; opacity: 1; }
          90% { top: 334px; right: 256px; opacity: 1; }
          100% { top: 360px; right: 256px; opacity: 0; }
        }

        @keyframes right-path-2 {
          0% { top: 120px; right: -40px; opacity: 1; }
          10% { top: 150px; right: 22px; opacity: 1; }
          20% { top: 180px; right: 84px; opacity: 1; }
          30% { top: 210px; right: 146px; opacity: 1; }
          40% { top: 240px; right: 178px; opacity: 1; }
          50% { top: 270px; right: 210px; opacity: 1; }
          60% { top: 300px; right: 242px; opacity: 1; }
          70% { top: 330px; right: 256px; opacity: 1; }
          80% { top: 360px; right: 256px; opacity: 1; }
          90% { top: 390px; right: 256px; opacity: 1; }
          100% { top: 416px; right: 256px; opacity: 0; }
        }

        @keyframes right-path-3 {
          0% { top: 180px; right: -40px; opacity: 1; }
          10% { top: 210px; right: 22px; opacity: 1; }
          20% { top: 240px; right: 84px; opacity: 1; }
          30% { top: 270px; right: 146px; opacity: 1; }
          40% { top: 300px; right: 178px; opacity: 1; }
          50% { top: 330px; right: 210px; opacity: 1; }
          60% { top: 360px; right: 242px; opacity: 1; }
          70% { top: 390px; right: 256px; opacity: 1; }
          80% { top: 420px; right: 256px; opacity: 1; }
          90% { top: 450px; right: 256px; opacity: 1; }
          100% { top: 476px; right: 256px; opacity: 0; }
        }

        @keyframes right-path-4 {
          0% { top: 240px; right: -40px; opacity: 1; }
          10% { top: 270px; right: 22px; opacity: 1; }
          20% { top: 300px; right: 84px; opacity: 1; }
          30% { top: 330px; right: 146px; opacity: 1; }
          40% { top: 360px; right: 178px; opacity: 1; }
          50% { top: 390px; right: 210px; opacity: 1; }
          60% { top: 420px; right: 242px; opacity: 1; }
          70% { top: 450px; right: 256px; opacity: 1; }
          80% { top: 480px; right: 256px; opacity: 1; }
          90% { top: 510px; right: 256px; opacity: 1; }
          100% { top: 536px; right: 256px; opacity: 0; }
        }

        .animate-steps {
          animation: steps 0.3s linear infinite;
        }

        .animate-figure {
          animation: figure 0.6s ease-in-out infinite;
        }

        .animate-leftArm {
          animation: leftArm 0.6s ease-in-out infinite;
        }

        .animate-rightArm {
          animation: rightArm 0.6s ease-in-out infinite;
        }

        .animate-leftLeg {
          animation: leftLeg 0.6s ease-in-out infinite;
        }

        .animate-rightLeg {
          animation: rightLeg 0.6s ease-in-out infinite;
        }

        /* Animation classes for paths */
        .top-path-1 {
          animation: top-path-1 20s linear;
        }

        .right-path-1 {
          animation: right-path-1 20s linear;
        }

        .top-path-2 {
          animation: top-path-2 20s linear;
        }

        .right-path-2 {
          animation: right-path-2 20s linear;
        }

        .top-path-3 {
          animation: top-path-3 20s linear;
        }

        .right-path-3 {
          animation: right-path-3 20s linear;
        }

        .top-path-4 {
          animation: top-path-4 20s linear;
        }

        .right-path-4 {
          animation: right-path-4 20s linear;
        }
      `}</style>
    </section>
  );
} 