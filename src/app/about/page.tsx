import React from 'react';
import Skills from '@/components/Skills';
import Career from '@/components/Career';
import Personal from '@/components/Personal';

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16 mt-12">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      
      <div className="flex flex-col space-y-8">
        {/* Career Section */}
        <Career />
        
        {/* Personal Section */}
        <Personal />
        
        {/* Beliefs Section */}
        <section id="beliefs" className="brutalist-box p-6 w-full">
          <h2 className="text-2xl font-bold mb-4">Beliefs</h2>
          <div className="space-y-4">
            <p>
              My life philosophy is rooted in Nietzschan approach to life and the works of Milan 
              Kundera and Albert Camus. Instead of finding a higher purpose and controlling the 
              world around me, I accept its absurdity. I try to maximise the impact of my work, 
              thus accepting the human condition as imperfect in understanding the meaning and 
              purpose of events unfolding around me.
            </p>
            <p>
              I value strong opinions and people who genuinely care. I am honest, hardworking and 
              outspoken. I work best with people who can independently take ownership and show initiative.
            </p>
          </div>
        </section>
        
        {/* Skills Section */}
        <Skills />
      </div>
    </main>
  );
} 