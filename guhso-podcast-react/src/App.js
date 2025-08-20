// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import HeroSection from './components/Hero/HeroSection';
import TwoColumnSection from './components/Layout/TwoColumnSection';
import Sidebar from './components/Sidebar/Sidebar';
import FloatingPlayer from './components/Player/FloatingPlayer';
import MailingListModal from './components/MailingList/MailingListModal';
import CookieConsent from './components/CookieConsent/CookieConsent';
import Episodes from './pages/Episodes';
import EpisodeDetail from './pages/EpisodeDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import AboutPage from './pages/AboutPage';
import DonationPage from './pages/DonationPage';
import TechPage from './pages/TechPage';
import Merch from './pages/Merch';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import { PlayerProvider } from './contexts/PlayerContext';
import { CartProvider } from './contexts/CartContext';
import './App.css';

// Home Page Component
const HomePage = () => {
  const [currentEpisode, setCurrentEpisode] = useState(null);

  return (
    <div className="main-container">
      <div className="left-section">
        <HeroSection onEpisodeLoad={setCurrentEpisode} />

        <TwoColumnSection currentEpisode={currentEpisode} />
      </div>
      <Sidebar />
      <MailingListModal />
    </div>
  );
};

function App() {

  return (
    <PlayerProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />

            <Routes>
            {/* Home Page */}
            <Route 
              path="/" 
              element={<HomePage />} 
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

            {/* Blog Page */}
            <Route
              path="/blog"
              element={<Blog />}
            />

            {/* Blog Detail Page */}
            <Route
              path="/blog/:slug"
              element={<BlogDetail />}
            />

            {/* About Page */}
            <Route
              path="/about"
              element={<AboutPage />}
            />

            {/* donation Page */}
            <Route
              path="/donation"
              element={<DonationPage />}
            />

            {/* Tech Page */}
            <Route
              path="/tech"
              element={<TechPage />}
            />

            {/* Merch Page */}
            <Route
              path="/merch"
              element={<Merch />}
            />

            {/* Product Detail Page */}
            <Route
              path="/merch/:slug"
              element={<ProductDetail />}
            />

            {/* Cart Page */}
            <Route
              path="/cart"
              element={<CartPage />}
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
          <CookieConsent />
        </div>
      </Router>
      </CartProvider>
    </PlayerProvider>
  );
}

export default App;
