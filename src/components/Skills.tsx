'use client';

import React, { useState } from 'react';

// Define skill categories and their skills
const skillsData = {
  advanced: {
    technical: [
      { name: 'TypeScript', description: 'My daily weapon of choice. Used it to build ControlAI, Wisent and this website. Absolutely amazed by how it works with Cursor.' },
      { name: 'Swift', description: 'My newest passion. Used it to write Turbot and several hackathon apps.' },
      { name: 'Python', description: 'First programming language I have learned. Most of my backends and prototypes are still built in Python.' },
      { name: 'AWS', description: 'From S3 to running EC2 instances, I am usually choosing AWS for hosting my projects. Feels like I have tried every functionality available there.' },
      { name: 'Git & GitHub', description: 'Have saved my life so many times. Essential to master to not suddenly find yourself with hours of work being overwritten by Claude.' },
      { name: 'Vercel', description: 'The go-to place I host my frontends. Reliable, fast, magnetic design. Highly recommended.' },
      { name: 'Docker', description: 'Always there for production-ready tasks. A bit of a pain to run locally on my Mac though as MPS support is not there yet.' }
    ],
    softSkills: [
      { name: 'Public Speaking', description: 'I have been pitching nearly every day for the last two years. In high school, I used to be really into British Parliamentary Debating. I won Polish Championship at the age of 18 and represented my country at World and European Championships. Basically, it is a really deep strategical impromptu debating game that teaches you how to dynamically respond and talk fast.' },
      { name: 'Academic Research', description: 'I got full scholarship to Columbia and Warwick. I spent years doing academic research on all sorts of topics.' },
      { name: '0 to 1', description: 'Experience in taking ideas from conception to successful implementation, having founded and exited companies.' },
      { name: 'Project Management', description: 'Extensive experience managing complex technical projects and teams across multiple organizations.' },
      { name: 'Social Media', description: 'Strategic understanding of digital platforms and content creation for business growth and personal branding.' },
      { name: 'Critical Thinking', description: 'Strong analytical and problem-solving abilities developed through academic research and business leadership.' },
      { name: 'Writing', description: 'Proficient in technical documentation, business communications, and AI research papers.' },
      { name: 'Machine Learning', description: 'Deep understanding of ML principles and applications in real-world scenarios.' },
      { name: 'Representation Engineering', description: 'Expertise in developing and implementing representation systems for AI and data structures.' },
      { name: 'Game Theory', description: 'Strong foundation in strategic decision-making and mathematical modeling of competitive scenarios.' },
      { name: 'Real Analysis', description: 'Advanced mathematical understanding of continuous functions and limit theories.' },
      { name: 'Linear Algebra', description: 'Mastery of vector spaces, matrices, and their applications in computer science.' },
      { name: 'English', description: 'Native-level proficiency in business and technical communication.' },
      { name: 'Polish', description: 'Native language with full professional and academic proficiency.' }
    ]
  },
  learning: {
    technical: [
      { name: 'Unix', description: 'Expanding knowledge of system administration and shell scripting for better development workflow.' },
      { name: 'C++', description: 'Learning for performance-critical applications and systems programming.' },
      { name: 'Flutter', description: 'Exploring cross-platform mobile development for future projects.' },
      { name: 'Blender', description: 'Developing 3D modeling skills for creative projects and prototypes.' },
      { name: 'Adobe Illustrator', description: 'Learning vector graphics design for creating professional assets and branding materials.' }
    ],
    softSkills: [
      { name: 'Hiring', description: 'Developing strategies for building and scaling high-performance teams.' },
      { name: 'Career Development', description: 'Learning to better mentor and guide professional growth in others.' },
      { name: 'Mentoring', description: 'Building skills to effectively guide and develop junior professionals.' },
      { name: 'German', description: 'Building conversational and business language skills.' },
      { name: 'Italian', description: 'Learning basics for personal enrichment and European business contexts.' }
    ]
  }
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState<'advanced' | 'learning'>('advanced');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <section id="skills" className="w-full">
      <h2 className="text-2xl font-bold mb-8">SKILLS</h2>
      
      <div className="relative">
        {/* Top tabs that look like physical file tabs */}
        <div className="flex">
          <div 
            className={`relative z-10 cursor-pointer`}
            onClick={() => setActiveTab('advanced')}
            onMouseEnter={() => setHoveredTab('advanced')}
            onMouseLeave={() => setHoveredTab(null)}
          >
            <div 
              className={`
                ${activeTab === 'advanced' 
                  ? 'border-t-2 border-l-2 border-r-2 border-black bg-white rounded-t-lg' 
                  : 'border-2 border-black bg-white text-black rounded-t-lg'
                }
                px-8 py-2 ml-4
              `}
              style={{
                backgroundColor: activeTab === 'advanced' 
                  ? 'white' 
                  : hoveredTab === 'advanced' ? '#ef4444' : 'white',
                color: activeTab === 'advanced' 
                  ? 'black' 
                  : hoveredTab === 'advanced' ? 'white' : 'black',
                transition: 'background-color 0.2s, color 0.2s',
                position: 'relative',
                bottom: activeTab === 'advanced' ? '-2px' : '0',
                zIndex: activeTab === 'advanced' ? 1 : 0
              }}
            >
              Advanced
            </div>
          </div>
          
          <div 
            className={`relative z-10 cursor-pointer`}
            onClick={() => setActiveTab('learning')}
            onMouseEnter={() => setHoveredTab('learning')}
            onMouseLeave={() => setHoveredTab(null)}
          >
            <div 
              className={`
                ${activeTab === 'learning' 
                  ? 'border-t-2 border-l-2 border-r-2 border-black bg-white rounded-t-lg' 
                  : 'border-2 border-black bg-white text-black rounded-t-lg'
                }
                px-8 py-2 ml-4
              `}
              style={{
                backgroundColor: activeTab === 'learning' 
                  ? 'white' 
                  : hoveredTab === 'learning' ? '#ef4444' : 'white',
                color: activeTab === 'learning' 
                  ? 'black' 
                  : hoveredTab === 'learning' ? 'white' : 'black',
                transition: 'background-color 0.2s, color 0.2s',
                position: 'relative',
                bottom: activeTab === 'learning' ? '-2px' : '0',
                zIndex: activeTab === 'learning' ? 1 : 0
              }}
            >
              Learning
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="border-2 border-black p-6 bg-white relative" style={{ marginTop: '-2px', zIndex: 0 }}>
          {/* Two-column layout for Technical and Soft Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Technical Skills Column */}
            <div>
              <h3 className="uppercase text-sm tracking-wider font-bold border-b-2 border-black pb-2 mb-6">
                Technical
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillsData[activeTab].technical.map((skill) => (
                  <div 
                    key={skill.name}
                    className="relative"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="border-2 border-black py-2 px-3 hover:bg-red-500 hover:text-white transition-colors cursor-pointer">
                      {skill.name}
                    </div>
                    
                    {/* Hover Description */}
                    {hoveredSkill === skill.name && (
                      <div className="absolute z-20 mt-1 p-4 bg-white border-2 border-black shadow-lg w-64 text-sm">
                        {skill.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills Column */}
            <div>
              <h3 className="uppercase text-sm tracking-wider font-bold border-b-2 border-black pb-2 mb-6">
                Soft Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillsData[activeTab].softSkills.map((skill) => (
                  <div 
                    key={skill.name}
                    className="relative"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="border-2 border-black py-2 px-3 hover:bg-red-500 hover:text-white transition-colors cursor-pointer">
                      {skill.name}
                    </div>
                    
                    {/* Hover Description */}
                    {hoveredSkill === skill.name && (
                      <div className="absolute z-20 mt-1 p-4 bg-white border-2 border-black shadow-lg w-64 text-sm">
                        {skill.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 