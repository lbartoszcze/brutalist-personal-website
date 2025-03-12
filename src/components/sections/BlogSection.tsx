'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import Button from '@/components/ui/Button';
import Section from '@/components/layout/Section';
import { BlogPost } from '@/types/blog';

interface BlogSectionProps {
  blogPosts: BlogPost[];
  updateCursorVariant: (variant: string) => void;
}

export default function BlogSection({ blogPosts, updateCursorVariant }: BlogSectionProps) {
  const displayPosts = blogPosts.slice(0, 3); // Show only first 3 posts

  return (
    <Section
      id="blog-section"
      background="light"
      className="py-24"
    >
      <div className="space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="md:max-w-xl space-y-4">
            <motion.span
              className="inline-block px-4 py-1.5 bg-mindaro/20 text-vandyke rounded-full text-sm font-medium uppercase tracking-wider"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              From My Blog
            </motion.span>

            <AnimatedHeading
              text="Thoughts, Stories & Insights"
              className="text-3xl md:text-4xl font-heading font-bold text-vandyke"
              delay={0.1}
            />

            <motion.p
              className="text-lg text-copper mt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Sharing my knowledge and experiences in web development, design, and technology. 
              Dive into my articles to gain insights and learn something new.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              href="/words"
              variant="outline"
              size="md"
              updateCursorVariant={updateCursorVariant}
            >
              View All Articles
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.length > 0 ? (
            displayPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Link 
                  href={`/words/${post.slug}`}
                  className="group block"
                  onMouseEnter={() => updateCursorVariant('link')}
                  onMouseLeave={() => updateCursorVariant('default')}
                >
                  <article className="bg-white rounded-xl overflow-hidden shadow-soft border border-hunyadi/10 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="space-y-3 mb-4 flex-grow">
                        <h3 className="text-xl font-heading font-bold text-vandyke group-hover:text-copper transition-colors duration-300">
                          {post.title}
                        </h3>
                        <div className="h-1 w-16 bg-mindaro/40 rounded-full"></div>
                        <p className="text-copper/80 line-clamp-3">
                          {post.excerpt || "Read this thought-provoking piece that explores ideas and concepts in depth."}
                        </p>
                      </div>
                      
                      <div className="pt-4 flex justify-between items-center">
                        <span className="text-xs font-medium bg-vandyke/5 text-vandyke px-3 py-1 rounded-full">
                          Read Article
                        </span>
                        
                        <motion.span 
                          className="text-hunyadi"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full p-12 bg-white rounded-xl border border-hunyadi/10 text-center">
              <div className="text-lg text-copper">No posts available yet. Check back soon!</div>
              <Button
                href="/contact"
                variant="outline"
                size="md"
                className="mt-6"
                updateCursorVariant={updateCursorVariant}
              >
                Subscribe for Updates
              </Button>
            </div>
          )}
          
          {displayPosts.length > 0 && displayPosts.length < 3 && (
            Array.from({ length: 3 - displayPosts.length }).map((_, index) => (
              <motion.div
                key={`placeholder-${index}`}
                className="bg-white/50 rounded-xl border border-dashed border-hunyadi/20 flex items-center justify-center p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 + (displayPosts.length + index) * 0.1 }}
              >
                <div className="text-center">
                  <div className="text-5xl text-hunyadi/20 mb-4">✍️</div>
                  <p className="text-copper/60">Coming soon...</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </Section>
  );
} 