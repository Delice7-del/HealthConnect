const twilio = require('twilio');

// Initialize Twilio client only if credentials are provided
let client = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && 
    process.env.TWILIO_ACCOUNT_SID.startsWith('AC')) {
  try {
    client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  } catch (error) {
    console.warn('Twilio client initialization failed:', error.message);
  }
}

const sendSMS = async (options) => {
  try {
    if (!client) {
      console.log('SMS not sent - Twilio not configured. Message would be:', options.message);
      return { success: true, message: 'SMS simulation successful' };
    }

    const message = await client.messages.create({
      body: options.message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: options.phone
    });

    return message;
  } catch (error) {
    console.error('SMS sending error:', error);
    throw new Error('SMS could not be sent');
  }
};

const sendBulkSMS = async (recipients, message) => {
  try {
    if (!client) {
      console.log('Bulk SMS not sent - Twilio not configured. Would send to:', recipients.length, 'recipients');
      return recipients.map(() => ({ status: 'fulfilled', value: { success: true } }));
    }

    const promises = recipients.map(phone => 
      sendSMS({ phone, message })
    );
    
    const results = await Promise.allSettled(promises);
    return results;
  } catch (error) {
    console.error('Bulk SMS error:', error);
    throw new Error('Bulk SMS could not be sent');
  }
};

module.exports = { sendSMS, sendBulkSMS }; 