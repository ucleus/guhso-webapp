// src/services/emailService.js
import { generateDonationConfirmationEmail, generatePlainTextConfirmation } from '../templates/donationConfirmationEmail';

class EmailService {
  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL || 'https://kjprocleaning.com/api/v1';
  }

  /**
   * Send donation confirmation email
   * @param {Object} donationData - Complete donation information
   * @returns {Promise<Object>} - Response from email service
   */
  async sendDonationConfirmation(donationData) {
    try {
      const htmlContent = generateDonationConfirmationEmail(donationData);
      const plainTextContent = generatePlainTextConfirmation(donationData);

      const emailPayload = {
        to: donationData.donor.email,
        subject: `🎉 Big Up! Thank you for supporting GUHSO - Confirmation #${donationData.paymentId}`,
        html: htmlContent,
        text: plainTextContent,
        from: {
          email: 'noreply@guhso.com',
          name: 'GUHSO Podcast'
        },
        reply_to: 'chatbout@guhso.com',
        tags: ['donation-confirmation', 'supporter-email'],
        metadata: {
          donation_id: donationData.paymentId,
          donor_email: donationData.donor.email,
          donation_type: donationData.items.some(item => item.frequency === 'monthly') ? 'subscription' : 'one-time',
          total_amount: donationData.oneTimeTotal + donationData.monthlyTotal
        }
      };

      const response = await fetch(`${this.apiUrl}/emails/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send email');
      }

      return {
        success: true,
        messageId: result.message_id,
        status: 'sent'
      };
    } catch (error) {
      console.error('Email sending error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send confirmation email'
      };
    }
  }

  /**
   * Send subscription welcome email (for monthly subscribers)
   * @param {Object} subscriptionData - Subscription information
   * @returns {Promise<Object>} - Response from email service
   */
  async sendSubscriptionWelcome(subscriptionData) {
    try {
      const welcomeEmail = this.generateSubscriptionWelcomeEmail(subscriptionData);

      const emailPayload = {
        to: subscriptionData.donor.email,
        subject: '🌟 Welcome to the GUHSO Inner Circle!',
        html: welcomeEmail.html,
        text: welcomeEmail.text,
        from: {
          email: 'noreply@guhso.com',
          name: 'GUHSO Podcast'
        },
        reply_to: 'chatbout@guhso.com',
        tags: ['subscription-welcome', 'guhso-insider'],
        metadata: {
          subscription_id: subscriptionData.subscriptionId,
          subscriber_email: subscriptionData.donor.email
        }
      };

      const response = await fetch(`${this.apiUrl}/emails/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send welcome email');
      }

      return {
        success: true,
        messageId: result.message_id
      };
    } catch (error) {
      console.error('Welcome email error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Generate subscription welcome email content
   * @param {Object} subscriptionData - Subscription information
   * @returns {Object} - HTML and text content
   */
  generateSubscriptionWelcomeEmail(subscriptionData) {
    const { donor } = subscriptionData;

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Welcome to GUHSO Inner Circle</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden;">
            
            <div style="background: linear-gradient(135deg, #9B59B6, #8E44AD); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🌟 Welcome to di Inner Circle! 🌟</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
                    You're now part of the exclusive GUHSO family!
                </p>
            </div>

            <div style="padding: 30px;">
                <h2 style="color: #333; margin: 0 0 20px 0;">Big up, ${donor.firstName}!</h2>
                
                <p style="color: #555; line-height: 1.6;">
                    Welcome to the GUHSO Inner Circle! As a monthly subscriber, you now have access to:
                </p>

                <ul style="color: #555; line-height: 1.8; padding-left: 20px;">
                    <li>🎧 Ad-free episodes</li>
                    <li>⏰ 48-hour early access to all content</li>
                    <li>💬 Monthly Q&A sessions</li>
                    <li>🛍️ Exclusive merchandise discounts</li>
                    <li>🗳️ Vote on episode topics</li>
                    <li>📚 Access to full episode archive</li>
                </ul>

                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #9B59B6;">
                    <h3 style="color: #9B59B6; margin: 0 0 10px 0;">🎁 What's Next?</h3>
                    <p style="color: #555; margin: 0; line-height: 1.6;">
                        Keep an eye on your inbox over the next 24-48 hours. We'll be sending you:
                    </p>
                    <ul style="color: #555; margin: 10px 0 0 0; padding-left: 20px;">
                        <li>Discord/WhatsApp group invite</li>
                        <li>Access links to exclusive content</li>
                        <li>Your first subscriber-only episode</li>
                        <li>Merchandise discount code</li>
                    </ul>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://guhso.com/account/subscriptions" 
                       style="background-color: #9B59B6; color: white; padding: 15px 30px; text-decoration: none; 
                              border-radius: 8px; font-weight: bold; display: inline-block;">
                        Manage Your Subscription
                    </a>
                </div>

                <p style="color: #555; line-height: 1.6; text-align: center; font-style: italic;">
                    "Every mickle mek a muckle" - Thank you for keeping the vibes alive! 🙏
                </p>
            </div>

            <div style="background-color: #2c3e50; padding: 20px; text-align: center;">
                <p style="color: white; margin: 0; font-size: 14px;">
                    Questions? Reply to this email or contact 
                    <a href="mailto:chatbout@guhso.com" style="color: #9B59B6;">chatbout@guhso.com</a>
                </p>
            </div>
        </div>
    </body>
    </html>
    `;

    const text = `
🌟 Welcome to the GUHSO Inner Circle! 🌟

Big up, ${donor.firstName}!

Welcome to the GUHSO Inner Circle! As a monthly subscriber, you now have access to:

• 🎧 Ad-free episodes
• ⏰ 48-hour early access to all content  
• 💬 Monthly Q&A sessions
• 🛍️ Exclusive merchandise discounts
• 🗳️ Vote on episode topics
• 📚 Access to full episode archive

WHAT'S NEXT:
Keep an eye on your inbox over the next 24-48 hours for:
• Discord/WhatsApp group invite
• Access links to exclusive content
• Your first subscriber-only episode
• Merchandise discount code

Manage your subscription: https://guhso.com/account/subscriptions

"Every mickle mek a muckle" - Thank you for keeping the vibes alive! 🙏

Questions? Reply to this email or contact chatbout@guhso.com
    `;

    return { html, text };
  }

  /**
   * Send refund confirmation email
   * @param {Object} refundData - Refund information
   * @returns {Promise<Object>} - Response from email service
   */
  async sendRefundConfirmation(refundData) {
    try {
      const { donor, refundAmount, refundReason, originalTransactionId } = refundData;

      const emailPayload = {
        to: donor.email,
        subject: '✅ GUHSO Refund Processed - We Understand',
        html: this.generateRefundConfirmationHTML(refundData),
        text: this.generateRefundConfirmationText(refundData),
        from: {
          email: 'noreply@guhso.com',
          name: 'GUHSO Podcast'
        },
        reply_to: 'support@guhso.com',
        tags: ['refund-confirmation', 'customer-service']
      };

      const response = await fetch(`${this.apiUrl}/emails/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload)
      });

      const result = await response.json();
      return { success: response.ok, messageId: result.message_id };
    } catch (error) {
      console.error('Refund email error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Generate refund confirmation HTML
   * @param {Object} refundData - Refund information
   * @returns {String} - HTML content
   */
  generateRefundConfirmationHTML(refundData) {
    const { donor, refundAmount, refundReason, originalTransactionId } = refundData;
    
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #27ae60; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">✅ Refund Processed</h1>
        </div>
        <div style="padding: 30px; background: white;">
            <p>Hi ${donor.firstName},</p>
            <p>Your refund has been processed successfully. We understand that sometimes things don't work out, and that's totally fine!</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Refund Details:</h3>
                <p><strong>Amount:</strong> $${refundAmount.toFixed(2)}</p>
                <p><strong>Original Transaction:</strong> ${originalTransactionId}</p>
                <p><strong>Reason:</strong> ${refundReason}</p>
                <p><strong>Processing Time:</strong> 3-5 business days</p>
            </div>

            <p>Even though you're no longer supporting us financially, you're always welcome back to the GUHSO family. Keep listening to our free episodes and stay connected!</p>
            
            <p>If you have any feedback about your experience, we'd love to hear from you at chatbout@guhso.com</p>
            
            <p>One love,<br>The GUHSO Team</p>
        </div>
    </div>
    `;
  }

  /**
   * Generate refund confirmation plain text
   * @param {Object} refundData - Refund information
   * @returns {String} - Plain text content
   */
  generateRefundConfirmationText(refundData) {
    const { donor, refundAmount, refundReason, originalTransactionId } = refundData;
    
    return `
✅ Refund Processed

Hi ${donor.firstName},

Your refund has been processed successfully. We understand that sometimes things don't work out, and that's totally fine!

REFUND DETAILS:
Amount: $${refundAmount.toFixed(2)}
Original Transaction: ${originalTransactionId}
Reason: ${refundReason}
Processing Time: 3-5 business days

Even though you're no longer supporting us financially, you're always welcome back to the GUHSO family. Keep listening to our free episodes and stay connected!

If you have any feedback about your experience, we'd love to hear from you at chatbout@guhso.com

One love,
The GUHSO Team
    `;
  }
}

// Create singleton instance
const emailService = new EmailService();

export default emailService;