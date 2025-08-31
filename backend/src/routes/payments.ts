import express, { Request, Response } from 'express';
import { createPaytmOrder, verifyPaytmChecksum } from '../utils/paytm';
import { protect, AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();

// Generate Paytm payment order
router.post('/create-paytm-order', protect, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { amount, orderId } = req.body;
    const customerId = req.user!._id.toString(); // From authenticated user

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount is required' });
    }

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    const paymentData = createPaytmOrder(orderId, amount, customerId);

    res.json({
      success: true,
      message: 'Order created successfully',
      paymentData,
      paytmConfig: {
        mid: process.env.PAYTM_MID,
        website: process.env.PAYTM_WEBSITE,
        industryType: process.env.PAYTM_INDUSTRY_TYPE,
        channelId: process.env.PAYTM_CHANNEL_ID
      }
    });
  } catch (error) {
    console.error('Paytm order creation error:', error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

// Paytm callback handler (after payment)
router.post('/paytm-callback', async (req: Request, res: Response) => {
  try {
    const { CHECKSUMHASH, ...responseParams } = req.body;

    // Verify checksum
    const isValidChecksum = verifyPaytmChecksum(responseParams, CHECKSUMHASH);

    if (!isValidChecksum) {
      return res.status(400).json({ error: 'Invalid checksum' });
    }

    const { ORDERID, TXNID, TXNAMOUNT, STATUS, RESPCODE, RESPMSG } = responseParams;

    if (STATUS === 'TXN_SUCCESS') {
      // Payment successful - update your database here
      console.log('Payment successful:', {
        orderId: ORDERID,
        transactionId: TXNID,
        amount: TXNAMOUNT
      });

      // TODO: Update order status in your database
      // TODO: Send confirmation email/SMS

      res.redirect('/payment-success?orderId=' + ORDERID);
    } else {
      // Payment failed
      console.log('Payment failed:', RESPMSG);
      res.redirect('/payment-failed?reason=' + encodeURIComponent(RESPMSG));
    }
  } catch (error) {
    console.error('Paytm callback error:', error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

// Check payment status
router.post('/check-payment-status', protect, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { orderId } = req.body;

    // TODO: Implement Paytm status check API if needed
    // For now, you can check your database for order status

    res.json({
      success: true,
      orderId,
      status: 'under_processing' // You'll update this based on actual status
    });
  } catch (error) {
    console.error('Payment status check error:', error);
    res.status(500).json({ error: 'Failed to check payment status' });
  }
});

export default router;