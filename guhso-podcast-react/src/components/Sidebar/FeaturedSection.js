// src/components/Sidebar/FeaturedSection.js
import React, { useState, useEffect } from 'react';
import { fetchFeaturedPosts } from '../../api';
import './FeaturedSection.css';

const FeaturedSection = () => {
  const [activeDot, setActiveDot] = useState(0);
  const [featuredItems, setFeaturedItems] = useState([]);

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

  return (
    <div className="featured-section">
      <div className="featured-slider">
        <div className="featured-card">
          <div>
            <h3>{activePost.title}</h3>
            <p>{activePost.body}</p>
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
