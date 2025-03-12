'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import Section from '@/components/layout/Section';

interface SkillCategory {
  name: string;
  skills: string[];
}

interface AboutSectionProps {
  updateCursorVariant: (variant: string) => void;
}

export default function AboutSection({ updateCursorVariant }: AboutSectionProps) {
  const skillCategories: SkillCategory[] = [
    {
      name: 'Development',
      skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'TailwindCSS', 'GraphQL'],
    },
    {
      name: 'Design',
      skills: ['UI/UX', 'Figma', 'Design Systems', 'Motion Design', 'Prototyping'],
    },
    {
      name: 'Content',
      skills: ['Technical Writing', 'Blogging', 'SEO', 'Content Strategy'],
    },
  ];

  const personalTraits = ['Creative', 'Analytical', 'Detail-oriented', 'Problem-solver'];

  return (
    <Section
      id="about-section"
      background="light"
      className="py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <motion.span
              className="inline-block px-4 py-1.5 bg-mindaro/20 text-vandyke rounded-full text-sm font-medium uppercase tracking-wider"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              About Me
            </motion.span>

            <AnimatedHeading
              text="Entrepreneur, Researcher & Programmer"
              className="text-3xl md:text-4xl font-heading font-bold text-vandyke"
              delay={0.1}
            />
          </div>

          <motion.div
            className="space-y-4 text-copper"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p>
              I&apos;m an entrepreneur, researcher, and programmer sharing my thoughts and experiences in technology and innovation. My work spans across developing new solutions, exploring emerging technologies, and building products that solve real-world problems.
            </p>
            <p>
              My journey began in 1997 when I wrote my first line of code. Since then, I&apos;ve founded multiple ventures, conducted research in cutting-edge fields, and developed software that pushes boundaries.
            </p>
            <p>
              This platform showcases my thoughts, projects, and insights gained through years of entrepreneurial exploration and technical innovation.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-2 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {personalTraits.map((trait, index) => (
              <span
                key={trait}
                className="inline-block px-4 py-2 bg-white border border-hunyadi/20 rounded-full text-sm text-vandyke font-medium shadow-sm"
                onMouseEnter={() => updateCursorVariant('text')}
                onMouseLeave={() => updateCursorVariant('default')}
              >
                {trait}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="space-y-8">
          <AnimatedHeading
            text="Skills & Expertise"
            as="h3"
            className="text-2xl font-heading font-semibold text-vandyke"
            delay={0.2}
          />

          <div className="space-y-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 + categoryIndex * 0.1 }}
              >
                <h4 className="text-lg font-display font-semibold text-copper">
                  {category.name}
                </h4>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className="inline-block px-3 py-1.5 bg-white border border-hunyadi/10 rounded-lg text-sm text-vandyke"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: 0.3 + skillIndex * 0.05 }}
                      onMouseEnter={() => updateCursorVariant('text')}
                      onMouseLeave={() => updateCursorVariant('default')}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-mindaro to-hunyadi"
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1, delay: 0.5 + categoryIndex * 0.2, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="p-6 bg-white rounded-xl border border-hunyadi/10 shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-start gap-4">
              <div className="bg-mindaro/30 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-vandyke" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h4 className="text-vandyke font-semibold">Always Learning</h4>
                <p className="text-copper">Constantly exploring new technologies and methodologies to expand my skill set and deliver the best solutions.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
} 