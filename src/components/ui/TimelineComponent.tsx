'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineEvent {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  tags?: string[];
  highlights?: string[];
}

interface TimelineComponentProps {
  events: TimelineEvent[];
  updateCursorVariant: (variant: string) => void;
}

export default function TimelineComponent({ events, updateCursorVariant }: TimelineComponentProps) {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const toggleEvent = (id: string) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-3.5 top-8 bottom-0 w-0.5 bg-gradient-to-b from-mindaro via-hunyadi to-copper"></div>

      <div className="space-y-8">
        {events.map((event, index) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative pl-14"
          >
            {/* Timeline dot */}
            <motion.div 
              className={`absolute left-0 top-2 w-7 h-7 rounded-full flex items-center justify-center border-2 ${
                expandedEvent === event.id 
                  ? 'bg-mindaro border-hunyadi' 
                  : 'bg-white border-arylide'
              }`}
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${
                expandedEvent === event.id ? 'bg-vandyke' : 'bg-copper'
              }`}></div>
            </motion.div>

            {/* Event content */}
            <div 
              className={`bg-white rounded-xl border transition-shadow duration-300 ${
                expandedEvent === event.id 
                  ? 'border-hunyadi shadow-soft-lg' 
                  : 'border-hunyadi/10 shadow-soft hover:shadow-soft-lg'
              }`}
              onClick={() => toggleEvent(event.id)}
              onMouseEnter={() => updateCursorVariant('button')}
              onMouseLeave={() => updateCursorVariant('default')}
            >
              <div className="p-6 cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <h3 className={`font-heading font-bold text-xl ${
                    expandedEvent === event.id ? 'text-copper' : 'text-vandyke'
                  }`}>
                    {event.title}
                  </h3>
                  <div className="bg-mindaro/20 text-vandyke px-3 py-1 rounded-full text-sm font-medium">
                    {event.period}
                  </div>
                </div>
                <p className="text-vandyke/70 mb-2">{event.organization}</p>
                
                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {event.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 bg-vandyke/5 text-vandyke/70 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Brief description for collapsed state */}
                {expandedEvent !== event.id && (
                  <p className="text-copper line-clamp-2">{event.description}</p>
                )}
                
                {/* Indicator icon */}
                <motion.div 
                  className="mt-2 flex justify-end"
                  animate={{ rotate: expandedEvent === event.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-5 h-5 text-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </div>
              
              {/* Expanded content */}
              <AnimatePresence>
                {expandedEvent === event.id && (
                  <motion.div 
                    className="px-6 pb-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="pt-4 border-t border-hunyadi/10">
                      <p className="text-copper mb-4">{event.description}</p>
                      
                      {/* Highlights */}
                      {event.highlights && event.highlights.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-vandyke">Key Achievements:</h4>
                          <ul className="space-y-1">
                            {event.highlights.map((highlight, i) => (
                              <motion.li 
                                key={i}
                                className="flex items-start gap-2 text-vandyke/80"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + (i * 0.1) }}
                              >
                                <span className="text-mindaro">•</span>
                                <span>{highlight}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 