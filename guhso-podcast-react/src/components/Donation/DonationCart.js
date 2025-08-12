// src/components/Donation/DonationCart.js
import React, { useState } from 'react';
import { useDonationCart } from '../../contexts/DonationCartContext';
import './DonationCart.css';

const DonationCart = ({ onCheckout }) => {
  const {
    items,
    total,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
    getOneTimeTotal,
    getMonthlyTotal,
    hasSubscriptions,
    isProcessing
  } = useDonationCart();

  const [isExpanded, setIsExpanded] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) return;
    onCheckout && onCheckout({ items, total });
  };

  if (items.length === 0) {
    return (
      <div className="donation-cart empty">
        <div className="cart-header">
          <h3>
            <i className="fas fa-shopping-cart"></i>
            Your Support Cart
          </h3>
          <p>No items selected yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="donation-cart">
      <div className="cart-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>
          <i className="fas fa-shopping-cart"></i>
          Your Support Cart ({getItemCount()})
        </h3>
        <button className="cart-toggle">
          <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
        </button>
      </div>

      {isExpanded && (
        <div className="cart-content">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <div className="item-icon">{item.icon}</div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-frequency">
                      {item.frequency === 'monthly' ? 'Monthly' : 'One-time'}
                    </p>
                  </div>
                </div>
                
                <div className="item-controls">
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.frequency === 'monthly'}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            {getOneTimeTotal() > 0 && (
              <div className="summary-line">
                <span>One-time donations:</span>
                <span>${getOneTimeTotal().toFixed(2)}</span>
              </div>
            )}
            
            {getMonthlyTotal() > 0 && (
              <div className="summary-line">
                <span>Monthly subscriptions:</span>
                <span>${getMonthlyTotal().toFixed(2)}/month</span>
              </div>
            )}
            
            <div className="summary-line total">
              <span>Total today:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {hasSubscriptions() && (
              <div className="subscription-note">
                <i className="fas fa-info-circle"></i>
                <span>Subscriptions will renew monthly</span>
            </div>
            )}
          </div>

          <div className="cart-actions">
            <button 
              className="clear-cart-btn"
              onClick={clearCart}
              disabled={isProcessing}
            >
              Clear Cart
            </button>
            
            <button 
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-credit-card"></i>
                  Proceed to Checkout
                </>
              )}
            </button>
          </div>

          <div className="secure-payment-notice">
            <i className="fas fa-shield-alt"></i>
            <span>Secured by Square</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationCart;