'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiPlus, FiMinus } from 'react-icons/fi';
import Image from 'next/image';

interface MapPosition {
  x: number;
  y: number;
  scale: number;
}

interface MapMarker {
  id: string;
  x: number;
  y: number;
  label: string;
  description?: string;
}

interface InteractiveMapProps {
  markers?: MapMarker[];
  imageSrc: string;
  className?: string;
  initialScale?: number;
  minScale?: number;
  maxScale?: number;
  onMarkerClick?: (marker: MapMarker) => void;
}

export default function InteractiveMap({
  markers = [],
  imageSrc,
  className = '',
  initialScale = 1,
  minScale = 0.8,
  maxScale = 2.5,
  onMarkerClick,
}: InteractiveMapProps) {
  const [mapPosition, setMapPosition] = useState<MapPosition>({
    x: 0,
    y: 0,
    scale: initialScale,
  });
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [loaded, setLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  
  // Reset map position when image changes
  useEffect(() => {
    setMapPosition({ x: 0, y: 0, scale: initialScale });
    setSelectedMarker(null);
  }, [imageSrc, initialScale]);
  
  // Handle zoom functions
  const handleZoomIn = () => {
    setMapPosition(prev => ({
      ...prev,
      scale: Math.min(prev.scale + 0.2, maxScale),
    }));
  };
  
  const handleZoomOut = () => {
    setMapPosition(prev => ({
      ...prev,
      scale: Math.max(prev.scale - 0.2, minScale),
    }));
  };
  
  // Handle marker click
  const handleMarkerClick = (marker: MapMarker) => {
    if (isDragging.current) return;
    
    setSelectedMarker(marker);
    
    if (onMarkerClick) {
      onMarkerClick(marker);
    }
  };
  
  // Reset map on double click
  const handleDoubleClick = () => {
    setMapPosition({ x: 0, y: 0, scale: initialScale });
  };
  
  return (
    <div className={`relative overflow-hidden rounded-lg shadow-md border border-gray-100 dark:border-gray-800 ${className}`}>
      {/* Map container with drag functionality */}
      <div 
        ref={mapContainerRef}
        className="relative w-full h-full overflow-hidden bg-gray-100 cursor-grab active:cursor-grabbing"
        style={{ aspectRatio: '16/9' }}
        onDoubleClick={handleDoubleClick}
      >
        <motion.div
          drag
          dragConstraints={mapContainerRef}
          dragElastic={0.1}
          dragMomentum={false}
          onDragStart={() => { isDragging.current = true; }}
          onDragEnd={() => { 
            setTimeout(() => { isDragging.current = false; }, 100);
          }}
          style={{
            x: mapPosition.x,
            y: mapPosition.y,
            scale: mapPosition.scale,
          }}
          className="relative origin-center touch-none"
        >
          {/* Map image */}
          <Image 
            src={imageSrc} 
            alt="Interactive map" 
            className={`max-w-none transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLoaded(true)}
            width={1000}
            height={562} // Assuming 16:9 aspect ratio
            unoptimized={true} // For external images or when exact dimensions are unknown
            draggable={false}
            style={{ width: '100%', height: 'auto' }}
          />
          
          {/* Map markers */}
          {markers.map((marker) => (
            <motion.button
              key={marker.id}
              className="absolute p-0 transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              style={{ 
                x: marker.x, 
                y: marker.y,
              }}
              onClick={() => handleMarkerClick(marker)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                y: marker.y - (selectedMarker?.id === marker.id ? 8 : 0) 
              }}
            >
              <div className="flex flex-col items-center">
                <FiMapPin 
                  className={`w-8 h-8 drop-shadow-lg ${
                    selectedMarker?.id === marker.id 
                      ? 'text-red-500 fill-red-500' 
                      : 'text-indigo-600 fill-indigo-600'
                  }`} 
                />
                <div className={`px-2 py-1 mt-1 text-xs font-medium text-white rounded-full whitespace-nowrap bg-black/70 backdrop-blur-sm transition-opacity ${
                  selectedMarker?.id === marker.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  {marker.label}
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button 
          onClick={handleZoomIn}
          className="p-2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 rounded-full shadow-md backdrop-blur-sm transition-colors"
          aria-label="Zoom in"
        >
          <FiPlus className="w-4 h-4" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="p-2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 rounded-full shadow-md backdrop-blur-sm transition-colors"
          aria-label="Zoom out"
        >
          <FiMinus className="w-4 h-4" />
        </button>
      </div>
      
      {/* Marker info popup */}
      <AnimatePresence>
        {selectedMarker?.description && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-4 bottom-4 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg max-w-xs"
          >
            <h3 className="font-medium text-sm mb-1">{selectedMarker.label}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {selectedMarker.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 