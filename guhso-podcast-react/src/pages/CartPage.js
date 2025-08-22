import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  const handleQuantityChange = (itemId, newQuantity) => {
    const quantity = Math.max(1, parseInt(newQuantity) || 1);
    updateQuantity(itemId, quantity);
  };

  const handleCheckout = async () => {
    setIsProcessingCheckout(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Checkout functionality would be implemented here!');
      setIsProcessingCheckout(false);
    }, 1500);
  };

  const getItemSubtotal = (item) => {
    const price = parseFloat(item.price) || 0;
    return (price * item.quantity);
  };

  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + shipping + tax;

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
              </svg>
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/merch" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Header */}
        <div className="cart-header">
          <div className="breadcrumb">
            <Link to="/merch">Merch</Link>
            <span className="breadcrumb-separator">›</span>
            <span>Shopping Cart</span>
          </div>
          <h1>Shopping Cart</h1>
          <p className="cart-count">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items-section">
            <div className="cart-items-header">
              <span>Product</span>
              <span>Quantity</span>
              <span>Price</span>
              <span>Total</span>
              <span></span>
            </div>

            <div className="cart-items">
              {items.map((item, index) => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <div className="item-image">
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <div className="placeholder-image">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 4h16v12H4z"/>
                            <circle cx="8" cy="9" r="2"/>
                            <path d="M4 18l4-4 4 4h8v-2l-4-4-2 2"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      {item.variant && (
                        <div className="item-variant">
                          {item.variant.color && (
                            <span className="variant-color">Color: {item.variant.color}</span>
                          )}
                          {item.variant.size && (
                            <span className="variant-size">Size: {item.variant.size}</span>
                          )}
                          {item.variant.sku && (
                            <span className="variant-sku">SKU: {item.variant.sku}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="quantity-section">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="quantity-btn"
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <input 
                        type="number" 
                        value={item.quantity} 
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        min="1"
                        className="quantity-input"
                      />
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="item-price">
                    ${formatPrice(item.price)}
                  </div>

                  <div className="item-total">
                    ${formatPrice(getItemSubtotal(item))}
                  </div>

                  <div className="item-actions">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                      title="Remove from cart"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <button onClick={clearCart} className="clear-cart-btn">
                Clear All Items
              </button>
              <Link to="/merch" className="continue-shopping-link">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal ({items.length} item{items.length !== 1 ? 's' : ''})</span>
              <span>${formatPrice(total)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${formatPrice(shipping)}`}</span>
            </div>
            
            {shipping === 0 && total >= 50 && (
              <div className="shipping-notice">
                🎉 You qualified for free shipping!
              </div>
            )}
            
            {shipping > 0 && (
              <div className="shipping-notice">
                Add ${formatPrice(50 - total)} more for free shipping
              </div>
            )}
            
            <div className="summary-row">
              <span>Tax</span>
              <span>${formatPrice(tax)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total-row">
              <span>Total</span>
              <span>${formatPrice(finalTotal)}</span>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={isProcessingCheckout}
              className={`checkout-btn ${isProcessingCheckout ? 'loading' : ''}`}
            >
              {isProcessingCheckout ? 'Processing...' : 'Proceed to Checkout'}
            </button>

            <div className="security-badges">
              <div className="security-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                <span>Secure checkout</span>
              </div>
              <div className="security-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/>
                </svg>
                <span>Easy returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

