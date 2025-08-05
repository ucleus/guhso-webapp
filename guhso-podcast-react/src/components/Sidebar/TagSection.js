import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../api';
import './TagSection.css';

const TagSection = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then(data => {
        const posts = data.data || data;
        const tagSet = new Set();
        posts.forEach(post => {
          (post.tags || []).forEach(tag => tagSet.add(tag));
        });
        setTags(Array.from(tagSet));
      })
      .catch(err => console.error(err));
  }, []);

  if (!tags.length) return null;

  return (
    <div className="tag-section">
      <h3>Tags</h3>
      <div className="tag-list">
        {tags.map(tag => (
          <span key={tag} className="tag-item">#{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default TagSection;
