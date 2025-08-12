# Square Payment Setup Guide

This guide will help you configure Square payments for your GUHSO donation platform.

## **Step 1: Create Square Developer Account**

1. Go to [Square Developer Dashboard](https://developer.squareup.com/apps)
2. Sign in with your Square account or create a new one
3. Click **"Create Your First Application"**

## **Step 2: Get Your Square Credentials**

### **For Testing (Sandbox):**
1. In your Square Developer Dashboard, select your application
2. Go to **"Sandbox"** tab
3. Copy the following credentials:
   - **Application ID** (starts with `sandbox-sq0idb-`)
   - **Location ID** (from the Locations section)

### **For Production (Live Payments):**
1. In your Square Developer Dashboard, select your application
2. Go to **"Production"** tab
3. Copy the following credentials:
   - **Application ID** (starts with `sq0idb-`)
   - **Location ID** (from the Locations section)

## **Step 3: Configure Environment Variables**

Update your `.env` file with your Square credentials:

```bash
# Square Payment Configuration
REACT_APP_SQUARE_APP_ID=your_actual_app_id_here
REACT_APP_SQUARE_LOCATION_ID=your_actual_location_id_here

# Set to 'sandbox' for testing, 'production' for live payments
REACT_APP_SQUARE_ENVIRONMENT=sandbox
```

### **Example for Sandbox:**
```bash
REACT_APP_SQUARE_APP_ID=sandbox-sq0idb-abcd1234efgh5678
REACT_APP_SQUARE_LOCATION_ID=L123ABC456DEF789
REACT_APP_SQUARE_ENVIRONMENT=sandbox
```

### **Example for Production:**
```bash
REACT_APP_SQUARE_APP_ID=sq0idb-abcd1234efgh5678
REACT_APP_SQUARE_LOCATION_ID=L123ABC456DEF789
REACT_APP_SQUARE_ENVIRONMENT=production
```

## **Step 4: Set Up Backend API Endpoints**

Your backend needs to handle the payment processing. Create these endpoints:

### **Required Endpoints:**

#### **1. One-Time Payments**
```
POST /api/v1/donations/process-payment
```

**Request Body:**
```json
{
  "token": "sq0itp_...", // Payment token from Square
  "amount": 499, // Amount in cents ($4.99)
  "currency": "USD",
  "donation_type": "one-time",
  "donation_data": {
    "items": [...],
    "donor": {...},
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

**Response:**
```json
{
  "success": true,
  "payment_id": "payment_123",
  "receipt_url": "https://squareup.com/receipt/..."
}
```

#### **2. Subscription Payments**
```
POST /api/v1/donations/create-subscription
```

**Request Body:**
```json
{
  "token": "sq0itp_...",
  "monthly_amount": 399, // Amount in cents ($3.99/month)
  "currency": "USD",
  "donation_data": {
    "items": [...],
    "donor": {...}
  }
}
```

**Response:**
```json
{
  "success": true,
  "subscription_id": "subscription_123",
  "customer_id": "customer_456"
}
```

#### **3. Email Sending**
```
POST /api/v1/emails/send
```

**Request Body:**
```json
{
  "to": "donor@example.com",
  "subject": "Thank you for supporting GUHSO!",
  "html": "<html>...</html>",
  "text": "Plain text version",
  "from": {
    "email": "noreply@guhso.com",
    "name": "GUHSO Podcast"
  }
}
```

## **Step 5: Backend Implementation Examples**

### **Node.js/Express Example:**

```javascript
// Install Square SDK: npm install squareup

const { Client, Environment } = require('squareup');

// Initialize Square client
const squareClient = new Client({
  environment: process.env.SQUARE_ENVIRONMENT === 'production' 
    ? Environment.Production 
    : Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN // From Square Dashboard
});

// Process one-time payment
app.post('/api/v1/donations/process-payment', async (req, res) => {
  try {
    const { token, amount, donation_data } = req.body;
    
    const paymentsApi = squareClient.paymentsApi;
    
    const request = {
      sourceId: token,
      amountMoney: {
        amount: amount,
        currency: 'USD'
      },
      idempotencyKey: `${Date.now()}-${Math.random()}`,
      note: `GUHSO Donation - ${donation_data.donor.firstName} ${donation_data.donor.lastName}`
    };

    const response = await paymentsApi.createPayment(request);
    
    if (response.result.payment) {
      res.json({
        success: true,
        payment_id: response.result.payment.id,
        receipt_url: response.result.payment.receiptUrl
      });
    } else {
      throw new Error('Payment failed');
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});
```

### **PHP/Laravel Example:**

```php
// Install Square SDK: composer require squareup/squareup

use SquareConnect\Configuration;
use SquareConnect\Api\PaymentsApi;
use SquareConnect\Model\CreatePaymentRequest;
use SquareConnect\Model\Money;

// Configure Square
$config = new Configuration();
$config->setHost($environment === 'production' ? 
    Configuration::getDefaultConfiguration()->getHost() : 
    'https://connect.squareupsandbox.com'
);
$config->setAccessToken(env('SQUARE_ACCESS_TOKEN'));

// Process payment
Route::post('/api/v1/donations/process-payment', function(Request $request) use ($config) {
    $paymentsApi = new PaymentsApi(null, $config);
    
    $money = new Money();
    $money->setAmount($request->amount);
    $money->setCurrency('USD');
    
    $createPaymentRequest = new CreatePaymentRequest();
    $createPaymentRequest->setSourceId($request->token);
    $createPaymentRequest->setAmountMoney($money);
    $createPaymentRequest->setIdempotencyKey(uniqid());
    
    try {
        $result = $paymentsApi->createPayment($createPaymentRequest);
        
        return response()->json([
            'success' => true,
            'payment_id' => $result->getPayment()->getId(),
            'receipt_url' => $result->getPayment()->getReceiptUrl()
        ]);
    } catch (Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 400);
    }
});
```

## **Step 6: Test Your Integration**

### **1. Testing with Sandbox:**
1. Set `REACT_APP_SQUARE_ENVIRONMENT=sandbox`
2. Use sandbox credentials
3. Test with these sandbox card numbers:
   - **Visa:** 4111 1111 1111 1111
   - **Mastercard:** 5555 5555 5555 4444
   - **Any CVV:** 123
   - **Any future expiry date**

### **2. Test Scenarios:**
- ✅ One-time donations ($4.99, $9.99, $19.99)
- ✅ Monthly subscription ($3.99/month)
- ✅ Merchandise orders (stickers, t-shirts with sizes)
- ✅ Multiple items in cart
- ✅ Email confirmations
- ✅ Error handling (declined cards, network issues)

## **Step 7: Go Live**

### **When Ready for Production:**
1. Update `.env` file:
   ```bash
   REACT_APP_SQUARE_ENVIRONMENT=production
   REACT_APP_SQUARE_APP_ID=sq0idb-your_production_app_id
   REACT_APP_SQUARE_LOCATION_ID=your_production_location_id
   ```

2. Update backend with production Square access token

3. Test thoroughly with small real transactions

4. Monitor Square Dashboard for payments

## **Step 8: Square Dashboard Features**

After setup, you can use Square Dashboard to:
- **View Transactions:** See all payments in real-time
- **Issue Refunds:** Process refunds directly from dashboard
- **Manage Subscriptions:** View and cancel recurring payments
- **Generate Reports:** Financial reporting and analytics
- **Customer Management:** View customer payment history

## **Security Notes**

- ✅ **Never expose** your Square Access Token in frontend code
- ✅ **Always validate** payments on your backend
- ✅ **Use HTTPS** for all payment pages
- ✅ **Store credentials** securely in environment variables
- ✅ **Implement proper** error handling and logging

## **Support & Documentation**

- **Square Developer Docs:** https://developer.squareup.com/docs
- **Square Support:** https://squareup.com/help
- **Test Card Numbers:** https://developer.squareup.com/docs/testing/test-values
- **API Reference:** https://developer.squareup.com/reference/square

---

**Need Help?** Contact the development team or check the Square documentation for specific implementation details.