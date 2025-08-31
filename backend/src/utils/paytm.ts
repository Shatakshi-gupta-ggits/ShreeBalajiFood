import CryptoJS from 'crypto-js';

// Validate environment variables
if (!process.env.PAYTM_MID || !process.env.PAYTM_MERCHANT_KEY) {
  throw new Error('Paytm configuration is missing in environment variables');
}

export const paytmConfig = {
  mid: process.env.PAYTM_MID,
  key: process.env.PAYTM_MERCHANT_KEY,
  website: process.env.PAYTM_WEBSITE || 'DEFAULT',
  industryType: process.env.PAYTM_INDUSTRY_TYPE || 'Retail',
  channelId: process.env.PAYTM_CHANNEL_ID || 'WEB',
  callbackUrl: process.env.PAYTM_CALLBACK_URL || 'http://localhost:5000/api/payments/paytm-callback'
};

// Generate checksum for Paytm
export const generatePaytmChecksum = (params: any): string => {
  const data = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');

  return CryptoJS.HmacSHA256(data, paytmConfig.key).toString();
};

// Verify Paytm checksum
export const verifyPaytmChecksum = (params: any, checksum: string): boolean => {
  const generatedChecksum = generatePaytmChecksum(params);
  return generatedChecksum === checksum;
};

// Create Paytm payment order
export const createPaytmOrder = (orderId: string, amount: number, customerId: string) => {
  const params = {
    MID: paytmConfig.mid,
    WEBSITE: paytmConfig.website,
    INDUSTRY_TYPE_ID: paytmConfig.industryType,
    CHANNEL_ID: paytmConfig.channelId,
    ORDER_ID: orderId,
    CUST_ID: customerId,
    TXN_AMOUNT: amount.toString(),
    CALLBACK_URL: paytmConfig.callbackUrl
  };

  const checksum = generatePaytmChecksum(params);

  return {
    ...params,
    CHECKSUMHASH: checksum
  };
};