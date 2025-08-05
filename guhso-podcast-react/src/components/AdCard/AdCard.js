// AdCard component - Placeholder for advertisements
import React, { useState } from 'react';
import './AdCard.css';

const AdCard = ({ 
  type = 'banner', // banner, sponsored, newsletter
  title = 'Advertisement',
  showCloseButton = true 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
  };

  // Different ad types
  const adContent = {
    banner: {
      title: 'Support GUHSO',
      subtitle: 'Become a Sponsor',
      description: 'Reach our engaged audience of tech enthusiasts and business professionals.',
      cta: 'Learn More',
      icon: 'fas fa-bullhorn',
      background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))'
    },
    sponsored: {
      title: 'Featured Sponsor',
      subtitle: 'Your Brand Here',
      description: 'Partner with GUHSO to showcase your products and services to our community.',
      cta: 'Get Started',
      icon: 'fas fa-star',
      background: 'linear-gradient(135deg, #667eea, #764ba2)'
    },
    newsletter: {
      title: 'GUHSO Newsletter',
      subtitle: 'Stay Updated',
      description: 'Get the latest episodes, behind-the-scenes content, and exclusive interviews.',
      cta: 'Subscribe',
      icon: 'fas fa-envelope',
      background: 'linear-gradient(135deg, #f093fb, #f5576c)'
    }
  };

  const currentAd = adContent[type] || adContent.banner;

  return (
    <div 
      className={`ad-card ${type} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showCloseButton && (
        <button 
          className="ad-close-btn"
          onClick={handleClose}
          aria-label="Close advertisement"
          title="Close advertisement"
        >
          <i className="fas fa-times"></i>
        </button>
      )}

      <div className="ad-content">
        <div className="ad-header">
          <div className="ad-icon">
            <i className={currentAd.icon}></i>
          </div>
          <div className="ad-label">
            <span>{title}</span>
          </div>
        </div>

        <div className="ad-body">
          <h3 className="ad-title">{currentAd.title}</h3>
          <h4 className="ad-subtitle">{currentAd.subtitle}</h4>
          <p className="ad-description">{currentAd.description}</p>
        </div>

        <div className="ad-footer">
          <button 
            className="ad-cta-btn"
            onClick={() => {
              // Handle CTA click - could open modal, navigate, etc.
              console.log(`${type} ad CTA clicked`);
            }}
          >
            {currentAd.cta}
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <div 
        className="ad-background"
        style={{ background: currentAd.background }}
      ></div>

      {/* Animated elements */}
      <div className="ad-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </div>
  );
};

// Different ad variants for easy use
export const SponsorAdCard = (props) => (
  <AdCard type="sponsored" title="Sponsored" {...props} />
);

export const NewsletterAdCard = (props) => (
  <AdCard type="newsletter" title="Newsletter" {...props} />
);

export const BannerAdCard = (props) => (
  <AdCard type="banner" title="Advertisement" {...props} />
);

export default AdCard;