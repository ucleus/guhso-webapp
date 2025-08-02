// src/components/Posts/PostList.js
import React from 'react';

const PostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>Blog Posts</h3>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: '1rem' }}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
