// LazyImage component for optimized thumbnail loading
import React, { useState, useRef, useEffect } from 'react';
import { getThumbnailWithFallback } from '../../utils/thumbnails';
import './LazyImage.css';

const LazyImage = ({ 
  episode, 
  size = 'medium', 
  alt, 
  className = '', 
  showPlaceholder = true,
  onLoad,
  onError,
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before image comes into view
        threshold: 0.1
      }
    );

    observer.observe(img);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const thumbnailProps = getThumbnailWithFallback(episode, size);
  
  const handleLoad = (e) => {
    setLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setError(true);
    thumbnailProps.onError(e); // Use the fallback logic
    if (onError) onError(e);
  };

  const getAltText = () => {
    if (alt) return alt;
    if (episode?.title) return `${episode.title} thumbnail`;
    return 'Episode thumbnail';
  };

  return (
    <div 
      ref={imgRef}
      className={`lazy-image-container ${className} ${loaded ? 'loaded' : ''} ${error ? 'error' : ''}`}
      {...props}
    >
      {/* Loading placeholder */}
      {showPlaceholder && !loaded && !error && (
        <div className="image-placeholder">
          <div className="placeholder-shimmer">
            <div className="placeholder-icon">
              <i className="fas fa-image"></i>
            </div>
          </div>
        </div>
      )}

      {/* Actual image - only load when in view */}
      {inView && (
        <img
          src={thumbnailProps.src}
          alt={getAltText()}
          loading={thumbnailProps.loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`lazy-image ${loaded ? 'fade-in' : ''}`}
          style={{
            opacity: loaded ? 1 : 0,
            transition: loaded ? 'opacity 0.3s ease' : 'none'
          }}
        />
      )}

      {/* Error state */}
      {error && (
        <div className="image-error">
          <i className="fas fa-exclamation-triangle"></i>
          <span>Image unavailable</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;