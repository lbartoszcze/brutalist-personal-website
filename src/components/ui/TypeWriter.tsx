'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TypeWriterProps {
  text: string | string[];
  speed?: number;
  delay?: number;
  loop?: boolean;
  className?: string;
  cursor?: boolean;
  onComplete?: () => void;
}

export default function TypeWriter({
  text,
  speed = 50,
  delay = 1500,
  loop = false,
  className = '',
  cursor = true,
  onComplete,
}: TypeWriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clear any existing timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // Handle typing animation
  useEffect(() => {
    // Convert single string to array for consistent handling
    const textArray = Array.isArray(text) ? text : [text];
    const currentFullText = textArray[currentTextIndex];
    
    // If currently typing (adding characters)
    if (isTyping) {
      if (displayText.length < currentFullText.length) {
        // Type the next character
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentFullText.substring(0, displayText.length + 1));
        }, speed);
      } else {
        // Finished typing current text, wait before erasing
        setIsTyping(false);
        timeoutRef.current = setTimeout(() => {
          // If not looping and on last text, stay displayed
          if (!loop && currentTextIndex === textArray.length - 1) {
            setIsDone(true);
            if (onComplete) onComplete();
            return;
          }
          
          // Otherwise start erasing after delay
          setIsTyping(false);
        }, delay);
      }
    } 
    // If erasing (removing characters)
    else {
      if (displayText.length > 0) {
        // Erase one character
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, speed / 2); // Erasing is faster than typing
      } else {
        // Finished erasing, move to next text
        setIsTyping(true);
        setCurrentTextIndex((currentTextIndex + 1) % textArray.length);
      }
    }
  }, [displayText, isTyping, currentTextIndex, text, speed, delay, loop, onComplete]);
  
  return (
    <span className={className}>
      {displayText}
      {cursor && !isDone && (
        <span className="inline-block w-[1px] h-[1em] bg-current ml-[1px] animate-blink-fast" />
      )}
    </span>
  );
} 