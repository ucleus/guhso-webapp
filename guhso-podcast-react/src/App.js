// src/App.js
import React from 'react';
import Navbar from './components/Layout/Navbar';
import HeroSection from './components/Hero/HeroSection';
import TwoColumnSection from './components/Layout/TwoColumnSection';
import Sidebar from './components/Sidebar/Sidebar';
import FloatingPlayer from './components/Player/FloatingPlayer';
import PostForm from './components/Posts/PostForm';
import { PlayerProvider } from './contexts/PlayerContext';
import './App.css';

function App() {
  return (
    <PlayerProvider>
      <div className="App">
        <Navbar />
        <div className="main-container">
          <div className="left-section">
            <HeroSection />
            <PostForm />
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
