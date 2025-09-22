import { NextRequest, NextResponse } from 'next/server'
import { formatBookingForWhatsApp, type BookingData } from '@/lib/whatsapp'

// WhatsApp Business API configuration
const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v18.0'
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN
const WHATSAPP_TO_NUMBER = process.env.WHATSAPP_TO_NUMBER || '918401271114' // Your business number

export async function POST(request: NextRequest) {
  try {
    const bookingData: BookingData = await request.json()
    
    // Validate required environment variables
    if (!WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN) {
      console.error('Missing WhatsApp API credentials')
      return NextResponse.json(
        { error: 'WhatsApp service not configured' },
        { status: 500 }
      )
    }

    // Format the message
    const message = formatBookingForWhatsApp(bookingData)
    
    // Prepare the WhatsApp API payload
    const payload = {
      messaging_product: 'whatsapp',
      to: WHATSAPP_TO_NUMBER,
      type: 'text',
      text: {
        body: message
      }
    }

    // Send message via WhatsApp Business API
    const response = await fetch(
      `${WHATSAPP_API_URL}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('WhatsApp API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to send WhatsApp message', details: errorData },
        { status: response.status }
      )
    }

    const result = await response.json()
    
    return NextResponse.json({
      success: true,
      messageId: result.messages?.[0]?.id,
      message: 'WhatsApp message sent successfully'
    })

  } catch (error) {
    console.error('WhatsApp API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Fallback method using WhatsApp Web API (for development/testing)
export async function PUT(request: NextRequest) {
  try {
    const bookingData: BookingData = await request.json()
    const message = formatBookingForWhatsApp(bookingData)
    
    // This is a fallback that opens WhatsApp Web with pre-filled message
    // In production, you should use the WhatsApp Business API
    const whatsappUrl = `https://wa.me/${WHATSAPP_TO_NUMBER}?text=${encodeURIComponent(message)}`
    
    return NextResponse.json({
      success: true,
      whatsappUrl,
      message: 'WhatsApp URL generated successfully'
    })

  } catch (error) {
    console.error('WhatsApp fallback error:', error)
    return NextResponse.json(
      { error: 'Failed to generate WhatsApp URL' },
      { status: 500 }
    )
  }
}
