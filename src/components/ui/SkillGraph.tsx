'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
  description?: string;
}

interface SkillGraphProps {
  skills: Skill[];
  updateCursorVariant: (variant: string) => void;
}

export default function SkillGraph({ skills, updateCursorVariant }: SkillGraphProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  const filteredSkills = activeCategory 
    ? skills.filter(skill => skill.category === activeCategory)
    : skills;

  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
    setActiveSkill(null);
  };

  return (
    <div className="space-y-8">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-mindaro text-vandyke'
                : 'bg-white hover:bg-mindaro/20 text-vandyke/70 hover:text-vandyke border border-hunyadi/10'
            }`}
            onClick={() => handleCategoryClick(category)}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onMouseEnter={() => updateCursorVariant('button')}
            onMouseLeave={() => updateCursorVariant('default')}
          >
            {category}
          </motion.button>
        ))}
        {activeCategory && (
          <motion.button
            className="px-4 py-2 rounded-full text-sm font-medium bg-white hover:bg-vandyke/10 text-vandyke/70 hover:text-vandyke border border-hunyadi/10"
            onClick={() => setActiveCategory(null)}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onMouseEnter={() => updateCursorVariant('button')}
            onMouseLeave={() => updateCursorVariant('default')}
          >
            Clear Filter
          </motion.button>
        )}
      </div>

      {/* Skills */}
      <div className="space-y-5">
        {filteredSkills.map((skill) => (
          <div 
            key={skill.name}
            className="space-y-2"
            onMouseEnter={() => setActiveSkill(skill)}
            onMouseLeave={() => setActiveSkill(null)}
          >
            <div className="flex justify-between items-center">
              <div 
                className="font-medium text-sm text-vandyke"
                onMouseEnter={() => updateCursorVariant('text')}
                onMouseLeave={() => updateCursorVariant('default')}
              >
                {skill.name}
              </div>
              <div className="text-xs text-copper">{skill.level}%</div>
            </div>
            <div className="relative h-2 bg-white rounded-full overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-mindaro to-hunyadi"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1, 
                  ease: 'easeOut',
                  delay: 0.2
                }}
              />
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-r from-arylide to-copper opacity-0 transition-opacity`}
                animate={{ 
                  opacity: activeSkill === skill ? 0.7 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
            {skill.description && activeSkill === skill && (
              <motion.div 
                className="text-xs text-copper mt-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {skill.description}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 