// src/components/Sidebar/SearchSection.js
import React, { useState } from 'react';
import './SearchSection.css';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const popularTags = [
    '#technology',
    '#business', 
    '#startup',
    '#ai',
    '#design',
    '#marketing',
    '#productivity',
    '#innovation'
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  const handleTagClick = (tag) => {
    // Handle tag search
    console.log('Searching for tag:', tag);
  };

  return (
    <div className="search-section">
      <form className="search-bar" onSubmit={handleSearchSubmit}>
        <i className="fas fa-search search-icon"></i>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search episodes..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </form>
      <div className="popular-hashtags">
        <h3>Popular Tags</h3>
        <div className="hashtag-cloud">
          {popularTags.map((tag, index) => (
            <span 
              key={index} 
              className="hashtag-item"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;