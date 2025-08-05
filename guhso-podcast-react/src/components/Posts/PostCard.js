import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../LazyImage/LazyImage';
import './PostCard.css';

const PostCard = ({ post }) => {
  if (!post) return null;

  // Prepare post data for thumbnail system
  const postForThumbnail = {
    ...post,
    thumbnail: post.thumbnail || post.thumbnail_url || post.image,
    id: post.id,
    slug: post.slug,
  };

  const description =
    post.body && post.body.length > 120
      ? `${post.body.substring(0, 120)}...`
      : post.body;

  return (
    <Link to={`/blog/${post.slug || post.id}`} className="post-card">
      <div className="post-card-image">
        <LazyImage episode={postForThumbnail} size="medium" alt={post.title} />
      </div>
      <div className="post-card-content">
        <h3 className="post-card-title">{post.title}</h3>
        {description && <p className="post-card-description">{description}</p>}
      </div>
    </Link>
  );
};

export default PostCard;
