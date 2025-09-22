# WhatsApp Business API Setup Guide

This guide will help you set up automated WhatsApp messaging for the Flynzo booking system.

## Prerequisites

1. A Facebook Business Account
2. A WhatsApp Business Account
3. A verified business (for production use)

## Step 1: Create WhatsApp Business Account

1. Go to [WhatsApp Business](https://business.whatsapp.com/)
2. Click "Get Started" and create your business account
3. Verify your business phone number
4. Complete your business profile

## Step 2: Set Up WhatsApp Business API

### Option A: WhatsApp Cloud API (Recommended)

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app and select "Business" type
3. Add WhatsApp product to your app
4. Get your credentials:
   - **Phone Number ID**: Found in WhatsApp > API Setup
   - **Access Token**: Generate in WhatsApp > API Setup
   - **Webhook Verify Token**: Create a secure random string

### Option B: WhatsApp Business Platform (Enterprise)

1. Contact WhatsApp Business API providers like:
   - Twilio
   - MessageBird
   - 360Dialog
   - Infobip

## Step 3: Configure Environment Variables

Add these to your `.env.local` file:

```env
# WhatsApp Business API Configuration
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
WHATSAPP_ACCESS_TOKEN=your_access_token_here
WHATSAPP_TO_NUMBER=918401271114
```

## Step 4: Test the Integration

1. Start your development server: `npm run dev`
2. Go to the booking page
3. Fill out the form and submit
4. Check if the message is sent to your WhatsApp Business number

## Step 5: Webhook Setup (Optional)

For receiving message status updates:

1. Create a webhook endpoint at `/api/webhook/whatsapp`
2. Add your webhook URL in Facebook Developer Console
3. Verify the webhook with your verify token

## Troubleshooting

### Common Issues

1. **"WhatsApp service not configured"**
   - Check if all environment variables are set
   - Verify the values are correct

2. **"Failed to send WhatsApp message"**
   - Check if your access token is valid
   - Verify the phone number ID is correct
   - Ensure your WhatsApp Business account is active

3. **Rate Limiting**
   - WhatsApp has rate limits (1000 messages per day for free tier)
   - Consider upgrading to paid tier for higher limits

### Testing Without API

If you don't have WhatsApp Business API set up yet, the system will fallback to opening WhatsApp Web with a pre-filled message.

## Production Considerations

1. **Security**: Keep your access tokens secure
2. **Rate Limits**: Monitor your message usage
3. **Compliance**: Follow WhatsApp's business policies
4. **Backup**: Have a fallback method for critical bookings

## Alternative Solutions

If WhatsApp Business API is not suitable:

1. **Twilio WhatsApp API**: More reliable, paid service
2. **Manual Process**: Use the preview feature and manual sending
3. **Email Integration**: Send booking details via email
4. **SMS Integration**: Use SMS as an alternative

## Support

For issues with this implementation:
1. Check the browser console for errors
2. Verify your API credentials
3. Test with a simple message first
4. Contact the development team

## Cost Considerations

- **WhatsApp Cloud API**: Free tier includes 1000 messages per month
- **WhatsApp Business Platform**: Varies by provider
- **Twilio**: Pay-per-message pricing

Choose the option that best fits your business needs and budget.
