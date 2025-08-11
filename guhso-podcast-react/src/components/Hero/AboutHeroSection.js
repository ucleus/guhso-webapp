// src/components/Hero/AboutHeroSection.js
import React, { useState, useEffect } from 'react';
import './AboutHeroSection.css';

const AboutHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`about-hero-section ${isVisible ? 'visible' : ''}`}>
      <div className="about-hero-background">
        <div className="floating-elements">
          <div className="floating-element element-1">
            <i className="fas fa-microphone"></i>
          </div>
          <div className="floating-element element-2">
            <i className="fas fa-music"></i>
          </div>
          <div className="floating-element element-3">
            <i className="fas fa-headphones"></i>
          </div>
          <div className="floating-element element-4">
            <i className="fas fa-radio"></i>
          </div>
        </div>
      </div>
      
      <div className="about-hero-content">
        <div className="about-hero-text">
          <h1 className="about-hero-title">What Is Guhso?</h1>
          <p className="about-hero-subtitle">Yadie A Fareign, Bare Vibez</p>
          <div className="about-hero-description">
            <p>
              Welcome to <strong>Guhso</strong> — where energy meets authenticity, 
              Jamaican flair runs wild, and real conversation doesn't ask permission.
            </p>
          </div>
          <div className="about-hero-badges">
            <div className="badge">
              <i className="fas fa-calendar-alt"></i>
              <span>Since 2020</span>
            </div>
            <div className="badge">
              <i className="fas fa-globe-americas"></i>
              <span>Jamaican Vibes</span>
            </div>
            <div className="badge">
              <i className="fas fa-heart"></i>
              <span>Authentic Stories</span>
            </div>
          </div>
        </div>
        
        <div className="about-hero-visual">
          <div className="main-icon">
            <div className="icon-ring ring-1"></div>
            <div className="icon-ring ring-2"></div>
            <div className="icon-ring ring-3"></div>
            <div className="center-icon">
              <i className="fas fa-microphone-alt"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-arrow">
          <i className="fas fa-chevron-down"></i>
        </div>
        <span>Discover Our Story</span>
      </div>
    </div>
  );
};

export default AboutHeroSection;