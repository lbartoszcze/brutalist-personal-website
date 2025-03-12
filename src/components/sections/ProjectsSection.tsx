'use client';

import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import Button from '@/components/ui/Button';
import Section from '@/components/layout/Section';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

interface ProjectsSectionProps {
  updateCursorVariant: (variant: string) => void;
}

export default function ProjectsSection({ updateCursorVariant }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // We're using this ref for scroll-based animations but not directly using scrollYProgress
  useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const projects: Project[] = [
    {
      title: 'Portfolio Website',
      description: 'A stunning personal portfolio website built with Next.js and TailwindCSS, featuring smooth animations and responsive design.',
      image: '/images-section.webp',
      tags: ['Next.js', 'TailwindCSS', 'Framer Motion'],
      link: '#',
    },
    {
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform with product management, cart functionality, and checkout process.',
      image: '/videos-section.webp',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#',
    },
    {
      title: 'Task Management App',
      description: 'A productivity app for managing tasks and projects with features like drag-and-drop, labels, and due dates.',
      image: '/jobs-section.webp',
      tags: ['Vue.js', 'Firebase', 'Vuex'],
      link: '#',
    },
  ];

  return (
    <div ref={sectionRef}>
      <Section
        id="projects-section"
        background="white"
        className="py-24 overflow-hidden"
      >
        <div className="space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <motion.span
              className="inline-block px-4 py-1.5 bg-mindaro/20 text-vandyke rounded-full text-sm font-medium uppercase tracking-wider"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              Featured Projects
            </motion.span>

            <AnimatedHeading
              text="Innovation Through Research and Development"
              className="text-3xl md:text-4xl font-heading font-bold text-vandyke"
              delay={0.1}
              centered
            />

            <motion.p
              className="text-lg text-copper mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Highlighting select ventures and research projects that demonstrate my approach to solving complex problems through technology and innovative thinking.
            </motion.p>
          </div>

          <div className="space-y-32">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={project.title} className="relative">
                  {/* Background decorative elements */}
                  {isEven && (
                    <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 w-40 h-40 rounded-full bg-mindaro/10 blur-3xl -z-10" />
                  )}
                  {!isEven && (
                    <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 w-40 h-40 rounded-full bg-hunyadi/10 blur-3xl -z-10" />
                  )}

                  <motion.div 
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className={`space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="space-y-4">
                        <span className="text-xs font-medium text-copper bg-copper/10 px-3 py-1 rounded-full">
                          Project {index + 1}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-vandyke">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-copper">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-vandyke/5 text-vandyke text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-4">
                        <Button
                          href={project.link}
                          variant="outline"
                          size="md"
                          updateCursorVariant={updateCursorVariant}
                        >
                          View Project
                        </Button>
                      </div>
                    </div>

                    <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <motion.div
                        className="relative rounded-xl overflow-hidden aspect-video shadow-xl border border-hunyadi/10 group"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          onMouseEnter={() => updateCursorVariant('image')}
                          onMouseLeave={() => updateCursorVariant('default')}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-vandyke/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <h4 className="text-white text-xl font-bold">{project.title}</h4>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-8">
            <Button
              href="/projects"
              variant="primary"
              size="lg"
              updateCursorVariant={updateCursorVariant}
            >
              View All Projects
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
} 