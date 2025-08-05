// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import HeroSection from './components/Hero/HeroSection';
import TwoColumnSection from './components/Layout/TwoColumnSection';
import Sidebar from './components/Sidebar/Sidebar';
import FloatingPlayer from './components/Player/FloatingPlayer';
import PostList from './components/Posts/PostList';
import Episodes from './pages/Episodes';
import EpisodeDetail from './pages/EpisodeDetail';
import { fetchPosts } from './api';
import { PlayerProvider } from './contexts/PlayerContext';
import './App.css';

// Home Page Component
const HomePage = ({ posts }) => (
  <div className="main-container">
    <div className="left-section">
      <HeroSection />
      
      {/* Posts Section */}
      {posts.length > 0 && <PostList posts={posts} />}
      
      <TwoColumnSection />
    </div>
    <Sidebar />
  </div>
);

function App() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data.data || data);
    } catch (err) {
      console.error('Failed to load posts:', err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <PlayerProvider>
      <Router>
        <div className="App">
          <Navbar />
          
          <Routes>
            {/* Home Page */}
            <Route 
              path="/" 
              element={<HomePage posts={posts} />} 
            />
            
            {/* Episodes Page */}
            <Route 
              path="/episodes" 
              element={<Episodes />} 
            />
            
            {/* Episode Detail Page */}
            <Route 
              path="/episode/:slug" 
              element={<EpisodeDetail />} 
            />
            
            {/* Fallback for unknown routes */}
            <Route 
              path="*" 
              element={
                <div style={{ 
                  textAlign: 'center', 
                  padding: '4rem 2rem',
                  color: 'var(--text-light)'
                }}>
                  <h1>Page Not Found</h1>
                  <p>The page you're looking for doesn't exist.</p>
                  <a 
                    href="/" 
                    style={{
                      color: 'var(--primary-color)',
                      textDecoration: 'none',
                      fontWeight: 'bold'
                    }}
                  >
                    Go Home
                  </a>
                </div>
              } 
            />
          </Routes>
          
          <FloatingPlayer />
        </div>
      </Router>
    </PlayerProvider>
  );
}

export default App;
