import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LazyImage from '../components/LazyImage/LazyImage';
import FeaturedSection from '../components/Sidebar/FeaturedSection';
import SearchSection from '../components/Sidebar/SearchSection';
import TagSection from '../components/Sidebar/TagSection';
import { fetchPostBySlug } from '../api';
import './BlogDetail.css';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const data = await fetchPostBySlug(slug);
        setPost(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load post:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-detail-page">
        <div className="blog-detail-container">
          <div className="blog-detail-content">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-detail-page">
        <div className="blog-detail-container">
          <div className="blog-detail-content blog-not-found">
            <h1>Post Not Found</h1>
            <p>The post you're looking for doesn't exist or has been removed.</p>
            <Link to="/blog" className="back-to-blog">
              <i className="fas fa-arrow-left"></i>
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const postForThumbnail = {
    ...post,
    thumbnail: post.cover_image || post.thumbnail || post.thumbnail_url || post.image,
    id: post.id,
    slug: post.slug,
  };

  return (
    <div className="blog-detail-page">
      <div className="blog-detail-container">
        <div className="blog-detail-content">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link to="/blog">It Guhso</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{post.title}</span>
          </nav>

          <div className="blog-header">
            <div className="blog-image">
              <LazyImage
                episode={postForThumbnail}
                size="large"
                alt={post.title}
                className="blog-detail-image"
              />
            </div>
            <div className="blog-info">
              <h1 className="blog-title">{post.title}</h1>
              {post.published_at && (
                <div className="blog-meta">
                  <i className="fas fa-calendar"></i>
                  <span>
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>

          {post.body && <div className="blog-body">{post.body}</div>}

          {post.tags && post.tags.length > 0 && (
            <div className="blog-tags">
              {post.tags.map(tag => (
                <span key={tag} className="blog-tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>

        <div className="blog-detail-sidebar">
          <FeaturedSection />
          <SearchSection />
          <TagSection />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
