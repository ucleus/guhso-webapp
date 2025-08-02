// src/App.js
import React, { useEffect, useState } from 'react';
import Navbar from './components/Layout/Navbar';
import HeroSection from './components/Hero/HeroSection';
import TwoColumnSection from './components/Layout/TwoColumnSection';
import Sidebar from './components/Sidebar/Sidebar';
import FloatingPlayer from './components/Player/FloatingPlayer';
import PostForm from './components/Posts/PostForm';
import PostList from './components/Posts/PostList';
import { fetchPosts } from './api';
import { PlayerProvider } from './contexts/PlayerContext';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data.data || data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <PlayerProvider>
      <div className="App">
        <Navbar />
        <div className="main-container">
          <div className="left-section">
            <HeroSection />
            <PostForm onPostCreated={loadPosts} />
            <PostList posts={posts} />
            <TwoColumnSection />
          </div>
          <Sidebar />
        </div>
        <FloatingPlayer />
      </div>
    </PlayerProvider>
  );
}

export default App;
