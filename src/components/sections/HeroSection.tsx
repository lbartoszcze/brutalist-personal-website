'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import Button from '@/components/ui/Button';
import ScrollPrompt from '@/components/ui/ScrollPrompt';

interface HeroSectionProps {
  updateCursorVariant: (variant: string) => void;
}

export default function HeroSection({ updateCursorVariant }: HeroSectionProps) {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-mindaro/5 to-white z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-mindaro/20 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-t from-arylide/10 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
      
      {/* Content */}
      <div className="container-xl flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-6 pt-20 z-10">
        <motion.div 
          className="lg:w-1/2 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-4">
            <motion.span 
              className="inline-block px-4 py-1.5 bg-mindaro/20 text-vandyke rounded-full text-sm font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Developer, Writer, Creator
            </motion.span>
            
            <AnimatedHeading 
              text="Building digital experiences since 1997" 
              as="h1"
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-vandyke"
              delay={0.1}
              splitBy="word"
            />
            
            <motion.p 
              className="text-xl text-copper max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              I bring ideas to life through code, words, and creativity. From web applications to thought-provoking content, I craft digital experiences that engage and inspire.
            </motion.p>
          </div>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              href="/contact" 
              variant="primary" 
              size="lg"
              updateCursorVariant={updateCursorVariant}
            >
              Get in Touch
            </Button>
            
            <Button 
              href="/about" 
              variant="outline" 
              size="lg"
              updateCursorVariant={updateCursorVariant}
            >
              Learn More
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-6 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              { platform: 'GitHub', url: 'https://github.com/username' },
              { platform: 'Twitter', url: 'https://twitter.com/username' },
              { platform: 'LinkedIn', url: 'https://linkedin.com/in/username' }
            ].map((social) => (
              <a 
                key={social.platform} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-vandyke/60 hover:text-vandyke transition-colors duration-300"
                onMouseEnter={() => updateCursorVariant('link')}
                onMouseLeave={() => updateCursorVariant('default')}
                aria-label={social.platform}
              >
                {social.platform}
              </a>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="lg:w-1/2 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-mindaro via-arylide to-hunyadi rounded-2xl blur opacity-50 group-hover:opacity-70 transition duration-1000"></div>
            <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl">
              <Image 
                src="/husarz.jpg"
                alt="Łukasz Bartoszcze"
                fill
                className="object-cover"
                priority
                onMouseEnter={() => updateCursorVariant('image')}
                onMouseLeave={() => updateCursorVariant('default')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vandyke/70 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg border border-hunyadi/20 flex items-center gap-3"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
            >
              <div className="bg-mindaro/30 w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-vandyke font-semibold">1997</span>
              </div>
              <p className="text-vandyke text-sm font-medium">
                Going at it since <span className="font-semibold">1997</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <ScrollPrompt targetId="about-section" className="z-10" />
    </section>
  );
} 