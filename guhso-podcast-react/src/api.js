// Determine API base URL.
// Prefer an explicit environment variable. If none is provided,
// default to the production API hosted at kjprocleaning.com so the
// public site served from guhso.com can reach the backend.
//
// Some environments may supply a base URL without the `/v1` path
// segment. To avoid 404s from missing the version prefix, normalize
// the base so `API_URL` always includes `/v1` exactly once.
const API_BASE =
  process.env.REACT_APP_API_URL || 'https://kjprocleaning.com/api';

export const API_URL = API_BASE.endsWith('/v1') ? API_BASE : `${API_BASE}/v1`;

/**
 * Process episode data to normalize thumbnail fields
 * @param {Object} episode - Raw episode data from API
 * @returns {Object} Processed episode data
 */
const processEpisodeData = (episode) => {
  return {
    ...episode,
    // Normalize thumbnail fields for our thumbnail system
    originalThumbnail: episode.thumbnail_url || episode.itunes_image,
    // Add slug generation if not provided
    slug: episode.slug || generateSlugFromTitle(episode.title),
  };
};

/**
 * Generate URL-friendly slug from episode title
 * @param {string} title - Episode title
 * @returns {string} URL-friendly slug
 */
const generateSlugFromTitle = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .slice(0, 50); // Limit length
};

// Episodes API
export async function fetchEpisodes() {
  const res = await fetch(`${API_URL}/episodes`);
  if (!res.ok) {
    throw new Error(`Failed to fetch episodes: ${res.status}`);
  }
  const data = await res.json();
  
  // Process episodes to normalize thumbnail data
  if (Array.isArray(data.data)) {
    data.data = data.data.map(processEpisodeData);
  } else if (Array.isArray(data)) {
    return data.map(processEpisodeData);
  }
  
  return data;
}

export async function fetchHeroEpisode() {
  const res = await fetch(`${API_URL}/featured/episode`);
  if (!res.ok) {
    throw new Error(`Failed to fetch hero episode: ${res.status}`);
  }
  const data = await res.json();
  
  // Process hero episode data
  return processEpisodeData(data);
}


// Posts API (keeping existing functionality)
export async function fetchFeaturedPosts() {
  const res = await fetch(`${API_URL}/featured/episodes`);
  return res.json();
}

export async function fetchPosts() {
  const res = await fetch(`${API_URL}/posts`);
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }
  return res.json();
}

export async function fetchPostBySlug(slug) {
  const res = await fetch(`${API_URL}/posts/${slug}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${res.status}`);
  }
  return res.json();
}

// Products API
export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  return res.json();
}

export async function fetchProductBySlug(slug) {
  const res = await fetch(`${API_URL}/products/${slug}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`);
  }
  return res.json();
}

// Mailing list subscription
export async function subscribeToMailingList(first_name, email) {
  const res = await fetch(`${API_URL}/mailing-list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ first_name, email })
  });
  if (!res.ok) {
    throw new Error(`Failed to subscribe: ${res.status}`);
  }
  return res.json();
}

