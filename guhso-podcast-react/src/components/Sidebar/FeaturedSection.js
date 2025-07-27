// src/components/Sidebar/FeaturedSection.js
import React, { useState } from 'react';
import './FeaturedSection.css';

const FeaturedSection = () => {
  const [activeDot, setActiveDot] = useState(0);
  
  const featuredItems = [
    {
      id: 1,
      title: "Featured Show",
      name: "Tech Talks Daily",
      description: "Your daily dose of tech news and insights"
    },
    {
      id: 2,
      title: "Trending",
      name: "Design Weekly",
      description: "Latest trends in UI/UX design"
    },
    {
      id: 3,
      title: "Popular",
      name: "Business Insights",
      description: "Entrepreneurship and startup stories"
    }
  ];

  const handleDotClick = (index) => {
    setActiveDot(index);
  };

  return (
    <div className="featured-section">
      <div className="featured-slider">
        <div className="featured-card">
          <div>
            <h3>{featuredItems[activeDot].title}</h3>
            <h2>{featuredItems[activeDot].name}</h2>
            <p>{featuredItems[activeDot].description}</p>
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
