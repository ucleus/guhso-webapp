// src/services/squarePayment.js

class SquarePaymentService {
  constructor() {
    this.isInitialized = false;
    this.payments = null;
  }

  // Initialize Square Web Payments SDK
  async initialize() {
    if (this.isInitialized) return;

    try {
      // Wait for Square Web Payments SDK to load
      if (!window.Square) {
        throw new Error('Square Web Payments SDK not loaded');
      }

      const appId = process.env.REACT_APP_SQUARE_APP_ID || 'sandbox-sq0idb-YOUR_APP_ID_HERE';
      const locationId = process.env.REACT_APP_SQUARE_LOCATION_ID || 'YOUR_LOCATION_ID_HERE';

      this.payments = window.Square.payments(appId, locationId);
      this.isInitialized = true;
      
      console.log('Square Payments initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Square Payments:', error);
      throw error;
    }
  }

  // Create payment form
  async createPaymentForm(containerId, options = {}) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const cardOptions = {
        style: {
          '.input-container': {
            borderColor: '#CCCCCC',
            borderRadius: '8px'
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
          '.message-text.is-error': {
            color: '#E74C3C'
          }
        },
        ...options
      };

      const card = await this.payments.card(cardOptions);
      await card.attach(`#${containerId}`);
      
      return card;
    } catch (error) {
      console.error('Failed to create payment form:', error);
      throw error;
    }
  }

  // Process one-time payment
  async processOneTimePayment({ card, amount, currency = 'USD', donationData }) {
    try {
      // Tokenize the card
      const tokenResult = await card.tokenize();
      
      if (tokenResult.status === 'OK') {
        const token = tokenResult.token;
        
        // Send payment data to your backend
        const response = await fetch('/api/v1/donations/process-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            amount: Math.round(amount * 100), // Convert to cents
            currency,
            donation_type: 'one-time',
            donation_data: donationData
          })
        });

        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Payment processing failed');
        }

        return {
          success: true,
          paymentId: result.payment_id,
          receipt: result.receipt_url
        };
      } else {
        const errors = tokenResult.errors?.map(error => error.detail) || ['Tokenization failed'];
        throw new Error(errors.join(', '));
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        error: error.message || 'Payment failed'
      };
    }
  }

  // Process subscription payment
  async processSubscriptionPayment({ card, monthlyAmount, currency = 'USD', donationData }) {
    try {
      // Tokenize the card
      const tokenResult = await card.tokenize();
      
      if (tokenResult.status === 'OK') {
        const token = tokenResult.token;
        
        // Send subscription data to your backend
        const response = await fetch('/api/v1/donations/create-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            monthly_amount: Math.round(monthlyAmount * 100), // Convert to cents
            currency,
            donation_data: donationData
          })
        });

        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Subscription creation failed');
        }

        return {
          success: true,
          subscriptionId: result.subscription_id,
          customerId: result.customer_id
        };
      } else {
        const errors = tokenResult.errors?.map(error => error.detail) || ['Tokenization failed'];
        throw new Error(errors.join(', '));
      }
    } catch (error) {
      console.error('Subscription processing error:', error);
      return {
        success: false,
        error: error.message || 'Subscription creation failed'
      };
    }
  }

  // Process combined payment (one-time + subscription)
  async processCombinedPayment({ card, oneTimeAmount, monthlyAmount, currency = 'USD', donationData }) {
    try {
      const results = {
        oneTime: null,
        subscription: null
      };

      // Process one-time payment first
      if (oneTimeAmount > 0) {
        results.oneTime = await this.processOneTimePayment({
          card,
          amount: oneTimeAmount,
          currency,
          donationData: { ...donationData, type: 'one-time' }
        });

        if (!results.oneTime.success) {
          return results;
        }
      }

      // Process subscription if there is one
      if (monthlyAmount > 0) {
        results.subscription = await this.processSubscriptionPayment({
          card,
          monthlyAmount,
          currency,
          donationData: { ...donationData, type: 'subscription' }
        });
      }

      return results;
    } catch (error) {
      console.error('Combined payment processing error:', error);
      return {
        oneTime: { success: false, error: error.message },
        subscription: { success: false, error: error.message }
      };
    }
  }

  // Validate payment form
  validateForm(formData) {
    const errors = [];

    if (!formData.email) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!formData.firstName) {
      errors.push('First name is required');
    }

    if (!formData.lastName) {
      errors.push('Last name is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Create singleton instance
const squarePaymentService = new SquarePaymentService();

export default squarePaymentService;