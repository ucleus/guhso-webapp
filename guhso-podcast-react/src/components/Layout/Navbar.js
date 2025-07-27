// src/components/Layout/Navbar.js
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  const handleDonateClick = () => {
    // Handle donation logic here
    console.log('Donate button clicked');
  };

  const navLinks = [
    { href: '#episodes', label: 'Episodes' },
    { href: '#it-guhso', label: 'It Guhso' },
    { href: '#tech', label: 'Tech' },
    { href: '#merch', label: 'Merch'},
    { href: '#advertise', label: 'Advertise' },
    { href: '#whatisguhso', label: 'What Is Guhso'}
  ];

  return (
    <nav className="navbar">
      <div className="nav-logo">GUHSO</div>
      <ul className="nav-links">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
      <button className="donate-btn" onClick={handleDonateClick}>
        Donate
      </button>
    </nav>
  );
};

export default Navbar;