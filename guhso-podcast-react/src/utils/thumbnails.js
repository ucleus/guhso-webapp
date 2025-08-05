// Thumbnail management utility for guhso.com
import { getEpisodePlaceholder, getPlaceholderBySize } from './placeholders';

const THUMBNAIL_BASE_PATH = '/images/thumbnails/';
const DEFAULT_THUMBNAIL = '/images/thumbnails/default.jpg';
const HERO_THUMBNAIL = '/images/thumbnails/hero-featured.jpg';

// Supported image formats (in order of preference)
const SUPPORTED_FORMATS = ['webp', 'jpg', 'jpeg', 'png'];

/**
 * Get optimized thumbnail URL for an episode
 * @param {Object} episode - Episode object
 * @param {string} size - Size variant (small, medium, large)
 * @returns {string} Thumbnail URL
 */
export const getThumbnailUrl = (episode, size = 'medium') => {
  if (!episode) return DEFAULT_THUMBNAIL;
  
  // If episode already has a full thumbnail URL, use it
  if (episode.thumbnail && episode.thumbnail.startsWith('http')) {
    return episode.thumbnail;
  }
  
  // If episode has a custom thumbnail path, use it
  if (episode.thumbnail) {
    return `${THUMBNAIL_BASE_PATH}${episode.thumbnail}`;
  }
  
  // Generate thumbnail filename from episode ID or slug
  const identifier = episode.slug || episode.id || 'default';
  const sizePrefix = getSizePrefix(size);
  
  return `${THUMBNAIL_BASE_PATH}${identifier}${sizePrefix}.jpg`;
};

/**
 * Get thumbnail with fallback handling
 * @param {Object} episode - Episode object
 * @param {string} size - Size variant
 * @returns {Object} Props for img element with error handling
 */
export const getThumbnailWithFallback = (episode, size = 'medium') => {
  const thumbnailUrl = getThumbnailUrl(episode, size);
  
  return {
    src: thumbnailUrl,
    onError: (e) => {
      // First fallback: try default size if size-specific failed
      if (e.target.src.includes('-small') || e.target.src.includes('-large')) {
        e.target.src = getThumbnailUrl(episode, 'medium');
      }
      // Second fallback: default thumbnail
      else if (e.target.src !== DEFAULT_THUMBNAIL) {
        e.target.src = DEFAULT_THUMBNAIL;
      }
      // Final fallback: generated placeholder
      else {
        e.target.src = getEpisodePlaceholder(episode, size);
      }
    },
    loading: 'lazy'
  };
};

/**
 * Get hero section thumbnail
 * @param {Object} episode - Featured episode object
 * @returns {string} Hero thumbnail URL
 */
export const getHeroThumbnail = (episode) => {
  if (!episode) return HERO_THUMBNAIL;
  
  // Check for hero-specific thumbnail
  if (episode.heroThumbnail) {
    return `${THUMBNAIL_BASE_PATH}${episode.heroThumbnail}`;
  }
  
  // Fallback to large episode thumbnail
  return getThumbnailUrl(episode, 'large');
};

/**
 * Get size prefix for thumbnail variants
 * @param {string} size - Size variant
 * @returns {string} Size prefix
 */
const getSizePrefix = (size) => {
  switch (size) {
    case 'small':
      return '-small'; // 200x150
    case 'large':
      return '-large'; // 800x600
    case 'medium':
    default:
      return ''; // 400x300 (default)
  }
};

/**
 * Generate thumbnail filename from episode data
 * @param {Object} episode - Episode object
 * @param {string} size - Size variant
 * @returns {string} Thumbnail filename
 */
export const generateThumbnailFilename = (episode, size = 'medium') => {
  if (!episode) return 'default.jpg';
  
  const identifier = episode.slug || episode.id || 'episode';
  const sizePrefix = getSizePrefix(size);
  
  return `${identifier}${sizePrefix}.jpg`;
};

/**
 * Get all thumbnail variants for an episode
 * @param {Object} episode - Episode object
 * @returns {Object} All thumbnail URLs
 */
export const getAllThumbnailSizes = (episode) => {
  return {
    small: getThumbnailUrl(episode, 'small'),
    medium: getThumbnailUrl(episode, 'medium'),
    large: getThumbnailUrl(episode, 'large')
  };
};

/**
 * Preload thumbnail image
 * @param {string} thumbnailUrl - Thumbnail URL to preload
 * @returns {Promise} Promise that resolves when image is loaded
 */
export const preloadThumbnail = (thumbnailUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = thumbnailUrl;
  });
};

/**
 * Check if thumbnail exists (for development/debugging)
 * @param {string} thumbnailUrl - Thumbnail URL to check
 * @returns {Promise<boolean>} Promise that resolves to true if image exists
 */
export const checkThumbnailExists = async (thumbnailUrl) => {
  try {
    const response = await fetch(thumbnailUrl, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};

/**
 * Generate responsive image srcSet for different screen densities
 * @param {Object} episode - Episode object
 * @param {string} baseSize - Base size variant
 * @returns {string} srcSet string for responsive images
 */
export const generateResponsiveSrcSet = (episode, baseSize = 'medium') => {
  const baseThumbnail = getThumbnailUrl(episode, baseSize);
  const largeThumbnail = getThumbnailUrl(episode, 'large');
  
  return `${baseThumbnail} 1x, ${largeThumbnail} 2x`;
};

/**
 * Get thumbnail dimensions based on size
 * @param {string} size - Size variant
 * @returns {Object} Width and height dimensions
 */
export const getThumbnailDimensions = (size = 'medium') => {
  switch (size) {
    case 'small':
      return { width: 200, height: 150 };
    case 'large':
      return { width: 800, height: 600 };
    case 'medium':
    default:
      return { width: 400, height: 300 };
  }
};

// Export constants for use in other components
export const THUMBNAIL_CONSTANTS = {
  BASE_PATH: THUMBNAIL_BASE_PATH,
  DEFAULT: DEFAULT_THUMBNAIL,
  HERO: HERO_THUMBNAIL,
  SIZES: {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large'
  }
};