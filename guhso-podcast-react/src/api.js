const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

// Episodes API
export async function fetchEpisodes() {
  const res = await fetch(`${API_URL}/episodes`);
  if (!res.ok) {
    throw new Error(`Failed to fetch episodes: ${res.status}`);
  }
  return res.json();
}

export async function fetchHeroEpisode() {
  const res = await fetch(`${API_URL}/featured/episode`);
  if (!res.ok) {
    throw new Error(`Failed to fetch hero episode: ${res.status}`);
  }
  return res.json();
}


// Posts API (keeping existing functionality)
export async function fetchFeaturedPosts() {
  const res = await fetch(`${API_URL}/posts/featured`);
  return res.json();
}

export async function fetchPosts() {
  const res = await fetch(`${API_URL}/posts`);
  return res.json();
}

export async function createPost(post) {
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  return res.json();
}
