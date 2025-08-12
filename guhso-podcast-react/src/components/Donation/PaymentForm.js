// src/components/Donation/PaymentForm.js
import React, { useState, useEffect, useRef } from 'react';
import { useDonationCart } from '../../contexts/DonationCartContext';
import squarePaymentService from '../../services/squarePayment';
import emailService from '../../services/emailService';
import { useToast } from '../../contexts/ToastContext';
import './PaymentForm.css';

const PaymentForm = ({ isOpen, onClose, onSuccess }) => {
  const {
    items,
    getOneTimeTotal,
    getMonthlyTotal,
    hasSubscriptions,
    clearCart,
    setProcessing
  } = useDonationCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [paymentCard, setPaymentCard] = useState(null);
  const cardContainerRef = useRef(null);
  const { showSuccess, showError } = useToast();

  // Initialize Square payment form when modal opens
  useEffect(() => {
    if (isOpen && cardContainerRef.current && !paymentCard) {
      initializePaymentForm();
    }
  }, [isOpen]);

  const initializePaymentForm = async () => {
    try {
      const card = await squarePaymentService.createPaymentForm('card-container', {
        style: {
          '.input-container': {
            borderColor: '#444',
            borderRadius: '8px',
            backgroundColor: '#2a2a2a'
          },
          '.input-container.is-focus': {
            borderColor: '#FF6B35'
          },
          '.input-container.is-error': {
            borderColor: '#E74C3C'
          },
          '.message-text': {
            color: '#E74C3C'
          },
          input: {
            color: '#ffffff',
            backgroundColor: '#2a2a2a'
          }
        }
      });
      
      setPaymentCard(card);
    } catch (error) {
      console.error('Failed to initialize payment form:', error);
      setErrors({ payment: 'Failed to load payment form. Please refresh and try again.' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const validation = squarePaymentService.validateForm(formData);
    setErrors(validation.errors.reduce((acc, error) => {
      const field = error.toLowerCase().includes('email') ? 'email' :
                   error.toLowerCase().includes('first') ? 'firstName' :
                   error.toLowerCase().includes('last') ? 'lastName' : 'general';
      acc[field] = error;
      return acc;
    }, {}));
    
    return validation.isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm() || !paymentCard) {
      return;
    }

    setIsLoading(true);
    setProcessing(true);
    setErrors({});

    try {
      const oneTimeAmount = getOneTimeTotal();
      const monthlyAmount = getMonthlyTotal();
      
      const donationData = {
        items,
        donor: formData,
        timestamp: new Date().toISOString()
      };

      let result;

      if (oneTimeAmount > 0 && monthlyAmount > 0) {
        // Combined payment
        result = await squarePaymentService.processCombinedPayment({
          card: paymentCard,
          oneTimeAmount,
          monthlyAmount,
          donationData
        });
      } else if (monthlyAmount > 0) {
        // Subscription only
        result = await squarePaymentService.processSubscriptionPayment({
          card: paymentCard,
          monthlyAmount,
          donationData
        });
      } else {
        // One-time only
        result = await squarePaymentService.processOneTimePayment({
          card: paymentCard,
          amount: oneTimeAmount,
          donationData
        });
      }

      if (result.success || (result.oneTime?.success || result.subscription?.success)) {
        // Prepare donation data for email
        const donationData = {
          donor: formData,
          items,
          oneTimeTotal,
          monthlyTotal,
          paymentId: result.paymentId || result.oneTime?.paymentId || result.subscription?.subscriptionId,
          subscriptionId: result.subscription?.subscriptionId,
          timestamp: new Date().toISOString()
        };

        // Send confirmation email
        try {
          const emailResult = await emailService.sendDonationConfirmation(donationData);
          if (emailResult.success) {
            showSuccess('Confirmation email sent! Check your inbox.', 4000);
          } else {
            showError('Payment successful, but email failed to send. Contact support if needed.', 6000);
          }

          // Send welcome email for subscribers
          if (monthlyAmount > 0 && result.subscription?.success) {
            await emailService.sendSubscriptionWelcome(donationData);
          }
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
          showError('Payment successful, but email failed to send. Contact support if needed.', 6000);
        }

        // Clear cart and close modal
        clearCart();
        onSuccess && onSuccess(result);
        onClose();
        
        // Show main success message
        showSuccess('🎉 Big up! Your donation has been processed successfully! Check your email for confirmation.', 8000);
      } else {
        const errorMessage = result.error || 
                           result.oneTime?.error || 
                           result.subscription?.error || 
                           'Payment failed. Please try again.';
        setErrors({ payment: errorMessage });
      }
    } catch (error) {
      console.error('Payment submission error:', error);
      setErrors({ payment: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
      setProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="payment-header">
          <h2>Complete Your Support</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="payment-summary">
          <h3>Your Contribution</h3>
          <div className="summary-items">
            {items.map((item) => (
              <div key={item.id} className="summary-item">
                <span>{item.icon} {item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="summary-totals">
            {getOneTimeTotal() > 0 && (
              <div className="total-line">
                <span>One-time total:</span>
                <span>${getOneTimeTotal().toFixed(2)}</span>
              </div>
            )}
            {getMonthlyTotal() > 0 && (
              <div className="total-line">
                <span>Monthly total:</span>
                <span>${getMonthlyTotal().toFixed(2)}/month</span>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-section">
            <h3>Contact Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error' : ''}
                  required
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? 'error' : ''}
                  required
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  required
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Leave a message for the GUHSO team..."
                rows="3"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Payment Information</h3>
            <div className="card-container" id="card-container" ref={cardContainerRef}>
              {/* Square payment form will be inserted here */}
            </div>
            {errors.payment && <div className="error-message">{errors.payment}</div>}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={isLoading || !paymentCard}>
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-heart"></i>
                  Complete Donation
                </>
              )}
            </button>
          </div>

          {hasSubscriptions() && (
            <div className="subscription-disclaimer">
              <i className="fas fa-info-circle"></i>
              <span>Monthly subscriptions will automatically renew. You can cancel anytime.</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;