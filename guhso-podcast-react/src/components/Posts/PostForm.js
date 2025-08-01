// src/components/Posts/PostForm.js
import React, { useState } from 'react';
import { createPost } from '../../api';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ title, body, is_featured: isFeatured });
      setTitle('');
      setBody('');
      setIsFeatured(false);
      alert('Post created');
    } catch (err) {
      console.error(err);
      alert('Failed to create post');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>Create Post</h3>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
      </div>
      <div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          required
        />
      </div>
      <label>
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
        Featured
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
