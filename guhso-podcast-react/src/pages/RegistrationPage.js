// src/pages/RegistrationPage.js
import React, { useState, useEffect } from 'react';
import DonationHeroSection from '../components/Hero/DonationHeroSection';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    // Animate sections on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.registration-section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const supportOptions = [
    {
      title: 'Support the Movement',
      description: 'Help us keep the vibes flowing and the conversation real.',
      icon: 'fas fa-heart',
      color: '#FF6B35'
    },
    {
      title: 'Spread the Word',
      description: 'Share episodes with your crew and help us grow the community.',
      icon: 'fas fa-share-alt',
      color: '#F7931E'
    },
    {
      title: 'Join the Conversation',
      description: 'Follow us on social media and be part of the Guhso family.',
      icon: 'fas fa-comments',
      color: '#FF6B35'
    }
  ];

  return (
    <div className="registration-page">
      {/* Donation/Sponsorship Hero Section */}
      <DonationHeroSection />
      
      <div className="registration-container">

        {/* Support Options */}
        <section 
          id="support-options" 
          className={`registration-section support-section ${isVisible['support-options'] ? 'visible' : ''}`}
        >
          <h2>How You Can Bigup</h2>
          <div className="support-grid">
            {supportOptions.map((option, index) => (
              <div key={index} className="support-card">
                <div className="card-icon" style={{ backgroundColor: option.color }}>
                  <i className={option.icon}></i>
                </div>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <section 
          id="registration-content" 
          className={`registration-section content-section ${isVisible['registration-content'] ? 'visible' : ''}`}
        >
          <div className="content-text">
            <h2>Why Your Support Matters</h2>
            <p>
              <em>Guhso</em> isn't just a podcast—it's a movement celebrating Jamaican culture, 
              authentic conversations, and real connections. Your bigup helps us:
            </p>
            <ul>
              <li>Keep producing weekly episodes with no corporate filters</li>
              <li>Maintain our independence and authentic voice</li>
              <li>Expand our reach to bring Yardie vibes worldwide</li>
              <li>Cover production costs and support our growing team</li>
              <li>Create more content like our blog and tech coverage</li>
            </ul>
            <p>
              Every contribution, no matter the size, shows love for the culture 
              and helps us continue growing this community of authentic voices.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section 
          id="registration-cta" 
          className={`registration-section cta-section ${isVisible['registration-cta'] ? 'visible' : ''}`}
        >
          <div className="cta-content">
            <h2>Ready to Show Some Love?</h2>
            <p>Choose how you want to support the Guhso movement:</p>
            <div className="cta-buttons">
              <a href="#" className="cta-btn primary">
                <i className="fas fa-heart"></i>
                <span>One-Time Bigup</span>
              </a>
              <a href="#" className="cta-btn secondary">
                <i className="fas fa-calendar-alt"></i>
                <span>Monthly Support</span>
              </a>
              <a href="#" className="cta-btn tertiary">
                <i className="fas fa-share-alt"></i>
                <span>Share the Vibes</span>
              </a>
            </div>
            <p className="cta-note">
              <strong>Big up!</strong> Your support keeps the authentic conversations flowing.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          id="registration-contact" 
          className={`registration-section contact-section ${isVisible['registration-contact'] ? 'visible' : ''}`}
        >
          <div className="contact-content">
            <h2>Get in Touch</h2>
            <p>Want to support in other ways? Have ideas? Let's talk!</p>
            <div className="contact-info">
              <p>
                <i className="fas fa-envelope"></i>
                <a href="mailto:chatbout@guhso.com">chatbout@guhso.com</a>
              </p>
              <p>
                <i className="fas fa-phone"></i>
                <a href="tel:+17543008618">(754) 300-8618</a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RegistrationPage;