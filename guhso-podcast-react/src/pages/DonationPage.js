// src/pages/DonationPage.js
import React, { useState, useEffect } from 'react';
import DonationHeroSection from '../components/Hero/DonationHeroSection';
import DonationTiers from '../components/Donation/DonationTiers';
import DonationCart from '../components/Donation/DonationCart';
import PaymentForm from '../components/Donation/PaymentForm';
import { DonationCartProvider, useDonationCart } from '../contexts/DonationCartContext';
import { ToastProvider } from '../contexts/ToastContext';
import './DonationPage.css';

// Main page component with donation functionality
const DonationPageContent = () => {
  const [isVisible, setIsVisible] = useState({});
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { addToCart } = useDonationCart();

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

  // Load Square Web Payments SDK
  useEffect(() => {
    if (!window.Square) {
      const script = document.createElement('script');
      const environment = process.env.REACT_APP_SQUARE_ENVIRONMENT || 'sandbox';
      
      // Use appropriate Square SDK URL based on environment
      script.src = environment === 'production' 
        ? 'https://web.squarecdn.com/v1/square.js'
        : 'https://sandbox.web.squarecdn.com/v1/square.js';
      script.async = true;
      script.onload = () => {
        console.log('Square Web Payments SDK loaded');
      };
      script.onerror = () => {
        console.error('Failed to load Square Web Payments SDK');
      };
      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, []);

  const handleAddToCart = (tier) => {
    addToCart(tier);
  };

  const handleCheckout = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = (result) => {
    console.log('Payment successful:', result);
    setShowPaymentForm(false);
  };


  return (
    <div className="registration-page">
      {/* Donation/Sponsorship Hero Section */}
      <DonationHeroSection />
      
      <div className="registration-container">

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

        {/* Donation Tiers Section */}
        <section 
          id="donation-tiers" 
          className={`registration-section donation-tiers-section ${isVisible['donation-tiers'] ? 'visible' : ''}`}
        >
          <DonationTiers onAddToCart={handleAddToCart} />
        </section>

        {/* Donation Cart */}
        <section 
          id="donation-cart" 
          className={`registration-section cart-section ${isVisible['donation-cart'] ? 'visible' : ''}`}
        >
          <DonationCart onCheckout={handleCheckout} />
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

      {/* Payment Form Modal */}
      <PaymentForm 
        isOpen={showPaymentForm}
        onClose={() => setShowPaymentForm(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

// Main component wrapped with providers
const DonationPage = () => {
  return (
    <ToastProvider>
      <DonationCartProvider>
        <DonationPageContent />
      </DonationCartProvider>
    </ToastProvider>
  );
};

export default DonationPage;