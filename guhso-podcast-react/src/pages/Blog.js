import React, { useEffect, useState } from 'react';
import PostCard from '../components/Posts/PostCard';
import { fetchPosts } from '../api';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        setPosts(data.data || data);
        setError(null);
      } catch (err) {
        console.error('Failed to load posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="blog-page">
        <div className="blog-header">
          <h1>It Guhso</h1>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-page">
        <div className="blog-header">
          <h1>It Guhso</h1>
          <p className="error-message">Failed to load posts: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>It Guhso</h1>
      </div>
      <div className="blog-grid">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
