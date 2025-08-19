// src/components/Sidebar/FeaturedSection.js
import React, { useState, useEffect, useRef } from "react";
import { fetchFeaturedPosts } from "../../api";
import "./FeaturedSection.css";

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

  const nextSlide = () => {
    setActiveDot((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setActiveDot(
      (prev) => (prev - 1 + featuredItems.length) % featuredItems.length
    );
  };

  useEffect(() => {
    if (!featuredItems.length) return;
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % featuredItems.length);
    }, 25000);
    return () => clearInterval(interval);
  }, [featuredItems.length]);

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
      setActiveDot(
        (prev) => (prev - 1 + featuredItems.length) % featuredItems.length
      );
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
      prevSlide();
    } else if (diff < -threshold) {
      nextSlide();
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
        <button
          className="featured-arrow left"
          onClick={prevSlide}
          onMouseDown={(e) => e.stopPropagation()}
        >
          &#8249;
        </button>
        <div
          className="featured-card"
          style={
            imageUrl
              ? {
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${imageUrl})`,
                }
              : undefined
          }
        >
          <div>
            <h3>{activePost.title}</h3>
          </div>
        </div>
        <button
          className="featured-arrow right"
          onClick={nextSlide}
          onMouseDown={(e) => e.stopPropagation()}
        >
          &#8250;
        </button>
      </div>
      <div className="featured-nav">
        {featuredItems.map((_, index) => (
          <span
            key={index}
            className={`featured-dot ${index === activeDot ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
