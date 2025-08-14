// src/components/Sidebar/FeaturedSection.js
import React, { useState, useEffect, useRef } from 'react';
import { fetchFeaturedPosts } from '../../api';
import './FeaturedSection.css';

const FeaturedSection = () => {
  const [activeDot, setActiveDot] = useState(0);
  const [featuredItems, setFeaturedItems] = useState([]);
  const startXRef = useRef(null);

  useEffect(() => {
    fetchFeaturedPosts()
      .then(setFeaturedItems)
      .catch((err) => console.error(err));
  }, []);

  const handleDotClick = (index) => {
    setActiveDot(index);
  };

  if (!featuredItems.length) {
    return null;
  }

  const activePost = featuredItems[activeDot];

  const handleMouseDown = (e) => {
    startXRef.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (startXRef.current === null) return;
    const diff = e.clientX - startXRef.current;
    const threshold = 50;
    if (diff > threshold) {
      setActiveDot((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
    } else if (diff < -threshold) {
      setActiveDot((prev) => (prev + 1) % featuredItems.length);
    }
    startXRef.current = null;
  };

  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (startXRef.current === null) return;
    const diff = e.changedTouches[0].clientX - startXRef.current;
    const threshold = 50;
    if (diff > threshold) {
      setActiveDot((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
    } else if (diff < -threshold) {
      setActiveDot((prev) => (prev + 1) % featuredItems.length);
    }
    startXRef.current = null;
  };

  const imageUrl =
    activePost.thumbnail_url ||
    activePost.hero_thumbnail ||
    activePost.itunes_image;

  return (
    <div className="featured-section">
      <div
        className="featured-slider"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="featured-card"
          style={
            imageUrl
              ? {
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${imageUrl})`
                }
              : undefined
          }
        >
          <div>
            <h3>{activePost.title}</h3>
          </div>
        </div>
      </div>
      <div className="featured-nav">
        {featuredItems.map((_, index) => (
          <span
            key={index}
            className={`featured-dot ${index === activeDot ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
