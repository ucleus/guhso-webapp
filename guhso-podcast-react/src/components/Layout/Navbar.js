// src/components/Layout/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleBigupClick = () => {
    // Handle donation/donation logic here
    window.location.href = '/donation';
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
    { href: '#tech', label: 'Tech' },
    { href: '#merch', label: 'Merch'},
    { href: '#advertise', label: 'Advertise' },
    { href: '/about', label: 'What Is Guhso'}
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">GUHSO</Link>
      
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
      
      <button className="bigup-btn" onClick={handleBigupClick}>
        Donate
      </button>
    </nav>
  );
};

export default Navbar;