// src/components/Layout/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getItemCount } = useCart();

  const handleBigupClick = () => {
    // Navigate to the donation page
    navigate('/donation');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '/episodes', label: 'Episodes' },
    { href: '/blog', label: 'It Guhso' },
    { href: '/tech', label: 'Tech' },
    { href: '/merch', label: 'Merch' },
    { href: '#advertise', label: 'Advertise' },
    { href: '/about', label: 'What Is Guhso'}
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img src="/logo.png" alt="Guhso logo" className="responsive-logo" />
      </Link>
      
      <button 
        className="mobile-menu-toggle" 
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
      
      <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        {navLinks.map((link) => (
          <li key={link.href}>
            {link.href.startsWith('/') ? (
              <Link to={link.href} onClick={closeMobileMenu}>{link.label}</Link>
            ) : (
              <a href={link.href} onClick={closeMobileMenu}>{link.label}</a>
            )}
          </li>
        ))}
      </ul>
      
      <div className="nav-actions">
        <Link to="/cart" className="cart-link" onClick={closeMobileMenu}>
          <div className="cart-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {getItemCount() > 0 && (
              <span className="cart-badge">{getItemCount()}</span>
            )}
          </div>
        </Link>
        
        <button className="bigup-btn" onClick={handleBigupClick}>
          Donate
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
