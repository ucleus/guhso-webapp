const API_URL = process.env.REACT_APP_API_URL;

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
