// Placeholder image utilities for development and fallbacks

/**
 * Generate SVG placeholder image as data URL
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} text - Text to display
 * @param {string} primaryColor - Primary gradient color
 * @param {string} secondaryColor - Secondary gradient color
 * @returns {string} Data URL for SVG image
 */
export const generatePlaceholder = (
  width = 400, 
  height = 300, 
  text = 'GUHSO', 
  primaryColor = '#FF6B35', 
  secondaryColor = '#F7931E'
) => {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'>
      <defs>
        <linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' style='stop-color:${primaryColor};stop-opacity:1' />
          <stop offset='100%' style='stop-color:${secondaryColor};stop-opacity:1' />
        </linearGradient>
      </defs>
      <rect width='${width}' height='${height}' fill='url(#g)' />
      <text x='50%' y='40%' dominant-baseline='middle' text-anchor='middle' 
            font-family='Arial, sans-serif' font-size='${Math.max(16, width / 20)}' 
            fill='white' font-weight='bold'>${text}</text>
      <text x='50%' y='60%' dominant-baseline='middle' text-anchor='middle' 
            font-family='Arial, sans-serif' font-size='${Math.max(12, width / 30)}' 
            fill='white' opacity='0.7'>Podcast</text>
    </svg>
  `;
  
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

/**
 * Standard placeholder sizes
 */
export const PLACEHOLDER_SIZES = {
  small: { width: 200, height: 150 },
  medium: { width: 400, height: 300 },
  large: { width: 800, height: 600 },
  hero: { width: 1200, height: 600 }
};

/**
 * Get placeholder for specific size
 * @param {string} size - Size key (small, medium, large, hero)
 * @param {string} text - Text to display
 * @returns {string} Data URL for placeholder
 */
export const getPlaceholderBySize = (size = 'medium', text = 'GUHSO') => {
  const dimensions = PLACEHOLDER_SIZES[size] || PLACEHOLDER_SIZES.medium;
  return generatePlaceholder(dimensions.width, dimensions.height, text);
};

/**
 * Episode-specific placeholder
 * @param {Object} episode - Episode object
 * @param {string} size - Size variant
 * @returns {string} Data URL for episode placeholder
 */
export const getEpisodePlaceholder = (episode, size = 'medium') => {
  const episodeNumber = episode?.episode_number || episode?.itunes_episode;
  const text = episodeNumber ? `EP ${episodeNumber}` : 'GUHSO';
  return getPlaceholderBySize(size, text);
};