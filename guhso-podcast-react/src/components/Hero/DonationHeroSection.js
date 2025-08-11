// src/components/Hero/DonationHeroSection.js
import React, { useState, useEffect } from 'react';
import './DonationHeroSection.css';

const DonationHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`donation-hero-section ${isVisible ? 'visible' : ''}`}>
      <div className="donation-hero-background">
        <div className="floating-elements">
          <div className="floating-element element-1">
            <i className="fas fa-heart"></i>
          </div>
          <div className="floating-element element-2">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="floating-element element-3">
            <i className="fas fa-handshake"></i>
          </div>
          <div className="floating-element element-4">
            <i className="fas fa-star"></i>
          </div>
        </div>
      </div>
      
      <div className="donation-hero-content">
        <div className="donation-hero-text">
          <h1 className="donation-hero-title">Support Guhso</h1>
          <p className="donation-hero-subtitle">Become a sponsor or make a donation</p>
          <div className="donation-hero-description">
            <p>
              Help us keep bringing authentic Jamaican conversations and real talk to the world. 
              Your support fuels our independence and authentic voice.
            </p>
          </div>
          <div className="donation-hero-badges">
            <div className="badge">
              <i className="fas fa-microphone"></i>
              <span>Weekly Episodes</span>
            </div>
            <div className="badge">
              <i className="fas fa-users"></i>
              <span>Growing Community</span>
            </div>
            <div className="badge">
              <i className="fas fa-globe"></i>
              <span>Worldwide Reach</span>
            </div>
          </div>
        </div>
        
        <div className="donation-hero-visual">
          <div className="main-icon">
            <div className="icon-ring ring-1"></div>
            <div className="icon-ring ring-2"></div>
            <div className="icon-ring ring-3"></div>
            <div className="center-icon">
              <i className="fas fa-heart"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-arrow">
          <i className="fas fa-chevron-down"></i>
        </div>
        <span>Explore Support Options</span>
      </div>
    </div>
  );
};

export default DonationHeroSection;