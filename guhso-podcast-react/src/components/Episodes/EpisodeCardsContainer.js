// src/components/Episodes/EpisodeCardsContainer.js
import React, { useRef, useState } from 'react';
import EpisodeCard from './EpisodeCard';
import './EpisodeCardsContainer.css';

const EpisodeCardsContainer = ({ episodes }) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div 
      className="episode-cards-container"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="episode-cards">
        {episodes.map((episode) => (
          <EpisodeCard 
            key={episode.id} 
            episode={episode}
          />
        ))}
      </div>
    </div>
  );
};

export default EpisodeCardsContainer;