// src/components/Donation/DonationTiers.js
import React, { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import './DonationTiers.css';

const DonationTiers = ({ onAddToCart }) => {
  const [selectedTier, setSelectedTier] = useState(null);
  const [showOptionsModal, setShowOptionsModal] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { showSuccess } = useToast();

  const tiers = [
    {
      id: 'stickers',
      icon: "🔥",
      name: "GUHSO Sticker Pack",
      price: 2.99,
      priceDisplay: "$2.99",
      frequency: "one-time",
      color: "#e74c3c",
      popular: false,
      tagline: "Rep di brand everywhere",
      description: "Quality vinyl stickers featuring GUHSO logos and Jamaican-inspired designs",
      perks: [
        "5 premium vinyl stickers",
        "Weather-resistant material",
        "Perfect for laptops, phones, cars",
        "Free worldwide shipping"
      ],
      buttonText: "Get Mi Stickers",
      type: "merchandise",
      shippingRequired: true
    },
    {
      id: 'coffee',
      icon: "☕",
      name: "Buy Mi A Coffee",
      price: 4.99,
      priceDisplay: "$4.99",
      frequency: "one-time",
      color: "#6F4E37",
      popular: false,
      tagline: "Keep di vibes flowing",
      description: "Every coffee helps us stay up editing that next fire episode",
      perks: [
        "Shoutout in episode credits",
        "Access to blooper reel"
      ],
      buttonText: "Buy Mi Coffee Now",
      type: "donation"
    },
    {
      id: 'lunch',
      icon: "🍱",
      name: "Lunch Money",
      price: 9.99,
      priceDisplay: "$9.99",
      frequency: "one-time",
      color: "#FF6B35",
      popular: true,
      tagline: "Fuel the hustle",
      description: "Help us grab a patty and cocoa bread while we work on exclusive content",
      perks: [
        "Everything from Coffee tier",
        "Early access to episodes (24 hours before public)",
        "Exclusive \"Big Up\" mention on air"
      ],
      buttonText: "Grab Mi Lunch",
      type: "donation"
    },
    {
      id: 'feed-team',
      icon: "🍽️",
      name: "Feed Di Team",
      price: 19.99,
      priceDisplay: "$19.99",
      frequency: "one-time",
      color: "#F7931E",
      popular: false,
      tagline: "Breakfast & Lunch sorted!",
      description: "Keep the whole GUHSO crew energized for a full day of creating",
      perks: [
        "Everything from previous tiers",
        "Monthly exclusive mini-episode",
        "Access to private Discord/WhatsApp group",
        "Behind-the-scenes content"
      ],
      buttonText: "Feed Di Whole Crew",
      type: "donation"
    },
    {
      id: 'tshirt',
      icon: "👕",
      name: "GUHSO Crew Neck Tee",
      price: 24.99,
      priceDisplay: "$24.99",
      frequency: "one-time",
      color: "#2c3e50",
      popular: false,
      tagline: "Wear di culture with pride",
      description: "Premium black crew neck t-shirt with GUHSO logo in our signature color of the month",
      perks: [
        "100% cotton premium quality",
        "GUHSO logo in signature color",
        "Comfortable crew neck fit",
        "Available in S, M, L, XL",
        "Free shipping on orders over $20"
      ],
      buttonText: "Get Mi Tee",
      type: "merchandise",
      shippingRequired: true,
      hasOptions: true,
      options: {
        size: {
          label: "Size",
          required: true,
          choices: ["S", "M", "L", "XL"]
        }
      }
    },
    {
      id: 'insider',
      icon: "⭐",
      name: "GUHSO Insider",
      price: 3.99,
      priceDisplay: "$3.99",
      frequency: "monthly",
      color: "#9B59B6",
      popular: false,
      badge: "BEST VALUE",
      tagline: "Join di inner circle",
      description: "Exclusive vibes, early drops, and direct access to the GUHSO family",
      perks: [
        "Ad-free episodes",
        "48-hour early access to all content",
        "Monthly Q&A sessions",
        "Exclusive merchandise discounts",
        "Vote on episode topics",
        "Access to full episode archive"
      ],
      buttonText: "Join Di Family",
      type: "subscription"
    }
  ];

  const handleSelectTier = (tier) => {
    // If tier has options (like t-shirt sizes), show options modal
    if (tier.hasOptions) {
      setShowOptionsModal(tier);
      setSelectedOptions({});
      setSelectedQuantity(1);
      return;
    }

    // Otherwise add directly to cart
    addTierToCart(tier);
  };

  const addTierToCart = (tier, options = {}, quantity = 1) => {
    setSelectedTier(tier.id);
    
    const tierWithOptions = {
      ...tier,
      selectedOptions: options,
      quantity: quantity,
      // Add size to display name if selected
      displayName: options.size ? `${tier.name} (${options.size})` : tier.name
    };
    
    onAddToCart && onAddToCart(tierWithOptions);
    
    // Show success toast
    const toastMessage = tier.frequency === 'monthly' 
      ? `${tier.icon} Added "${tierWithOptions.displayName}" subscription to your cart!`
      : `${tier.icon} Added "${tierWithOptions.displayName}" to your cart!`;
    
    showSuccess(toastMessage, 2500);
    
    // Reset selection visual feedback after a short delay
    setTimeout(() => setSelectedTier(null), 500);
  };

  const handleOptionChange = (optionName, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };

  const handleAddWithOptions = () => {
    const tier = showOptionsModal;
    const isValid = validateOptions(tier, selectedOptions);
    
    if (!isValid) {
      showSuccess('Please select all required options', 2500);
      return;
    }

    addTierToCart(tier, selectedOptions, selectedQuantity);
    setShowOptionsModal(null);
    setSelectedOptions({});
    setSelectedQuantity(1);
  };

  const validateOptions = (tier, options) => {
    if (!tier.options) return true;
    
    for (const [optionName, optionConfig] of Object.entries(tier.options)) {
      if (optionConfig.required && !options[optionName]) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="donation-section">
      <div className="donation-header">
        <h2 className="donation-title">Keep Di Vibes Alive</h2>
        <p className="donation-subtitle">Every mickle mek a muckle - Support GUHSO</p>
      </div>

      {/* Social Proof */}
      <div className="donation-stats">
        <p>Join <strong>247</strong> supporters keeping GUHSO alive!</p>
        <div className="recent-supporters">
          <span>Recent: Michael B. • Sharon P. • Andre M.</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="funding-goal">
        <p>Monthly Goal: Equipment Upgrade</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{width: '67%'}}></div>
        </div>
        <p>$670 of $1,000 raised</p>
      </div>

      {/* Donation Tiers Grid */}
      <div className="donation-grid">
        {tiers.map((tier) => (
          <div 
            key={tier.id}
            className={`donation-card ${tier.popular ? 'popular' : ''} ${selectedTier === tier.id ? 'selected' : ''}`}
            style={{ '--tier-color': tier.color }}
          >
            {tier.popular && <span className="popular-badge">MOST POPULAR</span>}
            {tier.badge && !tier.popular && <span className="value-badge">{tier.badge}</span>}
            {tier.type === 'merchandise' && <span className="merch-badge">📦 MERCH</span>}
            
            <div className="donation-icon">{tier.icon}</div>
            <h3 className="donation-name">{tier.name}</h3>
            <div className="donation-tagline">{tier.tagline}</div>
            
            <div className="donation-price">{tier.priceDisplay}</div>
            <div className="donation-frequency">
              {tier.frequency === 'monthly' ? '/month' : 'one-time'}
            </div>
            
            <p className="donation-description">{tier.description}</p>
            
            <div className="donation-perks">
              {tier.perks.map((perk, index) => (
                <div key={index} className="perk-item">{perk}</div>
              ))}
            </div>
            
            <button 
              className={`donation-button ${tier.frequency === 'monthly' ? 'subscription-button' : ''}`}
              onClick={() => handleSelectTier(tier)}
            >
              {tier.buttonText}
            </button>

            {tier.id === 'insider' && (
              <div className="limited-offer">
                <span className="offer-badge">LIMITED TIME</span>
                <p>First 100 subscribers get exclusive GUHSO merch!</p>
                <p className="spots-left">Only 23 spots remaining</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="trust-section">
        <div className="trust-item">
          <i className="fas fa-shield-alt"></i>
          <span>Secure Payment</span>
        </div>
        <div className="trust-item">
          <i className="fas fa-lock"></i>
          <span>SSL Encrypted</span>
        </div>
        <div className="trust-item">
          <i className="fas fa-undo"></i>
          <span>Cancel Anytime</span>
        </div>
      </div>

      {/* Cultural Footer */}
      <div className="cultural-footer">
        <p><em>"Wi likkle but wi tallawah"</em> - We're small but we're strong</p>
      </div>

      {/* Options Modal */}
      {showOptionsModal && (
        <div className="options-modal-overlay" onClick={() => setShowOptionsModal(null)}>
          <div className="options-modal" onClick={(e) => e.stopPropagation()}>
            <div className="options-header">
              <h3>{showOptionsModal.icon} {showOptionsModal.name}</h3>
              <button 
                className="options-close"
                onClick={() => setShowOptionsModal(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="options-content">
              <p className="options-description">{showOptionsModal.description}</p>
              
              {showOptionsModal.options && Object.entries(showOptionsModal.options).map(([optionName, optionConfig]) => (
                <div key={optionName} className="option-group">
                  <label className="option-label">
                    {optionConfig.label}
                    {optionConfig.required && <span className="required">*</span>}
                  </label>
                  
                  {optionName === 'size' && (
                    <div className="size-selector">
                      {optionConfig.choices.map((size) => (
                        <button
                          key={size}
                          className={`size-btn ${selectedOptions.size === size ? 'selected' : ''}`}
                          onClick={() => handleOptionChange('size', size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Quantity Selector */}
              <div className="option-group">
                <label className="option-label">
                  Quantity
                  <span className="required">*</span>
                </label>
                <div className="quantity-selector">
                  <button
                    className="qty-btn"
                    onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                    disabled={selectedQuantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-display">{selectedQuantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                    disabled={selectedQuantity >= 10}
                  >
                    +
                  </button>
                </div>
                <div className="quantity-note">
                  Maximum 10 items per order
                </div>
              </div>
              
              <div className="options-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => setShowOptionsModal(null)}
                >
                  Cancel
                </button>
                <button 
                  className="add-to-cart-btn"
                  onClick={handleAddWithOptions}
                >
                  Add to Cart - ${(showOptionsModal.price * selectedQuantity).toFixed(2)}
                  {selectedQuantity > 1 && (
                    <span className="quantity-breakdown">
                      ({selectedQuantity} × {showOptionsModal.priceDisplay})
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationTiers;