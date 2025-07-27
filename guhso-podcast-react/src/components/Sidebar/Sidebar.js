// src/components/Sidebar/Sidebar.js
import React from 'react';
import FeaturedSection from './FeaturedSection';
import SearchSection from './SearchSection';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="right-section">
      <FeaturedSection />
      <SearchSection />
    </div>
  );
};

export default Sidebar;