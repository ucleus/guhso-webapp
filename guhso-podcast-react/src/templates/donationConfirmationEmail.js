// src/templates/donationConfirmationEmail.js

export const generateDonationConfirmationEmail = (donationData) => {
  const { donor, items, oneTimeTotal, monthlyTotal, paymentId, timestamp } = donationData;
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generateItemsList = (items) => {
    return items.map(item => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 15px 0; vertical-align: top;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 24px;">${item.icon}</span>
            <div>
              <strong style="color: #333; font-size: 16px;">${item.name}</strong>
              <div style="color: #666; font-size: 14px; margin-top: 4px;">
                ${item.tagline}
              </div>
              ${item.frequency === 'monthly' ? 
                '<div style="color: #9B59B6; font-size: 12px; font-weight: bold; margin-top: 4px;">MONTHLY SUBSCRIPTION</div>' : 
                '<div style="color: #27ae60; font-size: 12px; font-weight: bold; margin-top: 4px;">ONE-TIME DONATION</div>'
              }
            </div>
          </div>
        </td>
        <td style="padding: 15px 0; text-align: center; vertical-align: top;">
          <span style="color: #666; font-size: 16px;">${item.quantity}</span>
        </td>
        <td style="padding: 15px 0; text-align: right; vertical-align: top;">
          <span style="color: #FF6B35; font-weight: bold; font-size: 16px;">
            $${(item.price * item.quantity).toFixed(2)}
            ${item.frequency === 'monthly' ? '/month' : ''}
          </span>
        </td>
      </tr>
    `).join('');
  };

  const generatePerksSection = (items) => {
    const allPerks = new Set();
    items.forEach(item => {
      item.perks.forEach(perk => allPerks.add(perk));
    });

    return Array.from(allPerks).map(perk => `
      <li style="margin-bottom: 8px; color: #555;">
        <span style="color: #FF6B35; margin-right: 8px;">✓</span>
        ${perk}
      </li>
    `).join('');
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Big Up! Thank You for Supporting GUHSO</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #FF6B35, #F7931E); padding: 40px 30px; text-align: center;">
            <h1 style="color: white; font-size: 32px; margin: 0 0 10px 0; font-weight: bold;">
                🎉 BIG UP! 🎉
            </h1>
            <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin: 0; font-style: italic;">
                "Every mickle mek a muckle" - Thank you for your support!
            </p>
        </div>

        <!-- Personal Message -->
        <div style="padding: 30px; background-color: white;">
            <h2 style="color: #333; font-size: 24px; margin: 0 0 20px 0;">
                Bless up, ${donor.firstName}! 🙏
            </h2>
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                From the entire GUHSO family, we want to big you up for showing love and supporting our movement! 
                Your contribution helps us keep the authentic conversations flowing and the vibes real.
            </p>
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin: 0;">
                <em>"Wi likkle but wi tallawah"</em> - We're small but we're strong, and supporters like you make all the difference.
            </p>
        </div>

        <!-- Donation Details -->
        <div style="padding: 0 30px 30px; background-color: white;">
            <h3 style="color: #333; font-size: 20px; margin: 0 0 20px 0; border-bottom: 2px solid #FF6B35; padding-bottom: 10px;">
                Your Support Details
            </h3>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 2px solid #FF6B35;">
                            <th style="text-align: left; padding: 10px 0; color: #333; font-size: 14px; font-weight: bold;">Item</th>
                            <th style="text-align: center; padding: 10px 0; color: #333; font-size: 14px; font-weight: bold;">Qty</th>
                            <th style="text-align: right; padding: 10px 0; color: #333; font-size: 14px; font-weight: bold;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${generateItemsList(items)}
                    </tbody>
                </table>
                
                <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #FF6B35;">
                    ${oneTimeTotal > 0 ? `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span style="color: #666; font-size: 16px;">One-time total:</span>
                        <span style="color: #333; font-size: 16px; font-weight: bold;">$${oneTimeTotal.toFixed(2)}</span>
                    </div>
                    ` : ''}
                    ${monthlyTotal > 0 ? `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span style="color: #666; font-size: 16px;">Monthly subscription:</span>
                        <span style="color: #9B59B6; font-size: 16px; font-weight: bold;">$${monthlyTotal.toFixed(2)}/month</span>
                    </div>
                    ` : ''}
                    <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #FF6B35;">
                        <span>Total charged today:</span>
                        <span>$${(oneTimeTotal + monthlyTotal).toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <!-- Transaction Details -->
            <div style="background-color: #f0f8ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="color: #333; margin: 0 0 10px 0; font-size: 16px;">Transaction Details</h4>
                <p style="margin: 5px 0; color: #666; font-size: 14px;"><strong>Payment ID:</strong> ${paymentId}</p>
                <p style="margin: 5px 0; color: #666; font-size: 14px;"><strong>Date:</strong> ${formatDate(timestamp)}</p>
                <p style="margin: 5px 0; color: #666; font-size: 14px;"><strong>Email:</strong> ${donor.email}</p>
            </div>
        </div>

        <!-- Your Benefits -->
        <div style="padding: 0 30px 30px; background-color: white;">
            <h3 style="color: #333; font-size: 20px; margin: 0 0 20px 0;">
                🎁 What You've Unlocked
            </h3>
            <ul style="padding-left: 0; list-style: none; margin: 0;">
                ${generatePerksSection(items)}
            </ul>
            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                    <strong>📧 Keep an eye on your inbox!</strong> We'll be sending you exclusive content and updates about your perks within the next 24-48 hours.
                </p>
            </div>
        </div>

        <!-- Subscription Management -->
        ${monthlyTotal > 0 ? `
        <div style="padding: 0 30px 30px; background-color: white;">
            <h3 style="color: #333; font-size: 20px; margin: 0 0 15px 0;">
                📱 Manage Your Subscription
            </h3>
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
                Your monthly subscription will automatically renew on the same date each month. You can update your payment method, 
                pause, or cancel your subscription anytime through your account dashboard.
            </p>
            <div style="text-align: center; margin: 20px 0;">
                <a href="https://guhso.com/account/subscriptions" 
                   style="background-color: #9B59B6; color: white; padding: 12px 24px; text-decoration: none; 
                          border-radius: 6px; font-weight: bold; display: inline-block;">
                    Manage Subscription
                </a>
            </div>
        </div>
        ` : ''}

        <!-- Returns Policy -->
        <div style="padding: 0 30px 30px; background-color: white;">
            <h3 style="color: #333; font-size: 20px; margin: 0 0 15px 0;">
                🔄 Our Support Guarantee
            </h3>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #FF6B35;">
                <p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">
                    <strong>Not satisfied?</strong> We want you to feel good about supporting GUHSO. Here's our policy:
                </p>
                <ul style="color: #555; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li><strong>One-time donations:</strong> If you're not satisfied within 7 days, we'll process a full refund</li>
                    <li><strong>Monthly subscriptions:</strong> Cancel anytime - no questions asked. Prorated refunds available for current month</li>
                    <li><strong>Technical issues:</strong> Immediate full refund if payment was processed in error</li>
                    <li><strong>Access problems:</strong> We'll resolve any issues with your perks within 24 hours</li>
                </ul>
                <p style="color: #555; font-size: 14px; margin: 15px 0 0 0;">
                    <strong>Need help?</strong> Just reply to this email or contact us at 
                    <a href="mailto:support@guhso.com" style="color: #FF6B35;">support@guhso.com</a>
                </p>
            </div>
        </div>

        <!-- Personal Message -->
        <div style="padding: 0 30px 30px; background-color: white;">
            ${donor.message ? `
            <h3 style="color: #333; font-size: 20px; margin: 0 0 15px 0;">
                💭 Your Message to Us
            </h3>
            <div style="background-color: #f0f8ff; padding: 15px; border-radius: 8px; font-style: italic; color: #555; margin-bottom: 20px;">
                "${donor.message}"
            </div>
            <p style="color: #555; font-size: 16px; margin: 0;">
                Thank you for sharing your thoughts! The GUHSO team reads every message and your words truly motivate us to keep creating authentic content.
            </p>
            ` : ''}
        </div>

        <!-- Connect With Us -->
        <div style="padding: 30px; background-color: #2c3e50; text-align: center;">
            <h3 style="color: white; font-size: 20px; margin: 0 0 20px 0;">
                Stay Connected with the GUHSO Family
            </h3>
            <div style="margin: 20px 0;">
                <a href="https://instagram.com/guhso" style="color: #FF6B35; text-decoration: none; margin: 0 15px; font-size: 24px;">📱</a>
                <a href="https://twitter.com/guhso" style="color: #FF6B35; text-decoration: none; margin: 0 15px; font-size: 24px;">🐦</a>
                <a href="https://youtube.com/guhso" style="color: #FF6B35; text-decoration: none; margin: 0 15px; font-size: 24px;">📺</a>
                <a href="https://discord.gg/guhso" style="color: #FF6B35; text-decoration: none; margin: 0 15px; font-size: 24px;">💬</a>
            </div>
            <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 20px 0 0 0;">
                Follow us for behind-the-scenes content, exclusive updates, and to connect with other GUHSO supporters!
            </p>
        </div>

        <!-- Footer -->
        <div style="padding: 20px 30px; background-color: #1a1a1a; text-align: center;">
            <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0 0 10px 0;">
                This email was sent to ${donor.email} because you made a donation to GUHSO.
            </p>
            <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0;">
                GUHSO Podcast | 
                <a href="mailto:chatbout@guhso.com" style="color: #FF6B35;">chatbout@guhso.com</a> | 
                <a href="https://guhso.com/unsubscribe" style="color: #FF6B35;">Unsubscribe</a>
            </p>
        </div>
        
    </div>
</body>
</html>
  `;
};

// Plain text version for email clients that don't support HTML
export const generatePlainTextConfirmation = (donationData) => {
  const { donor, items, oneTimeTotal, monthlyTotal, paymentId, timestamp } = donationData;
  
  return `
BIG UP! Thank you for supporting GUHSO! 🎉

Hi ${donor.firstName},

From the entire GUHSO family, we want to big you up for showing love and supporting our movement! Your contribution helps us keep the authentic conversations flowing and the vibes real.

"Every mickle mek a muckle" - Thank you for your support!

YOUR DONATION DETAILS:
======================
${items.map(item => `
${item.icon} ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}${item.frequency === 'monthly' ? '/month' : ''}
${item.tagline}
`).join('')}

${oneTimeTotal > 0 ? `One-time total: $${oneTimeTotal.toFixed(2)}` : ''}
${monthlyTotal > 0 ? `Monthly subscription: $${monthlyTotal.toFixed(2)}/month` : ''}
Total charged today: $${(oneTimeTotal + monthlyTotal).toFixed(2)}

Transaction ID: ${paymentId}
Date: ${new Date(timestamp).toLocaleString()}

WHAT YOU'VE UNLOCKED:
====================
${items.map(item => item.perks.map(perk => `✓ ${perk}`).join('\n')).join('\n')}

${monthlyTotal > 0 ? `
SUBSCRIPTION MANAGEMENT:
=======================
Your monthly subscription will automatically renew each month. You can manage, pause, or cancel your subscription anytime at: https://guhso.com/account/subscriptions
` : ''}

OUR SUPPORT GUARANTEE:
=====================
Not satisfied? We want you to feel good about supporting GUHSO:
• One-time donations: Full refund within 7 days if not satisfied
• Monthly subscriptions: Cancel anytime, prorated refunds available
• Technical issues: Immediate full refund for payment errors
• Access problems: We'll resolve perk issues within 24 hours

Need help? Reply to this email or contact support@guhso.com

${donor.message ? `
YOUR MESSAGE TO US:
==================
"${donor.message}"

Thank you for sharing your thoughts! The GUHSO team reads every message.
` : ''}

Stay connected:
Instagram: @guhso | Twitter: @guhso | YouTube: /guhso | Discord: /guhso

"Wi likkle but wi tallawah" - We're small but we're strong!

---
GUHSO Podcast
chatbout@guhso.com
https://guhso.com
  `;
};